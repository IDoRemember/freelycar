package com.geariot.platform.freelycar.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ProviderContact {
	private int id;
	private String name;
	private String phone;
	private String landline;
	private String email;
	private String address;
	private Date createDate;
	public String getAddress() {
		return address;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public String getEmail() {
		return email;
	}
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public int getId() {
		return id;
	}
	public String getLandline() {
		return landline;
	}
	public String getName() {
		return name;
	}
	public String getPhone() {
		return phone;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setLandline(String landline) {
		this.landline = landline;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
}
