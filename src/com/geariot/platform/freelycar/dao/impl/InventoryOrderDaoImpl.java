package com.geariot.platform.freelycar.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.geariot.platform.freelycar.dao.InventoryOrderDao;
import com.geariot.platform.freelycar.entities.InventoryOrder;
import com.geariot.platform.freelycar.entities.InventoryOrderInfo;
import com.geariot.platform.freelycar.model.ORDER_CON;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.query.QueryUtils;

@Repository
public class InventoryOrderDaoImpl implements InventoryOrderDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	private Session getSession(){
		return this.sessionFactory.getCurrentSession();
	}
	
	@Override
	public void save(InventoryOrder inventoryOrder) {
		this.getSession().save(inventoryOrder);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<InventoryOrder> list(int from, int number) {
		String hql = "from InventoryOrder";
		return this.getSession().createQuery(hql).setFirstResult(from).setMaxResults(number)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@Override
	public long getCount() {
		String hql = "select count(*) from InventoryOrder";
		return (long) this.getSession().createQuery(hql).setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<InventoryOrder> query(String andCondition, int from, int pageSize) {
		StringBuffer basic = new StringBuffer("from InventoryOrder");
		String hql = QueryUtils.createQueryString(basic, andCondition, ORDER_CON.NO_ORDER).toString();
		return this.getSession().createQuery(hql).setFirstResult(from).setMaxResults(pageSize)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@Override
	public long getQueryCount(String andCondition) {
		StringBuffer basic = new StringBuffer("select count(*) from InventoryOrder");
		String hql = QueryUtils.createQueryString(basic, andCondition, ORDER_CON.NO_ORDER).toString();
		return (long) this.getSession().createQuery(hql).setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}
	
	@Override
	public InventoryOrder findById(String inventoryOrderId) {
		String hql = "from InventoryOrder where id = :id";
		return (InventoryOrder) this.getSession().createQuery(hql).setString("id", inventoryOrderId)
				.setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@Override
	public void deleteOrder(String orderId) {
		String hql = "delete from InventoryOrder where id = :orderId";
		this.getSession().createQuery(hql).setString("orderId", orderId).executeUpdate();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<InventoryOrder> findByMakerAccount(String account) {
		String hql = "from InventoryOrder where orderMaker.account = :account";
		return this.getSession().createQuery(hql).setString("account", account)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<InventoryOrderInfo> findInfoByProviderId(int providerId) {
		String hql = "from InventoryOrderInfo where provider.id = :id";
		return this.getSession().createQuery(hql).setInteger("id", providerId)
				.setCacheable(Constants.SELECT_CACHE).list();
	}


}
