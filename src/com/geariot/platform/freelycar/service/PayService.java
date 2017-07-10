package com.geariot.platform.freelycar.service;

import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.geariot.platform.freelycar.dao.AdminDao;
import com.geariot.platform.freelycar.dao.CardDao;
import com.geariot.platform.freelycar.dao.ClientDao;
import com.geariot.platform.freelycar.dao.ConsumOrderDao;
import com.geariot.platform.freelycar.dao.IncomeOrderDao;
import com.geariot.platform.freelycar.dao.ServiceDao;
import com.geariot.platform.freelycar.entities.Admin;
import com.geariot.platform.freelycar.entities.Card;
import com.geariot.platform.freelycar.entities.CardProjectRemainingInfo;
import com.geariot.platform.freelycar.entities.Client;
import com.geariot.platform.freelycar.entities.ConsumOrder;
import com.geariot.platform.freelycar.entities.IncomeOrder;
import com.geariot.platform.freelycar.entities.ProjectInfo;
import com.geariot.platform.freelycar.entities.ServiceProjectInfo;
import com.geariot.platform.freelycar.entities.Staff;
import com.geariot.platform.freelycar.model.RESCODE;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.JsonResFactory;

@Service
@Transactional
public class PayService {
	
	@Autowired
	private IncomeOrderDao incomeOrderDao;
	
	@Autowired
	private ClientDao clientDao;
	
	@Autowired
	private ServiceDao serviceDao;
	
	@Autowired
	private CardDao cardDao;
	
	@Autowired
	private AdminDao adminDao;
	
	@Autowired
	private ConsumOrderDao consumOrderDao;

	public String buyCard(int clientId, Card card) {
		Client client = clientDao.findById(clientId);
		com.geariot.platform.freelycar.entities.Service service = 
				this.serviceDao.findServiceById(card.getService().getId());
		if(client == null || service == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		//将服务信息次数复制到卡中
		Set<CardProjectRemainingInfo> cardInfos = new HashSet<>();
		for(ServiceProjectInfo info : service.getProjectInfos()){
			CardProjectRemainingInfo cardInfo = new CardProjectRemainingInfo();
			cardInfo.setProject(info.getProject());
			cardInfo.setRemaining(info.getTimes());
			cardInfos.add(cardInfo);
		}
		card.setProjectInfos(cardInfos);
		//将新增卡增加到客户卡列表中
		Set<Card> cards = client.getCards();
		if(cards == null){
			cards = new HashSet<>();
			client.setCards(cards);
		}
		card.setPayDate(new Date());
		Calendar exp = Calendar.getInstance();
		exp.setTime(new Date());
		exp.add(Calendar.YEAR, service.getValidTime());
		card.setExpirationDate(exp.getTime());
		cards.add(card);
		//创建新的收入订单并保存
		IncomeOrder order = new IncomeOrder();
		order.setAmount(service.getPrice());
		order.setClientId(clientId);
		order.setLicensePlate(null);
		order.setPayDate(new Date());
		order.setProgramName(Constants.CARD_PROGRAM);
		order.setPayMethod(card.getPayMethod());
		Admin admin = this.adminDao.findAdminById(card.getOrderMaker().getId());
		order.setStaffNames(admin.getStaff().getName());
		this.incomeOrderDao.save(order);
		//更新客户的消费次数与消费情况信息。
		client.setConsumTimes(client.getConsumTimes() + 1);
		client.setConsumAmout(client.getConsumAmout() + order.getAmount());
		client.setLastVisit(new Date());
		
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}
	
	public String consumPay(String consumOrderId){
		ConsumOrder order = this.consumOrderDao.findById(consumOrderId);
		if(order == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		//判断项目付款方式
		Set<ProjectInfo> projects = order.getProjects();
		for(ProjectInfo info : projects){
			//如果用卡付款，根据设置的卡id与项目id查找剩余次数信息
			if(info.getPayMethod() == Constants.PROJECT_WITH_CARD){
				CardProjectRemainingInfo remain = this.cardDao.getProjectRemainingInfo(info.getCardId(), info.getProjectId());
				//没有找到，卡未设置或卡中没有对应的项目信息
				if(remain == null){
					return JsonResFactory.buildOrg(RESCODE.NOT_SET_PAY_CARD).toString();
				}
				else {
					//找到剩余次数信息，但剩余次数不够支付卡次的，返回次数不足
					if(remain.getRemaining() < info.getPayCardTimes()){
						return JsonResFactory.buildOrg(RESCODE.CARD_REMAINING_NOT_ENOUGH).toString();
					}
				}
			}
			/*else if(info.getPayMethod() == Constants.PROJECT_WITH_CASH){
				totalPrice += info.getProjectPrice();
			}*/
		}
		
		//现金支付的情况，直接进行结算
		order.setPayState(1);
		
		//结算完成后，记录到IncomeOrder。
		IncomeOrder recoder = new IncomeOrder();
		recoder.setAmount(order.getTotalPrice());
		recoder.setClientId(order.getClientId());
		recoder.setLicensePlate(order.getLicensePlate());
		recoder.setPayDate(new Date());
		recoder.setProgramName(order.getProgramName());
		recoder.setPayMethod(order.getPayMethod());
		StringBuilder staffNames = new StringBuilder();
		for(Staff staff : order.getStaffs()){
			staffNames.append(staff.getName());
			staffNames.append(Constants.STAFF_NAME_SPLIT);
		}
		recoder.setStaffNames(staffNames.substring(0, staffNames.length() - 1));
		this.incomeOrderDao.save(recoder);
		
		Client client = this.clientDao.findById(order.getClientId());
		client.setConsumTimes(client.getConsumTimes() + 1);
		client.setConsumAmout(client.getConsumAmout() + recoder.getAmount());
		client.setLastVisit(new Date());
		
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}
	
}
