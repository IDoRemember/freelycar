package com.geariot.platform.freelycar.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.OtherExpendOrder;
import com.geariot.platform.freelycar.entities.OtherExpendType;
import com.geariot.platform.freelycar.service.ChargeService;

@RestController
@RequestMapping(value = "/charge")
public class ChargeController {

	@Autowired
	private ChargeService chargeService;
	
	@RequestMapping(value = "/addtype" , method = RequestMethod.POST)
	public String addType(OtherExpendType otherExpendType){
		return chargeService.addType(otherExpendType);
	}
	
	@RequestMapping(value = "/deltype" , method = RequestMethod.POST)
	public String deleteType(int otherExpendTypeId){
		return chargeService.deleteType(otherExpendTypeId);
	}
	
	@RequestMapping(value = "/listtype" , method = RequestMethod.GET)
	public String listType(){
		return chargeService.listType();
	}
	
	@RequestMapping(value = "/add" , method = RequestMethod.POST)
	public String addCharge(OtherExpendOrder otherExpendOrder){
		return chargeService.addCharge(otherExpendOrder);
	}
	
	@RequestMapping(value = "/delete" , method = RequestMethod.POST)
	public String deleteCharge(String id){
		return chargeService.deleteCharge(id);
	}
	
	@RequestMapping(value = "/list" , method = RequestMethod.GET)
	public String listAllCharge(int page , int number){
		return chargeService.listAllCharge(page, number);
	}
	
	@RequestMapping(value = "/query" , method = RequestMethod.GET)
	public String selectCharge(int otherExpendTypeId , Date startTime , Date endTime){
		return chargeService.selectCharge(otherExpendTypeId, startTime, endTime);
	}
		
}
