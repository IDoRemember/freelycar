package com.geariot.platform.freelycar.controller;

import java.util.Arrays;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.Car;
import com.geariot.platform.freelycar.entities.Client;
import com.geariot.platform.freelycar.service.ClientService;
import com.geariot.platform.freelycar.shiro.PermissionRequire;

@RestController
@RequestMapping(value = "/client")
public class ClientController {

	private static final Logger log = LogManager.getLogger(ClientController.class);
	
	@Autowired
	private ClientService clientService;
	
	@RequestMapping(value = "/list" , method = RequestMethod.GET)
	@PermissionRequire("client:query")
	public String getClientList(int page , int number){
		return clientService.list(page, number);
	}
	
	@RequestMapping(value = "/add" , method = RequestMethod.POST)
	@PermissionRequire("client:add")
	public String addClient(Client client) {
		return clientService.add(client);
	}
	
	@RequestMapping(value = "/modify" , method = RequestMethod.POST)
	@PermissionRequire("client:modify")
	public String modifyClient(Client client) {
		return clientService.modify(client);
	}
	
	@RequestMapping(value = "/delete" , method = RequestMethod.POST)
	@PermissionRequire("client:delete")
	public String deleteClient(Integer... clientIds) {
		return clientService.delete(Arrays.asList(clientIds));
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
