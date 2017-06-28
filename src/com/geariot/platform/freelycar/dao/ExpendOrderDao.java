package com.geariot.platform.freelycar.dao;

import java.util.Date;
import java.util.List;

import com.geariot.platform.freelycar.entities.ExpendOrder;

public interface ExpendOrderDao {
	
	void save(ExpendOrder expendOrder);

	List<ExpendOrder> listByDate(Date date , int from , int pageSize);
	
	List<ExpendOrder> listByMonth(Date date , int from , int pageSize);

	List<ExpendOrder> listByWeek(int from , int pageSize);
}
