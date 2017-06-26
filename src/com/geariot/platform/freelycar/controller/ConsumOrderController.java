package com.geariot.platform.freelycar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.ConsumOrder;
import com.geariot.platform.freelycar.exception.ForRollbackException;
import com.geariot.platform.freelycar.service.ConsumOrderService;
import com.geariot.platform.freelycar.shiro.PermissionRequire;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.query.ConsumOrderQueryCondition;

@RestController
@RequestMapping("/order")
public class ConsumOrderController {

	@Autowired
	private ConsumOrderService orderService;
	
	@RequestMapping(value = "/book", method = RequestMethod.POST)
	@PermissionRequire("order:book")
	public String book(@RequestBody ConsumOrder consumOrder){
		try {
			return this.orderService.book(consumOrder);
		} catch (ForRollbackException e) {
			org.json.JSONObject obj = new org.json.JSONObject();
			obj.put(Constants.RESPONSE_DATA_KEY, e.getErrorCode());
			obj.put(Constants.RESPONSE_MSG_KEY, e.getMessage());
			return obj.toString();
		}
	}
	
	@RequestMapping(value = "/modify", method = RequestMethod.POST)
	@PermissionRequire("order:modify")
	public String modify(@RequestBody ConsumOrder consumOrder){
		return this.orderService.modify(consumOrder);
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@PermissionRequire("order:query")
	public String listConsumOrder(int page, int number){
		return this.orderService.list(page, number);
	}
	
	@RequestMapping(value = "/finish", method = RequestMethod.POST)
	@PermissionRequire("order:finish")
	public String finish(String consumOrderId){
		System.out.println(consumOrderId);
		return this.orderService.finish(consumOrderId);
	}
	
	@RequestMapping(value = "/deliver", method = RequestMethod.POST)
	@PermissionRequire("order:deliver")
	public String deliverCar(String consumOrderId){
		return this.orderService.deliverCar(consumOrderId);
	}
	
	@RequestMapping(value = "/query", method = RequestMethod.POST)
	@PermissionRequire("order:query")
	public String query(@RequestBody ConsumOrderQueryCondition condition){
		return this.orderService.query(condition);
	}
	
}
