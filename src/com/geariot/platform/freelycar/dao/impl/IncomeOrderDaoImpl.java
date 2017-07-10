package com.geariot.platform.freelycar.dao.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.geariot.platform.freelycar.dao.IncomeOrderDao;
import com.geariot.platform.freelycar.entities.IncomeOrder;
import com.geariot.platform.freelycar.model.ORDER_CON;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.query.QueryUtils;

@Repository
public class IncomeOrderDaoImpl implements IncomeOrderDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	private Session getSession(){
		return this.sessionFactory.getCurrentSession();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<IncomeOrder> findByClientId(int clientId) {
		String hql = "from IncomeOrder where clientId = :clientId order by payDate desc";
		return this.getSession().createQuery(hql).setInteger("clientId", clientId).list();
	}

	@Override
	public void save(IncomeOrder incomeOrder) {
		this.getSession().save(incomeOrder);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<IncomeOrder> listByDate(Date date , int from , int pageSize) {
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
		String hql = "from IncomeOrder where payDate >= :date1 and payDate < :date2";
		return this.getSession().createQuery(hql).setTimestamp("date1", cal1.getTime()).setTimestamp("date2", cal2.getTime())
				.setFirstResult(from).setMaxResults(pageSize).setCacheable(Constants.SELECT_CACHE).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<IncomeOrder> listByMonth(Date date , int from , int pageSize) {
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
		String hql = "from IncomeOrder where payDate >= :date1 and payDate < :date2";
		return this.getSession().createQuery(hql).setTimestamp("date1", cal1.getTime()).setTimestamp("date2", cal2.getTime())
				.setFirstResult(from).setMaxResults(pageSize).setCacheable(Constants.SELECT_CACHE).list();
	}

	
	/*
	 * 完整sql查询语句：
	 * FROM
			(
			SELECT
				i.amount AS income,
				0 AS expend,
				DATE_FORMAT(i.payDate, '%Y-%m') AS payDate
			FROM
				incomeorder AS i
			WHERE
				i.payDate > '2017-01-01'
			AND i.payDate < '2017-12-31'
			UNION
				SELECT
					0 AS income,
					e.amount AS expend,
					DATE_FORMAT(e.payDate, '%Y-%m') AS payDate
				FROM
					expendorder AS e
				WHERE
					e.payDate > '2017-01-01'
				AND e.payDate < '2017-12-31'
			) AS t
		GROUP BY
			payDate;
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> listMonthStat(Date start, Date end) {
		StringBuilder sb = new StringBuilder("SELECT SUM(income), SUM(expend), payDate ");
		sb.append("FROM (");
		sb.append("SELECT i.amount AS income,0 AS expend,DATE_FORMAT(i.payDate, '%Y-%m') AS payDate FROM incomeorder AS i ");
		sb.append("WHERE i.payDate >= :start AND i.payDate <= :end");
		sb.append(" UNION ");
		sb.append("SELECT 0 AS income,e.amount AS expend,DATE_FORMAT(e.payDate, '%Y-%m') AS payDate FROM expendorder AS e ");
		sb.append("WHERE e.payDate >= :start AND e.payDate <= :end");
		sb.append(") AS t ");
		sb.append("GROUP BY payDate");
		return this.getSession().createSQLQuery(sb.toString()).setDate("start", start).setDate("end", end)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<IncomeOrder> listByWeek(int from , int pageSize) {
		String hql = "from IncomeOrder where YEARWEEK(date_format(payDate,'%Y-%m-%d')) = YEARWEEK(now())";
		return this.getSession().createQuery(hql).setFirstResult(from).setMaxResults(pageSize).setCacheable(Constants.SELECT_CACHE).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<IncomeOrder> listByDate(Date date) {
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
		String hql = "from IncomeOrder where payDate >= :date1 and payDate < :date2";
		return this.getSession().createQuery(hql).setTimestamp("date1", cal1.getTime()).setTimestamp("date2", cal2.getTime())
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<IncomeOrder> listByMonth(Date date) {
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
		String hql = "from IncomeOrder where payDate >= :date1 and payDate < :date2";
		return this.getSession().createQuery(hql).setTimestamp("date1", cal1.getTime()).setTimestamp("date2", cal2.getTime())
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<IncomeOrder> listByWeek() {
		String hql = "from IncomeOrder where YEARWEEK(date_format(payDate,'%Y-%m-%d')) = YEARWEEK(now())";
		return this.getSession().createQuery(hql).setCacheable(Constants.SELECT_CACHE).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<IncomeOrder> listByDateRange(Date startTime, Date endTime, int from, int pageSize) {
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
		String hql = "from IncomeOrder where payDate >= :date1 and payDate <= :date2";
		return this.getSession().createQuery(hql).setTimestamp("date1", cal1.getTime()).setTimestamp("date2", cal2.getTime())
				.setFirstResult(from).setMaxResults(pageSize).setCacheable(Constants.SELECT_CACHE).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<IncomeOrder> listByDateRange(Date startTime, Date endTime) {
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
		String hql = "from IncomeOrder where payDate >= :date1 and payDate <= :date2";
		return this.getSession().createQuery(hql).setTimestamp("date1", cal1.getTime()).setTimestamp("date2", cal2.getTime())
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> listByPayMethodToday() {
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
		String hql = "select sum(amount) , payMethod from IncomeOrder where payDate >= :date1 and payDate < :date2 group by payMethod";
		return this.getSession().createQuery(hql).setTimestamp("date1", cal1.getTime()).setTimestamp("date2", cal2.getTime())
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> listByPayMethodMonth() {
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
		String hql = "select sum(amount) , payMethod from IncomeOrder where payDate >= :date1 and payDate < :date2 group by payMethod";
		return this.getSession().createQuery(hql).setTimestamp("date1", cal1.getTime()).setTimestamp("date2", cal2.getTime())
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> listByPayMethodRange(Date startTime, Date endTime) {
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
		String hql = "select sum(amount) , payMethod from IncomeOrder where payDate >= :date1 and payDate < :date2 group by payMethod";
		return this.getSession().createQuery(hql).setTimestamp("date1", cal1.getTime()).setTimestamp("date2", cal2.getTime())
				.setCacheable(Constants.SELECT_CACHE).list();
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
		String hql = "select sum(amount) , programName , count(*) from IncomeOrder where payDate >= :date1 and payDate < :date2 group by programName";
		return this.getSession().createQuery(hql).setTimestamp("date1", cal1.getTime()).setTimestamp("date2", cal2.getTime())
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
		String hql = "select sum(amount) , programName , count(*) from IncomeOrder where payDate >= :date1 and payDate < :date2 group by programName";
		return this.getSession().createQuery(hql).setTimestamp("date1", cal1.getTime()).setTimestamp("date2", cal2.getTime())
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> programNameRange(Date startTime, Date endTime) {
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
		String hql = "select sum(amount) , programName , count(*) from IncomeOrder where payDate >= :date1 and payDate < :date2 group by programName";
		return this.getSession().createQuery(hql).setTimestamp("date1", cal1.getTime()).setTimestamp("date2", cal2.getTime())
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<IncomeOrder> listIncomeOrderByClientId(String condition, int clientId, int from, int pageSize) {
		StringBuffer basic = new StringBuffer("from IncomeOrder where clientId = :clientId");
		String hql = QueryUtils.createQueryString(basic, condition, ORDER_CON.NO_ORDER).toString();
		return this.getSession().createQuery(hql).setInteger("clientId", clientId)
				.setFirstResult(from).setMaxResults(pageSize)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@Override
	public long countIncomeOrderByClientId(String condition, int clientId) {
		StringBuffer basic = new StringBuffer("select count(*) from IncomeOrder where clientId = :clientId");
		StringBuffer temp = QueryUtils.createQueryString(basic, condition, ORDER_CON.NO_ORDER);
		temp.append(" order by payDate desc");
		String hql = temp.toString();
		return (long) this.getSession().createQuery(hql).setInteger("clientId", clientId)
				.setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@Override
	public double countAmountByClientId(String condition, int clientId) {
		StringBuffer basic = new StringBuffer("select sum(amount) from IncomeOrder where clientId = :clientId");
		String hql = QueryUtils.createQueryString(basic, condition, ORDER_CON.NO_ORDER).toString();
		return (double) this.getSession().createQuery(hql).setInteger("clientId", clientId)
				.setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}
	
}
