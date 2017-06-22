package com.geariot.platform.freelycar.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.utils.IDGenerator;

@RestController
@RequestMapping(value = "/idgen")
public class IdgenController {

	//type:0,1,2,3,4,5 = 开卡，美容，维修，出库，入库，库存编号
	@RequestMapping(value = "/generate")
	public String generateIdgen(int type){
		return IDGenerator.generate(type);
	}
}
