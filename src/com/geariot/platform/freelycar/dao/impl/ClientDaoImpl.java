package com.geariot.platform.freelycar.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.geariot.platform.freelycar.dao.ClientDao;
import com.geariot.platform.freelycar.entities.Client;
import com.geariot.platform.freelycar.utils.Constants;

@Repository
public class ClientDaoImpl implements ClientDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	private Session getSession(){
		return this.sessionFactory.getCurrentSession();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Client> list(int from, int pageSize) {
		String hql = "from Client";
		return this.getSession().createQuery(hql).setFirstResult(from).setMaxResults(pageSize)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@Override
	public long getCount() {
		String hql = "select count(*) from Client";
		return (long) this.getSession().createQuery(hql).setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@Override
	public Client findByPhone(String phone) {
		String hql = "from Client where phone = :phone";
		return (Client) this.getSession().createQuery(hql).setString("phone", phone).uniqueResult();
	}
	
	@Override
	public Client findById(int clientId) {
		String hql = "from Client where id = :id";
		return (Client) this.getSession().createQuery(hql).setInteger("id", clientId).uniqueResult();
	}

	@Override
	public void save(Client client) {
		this.getSession().save(client);
	}

	@Override
	public void delete(List<Integer> clientIds) {
		String hql = "delete from Client where id in :ids";
		this.getSession().createQuery(hql).setParameterList("ids", clientIds).executeUpdate();
	}

}
