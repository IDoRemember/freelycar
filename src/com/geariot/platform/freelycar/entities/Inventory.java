package com.geariot.platform.freelycar.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Inventory {
	private String id;
	private String name;
	private InventoryType type;
	private InventoryBrand brand;
	private String standard;
	private String property;
	private float price;
	private float amount;
	private Provider provider;
	private String comment;
	private Date createDate;
	public float getAmount() {
		return amount;
	}
	@ManyToOne(cascade={}, fetch=FetchType.EAGER)
	@JoinColumn(name="brandId", foreignKey=@ForeignKey(name="none"))
	public InventoryBrand getBrand() {
		return brand;
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
	public String getName() {
		return name;
	}
	public float getPrice() {
		return price;
	}
	public String getProperty() {
		return property;
	}
	@ManyToOne(cascade={}, fetch=FetchType.LAZY)
	@JoinColumn(name="providerId", foreignKey=@ForeignKey(name="none"))
	public Provider getProvider() {
		return provider;
	}
	public String getStandard() {
		return standard;
	}
	@ManyToOne(cascade={}, fetch=FetchType.EAGER)
	@JoinColumn(name="typeId", foreignKey=@ForeignKey(name="none"))
	public InventoryType getType() {
		return type;
	}
	public void setAmount(float amount) {
		this.amount = amount;
	}
	public void setBrand(InventoryBrand brand) {
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
	public void setProvider(Provider provider) {
		this.provider = provider;
	}
	public void setStandard(String standard) {
		this.standard = standard;
	}
	public void setType(InventoryType type) {
		this.type = type;
	}
	
}
