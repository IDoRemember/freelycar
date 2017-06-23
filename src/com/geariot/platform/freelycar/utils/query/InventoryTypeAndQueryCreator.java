package com.geariot.platform.freelycar.utils.query;

import java.util.ArrayList;

public class InventoryTypeAndQueryCreator extends AndQueryCreator {

	@Override
	protected void init() {
		conditionKeys = new ArrayList<ConBean>();
		conditionKeys.add(new ConBean("typeName", "like"));
    	conditionKeys.add(new ConBean("createDate", ">"));
    	conditionKeys.add(new ConBean("createDate", "<"));
	}

	public InventoryTypeAndQueryCreator(String typeName, String startDate, String endDate) {
		super(typeName, startDate, endDate);
	}
	
}
