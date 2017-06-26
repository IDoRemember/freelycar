package com.geariot.platform.freelycar.dao.impl;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.geariot.platform.freelycar.dao.ConsumOrderDao;
import com.geariot.platform.freelycar.entities.ConsumOrder;
import com.geariot.platform.freelycar.model.ORDER_CON;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.query.QueryUtils;

@Repository
public class ConsumOrderDaoImpl implements ConsumOrderDao {

	private static final Logger log = LogManager.getLogger(ConsumOrderDaoImpl.class);
	
	@Autowired
	private SessionFactory sessionFactory;
	
	private Session getSession(){
		return this.sessionFactory.getCurrentSession();
	}
	
	@Override
	public void save(ConsumOrder consumOrder) {
		this.getSession().save(consumOrder);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ConsumOrder> list(int from, int pageSize) {
		String hql = "from ConsumOrder";
		return this.getSession().createQuery(hql).setFirstResult(from).setMaxResults(pageSize)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@Override
	public long getCount() {
		String hql = "select count(*) from ConsumOrder";
		return (long) this.getSession().createQuery(hql).setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@Override
	public ConsumOrder findById(String consumOrderId) {
		String hql = "from ConsumOrder where id = :id";
		return (ConsumOrder) this.getSession().createQuery(hql).setString("id", consumOrderId)
				.setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ConsumOrder> query(String andCondition, int from, int pageSize) {
		StringBuffer basic = new StringBuffer("from ConsumOrder");
		String hql = QueryUtils.createQueryString(basic, andCondition, ORDER_CON.NO_ORDER).toString();
		log.debug("订单查询最后生成查询语句：" + hql);
		return this.getSession().createQuery(hql).setFirstResult(from).setMaxResults(pageSize)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@Override
	public long getQueryCount(String andCondition) {
		StringBuffer basic = new StringBuffer("select count(*) from ConsumOrder");
		String hql = QueryUtils.createQueryString(basic, andCondition, ORDER_CON.NO_ORDER).toString();
		return (long) this.getSession().createQuery(hql).setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<String> getConsumOrderIdsByStaffId(int staffId){
		String sql = "select consumOrdersId from consumorders_staff where staffId=:id";
		return this.getSession().createSQLQuery(sql).setInteger("id", staffId).setCacheable(Constants.SELECT_CACHE).list();
	}

}
