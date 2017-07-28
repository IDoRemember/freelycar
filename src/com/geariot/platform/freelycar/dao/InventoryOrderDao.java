package com.geariot.platform.freelycar.dao;

import java.util.List;

import com.geariot.platform.freelycar.entities.InventoryOrder;
import com.geariot.platform.freelycar.entities.InventoryOrderInfo;

public interface InventoryOrderDao {
	
	void save(InventoryOrder inventoryOrder);

	List<InventoryOrder> list(int from, int number);

	long getCount();

	List<InventoryOrder> query(String andCondition, int from, int pageSize);
	
	long getQueryCount(String andCondition);

	InventoryOrder findById(String inventoryOrderId);

	void deleteOrder(String orderId);
	
	List<InventoryOrder> findByMakerAccount(String account);
	
	List<InventoryOrderInfo> findInfoByProviderId(int providerId);
	
	void setByOrderId(String orderId, String id);
}
