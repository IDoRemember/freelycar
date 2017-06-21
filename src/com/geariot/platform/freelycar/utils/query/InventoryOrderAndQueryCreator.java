package com.geariot.platform.freelycar.utils.query;

import java.util.ArrayList;

public class InventoryOrderAndQueryCreator extends AndQueryCreator {
	@Override
	protected void init() {
		conditionKeys = new ArrayList<ConBean>();
		conditionKeys.add(new ConBean("id", "like"));
    	conditionKeys.add(new ConBean("orderMaker.id", "=="));
	}
	
	public InventoryOrderAndQueryCreator(String... con){
		super(con);
	}
}
