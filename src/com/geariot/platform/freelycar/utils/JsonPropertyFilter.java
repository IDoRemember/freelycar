package com.geariot.platform.freelycar.utils;

import net.sf.json.util.PropertyFilter;

public class JsonPropertyFilter implements PropertyFilter {
	
	private Class<?> filterProperty = null;
	
	public JsonPropertyFilter(Class<?> filterProperty){
		this.filterProperty = filterProperty;
	}
	
	@Override
	public boolean apply(Object source, String name, Object value) {
		return this.filterProperty.isAssignableFrom(value.getClass());
	}

}
