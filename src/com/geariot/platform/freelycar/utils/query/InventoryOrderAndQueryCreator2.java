package com.geariot.platform.freelycar.utils.query;

import java.util.ArrayList;

public class InventoryOrderAndQueryCreator2 extends AndQueryCreator {
	@Override
	protected void init() {
		conditionKeys = new ArrayList<ConBean>();
		conditionKeys.add(new ConBean("id", "like"));
    	conditionKeys.add(new ConBean("orderMaker.id", "=="));
    	conditionKeys.add(new ConBean("type", "=="));
	}
	
	public InventoryOrderAndQueryCreator2(String id, String makerId, String type){
		super(new String[]{id, makerId, type});
	}
}
