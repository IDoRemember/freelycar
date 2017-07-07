package com.geariot.platform.freelycar.utils.query;

public class PayMethodStat {
	
	public PayMethodStat(String payMethod , double value){
		this.payMethod = payMethod;
		this.value = value;
	}
	
	private String payMethod;
	private double value;
	
	public double getValue() {
		return value;
	}
	public void setValue(double value) {
		this.value = value;
	}
	public String getPayMethod() {
		return payMethod;
	}
	public void setPayMethod(String payMethod) {
		this.payMethod = payMethod;
	}
	
	@Override
	public String toString() {
		return "PayMethodStat [payMethod=" + payMethod + ", value=" + value + "]";
	}
	
}
