package com.geariot.platform.freelycar.dao;

import java.util.List;

import com.geariot.platform.freelycar.entities.Inventory;

public interface InventoryDao {
	void add(Inventory inventory);

	int delete(List<String> inventoryIds);
	
	Inventory findById(String id);

	List<Inventory> list(String andCondition, int from, int number);

	long getCount(String andCondition);

	List<Inventory> findByProviderId(int providerId);
	
}
