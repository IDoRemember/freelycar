package com.geariot.platform.freelycar.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class ConsumOrders {
	private String id;
	private Client client;
	private Card card;
	private Project project;
	private Program program;
	private String parkingLocation;
	private Date pickTime;
	private List<Staff> staffs;
	private List<ConsumExtraAccessoriesInfo> consumExtraAccessoriesInfo;
	private int state;		//0,1,2,3=接,施,完,交
	private int payState;	//0,1=未结算,已结算
	private Date createDate;
	@ManyToOne
	@JoinColumn(name="cardId")
	public Card getCard() {
		return card;
	}
	@ManyToOne
	@JoinColumn(name="clientId")
	public Client getClient() {
		return client;
	}
	@OneToMany
	@JoinColumn(name="ConsumeOrdersIs")
	public List<ConsumExtraAccessoriesInfo> getConsumExtraAccessoriesInfo() {
		return consumExtraAccessoriesInfo;
	}
	public Date getCreateDate() {
		return createDate;
	}
	@Id
	// TODO 生成器策略
	public String getId() {
		return id;
	}
	public String getParkingLocation() {
		return parkingLocation;
	}
	public int getPayState() {
		return payState;
	}
	public Date getPickTime() {
		return pickTime;
	}
	@ManyToOne
	@JoinColumn(name="programId")
	public Program getProgram() {
		return program;
	}
	@ManyToOne
	@JoinColumn(name="projectId")
	public Project getProject() {
		return project;
	}
	@ManyToMany
	@JoinTable(name="consumOrders_staff", 
				joinColumns={@JoinColumn(name="consumOrdersId")}, 
				inverseJoinColumns={@JoinColumn(name="staffId")})
	public List<Staff> getStaffs() {
		return staffs;
	}
	public int getState() {
		return state;
	}
	public void setCard(Card card) {
		this.card = card;
	}
	public void setClient(Client client) {
		this.client = client;
	}
	public void setConsumExtraAccessoriesInfo(List<ConsumExtraAccessoriesInfo> consumExtraAccessoriesInfo) {
		this.consumExtraAccessoriesInfo = consumExtraAccessoriesInfo;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public void setId(String id) {
		this.id = id;
	}
	public void setParkingLocation(String parkingLocation) {
		this.parkingLocation = parkingLocation;
	}
	public void setPayState(int payState) {
		this.payState = payState;
	}
	public void setPickTime(Date pickTime) {
		this.pickTime = pickTime;
	}
	public void setProgram(Program program) {
		this.program = program;
	}
	public void setProject(Project project) {
		this.project = project;
	}
	public void setStaffs(List<Staff> staffs) {
		this.staffs = staffs;
	}
	public void setState(int state) {
		this.state = state;
	}
}
