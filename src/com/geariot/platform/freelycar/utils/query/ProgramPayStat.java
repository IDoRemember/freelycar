package com.geariot.platform.freelycar.utils.query;

public class ProgramPayStat {

	private String programName;
	private double value;
	private int count;
	
	public ProgramPayStat(String programName , double value , int count){
		this.programName = programName ;
		this.value = value;
		this.count = count;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public double getValue() {
		return value;
	}

	public void setValue(double value) {
		this.value = value;
	}

	public String getprogramName() {
		return programName;
	}

	public void seprogramName(String programName) {
		this.programName = programName;
	}
}
