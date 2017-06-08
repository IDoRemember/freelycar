package com.geariot.platform.freelycar.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

@Entity
public class Project {
	private int id;
	private String name;
	private float price;
	private int referWorkTime;
	private float pricePerUnit;
	private String comment;
	private List<ProjectAccessoriesInfo> projectAccessoriesInfo;
	private Date createDate;
	public String getComment() {
		return comment;
	}
	public Date getCreateDate() {
		return createDate;
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
	public float getPricePerUnit() {
		return pricePerUnit;
	}
	@OneToMany
	@JoinColumn(name="projectId")
	public List<ProjectAccessoriesInfo> getProjectAccessoriesInfos() {
		return projectAccessoriesInfo;
	}
	public int getReferWorkTime() {
		return referWorkTime;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
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
	public void setPricePerUnit(float pricePerUnit) {
		this.pricePerUnit = pricePerUnit;
	}
	public void setProjectAccessoriesInfos(List<ProjectAccessoriesInfo> projectAccessoriesInfos) {
		this.projectAccessoriesInfo = projectAccessoriesInfos;
	}
	public void setReferWorkTime(int referWorkTime) {
		this.referWorkTime = referWorkTime;
	}
}
