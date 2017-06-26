package com.geariot.platform.freelycar.utils;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.HibernateException;
import org.hibernate.MappingException;
import org.hibernate.engine.spi.SessionImplementor;
import org.hibernate.id.Configurable;
import org.hibernate.id.IdentifierGenerator;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.type.Type;

/**
 * 自定义ID生成器
 * @author Administrator
 *
 */
public class IDGenerator implements IdentifierGenerator, Configurable {

	private final static Logger log = LogManager.getLogger(IDGenerator.class);

	/**
	 * 必须实现的方法，可以为空    
	 */
	@Override
	public void configure(Type arg0, Properties arg1, ServiceRegistry arg2) throws MappingException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Serializable generate(SessionImplementor arg0, Object arg1) throws HibernateException {
		//采用当前时间加6位随机编码（26个英文字母和0-9数字的集合）的形式
		String id = new Date().getTime() + RandomStringGenerator.getRandomStringByLength(6);
		log.debug("create order --id:" + id);
		return id;
	}
	
	private static String[] prefix = {"Pay", "S", "X", "osto", "isto", "inv"};
	private static SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
	//type:0,1,2,3,4,5 = 开卡，美容，维修，出库，入库，库存编号
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
