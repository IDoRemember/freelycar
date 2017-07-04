package com.geariot.platform.freelycar.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class OtherExpendOrder {
	private String id;
	private OtherExpendType type;
	private float amount;
	private String comment;
	private Date expendDate;
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
	public String getId() {
		return id;
	}
	@ManyToOne(cascade={})
	@JoinColumn(name="otherExpendTypeId", foreignKey=@ForeignKey(name="none"))
	public OtherExpendType getType() {
		return type;
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
	public void setId(String id) {
		this.id = id;
	}
	public void setType(OtherExpendType type) {
		this.type = type;
	}
	public Date getExpendDate() {
		return expendDate;
	}
	public void setExpendDate(Date expendDate) {
		this.expendDate = expendDate;
	}
	@Override
	public String toString() {
		return "OtherExpendOrder [id=" + id + ", type=" + type + ", amount=" + amount + ", comment=" + comment
				+ ", expendDate=" + expendDate + ", createDate=" + createDate + "]";
	}
	
	
}
