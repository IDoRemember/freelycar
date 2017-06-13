package com.geariot.platform.freelycar.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class Admin {
	private int id;
	private String account;
	private String password;
	private String name;
	private Staff staff;
	private Role role;
	private boolean current;
	private Date createDate;
	private String comment;
	public String getAccount() {
		return account;
	}
	public String getComment() {
		return comment;
	}
	public Date getCreateDate() {
		return createDate;
	}
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public String getPassword() {
		return password;
	}
	@ManyToOne
	@JoinColumn(name="roleId", foreignKey=@ForeignKey(name="none"))
	public Role getRole() {
		return role;
	}
	@OneToOne
	@JoinColumn(name="staffId", foreignKey=@ForeignKey(name="none"))
	public Staff getStaff() {
		return staff;
	}
	public boolean isCurrent() {
		return current;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public void setCurrent(boolean current) {
		this.current = current;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	public void setStaff(Staff staff) {
		this.staff = staff;
	}
}
