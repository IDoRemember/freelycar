package com.geariot.platform.freelycar.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.Staff;

@RestController
@RequestMapping(value = "/staff")
public class StaffController {

	@RequestMapping(value = "/add" , method = RequestMethod.POST)
	public String addStaff(Staff staff){
		return null;
	}
	
	@RequestMapping(value = "/modify" , method = RequestMethod.POST)
	public String modifyStaff(Staff staff){
		return null;
	}
	
	@RequestMapping(value = "/delete" , method = RequestMethod.POST)
	public String deleteStaff(int staffId){
		return null;
	}
	
	@RequestMapping(value = "/list" , method = RequestMethod.GET)
	public String getStaffList(int page , int number){
		return null;
	}
	
	@RequestMapping(value = "/query" , method = RequestMethod.GET)
	public String getSelectStaff(int staffId , String staffName){
		return null;
	}
	
}
