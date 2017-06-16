package com.geariot.platform.freelycar.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.Car;
import com.geariot.platform.freelycar.entities.Client;

@RestController
@RequestMapping(value = "/user")
public class UserController {

	@RequestMapping(value = "/list" , method = RequestMethod.GET)
	public String getClientList(int page , int number){
		return null;
	}
	
	@RequestMapping(value = "/add" , method = RequestMethod.POST)
	public String addClient(Client client)
	{
		return null;
	}
	
	@RequestMapping(value = "/modify" , method = RequestMethod.POST)
	public String modifyClient(Client client)
	{
		return null;
	}
	
	@RequestMapping(value = "/delete" , method = RequestMethod.POST)
	public String deleteClient(int clientId)
	{
		return null;
	}
	
	@RequestMapping(value = "/query" , method = RequestMethod.GET)
	public String searchClient(String searchText)
	{
		return null;
	}
	
	@RequestMapping(value = "/detail" , method = RequestMethod.GET)
	public String getClientDetail(int clientId)
	{
		return null;
	}
	
	@RequestMapping(value = "/addcar" , method = RequestMethod.POST)
	public String addClientCar(int clientId , Car car)
	{
		return null;
	}
	
	@RequestMapping(value = "/delcar" , method = RequestMethod.POST)
	public String addClientCar(int clientId , int carId)
	{
		return null;
	}
	
}
