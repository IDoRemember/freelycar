package com.geariot.platform.freelycar.entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Entity
public class ProjectInfo {
	private int id;
	private int projectId;
	private String name;
	private float price;
	private int payMethod;			//0,1=扣卡次，付现金
	private int cardId;
	private String cardName;
	private int payCardTimes;
	private float referWorkTime;
	private float pricePerUnit;
	private Set<Staff> staffs;
	public int getCardId() {
		return cardId;
	}
	public String getCardName() {
		return cardName;
	}
	@Id
	public int getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public int getPayCardTimes() {
		return payCardTimes;
	}
	public int getPayMethod() {
		return payMethod;
	}
	public float getPrice() {
		return price;
	}
	public float getPricePerUnit() {
		return pricePerUnit;
	}
	public int getProjectId() {
		return projectId;
	}
	public float getReferWorkTime() {
		return referWorkTime;
	}
	@ManyToMany(cascade={CascadeType.ALL}, fetch=FetchType.EAGER)
	@JoinTable(name="projectinfo_staff", 
				joinColumns={@JoinColumn(name="projectInfoId", foreignKey=@ForeignKey(name="none"))}, 
				inverseJoinColumns={@JoinColumn(name="staffId", foreignKey=@ForeignKey(name="none"))})
	public Set<Staff> getStaffs() {
		return staffs;
	}
	public void setCardId(int cardId) {
		this.cardId = cardId;
	}
	public void setCardName(String cardName) {
		this.cardName = cardName;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setPayCardTimes(int payCardTimes) {
		this.payCardTimes = payCardTimes;
	}
	public void setPayMethod(int payMethod) {
		this.payMethod = payMethod;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public void setPricePerUnit(float pricePerUnit) {
		this.pricePerUnit = pricePerUnit;
	}
	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}
	public void setReferWorkTime(float referWorkTime) {
		this.referWorkTime = referWorkTime;
	}
	public void setStaffs(Set<Staff> staffs) {
		this.staffs = staffs;
	}
	
}
