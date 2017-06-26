package com.geariot.platform.freelycar.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.geariot.platform.freelycar.dao.ProviderDao;
import com.geariot.platform.freelycar.entities.Provider;
import com.geariot.platform.freelycar.model.RESCODE;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.DateJsonValueProcessor;
import com.geariot.platform.freelycar.utils.JsonResFactory;
import com.geariot.platform.freelycar.utils.query.ProviderAndQueryCreator;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

@Service
@Transactional
public class ProviderService {

	@Autowired
	private ProviderDao providerDao;
	
	public String addProvider(Provider provider){
		provider.setCreateDate(new Date());
		providerDao.save(provider);
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
		JSONObject data = JSONObject.fromObject(provider , config);
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, data);
		return obj.toString();
		/*provider.setCreateDate(new Date());
		providerDao.save(provider);
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();*/
	}
	
	public String deleteProvider(Integer[] providerIds){
		int count = 0;
		for(int providerId : providerIds){
			if(providerDao.findProviderById(providerId) == null){
				count++;
			}
			else{
				providerDao.delete(providerId);
			}
		}
		String tips = "共"+count+"条未在数据库中存在记录";
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.PART_SUCCESS , tips);
		return obj.toString();
	}
	
	public String getProviderList(int page , int number){
		int from = (page - 1) * number;
		List<Provider> list = providerDao.listProviders(from, number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = providerDao.getCount();
		int size=(int) Math.ceil(realSize/(double)number);
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
		JSONArray jsonArray = JSONArray.fromObject(list, config);
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
		obj.put(Constants.RESPONSE_SIZE_KEY, size);
		obj.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
		return obj.toString();
	}
	
	public String getSelectProvider(String name , int page , int number){
		String andCondition = new ProviderAndQueryCreator(name).createStatement();
		int from = (page - 1) * number;
		List<Provider> list = providerDao.getConditionQuery(andCondition, from, number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = (long) providerDao.getConditionCount(andCondition);
		int size=(int) Math.ceil(realSize/(double)number);
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
		JSONArray jsonArray = JSONArray.fromObject(list, config);
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
		obj.put(Constants.RESPONSE_SIZE_KEY, size);
		obj.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
		return obj.toString();
	}
	
	public String getProviderName(){
		List<String> list = providerDao.listName();
		JSONArray jsonArray = JSONArray.fromObject(list);
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
		return obj.toString();
	}
}
