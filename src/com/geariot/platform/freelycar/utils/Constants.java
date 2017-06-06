package com.geariot.platform.freelycar.utils;

import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;

import com.geariot.platform.freelycar.model.DATATYPE;

/**
 * 常量类，存储项目中需要用的常量
 * @author haizhe
 *
 */
public class Constants {

	
	public static final String RESPONSE_CODE_KEY = "code"; //返回对象里的code的key名称
	public static final String RESPONSE_MSG_KEY = "msg"; //返回对象里的msg的key名称
	public static final String RESPONSE_DATA_KEY = "data"; //返回对象里的data的key名称
	public static final String RESPONSE_SIZE_KEY = "size"; //返回对象里的size的key名称

	public static final String RESPONSE_USER_KEY = "user";
	public static final String RESPONSE_CARD_KEY = "card";
	public static final String RESPONSE_LOC_KEY = "location";
	public static final String RESPONSE_TRAINER_KEY = "trainer";
	public static final String RESPONSE_TYPE_KEY = "type";
	public static final String RESPONSE_CLZ_KEY = "clz";
	
	public static final String RESPONSE_TIME_KEY = "time"; //返回对象里的date的key名称
	
	public static final String POLLING_KEY = "polling";
	
	public static final String EXPIRATION_KEY = "expiration";
	
	public static  boolean POLLING_VALUE = true;
	
	public static  boolean EXPIRATION_VALUE = true;
	
	

	public static final String POINTS_PER_CLASS_KEY = "ptsperclz";
	public static final String POINTS_PER_LEVEL_KEY = "lvpts";
	
	public static final String VIDEO_CLASSES_KEY = "videoclass";
	
	
	public static  int POINTS_PER_CLASS = 1;   //每报一门课，加1分
	public static  int POINTS_PER_LEVEL = 10;	//每10分一个等级
	
	public static final int EXTENSION_USAGE =3 ; //一张卡最多延期3次
	/*是否开启查询缓存*/
	public static boolean SELECT_CACHE = false;
	
    public static final String SPLIT_LABEL = "##";
    
    public static final String DEFAULT_EXP_TIME = "2017-03-01 12:00:00";
    
    public static Date DEFAULT_EXP_DATE;
    
    public static final int PAST_VISIT_DAYS_SHOW = 15;
    
    public static final int PAST_CARD_DAYS_SHOW = 0;
    
	private static Properties p = null;
	
	public static ConcurrentHashMap<String,Long>EXPIRATION_MAP = new ConcurrentHashMap<String, Long>();
	
	public static String[] classArray =  null;
	
	public static final long TIME_UNIT = 60 * 1000L; //从配置文件读取的时间单位.这里是一分钟，60000ms。
	
	static {
		p = new Properties();
		try {
			ClassLoader cl = Thread.currentThread().getContextClassLoader();  
			if (cl == null)
				cl = Constants.class.getClassLoader(); 
			InputStream in = cl.getResourceAsStream("config.properties");
			
			p.load(in);
		} catch (IOException e) {
			e.printStackTrace();
		}

		EXPIRATION_MAP.put(DATATYPE.CARD.getMsg(), Long.valueOf((String) p.get(DATATYPE.CARD.getMsg())) * TIME_UNIT);
		EXPIRATION_MAP.put(DATATYPE.CLASSDEF.getMsg(), Long.valueOf((String)p.get(DATATYPE.CLASSDEF.getMsg())) * TIME_UNIT);
		EXPIRATION_MAP.put(DATATYPE.CLASSES.getMsg(), Long.valueOf((String)p.get(DATATYPE.CLASSES.getMsg())) * TIME_UNIT);
		EXPIRATION_MAP.put(DATATYPE.USER.getMsg(), Long.valueOf((String)p.get(DATATYPE.USER.getMsg())) * TIME_UNIT);
		EXPIRATION_MAP.put(DATATYPE.LOCATION.getMsg(), Long.valueOf((String)p.get(DATATYPE.LOCATION.getMsg())) * TIME_UNIT);
		EXPIRATION_MAP.put(DATATYPE.PROGRAM.getMsg(), Long.valueOf((String) p.get(DATATYPE.PROGRAM.getMsg())) * TIME_UNIT);
		EXPIRATION_MAP.put(DATATYPE.RESERVATION.getMsg(), Long.valueOf((String)p.get(DATATYPE.RESERVATION.getMsg())) * TIME_UNIT);
		EXPIRATION_MAP.put(DATATYPE.SERVICES.getMsg(), Long.valueOf((String)p.get(DATATYPE.SERVICES.getMsg())) * TIME_UNIT);
		EXPIRATION_MAP.put(DATATYPE.SESSIONTYPE.getMsg(), Long.valueOf((String)p.get(DATATYPE.SESSIONTYPE.getMsg())) * TIME_UNIT);
		EXPIRATION_MAP.put(DATATYPE.STAFF.getMsg(), Long.valueOf((String) p.get(DATATYPE.STAFF.getMsg())) * TIME_UNIT);
		EXPIRATION_MAP.put(DATATYPE.AVAILABILITY.getMsg(), Long.valueOf((String) p.get(DATATYPE.AVAILABILITY.getMsg())) * TIME_UNIT);
		
		POLLING_VALUE = Boolean.valueOf(p.get(POLLING_KEY).toString());
		
		EXPIRATION_VALUE = Boolean.valueOf(p.get(EXPIRATION_KEY).toString());
		
		POINTS_PER_CLASS = Integer.parseInt((String) p.get(POINTS_PER_CLASS_KEY));
		POINTS_PER_LEVEL = Integer.parseInt((String) p.get(POINTS_PER_LEVEL_KEY));
		
		String totalClz = (String) p.get(VIDEO_CLASSES_KEY);
		classArray = totalClz.split(",");
		
		SimpleDateFormat df=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			DEFAULT_EXP_DATE = df.parse(Constants.DEFAULT_EXP_TIME); //设置一个初始时间
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
	}
	
	
		
}
