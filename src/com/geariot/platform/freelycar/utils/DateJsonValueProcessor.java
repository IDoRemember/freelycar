package com.geariot.platform.freelycar.utils;

import java.text.DateFormat;  
import java.text.SimpleDateFormat;  
import java.util.Date;  
  
import java.util.Locale;

import net.sf.json.JsonConfig;  
import net.sf.json.processors.JsonValueProcessor;  
  
public class DateJsonValueProcessor implements JsonValueProcessor {  
	public static final String Default_DATE_PATTERN ="yyyy-dd-MMM hh:mm:ss E";  
	private DateFormat dateFormat ;  
	public DateJsonValueProcessor(String datePattern){  
		try{  
			dateFormat  = new SimpleDateFormat(datePattern);  
     
		}catch(Exception e ){  
			dateFormat = new SimpleDateFormat(Default_DATE_PATTERN, Locale.CHINA);  
     
		}  
	}
  
	public DateJsonValueProcessor(){  
		try{  
			dateFormat  = new SimpleDateFormat(Default_DATE_PATTERN, Locale.CHINA);  
	     
		}catch(Exception e ){  
			dateFormat = new SimpleDateFormat("yyyy-dd-MMM hh:mm:ss E", Locale.CHINA);  
	     
		} 
    
	}  
	
	public Object processArrayValue(Object value, JsonConfig jsonConfig) {  
		return process(value);  
	}  
  
	public Object processObjectValue(String key, Object value,  
			JsonConfig jsonConfig) {  
		return process(value);  
	}  
	
	private Object process(Object value){  
		return dateFormat.format((Date)value);  
    
	}  
}  