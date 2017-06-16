package com.geariot.platform.freelycar.controller;

import java.util.Date;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.OtherExpendOrder;

@RestController
@RequestMapping(value = "/charge")
public class ChargeController {

	@RequestMapping(value = "/addtype" , method = RequestMethod.POST)
	public String addType(String name){
		return null;
	}
	
	@RequestMapping(value = "/deltype" , method = RequestMethod.POST)
	public String deleteType(int otherExpandTypeId){
		return null;
	}
	
	@RequestMapping(value = "/listtype" , method = RequestMethod.GET)
	public String listType(){
		return null;
	}
	
	@RequestMapping(value = "/add" , method = RequestMethod.POST)
	public String addCharge(OtherExpendOrder otherExpendOrder){
		return null;
	}
	
	@RequestMapping(value = "/delete" , method = RequestMethod.POST)
	public String deleteCharge(int otherExpandOrderId){
		return null;
	}
	
	@RequestMapping(value = "/list" , method = RequestMethod.GET)
	public String listAllCharger(int page , int number){
		return null;
	}
	
	@RequestMapping(value = "/query" , method = RequestMethod.GET)
	public String selectCharge(int otherExpandTypeId , Date startTime , Date endTime){
		return null;
	}
	
}
