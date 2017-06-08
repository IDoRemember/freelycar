package com.geariot.platform.freelycar.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class CarType {
	private int id;
	private CarBrand brand;
	private String type;
	@ManyToOne
	@JoinColumn(name="brandId")
	public CarBrand getBrand() {
		return brand;
	}
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public int getId() {
		return id;
	}
	public String getType() {
		return type;
	}
	public void setBrand(CarBrand brand) {
		this.brand = brand;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setType(String type) {
		this.type = type;
	}
}
