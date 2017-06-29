package com.geariot.platform.freelycar.dao;

import java.util.List;

import com.geariot.platform.freelycar.entities.Car;
import com.geariot.platform.freelycar.entities.CarBrand;

public interface CarDao {
	void deleteById(int carId);
	
	Car findById(int carId);
	
	Car findByLicense(String licensePlate);

	List<String> queryLicensePlate(String queryText);

	List<CarBrand> listBrand();
}
