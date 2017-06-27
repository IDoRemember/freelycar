package com.geariot.platform.freelycar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.Program;
import com.geariot.platform.freelycar.service.ProgramService;
import com.geariot.platform.freelycar.shiro.PermissionRequire;

@RestController
@RequestMapping(value = "/program")
public class ProgramController {

	@Autowired
	private ProgramService programService;
	
	@RequestMapping(value = "/add" , method = RequestMethod.POST)
	@PermissionRequire("program:add")
	public String addProgram(Program program){
		return programService.addProgram(program);
	}
	
	@RequestMapping(value = "/list" , method = RequestMethod.GET)
	@PermissionRequire("program:query")
	public String getProgramList(int page , int number){
		return programService.getProgramList(page, number);
	}
	
	@RequestMapping(value = "/delete" , method = RequestMethod.POST)
	@PermissionRequire("program:delete")
	public String deleteProgram(int programId){
		return programService.deleteProgram(programId);
	}
	
	@RequestMapping(value = "/listall" , method = RequestMethod.GET)
	@PermissionRequire("program:query")
	public String getProgramList(){
		return programService.getProgramList();
	}
}
