package com.geariot.platform.freelycar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.Service;
import com.geariot.platform.freelycar.service.ServiceService;
import com.geariot.platform.freelycar.shiro.PermissionRequire;

@RestController
@RequestMapping(value = "/service")
public class ServiceController {

	@Autowired
	private ServiceService serviceService;
	
	@RequestMapping(value = "/add" , method = RequestMethod.POST)
	@PermissionRequire("service:add")
	public String addService(@RequestBody Service service){
		System.out.println(service);
		return serviceService.addService(service);
	}
	
	@RequestMapping(value = "/delete" , method = RequestMethod.POST)
	@PermissionRequire("service:delete")
	public String deleteService(int serviceId){
		return serviceService.deleteService(serviceId);
	}
	
	@RequestMapping(value = "/modify" , method = RequestMethod.POST)
	@PermissionRequire("service:modify")
	public String modifyService(Service service){
		return serviceService.modifyService(service);
	}
	
	/*@RequestMapping(value = "/list" , method = RequestMethod.GET)
	@PermissionRequire("service:query")
	public String getServiceList(int page , int number){
		return serviceService.getServiceList(page, number);
	}*/
	
	@RequestMapping(value = "/query" , method = RequestMethod.GET)
	@PermissionRequire("service:query")
	public String getSelectService(String name , int page , int number){
		return serviceService.getSelectService(name, page, number);
	}
	
	@RequestMapping(value = "/name" , method = RequestMethod.GET)
	@PermissionRequire("service:query")
	public String getAllName(){
		return serviceService.getAllName();
	}
	
}
