package com.geariot.platform.freelycar.dao.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.geariot.platform.freelycar.dao.ExpendOrderDao;
import com.geariot.platform.freelycar.entities.ExpendOrder;

@Repository
public class ExpendOrderDaoImpl implements ExpendOrderDao{


	@Autowired
	private SessionFactory sessionFactory;
	
	private Session getSession(){
		return sessionFactory.getCurrentSession();
	}

	@Override
	public void save(ExpendOrder expendOrder) {
		this.getSession().save(expendOrder);
	}

	@SuppressWarnings({ "unchecked"})
	@Override
	public List<ExpendOrder> listByDate(Date date) {
		Calendar cal1 = Calendar.getInstance();
		cal1.setTimeInMillis(date.getTime());
		cal1.set(Calendar.HOUR, 0);
		cal1.set(Calendar.MINUTE, 0);
		cal1.set(Calendar.SECOND, 0);
		Calendar cal2 = Calendar.getInstance();
		cal2.setTimeInMillis(date.getTime());
		cal2.set(Calendar.HOUR, 0);
		cal2.set(Calendar.MINUTE, 0);
		cal2.set(Calendar.SECOND, 0);
		cal2.add(Calendar.DAY_OF_MONTH, 1);
		String hql = "from ExpendOrder where payDate >= :date1 and payDate < :date2";
		return this.getSession().createQuery(hql).setTimestamp("date1", cal1.getTime()).setTimestamp("date2", cal2.getTime()).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ExpendOrder> listByMonth(Date date) {
		Calendar cal1 = Calendar.getInstance();
		cal1.setTimeInMillis(date.getTime());
		cal1.set(Calendar.DATE, 1);
		cal1.set(Calendar.HOUR, 0);
		cal1.set(Calendar.MINUTE, 0);
		cal1.set(Calendar.SECOND, 0);
		Calendar cal2 = Calendar.getInstance();
		cal2.setTimeInMillis(date.getTime());
		cal2.set(Calendar.HOUR, 0);
		cal2.set(Calendar.MINUTE, 0);
		cal2.set(Calendar.SECOND, 0);
		cal2.set(Calendar.DATE, 1);
		cal2.add(Calendar.MONTH, 1);
		//System.out.println(cal1.getTime()+"......."+cal2.getTime());
		String hql = "from ExpendOrder where payDate >= :date1 and payDate < :date2";
		return this.getSession().createQuery(hql).setTimestamp("date1", cal1.getTime()).setTimestamp("date2", cal2.getTime()).list();
	}
	
}
