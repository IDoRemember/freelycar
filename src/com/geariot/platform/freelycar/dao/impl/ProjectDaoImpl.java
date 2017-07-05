package com.geariot.platform.freelycar.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.geariot.platform.freelycar.dao.ProjectDao;
import com.geariot.platform.freelycar.entities.Project;
import com.geariot.platform.freelycar.model.ORDER_CON;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.query.QueryUtils;

@Repository
public class ProjectDaoImpl implements ProjectDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	private Session getSession(){
		return sessionFactory.getCurrentSession();
	}
	
	@Override
	public Project findProjectById(int projectId) {
		String hql = "from Project where id = :projectId";
		return (Project) getSession().createQuery(hql).setInteger("projectId", projectId)
				.setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@Override
	public String save(Project project) {
		return this.getSession().save(project).toString();
	}

	@Override
	public void delete(Project project) {
		this.getSession().delete(project);
	}

	@Override
	public void delete(int projectId) {
		String hql = "delete from Project where id =:projectId";
		this.getSession().createQuery(hql).setInteger("projectId" , projectId).executeUpdate();
	}

	@Override
	public long getCount() {
		String hql = "select count(*) from Project";
		return (long) this.getSession().createQuery(hql).setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Project> listProjects(int from, int pageSize) {
		String hql = "from Project";
		return this.getSession().createQuery(hql).setFirstResult(from).setMaxResults(pageSize)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	/*@SuppressWarnings("unchecked")
	@Override
	public List<Project> queryByNameAndId(String name, int programId) {
		String hql = "from Project where name like :name and programId like :programId";
		return this.getSession().createQuery(hql).setString("name", name).setInteger("programId", programId)
				.list();
	}*/

	@Override
	public void deleteByprogramId(int programId) {
		String sql = "delete from project where programId =:programId";
		this.getSession().createSQLQuery(sql).setInteger("programId" , programId).executeUpdate();
	}

	@Override
	public Project findProjectByName(String name) {
		String hql = "from Project where name = :name";
		return (Project) getSession().createQuery(hql).setString("name", name)
				.setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Project> getConditionQuery(String andCondition, int from, int pageSize) {
		String basic = "from Project";
		String hql = QueryUtils.createQueryString(new StringBuffer(basic), andCondition, ORDER_CON.NO_ORDER).toString();
		return this.getSession().createQuery(hql).setFirstResult(from).setMaxResults(pageSize)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@Override
	public long getConditionCount(String andCondition) {
		String basic = "select count(*) from Project";
		String hql = QueryUtils.createQueryString(new StringBuffer(basic), andCondition, ORDER_CON.NO_ORDER).toString();
		return (long) this.getSession().createQuery(hql).setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@Override
	public long countInventoryByIds(List<String> inventoryIds) {
		String hql = "select count(*) from ProjectInventoriesInfo where inventory.id in :list";
		return (long) this.getSession().createQuery(hql).setParameterList("list", inventoryIds)
				.setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	
	
	
}
