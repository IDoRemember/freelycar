package com.geariot.platform.freelycar.utils.query;

import java.util.ArrayList;

public class ProviderAndQueryCreator extends AndQueryCreator{

	@Override
	protected void init() {
		conditionKeys = new ArrayList<ConBean>();
    	conditionKeys.add(new ConBean("name", "like"));
	}
	
	public ProviderAndQueryCreator(String name){
		super(new String[]{name});
	}
	

}
