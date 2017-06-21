package com.geariot.platform.freelycar.dao;

import java.util.List;

import com.geariot.platform.freelycar.entities.Inventory;

public interface InventoryDao {
	void add(Inventory inventory);

	int delete(List<Integer> inventoryIds);
	
	Inventory findById(String id);

	List<Inventory> list(int from, int number);

	long getCount();
}
