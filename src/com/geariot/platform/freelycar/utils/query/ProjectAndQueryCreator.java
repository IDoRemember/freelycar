package com.geariot.platform.freelycar.utils.query;

import java.util.ArrayList;

public class ProjectAndQueryCreator extends AndQueryCreator{

	@Override
	protected void init() {
		conditionKeys = new ArrayList<ConBean>();
		conditionKeys.add(new ConBean("name", "like"));
		conditionKeys.add(new ConBean("programId", "=="));
	}

	public ProjectAndQueryCreator(String name , String programId){
		super(name, programId);
	} 
}
