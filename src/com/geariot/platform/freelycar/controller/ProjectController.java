package com.geariot.platform.freelycar.controller;

import java.util.Date;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.Project;

@RestController
@RequestMapping(value = "/project")
public class ProjectController {

	@RequestMapping(value = "/add" , method = RequestMethod.POST)
	public String addProject(int programId , Project project){
		return null;
	}
	
	@RequestMapping(value = "/modify" , method = RequestMethod.POST)
	public String modifyProject(int projectId){
		return null;
	}
	
	@RequestMapping(value = "/delete" , method = RequestMethod.POST)
	public String deleteProject(int projectId){
		return null;
	}
	
	@RequestMapping(value = "/list" , method = RequestMethod.GET)
	public String getProjectList(int page , int number){
		return null;
	}
	
	@RequestMapping(value = "/query" , method = RequestMethod.GET)
	public String getSelectProject(String name , int programId , Date startTime , Date endTime){
		return null;
	}
}
