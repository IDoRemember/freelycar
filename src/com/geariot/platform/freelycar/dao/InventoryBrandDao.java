package com.geariot.platform.freelycar.dao;

import java.util.List;

import com.geariot.platform.freelycar.entities.InventoryBrand;

public interface InventoryBrandDao {
	
long getCount();
	
	InventoryBrand findById(int inventoryBrandId);
	
	void add(InventoryBrand inventoryBrand);
	
	int delete(List<Integer> brandIds);
	
	List<InventoryBrand> list(int from, int pageSize);
	
	List<InventoryBrand> query(String name);
	
}
