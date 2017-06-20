package com.geariot.platform.freelycar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.Program;
import com.geariot.platform.freelycar.service.ProgramService;

@RestController
@RequestMapping(value = "/program")
public class ProgramController {

	@Autowired
	private ProgramService programService;
	
	@RequestMapping(value = "/add" , method = RequestMethod.POST)
	public String addProgram(Program program){
		return programService.addProgram(program);
	}
	
	@RequestMapping(value = "/list" , method = RequestMethod.GET)
	public String getProgramList(int page , int number){
		return programService.getProgramList(page, number);
	}
	
	@RequestMapping(value = "/delete" , method = RequestMethod.POST)
	public String deleteProgram(int programId){
		return programService.deleteProgram(programId);
	}
	
}
