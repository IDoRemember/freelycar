package com.geariot.platform.freelycar.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.geariot.platform.freelycar.entities.Permission;
import com.geariot.platform.freelycar.entities.Role;


public class PermissionsList {
	private static final Logger log = LogManager.getLogger();
	
	private static final String FILENAME = "permissions.txt";
	
	private static final String PERMISSION_START = "[Permissions]";
	private static final String ROLE_START = "[Roles]";
	
	private static BufferedReader getReader() throws FileNotFoundException{
		File file = new File(PermissionsList.class.getClassLoader().getResource(FILENAME).getPath());
		BufferedReader br = null;
		if(file.isFile() && file.exists()){
        	br = new BufferedReader(new FileReader(file));
        }
		return br;
	}
	
	public static List<Permission> getPermissions(){
		List<Permission> permissions = new ArrayList<>();
        try {
			BufferedReader br = getReader();
			String line = null;
			while((line = br.readLine()) != null){
				if(line.trim().equals(PERMISSION_START)){
					while((line = br.readLine()) != null){
						Permission temp = new Permission();
						temp.setPermission(line);
						permissions.add(temp);
					}
				}
			}
		} catch (FileNotFoundException e) {
			log.debug("文件没找到");
			e.printStackTrace();
		} catch (IOException e) {
			log.debug("文件读取出错");
			e.printStackTrace();
		}
		return permissions;
	}
	
	public static List<Role> getRoles(){
		List<Role> roles = new ArrayList<>();
		try {
			BufferedReader br = getReader();
			String line = null;
			while((line = br.readLine()) != null){
				if(line.trim().equals(ROLE_START)){
					while((line = br.readLine()) != null){
						String[] role_per = line.split("=");
						String[] role = role_per[0].split(",");
						Role temp = new Role();
						temp.setRoleName(role[0]);
						temp.setDescription(role[1]);
						List<Permission> tempPer = new ArrayList<>();
						for(String per : role_per[1].split(",")){
							Permission perTemp = new Permission();
							perTemp.setPermission(per);
							tempPer.add(perTemp);
						}
						temp.setPermissions(tempPer);
						roles.add(temp);
					}
				}
			}
		} catch (FileNotFoundException e) {
			log.debug("文件没找到");
			e.printStackTrace();
		} catch (IOException e) {
			log.debug("文件读取出错");
			e.printStackTrace();
		}
		return roles;
	}
	
}
