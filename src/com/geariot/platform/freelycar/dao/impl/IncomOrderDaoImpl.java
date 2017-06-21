package com.geariot.platform.freelycar.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.geariot.platform.freelycar.dao.IncomeOrderDao;
import com.geariot.platform.freelycar.entities.IncomeOrder;

@Repository
public class IncomOrderDaoImpl implements IncomeOrderDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	private Session getSession(){
		return this.sessionFactory.getCurrentSession();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<IncomeOrder> findByClientId(int clientId) {
		String hql = "from IncomeOrder where clientId = :clientId";
		return this.getSession().createQuery(hql).setInteger("clientId", clientId).list();
	}

}
