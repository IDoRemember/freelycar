package com.geariot.platform.freelycar.utils.query;

import java.util.ArrayList;

public class InventoryAndQueryCreator extends AndQueryCreator {
	@Override
	protected void init() {
		conditionKeys = new ArrayList<ConBean>();
		conditionKeys.add(new ConBean("name", "like"));
    	conditionKeys.add(new ConBean("type.id", "=="));
	}
	
	public InventoryAndQueryCreator(String name, String typeId){
		super(name, typeId);
	}
}
