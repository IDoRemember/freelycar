package com.geariot.platform.freelycar.service;

import java.util.Date;
import java.util.List;

import org.apache.shiro.SecurityUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.geariot.platform.freelycar.dao.AdminDao;
import com.geariot.platform.freelycar.dao.StaffDao;
import com.geariot.platform.freelycar.entities.Admin;
import com.geariot.platform.freelycar.entities.Car;
import com.geariot.platform.freelycar.entities.CarType;
import com.geariot.platform.freelycar.entities.Card;
import com.geariot.platform.freelycar.entities.ConsumOrder;
import com.geariot.platform.freelycar.entities.Inventory;
import com.geariot.platform.freelycar.entities.InventoryOrderInfo;
import com.geariot.platform.freelycar.entities.Program;
import com.geariot.platform.freelycar.entities.ProjectInventoriesInfo;
import com.geariot.platform.freelycar.entities.Staff;
import com.geariot.platform.freelycar.model.RESCODE;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.DateJsonValueProcessor;
import com.geariot.platform.freelycar.utils.JsonPropertyFilter;
import com.geariot.platform.freelycar.utils.JsonResFactory;
import com.geariot.platform.freelycar.utils.query.StaffAndQueryCreator;


import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;



@Service
@Transactional
public class StaffService {

	@Autowired
	private StaffDao staffDao;
	
	@Autowired
	private AdminDao adminDao;
	
	public String addStaff(Staff staff){
		Staff exist = staffDao.findStaffByPhone(staff.getPhone());
		JSONObject obj = null;
		if(exist != null){
			obj = JsonResFactory.buildOrg(RESCODE.PHONE_EXIST);
		}
		else{
			staff.setCreateDate(new Date());
			staffDao.saveStaff(staff);
			obj = JsonResFactory.buildOrg(RESCODE.SUCCESS);
		}
		return obj.toString();
	}
	
	public String deleteStaff(int[] staffIds) {
		String curUser = (String) SecurityUtils.getSubject().getPrincipal();
		Admin curAdmin = adminDao.findAdminByAccount(curUser);
		boolean delSelf = false;
		for (int staffId : staffIds) {
			if (curAdmin.getStaff().getId() == staffId) {
				delSelf = true;
			} else {
				staffDao.deleteStaff(staffId);
			}
		}
		if (delSelf) {
			return JsonResFactory.buildOrg(RESCODE.CANNOT_DELETE_SELF).toString();
		}
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}
	
	public String getStaffList(int page , int number){
		int from = (page - 1) * number;
		List<Staff> list = staffDao.listStaffs(from, number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = staffDao.getCount();
		int size=(int) Math.ceil(realSize/(double)number);
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
		JSONArray jsonArray = JSONArray.fromObject(list, config);
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
		obj.put(Constants.RESPONSE_SIZE_KEY, size);
		obj.put(Constants.RESPONSE_REAL_SIZE_KEY,realSize);
		return obj.toString();
	}
	
	public String getSelectStaff(String staffId , String staffName){
		String andCondition = new StaffAndQueryCreator(staffId , staffName).createStatement();
		List<Staff> list = staffDao.getConditionQuery(andCondition);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
		JSONArray jsonArray = JSONArray.fromObject(list , config);
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
		return obj.toString();
	}

	public String modifyStaff(Staff staff){
		Staff exist = staffDao.findStaffByStaffId(staff.getId());
		if(exist == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		else{
			exist.setName(staff.getName());
			exist.setGender(staff.getGender());
			exist.setPhone(staff.getPhone());
			exist.setPosition(staff.getPosition());
			exist.setLevel(staff.getLevel());
			exist.setComment(staff.getComment());
		}
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}
	
	public String staffServiceDetail(int staffId){
		Staff exist = staffDao.findStaffByStaffId(staffId);
		if(exist == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		else{
			JsonConfig config = new JsonConfig();
			config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
			JsonPropertyFilter filter = new JsonPropertyFilter();
			filter.setColletionProperties(CarType.class , Car.class , ProjectInventoriesInfo.class , Card.class , Program.class , Staff.class , Inventory.class);
			List<ConsumOrder> list = staffDao.staffServiceDetails(staffId);
			config.setJsonPropertyFilter(filter);
			JSONArray jsonArray = JSONArray.fromObject(list , config);
			net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
			return obj.toString();
		}
	}
}
	

