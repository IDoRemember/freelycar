package com.geariot.platform.freelycar.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class IncomeOrder {
	private int id;
	private int clientId;
	private String licensePlate;
	private float amount;
	private Date payDate;
	private int payMethod;  //// 0,1,2,3,4  现金,刷卡,支付宝,微信,易付宝   
	private String programName;
//	private String staffNames;
	private boolean member; 
	
	public float getAmount() {
		return amount;
	}
	public int getClientId() {
		return clientId;
	}
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int getId() {
		return id;
	}
	public String getLicensePlate() {
		return licensePlate;
	}
	public Date getPayDate() {
		return payDate;
	}
	public int getPayMethod() {
		return payMethod;
	}
	public String getProgramName() {
		return programName;
	}
//	public String getStaffNames() {
//		return staffNames;
//	}
	public void setAmount(float amount) {
		this.amount = amount;
	}
	public void setClientId(int clientId) {
		this.clientId = clientId;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setLicensePlate(String licensePlate) {
		this.licensePlate = licensePlate;
	}
	public void setPayDate(Date payDate) {
		this.payDate = payDate;
	}
	public void setPayMethod(int payMethod) {
		this.payMethod = payMethod;
	}
	public void setProgramName(String programName) {
		this.programName = programName;
	}
//	public void setStaffNames(String staffNames) {
//		this.staffNames = staffNames;
//	}
	public boolean isMember() {
		return member;
	}
	public void setMember(boolean member) {
		this.member = member;
	}
}
