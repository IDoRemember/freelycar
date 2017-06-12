package com.geariot.platform.freelycar.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Car {
	private int id;
	private Client client;
	private CarType type;
	private String licensePlate;
	private String driveLicenseNumber;
	private Date insuranceStarttime;
	private Date insuranceEndtime;
	private float insuranceAmount;
	private String frameNumber;
	private String engineNumber;
	private Date licenseDate;
	private boolean newCar;
	private int lastMiles;
	private int miles;
	private Date createDate;
	@ManyToOne
	@JoinColumn(name="clientId")
	public Client getClient() {
		return client;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public String getDriveLicenseNumber() {
		return driveLicenseNumber;
	}
	public String getEngineNumber() {
		return engineNumber;
	}
	public String getFrameNumber() {
		return frameNumber;
	}
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public int getId() {
		return id;
	}
	public float getInsuranceAmount() {
		return insuranceAmount;
	}
	public Date getInsuranceEndtime() {
		return insuranceEndtime;
	}
	public Date getInsuranceStarttime() {
		return insuranceStarttime;
	}
	public int getLastMiles() {
		return lastMiles;
	}
	public Date getLicenseDate() {
		return licenseDate;
	}
	public String getLicensePlate() {
		return licensePlate;
	}
	public int getMiles() {
		return miles;
	}
	@ManyToOne
	@JoinColumn(name="carTypeId")
	public CarType getType() {
		return type;
	}
	public boolean isNewCar() {
		return newCar;
	}
	public void setClient(Client client) {
		this.client = client;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public void setDriveLicenseNumber(String driveLicenseNumber) {
		this.driveLicenseNumber = driveLicenseNumber;
	}
	public void setEngineNumber(String engineNumber) {
		this.engineNumber = engineNumber;
	}
	public void setFrameNumber(String frameNumber) {
		this.frameNumber = frameNumber;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setInsuranceAmount(float insuranceAmount) {
		this.insuranceAmount = insuranceAmount;
	}
	public void setInsuranceEndtime(Date insuranceEndtime) {
		this.insuranceEndtime = insuranceEndtime;
	}
	public void setInsuranceStarttime(Date insuranceStarttime) {
		this.insuranceStarttime = insuranceStarttime;
	}
	public void setLastMiles(int lastMiles) {
		this.lastMiles = lastMiles;
	}
	public void setLicenseDate(Date licenseDate) {
		this.licenseDate = licenseDate;
	}
	public void setLicensePlate(String licensePlate) {
		this.licensePlate = licensePlate;
	}
	public void setMiles(int miles) {
		this.miles = miles;
	}
	public void setNewCar(boolean newCar) {
		this.newCar = newCar;
	}
	public void setType(CarType type) {
		this.type = type;
	}
}
