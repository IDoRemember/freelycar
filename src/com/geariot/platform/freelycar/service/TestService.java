package com.geariot.platform.freelycar.service;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.geariot.platform.freelycar.daoimp.TestDao;
import com.geariot.platform.freelycar.entities.CarBrand;
import com.geariot.platform.freelycar.entities.CarType;
import com.geariot.platform.freelycar.utils.JsonPropertyFilter;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

@Service
@Transactional
public class TestService {
	@Autowired
	private TestDao dao;
	
	public void add(CarBrand b){
		dao.add(b);
	}

	public String get() {
		JSONObject obj = new JSONObject();
		CarBrand b = dao.get();
		CarType t = b.getTypes().get(0);
		JsonConfig cf = new JsonConfig();
		JsonConfig cf2 = new JsonConfig();
		cf.setJsonPropertyFilter(new JsonPropertyFilter(CarBrand.class));
		cf2.setJsonPropertyFilter(new JsonPropertyFilter(Collection.class));
		obj.put("brand", JSONObject.fromObject(b, cf));
		obj.put("type", JSONObject.fromObject(t, cf2));
		return obj.toString();
	}
}
