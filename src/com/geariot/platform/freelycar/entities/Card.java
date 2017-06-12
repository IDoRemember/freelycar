package com.geariot.platform.freelycar.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Card {
	private int id;
	private Service service;
	private Date payDate;
	private Date expirationDate;
	private int payMethod;
	private List<CardProjectRemainingInfo> projectInfos;
	private Admin orderMaker;
	public Date getExpirationDate() {
		return expirationDate;
	}
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public int getId() {
		return id;
	}
	@ManyToOne
	@JoinColumn(name="makerId")
	public Admin getOrderMaker() {
		return orderMaker;
	}
	public Date getPayDate() {
		return payDate;
	}
	public int getPayMethod() {
		return payMethod;
	}
	@OneToMany
	@JoinColumn(name="cardId")
	public List<CardProjectRemainingInfo> getRemainingInfos() {
		return projectInfos;
	}
	@ManyToOne
	@JoinColumn(name="serviceId")
	public Service getService() {
		return service;
	}
	public void setExpirationDate(Date expirationDate) {
		this.expirationDate = expirationDate;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setOrderMaker(Admin orderMaker) {
		this.orderMaker = orderMaker;
	}
	public void setPayDate(Date payDate) {
		this.payDate = payDate;
	}
	public void setPayMethod(int payMethod) {
		this.payMethod = payMethod;
	}
	public void setRemainingInfos(List<CardProjectRemainingInfo> remainingInfos) {
		this.projectInfos = remainingInfos;
	}
	public void setService(Service service) {
		this.service = service;
	}
}
