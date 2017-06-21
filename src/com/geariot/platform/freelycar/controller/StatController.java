package com.geariot.platform.freelycar.controller;

import java.util.Date;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/stat")
public class StatController {

	@RequestMapping(value = "/today" , method = RequestMethod.GET)
	public String getToday(){
		return null;
	}
	
	@RequestMapping(value = "/thismonth" , method = RequestMethod.GET)
	public String thisMonth(){
		return null;
	}
	
	@RequestMapping(value = "/query" , method = RequestMethod.GET)
	public String selectDate(Date startDate , Date endDate){
		return null;
	}
	
	@RequestMapping(value = "/monthlybyyear" , method = RequestMethod.GET)
	public String monthlyByYear(Date selectYear){
		return null;
	}

	@RequestMapping(value = "/today/detail" , method = RequestMethod.GET)
	public String dailyStatDetail(int income , int expend){
		return null;
	}
	
	@RequestMapping(value = "/thismonth/detail" , method = RequestMethod.GET)
	public String monthlyStatDetail(int income , int expend){
		return null;
	}

}


