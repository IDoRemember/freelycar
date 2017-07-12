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
	private String projectName;
	private float projectPrice;
	private int payMethod;			//0,1=扣卡次，付现金
	private int cardId;
	private String cardName;
	private int payCardTimes;
	private float workingHour;
	private float workingPricePerHour;
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
	public int getPayCardTimes() {
		return payCardTimes;
	}
	public int getPayMethod() {
		return payMethod;
	}
	public int getProjectId() {
		return projectId;
	}
	public String getProjectName() {
		return projectName;
	}
	public float getProjectPrice() {
		return projectPrice;
	}
	@ManyToMany(cascade={CascadeType.ALL}, fetch=FetchType.EAGER)
	@JoinTable(name="projectinfo_staff", 
				joinColumns={@JoinColumn(name="projectInfoId", foreignKey=@ForeignKey(name="none"))}, 
				inverseJoinColumns={@JoinColumn(name="staffId", foreignKey=@ForeignKey(name="none"))})
	public Set<Staff> getStaffs() {
		return staffs;
	}
	public float getWorkingHour() {
		return workingHour;
	}
	public float getWorkingPricePerHour() {
		return workingPricePerHour;
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
	public void setPayCardTimes(int payCardTimes) {
		this.payCardTimes = payCardTimes;
	}
	public void setPayMethod(int payMethod) {
		this.payMethod = payMethod;
	}
	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public void setProjectPrice(float projectPrice) {
		this.projectPrice = projectPrice;
	}
	public void setStaffs(Set<Staff> staffs) {
		this.staffs = staffs;
	}
	public void setWorkingHour(float workingHour) {
		this.workingHour = workingHour;
	}
	public void setWorkingPricePerHour(float workingPricePerHour) {
		this.workingPricePerHour = workingPricePerHour;
	}
	
}
