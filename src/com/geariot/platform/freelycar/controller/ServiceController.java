package com.geariot.platform.freelycar.controller;

import java.util.Date;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.Service;

@RestController
@RequestMapping(value = "/service")
public class ServiceController {

	@RequestMapping(value = "/add" , method = RequestMethod.POST)
	public String addService(Service service){
		return null;
	}
	
	@RequestMapping(value = "/delete" , method = RequestMethod.POST)
	public String deleteService(int serviceId){
		return null;
	}
	
	@RequestMapping(value = "/modify" , method = RequestMethod.POST)
	public String modifyService(Service service){
		return null;
	}
	
	@RequestMapping(value = "/list" , method = RequestMethod.GET)
	public String getServiceList(int page , int number){
		return null;
	}
	
	@RequestMapping(value = "/query" , method = RequestMethod.GET)
	public String getSelectService(String name , Date startTime , Date endTime){
		return null;
	}
}
