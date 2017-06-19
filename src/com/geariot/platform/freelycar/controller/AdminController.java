package com.geariot.platform.freelycar.controller;

import java.util.Arrays;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.Admin;
import com.geariot.platform.freelycar.service.AdminService;
import com.geariot.platform.freelycar.shiro.PermissionRequire;

@RestController
@RequestMapping("/admin")
public class AdminController {
	
	private static final Logger log = LogManager.getLogger(AdminController.class);
	
	@Autowired
	private AdminService adminService;
	
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public String login(String account, String password, boolean rememberMe){
		System.out.println(account + "---" + password);
		return adminService.login(account, password, rememberMe);
	}
	
	@RequestMapping(value="/logout", method=RequestMethod.GET)
	public String logout(){
		return adminService.logout();
	}
	
	@RequestMapping(value="/add", method=RequestMethod.POST)
	@PermissionRequire("admin:add")
	public String add(@RequestBody Admin admin){
		return adminService.addAdmin(admin);
	}
	
	@RequestMapping(value="/modify", method=RequestMethod.POST)
	@PermissionRequire("admin:modify")
	public String modify(@RequestBody Admin admin){
		return adminService.modify(admin);
	}
	
	@RequestMapping(value="/delete", method=RequestMethod.POST)
	@PermissionRequire("admin:delete")
	public String delete(String... accounts){
		log.info(Arrays.toString(accounts));
		return adminService.delete(accounts);
	}
	
	@RequestMapping(value="/list", method=RequestMethod.GET)
	@PermissionRequire("admin:query")
	public String list(int page, int number){
		return adminService.list(page, number);
	}
	
	@RequestMapping(value="/query", method=RequestMethod.GET)
	@PermissionRequire("admin:query")
	public String query(@RequestBody Admin admin){
		return adminService.query(admin);
	}
	
	@RequestMapping(value="/disable", method=RequestMethod.POST)
	@PermissionRequire("admin:modify")
	public String disable(String account){
		return adminService.disable(account);
	}
	
	@RequestMapping(value="/enable", method=RequestMethod.POST)
	@PermissionRequire("admin:modify")
	public String enable(String account){
		return adminService.enable(account);
	}
	
	@RequestMapping(value="/readRoles", method=RequestMethod.GET)
	public String readRoles(){
		return adminService.readRoles();
	}
	
}
