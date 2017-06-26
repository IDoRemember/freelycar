package com.geariot.platform.freelycar.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.utils.IDGenerator;

import net.sf.json.JSONObject;

@RestController
@RequestMapping(value = "/idgen")
public class IdgenController {

	//type:0,1,2,3,4,5 = 开卡，美容，维修，出库，入库，库存编号
	@RequestMapping(value = "/generate")
	public String generateIdgen(int type){
		String id = IDGenerator.generate(type);
		JSONObject res = new JSONObject();
		res.put("id", id);
		return res.toString();
	}
}
