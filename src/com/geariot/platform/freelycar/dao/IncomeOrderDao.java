package com.geariot.platform.freelycar.dao;

import java.util.Date;
import java.util.List;

import com.geariot.platform.freelycar.entities.IncomeOrder;

public interface IncomeOrderDao {
	List<IncomeOrder> findByClientId(int clientId);
	
	void save(IncomeOrder incomeOrder);
	
	List<IncomeOrder> listByDate(Date date , int from , int pageSize);
	
	List<IncomeOrder> listByMonth(Date date , int from , int pageSize);

	List<Object[]> listMonthStat(Date start, Date end);
	
	List<IncomeOrder> listByWeek(int from , int pageSize);
	
	List<IncomeOrder> listByDate(Date date);
	
	List<IncomeOrder> listByMonth(Date date);
	
	List<IncomeOrder> listByWeek();
	
	List<IncomeOrder> listByDateRange(Date startTime , Date endTime , int from , int pageSize);
	
	List<IncomeOrder> listByDateRange(Date startTime , Date endTime);
	
	List<Object[]> listByPayMethodToday();
	
	List<Object[]> listByPayMethodMonth();
	
	List<Object[]> listByPayMethodRange(Date startTime , Date endTime);
	
	List<Object[]> programNameToday();
	
	List<Object[]> programNameMonth();
	
	List<Object[]> programNameRange(Date startTime , Date endTime);
}
