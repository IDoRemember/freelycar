package com.geariot.platform.freelycar.service;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.geariot.platform.freelycar.model.RESCODE;
import com.geariot.platform.freelycar.utils.JsonResFactory;

@Service
public class AdminService {
	public String login(String account, String password, boolean rememberMe) {
		JSONObject obj = null;
		Subject curUser = SecurityUtils.getSubject();
		if (!curUser.isAuthenticated()) {
			UsernamePasswordToken token = new UsernamePasswordToken(account, password);
			token.setRememberMe(rememberMe);
            try {
            	curUser.login(token);
            	obj = JsonResFactory.buildOrgBasic(RESCODE.SUCCESS);
            } catch (UnknownAccountException ue) {
                obj = JsonResFactory.buildOrgBasic(RESCODE.ACCOUNT_ERROR);
            } catch (IncorrectCredentialsException ie) {
            	obj = JsonResFactory.buildOrgBasic(RESCODE.PSW_ERROR);
            } catch (LockedAccountException le) {
            	obj = JsonResFactory.buildOrgBasic(RESCODE.ACCOUNT_LOCKED_ERROR);
            } catch (AuthenticationException ae) {
            	obj = JsonResFactory.buildOrgBasic(RESCODE.PERMISSION_ERROR);
            }
		}
		return obj.toString();
	}
}
