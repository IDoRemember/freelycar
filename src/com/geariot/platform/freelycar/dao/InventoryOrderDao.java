package com.geariot.platform.freelycar.dao;

import java.util.List;

import com.geariot.platform.freelycar.entities.InventoryOrder;

public interface InventoryOrderDao {
	
	void save(InventoryOrder inventoryOrder);

	List<InventoryOrder> list(int from, int number);

	long getCount();

	List<InventoryOrder> query(String andCondition, int from, int pageSize);
	
	long getQueryCount(String andCondition);

	InventoryOrder findById(String inventoryOrderId);
	
}
