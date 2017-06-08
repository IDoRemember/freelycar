package com.geariot.platform.freelycar.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

@Entity
public class Provider {
	private int id;
	private String name;
	private List<ProviderContact> providerContact;
	private String comment;
	private Date createDate;
	public String getComment() {
		return comment;
	}
	public Date getCreateDate() {
		return createDate;
	}
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public int getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	@OneToMany
	@JoinColumn(name="providerId")
	public List<ProviderContact> getProviderContact() {
		return providerContact;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setProviderContact(List<ProviderContact> providerContact) {
		this.providerContact = providerContact;
	}
}
