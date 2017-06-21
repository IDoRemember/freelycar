package com.geariot.platform.freelycar.service;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.geariot.platform.freelycar.dao.InventoryBrandDao;
import com.geariot.platform.freelycar.dao.InventoryTypeDao;
import com.geariot.platform.freelycar.entities.InventoryBrand;
import com.geariot.platform.freelycar.entities.InventoryType;
import com.geariot.platform.freelycar.model.RESCODE;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.JsonResFactory;

import net.sf.json.JSONArray;

@Service
@Transactional
public class InventoryService {
	
	@Autowired
	private InventoryTypeDao inventoryTypeDao;
	
	@Autowired
	private InventoryBrandDao inventoryBrandDao;

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

	public String queryType(String name, Date startTime, Date endTime) {
		List<InventoryType> list = this.inventoryTypeDao.query(name, startTime, endTime);
		if(list == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		return JsonResFactory.buildNetWithData(RESCODE.SUCCESS, JSONArray.fromObject(list, JsonResFactory.dateConfig())).toString();
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
	
	
	
}
