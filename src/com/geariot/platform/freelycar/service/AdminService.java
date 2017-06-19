package com.geariot.platform.freelycar.service;


import java.util.Date;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.geariot.platform.freelycar.dao.AdminDao;
import com.geariot.platform.freelycar.entities.Admin;
import com.geariot.platform.freelycar.entities.Role;
import com.geariot.platform.freelycar.model.RESCODE;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.DateJsonValueProcessor;
import com.geariot.platform.freelycar.utils.JsonResFactory;
import com.geariot.platform.freelycar.utils.MD5;
import com.geariot.platform.freelycar.utils.PermissionsList;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;

@Service
@Transactional
public class AdminService {
	
	@Autowired
	private AdminDao adminDao;
	
	public Admin findAdminByAccount(String account) {
		return adminDao.findAdminByAccount(account);
	}
	
	public String login(String account, String password, boolean rememberMe) {
		JSONObject obj = null;
		Subject curUser = SecurityUtils.getSubject();
		if (!curUser.isAuthenticated()) {
			UsernamePasswordToken token = new UsernamePasswordToken(account, password);
			token.setRememberMe(rememberMe);
            try {
            	curUser.login(token);
            	obj = JsonResFactory.buildOrg(RESCODE.SUCCESS);
            } catch (UnknownAccountException ue) {
            	/*ue.printStackTrace();
            	System.out.println(ue.getMessage());*/
                obj = JsonResFactory.buildOrg(RESCODE.ACCOUNT_ERROR);
            } catch (IncorrectCredentialsException ie) {
            	/*ie.printStackTrace();
            	System.out.println(ie.getMessage());*/
            	obj = JsonResFactory.buildOrg(RESCODE.PSW_ERROR);
            } catch (LockedAccountException le) {
            	/*le.printStackTrace();
            	System.out.println(le.getMessage());*/
            	obj = JsonResFactory.buildOrg(RESCODE.ACCOUNT_LOCKED_ERROR);
            } catch (AuthenticationException ae) {
            	/*ae.printStackTrace();
            	System.out.println(ae.getMessage());*/
            	obj = JsonResFactory.buildOrg(RESCODE.PERMISSION_ERROR);
            }
		}
		else {
			obj = JsonResFactory.buildOrg(RESCODE.ALREADY_LOGIN);
		}
		curUser = SecurityUtils.getSubject();
		return obj.toString();
	}
	
	public String logout() {
		Subject curUser = SecurityUtils.getSubject();
		if(curUser.isAuthenticated()){
			curUser.logout();
		}
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String addAdmin(Admin admin) {
		Admin exist = adminDao.findAdminByAccount(admin.getAccount());
		JSONObject obj = null;
		if(exist != null){
			obj = JsonResFactory.buildOrg(RESCODE.ACCOUNT_EXIST);
		}
		else {
			admin.setCreateDate(new Date());
			admin.setPassword(MD5.compute(admin.getPassword()));
			adminDao.save(admin);
			obj = JsonResFactory.buildOrg(RESCODE.SUCCESS);
		}
		return obj.toString();
	}

	public String modify(Admin admin) {
		Admin exist = adminDao.findAdminById(admin.getId());
		if(exist == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		if(adminDao.findAdminByAccount(admin.getAccount()) != null){
			return JsonResFactory.buildOrg(RESCODE.ACCOUNT_EXIST).toString();
		}
		exist.setComment(admin.getComment());
		exist.setName(admin.getName());
		exist.setRole(admin.getRole());
		exist.setStaff(admin.getStaff());
		exist.setPassword(MD5.compute(admin.getPassword()));
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String delete(String[] accounts) {
		String curUser = (String) SecurityUtils.getSubject().getPrincipal();
		boolean delSelf = false;
		for(String account : accounts){
			if(StringUtils.equalsIgnoreCase(curUser, account)){
				delSelf = true;
			}
			else{
				adminDao.delete(account);
			}
		}
		if(delSelf){
			return JsonResFactory.buildOrg(RESCODE.CANNOT_DELETE_SELF).toString();
		}
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String list(int page, int number) {
		int from = (page - 1) * number;
		List<Admin> list = adminDao.listAdmins(from, number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = adminDao.getCount();
		int size=(int) Math.ceil(realSize/(double)number);
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
		JSONArray jsonArray = JSONArray.fromObject(list, config);
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
		obj.put(Constants.RESPONSE_SIZE_KEY, size);
		return obj.toString();
	}
	
	public String query(Admin admin) {
		List<Admin> list = adminDao.queryByNameAndId(admin.getId(), admin.getName());
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
		JSONArray jsonArray = JSONArray.fromObject(list, config);
		return JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray).toString();
	}

	public String disable(String account) {
		Admin admin = adminDao.findAdminByAccount(account);
		if(admin == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		admin.setCurrent(false);
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String enable(String account) {
		Admin admin = adminDao.findAdminByAccount(account);
		if(admin == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		admin.setCurrent(true);
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String readRoles() {
		Set<Role> roles = PermissionsList.getRoles();
		for(Role role : roles){
			adminDao.save(role);
		}
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

}
