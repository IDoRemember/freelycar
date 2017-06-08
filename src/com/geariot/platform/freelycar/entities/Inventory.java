package com.geariot.platform.freelycar.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class Inventory {
	private String id;
	private Accessory accessory;
	private float price;
	private float amount;
	private Provider provider;
	@OneToOne
	public Accessory getAccessory() {
		return accessory;
	}
	public float getAmount() {
		return amount;
	}
	@Id
	// TODO 生成器策略
	public String getId() {
		return id;
	}
	public float getPrice() {
		return price;
	}
	@ManyToOne
	@JoinColumn(name="providerId")
	public Provider getProvider() {
		return provider;
	}
	public void setAccessory(Accessory accessory) {
		this.accessory = accessory;
	}
	public void setAmount(float amount) {
		this.amount = amount;
	}
	public void setId(String id) {
		this.id = id;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public void setProvider(Provider provider) {
		this.provider = provider;
	}
}
