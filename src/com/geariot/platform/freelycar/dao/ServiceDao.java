package com.geariot.platform.freelycar.dao;

import java.util.List;

import com.geariot.platform.freelycar.entities.Service;

public interface ServiceDao {

	Service findServiceById(int serviceId);
	
	void save(Service service);
	
	void delete(int serviceId);
	
	List<Service> listServices(int from , int pageSize);
	
	List<Service> queryByName(String name);
	
	long getCount();
	
}
