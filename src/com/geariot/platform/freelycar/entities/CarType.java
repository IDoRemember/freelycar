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
public class CarType {
	private int id;
	private CarBrand brand;
	private String type;
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="brandId", foreignKey=@ForeignKey(name="none"))
	public CarBrand getBrand() {
		return brand;
	}
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
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
	
	/*@Override
	public String toString() {
		return "CarType: id:" + this.id + ", type:" + this.type;
	}*/
}
