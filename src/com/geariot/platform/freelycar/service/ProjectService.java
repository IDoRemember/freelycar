package com.geariot.platform.freelycar.service;

import java.util.Date;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.geariot.platform.freelycar.dao.ProjectDao;
import com.geariot.platform.freelycar.entities.Project;
import com.geariot.platform.freelycar.model.RESCODE;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.DateJsonValueProcessor;
import com.geariot.platform.freelycar.utils.JsonResFactory;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;

@Service
@Transactional
public class ProjectService {

	@Autowired
	private ProjectDao projectDao;
	
	public String addProject(Project project){
		project.setCreateDate(new Date());
		project.getProjectAccessoriesInfos()
		projectDao.save(project);
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}
	
	public String deleteProject(int projectId){
		Project exist = projectDao.findProjectById(projectId);
		JSONObject obj = null;
		if(exist == null){
			obj = JsonResFactory.buildOrg(RESCODE.NOT_FOUND);
		}
		else{
			projectDao.delete(projectId);
			obj = JsonResFactory.buildOrg(RESCODE.SUCCESS);
		}
		return obj.toString();
	}
	
	public String getProjectList(int page , int number){
		int from = (page - 1) * number;
		List<Project> list = projectDao.listProjects(from, number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = projectDao.getCount();
		int size=(int) Math.ceil(realSize/(double)number);
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
		JSONArray jsonArray = JSONArray.fromObject(list, config);
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
		obj.put(Constants.RESPONSE_SIZE_KEY, size);
		return obj.toString();
	}
	
	public String getSelectProject(String name , int programId){
		List<Project> list = projectDao.queryByNameAndId(name, programId);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
		JSONArray jsonArray = JSONArray.fromObject(list, config);
		return JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray).toString();
	}
	
	public String modifyProject(Project project){
		Project exist = projectDao.findProjectById(project.getId());
		if(exist == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		exist.setName(project.getName());
		exist.setComment(project.getComment());
		exist.setPrice(project.getPrice());
		exist.setPricePerUnit(project.getPricePerUnit());
		exist.setReferWorkTime(project.getReferWorkTime());
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}
}
