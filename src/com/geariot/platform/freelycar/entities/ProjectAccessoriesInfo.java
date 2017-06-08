package com.geariot.platform.freelycar.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class ProjectAccessoriesInfo {
	private int id;
	private Accessory accessory;
	private float number;
	@ManyToOne
	@JoinColumn(name="accessoryId")
	public Accessory getAccessory() {
		return accessory;
	}
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public int getId() {
		return id;
	}
	public float getNumber() {
		return number;
	}
	public void setAccessory(Accessory accessory) {
		this.accessory = accessory;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setNumber(float number) {
		this.number = number;
	}
}
