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
import com.geariot.platform.freelycar.dao.CardDao;
import com.geariot.platform.freelycar.dao.ConsumOrderDao;
import com.geariot.platform.freelycar.dao.InventoryOrderDao;
import com.geariot.platform.freelycar.entities.Admin;
import com.geariot.platform.freelycar.entities.Card;
import com.geariot.platform.freelycar.entities.ConsumOrder;
import com.geariot.platform.freelycar.entities.InventoryOrder;
import com.geariot.platform.freelycar.entities.Role;
import com.geariot.platform.freelycar.model.RESCODE;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.DateJsonValueProcessor;
import com.geariot.platform.freelycar.utils.JsonResFactory;
import com.geariot.platform.freelycar.utils.MD5;
import com.geariot.platform.freelycar.utils.PermissionsList;
import com.geariot.platform.freelycar.utils.query.AdminAndQueryCreator;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;

@Service
@Transactional
public class AdminService {
	
	@Autowired
	private AdminDao adminDao;
	
	@Autowired
	private InventoryOrderDao inventoryOrderDao;
	
	@Autowired
	private CardDao cardDao;
	
	@Autowired
	private ConsumOrderDao consumOrderDao;
	
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
		if(exist != null){
			return JsonResFactory.buildOrg(RESCODE.ACCOUNT_EXIST).toString();
		}
		else {
			admin.setCreateDate(new Date());
			admin.setPassword(MD5.compute(admin.getPassword()));
			adminDao.save(admin);
			Admin added = this.adminDao.findAdminByAccount(admin.getAccount());
			JsonConfig config = JsonResFactory.dateConfig();
			config.registerPropertyExclusions(Admin.class, new String[]{"password", "staff"});
			return JsonResFactory.buildNetWithData(RESCODE.SUCCESS, net.sf.json.JSONObject.fromObject(added, config)).toString();
		}
	}

	public String modify(Admin admin) {
		Admin exist = adminDao.findAdminById(admin.getId());
		if(exist == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
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
				//找到所有与admin相关的数据，将其中的admin字段设为空。
				for(InventoryOrder inventoryOrder : this.inventoryOrderDao.findByMakerAccount(account)){
					System.out.println("inventoryOrder:" + inventoryOrder);
					inventoryOrder.setOrderMaker(null);
				}
				for(Card card : this.cardDao.findByMakerAccount(account)){
					System.out.println("card:" + card);
					card.setOrderMaker(null);
				}
				for(ConsumOrder consumOrder : this.consumOrderDao.findByMakerAccount(account)){
					System.out.println("consumOrder:" + consumOrder);
					consumOrder.setOrderMaker(null);
				}
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
	
	public String query(String account, String name, int page, int number) {
		String andCondition = new AdminAndQueryCreator(account, name).createStatement();
		int from = (page - 1) * number;
		List<Admin> list = adminDao.queryByNameAndAccount(andCondition, from, number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = this.adminDao.getQueryCount(andCondition);
		int size = (int) Math.ceil((int) realSize/(double)number);
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
		JSONArray jsonArray = JSONArray.fromObject(list, config);
		net.sf.json.JSONObject res = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
		res.put(Constants.RESPONSE_SIZE_KEY, size);
		res.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
		return res.toString();
	}

	public String disable(String account) {
		Admin admin = adminDao.findAdminByAccount(account);
		if(admin == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		Subject curUser = SecurityUtils.getSubject();
		if(account.equals(curUser.getPrincipal())){
			return JsonResFactory.buildOrg(RESCODE.DISABLE_CURRENT_USER).toString();
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
