package com.geariot.platform.freelycar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.service.PayService;
import com.geariot.platform.freelycar.shiro.PermissionRequire;
import com.geariot.platform.freelycar.utils.BuyCardParamWrapper;

@RestController
@RequestMapping(value = "/pay")
public class PayController {

	@Autowired
	private PayService payService;
	
	@RequestMapping(value = "/buycard" , method = RequestMethod.POST)
	@PermissionRequire("pay:buycard")
	public String buyCard(@RequestBody BuyCardParamWrapper wrapper){
		return this.payService.buyCard(wrapper.getClientId(), wrapper.getCard());
	}
	
	@RequestMapping(value = "/consumpay" , method = RequestMethod.POST)
	@PermissionRequire("pay:consumpay")
	public String consumPay(String consumOrdersId){
		return this.payService.consumPay(consumOrdersId);
	}
}
