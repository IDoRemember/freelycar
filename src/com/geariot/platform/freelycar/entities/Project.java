package com.geariot.platform.freelycar.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Project {
	private int id;
	private String name;
	private float price;
	private int referWorkTime;
	private float pricePerUnit;
	private String comment;
	private List<ProjectInventoriesInfo> inventoryInfos;
	private Date createDate;
	private Program program;
	public String getComment() {
		return comment;
	}
	public Date getCreateDate() {
		return createDate;
	}
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int getId() {
		return id;
	}
	@OneToMany
	@JoinColumn(name="projectId", foreignKey=@ForeignKey(name="none"))
	public List<ProjectInventoriesInfo> getInventoryInfos() {
		return inventoryInfos;
	}
	public String getName() {
		return name;
	}
	public float getPrice() {
		return price;
	}
	public float getPricePerUnit() {
		return pricePerUnit;
	}
	@ManyToOne
	@JoinColumn(name="programId", foreignKey=@ForeignKey(name="none"))
	public Program getProgram() {
		return program;
	}
	public int getReferWorkTime() {
		return referWorkTime;
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
	public void setInventoryInfos(List<ProjectInventoriesInfo> inventoryInfos) {
		this.inventoryInfos = inventoryInfos;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public void setPricePerUnit(float pricePerUnit) {
		this.pricePerUnit = pricePerUnit;
	}
	public void setProgram(Program program) {
		this.program = program;
	}
	public void setReferWorkTime(int referWorkTime) {
		this.referWorkTime = referWorkTime;
	}
}
