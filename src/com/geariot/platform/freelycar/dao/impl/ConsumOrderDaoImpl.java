package com.geariot.platform.freelycar.dao.impl;

import java.util.Calendar;
import java.util.Date;
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
		Session session = this.getSession();
		session.save(consumOrder);
		session.evict(consumOrder);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ConsumOrder> list(int from, int pageSize) {
		String hql = "from ConsumOrder order by createDate desc";
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
		StringBuffer temp = QueryUtils.createQueryString(basic, andCondition, ORDER_CON.NO_ORDER);
		temp.append(" order by createDate desc");
		String hql = temp.toString();
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

	@SuppressWarnings("unchecked")
	@Override
	public List<ConsumOrder> findWithClientId(int clientId) {
		String hql = "from ConsumOrder where clientId = :clientId order by createDate desc";
		return this.getSession().createQuery(hql).setInteger("clientId", clientId)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ConsumOrder> findByMakerAccount(String account) {
		String hql = "from ConsumOrder where orderMaker.account = :account order by createDate desc";
		return this.getSession().createQuery(hql).setString("account", account)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@Override
	public long countInventoryInfoByIds(List<String> inventoryIds) {
		String hql = "select count(*) from ConsumExtraInventoriesInfo where inventory.id in :list";
		return (long) this.getSession().createQuery(hql).setParameterList("list", inventoryIds)
				.setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@Override
	public void removeStaffInConsumOrderStaffs(int staffId) {
		String sql = "delete from projectinfo_staff where staffId = :id";
		this.getSession().createSQLQuery(sql).setInteger("id", staffId).executeUpdate();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> programNameToday() {
		Date date = new Date();
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
		String hql = "select sum(totalPrice) , programName , count(*) from ConsumOrder where createDate >= :date1 and createDate < :date2 group by programName";
		return this.getSession().createSQLQuery(hql).setTimestamp("date1", cal1.getTime()).setTimestamp("date2", cal2.getTime())
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> programNameMonth() {
		Date date = new Date();
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
		String hql = "select sum(totalPrice) , programName , count(*) from ConsumOrder where createDate >= :date1 and createDate < :date2 group by programName";
		return this.getSession().createSQLQuery(hql).setTimestamp("date1", cal1.getTime()).setTimestamp("date2", cal2.getTime())
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> programNameRange(Date startTime , Date endTime) {
		Calendar cal1 = Calendar.getInstance();
		cal1.setTimeInMillis(startTime.getTime());
		cal1.set(Calendar.DATE, 1);
		cal1.set(Calendar.HOUR, 0);
		cal1.set(Calendar.MINUTE, 0);
		cal1.set(Calendar.SECOND, 0);
		Calendar cal2 = Calendar.getInstance();
		cal2.setTimeInMillis(endTime.getTime());
		cal2.set(Calendar.HOUR, 23);
		cal2.set(Calendar.MINUTE, 59);
		cal2.set(Calendar.SECOND, 59);
		String hql = "select sum(totalPrice) , programName , count(*) from ConsumOrder where createDate >= :date1 and createDate < :date2 group by programName";
		return this.getSession().createSQLQuery(hql).setTimestamp("date1", cal1.getTime()).setTimestamp("date2", cal2.getTime())
				.setCacheable(Constants.SELECT_CACHE).list();
	}

}
