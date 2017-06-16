package com.geariot.platform.freelycar.utils;

import org.json.JSONObject;

import com.geariot.platform.freelycar.model.RESCODE;

public class JsonResFactory {
	public static JSONObject buildOrg(RESCODE res){
		JSONObject obj = new JSONObject();
		obj.put(Constants.RESPONSE_CODE_KEY, res);
		obj.put(Constants.RESPONSE_MSG_KEY, res.getMsg());
		return obj;
	}
	
	public static net.sf.json.JSONObject buileNet(RESCODE res){
		net.sf.json.JSONObject obj = new net.sf.json.JSONObject();
		obj.put(Constants.RESPONSE_CODE_KEY, res.toString());
		obj.put(Constants.RESPONSE_MSG_KEY, res.getMsg());
		return obj;
	}
	
}
