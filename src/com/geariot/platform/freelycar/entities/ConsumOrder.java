package com.geariot.platform.freelycar.entities;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class ConsumOrder {
	private String id;
	private int carId;
	private String licensePlate;
	private String carType;
	private String carBrand;
	private int clientId;
	private String clientName;
	private String gender;
	private String phone;
	private Set<ProjectInfo> projects;
	private int programId;
	private int payMethod;
	private String programName;
	private String parkingLocation;
	private Set<ConsumExtraInventoriesInfo> inventoryInfos;
	private int state;		//0,1,2=接,完,交
	private float totalPrice;
	private int payState;	//0,1=未结算,已结算
	private Date pickTime;
	private Date finishTime;
	private Date deliverTime;
	private Date createDate;
	private int lastMiles;
	private int miles;
	private Admin orderMaker;
	private String comment;
	private String faultDesc;
	private String repairAdvice;
	public String getCarBrand() {
		return carBrand;
	}
	public int getCarId() {
		return carId;
	}
	public String getCarType() {
		return carType;
	}
	public int getClientId() {
		return clientId;
	}
	public String getClientName() {
		return clientName;
	}
	public String getComment() {
		return comment;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public Date getDeliverTime() {
		return deliverTime;
	}
	public String getFaultDesc() {
		return faultDesc;
	}
	public Date getFinishTime() {
		return finishTime;
	}
	public String getGender() {
		return gender;
	}
	@Id
	public String getId() {
		return id;
	}
	@OneToMany(cascade={CascadeType.ALL}, fetch=FetchType.EAGER)
	@JoinColumn(name="consumeOrdersId", foreignKey=@ForeignKey(name="none"))
	public Set<ConsumExtraInventoriesInfo> getInventoryInfos() {
		return inventoryInfos;
	}
	public int getLastMiles() {
		return lastMiles;
	}
	public String getLicensePlate() {
		return licensePlate;
	}
	public int getMiles() {
		return miles;
	}
	@ManyToOne(cascade={}, fetch=FetchType.EAGER)
	@JoinColumn(name="adminId", foreignKey=@ForeignKey(name="none"))
	public Admin getOrderMaker() {
		return orderMaker;
	}
	public String getParkingLocation() {
		return parkingLocation;
	}
	public int getPayMethod() {
		return payMethod;
	}
	public int getPayState() {
		return payState;
	}
	public String getPhone() {
		return phone;
	}
	public Date getPickTime() {
		return pickTime;
	}
	public int getProgramId() {
		return programId;
	}
	public String getProgramName() {
		return programName;
	}
	@OneToMany(cascade={CascadeType.ALL}, fetch=FetchType.EAGER)
	@JoinColumn(name="consumOrderId", foreignKey=@ForeignKey(name="none"))
	public Set<ProjectInfo> getProjects() {
		return projects;
	}
	public String getRepairAdvice() {
		return repairAdvice;
	}
	public int getState() {
		return state;
	}
	public float getTotalPrice() {
		return totalPrice;
	}
	public void setCarBrand(String carBrand) {
		this.carBrand = carBrand;
	}
	public void setCarId(int carId) {
		this.carId = carId;
	}
	public void setCarType(String carType) {
		this.carType = carType;
	}
	public void setClientId(int clientId) {
		this.clientId = clientId;
	}
	public void setClientName(String clientName) {
		this.clientName = clientName;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public void setDeliverTime(Date deliverTime) {
		this.deliverTime = deliverTime;
	}
	public void setFaultDesc(String faultDesc) {
		this.faultDesc = faultDesc;
	}
	public void setFinishTime(Date finishTime) {
		this.finishTime = finishTime;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public void setId(String id) {
		this.id = id;
	}
	public void setInventoryInfos(Set<ConsumExtraInventoriesInfo> inventoryInfos) {
		this.inventoryInfos = inventoryInfos;
	}
	public void setLastMiles(int lastMiles) {
		this.lastMiles = lastMiles;
	}
	public void setLicensePlate(String licensePlate) {
		this.licensePlate = licensePlate;
	}
	public void setMiles(int miles) {
		this.miles = miles;
	}
	public void setOrderMaker(Admin orderMaker) {
		this.orderMaker = orderMaker;
	}
	public void setParkingLocation(String parkingLocation) {
		this.parkingLocation = parkingLocation;
	}
	public void setPayMethod(int payMethod) {
		this.payMethod = payMethod;
	}
	public void setPayState(int payState) {
		this.payState = payState;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public void setPickTime(Date pickTime) {
		this.pickTime = pickTime;
	}
	public void setProgramId(int programId) {
		this.programId = programId;
	}
	public void setProgramName(String programName) {
		this.programName = programName;
	}
	public void setProjects(Set<ProjectInfo> projects) {
		this.projects = projects;
	}
	public void setRepairAdvice(String repairAdvice) {
		this.repairAdvice = repairAdvice;
	}
	public void setState(int state) {
		this.state = state;
	}
	public void setTotalPrice(float totalPrice) {
		this.totalPrice = totalPrice;
	}
}
