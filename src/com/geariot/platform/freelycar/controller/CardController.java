package com.geariot.platform.freelycar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.service.CardService;

@RestController
@RequestMapping("/card")
public class CardController {
	
	@Autowired
	private CardService cardService;
	
	@RequestMapping(value="/avail", method=RequestMethod.GET)
	public String getAvailableCard(int clientId, int projectId){
		return this.cardService.getAvailableCard(clientId, projectId);
	}
	
}
