package com.geariot.platform.freelycar.entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

@Entity
public class Role {
	
	private int id;
	private String roleName;
	private String description;
	Set<Permission> permissions;
	public String getDescription() {
		return description;
	}
	@Id
	public int getId() {
		return id;
	}
	@OneToMany(cascade={CascadeType.ALL}, fetch=FetchType.EAGER)
	@JoinColumn(name="roleId", foreignKey=@ForeignKey(name="none"))
	public Set<Permission> getPermissions() {
		return permissions;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setPermissions(Set<Permission> permissions) {
		this.permissions = permissions;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
}
