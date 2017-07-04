package com.geariot.platform.freelycar.entities;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
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
	private Set<CardProjectRemainingInfo> projectInfos;
	private Admin orderMaker;
	public Date getExpirationDate() {
		return expirationDate;
	}
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int getId() {
		return id;
	}
	@ManyToOne(cascade={}, fetch=FetchType.EAGER)
	@JoinColumn(name="makerId", foreignKey=@ForeignKey(name="none"))
	public Admin getOrderMaker() {
		return orderMaker;
	}
	public Date getPayDate() {
		return payDate;
	}
	public int getPayMethod() {
		return payMethod;
	}
	@OneToMany(cascade={CascadeType.ALL}, fetch=FetchType.EAGER)
	@JoinColumn(name="cardId", foreignKey=@ForeignKey(name="none"))
	public Set<CardProjectRemainingInfo> getProjectInfos() {
		return projectInfos;
	}
	@ManyToOne
	@JoinColumn(name="serviceId", foreignKey=@ForeignKey(name="none"))
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
	public void setProjectInfos(Set<CardProjectRemainingInfo> projectInfos) {
		this.projectInfos = projectInfos;
	}
	public void setService(Service service) {
		this.service = service;
	}
}
