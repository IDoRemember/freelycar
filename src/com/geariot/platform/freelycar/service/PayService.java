package com.geariot.platform.freelycar.service;

import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.geariot.platform.freelycar.dao.CardDao;
import com.geariot.platform.freelycar.dao.ClientDao;
import com.geariot.platform.freelycar.dao.ConsumOrderDao;
import com.geariot.platform.freelycar.dao.IncomeOrderDao;
import com.geariot.platform.freelycar.dao.ServiceDao;
import com.geariot.platform.freelycar.entities.Card;
import com.geariot.platform.freelycar.entities.CardProjectRemainingInfo;
import com.geariot.platform.freelycar.entities.Client;
import com.geariot.platform.freelycar.entities.ConsumOrder;
import com.geariot.platform.freelycar.entities.IncomeOrder;
import com.geariot.platform.freelycar.entities.ProjectInfo;
import com.geariot.platform.freelycar.entities.ServiceProjectInfo;
import com.geariot.platform.freelycar.exception.ForRollbackException;
import com.geariot.platform.freelycar.model.RESCODE;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.JsonResFactory;

@Service
@Transactional
public class PayService {
	
	private static final Logger log = LogManager.getLogger(PayService.class);
	
	@Autowired
	private IncomeOrderDao incomeOrderDao;
	
	@Autowired
	private ClientDao clientDao;
	
	@Autowired
	private ServiceDao serviceDao;
	
	@Autowired
	private CardDao cardDao;
	
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
		order.setMember(true);
		order.setPayDate(new Date());
		order.setProgramName(Constants.CARD_PROGRAM);
		order.setPayMethod(card.getPayMethod());
		/*Admin admin = this.adminDao.findAdminById(card.getOrderMaker().getId());
		order.setStaffNames(admin.getStaff().getName());*/
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
		log.debug("消费订单(id:" + order.getId() + ")进行结算，订单包含项目:");
		//判断项目付款方式
		Set<ProjectInfo> projects = order.getProjects();
		for(ProjectInfo info : projects){
			log.debug(("项目(id:" + info.getProjectId() + ", 名称:" + info.getProjectName() + 
					")" + "付款方式:" + info.getPayMethod()));
			//如果用卡付款，根据设置的卡id与项目id查找剩余次数信息
			if(info.getPayMethod() == Constants.PROJECT_WITH_CARD){
				CardProjectRemainingInfo remain = this.cardDao.getProjectRemainingInfo(info.getCardId(), info.getProjectId());
				//没有找到，卡未设置或卡中没有对应的项目信息，操作回滚
				if(remain == null){
					log.debug("该项目尝试用卡次支付但没有对应卡信息。本次订单操作回滚");
					throw new ForRollbackException(RESCODE.NOT_SET_PAY_CARD.getMsg(), 
							RESCODE.NOT_SET_PAY_CARD.getValue());
				}
				else {
					//找到剩余次数信息，但剩余次数不够支付卡次的，返回次数不足,，操作回滚
					if(remain.getRemaining() < info.getPayCardTimes()){
						log.debug("该项目尝试用卡(id:" + info.getCardId() + " ,对应剩余次数:" + 
								remain.getRemaining() + ")" + "不足支付次数:" + info.getPayCardTimes() + "。本次订单操作回滚");
						throw new ForRollbackException(RESCODE.CARD_REMAINING_NOT_ENOUGH.getMsg(), 
								RESCODE.CARD_REMAINING_NOT_ENOUGH.getValue());
					}
					//剩余次数足够，扣除次数
					else {
						log.debug("用卡(id:" + info.getCardId() + " ,对应项目:" + info.getProjectName() + " ,剩余次数:" + 
								remain.getRemaining() + ")扣除次数:" + info.getPayCardTimes());
						remain.setRemaining(remain.getRemaining() - info.getPayCardTimes());
					}
				}
			}
			/*else if(info.getPayMethod() == Constants.PROJECT_WITH_CASH){
				totalPrice += info.getProjectPrice();
			}*/
		}
		
		log.debug("消费订单结算完成，生成收入订单");
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

		//查看客户是否有卡,判断是否属于会员
		Client client = clientDao.findById(order.getClientId());
		if(client.getCards() == null || client.getCards().isEmpty()){
			recoder.setMember(false);
		}
		else{
			recoder.setMember(true);
		}
		
		/*StringBuilder staffNames = new StringBuilder();
		for(Staff staff : order.getStaffs()){
			staffNames.append(staff.getName());
			staffNames.append(Constants.STAFF_NAME_SPLIT);
		}
		recoder.setStaffNames(staffNames.substring(0, staffNames.length() - 1));*/
		this.incomeOrderDao.save(recoder);
		
		client.setConsumTimes(client.getConsumTimes() + 1);
		client.setConsumAmout(client.getConsumAmout() + recoder.getAmount());
		client.setLastVisit(new Date());
		
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}
	
}
