package com.geariot.platform.freelycar.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.geariot.platform.freelycar.dao.ServiceDao;
import com.geariot.platform.freelycar.entities.Service;
import com.geariot.platform.freelycar.model.ORDER_CON;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.query.QueryUtils;

@Repository
public class ServiceDaoImpl implements ServiceDao{

	@Autowired
	private SessionFactory sessionFactory;
	
	private Session getSession(){
		return sessionFactory.getCurrentSession();
	}

	@Override
	public Service findServiceById(int serviceId) {
		String hql = "from Service where id =:serviceId and deleted = 0";
		return (Service) getSession().createQuery(hql).setInteger("serviceId", serviceId)
				.setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@Override
	public void save(Service service) {
		 this.getSession().save(service);
	}

	/*@Override
	public void delete(int serviceId) {
		String hql = "delete from Service where id =:serviceId";
		this.getSession().createQuery(hql).setInteger("serviceId", serviceId).executeUpdate();
		
	}*/

	/*@SuppressWarnings("unchecked")
	@Override
	public List<Service> listServices(int from, int pageSize) {
		String hql = "from Service";
		return this.getSession().createQuery(hql).setFirstResult(from).setMaxResults(pageSize)
				.setCacheable(Constants.SELECT_CACHE).list();
	}*/

	@SuppressWarnings("unchecked")
	@Override
	public List<Service> queryByName(String name) {
		String hql = "from Service where name like :name and deleted = 0 order by createDate desc";
		return this.getSession().createQuery(hql).setString("name", "%"+name+"%").list();
	}

	@Override
	public long getCount() {
		String hql = "select count(*) from Service where deleted = 0";
		return (long) this.getSession().createQuery(hql).setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Service> listServices(String andCondition, int from, int pageSize) {
		String basic = "from Service where deleted = 0 ";
		String hql = QueryUtils.createQueryString(new StringBuffer(basic), andCondition, ORDER_CON.DESC_ORDER).toString();
		return this.getSession().createQuery(hql).setFirstResult(from).setMaxResults(pageSize)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@Override
	public long getConditionCount(String andCondition) {
		String basic = "select count(*) from Service where deleted = 0";
		String hql = QueryUtils.createQueryString(new StringBuffer(basic), andCondition, ORDER_CON.DESC_ORDER).toString();
		return (long) this.getSession().createQuery(hql).setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object> listName() {
		String sql = "select id , name from Service where deleted = 0";
		return this.getSession().createSQLQuery(sql).list(); 
		
	}

	@Override
	public long countProjectByIds(List<Integer> ids) {
		String hql = "select count(*) from ServiceProjectInfo where project.id in :list and deleted = 0";
		return (long) this.getSession().createQuery(hql).setParameterList("list", ids)
				.setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}
	
	
}
