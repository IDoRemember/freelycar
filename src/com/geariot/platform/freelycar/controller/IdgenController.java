package com.geariot.platform.freelycar.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/idgen")
public class IdgenController {

	@RequestMapping(value = "/generate")
	public String generateIdgen(int type){
		return null;
	}
}
