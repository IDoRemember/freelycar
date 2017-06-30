package com.geariot.platform.freelycar.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.geariot.platform.freelycar.dao.InventoryBrandDao;
import com.geariot.platform.freelycar.entities.InventoryBrand;
import com.geariot.platform.freelycar.model.ORDER_CON;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.query.QueryUtils;

@Repository
public class InventoryBrandDaoImpl implements InventoryBrandDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	private Session getSession(){
		return this.sessionFactory.getCurrentSession();
	}
	
	@Override
	public long getCount() {
		String hql = "select count(*) from InventoryBrand";
		return (long) this.getSession().createQuery(hql).uniqueResult();
	}

	@Override
	public InventoryBrand findById(int inventoryBrandId) {
		String hql = "from InventoryBrand where id = :id";
		return (InventoryBrand) this.getSession().createQuery(hql).setInteger("id", inventoryBrandId)
				.setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@Override
	public void add(InventoryBrand inventoryBrand) {
		this.getSession().save(inventoryBrand);
	}

	@Override
	public int delete(List<Integer> brandIds) {
		String hql = "delete from InventoryBrand where id in :ids";
		return this.getSession().createQuery(hql).setParameterList("ids", brandIds).executeUpdate();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<InventoryBrand> getConditionQuery(String andCondition, int from, int pageSize) {
		String basic = "from InventoryBrand";
		String hql = QueryUtils.createQueryString(new StringBuffer(basic), andCondition, ORDER_CON.NO_ORDER).toString();
		return this.getSession().createQuery(hql).setFirstResult(from).setMaxResults(pageSize)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@Override
	public long getConditionCount(String andCondition) {
		String basic = "select count(*) from InventoryBrand";
		String hql = QueryUtils.createQueryString(new StringBuffer(basic), andCondition, ORDER_CON.NO_ORDER).toString();
		return (long) this.getSession().createQuery(hql).setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	/*@SuppressWarnings("unchecked")
	@Override
	public List<InventoryBrand> list(int from, int pageSize) {
		String hql = "from InventoryBrand";
		return this.getSession().createQuery(hql).setFirstResult(from).setMaxResults(pageSize)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<InventoryBrand> query(String name) {
		String hql = "from InventoryBrand where name like :name";
		return this.getSession().createQuery(hql).setString("name", "%"+name+"%")
				.setCacheable(Constants.SELECT_CACHE).list();
	}*/
	
	
	
}
