package com.geariot.platform.freelycar.service;

import java.sql.Date;
import java.util.List;

import org.apache.shiro.SecurityUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.geariot.platform.freelycar.dao.AdminDao;
import com.geariot.platform.freelycar.dao.StaffDao;
import com.geariot.platform.freelycar.entities.Admin;
import com.geariot.platform.freelycar.entities.Staff;
import com.geariot.platform.freelycar.model.RESCODE;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.DateJsonValueProcessor;
import com.geariot.platform.freelycar.utils.JsonResFactory;
import com.mchange.lang.IntegerUtils;

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
		JSONObject obj = null;
		staffDao.saveStaff(staff);
		obj = JsonResFactory.buildOrg(RESCODE.SUCCESS);
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
		return obj.toString();
	}
	
	public String getSelectStaff(int staffId , String staffName){
		List<Staff> list = staffDao.queryByNameAndId(staffId , staffName);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
		JSONArray jsonArray = JSONArray.fromObject(list, config);
		return JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray).toString();
	}

	public String modifyStaff(Staff staff){
		Staff exist = staffDao.findStaffByStaffId(staff.getId());
		if(exist == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		exist.setName(staff.getName());
		exist.setGender(staff.getGender());
		exist.setPhone(staff.getPhone());
		exist.setPosition(staff.getPosition());
		exist.setLevel(staff.getLevel());
		exist.setComment(staff.getComment());
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}
	
}
	

