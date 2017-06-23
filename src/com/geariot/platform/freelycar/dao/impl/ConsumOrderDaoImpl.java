package com.geariot.platform.freelycar.dao.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.geariot.platform.freelycar.dao.ConsumOrderDao;
import com.geariot.platform.freelycar.entities.ConsumOrder;
import com.geariot.platform.freelycar.model.ORDER_CON;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.query.ConsumOrderAndQueryCreator;
import com.geariot.platform.freelycar.utils.query.ConsumOrderQueryCondition;
import com.geariot.platform.freelycar.utils.query.QueryUtils;

@Repository
public class ConsumOrderDaoImpl implements ConsumOrderDao {

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
	public List<ConsumOrder> query(ConsumOrderQueryCondition condition) {
		StringBuffer basic = new StringBuffer("from ConsumOrder");
		ConsumOrder order = condition.getConsumOrder();
		String licensePlate = null;
		int programId = -1;
		if(order.getCar() != null){
			licensePlate = order.getCar().getLicensePlate();
		}
		if(order.getProgram() != null){
			programId = order.getProgram().getId();
		}
		String andCondition = new ConsumOrderAndQueryCreator(order.getId(), licensePlate, 
				String.valueOf(programId), String.valueOf(order.getPayState())).createStatement();
		StringBuffer hql = QueryUtils.createQueryString(basic, andCondition, ORDER_CON.NO_ORDER);
		Date startDate = condition.getStartDate();
		Date endDate = condition.getEndDate();
		if(startDate != null || endDate != null){
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String[] types = {" createDate ", " deliverTime ", " pickTime ", " finishTime "};
			int dateType = condition.getDateType();
			boolean and = true;
			if(hql.indexOf("where") == -1){
				hql.append(" where");
				and = false;
			}
			if(startDate != null){
				if(and){
					hql.append(" and");
				}
				hql.append(types[dateType]);
				hql.append(" > '");
				hql.append(sdf.format(startDate));
				hql.append("'");
				and = true;
			}
			if(endDate != null){
				hql.append(" and");
			}
			hql.append(types[dateType]);
			hql.append(" < '");
			hql.append(sdf.format(endDate));
			hql.append("'");
		}
		System.out.println("consum order 查询最后拼接语句：" + hql);
		return this.getSession().createQuery(hql.toString()).setCacheable(Constants.SELECT_CACHE).list();
	}

}
