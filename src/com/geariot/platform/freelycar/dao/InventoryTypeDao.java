package com.geariot.platform.freelycar.dao;

import java.util.Date;
import java.util.List;

import com.geariot.platform.freelycar.entities.InventoryType;

public interface InventoryTypeDao {
	
	long getCount();
	
	InventoryType findById(int inventoryTypeId);
	
	void add(InventoryType inventoryType);
	
	int delete(List<Integer> typeIds);
	
	List<InventoryType> list(int from, int pageSize);
	
	List<InventoryType> query(String name, Date startDate, Date endDate);

}
