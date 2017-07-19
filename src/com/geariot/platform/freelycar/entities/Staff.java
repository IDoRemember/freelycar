package com.geariot.platform.freelycar.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.geariot.platform.freelycar.utils.JsonDateDeserialize;

@Entity
public class Staff {
	private int id;
	private String name;
	private String gender;
	private String phone;
	private String position;
	private String level;
	private String comment;
	@JsonDeserialize(using=JsonDateDeserialize.class)
	private Date createDate;
	public String getComment() {
		return comment;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public String getGender() {
		return gender;
	}
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int getId() {
		return id;
	}
	public String getLevel() {
		return level;
	}
	public String getName() {
		return name;
	}
	public String getPhone() {
		return phone;
	}
	public String getPosition() {
		return position;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public void setPosition(String position) {
		this.position = position;
	}
}
