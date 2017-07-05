package com.geariot.platform.freelycar.service;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.geariot.platform.freelycar.dao.CardDao;
import com.geariot.platform.freelycar.dao.ProjectDao;
import com.geariot.platform.freelycar.dao.ServiceDao;
import com.geariot.platform.freelycar.entities.Project;
import com.geariot.platform.freelycar.model.RESCODE;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.DateJsonValueProcessor;
import com.geariot.platform.freelycar.utils.JsonResFactory;
import com.geariot.platform.freelycar.utils.query.ProjectAndQueryCreator;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;

@Service
@Transactional
public class ProjectService {

	@Autowired
	private ProjectDao projectDao;
	
	@Autowired
	private CardDao cardDao;
	
	@Autowired
	private ServiceDao serviceDao;
	
	public String addProject(Project project){
		project.setCreateDate(new Date());
		//project.getInventoryInfos();
		projectDao.save(project);
		JsonConfig config = JsonResFactory.dateConfig();
		return JsonResFactory.buildNetWithData(RESCODE.SUCCESS,net.sf.json.JSONObject.fromObject(project, config)).toString();
	}
	
	public String deleteProject(Integer... projectIds){
		List<Integer> ids = Arrays.asList(projectIds);
		//查找CardProjectRemainingInfo和ServiceProjectInfo，如果有该project的引用，则返回错误，删除失败
		if(this.cardDao.countProjectByIds(ids) > 0 || this.serviceDao.countProjectByIds(ids) > 0){
			return JsonResFactory.buildOrg(RESCODE.UNABLE_TO_DELETE).toString();
		}
		
		int count = 0;
		for(int projectId : projectIds){
			if(projectDao.findProjectById(projectId) == null){
				count++;
			}
			else{
				projectDao.delete(projectId);;
			}
		}
		if(count !=0){
			String tips = "共"+count+"条未在数据库中存在记录";
			net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.PART_SUCCESS , tips);
			long realSize = projectDao.getCount();
			obj.put(Constants.RESPONSE_REAL_SIZE_KEY,realSize);
			return obj.toString();
		}
		else{
			JSONObject obj = JsonResFactory.buildOrg(RESCODE.SUCCESS);
			long realSize = projectDao.getCount();
			obj.put(Constants.RESPONSE_REAL_SIZE_KEY,realSize);
			return obj.toString();
		}
	}
	
	/*public String getProjectList(int page , int number){
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
	}*/
	
	public String getSelectProject(String name , String programId , int page ,int number){
		if((name == null || name.isEmpty()|| name.trim().isEmpty())&&(programId==null||programId.isEmpty()||programId.trim().isEmpty()))
		{
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
			obj.put(Constants.RESPONSE_REAL_SIZE_KEY,realSize);
			return obj.toString();
		}
		else{
			String andCondition = new ProjectAndQueryCreator(name, programId).createStatement();
			int from = (page - 1) * number;
			List<Project> list = projectDao.getConditionQuery(andCondition, from, number);
			if(list == null || list.isEmpty()){
				return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
			}
			long realSize = (long) projectDao.getConditionCount(andCondition);
			int size=(int) Math.ceil(realSize/(double)number);
			JsonConfig config = new JsonConfig();
			config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
			JSONArray jsonArray = JSONArray.fromObject(list, config);
			net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
			obj.put(Constants.RESPONSE_SIZE_KEY, size);
			obj.put(Constants.RESPONSE_REAL_SIZE_KEY,realSize);
			return obj.toString();
		}
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
