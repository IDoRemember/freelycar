package com.geariot.platform.freelycar.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Accessory {
	private String id;
	private String name;
	private AccessoryType type;
	private AccessoryBrand brand;
	private String standard;
	private String property;
	private float price;
	private String comment;
	private Date createDate;
	@ManyToOne
	@JoinColumn(name="brandId")
	public AccessoryBrand getBrand() {
		return brand;
	}
	public String getComment() {
		return comment;
	}
	public Date getCreateDate() {
		return createDate;
	}
	@Id
	// TODO Id生成器待确定
	public String getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public float getPrice() {
		return price;
	}
	public String getProperty() {
		return property;
	}
	public String getStandard() {
		return standard;
	}
	@ManyToOne
	@JoinColumn(name="typeId")
	public AccessoryType getType() {
		return type;
	}
	public void setBrand(AccessoryBrand brand) {
		this.brand = brand;
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
	public void setName(String name) {
		this.name = name;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public void setProperty(String property) {
		this.property = property;
	}
	public void setStandard(String standard) {
		this.standard = standard;
	}
	public void setType(AccessoryType type) {
		this.type = type;
	}
}
