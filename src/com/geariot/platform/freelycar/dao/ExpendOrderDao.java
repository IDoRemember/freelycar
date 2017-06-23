package com.geariot.platform.freelycar.dao;

import java.util.Date;
import java.util.List;

import com.geariot.platform.freelycar.entities.ExpendOrder;

public interface ExpendOrderDao {
	
	void save(ExpendOrder expendOrder);

	List<ExpendOrder> listByDate(Date date);
	
	List<ExpendOrder> listByMonth(Date date);
}
