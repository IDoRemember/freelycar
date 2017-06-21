package com.geariot.platform.freelycar.dao;

import java.util.List;

import com.geariot.platform.freelycar.entities.Project;

public interface ProjectDao {
	
	Project findProjectByName(String name);
	
	Project findProjectById(int projectId);
	
	void save(Project project);
	
	void delete(Project project);
	
	void delete(int projectId);
	
	void deleteByprogramId(int programId);
	
	long getCount();
	
	List<Project> listProjects(int from , int pageSize);
	
	List<Project> queryByNameAndId(String name , int programId);
}