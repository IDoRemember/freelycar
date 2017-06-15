package com.geariot.platform.freelycar.utils;

import org.json.JSONObject;

import com.geariot.platform.freelycar.model.RESCODE;

public class JsonResFactory {
	public static JSONObject buildOrgBasic(RESCODE res){
		JSONObject obj = new JSONObject();
		obj.put(Constants.RESPONSE_CODE_KEY, res);
		obj.put(Constants.RESPONSE_MSG_KEY, res.getMsg());
		return obj;
	}
}
