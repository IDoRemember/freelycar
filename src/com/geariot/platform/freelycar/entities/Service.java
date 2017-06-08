package com.geariot.platform.freelycar.entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

@Entity
public class Service {
	private int id;
	private String name;
	private int type; //0,1=次卡,组合卡
	private float price;
	private int validTime;
	private String comment;
	private List<ServiceProjectInfo> serviceProjectInfo;
	public String getComment() {
		return comment;
	}
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public int getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public float getPrice() {
		return price;
	}
	@OneToMany
	@JoinColumn(name="serviceId")
	public List<ServiceProjectInfo> getServiceProjectInfos() {
		return serviceProjectInfo;
	}
	public int getType() {
		return type;
	}
	public int getValidTime() {
		return validTime;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public void setServiceProjectInfos(List<ServiceProjectInfo> serviceProjectInfos) {
		this.serviceProjectInfo = serviceProjectInfos;
	}
	public void setType(int type) {
		this.type = type;
	}
	public void setValidTime(int validTime) {
		this.validTime = validTime;
	}
}
