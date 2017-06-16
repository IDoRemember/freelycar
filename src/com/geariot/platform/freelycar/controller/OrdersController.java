package com.geariot.platform.freelycar.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.geariot.platform.freelycar.entities.ConsumOrders;

public class OrdersController {

	@RequestMapping(value = "/book" , method = RequestMethod.POST)
	public String Book(ConsumOrders consumOrders){
		return null;
	}
	
	@RequestMapping(value = "/list" , method = RequestMethod.GET)
	public String listConsumOrder(int page , int number){
		return null;
	}
}
