package com.geariot.platform.freelycar.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Set;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.geariot.platform.freelycar.dao.ConsumOrderDao;
import com.geariot.platform.freelycar.dao.ExpendOrderDao;
import com.geariot.platform.freelycar.dao.IncomeOrderDao;
import com.geariot.platform.freelycar.dao.InventoryBrandDao;
import com.geariot.platform.freelycar.dao.InventoryDao;
import com.geariot.platform.freelycar.dao.InventoryOrderDao;
import com.geariot.platform.freelycar.dao.InventoryTypeDao;
import com.geariot.platform.freelycar.dao.ProjectDao;
import com.geariot.platform.freelycar.entities.Admin;
import com.geariot.platform.freelycar.entities.ExpendOrder;
import com.geariot.platform.freelycar.entities.IncomeOrder;
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
import com.geariot.platform.freelycar.utils.query.InventoryBean;
import com.geariot.platform.freelycar.utils.query.InventoryBrandAndQueryCreator;
import com.geariot.platform.freelycar.utils.query.InventoryOrderAndQueryCreator;
import com.geariot.platform.freelycar.utils.query.InventoryOrderAndQueryCreator2;
import com.geariot.platform.freelycar.utils.query.InventoryTypeAndQueryCreator;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

@Service
@Transactional
public class InventoryService {

	private static final Logger log = LogManager.getLogger(InventoryService.class);

	@Autowired
	private InventoryTypeDao inventoryTypeDao;

	@Autowired
	private InventoryBrandDao inventoryBrandDao;

	@Autowired
	private InventoryDao inventoryDao;

	@Autowired
	private InventoryOrderDao inventoryOrderDao;

	@Autowired
	private ConsumOrderDao consumOrderDao;

	@Autowired
	private ProjectDao projectDao;
	
	@Autowired
	private ExpendOrderDao expendOrderDao;
	
	@Autowired
	private IncomeOrderDao incomeOrderDao;

	public String addType(InventoryType inventoryType) {
		InventoryType exist = inventoryTypeDao.findByName(inventoryType.getTypeName());
		if (exist != null) {
			return JsonResFactory.buildOrg(RESCODE.NAME_EXIST).toString();
		} else {
			inventoryType.setCreateDate(new Date());
			this.inventoryTypeDao.add(inventoryType);
			JsonConfig config = JsonResFactory.dateConfig();
			return JsonResFactory.buildNetWithData(RESCODE.SUCCESS, JSONObject.fromObject(inventoryType, config))
					.toString();
		}
	}

