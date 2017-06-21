package com.geariot.platform.freelycar.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.geariot.platform.freelycar.dao.ProjectDao;
import com.geariot.platform.freelycar.entities.Project;
import com.geariot.platform.freelycar.utils.Constants;

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
	public void save(Project project) {
		this.getSession().save(project);
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
		String hql = "select count(*) from Program";
		return (long) this.getSession().createQuery(hql).setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Project> listProjects(int from, int pageSize) {
		String hql = "from Project";
		return this.getSession().createQuery(hql).setFirstResult(from).setMaxResults(pageSize)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Project> queryByNameAndId(String name, int programId) {
		String hql = "from Project where name like :name and programId like :programId";
		return this.getSession().createQuery(hql).setString("name", name).setInteger("programId", programId)
				.list();
	}

	@Override
	public void deleteByprogramId(int programId) {
		String hql = "delete from Project where programId =:programId";
		this.getSession().createQuery(hql).setInteger("programId" , programId).executeUpdate();
	}

	@Override
	public Project findProjectByName(String name) {
		String hql = "from Project where name = :name";
		return (Project) getSession().createQuery(hql).setString("name", name)
				.setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	
}
