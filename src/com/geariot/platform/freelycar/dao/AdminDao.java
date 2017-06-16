<<<<<<< HEAD
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
=======
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
>>>>>>> 106bf3a0d0d5c3e58ce8f2b41b1be6eefc56eb02