	public String deleteType(Integer[] inventoryTypeIds) {
		for(Integer inventoryTypeId : inventoryTypeIds){
			String typeName = inventoryTypeDao.findById(inventoryTypeId).getTypeName();
			this.inventoryTypeDao.delete(inventoryTypeId);
			List<String> ids = inventoryDao.findByTypeName(typeName);
			if (this.consumOrderDao.countInventoryInfoByIds(ids) > 0 || this.projectDao.countInventoryByIds(ids) > 0) {
				log.debug("ConsumExtraInventoriesInfo或ProjectInventoriesInfo有对库存的引用，无法删除");
				return JsonResFactory.buildOrg(RESCODE.UNABLE_TO_DELETE).toString();
			}
			int success = this.inventoryDao.delete(ids);
			if (success == 0) {
				return JsonResFactory.buildOrg(RESCODE.DELETE_ERROR).toString();
			} else if (success < ids.size()) {
				return JsonResFactory.buildOrg(RESCODE.PART_SUCCESS).toString();
			}
		}
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String listType(int page, int number) {
		int from = (page - 1) * number;
		List<InventoryType> list = this.inventoryTypeDao.list(from, number);
		if (list == null || list.isEmpty()) {
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = this.inventoryTypeDao.getCount();
		int size = (int) Math.ceil(realSize / (double) number);
		JSONArray jsonArray = JSONArray.fromObject(list, JsonResFactory.dateConfig());
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
		obj.put(Constants.RESPONSE_SIZE_KEY, size);
		obj.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
		return obj.toString();
	}

	public String queryType(String name, int page, int number) {
		String andCondition = new InventoryTypeAndQueryCreator(name).createStatement();
		int from = (page - 1) * number;
		List<InventoryType> list = this.inventoryTypeDao.query(andCondition, from, number);
		if (list == null || list.isEmpty()) {
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = this.inventoryTypeDao.getQueryCount(andCondition);
		int size = (int) Math.ceil(realSize / (double) number);
		net.sf.json.JSONObject res = JsonResFactory.buildNetWithData(RESCODE.SUCCESS,
				JSONArray.fromObject(list, JsonResFactory.dateConfig()));
		res.put(Constants.RESPONSE_SIZE_KEY, size);
		res.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
		return res.toString();
	}

	/*
	 * private String buildTypeQueryCondition(String name, Date startTime, Date
	 * endTime){ String start = null; String end = null; if(startTime != null ||
	 * endTime != null){ SimpleDateFormat sdf = new
	 * SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); if(startTime != null){ start =
	 * sdf.format(startTime); } if(endTime != null){ end = sdf.format(endTime);
	 * } } return new InventoryTypeAndQueryCreator(name, start,
	 * end).createStatement(); }
	 */

	public String addBrand(InventoryBrand inventoryBrand) {
		inventoryBrand.setCreateDate(new Date());
		this.inventoryBrandDao.add(inventoryBrand);
		JsonConfig config = JsonResFactory.dateConfig();
		return JsonResFactory.buildNetWithData(RESCODE.SUCCESS, JSONObject.fromObject(inventoryBrand, config))
				.toString();
	}

	public String deleteBrand(Integer[] inventoryBrandIds) {
		int success = this.inventoryBrandDao.delete(Arrays.asList(inventoryBrandIds));
		if (success == 0) {
			return JsonResFactory.buildOrg(RESCODE.DELETE_ERROR).toString();
		} else if (success < inventoryBrandIds.length) {
			return JsonResFactory.buildOrg(RESCODE.PART_SUCCESS).toString();
		}
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	/*
	 * public String listBrand(int page, int number) { int from = (page - 1) *
	 * number; List<InventoryBrand> list = this.inventoryBrandDao.list(from,
	 * number); if(list == null || list.isEmpty()){ return
	 * JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString(); } long realSize =
	 * this.inventoryBrandDao.getCount(); int size = (int)
	 * Math.ceil(realSize/(double)number); JSONArray jsonArray =
	 * JSONArray.fromObject(list, JsonResFactory.dateConfig());
	 * net.sf.json.JSONObject obj =
	 * JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
	 * obj.put(Constants.RESPONSE_SIZE_KEY, size);
	 * obj.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize); return
	 * obj.toString(); }
	 */

	public String queryBrand(String name, int page, int number) {
		String andCondition = new InventoryBrandAndQueryCreator(name).createStatement();
		int from = (page - 1) * number;
		List<InventoryBrand> list = this.inventoryBrandDao.getConditionQuery(andCondition, from, number);
		if (list == null || list.isEmpty()) {
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = inventoryBrandDao.getConditionCount(andCondition);
		int size = (int) Math.ceil(realSize / (double) number);
		net.sf.json.JSONObject res = JsonResFactory.buildNetWithData(RESCODE.SUCCESS,
				JSONArray.fromObject(list, JsonResFactory.dateConfig()));
		res.put(Constants.RESPONSE_SIZE_KEY, size);
		res.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
		return res.toString();
	}

	public String addInventory(Inventory inventory) {
		inventory.setCreateDate(new Date());
		inventory.setId(IDGenerator.generate(IDGenerator.INV_ID));
		inventory.setTypeName(inventoryTypeDao.findById(inventory.getTypeId()).getTypeName());
		inventory.setBrandName(inventoryBrandDao.findById(inventory.getBrandId()).getName());
		this.inventoryDao.add(inventory);
		JsonConfig config = JsonResFactory.dateConfig();
		return JsonResFactory.buildNetWithData(RESCODE.SUCCESS, net.sf.json.JSONObject.fromObject(inventory, config))
				.toString();
	}

	public String deleteInventory(String... inventoryIds) {
		List<String> ids = Arrays.asList(inventoryIds);
		// 查找ConsumExtraInventoriesInfo及ProjectInventoriesInfo，如果有与该配件关联的信息，则无法删除，返回错误
		if (this.consumOrderDao.countInventoryInfoByIds(ids) > 0 || this.projectDao.countInventoryByIds(ids) > 0) {
			log.debug("ConsumExtraInventoriesInfo或ProjectInventoriesInfo有对库存的引用，无法删除");
			return JsonResFactory.buildOrg(RESCODE.UNABLE_TO_DELETE).toString();
		}

		int success = this.inventoryDao.delete(ids);
		if (success == 0) {
			return JsonResFactory.buildOrg(RESCODE.DELETE_ERROR).toString();
		} else if (success < inventoryIds.length) {
			return JsonResFactory.buildOrg(RESCODE.PART_SUCCESS).toString();
		}
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String modify(Inventory inventory) {
		Inventory exist = this.inventoryDao.findById(inventory.getId());
		if (exist == null) {
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		exist.setBrandName(inventory.getBrandName());
		exist.setBrandId(inventory.getBrandId());
		exist.setComment(inventory.getComment());
		exist.setName(inventory.getName());
		exist.setProperty(inventory.getProperty());
		exist.setStandard(inventory.getStandard());
		exist.setTypeId(inventory.getTypeId());
		exist.setTypeName(inventory.getTypeName());
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String inStock(InventoryOrder order) {
		order.setId(IDGenerator.generate(IDGenerator.IN_STOCK));
		log.debug("入库中，生成入库单id:" + order.getId());
		order.setCreateDate(new Date());
		order.setState(0);
		List<InventoryOrderInfo> inventories = order.getInventoryInfos();
		List<String> fails = new ArrayList<>();
		for (InventoryOrderInfo inventory : inventories) {
			Inventory exist = this.inventoryDao.findById(inventory.getInventoryId());
			if (exist != null) {
				log.debug("库存产品(id:" + inventory.getInventoryId() + ",名称: " + inventory.getName() + ")增加"
						+ inventory.getAmount() + inventory.getStandard());
				exist.setAmount(exist.getAmount() + inventory.getAmount());
			} else {
				log.debug("库存产品(id:" + inventory.getInventoryId() + ",名称: " + inventory.getName() + ")未找到，增加失败");
				order.getInventoryInfos().remove(inventory);
				fails.add(inventory.getName());
			}
		}
		this.inventoryOrderDao.save(order);
		
		ExpendOrder expendOrder = new ExpendOrder();
		expendOrder.setAmount(order.getTotalPrice());
		expendOrder.setPayDate(new Date());
		expendOrder.setType("采购入库");
		expendOrderDao.save(expendOrder);
		
		log.debug("入库单(id:" + order.getId() + ")保存成功");
		if (!fails.isEmpty()) {
			JSONArray array = JSONArray.fromObject(fails);
			return JsonResFactory.buildNetWithData(RESCODE.PART_SUCCESS, array).toString();
		}
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String outStock(InventoryOrder order) {
		order.setId(IDGenerator.generate(IDGenerator.OUT_STOCK));
		log.debug("出库中，生成出库单id:" + order.getId());
		order.setCreateDate(new Date());
		List<InventoryOrderInfo> inventories = order.getInventoryInfos();
		List<String> fails = new ArrayList<>();
		for (InventoryOrderInfo inventory : inventories) {
			Inventory exist = this.inventoryDao.findById(inventory.getInventoryId());
			if (exist != null && exist.getAmount() > inventory.getAmount()) {
				log.debug("库存产品(id:" + inventory.getInventoryId() + ",名称: " + inventory.getName() + ")减少"
						+ inventory.getAmount() + inventory.getStandard());
				exist.setAmount(exist.getAmount() - inventory.getAmount());
			} else {
				log.debug("库存产品(id:" + inventory.getInventoryId() + ",名称: " + inventory.getName() + ")库存数量:"
						+ exist.getAmount() + exist.getStandard());
				log.debug("库存产品(id:" + inventory.getInventoryId() + ",名称: " + inventory.getName()
						+ ")出库失败，库存未找到或库存产品少入出库数量");
				order.getInventoryInfos().remove(inventory);
				fails.add(inventory.getName());
			}
		}
		if (!fails.isEmpty()) {
			JSONArray array = JSONArray.fromObject(fails);
			return JsonResFactory.buildNetWithData(RESCODE.PART_SUCCESS, array).toString();
		}
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String listInventory(String name, String typeId, int page, int number) {
		String andCondition = new InventoryAndQueryCreator(name, typeId).createStatement();
		int from = (page - 1) * number;
		List<Inventory> list = this.inventoryDao.list(andCondition, from, number);
		if (list == null || list.isEmpty()) {
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = this.inventoryDao.getCount(andCondition);
		int size = (int) Math.ceil(realSize / (double) number);
		JSONArray jsonArray = JSONArray.fromObject(list, JsonResFactory.dateConfig());
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
		obj.put(Constants.RESPONSE_SIZE_KEY, size);
		obj.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
		return obj.toString();
	}

	public String findInventoryById(String inventoryId) {
		Inventory inventory = this.inventoryDao.findById(inventoryId);
		if (inventory == null) {
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		return JsonResFactory.buildNet(RESCODE.SUCCESS, Constants.RESPONSE_DATA_KEY,
				JSONArray.fromObject(inventory, JsonResFactory.dateConfig(Set.class))).toString();
	}

	public String listOrder(int page, int number) {
		int from = (page - 1) * number;
		List<InventoryOrder> list = this.inventoryOrderDao.list(from, number);
		if (list == null || list.isEmpty()) {
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = this.inventoryOrderDao.getCount();
		int size = (int) Math.ceil(realSize / (double) number);
		JsonConfig config = JsonResFactory.dateConfig();
		config.registerPropertyExclusions(Admin.class,
				new String[] { "password", "role", "current", "createDate", "comment" });
		JSONArray jsonArray = JSONArray.fromObject(list, config);
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
		obj.put(Constants.RESPONSE_SIZE_KEY, size);
		obj.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
		return obj.toString();
	}

	public String queryOrder(String inventoryOrderId, String adminId, String type, Date startTime, Date endTime,
			int page, int number) {
		log.debug("查询库存订单，输入参数：(id:" + inventoryOrderId + "; adminId:" + adminId + "; type:" + type + "; startTime:"
				+ startTime + "; endTime:" + endTime + ")");
		int from = (page - 1) * number;
		String temp = new InventoryOrderAndQueryCreator(inventoryOrderId, adminId, type).createStatement();
		if(type == "1"){
			type = "0"; 
			temp = new InventoryOrderAndQueryCreator2(inventoryOrderId, adminId, type).createStatement();
		}
		String andCondition = null;
		if (startTime != null || endTime != null) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			StringBuilder sb = new StringBuilder(temp.trim());
			if (sb.length() != 0) {
				sb.append(" and ");
			}
			if (startTime != null) {
				sb.append("createDate > '");
				sb.append(sdf.format(startTime));
				sb.append("'");
			}
			if (sb.length() != 0) {
				sb.append(" and ");
			}
			if (endTime != null) {
				sb.append("createDate < '");
				sb.append(sdf.format(endTime));
				sb.append("'");
			}
			andCondition = sb.toString();
		} else {
			andCondition = temp;
		}
		log.debug("生产的and条件语句:" + andCondition);
		List<InventoryOrder> list = this.inventoryOrderDao.query(andCondition, from, number);
		if (list == null || list.isEmpty()) {
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = this.inventoryOrderDao.getQueryCount(andCondition);
		int size = (int) Math.ceil(realSize / (double) number);
		JsonConfig config = JsonResFactory.dateConfig();
		JsonPropertyFilter filter = new JsonPropertyFilter(Set.class);
		config.setJsonPropertyFilter(filter);
		config.registerPropertyExclusions(Admin.class,
				new String[] { "password", "role", "current", "createDate", "comment" });
		JSONArray array = JSONArray.fromObject(list, config);
		net.sf.json.JSONObject res = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, array);
		res.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
		res.put(Constants.RESPONSE_SIZE_KEY, size);
		return res.toString();
	}

	public String orderDetail(String inventoryOrderId) {
		InventoryOrder order = this.inventoryOrderDao.findById(inventoryOrderId);
		if (order == null) {
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		JsonConfig config = JsonResFactory.dateConfig();
		config.registerPropertyExclusions(Admin.class,
				new String[] { "password", "role", "current", "createDate", "comment" });
		JsonPropertyFilter filter = new JsonPropertyFilter();
		filter.setColletionProperties(Provider.class);
		config.setJsonPropertyFilter(filter);
		return JsonResFactory.buildNetWithData(RESCODE.SUCCESS, net.sf.json.JSONObject.fromObject(order, config))
				.toString();
	}

	// 单据修改
	public String modifyOrder(InventoryOrder order) {
		InventoryOrder exist = this.inventoryOrderDao.findById(order.getId());
		if (exist == null) {
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		exist.setOrderMaker(order.getOrderMaker());
		// 修改前单据库存项目列表
		List<InventoryOrderInfo> existInfos = exist.getInventoryInfos();
		List<InventoryOrderInfo> fails = new ArrayList<>();
		// 遍历新单据列表中项目
		for (InventoryOrderInfo newInfo : order.getInventoryInfos()) {
			InventoryOrderInfo existInfo = null;
			// 在原单据列表中查找该库存对应的信息
			for (InventoryOrderInfo temp : existInfos) {
				if (temp.getInventoryId().equals(newInfo.getInventoryId())) {
					existInfo = temp;
					break;
				}
			}
			Inventory inventory = this.inventoryDao.findById(newInfo.getInventoryId());
			// 如果没找到，说明是新增项目，直接增加数量
			if (existInfo == null) {
				inventory.setAmount(inventory.getAmount() + newInfo.getAmount());
			} else {
				// 找到项目，可能是数量修改
				// 如果数量减少，判断减少数量，如果减少数量大于库存现有数量，则此项目的修改失败
				if (newInfo.getAmount() < existInfo.getAmount()) {
					float minus = existInfo.getAmount() - newInfo.getAmount();
					if (minus > inventory.getAmount()) {
						fails.add(newInfo);
						newInfo.setAmount(existInfo.getAmount());
					} else {
						inventory.setAmount(inventory.getAmount() - minus);
					}
				}
				// 如果数量增加，直接更改库存数量
				else {
					inventory.setAmount(newInfo.getAmount() - existInfo.getAmount());
				}
				// 将原单据列表中移除找到的信息。
				existInfos.remove(existInfo);
			}
		}
		// 如果原单据列表中不为空，说明有入库信息被删除，查找库存并判断数量是否满足删除条件。
		for (InventoryOrderInfo delete : existInfos) {
			Inventory inventory = this.inventoryDao.findById(delete.getInventoryId());
			if (inventory.getAmount() < delete.getAmount()) {
				fails.add(delete);
				order.getInventoryInfos().add(delete);
			} else {
				inventory.setAmount(inventory.getAmount() - delete.getAmount());
			}
		}
		exist.setInventoryInfos(order.getInventoryInfos());
		if (!fails.isEmpty()) {
			net.sf.json.JSONArray array = net.sf.json.JSONArray.fromObject(fails);
			return JsonResFactory.buildNetWithData(RESCODE.PART_SUCCESS, array).toString();
		}
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String deleteOrder(String orderId) {
		InventoryOrder inventoryOrder = inventoryOrderDao.findById(orderId);
		List<InventoryOrderInfo> lists = inventoryOrder.getInventoryInfos();
		for(InventoryOrderInfo list : lists){
			Inventory inventory = inventoryDao.findById(list.getInventoryId());
			if(inventory.getAmount() >= list.getAmount()){
				float amount = inventory.getAmount() - list.getAmount();
				inventory.setAmount(amount);
			}else{
				return JsonResFactory.buildOrg(RESCODE.CANNOT_CANCEL_INVOICES).toString();
			}
		}
		
		//创建 退货出库单据 
		InventoryOrder order = new InventoryOrder();
		String id = IDGenerator.generate(IDGenerator.OUT_STOCK);
		order.setId(id);
		order.setCreateDate(new Date());
		order.setTotalPrice(inventoryOrder.getTotalPrice());
		order.setTotalAmount(inventoryOrder.getTotalAmount());
		order.setType(3);
		this.inventoryOrderDao.save(order);
		System.out.println("***************************");
		//在IncomeOrder中添加 收入
		IncomeOrder incomeOrder = new IncomeOrder();
		incomeOrder.setAmount(inventoryOrder.getTotalPrice());
		incomeOrder.setProgramName("退货出库");
		incomeOrder.setPayDate(new Date());
		incomeOrderDao.save(incomeOrder);
		System.out.println("***************************");
		
		this.inventoryOrderDao.deleteOrder(orderId);
		this.inventoryOrderDao.setByOrderId(orderId,id);
		
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String getInventoryName() {
		List<Object[]> exists = inventoryDao.getInventoryName();
		if (exists == null || exists.isEmpty()) {
			return JsonResFactory.buildOrg(RESCODE.NO_RECORD).toString();
		} else {
			List<InventoryBean> inventoryBeans = new ArrayList<>();
			for (Object[] exist : exists) {
				inventoryBeans.add(new InventoryBean(String.valueOf(exist[0]), String.valueOf(exist[1])));
			}
			return JsonResFactory.buildNetWithData(RESCODE.SUCCESS, JSONArray.fromObject(inventoryBeans)).toString();
		}
	}

	public String getInventory(String inventoryId) {
		Inventory exist = inventoryDao.findById(inventoryId);
		if (exist == null) {
			return JsonResFactory.buildOrg(RESCODE.NO_RECORD).toString();
		} else {
			JsonConfig config = JsonResFactory.dateConfig();
			return JsonResFactory.buildNetWithData(RESCODE.SUCCESS, net.sf.json.JSONObject.fromObject(exist, config))
					.toString();
		}
	}
}
