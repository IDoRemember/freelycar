package com.geariot.platform.freelycar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.service.CarServive;

@RestController
@RequestMapping(value="/car")
public class CarController {
	
	@Autowired
	private CarServive carService;
	
	@RequestMapping(value="/query", method=RequestMethod.GET)
	public String queryLicensePlate(String queryText){
		return this.carService.queryLicensePlate(queryText);
	}
	
	@RequestMapping(value="/detail", method=RequestMethod.GET)
	public String getClientByLicensePlate(String licensePlate){
		return this.carService.findClientByLicensePlate(licensePlate);
	}
	
	@RequestMapping(value="/listbrand", method=RequestMethod.GET)
	public String getBrands(){
		return this.carService.listBrand();
	}
	
}
