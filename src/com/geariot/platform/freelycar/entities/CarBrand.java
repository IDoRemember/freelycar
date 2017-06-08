package com.geariot.platform.freelycar.entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class CarBrand {
	private int id;
	private String name;
	private List<CarType> carType;
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public int getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	@OneToMany(mappedBy="brand")
	public List<CarType> getTypes() {
		return carType;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setTypes(List<CarType> types) {
		this.carType = types;
	}
}
