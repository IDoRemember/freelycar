package com.geariot.platform.freelycar.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.Program;

@RestController
@RequestMapping(value = "/program")
public class ProgramController {

	@RequestMapping(value = "/add" , method = RequestMethod.POST)
	public String addProgram(Program program){
		return null;
	}
	
	@RequestMapping(value = "/list" , method = RequestMethod.GET)
	public String getProgramList(int page , int number){
		return null;
	}
	
	@RequestMapping(value = "/delete" , method = RequestMethod.POST)
	public String deleteProgram(int programId){
		return null;
	}
	
}
