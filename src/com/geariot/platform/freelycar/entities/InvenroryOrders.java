package com.geariot.platform.freelycar.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class InvenroryOrders {
	private String id;
	private Inventory inventory;
	private int type;	//0,1,2=入库,维修出库,美容出库
	private float amount;
	private float price;
	private Admin orderMaker;
	private int state;	//0,1=已完成,已作废等
	private Date createDate;
	public float getAmount() {
		return amount;
	}
	public Date getCreateDate() {
		return createDate;
	}
	@Id
	// TODO 生成器策略
	public String getId() {
		return id;
	}
	@ManyToOne
	@JoinColumn(name="inventoryId")
	public Inventory getInventory() {
		return inventory;
	}
	@ManyToOne
	@JoinColumn(name="makerId")
	public Admin getOrderMaker() {
		return orderMaker;
	}
	public float getPrice() {
		return price;
	}
	public int getState() {
		return state;
	}
	public int getType() {
		return type;
	}
	public void setAmount(float amount) {
		this.amount = amount;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public void setId(String id) {
		this.id = id;
	}
	public void setInventory(Inventory inventory) {
		this.inventory = inventory;
	}
	public void setOrderMaker(Admin orderMaker) {
		this.orderMaker = orderMaker;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public void setState(int state) {
		this.state = state;
	}
	public void setType(int type) {
		this.type = type;
	}
}
