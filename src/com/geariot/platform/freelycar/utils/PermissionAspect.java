package com.geariot.platform.freelycar.utils;

import java.lang.reflect.Array;
import java.lang.reflect.Method;
import java.util.Arrays;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import com.geariot.platform.freelycar.model.RESCODE;

@Aspect
@Component
public class PermissionAspect {
	@Pointcut("execution(String *..controller*..*(..))")
	public void controllerAspect() {
	}

	@Around("controllerAspect()")
	public String permissioCheck(ProceedingJoinPoint pjp){
		String temp = pjp.getStaticPart().toShortString();
		String longTemp = pjp.getStaticPart().toLongString();
		String classMethod = temp.substring(10, temp.length() - 1);
		String methodName = classMethod.substring(classMethod.indexOf(".") + 1, classMethod.indexOf("("));
		String[] sArgs = (longTemp.substring(longTemp.lastIndexOf("(") + 1, longTemp.length() - 2)).split(",");
		Class<?>[] args = new Class<?>[sArgs.length];
		System.out.println(longTemp);
		try{
			for (int i = 0; i < args.length; i++) {
				if (sArgs[i].endsWith("String[]")) {
					args[i] = Array.newInstance(Class.forName("java.lang.String"),1).getClass();
				} else if (sArgs[i].endsWith("Long[]")) {
					args[i] = Array.newInstance(Class.forName("java.lang.Long"), 1).getClass();
				} else if (sArgs[i].indexOf(".") == -1) {
					if (sArgs[i].equals("int")) {
						args[i] = int.class;
					} else if (sArgs[i].equals("char")) {
						args[i] = char.class;
					} else if (sArgs[i].equals("float")) {
						args[i] = float.class;
					} else if (sArgs[i].equals("long")) {
						args[i] = long.class;
					}
				} else {
					args[i] = Class.forName(sArgs[i]);
				}
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		Method method = null;
		try {
			method = pjp.getTarget().getClass().getMethod(methodName, args);
		} catch (NoSuchMethodException | SecurityException e) {
			e.printStackTrace();
		}
		if(method != null && method.isAnnotationPresent(PermissionRequire.class)){
			PermissionRequire anno = method.getAnnotation(PermissionRequire.class);
			String permission = anno.value();
			if(permission != null && !permission.isEmpty()){
				Subject curUser = SecurityUtils.getSubject();
				if(!curUser.isPermitted(permission)){
					return JsonResFactory.buildOrgBasic(RESCODE.PERMISSION_ERROR).toString();
				}
			}
		}
		Object res = null;
		try {
			res = pjp.proceed();
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return (String) res;
	}
	
}
