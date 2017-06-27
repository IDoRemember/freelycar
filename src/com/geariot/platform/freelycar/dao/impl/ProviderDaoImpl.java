package com.geariot.platform.freelycar.dao.impl;

import java.util.List;


import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.geariot.platform.freelycar.dao.ProviderDao;
import com.geariot.platform.freelycar.entities.Provider;
import com.geariot.platform.freelycar.model.ORDER_CON;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.query.QueryUtils;

@Repository
public class ProviderDaoImpl implements ProviderDao{

	@Autowired
	private SessionFactory sessionFactory;
	
	private Session getSession(){
		return sessionFactory.getCurrentSession();
	}

	@Override
	public void save(Provider provider) {
		this.getSession().save(provider);
	}

	@Override
	public void delete(int providerId) {
		String hql = "delete from Provider where id = :providerId";
		this.getSession().createQuery(hql).setInteger("providerId", providerId).executeUpdate();
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Provider> listProviders(int from, int pageSize) {
		String hql = "from Provider";
		return this.getSession().createQuery(hql).setFirstResult(from).setMaxResults(pageSize)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@Override
	public long getCount() {
		String hql = "select count(*) from Provider";
		return (long) this.getSession().createQuery(hql).setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	/*@SuppressWarnings("unchecked")
	@Override
	public List<Provider> queryByName(String name) {
		String hql = "from Provider where name like :name";
		return this.getSession().createQuery(hql).setString("name", "%"+name+"%").list();
	}*/

	@Override
	public Provider findProviderById(int providerId) {
		String hql = "from Provider where id = :providerId";
		return (Provider) getSession().createQuery(hql).setInteger("providerId", providerId).setCacheable(Constants.SELECT_CACHE)
				.uniqueResult();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Provider> getConditionQuery(String andCondition, int from, int pageSize) {
		String basic = "from Provider";
		String hql = QueryUtils.createQueryString(new StringBuffer(basic), andCondition, ORDER_CON.NO_ORDER).toString();
		return this.getSession().createQuery(hql).setFirstResult(from).setMaxResults(pageSize)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@Override
	public long getConditionCount(String andCondition) {
		String basic = "select count(*) from Provider";
		String hql = QueryUtils.createQueryString(new StringBuffer(basic), andCondition, ORDER_CON.NO_ORDER).toString();
		return (long) this.getSession().createQuery(hql).setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<String> listName() {
		String sql = "select name from Provider";
		return (List<String>) this.getSession().createSQLQuery(sql).list();
	}
}
