package com.geariot.platform.freelycar.utils.query;

import java.util.ArrayList;

public class ChargeAndQueryCreator extends AndQueryCreator {

	@Override
	protected void init() {
		conditionKeys = new ArrayList<ConBean>();
		conditionKeys.add(new ConBean("typeId", "=="));
    	conditionKeys.add(new ConBean("expendDate", ">="));
    	conditionKeys.add(new ConBean("expendDate", "<="));
	}

	public ChargeAndQueryCreator(String typeId, String startTime, String endTime){
		super(typeId, startTime, endTime);
	}
	
}
