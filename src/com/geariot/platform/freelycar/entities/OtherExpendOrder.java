package com.geariot.platform.freelycar.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class OtherExpendOrder {
	private int id;
	private int otherExpandTypeId;
	private float amount;
	private String comment;
	private Date createDate;
	public float getAmount() {
		return amount;
	}
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
	public int getOtherExpandTypeId() {
		return otherExpandTypeId;
	}
	public void setAmount(float amount) {
		this.amount = amount;
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
	public void setOtherExpandTypeId(int otherExpandTypeId) {
		this.otherExpandTypeId = otherExpandTypeId;
	}
}
