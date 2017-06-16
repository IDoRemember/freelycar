package com.geariot.platform.freelycar.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Permission {

	private int id;
	private String permission;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int getId() {
		return id;
	}
	public String getPermission() {
		return permission;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setPermission(String permission) {
		this.permission = permission;
	}

}
