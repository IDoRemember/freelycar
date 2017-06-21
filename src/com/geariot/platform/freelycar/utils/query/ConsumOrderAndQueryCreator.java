package com.geariot.platform.freelycar.utils.query;

import java.util.ArrayList;

public class ConsumOrderAndQueryCreator extends AndQueryCreator {
	@Override
	protected void init() {
		conditionKeys = new ArrayList<ConBean>();
		conditionKeys.add(new ConBean("id", "like"));
    	conditionKeys.add(new ConBean("car.licensePlate", "like"));
    	conditionKeys.add(new ConBean("program.id", "=="));
    	conditionKeys.add(new ConBean("payState", "=="));
	}
	
	public ConsumOrderAndQueryCreator(String... con){
		super(con);
	}
}
