package com.geariot.platform.freelycar.model;

import java.util.Date;

public class IncomeStat {
	private double amount;
	private Date payDate;
	public double getAmount() {
		return amount;
	}
	public Date getPayDate() {
		return payDate;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public void setPayDate(Date payDate) {
		this.payDate = payDate;
	}
}
