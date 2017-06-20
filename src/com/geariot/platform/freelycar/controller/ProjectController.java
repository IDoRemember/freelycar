package com.geariot.platform.freelycar.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.Project;
import com.geariot.platform.freelycar.service.ProjectService;

@RestController
@RequestMapping(value = "/project")
public class ProjectController {

	@Autowired
	private ProjectService projectService;
	
	@RequestMapping(value = "/add" , method = RequestMethod.POST)
	public String addProject(Project project){
		return projectService.addProject(project);
	}
	
	@RequestMapping(value = "/modify" , method = RequestMethod.POST)
	public String modifyProject(Project project){
		return projectService.modifyProject(project);
	}
	
	@RequestMapping(value = "/delete" , method = RequestMethod.POST)
	public String deleteProject(int projectId){
		return projectService.deleteProject(projectId);
	}
	
	@RequestMapping(value = "/list" , method = RequestMethod.GET)
	public String getProjectList(int page , int number){
		return projectService.getProjectList(page, number);
	}
	
	@RequestMapping(value = "/query" , method = RequestMethod.GET)
	public String getSelectProject(String name , int programId){
		return projectService.getSelectProject(name, programId);
	}
}
