package com.geariot.platform.freelycar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.Card;
import com.geariot.platform.freelycar.service.PayService;
import com.geariot.platform.freelycar.shiro.PermissionRequire;

@RestController
@RequestMapping(value = "/pay")
public class PayController {

	@Autowired
	private PayService payService;
	
	@RequestMapping(value = "/buycard" , method = RequestMethod.POST)
	@PermissionRequire("pay:buycard")
	public String buyCard(int clientId , Card card){
		return this.payService.buyCard(clientId, card);
	}
	
	@RequestMapping(value = "/consumpay" , method = RequestMethod.POST)
	@PermissionRequire("pay:consumpay")
	public String consumPay(String consumOrdersId){
		return this.payService.consumPay(consumOrdersId);
	}
}
