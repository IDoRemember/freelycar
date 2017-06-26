package com.geariot.platform.freelycar.utils.query;

import java.util.ArrayList;

public class StaffAndQueryCreator extends AndQueryCreator{

	@Override
	protected void init() {
		conditionKeys = new ArrayList<ConBean>();
		conditionKeys.add(new ConBean("id", "=="));
		conditionKeys.add(new ConBean("name", "like"));
	}
	
	public StaffAndQueryCreator(String id , String name){
		super(id , name);
	}
	
}
