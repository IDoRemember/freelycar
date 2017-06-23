package com.geariot.platform.freelycar.dao;

import java.util.List;

import com.geariot.platform.freelycar.entities.Staff;

public interface StaffDao {
	
	Staff findStaffByStaffId(int staffId);
	
	Staff findStaffByPhone(String phone);
	
	void saveStaff(Staff staff);
	
	void deleteStaff(int staffId);
	
	void deleteStaff(Staff staff);
	
	void deleteStaff(String staffName);
	
	List<Staff> listStaffs(int from , int pageSize);
	
	List<Staff> queryByNameAndId(int staffId , String staffName);
	
	long getCount();
}
