package com.geariot.platform.freelycar.utils.query;

import java.util.ArrayList;

public class ChargeAndQueryCreator extends AndQueryCreator {

	@Override
	protected void init() {
		conditionKeys = new ArrayList<ConBean>();
		conditionKeys.add(new ConBean("otherExpendTypeId", "=="));
    	conditionKeys.add(new ConBean("expendDate", ">="));
    	conditionKeys.add(new ConBean("expendDate", "<="));
	}

	public ChargeAndQueryCreator(String otherExpendTypeId, String startTime, String endTime){
		super(otherExpendTypeId, startTime, endTime);
	}
	
}
