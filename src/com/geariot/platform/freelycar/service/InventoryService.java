package com.geariot.platform.freelycar.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.geariot.platform.freelycar.dao.InventoryBrandDao;
import com.geariot.platform.freelycar.dao.InventoryDao;
import com.geariot.platform.freelycar.dao.InventoryOrderDao;
import com.geariot.platform.freelycar.dao.InventoryTypeDao;
import com.geariot.platform.freelycar.entities.Inventory;
import com.geariot.platform.freelycar.entities.InventoryBrand;
import com.geariot.platform.freelycar.entities.InventoryOrder;
import com.geariot.platform.freelycar.entities.InventoryOrderInfo;
import com.geariot.platform.freelycar.entities.InventoryType;
import com.geariot.platform.freelycar.entities.Provider;
import com.geariot.platform.freelycar.model.RESCODE;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.JsonPropertyFilter;
import com.geariot.platform.freelycar.utils.JsonResFactory;
import com.geariot.platform.freelycar.utils.query.InventoryOrderAndQueryCreator;
import com.geariot.platform.freelycar.utils.query.InventoryTypeAndQueryCreator;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;

@Service
@Transactional
public class InventoryService {
	
	@Autowired
	private InventoryTypeDao inventoryTypeDao;
	
	@Autowired
	private InventoryBrandDao inventoryBrandDao;
	
	@Autowired
	private InventoryDao inventoryDao;
	
	@Autowired
	private InventoryOrderDao inventoryOrderDao;

