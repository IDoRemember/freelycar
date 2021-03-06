package com.geariot.platform.freelycar.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class IDGenerator {
	
	public static final int BUY_CARD = 0;
	public static final int MAINTAIN_CONSUM = 1;
	public static final int REPAIR_CONSUM = 2;
	public static final int OUT_STOCK = 3;
	public static final int IN_STOCK = 4;
	public static final int INV_ID = 5;
	public static final int CHARORDER_ID = 6;

	private static String[] prefix = {"Pay", "S", "X", "osto", "isto", "inv", "Exp"};
	private static SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
	//type:0,1,2,3,4,5,6 = 开卡，美容，维修，出库，入库，库存编号,支出订单
	public static String generate(int type){
		synchronized(IDGenerator.class){
			StringBuilder sb = new StringBuilder();
			sb.append(prefix[type]);
			sb.append(sdf.format(new Date()));
			sb.append(RandomStringGenerator.getRandomStringByLength(6));
			return sb.toString();
		}
	}
	
}
