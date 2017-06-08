package com.geariot.platform.freelycar.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class CardProjectRemainingInfo {
	private int id;
	private Project project;
	private int remaining;
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public int getId() {
		return id;
	}
	@ManyToOne
	@JoinColumn(name="projectId")
	public Project getProject() {
		return project;
	}
	public int getRemaining() {
		return remaining;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setProject(Project project) {
		this.project = project;
	}
	public void setRemaining(int remaining) {
		this.remaining = remaining;
	}
}
