package com.geariot.platform.freelycar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.Provider;
import com.geariot.platform.freelycar.service.ProviderService;

@RestController
@RequestMapping(value = "/provider")
public class ProviderController {

	@Autowired
	private ProviderService providerService;
	
	@RequestMapping(value = "/add" , method = RequestMethod.POST)
	public String addProvider(Provider provider){
		return providerService.addProvider(provider);
	}
	
	@RequestMapping(value = "/delete" , method = RequestMethod.POST)
	public String deleteProvider(int[] providerIds)
	{
		return providerService.deleteProvider(providerIds);
	}
	
	@RequestMapping(value = "/list" , method = RequestMethod.GET)
	public String getProviderList(int page , int number){
		return providerService.getProviderList(page, number);
	}
	
	@RequestMapping(value = "/query" , method = RequestMethod.GET)
	public String getSelectProvider(String name){
		return providerService.getSelectProvider(name);
	}
}
