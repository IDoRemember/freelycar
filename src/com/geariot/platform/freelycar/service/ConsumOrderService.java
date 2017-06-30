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

import com.geariot.platform.freelycar.dao.ConsumOrderDao;
import com.geariot.platform.freelycar.dao.InventoryDao;
import com.geariot.platform.freelycar.dao.InventoryOrderDao;
import com.geariot.platform.freelycar.entities.Car;
import com.geariot.platform.freelycar.entities.CarType;
import com.geariot.platform.freelycar.entities.Card;
import com.geariot.platform.freelycar.entities.ConsumExtraInventoriesInfo;
import com.geariot.platform.freelycar.entities.ConsumOrder;
import com.geariot.platform.freelycar.entities.Inventory;
import com.geariot.platform.freelycar.entities.InventoryOrder;
import com.geariot.platform.freelycar.entities.InventoryOrderInfo;
import com.geariot.platform.freelycar.entities.Project;
import com.geariot.platform.freelycar.entities.ProjectInventoriesInfo;
import com.geariot.platform.freelycar.entities.Provider;
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
	
	public String book(ConsumOrder consumOrder) {
		consumOrder.setCreateDate(new Date());
		consumOrder.setState(0);
		Set<ConsumExtraInventoriesInfo> infos = consumOrder.getInventoryInfos();
		List<InventoryOrderInfo> list = new ArrayList<>();
		float totalAmount = 0.0f;
		float totalPrice = 0.0f;
		for(ConsumExtraInventoriesInfo info : infos){
			Inventory inventory = inventoryDao.findById(info.getInventory().getId());
			if(inventory.getAmount() < info.getNumber()){
				throw new ForRollbackException(RESCODE.INVENTORY_NOT_ENOUGH.getMsg(), RESCODE.INVENTORY_NOT_ENOUGH.getValue());
			}
			inventory.setAmount(inventory.getAmount() - info.getNumber());
			InventoryOrderInfo temp = new InventoryOrderInfo();
			temp.setAmount(info.getNumber());
			Inventory inv = info.getInventory();
			temp.setBrandName(inv.getBrand().getName());
			temp.setInventoryId(inv.getId());
			temp.setName(inv.getName());
			temp.setProperty(inv.getProperty());
			temp.setStandard(inv.getStandard());
			temp.setTypeName(inv.getType().getTypeName());
			temp.setPrice(info.getInventory().getPrice() * temp.getAmount());
			list.add(temp);
			totalAmount += temp.getAmount();
			totalPrice += temp.getPrice();
		}
		this.orderDao.save(consumOrder);
		
		//创建出库订单并保存
		InventoryOrder order = new InventoryOrder();
		order.setId(IDGenerator.generate(3));
		order.setCreateDate(new Date());
		order.setInventoryOrderInfo(list);
		order.setState(0);
		order.setTotalAmount(totalAmount);
		order.setTotalPrice(totalPrice);
		order.setType(consumOrder.getProgram().getId());
		inventoryOrderDao.save(order);
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
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
		JSONArray array = JSONArray.fromObject(list, config);
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, array);
		obj.put(Constants.RESPONSE_SIZE_KEY, size);
		return obj.toString();
	}

	public String finish(String consumOrderId) {
		ConsumOrder order = this.orderDao.findById(consumOrderId);
		if(order == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		order.setState(1);
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String deliverCar(String consumOrderId) {
		ConsumOrder order = this.orderDao.findById(consumOrderId);
		if(order == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		if(order.getState() < 1){
			return JsonResFactory.buildOrg(RESCODE.WORK_NOT_FINISH).toString();
		}
		order.setState(2);
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String modify(ConsumOrder consumOrder) {
		ConsumOrder exist = this.orderDao.findById(consumOrder.getId());
		if(exist == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		exist.setCar(consumOrder.getCar());
		exist.setInventoryInfos(consumOrder.getInventoryInfos());
		exist.setParkingLocation(consumOrder.getParkingLocation());
		exist.setPickTime(consumOrder.getPickTime());
		exist.setProjectPayMethod(consumOrder.getProjectPayMethod());
		exist.setStaffs(consumOrder.getStaffs());
		exist.setTotalPrice(consumOrder.getTotalPrice());
		exist.setWorkingHour(consumOrder.getWorkingHour());
		exist.setWorkingPricePerHour(consumOrder.getWorkingPricePerHour());
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

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
		JSONArray array = JSONArray.fromObject(list, config);
		net.sf.json.JSONObject res = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, array);
		res.put(Constants.RESPONSE_SIZE_KEY, size);
		return res.toString();
	}

	private String buildAndCondition(ConsumOrderQueryCondition condition){
		//生成条件查询and后缀语句
		ConsumOrder order = condition.getConsumOrder();
		String licensePlate = null;
		int programId = -1;
		if(order.getCar() != null){
			licensePlate = order.getCar().getLicensePlate();
		}
		if(order.getProgram() != null){
			programId = order.getProgram().getId();
		}
		String temp = new ConsumOrderAndQueryCreator(order.getId(), licensePlate, 
				String.valueOf(programId), String.valueOf(order.getPayState())).createStatement();
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
	
}
