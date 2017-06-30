package com.geariot.platform.freelycar.utils.query;

import java.util.ArrayList;

public class ServiceAndQueryCreator extends AndQueryCreator{

	@Override
	protected void init() {
		conditionKeys = new ArrayList<ConBean>();
		conditionKeys.add(new ConBean("name", "like"));
	}
	
	public ServiceAndQueryCreator(String name) {
		super(new String[]{name});
	}
}
