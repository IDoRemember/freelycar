package com.geariot.platform.freelycar.entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

@Entity
public class CarBrand {
	private int id;
	private String name;
	private Set<CarType> types;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	@OneToMany(cascade={CascadeType.ALL})
	@JoinColumn(name="brandId", foreignKey=@ForeignKey(name="none"))
	public Set<CarType> getTypes() {
		return types;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setTypes(Set<CarType> types) {
		this.types = types;
	}
	
	@Override
	public String toString() {
		return "CarBrand [id=" + id + ", name=" + name + ", carType=" + types + "]";
	}
}
