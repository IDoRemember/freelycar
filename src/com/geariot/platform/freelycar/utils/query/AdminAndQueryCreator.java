package com.geariot.platform.freelycar.utils.query;

import java.util.ArrayList;


public class AdminAndQueryCreator extends AndQueryCreator {
	@Override
	protected void init() {
		conditionKeys = new ArrayList<ConBean>();
		conditionKeys.add(new ConBean("account", "like"));
    	conditionKeys.add(new ConBean("name", "like"));
	}
	
	public AdminAndQueryCreator(String... con){
		super(con);
	}
}
