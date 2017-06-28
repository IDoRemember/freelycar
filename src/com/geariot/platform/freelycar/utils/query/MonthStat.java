package com.geariot.platform.freelycar.utils.query;

public class MonthStat {
	
	public MonthStat(double income, double expend, String payDate) {
		this.income = income;
		this.expend = expend;
		this.payDate = payDate;
	}
	private double income;
	private double expend;
	private String payDate;
	public double getExpend() {
		return expend;
	}
	public double getIncome() {
		return income;
	}
	public String getPayDate() {
		return payDate;
	}
	public void setExpend(double expend) {
		this.expend = expend;
	}
	public void setIncome(double income) {
		this.income = income;
	}
	public void setPayDate(String payDate) {
		this.payDate = payDate;
	}
	
	@Override
	public String toString() {
		return "MonthStat [income=" + income + ", expend=" + expend + ", payDate=" + payDate + "]";
	}
	
	
}
