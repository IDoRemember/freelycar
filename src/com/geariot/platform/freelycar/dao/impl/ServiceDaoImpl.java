package com.geariot.platform.freelycar.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.geariot.platform.freelycar.dao.ServiceDao;
import com.geariot.platform.freelycar.entities.Service;
import com.geariot.platform.freelycar.utils.Constants;

@Repository
public class ServiceDaoImpl implements ServiceDao{

	@Autowired
	private SessionFactory sessionFactory;
	
	private Session getSession(){
		return sessionFactory.getCurrentSession();
	}

	@Override
	public Service findServiceById(int serviceId) {
		String hql = "from Service where id =:serviceId";
		return (Service) getSession().createQuery(hql).setInteger("serviceId", serviceId)
				.setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@Override
	public void save(Service service) {
		 this.getSession().save(service);
	}

	@Override
	public void delete(int serviceId) {
		String hql = "delete from Service where id =:serviceId";
		this.getSession().createQuery(hql).setInteger("serviceId", serviceId).executeUpdate();
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Service> listServices(int from, int pageSize) {
		String hql = "from Service";
		return this.getSession().createQuery(hql).setFirstResult(from).setMaxResults(pageSize)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Service> queryByName(String name) {
		String hql = "from Service where name like :name";
		return this.getSession().createQuery(hql).setString("name", "%"+name+"%").list();
	}

	@Override
	public long getCount() {
		String hql = "select count(*) from Service";
		return (long) this.getSession().createQuery(hql).setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}
	
	
}
