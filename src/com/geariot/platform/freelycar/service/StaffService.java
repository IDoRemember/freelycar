package com.geariot.platform.freelycar.service;

import java.util.Date;
import java.util.List;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.geariot.platform.freelycar.dao.AdminDao;
import com.geariot.platform.freelycar.dao.ConsumOrderDao;
import com.geariot.platform.freelycar.dao.StaffDao;
import com.geariot.platform.freelycar.entities.Admin;
import com.geariot.platform.freelycar.entities.Car;
import com.geariot.platform.freelycar.entities.CarType;
import com.geariot.platform.freelycar.entities.Card;
import com.geariot.platform.freelycar.entities.ConsumOrder;
import com.geariot.platform.freelycar.entities.Inventory;
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
	
	@Autowired
	private ConsumOrderDao consumOrderDao;
	
	public String addStaff(Staff staff){
		Staff exist = staffDao.findStaffByPhone(staff.getPhone());
		if(exist != null){
			return JsonResFactory.buildOrg(RESCODE.PHONE_EXIST).toString();
		}
		else{
			staff.setCreateDate(new Date());
			staffDao.saveStaff(staff);
			JsonConfig config = JsonResFactory.dateConfig();
			return JsonResFactory.buildNetWithData(RESCODE.SUCCESS,net.sf.json.JSONObject.fromObject(staff, config)).toString();
		}
	}
	
	public String deleteStaff(Integer... staffIds) {
		String curUser = (String) SecurityUtils.getSubject().getPrincipal();
		Admin curAdmin = adminDao.findAdminByAccount(curUser);
		boolean delSelf = false;
		for (int staffId : staffIds) {
			//如果要删除的员工是当前登陆账号所绑定的员工，则不能删除
			if (curAdmin.getStaff().getId() == staffId) {
				delSelf = true;
			} else {
				//删除员工要将与员工绑定的Admin登陆账号删除
				//并且将ConsumOrder施工人员中有该员工的订单中去除该员工
				this.adminDao.deleteByStaffId(staffId);
				this.consumOrderDao.removeStaffInConsumOrderStaffs(staffId);
				
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
	
	public String getSelectStaff(String staffId , String staffName , int page , int number){
		String andCondition = new StaffAndQueryCreator(staffId , staffName).createStatement();
		int from = (page - 1) * number;
		List<Staff> list = staffDao.getConditionQuery(andCondition , from , number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = (long) staffDao.getConditionCount(andCondition);
		int size=(int) Math.ceil(realSize/(double)number);
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
		JSONArray jsonArray = JSONArray.fromObject(list , config);
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
		obj.put(Constants.RESPONSE_SIZE_KEY, size);
		obj.put(Constants.RESPONSE_REAL_SIZE_KEY,realSize);
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
	
	public String staffServiceDetail(int staffId , int page , int number){
		Staff exist = staffDao.findStaffByStaffId(staffId);
		if(exist == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		else{
			int from = (page - 1) * number;
			List<ConsumOrder> list = staffDao.staffServiceDetails(staffId, from , number);
			if(list == null || list.isEmpty()){
				net.sf.json.JSONObject obj = JsonResFactory.buildNet(RESCODE.NOT_FOUND);
				obj.put("staffInfo",exist);
				return obj.toString();
			}
			JsonConfig config = new JsonConfig();
			config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
			JsonPropertyFilter filter = new JsonPropertyFilter();
			filter.setColletionProperties(CarType.class , Car.class , Card.class , Staff.class , Inventory.class);
			config.setJsonPropertyFilter(filter);
			JSONArray jsonArray = JSONArray.fromObject(list , config);
			net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
			obj.put(Constants.RESPONSE_REAL_SIZE_KEY,list.size());
			obj.put("staffInfo",exist);
			return obj.toString();
		}
	}
}
	

