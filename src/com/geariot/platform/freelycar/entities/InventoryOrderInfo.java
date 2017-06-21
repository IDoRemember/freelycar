package com.geariot.platform.freelycar.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class InventoryOrderInfo {
	private int id;
	private Inventory inventory;
	private float amount;
	private float price;
	public float getAmount() {
		return amount;
	}
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int getId() {
		return id;
	}
	@ManyToOne(cascade={}, fetch=FetchType.EAGER)
	@JoinColumn(name="inventoryId", foreignKey=@ForeignKey(name="none"))
	public Inventory getInventory() {
		return inventory;
	}
	public float getPrice() {
		return price;
	}
	public void setAmount(float amount) {
		this.amount = amount;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setInventory(Inventory inventory) {
		this.inventory = inventory;
	}
	public void setPrice(float price) {
		this.price = price;
	}
}
