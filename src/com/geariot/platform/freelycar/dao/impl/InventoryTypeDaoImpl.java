package com.geariot.platform.freelycar.dao.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.geariot.platform.freelycar.dao.InventoryTypeDao;
import com.geariot.platform.freelycar.entities.InventoryType;
import com.geariot.platform.freelycar.utils.Constants;

@Repository
public class InventoryTypeDaoImpl implements InventoryTypeDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	private Session getSession(){
		return this.sessionFactory.getCurrentSession();
	}
	
	@Override
	public long getCount() {
		String hql = "select count(*) from InventoryType";
		return (long) this.getSession().createQuery(hql).setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}
	
	@Override
	public InventoryType findById(int inventoryTypeId) {
		String hql = "from InventoryType where id = :id";
		return (InventoryType) this.getSession().createQuery(hql).setInteger("id", inventoryTypeId).uniqueResult();
	}
	
	@Override
	public void add(InventoryType inventoryType) {
		this.getSession().save(inventoryType);
	}

	@Override
	public int delete(List<Integer> typeIds) {
		String hql = "delete from InventoryType where id in :id";
		return this.getSession().createQuery(hql).setParameterList("id", typeIds).executeUpdate();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<InventoryType> list(int from, int pageSize) {
		String hql = "from InventoryType";
		return this.getSession().createQuery(hql).setFirstResult(from).setMaxResults(pageSize)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<InventoryType> query(String name, Date startDate, Date endDate) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		StringBuilder sb = new StringBuilder("from InventoryType where");
		boolean and = false;
		if(name != null && !name.isEmpty()){
			sb.append(" typeName like '%");
			sb.append(name);
			sb.append("%'");
			and = true;
		}
		if(startDate != null){
			if(and){
				sb.append(" and");
			}
			sb.append(" createDate > '");
			sb.append(sdf.format(startDate));
			sb.append("'");
			and = true;
		}
		if(endDate != null){
			if(and){
				sb.append(" and");
			}
			sb.append(" createDate < '");
			sb.append(sdf.format(endDate));
			sb.append("'");
		}
		System.out.println(sb);
		return this.getSession().createQuery(sb.toString()).setCacheable(Constants.SELECT_CACHE).list();
	}

}