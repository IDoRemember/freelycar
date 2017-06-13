package com.geariot.platform.freelycar.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class InvenroryOrder {
	private String id;
	private List<InventoryOrderInfo> inventoryInfos;
	private int type;	//0,1,2=入库,维修出库,美容出库
	private float totalAmount;
	private float totalPrice;
	private Admin orderMaker;
	private int state;	//0,1=已完成,已作废等
	private Date createDate;
	public Date getCreateDate() {
		return createDate;
	}
	@Id
	@GenericGenerator(name="IdGen", strategy="com.geariot.platform.freelycar.utils.IDGenerator")
	@GeneratedValue(generator="IdGen")
	public String getId() {
		return id;
	}
	@OneToMany
	@JoinColumn(name="inventoryOrderId", foreignKey=@ForeignKey(name="none"))
	public List<InventoryOrderInfo> getInventoryOrderInfo() {
		return inventoryInfos;
	}
	@ManyToOne
	@JoinColumn(name="makerId", foreignKey=@ForeignKey(name="none"))
	public Admin getOrderMaker() {
		return orderMaker;
	}
	public int getState() {
		return state;
	}
	public float getTotalAmount() {
		return totalAmount;
	}
	public float getTotalPrice() {
		return totalPrice;
	}
	public int getType() {
		return type;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public void setId(String id) {
		this.id = id;
	}
	public void setInventoryOrderInfo(List<InventoryOrderInfo> inventoryOrderInfo) {
		this.inventoryInfos = inventoryOrderInfo;
	}
	public void setOrderMaker(Admin orderMaker) {
		this.orderMaker = orderMaker;
	}
	public void setState(int state) {
		this.state = state;
	}
	public void setTotalAmount(float totalAmount) {
		this.totalAmount = totalAmount;
	}
	public void setTotalPrice(float totalPrice) {
		this.totalPrice = totalPrice;
	}
	public void setType(int type) {
		this.type = type;
	}
}
