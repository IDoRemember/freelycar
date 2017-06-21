package com.geariot.platform.freelycar.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import com.geariot.platform.freelycar.dao.OrdersDao;
import com.geariot.platform.freelycar.entities.Car;
import com.geariot.platform.freelycar.entities.CarType;
import com.geariot.platform.freelycar.entities.ConsumOrder;
import com.geariot.platform.freelycar.entities.ProjectInventoriesInfo;
import com.geariot.platform.freelycar.entities.Provider;
import com.geariot.platform.freelycar.model.RESCODE;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.JsonPropertyFilter;
import com.geariot.platform.freelycar.utils.JsonResFactory;
import com.geariot.platform.freelycar.utils.query.ConsumOrderQueryCondition;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;

@Service
@Transactional
public class OrdersService {

	@Autowired
	private OrdersDao ordersDao;
	
	public String book(@RequestBody ConsumOrder consumOrder) {
		consumOrder.setCreateDate(new Date());
		consumOrder.setState(0);
		this.ordersDao.save(consumOrder);
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String list(int page, int number) {
		int from = (page - 1) * number;
		List<ConsumOrder> list = this.ordersDao.list(from, number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = this.ordersDao.getCount();
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
		ConsumOrder order = this.ordersDao.findById(consumOrderId);
		if(order == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		order.setState(1);
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String deliverCar(String consumOrderId) {
		ConsumOrder order = this.ordersDao.findById(consumOrderId);
		if(order == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		if(order.getState() < 1){
			return JsonResFactory.buildOrg(RESCODE.WORK_NOT_FINISH).toString();
		}
		order.setState(3);
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String modify(ConsumOrder consumOrder) {
		ConsumOrder exist = this.ordersDao.findById(consumOrder.getId());
		if(exist == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		exist.setCar(consumOrder.getCar());
		exist.setClient(consumOrder.getClient());
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
		List<ConsumOrder> list = this.ordersDao.query(condition);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		JsonConfig config = JsonResFactory.dateConfig();
		JsonPropertyFilter filter = new JsonPropertyFilter();
		filter.setColletionProperties(Car.class, CarType.class, ProjectInventoriesInfo.class);
		config.setJsonPropertyFilter(filter);
		JSONArray array = JSONArray.fromObject(list, config);
		return JsonResFactory.buildNetWithData(RESCODE.SUCCESS, array).toString();
	}

}
