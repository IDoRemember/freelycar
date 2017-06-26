package com.geariot.platform.freelycar.service;

import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.geariot.platform.freelycar.dao.ClientDao;
import com.geariot.platform.freelycar.dao.ConsumOrderDao;
import com.geariot.platform.freelycar.dao.IncomeOrderDao;
import com.geariot.platform.freelycar.dao.ServiceDao;
import com.geariot.platform.freelycar.entities.Card;
import com.geariot.platform.freelycar.entities.CardProjectRemainingInfo;
import com.geariot.platform.freelycar.entities.Client;
import com.geariot.platform.freelycar.entities.ConsumOrder;
import com.geariot.platform.freelycar.entities.IncomeOrder;
import com.geariot.platform.freelycar.entities.ServiceProjectInfo;
import com.geariot.platform.freelycar.model.RESCODE;
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
		for(ServiceProjectInfo info : service.getServiceProjectInfos()){
			CardProjectRemainingInfo cardInfo = new CardProjectRemainingInfo();
			cardInfo.setProject(info.getProject());
			cardInfo.setRemaining(info.getTimes());
			cardInfos.add(cardInfo);
		}
		card.setRemainingInfos(cardInfos);
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
		order.setType(0);
		order.setLicensePlate(null);
		order.setPayDate(new Date());
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
		//如果项目是用会员卡付款
		if(order.getProjectPayMethod() == 1){
			Card card = order.getPayCard();
			if(card == null){
				return JsonResFactory.buildOrg(RESCODE.NOT_SET_PAY_CARD).toString();
			}
			int projectId = order.getProject().getId();
			CardProjectRemainingInfo info = null;
			//查找与项目对应的info，对比剩余次数。
			for(CardProjectRemainingInfo i : card.getRemainingInfos()){
				if(i.getProject().getId() == projectId){
					info = i;
					break;
				}
			}
			//如果没找到项目对应的info，或剩余次数所需次数少，返回失败。
			if(info == null || info.getRemaining() < order.getPayCardTimes()){
				return JsonResFactory.buildOrg(RESCODE.CARD_REMAINING_NOT_ENOUGH).toString();
			}
			//否则，扣除会员卡相应的次数，并将订单总金额减少项目费用。
			info.setRemaining(info.getRemaining() - order.getPayCardTimes());
			order.setTotalPrice(order.getTotalPrice() - order.getProject().getPrice());
		}
		//现金支付的情况，直接进行结算
		order.setPayState(1);
		
		//结算完成后，记录到IncomeOrder。
		IncomeOrder recoder = new IncomeOrder();
		recoder.setAmount(order.getTotalPrice());
		recoder.setClientId(order.getCar().getClient().getId());
		recoder.setLicensePlate(order.getCar().getLicensePlate());
		recoder.setPayDate(new Date());
		recoder.setType(1);
		this.incomeOrderDao.save(recoder);
		
		Client client = order.getCar().getClient();
		client.setConsumTimes(client.getConsumTimes() + 1);
		client.setConsumAmout(client.getConsumAmout() + recoder.getAmount());
		client.setLastVisit(new Date());
		
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}
	
}
