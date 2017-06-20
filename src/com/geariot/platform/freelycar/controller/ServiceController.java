package com.geariot.platform.freelycar.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.Service;
import com.geariot.platform.freelycar.service.ServiceService;

@RestController
@RequestMapping(value = "/service")
public class ServiceController {

	@Autowired
	private ServiceService serviceService;
	
	@RequestMapping(value = "/add" , method = RequestMethod.POST)
	public String addService(Service service){
		return serviceService.addService(service);
	}
	
	@RequestMapping(value = "/delete" , method = RequestMethod.POST)
	public String deleteService(int serviceId){
		return serviceService.deleteService(serviceId);
	}
	
	@RequestMapping(value = "/modify" , method = RequestMethod.POST)
	public String modifyService(Service service){
		return serviceService.modifyService(service);
	}
	
	@RequestMapping(value = "/list" , method = RequestMethod.GET)
	public String getServiceList(int page , int number){
		return serviceService.getServiceList(page, number);
	}
	
	@RequestMapping(value = "/query" , method = RequestMethod.GET)
	public String getSelectService(String name){
		return serviceService.getSelectService(name);
	}
}
