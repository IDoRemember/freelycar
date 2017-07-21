package com.geariot.platform.freelycar.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.geariot.platform.freelycar.dao.CardDao;
import com.geariot.platform.freelycar.dao.ConsumOrderDao;
import com.geariot.platform.freelycar.dao.InventoryDao;
import com.geariot.platform.freelycar.dao.InventoryOrderDao;
import com.geariot.platform.freelycar.dao.ProjectDao;
import com.geariot.platform.freelycar.entities.Admin;
import com.geariot.platform.freelycar.entities.Car;
import com.geariot.platform.freelycar.entities.CarType;
import com.geariot.platform.freelycar.entities.Card;
import com.geariot.platform.freelycar.entities.ConsumExtraInventoriesInfo;
import com.geariot.platform.freelycar.entities.ConsumOrder;
import com.geariot.platform.freelycar.entities.Inventory;
import com.geariot.platform.freelycar.entities.InventoryOrder;
import com.geariot.platform.freelycar.entities.InventoryOrderInfo;
import com.geariot.platform.freelycar.entities.Project;
import com.geariot.platform.freelycar.entities.ProjectInfo;
import com.geariot.platform.freelycar.entities.ProjectInventoriesInfo;
import com.geariot.platform.freelycar.entities.Provider;
import com.geariot.platform.freelycar.entities.Staff;
import com.geariot.platform.freelycar.exception.ForRollbackException;
import com.geariot.platform.freelycar.model.RESCODE;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.IDGenerator;
import com.geariot.platform.freelycar.utils.JsonPropertyFilter;
import com.geariot.platform.freelycar.utils.JsonResFactory;
import com.geariot.platform.freelycar.utils.query.ConsumOrderAndQueryCreator;
import com.geariot.platform.freelycar.utils.query.ConsumOrderQueryCondition;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;

@Service
@Transactional
public class ConsumOrderService {

	private static final Logger log = LogManager.getLogger(ConsumOrderService.class);
	
	@Autowired
	private ConsumOrderDao orderDao;
	
	@Autowired
	private InventoryDao inventoryDao;

	@Autowired
	private InventoryOrderDao inventoryOrderDao;
	
	@Autowired
	private CardDao cardDao;
	
	@Autowired
	private ProjectDao projectDao;
	
	public String book(ConsumOrder consumOrder) {
		log.debug("修改之前order----------" + consumOrder);
		String consumOrderId = IDGenerator.generate(IDGenerator.MAINTAIN_CONSUM);
		consumOrder.setId(consumOrderId);
		log.debug("客户id：" + consumOrder.getClientId() + ", 客户姓名:" + consumOrder.getClientName() + ", 尝试创建消费订单");
		consumOrder.setCreateDate(new Date());
		consumOrder.setState(0);
		Set<ConsumExtraInventoriesInfo> infos = consumOrder.getInventoryInfos();
		List<InventoryOrderInfo> list = new ArrayList<>();
		float totalAmount = 0.0f;
		float totalPrice = 0.0f;
		//比较消耗数量与库存实际数量
		for(ConsumExtraInventoriesInfo info : infos){
			Inventory inventory = inventoryDao.findById(info.getInventory().getId());
			log.debug("订单需要消耗库存(id:" + inventory.getId() + ", 名称：" +  inventory.getName() 
			+ ")总计" + info.getNumber() + inventory.getStandard());
			log.debug("实际库存剩余：" + inventory.getAmount() + inventory.getStandard());
			//如果库存不足，抛出异常，操作回滚
			if(inventory.getAmount() < info.getNumber()){
				log.debug("实际库存不足，当前操作回滚，订单添加失败");
				throw new ForRollbackException(RESCODE.INVENTORY_NOT_ENOUGH.getMsg(), RESCODE.INVENTORY_NOT_ENOUGH.getValue());
			}
			inventory.setAmount(inventory.getAmount() - info.getNumber());
			InventoryOrderInfo temp = new InventoryOrderInfo();
			temp.setAmount(info.getNumber());
			Inventory inv = info.getInventory();
			temp.setBrandName(inv.getBrandName());
			temp.setInventoryId(inv.getId());
			temp.setName(inv.getName());
			temp.setProperty(inv.getProperty());
			temp.setStandard(inv.getStandard());
			temp.setTypeName(inv.getTypeName());
			temp.setPrice(info.getInventory().getPrice() * temp.getAmount());
			list.add(temp);
			totalAmount += temp.getAmount();
			totalPrice += temp.getPrice();
		}
		//获取project信息保存到该订单
		for(ProjectInfo pInfo : consumOrder.getProjects()){
			Set<Staff> staffs = pInfo.getStaffs();
			pInfo.setStaffs(staffs);
			Project project = this.projectDao.findProjectById(pInfo.getProjectId());
			pInfo.setName(project.getName());
			pInfo.setPrice(project.getPrice());
			pInfo.setClientName(consumOrder.getClientName());
			pInfo.setLicensePlate(consumOrder.getLicensePlate());
			pInfo.setBrandName(consumOrder.getCarBrand());
			pInfo.setCreateDate(new Date());
			if(pInfo.getCardId() != 0 ){
				Card payCard = this.cardDao.getCardById(pInfo.getCardId());
				pInfo.setCardName(payCard.getService().getName());
				pInfo.setPayMethod(1);
			}
			
		}
		this.orderDao.save(consumOrder);
		log.debug("保存之前order----------" + consumOrder);
		log.debug("消费订单(id:" + consumOrder.getId() + ")保存成功，准备创建出库订单并保存");
		//创建出库订单并保存
		if(list != null && !list.isEmpty()){
			InventoryOrder order = new InventoryOrder();
			order.setId(IDGenerator.generate(IDGenerator.OUT_STOCK));
			order.setCreateDate(new Date());
			order.setInventoryInfos(list);
			order.setState(0);
			order.setTotalAmount(totalAmount);
			order.setTotalPrice(totalPrice);
			order.setType(consumOrder.getProgramId());
			inventoryOrderDao.save(order);
			log.debug("出库订单(id:" + order.getId() + ")保存成功");
		}
		return JsonResFactory.buildOrg(RESCODE.SUCCESS, "id", consumOrderId).toString();
	}

