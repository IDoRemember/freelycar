package com.geariot.platform.freelycar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.Staff;
import com.geariot.platform.freelycar.service.StaffService;
import com.geariot.platform.freelycar.shiro.PermissionRequire;

@RestController
@RequestMapping(value = "/staff")
public class StaffController {

	@Autowired
	private StaffService staffService;
	
	@RequestMapping(value = "/add" , method = RequestMethod.POST)
	@PermissionRequire
	public String addStaff(Staff staff){
		return staffService.addStaff(staff);
	}
	
	@RequestMapping(value = "/modify" , method = RequestMethod.POST)
	public String modifyStaff(Staff staff){
		return staffService.modifyStaff(staff);
	}
	
	@RequestMapping(value = "/delete" , method = RequestMethod.POST)
	public String deleteStaff(int[] staffIds ){
		return staffService.deleteStaff(staffIds);
	}
	
	@RequestMapping(value = "/list" , method = RequestMethod.GET)
	public String getStaffList(int page , int number){
		return staffService.getStaffList(page, number);
	}
	
	@RequestMapping(value = "/query" , method = RequestMethod.GET)
	public String getSelectStaff(int staffId , String staffName){
		return staffService.getSelectStaff(staffId, staffName);
	}
	
}
