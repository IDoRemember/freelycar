package com.geariot.platform.freelycar.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.geariot.platform.freelycar.dao.InventoryDao;
import com.geariot.platform.freelycar.entities.Inventory;
import com.geariot.platform.freelycar.utils.Constants;

@Repository
public class InventoryDaoImpl implements InventoryDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	private Session getSession(){
		return this.sessionFactory.getCurrentSession();
	}
	
	@Override
	public void add(Inventory inventory) {
		this.getSession().save(inventory);
	}

	@Override
	public int delete(List<Integer> inventoryIds) {
		String hql = "delete from Inventory where id in :ids";
		return this.getSession().createQuery(hql).setParameterList("ids", inventoryIds).executeUpdate();
	}

	@Override
	public Inventory findById(String id) {
		String hql = "from Inventory where id = :id";
		return (Inventory) this.getSession().createQuery(hql).setString("id", id)
				.setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Inventory> list(int from, int number) {
		String hql = "from Inventory";
		return this.getSession().createQuery(hql).setFirstResult(from).setMaxResults(number)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@Override
	public long getCount() {
		String hql = "select count(*) from Inventory";
		return (long) this.getSession().createQuery(hql).setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

}
