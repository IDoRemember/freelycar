package com.geariot.platform.freelycar.utils.query;

public class MemberPayStat {
	
	private Boolean member;
	private double amount;
	
	public MemberPayStat(Boolean member , double amount){
		this.member = member;
		this.amount = amount;
	}

	public Boolean getMember() {
		return member;
	}

	public void setMember(Boolean member) {
		this.member = member;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}
	
	
}