	public String addType(InventoryType inventoryType) {
		inventoryType.setCreateDate(new Date());
		this.inventoryTypeDao.add(inventoryType);
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String deleteType(Integer[] inventoryTypeIds) {
		int success = this.inventoryTypeDao.delete(Arrays.asList(inventoryTypeIds));
		if(success == 0){
			return JsonResFactory.buildOrg(RESCODE.DELETE_ERROR).toString();
		}
		else if(success < inventoryTypeIds.length){
			return JsonResFactory.buildOrg(RESCODE.PART_SUCCESS).toString();
		}
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String listType(int page, int number) {
		int from = (page - 1) * number;
		List<InventoryType> list = this.inventoryTypeDao.list(from, number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = this.inventoryTypeDao.getCount();
		int size = (int) Math.ceil(realSize/(double)number);
		JSONArray jsonArray = JSONArray.fromObject(list, JsonResFactory.dateConfig());
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
		obj.put(Constants.RESPONSE_SIZE_KEY, size);
		return obj.toString();
	}

	public String queryType(String name, Date startTime, Date endTime, int page, int number) {
		String andCondition = this.buildTypeQueryCondition(name, startTime, endTime);
		int from = (page - 1) * number;
		List<InventoryType> list = this.inventoryTypeDao.query(andCondition, from, number);
		if(list == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = this.inventoryTypeDao.getQueryCount(andCondition);
		int size = (int) Math.ceil(realSize/(double)number);
		net.sf.json.JSONObject res = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, JSONArray.fromObject(list, JsonResFactory.dateConfig()));
		res.put(Constants.RESPONSE_SIZE_KEY, size);
		return res.toString();
	}
	
	private String buildTypeQueryCondition(String name, Date startTime, Date endTime){
		String start = null;
		String end = null;
		if(startTime != null || endTime != null){
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			if(startTime != null){
				start = sdf.format(startTime);
			}
			if(endTime != null){
				end = sdf.format(endTime);
			}
		}
		return new InventoryTypeAndQueryCreator(name, start, end).createStatement();
	}

	public String addBrand(InventoryBrand inventoryBrand) {
		inventoryBrand.setCreateDate(new Date());
		this.inventoryBrandDao.add(inventoryBrand);
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String deleteBrand(Integer[] inventoryBrandIds) {
		int success = this.inventoryBrandDao.delete(Arrays.asList(inventoryBrandIds));
		if(success == 0){
			return JsonResFactory.buildOrg(RESCODE.DELETE_ERROR).toString();
		}
		else if(success < inventoryBrandIds.length){
			return JsonResFactory.buildOrg(RESCODE.PART_SUCCESS).toString();
		}
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String listBrand(int page, int number) {
		int from = (page - 1) * number;
		List<InventoryBrand> list = this.inventoryBrandDao.list(from, number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = this.inventoryBrandDao.getCount();
		int size = (int) Math.ceil(realSize/(double)number);
		JSONArray jsonArray = JSONArray.fromObject(list, JsonResFactory.dateConfig());
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
		obj.put(Constants.RESPONSE_SIZE_KEY, size);
		return obj.toString();
	}

	public String queryBrand(String name) {
		List<InventoryBrand> list = this.inventoryBrandDao.query(name);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		return JsonResFactory.buildNetWithData(RESCODE.SUCCESS, JSONArray.fromObject(list, JsonResFactory.dateConfig())).toString();
	}

	public String addInventory(Inventory inventory) {
		inventory.setCreateDate(new Date());
		this.inventoryDao.add(inventory);
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String deleteInventory(Integer[] inventoryIds) {
		int success = this.inventoryDao.delete(Arrays.asList(inventoryIds));
		if(success == 0){
			return JsonResFactory.buildOrg(RESCODE.DELETE_ERROR).toString();
		}
		else if(success < inventoryIds.length){
			return JsonResFactory.buildOrg(RESCODE.PART_SUCCESS).toString();
		}
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String inStock(InventoryOrder order) {
		order.setCreateDate(new Date());
		order.setState(0);
		List<InventoryOrderInfo> inventories = order.getInventoryOrderInfo();
		List<Inventory> fails = new ArrayList<>();
		for(InventoryOrderInfo inventory : inventories){
			Inventory exist = this.inventoryDao.findById(inventory.getInventory().getId());
			if(exist != null){
				exist.setAmount(exist.getAmount() + inventory.getAmount());
			}
			else {
				order.getInventoryOrderInfo().remove(inventory);
				fails.add(inventory.getInventory());
			}
		}
		this.inventoryOrderDao.save(order);
		if(!fails.isEmpty()){
			JSONArray array = JSONArray.fromObject(fails);
			return JsonResFactory.buildNetWithData(RESCODE.PART_SUCCESS, array).toString();
		}
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String outStock(InventoryOrder order) {
		order.setCreateDate(new Date());
		List<InventoryOrderInfo> inventories = order.getInventoryOrderInfo();
		List<Inventory> fails = new ArrayList<>();
		for(InventoryOrderInfo inventory : inventories){
			Inventory exist = this.inventoryDao.findById(inventory.getInventory().getId());
			if(exist != null && exist.getAmount() > inventory.getAmount()){
				exist.setAmount(exist.getAmount() - inventory.getAmount());
			}
			else {
				order.getInventoryOrderInfo().remove(inventory);
				fails.add(inventory.getInventory());
			}
		}
		if(!fails.isEmpty()){
			JSONArray array = JSONArray.fromObject(fails);
			return JsonResFactory.buildNetWithData(RESCODE.PART_SUCCESS, array).toString();
		}
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String listInventory(int page, int number) {
		int from = (page - 1) * number;
		List<Inventory> list = this.inventoryDao.list(from, number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = this.inventoryDao.getCount();
		int size = (int) Math.ceil(realSize/(double)number);
		JSONArray jsonArray = JSONArray.fromObject(list, JsonResFactory.dateConfig(Set.class));
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
		obj.put(Constants.RESPONSE_SIZE_KEY, size);
		return obj.toString();
	}

	public String findInventoryById(String inventoryId) {
		Inventory inventory = this.inventoryDao.findById(inventoryId);
		if(inventory == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		return JsonResFactory.buildNet(RESCODE.SUCCESS, 
				Constants.RESPONSE_DATA_KEY, JSONArray.fromObject(inventory, JsonResFactory.dateConfig(Set.class))).toString();
	}

	public String listOrder(int page, int number) {
		int from = (page - 1) * number;
		List<InventoryOrder> list = this.inventoryOrderDao.list(from, number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = this.inventoryOrderDao.getCount();
		int size = (int) Math.ceil(realSize/(double)number);
		JSONArray jsonArray = JSONArray.fromObject(list, JsonResFactory.dateConfig());
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
		obj.put(Constants.RESPONSE_SIZE_KEY, size);
		return obj.toString();
	}

	public String queryOrder(String inventoryOrderId, String adminId, int page, int number) {
		int from = (page - 1) * number;
		String andCondition = new InventoryOrderAndQueryCreator(inventoryOrderId, adminId).createStatement();
		List<InventoryOrder> list = this.inventoryOrderDao.query(andCondition, from, number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = this.inventoryOrderDao.getQueryCount(andCondition);
		int size = (int) Math.ceil(realSize/(double) number);
		JsonConfig config = JsonResFactory.dateConfig();
		JsonPropertyFilter filter = new JsonPropertyFilter(Set.class);
		config.setJsonPropertyFilter(filter);
		JSONArray array = JSONArray.fromObject(list, config);
		net.sf.json.JSONObject res = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, array);
		res.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
		res.put(Constants.RESPONSE_SIZE_KEY, size);
		return res.toString();
	}

	public String orderDetail(String inventoryOrderId) {
		InventoryOrder order = this.inventoryOrderDao.findById(inventoryOrderId);
		if(order == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		JsonConfig config = JsonResFactory.dateConfig();
		JsonPropertyFilter filter = new JsonPropertyFilter();
		filter.setColletionProperties(Provider.class);
		config.setJsonPropertyFilter(filter);
		return JsonResFactory.buildNetWithData(RESCODE.SUCCESS, 
				net.sf.json.JSONObject.fromObject(order, config)).toString();
	}

}
