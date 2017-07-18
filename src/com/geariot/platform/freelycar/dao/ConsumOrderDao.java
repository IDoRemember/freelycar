package com.geariot.platform.freelycar.dao;

import java.util.Date;
import java.util.List;

import com.geariot.platform.freelycar.entities.ConsumOrder;

public interface ConsumOrderDao {
	
	String save(ConsumOrder consumOrder);

	List<ConsumOrder> list(int from, int pageSize);

	long getCount();

	ConsumOrder findById(String consumOrderId);

	List<ConsumOrder> query(String andCondition, int from, int pageSize);
	
	long getQueryCount(String andCondition);
	
	List<String> getConsumOrderIdsByStaffId(int staffId);
	
	List<ConsumOrder> findWithClientId(int clientId);
	
	List<ConsumOrder> findByMakerAccount(String account);
	
	List<ConsumOrder> findByPickCarStaffId(int staffId);
	
	long countInventoryInfoByIds(List<String> inventoryIds);
	
	void removeStaffInConsumOrderStaffs(int staffId);
	
	List<Object[]> programNameToday();
	
	List<Object[]> programNameMonth();
	
	List<Object[]> programNameRange(Date startTime , Date endTime);
}
