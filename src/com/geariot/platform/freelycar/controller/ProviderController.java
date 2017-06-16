package com.geariot.platform.freelycar.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.Provider;

@RestController
@RequestMapping(value = "/provider")
public class ProviderController {

	@RequestMapping(value = "/add" , method = RequestMethod.POST)
	public String addProvider(Provider provider){
		return null;
	}
	
	@RequestMapping(value = "/delete" , method = RequestMethod.POST)
	public String deleteProvider(int providerId)
	{
		return null;
	}
	
	@RequestMapping(value = "/list" , method = RequestMethod.GET)
	public String getProviderList(int page , int number){
		return null;
	}
}
