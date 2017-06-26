package com.geariot.platform.freelycar.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.interceptor.TransactionInterceptor;

import com.geariot.platform.freelycar.dao.InventoryTypeDao;
import com.geariot.platform.freelycar.entities.InventoryType;
import com.geariot.platform.freelycar.model.ORDER_CON;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.query.QueryUtils;

@Repository
public class InventoryTypeDaoImpl implements InventoryTypeDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	private Session getSession(){
		return this.sessionFactory.getCurrentSession();
	}
	
	@Override
	public long getCount() {
		String hql = "select count(*) from InventoryType";
		return (long) this.getSession().createQuery(hql).setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}
	
	@Override
	public InventoryType findById(int inventoryTypeId) {
		String hql = "from InventoryType where id = :id";
		return (InventoryType) this.getSession().createQuery(hql).setInteger("id", inventoryTypeId).uniqueResult();
	}
	
	@Override
	public void add(InventoryType inventoryType) {
		this.getSession().save(inventoryType);
	}

	@Override
	public int delete(List<Integer> typeIds) {
		String hql = "delete from InventoryType where id in :id";
		return this.getSession().createQuery(hql).setParameterList("id", typeIds).executeUpdate();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<InventoryType> list(int from, int pageSize) {
		String hql = "from InventoryType";
		return this.getSession().createQuery(hql).setFirstResult(from).setMaxResults(pageSize)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<InventoryType> query(String andCondition, int from, int pageSize) {
		StringBuffer basic = new StringBuffer("from InventoryType");
		String hql = QueryUtils.createQueryString(basic, andCondition, ORDER_CON.NO_ORDER).toString();
		return this.getSession().createQuery(hql).setFirstResult(from).setMaxResults(pageSize)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@Override
	public long getQueryCount(String andCondition) {
		StringBuffer basic = new StringBuffer("select count(*) from InventoryType");
		String hql = QueryUtils.createQueryString(basic, andCondition, ORDER_CON.NO_ORDER).toString();
		return (long) this.getSession().createQuery(hql).setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

}