	public String list(int page, int number) {
		int from = (page - 1) * number;
		List<ConsumOrder> list = this.orderDao.list(from, number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = this.orderDao.getCount();
		int size = (int) Math.ceil(realSize/(double)number);
		JsonConfig config = JsonResFactory.dateConfig();
		JsonPropertyFilter filter = new JsonPropertyFilter();
		filter.setColletionProperties(CarType.class, Provider.class);
		config.setJsonPropertyFilter(filter);
		config.registerPropertyExclusions(Admin.class, new String[]{"password", "role", "current", "createDate", "comment"});
		JSONArray array = JSONArray.fromObject(list, config);
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, array);
		obj.put(Constants.RESPONSE_SIZE_KEY, size);
		return obj.toString();
	}

	public String finish(String consumOrderId, Date date, String comment) {
		ConsumOrder order = this.orderDao.findById(consumOrderId);
		if(order == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		log.debug("消费订单(id:" + order.getId() + ")施工完成, 完成时间:" + date + ", 备注:" + comment);
		order.setFinishTime(date);
		order.setComment(comment);
		order.setState(1);
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String deliverCar(String consumOrderId, Date date, String comment) {
		ConsumOrder order = this.orderDao.findById(consumOrderId);
		if(order == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		if(order.getState() < 1){
			log.debug("消费订单(id:" + order.getId() + ")施工未完成，无法交车");
			return JsonResFactory.buildOrg(RESCODE.WORK_NOT_FINISH).toString();
		}
		log.debug("消费订单(id:" + order.getId() + ")交车, 时间:" + date + ", 备注:" + comment);
		order.setState(2);
		order.setDeliverTime(date);
		order.setComment(comment);
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	
	//***************************
	//***************************
	//freelycar v1.0 暂不提供订单修改接口
	
	/*public String modify(ConsumOrder consumOrder) {
		ConsumOrder exist = this.orderDao.findById(consumOrder.getId());
		if(exist == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		exist.setLicensePlate(consumOrder.getLicensePlate());
		exist.setCarId(consumOrder.getCarId());
		exist.setCarBrand(consumOrder.getCarBrand());
		exist.setCarType(consumOrder.getCarType());
		exist.setInventoryInfos(consumOrder.getInventoryInfos());
		exist.setParkingLocation(consumOrder.getParkingLocation());
		exist.setPickTime(consumOrder.getPickTime());
		exist.setTotalPrice(consumOrder.getTotalPrice());
		exist.setProjects(consumOrder.getProjects());
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}*/

	public String query(ConsumOrderQueryCondition condition) {
		String andCondition = this.buildAndCondition(condition);
		int from = (condition.getPage() - 1) * condition.getNumber();
		List<ConsumOrder> list = this.orderDao.query(andCondition, from, condition.getNumber());
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = this.orderDao.getQueryCount(andCondition);
		int size = (int) Math.ceil(realSize/(double) condition.getNumber());
		JsonConfig config = JsonResFactory.dateConfig();
		JsonPropertyFilter filter = new JsonPropertyFilter();
		filter.setColletionProperties(Car.class, CarType.class, Card.class, ProjectInventoriesInfo.class, Project.class);
		config.setJsonPropertyFilter(filter);
		config.registerPropertyExclusions(Admin.class, new String[]{"password", "role", "current", "createDate", "comment"});
		JSONArray array = JSONArray.fromObject(list, config);
		net.sf.json.JSONObject res = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, array);
		res.put(Constants.RESPONSE_SIZE_KEY, size);
		return res.toString();
	}

	private String buildAndCondition(ConsumOrderQueryCondition condition){
		//生成条件查询and后缀语句
		ConsumOrder order = condition.getConsumOrder();
		String licensePlate = order.getLicensePlate();
		int programId = order.getProgramId();
		int clientId = order.getClientId();
		int state = order.getState();
		String temp = new ConsumOrderAndQueryCreator(order.getId(), licensePlate, 
				String.valueOf(programId), String.valueOf(order.getPayState()), 
				String.valueOf(clientId), String.valueOf(state)).createStatement();
		StringBuilder sb = new StringBuilder(temp.trim());
		Date startDate = condition.getStartDate();
		Date endDate = condition.getEndDate();
		if(startDate != null || endDate != null){
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String[] types = {" createDate ", " deliverTime ", " pickTime ", " finishTime "};
			int dateType = condition.getDateType();
			boolean and = sb.length() != 0;
			if(startDate != null){
				if(and){
					sb.append(" and");
				}
				sb.append(types[dateType]);
				sb.append(" > '");
				sb.append(sdf.format(startDate));
				sb.append("'");
				and = true;
			}
			if(endDate != null){
				sb.append(" and");
				sb.append(types[dateType]);
				sb.append(" < '");
				sb.append(sdf.format(endDate));
				sb.append("'");
			}
		}
		String andCondition = sb.toString();
		log.debug("消费订单查询语句生成条件：" + andCondition);
		return andCondition;
	}
	
	public String getOrderById(String consumOrderId) {
		ConsumOrder order = this.orderDao.findById(consumOrderId);
		if(order == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		return JsonResFactory.buildNetWithData(RESCODE.SUCCESS, 
				net.sf.json.JSONObject.fromObject(order, JsonResFactory.dateConfig())).toString();
	}
	
}
