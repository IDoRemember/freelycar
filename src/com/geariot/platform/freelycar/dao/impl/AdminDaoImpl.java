package com.geariot.platform.freelycar.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.geariot.platform.freelycar.dao.AdminDao;
import com.geariot.platform.freelycar.entities.Admin;
import com.geariot.platform.freelycar.entities.Role;
import com.geariot.platform.freelycar.model.ORDER_CON;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.query.AdminAndQueryCreator;
import com.geariot.platform.freelycar.utils.query.QueryUtils;

@Repository
public class AdminDaoImpl implements AdminDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	private Session getSession(){
		return sessionFactory.getCurrentSession();
	}
	
	@Override
	public Admin findAdminByAccount(String account) {
		String hql = "from Admin where account = :account";
		return (Admin) getSession().createQuery(hql).setString("account", account)
				.setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@Override
	public Admin findAdminById(int id) {
		String hql = "from Admin where id = :id";
		return (Admin) getSession().createQuery(hql).setInteger("id", id)
				.setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}
	
	@Override
	public void save(Admin admin) {
		this.getSession().save(admin);
	}

	@Override
	public void delete(Admin admin) {
		this.getSession().delete(admin);
	}
	
	@Override
	public void delete(String account) {
		String hql = "delete from Admin where account = :account";
		this.getSession().createQuery(hql).setString("account", account).executeUpdate();
	}

	@Override
	public void delete(int adminId) {
		String hql = "delete from Admin where id = :adminId";
		this.getSession().createQuery(hql).setInteger("adminId", adminId).executeUpdate();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Admin> listAdmins(int from, int pageSize) {
		String hql = "from Admin";
		return this.getSession().createQuery(hql).setFirstResult(from).setMaxResults(pageSize)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@Override
	public long getCount() {
		String hql = "select count(*) from Admin";
		return (long) this.getSession().createQuery(hql).setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Admin> queryByNameAndAccount(String account, String name) {
		StringBuffer basic = new StringBuffer("from Admin");
		String andCondition = new AdminAndQueryCreator(account, name).createStatement();
		String hql = QueryUtils.createQueryString(basic, andCondition, ORDER_CON.NO_ORDER).toString();
		return this.getSession().createQuery(hql).list();
	}

	@Override
	public void save(Role role) {
		this.getSession().save(role);
	}

}