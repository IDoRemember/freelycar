package com.geariot.platform.freelycar.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.geariot.platform.freelycar.dao.StaffDao;
import com.geariot.platform.freelycar.entities.Staff;
import com.geariot.platform.freelycar.utils.Constants;

@Repository
public class StaffDaoImpl implements StaffDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	private Session getSession(){
		return sessionFactory.getCurrentSession();
	}
	
	@Override
	public void saveStaff(Staff staff) {
		this.getSession().save(staff);
		
	}
	
	@Override
	public void deleteStaff(Staff staff) {
		this.getSession().delete(staff);
	}

	@Override
	public void deleteStaff(int staffId) {
		String hql = "delete from Staff where id = :staffId";
		this.getSession().createQuery(hql).setInteger("staffId", staffId).executeUpdate();
	}
	

	@Override
	public void deleteStaff(String staffName) {
		String hql = "delete form Staff where name = :staffName";
		this.getSession().createQuery(hql).setString("staffName", staffName).executeUpdate();
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Staff> listStaffs(int from, int pageSize) {
		String hql = "from Staff";
		return this.getSession().createQuery(hql).setFirstResult(from).setMaxResults(pageSize)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Staff> queryByNameAndId(int staffId, String staffName) {
		String hql = "from Staff where id like :staffId or name like :staffName";
		return this.getSession().createQuery(hql).setInteger("staffId", staffId).setString("staffName", "%"+staffName+"%")
				.list();
	}

	@Override
	public long getCount() {
		String hql = "select count(*) from Staff";
		return (long)this.getSession().createQuery(hql).setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@Override
	public Staff findStaffByStaffId(int staffId) {
		String hql = "from Staff where id = :staffId";
		return (Staff) getSession().createQuery(hql).setInteger("staffId", staffId)
				.setCacheable(Constants.SELECT_CACHE).uniqueResult();
		
	}


}
