package com.geariot.platform.freelycar.service;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.geariot.platform.freelycar.dao.CarDao;
import com.geariot.platform.freelycar.entities.Car;
import com.geariot.platform.freelycar.entities.CarBrand;
import com.geariot.platform.freelycar.entities.CarType;
import com.geariot.platform.freelycar.entities.Client;
import com.geariot.platform.freelycar.model.RESCODE;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.DateJsonValueProcessor;
import com.geariot.platform.freelycar.utils.JsonPropertyFilter;
import com.geariot.platform.freelycar.utils.JsonResFactory;

import net.sf.json.JsonConfig;

@Service
@Transactional
public class CarServive {

	@Autowired
	private CarDao carDao;
	
	public String queryLicensePlate(String queryText) {
		List<String> license = carDao.queryLicensePlate(queryText);
		if(license == null || license.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		return JsonResFactory.buildOrg(RESCODE.SUCCESS, 
				Constants.RESPONSE_DATA_KEY, new JSONArray(license)).toString();
	}

	public String findClientByLicensePlate(String licensePlate) {
		Car car = this.carDao.findByLicense(licensePlate);
		if(car == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		JsonConfig config = JsonResFactory.dateConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
		JsonPropertyFilter filter = new JsonPropertyFilter(Client.class);
		filter.setColletionProperties(CarType.class);
		config.setJsonPropertyFilter(filter);
		return JsonResFactory.buildNetWithData(RESCODE.SUCCESS, 
				net.sf.json.JSONObject.fromObject(car.getClient(), config)).toString();
	}

	public String listBrand(String brandName) {
		List<CarBrand> list = this.carDao.listBrand(brandName);
		JsonConfig config = JsonResFactory.dateConfig(CarBrand.class);
		net.sf.json.JSONArray array = net.sf.json.JSONArray.fromObject(list, config);
		return JsonResFactory.buildNetWithData(RESCODE.SUCCESS, array).toString();
	}
	
}
