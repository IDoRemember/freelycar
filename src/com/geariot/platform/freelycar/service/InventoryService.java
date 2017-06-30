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
import com.geariot.platform.freelycar.utils.IDGenerator;
import com.geariot.platform.freelycar.utils.JsonPropertyFilter;
import com.geariot.platform.freelycar.utils.JsonResFactory;
import com.geariot.platform.freelycar.utils.query.InventoryAndQueryCreator;
import com.geariot.platform.freelycar.utils.query.InventoryBrandAndQueryCreator;
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
		obj.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
		return obj.toString();
	}

	public String queryType(String name , int page, int number) {
		String andCondition = new InventoryTypeAndQueryCreator(name).createStatement();
		int from = (page - 1) * number;
		List<InventoryType> list = this.inventoryTypeDao.query(andCondition, from, number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = this.inventoryTypeDao.getQueryCount(andCondition);
		int size = (int) Math.ceil(realSize/(double)number);
		net.sf.json.JSONObject res = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, JSONArray.fromObject(list, JsonResFactory.dateConfig()));
		res.put(Constants.RESPONSE_SIZE_KEY, size);
		res.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
		return res.toString();
	}
	
	/*private String buildTypeQueryCondition(String name, Date startTime, Date endTime){
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
	}*/

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

	/*public String listBrand(int page, int number) {
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
		obj.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
		return obj.toString();
	}*/

	public String queryBrand(String name , int page , int number) {
		String andCondition = new InventoryBrandAndQueryCreator(name).createStatement();
		int from = (page - 1) * number;
		List<InventoryBrand> list = this.inventoryBrandDao.getConditionQuery(andCondition, from, number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = inventoryBrandDao.getConditionCount(andCondition);
		int size = (int) Math.ceil(realSize/(double)number);
		net.sf.json.JSONObject res = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, JSONArray.fromObject(list, JsonResFactory.dateConfig()));
		res.put(Constants.RESPONSE_SIZE_KEY, size);
		res.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
		return res.toString();
	}

	public String addInventory(Inventory inventory) {
		inventory.setCreateDate(new Date());
		inventory.setId(IDGenerator.generate(IDGenerator.INV_ID));
		this.inventoryDao.add(inventory);
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String deleteInventory(String... inventoryIds) {
		int success = this.inventoryDao.delete(Arrays.asList(inventoryIds));
		if(success == 0){
			return JsonResFactory.buildOrg(RESCODE.DELETE_ERROR).toString();
		}
		else if(success < inventoryIds.length){
			return JsonResFactory.buildOrg(RESCODE.PART_SUCCESS).toString();
		}
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String modify(Inventory inventory) {
		Inventory exist = this.inventoryDao.findById(inventory.getId());
		if(exist == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		exist.setBrand(inventory.getBrand());
		exist.setComment(inventory.getComment());
		exist.setName(inventory.getName());
		exist.setProperty(inventory.getProperty());
		exist.setStandard(inventory.getStandard());
		exist.setType(inventory.getType());
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}
	
	public String inStock(InventoryOrder order) {
		order.setId(IDGenerator.generate(IDGenerator.IN_STOCK));
		order.setCreateDate(new Date());
		order.setState(0);
		List<InventoryOrderInfo> inventories = order.getInventoryInfos();
		List<String> fails = new ArrayList<>();
		for(InventoryOrderInfo inventory : inventories){
			Inventory exist = this.inventoryDao.findById(inventory.getInventoryId());
			if(exist != null){
				exist.setAmount(exist.getAmount() + inventory.getAmount());
			}
			else {
				order.getInventoryInfos().remove(inventory);
				fails.add(inventory.getName());
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
		order.setId(IDGenerator.generate(IDGenerator.OUT_STOCK));
		order.setCreateDate(new Date());
		List<InventoryOrderInfo> inventories = order.getInventoryInfos();
		List<String> fails = new ArrayList<>();
		for(InventoryOrderInfo inventory : inventories){
			Inventory exist = this.inventoryDao.findById(inventory.getInventoryId());
			if(exist != null && exist.getAmount() > inventory.getAmount()){
				exist.setAmount(exist.getAmount() - inventory.getAmount());
			}
			else {
				order.getInventoryInfos().remove(inventory);
				fails.add(inventory.getName());
			}
		}
		if(!fails.isEmpty()){
			JSONArray array = JSONArray.fromObject(fails);
			return JsonResFactory.buildNetWithData(RESCODE.PART_SUCCESS, array).toString();
		}
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String listInventory(String name, String typeId, int page, int number) {
		String andCondition = new InventoryAndQueryCreator(name, typeId).createStatement();
		int from = (page - 1) * number;
		List<Inventory> list = this.inventoryDao.list(andCondition, from, number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = this.inventoryDao.getCount(andCondition);
		int size = (int) Math.ceil(realSize/(double)number);
		JSONArray jsonArray = JSONArray.fromObject(list, JsonResFactory.dateConfig());
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
		obj.put(Constants.RESPONSE_SIZE_KEY, size);
		obj.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
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
		obj.put(Constants.RESPONSE_REAL_SIZE_KEY,realSize);
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

	//单据修改
	public String modifyOrder(InventoryOrder order) {
		InventoryOrder exist = this.inventoryOrderDao.findById(order.getId());
		if(exist == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		exist.setOrderMaker(order.getOrderMaker());
		//修改前单据库存项目列表
		List<InventoryOrderInfo> existInfos = exist.getInventoryInfos();
		List<InventoryOrderInfo> fails = new ArrayList<>();
		//遍历新单据列表中项目
		for(InventoryOrderInfo newInfo : order.getInventoryInfos()){
			InventoryOrderInfo existInfo = null;
			//在原单据列表中查找该库存对应的信息
			for(InventoryOrderInfo temp : existInfos){ 
				if(temp.getInventoryId().equals(newInfo.getInventoryId())){
					existInfo = temp;
					break;
				}
			}
			Inventory inventory = this.inventoryDao.findById(newInfo.getInventoryId());
			//如果没找到，说明是新增项目，直接增加数量
			if(existInfo == null){
				inventory.setAmount(inventory.getAmount() + newInfo.getAmount());
			}
			else{
				//找到项目，可能是数量修改
				//如果数量减少，判断减少数量，如果减少数量大于库存现有数量，则此项目的修改失败
				if(newInfo.getAmount() < existInfo.getAmount()){
					float minus = existInfo.getAmount() - newInfo.getAmount();
					if(minus > inventory.getAmount()){
						fails.add(newInfo);
						newInfo.setAmount(existInfo.getAmount());
					}
					else{
						inventory.setAmount(inventory.getAmount() - minus);
					}
				}
				//如果数量增加，直接更改库存数量
				else{
					inventory.setAmount(newInfo.getAmount() - existInfo.getAmount());
				}
				//将原单据列表中移除找到的信息。
				existInfos.remove(existInfo);
			}
		}
		//如果原单据列表中不为空，说明有入库信息被删除，查找库存并判断数量是否满足删除条件。
		for(InventoryOrderInfo delete : existInfos){
			Inventory inventory = this.inventoryDao.findById(delete.getInventoryId());
			if(inventory.getAmount() < delete.getAmount()){
				fails.add(delete);
				order.getInventoryInfos().add(delete);
			}
			else{
				inventory.setAmount(inventory.getAmount() - delete.getAmount());
			}
		}
		exist.setInventoryInfos(order.getInventoryInfos());
		if(!fails.isEmpty()){
			net.sf.json.JSONArray array = net.sf.json.JSONArray.fromObject(fails);
			return JsonResFactory.buildNetWithData(RESCODE.PART_SUCCESS, array).toString();
		}
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String deleteOrder(String orderId) {
		this.inventoryOrderDao.deleteOrder(orderId);
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

}
