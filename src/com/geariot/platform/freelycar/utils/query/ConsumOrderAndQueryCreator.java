package com.geariot.platform.freelycar.utils.query;

import java.util.ArrayList;

public class ConsumOrderAndQueryCreator extends AndQueryCreator {
	@Override
	protected void init() {
		conditionKeys = new ArrayList<ConBean>();
		conditionKeys.add(new ConBean("id", "like"));
    	conditionKeys.add(new ConBean("licensePlate", "like"));
    	conditionKeys.add(new ConBean("programId", "=="));
    	conditionKeys.add(new ConBean("payState", "=="));
    	conditionKeys.add(new ConBean("clientId", "=="));
    	conditionKeys.add(new ConBean("state", "=="));
	}
	
	public ConsumOrderAndQueryCreator(String id, String licensePlate, String programId, String payState, String clientId, String state){
		super(new String[]{id, licensePlate, programId, payState, clientId, state});
	}
}
