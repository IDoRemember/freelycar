package com.geariot.platform.freelycar.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Entity
public class Role {
	
	private int id;
	private String roleName;
	private String description;
	List<Permission> permissions;
	public String getDescription() {
		return description;
	}
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int getId() {
		return id;
	}
	@ManyToMany(cascade={CascadeType.ALL}, fetch=FetchType.EAGER)
	@JoinColumn(name="roleId", foreignKey=@ForeignKey(name="none"))
	@JoinTable(name="role_permission", 
				joinColumns={@JoinColumn(name="roleId", foreignKey=@ForeignKey(name="none"))}, 
				inverseJoinColumns={@JoinColumn(name="permissionId", foreignKey=@ForeignKey(name="none"))})	
	public List<Permission> getPermissions() {
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
	public void setPermissions(List<Permission> permissions) {
		this.permissions = permissions;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
}
