package com.geariot.platform.freelycar.utils.query;

import java.util.ArrayList;

public class InventoryTypeAndQueryCreator extends AndQueryCreator {

	@Override
	protected void init() {
		conditionKeys = new ArrayList<ConBean>();
		conditionKeys.add(new ConBean("typeName", "like"));
	}

	public InventoryTypeAndQueryCreator(String typeName) {
		super(new String[]{typeName});
	}
	
}
