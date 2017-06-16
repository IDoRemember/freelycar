package com.geariot.platform.freelycar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.Admin;
import com.geariot.platform.freelycar.service.AdminService;
import com.geariot.platform.freelycar.shiro.PermissionRequire;

@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public String login(String account, String password, boolean rememberMe){
		return adminService.login(account, password, rememberMe);
	}
	
	@RequestMapping(value="/logout", method=RequestMethod.GET)
	public String logout(){
		return adminService.logout();
	}
	
	@RequestMapping(value="/add", method=RequestMethod.POST)
	@PermissionRequire("admin:add")
	public String add(Admin admin){
		return adminService.addAdmin(admin);
	}
	
	@RequestMapping(value="/modify", method=RequestMethod.POST)
	@PermissionRequire("admin:modify")
	public String modify(Admin admin){
		return adminService.modify(admin);
	}
	
	@RequestMapping(value="/delete", method=RequestMethod.POST)
	@PermissionRequire("admin:delete")
	public String delete(int adminId){
		return adminService.delete(adminId);
	}
	
	@RequestMapping(value="/list", method=RequestMethod.GET)
	@PermissionRequire("admin:list")
	public String list(int page, int number){
		return adminService.list(page, number);
	}
	
}
