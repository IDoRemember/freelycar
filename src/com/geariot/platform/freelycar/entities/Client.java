package com.geariot.platform.freelycar.entities;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table
public class Client {
	private int id;
	private String name;
	private int age;
	private String idNumber;
	private String gender;
	private String phone;
	private Date birthday;
	private String dirveLicense;
	private int state;
	private int points;
	private String recommendName;
	private Date createDate;
	private Set<Car> cars;
	private Set<Card> cards;
	public int getAge() {
		return age;
	}
	public Date getBirthday() {
		return birthday;
	}
	@OneToMany(cascade={CascadeType.ALL}, fetch=FetchType.LAZY)
	@JoinColumn(name="cliendId", foreignKey=@ForeignKey(name="none"))
	public Set<Car> getCars() {
		return cars;
	}
	@OneToMany(cascade={CascadeType.ALL}, fetch=FetchType.LAZY)
	@JoinColumn(name="clientId", foreignKey=@ForeignKey(name="none"))
	public Set<Card> getCards() {
		return cards;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public String getDirveLicense() {
		return dirveLicense;
	}
	public String getGender() {
		return gender;
	}
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int getId() {
		return id;
	}
	public String getIdNumber() {
		return idNumber;
	}
	public String getName() {
		return name;
	}
	public String getPhone() {
		return phone;
	}
	public int getPoints() {
		return points;
	}
	public String getRecommendName() {
		return recommendName;
	}
	public int getState() {
		return state;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}
	public void setCars(Set<Car> cars) {
		this.cars = cars;
	}
	public void setCards(Set<Card> cards) {
		this.cards = cards;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public void setDirveLicense(String dirveLicense) {
		this.dirveLicense = dirveLicense;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setIdNumber(String idNumber) {
		this.idNumber = idNumber;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public void setPoints(int points) {
		this.points = points;
	}
	public void setRecommendName(String recommendName) {
		this.recommendName = recommendName;
	}
	public void setState(int state) {
		this.state = state;
	}
	@Override
	public String toString() {
		return "Client [id=" + id + ", name=" + name + ", age=" + age + ", idNumber=" + idNumber + ", gender=" + gender
				+ ", phone=" + phone + ", birthday=" + birthday + ", dirveLicense=" + dirveLicense + ", state=" + state
				+ ", points=" + points + ", recommendName=" + recommendName + ", createDate=" + createDate + ", cars="
				+ cars + ", cards=" + cards + "]";
	}
	
	
}
