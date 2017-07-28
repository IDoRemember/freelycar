package com.geariot.platform.freelycar.dao;

import java.util.List;

import com.geariot.platform.freelycar.entities.ConsumOrder;
import com.geariot.platform.freelycar.entities.ProjectInfo;
import com.geariot.platform.freelycar.entities.Staff;

public interface StaffDao {
	
	Staff findStaffByStaffId(int staffId);
	
	Staff findStaffByPhone(String phone);
	
	void saveStaff(Staff staff);
	
	void deleteStaff(int staffId);
	
	void deleteStaff(Staff staff);
	
	void deleteStaff(String staffName);
	
	List<Staff> listStaffs(int from , int pageSize);
	
	//List<Staff> queryByNameAndId(int staffId , String staffName);
	
	List<Staff> getConditionQuery(String andCondition , int from , int pageSize);
	
	List<ProjectInfo> staffServiceDetails(int staffId , int from , int pageSize);
	
	long getCount();
	
	long getConditionCount(String andCondition);
}
