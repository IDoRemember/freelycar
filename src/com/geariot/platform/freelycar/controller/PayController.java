package com.geariot.platform.freelycar.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.Card;

@RestController
@RequestMapping(value = "/pay")
public class PayController {

	@RequestMapping(value = "/buycard" , method = RequestMethod.POST)
	public String buyCard(int clientId , Card card){
		return null;
	}
	
	@RequestMapping(value = "/consumpay" , method = RequestMethod.POST)
	public String consumPay(int consumOrdersId){
		return null;
	}
}
