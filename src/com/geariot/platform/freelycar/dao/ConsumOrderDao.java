package com.geariot.platform.freelycar.dao;

import java.util.List;

import com.geariot.platform.freelycar.entities.ConsumOrder;
import com.geariot.platform.freelycar.utils.query.ConsumOrderQueryCondition;

public interface ConsumOrderDao {
	
	void save(ConsumOrder consumOrder);

	List<ConsumOrder> list(int from, int pageSize);

	long getCount();

	ConsumOrder findById(String consumOrderId);

	List<ConsumOrder> query(ConsumOrderQueryCondition condition);
	
}
