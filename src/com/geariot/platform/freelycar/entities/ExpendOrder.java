package com.geariot.platform.freelycar.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ExpendOrder {
	private int id;
	private String type;
	private float amount;
	private Date payDate;
	public float getAmount() {
		return amount;
	}
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public int getId() {
		return id;
	}
	public Date getPayDate() {
		return payDate;
	}
	public String getType() {
		return type;
	}
	public void setAmount(float amount) {
		this.amount = amount;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setPayDate(Date payDate) {
		this.payDate = payDate;
	}
	public void setType(String type) {
		this.type = type;
	}
}
