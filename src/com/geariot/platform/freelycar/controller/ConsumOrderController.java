package com.geariot.platform.freelycar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.ConsumOrder;
import com.geariot.platform.freelycar.service.ConsumOrderService;
import com.geariot.platform.freelycar.utils.query.ConsumOrderQueryCondition;

@RestController
@RequestMapping("/order")
public class ConsumOrderController {

	@Autowired
	private ConsumOrderService orderService;
	
	@RequestMapping(value = "/book", method = RequestMethod.POST)
	public String book(@RequestBody ConsumOrder consumOrder){
		return this.orderService.book(consumOrder);
	}
	
	@RequestMapping(value = "/modify", method = RequestMethod.POST)
	public String modify(@RequestBody ConsumOrder consumOrder){
		return this.orderService.modify(consumOrder);
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String listConsumOrder(int page, int number){
		return this.orderService.list(page, number);
	}
	
	@RequestMapping(value = "/finish", method = RequestMethod.POST)
	public String finish(String consumOrderId){
		return this.orderService.finish(consumOrderId);
	}
	
	@RequestMapping(value = "/deliver", method = RequestMethod.POST)
	public String deliverCar(String consumOrderId){
		return this.orderService.deliverCar(consumOrderId);
	}
	
	@RequestMapping(value = "/query", method = RequestMethod.POST)
	public String query(@RequestBody ConsumOrderQueryCondition condition){
		return this.orderService.query(condition);
	}
	
}
