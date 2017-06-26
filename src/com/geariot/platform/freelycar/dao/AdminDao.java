package com.geariot.platform.freelycar.dao;

import java.util.List;

import com.geariot.platform.freelycar.entities.Admin;
import com.geariot.platform.freelycar.entities.Role;

public interface AdminDao {
	
	Admin findAdminByAccount(String account);
	
	Admin findAdminById(int id);

	void save(Admin admin);

	void delete(Admin admin);
	
	void delete(String account);
	
	void delete(int adminId);
	
	List<Admin> listAdmins(int from, int pageSize);
	
	long getCount();

	List<Admin> queryByNameAndAccount(String andCondition, int from, int pageSize);
	
	long getQueryCount(String andCondition);
	
	void save(Role role);
}
