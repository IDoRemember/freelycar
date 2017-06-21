package com.geariot.platform.freelycar.dao;

import java.util.List;

import com.geariot.platform.freelycar.entities.IncomeOrder;

public interface IncomeOrderDao {
	List<IncomeOrder> findByClientId(int clientId);
}
