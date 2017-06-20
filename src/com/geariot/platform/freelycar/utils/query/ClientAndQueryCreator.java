package com.geariot.platform.freelycar.utils.query;

import java.util.ArrayList;

public class ClientAndQueryCreator extends AndQueryCreator {
	@Override
	protected void init() {
		conditionKeys = new ArrayList<ConBean>();
		conditionKeys.add(new ConBean("name", "like"));
    	conditionKeys.add(new ConBean("phone", "like"));
	}
	
	public ClientAndQueryCreator(String... con){
		super(con);
	}
}
