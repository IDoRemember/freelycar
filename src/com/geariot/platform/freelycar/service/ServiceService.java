package com.geariot.platform.freelycar.service;


import java.util.Date;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.geariot.platform.freelycar.dao.ServiceDao;
import com.geariot.platform.freelycar.entities.Service;
import com.geariot.platform.freelycar.model.RESCODE;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.DateJsonValueProcessor;
import com.geariot.platform.freelycar.utils.JsonResFactory;
import com.geariot.platform.freelycar.utils.query.ServiceAndQueryCreator;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;



@org.springframework.stereotype.Service
@Transactional
public class ServiceService {

	@Autowired
	private ServiceDao serviceDao;
	
	public String addService(Service service){
		service.setCreateDate(new Date());
		serviceDao.save(service);
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}
	
	public String deleteService(int serviceId){
		Service exist = serviceDao.findServiceById(serviceId);
		JSONObject obj = null;
		if(exist == null){
			obj = JsonResFactory.buildOrg(RESCODE.NOT_FOUND);
		}
		else{
			serviceDao.delete(serviceId);
			obj = JsonResFactory.buildOrg(RESCODE.SUCCESS);
		}
		return obj.toString();
	}
	
	public String modifyService(Service service){
		Service exist = serviceDao.findServiceById(service.getId());
		JSONObject obj = null;
		if(exist == null){
			obj = JsonResFactory.buildOrg(RESCODE.NOT_FOUND);
		}
		else{
			exist.setComment(service.getComment());
			exist.setName(service.getName());
			exist.setValidTime(service.getValidTime());
			exist.setPrice(service.getPrice());
			obj = JsonResFactory.buildOrg(RESCODE.SUCCESS);
		}
		return obj.toString();
	}
	
	/*public String getServiceList(int page , int number){
		String andCondition = new ServiceAndQueryCreator(name).createStatement();
		int from = (page - 1) * number;
		List<Service> list = serviceDao.listServices(from, number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = serviceDao.getCount();
		int size=(int) Math.ceil(realSize/(double)number);
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
		JSONArray jsonArray = JSONArray.fromObject(list, config);
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
		obj.put(Constants.RESPONSE_SIZE_KEY, size);
		return obj.toString();
	}*/
	
	public String getSelectService(String name , int page , int number){
		String andCondition = new ServiceAndQueryCreator(name).createStatement();
		int from = (page - 1) * number;
		List<Service> list = serviceDao.listServices(andCondition, from, number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = serviceDao.getConditionCount(andCondition);
		int size = (int) Math.ceil(realSize/(double)number);
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
		JSONArray jsonArray = JSONArray.fromObject(list, config);
		net.sf.json.JSONObject obj =  JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
		obj.put(Constants.RESPONSE_SIZE_KEY, size);
		obj.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
		return obj.toString();
	}
}
