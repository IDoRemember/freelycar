package com.geariot.platform.freelycar.service;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.geariot.platform.freelycar.dao.ChargeDao;
import com.geariot.platform.freelycar.dao.ExpendOrderDao;
import com.geariot.platform.freelycar.entities.ExpendOrder;
import com.geariot.platform.freelycar.entities.OtherExpendOrder;
import com.geariot.platform.freelycar.entities.OtherExpendType;
import com.geariot.platform.freelycar.model.RESCODE;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.IDGenerator;
import com.geariot.platform.freelycar.utils.JsonResFactory;
import com.geariot.platform.freelycar.utils.query.ChargeAndQueryCreator;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;

@Service
@Transactional
public class ChargeService {

	@Autowired
	private ChargeDao chargeDao;
	
	@Autowired
	private ExpendOrderDao expendOrderDao;
	
	public String addType(OtherExpendType otherExpendType){
		OtherExpendType exist = chargeDao.findByName(otherExpendType.getName());
		JSONObject obj = null;
		if(exist != null){
			obj = JsonResFactory.buildOrg(RESCODE.NAME_EXIST);
		}
		else{
			chargeDao.save(otherExpendType);
			obj = JsonResFactory.buildOrg(RESCODE.SUCCESS);
		}
		return obj.toString();
	}
	
	public String deleteType(int otherExpendTypeId){
		OtherExpendType exist = chargeDao.findById(otherExpendTypeId);
		JSONObject obj = null;
		if(exist == null){
			obj = JsonResFactory.buildOrg(RESCODE.NOT_FOUND);
		}
		else{
			chargeDao.delete(otherExpendTypeId);
			obj = JsonResFactory.buildOrg(RESCODE.SUCCESS);
		}
		return obj.toString();
	}
	
	public String listType(){
		List<OtherExpendType> list = chargeDao.listAll();
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		JSONArray jsonArray = JSONArray.fromObject(list);
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
		return obj.toString();
	}
	
	public String addCharge(OtherExpendOrder otherExpendOrder){
		otherExpendOrder.setId(IDGenerator.generate(IDGenerator.CHARORDER_ID));
		otherExpendOrder.setCreateDate(new Date());
		otherExpendOrder.setTypeName(chargeDao.findById(otherExpendOrder.getTypeId()).getName());
		chargeDao.save(otherExpendOrder);
		//当有其他支出发生时,取信息存入expendOrder表
		ExpendOrder expendOrder = new ExpendOrder();
		expendOrder.setAmount(otherExpendOrder.getAmount());
		expendOrder.setPayDate(otherExpendOrder.getCreateDate());
		expendOrder.setType("其他支出");
		expendOrder.setReference(otherExpendOrder.getId());
		expendOrderDao.save(expendOrder);
		JsonConfig config = JsonResFactory.dateConfig();
		return JsonResFactory.buildNetWithData(RESCODE.SUCCESS,net.sf.json.JSONObject.fromObject(otherExpendOrder, config)).toString();
		
	}
	
	public String deleteCharge(String[] ids){
		int success = this.chargeDao.delete(Arrays.asList(ids));
		int suc = this.expendOrderDao.delete(Arrays.asList(ids));
		if(success < ids.length || suc < ids.length){
			return JsonResFactory.buildOrg(RESCODE.PART_SUCCESS).toString();
		}
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}
	
	/*public String listAllCharge(int page , int number){
		int from = (page - 1) * number;
		List<OtherExpendOrder> list = chargeDao.listAll(from, number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = chargeDao.getCount();
		int size=(int) Math.ceil(realSize/(double)number);
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
		JSONArray jsonArray = JSONArray.fromObject(list, config);
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
		obj.put(Constants.RESPONSE_SIZE_KEY, size);
		return obj.toString();
	}*/
	
	public String selectCharge(String typeId , Date startTime , Date endTime, int page, int number){
//		System.out.println(typeId);
		String start = null;
		String end = null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		if(startTime != null){
				Calendar cal1 = Calendar.getInstance();
				cal1.setTimeInMillis(startTime.getTime());
				cal1.set(Calendar.HOUR_OF_DAY, 0);
				cal1.set(Calendar.MINUTE, 0);
				cal1.set(Calendar.SECOND, 0);
				start = sdf.format(cal1.getTime());
			}
		if(endTime != null){
				Calendar cal2 = Calendar.getInstance();
				cal2.setTimeInMillis(endTime.getTime());
				cal2.set(Calendar.HOUR_OF_DAY, 0);
				cal2.set(Calendar.MINUTE, 0);
				cal2.set(Calendar.SECOND, 0);
				cal2.add(Calendar.DAY_OF_MONTH, 1);
				end = sdf.format(cal2.getTime());
			}
		String andCondition = new ChargeAndQueryCreator(typeId, 
				start, end).createStatement();
//		System.out.println(andCondition);
//		System.out.println("******************************");
		int from = (page - 1) * number;
		List<OtherExpendOrder> list = chargeDao.getConditionQuery(andCondition, from, number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		JsonConfig config = JsonResFactory.dateConfig();
		long realSize = (long) chargeDao.getConditionCount(andCondition);
		int size=(int) Math.ceil(realSize/(double)number);
		JSONArray jsonArray = JSONArray.fromObject(list,config);
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
		obj.put(Constants.RESPONSE_SIZE_KEY, size);
		obj.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
		return obj.toString();
	}
}
