package com.geariot.platform.freelycar.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.service.StatService;

@RestController
@RequestMapping(value = "/stat")
public class StatController {

	@Autowired
	private StatService statService;
	
	@RequestMapping(value = "/today" , method = RequestMethod.GET)
	public String getToday(int income , int expend){
		return statService.getToday(income , expend);
	}
	
	@RequestMapping(value = "/thismonth" , method = RequestMethod.GET)
	public String thisMonth(int income , int expend){
		return statService.thisMonth(income , expend);
	}
	
	@RequestMapping(value = "/query" , method = RequestMethod.GET)
	public String selectDate(Date startDate , Date endDate){
		return null;
	}
	
	@RequestMapping(value = "/monthlybyyear" , method = RequestMethod.GET)
	public String monthlyByYear(Date selectYear){
		return statService.monthlyByYear(selectYear);
	}

	@RequestMapping(value = "/thisweek" , method = RequestMethod.GET)
	public String weeklyStatDetail(int income , int expend){
		return statService.weeklyStatDetail(income, expend);
	}
	
	@RequestMapping(value = "/thismonth/detail" , method = RequestMethod.GET)
	public String monthlyStatDetail(int income , int expend){
		return null;
	}

}


