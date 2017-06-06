package com.geariot.platform.freelycar.utils.query;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;

import com.geariot.platform.freelycar.model.ORDER_CON;


/**
 * query生成辅助
 * @author huaqing
 *
 */
public class QueryUtils {

//	private static final Logger logger = Logger.getLogger(QueryUtils.class);
	private static final Logger logger = LogManager.getLogger(QueryUtils.class);

	public static Query createLocalQuery(Session session, StringBuffer basicQueryStr, String creatorStr, ORDER_CON orderByTime)
	{
		Query query;
		String prefix = " and ";
		if(basicQueryStr.indexOf("where") == -1)
			prefix = " where ";
		if(creatorStr != null && !creatorStr.isEmpty())
		{
			basicQueryStr.append(prefix);
			basicQueryStr.append(creatorStr);
		}
		switch(orderByTime)
		{
			case DESC_ORDER:
				basicQueryStr.append(" order by createTime desc");
				break;
			case ASC_ORDER:
				basicQueryStr.append(" order by createTime asc");
				break;
			case RAND_ORDER:
				basicQueryStr.append(" ORDER BY RAND()");
				break;
			default:
				break;
				
		}
		logger.debug("复合查询sql:" + basicQueryStr.toString());
		query = session.createQuery(basicQueryStr.toString());
		return query;
	}
	
	public static StringBuffer createQueryString(StringBuffer basicQueryStr, String creatorStr, ORDER_CON orderByTime)
	{
		
		String prefix = " and ";
		if(basicQueryStr.indexOf("where") == -1)
			prefix = " where ";
		if(creatorStr != null && !creatorStr.isEmpty())
		{
			basicQueryStr.append(prefix);
			basicQueryStr.append(creatorStr);
		}
		switch(orderByTime)
		{
			case DESC_ORDER:
				basicQueryStr.append(" order by createTime desc");
				break;
			case ASC_ORDER:
				basicQueryStr.append(" order by createTime asc");
				break;
			case RAND_ORDER:
				basicQueryStr.append(" ORDER BY RAND()");
				break;
			default:
				break;
				
		}
		logger.debug("复合查询sql:" + basicQueryStr.toString());
		
		return  basicQueryStr;
	}
}
