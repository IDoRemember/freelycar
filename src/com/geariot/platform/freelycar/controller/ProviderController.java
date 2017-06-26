package com.geariot.platform.freelycar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.Provider;
import com.geariot.platform.freelycar.service.ProviderService;
import com.geariot.platform.freelycar.shiro.PermissionRequire;

@RestController
@RequestMapping(value = "/provider")
public class ProviderController {

	@Autowired
	private ProviderService providerService;
	
	@RequestMapping(value = "/add" , method = RequestMethod.POST)
	@PermissionRequire("provider:add")
	public String addProvider(Provider provider){
		return providerService.addProvider(provider);
	}
	
	@RequestMapping(value = "/delete" , method = RequestMethod.POST)
	@PermissionRequire("provider:delete")
	public String deleteProvider(Integer[] providerIds){
		return providerService.deleteProvider(providerIds);
	}
	
	@RequestMapping(value = "/list" , method = RequestMethod.GET)
	@PermissionRequire("provider:query")
	public String getProviderList(int page , int number){
		return providerService.getProviderList(page, number);
	}
	
	@RequestMapping(value = "/query" , method = RequestMethod.GET)
	@PermissionRequire("provider:query")
	public String getSelectProvider(String name , int page , int number){
		return providerService.getSelectProvider(name, page, number);
	}
	
	@RequestMapping(value = "/name" , method = RequestMethod.GET)
	@PermissionRequire("provider:query")
	public String getProviderName(){
		return providerService.getProviderName();
	}
}
