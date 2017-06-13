package com.geariot.platform.freelycar.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class ConsumOrders {
	private String id;
	private Client client;
	private Car car;
	private Project project;
	private int projectPayMethod;	//项目费支付方式：0,1=付现金,扣卡次
	private Program program;
	private String parkingLocation;
	private Date pickTime;
	private List<Staff> staffs;
	private List<ConsumExtraInventoriesInfo> inventoryInfos;
	private int state;		//0,1,2=接,完,交
	private float workingHour;
	private float workingPricePerHousr;
	private float totalPrice;
	private int payState;	//0,1=未结算,已结算
	private Date createDate;
	@ManyToOne
	@JoinColumn(name="carId", foreignKey=@ForeignKey(name="none"))
	public Car getCar() {
		return car;
	}
	@ManyToOne
	@JoinColumn(name="clientId", foreignKey=@ForeignKey(name="none"))
	public Client getClient() {
		return client;
	}
	@OneToMany
	@JoinColumn(name="consumeOrdersId", foreignKey=@ForeignKey(name="none"))
	public List<ConsumExtraInventoriesInfo> getConsumExtraAccessoriesInfo() {
		return inventoryInfos;
	}
	public Date getCreateDate() {
		return createDate;
	}
	@Id
	@GenericGenerator(name="IdGen", strategy="com.geariot.platform.freelycar.utils.IDGenerator")
	@GeneratedValue(generator="IdGen")
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
	@JoinColumn(name="programId", foreignKey=@ForeignKey(name="none"))
	public Program getProgram() {
		return program;
	}
	@ManyToOne
	@JoinColumn(name="projectId", foreignKey=@ForeignKey(name="none"))
	public Project getProject() {
		return project;
	}
	public int getProjectPayMethod() {
		return projectPayMethod;
	}
	@ManyToMany
	@JoinTable(name="consumOrders_staff", 
				joinColumns={@JoinColumn(name="consumOrdersId", foreignKey=@ForeignKey(name="none"))}, 
				inverseJoinColumns={@JoinColumn(name="staffId", foreignKey=@ForeignKey(name="none"))})
	public List<Staff> getStaffs() {
		return staffs;
	}
	public int getState() {
		return state;
	}
	public float getTotalPrice() {
		return totalPrice;
	}
	public float getWorkingHour() {
		return workingHour;
	}
	public float getWorkingPricePerHousr() {
		return workingPricePerHousr;
	}
	public void setCar(Car car) {
		this.car = car;
	}
	public void setClient(Client client) {
		this.client = client;
	}
	public void setConsumExtraAccessoriesInfo(List<ConsumExtraInventoriesInfo> consumExtraAccessoriesInfo) {
		this.inventoryInfos = consumExtraAccessoriesInfo;
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
	public void setProjectPayMethod(int projectPayMethod) {
		this.projectPayMethod = projectPayMethod;
	}
	public void setStaffs(List<Staff> staffs) {
		this.staffs = staffs;
	}
	public void setState(int state) {
		this.state = state;
	}
	public void setTotalPrice(float totalPrice) {
		this.totalPrice = totalPrice;
	}
	public void setWorkingHour(float workingHour) {
		this.workingHour = workingHour;
	}
	public void setWorkingPricePerHousr(float workingPricePerHousr) {
		this.workingPricePerHousr = workingPricePerHousr;
	}
}
