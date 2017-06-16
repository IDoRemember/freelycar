package com.geariot.platform.freelycar.dao;

import java.util.List;

import com.geariot.platform.freelycar.entities.Admin;

public interface AdminDao {
	
	Admin findAdminByAccount(String account);
	
	Admin findAdminById(int id);

	void save(Admin admin);

	void delete(Admin admin);
	
	List<Admin> listAdmins(int from, int pageSize);
	
	long getCount();
	
}
