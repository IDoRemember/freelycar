package com.geariot.platform.freelycar.dao;

import com.geariot.platform.freelycar.entities.Car;

public interface CarDao {
	void deleteById(int carId);
	
	Car findById(int carId);
	
	Car findByLicense(String licensePlate);

	Car findByFuzzyLicense(String licensePlate);
}
