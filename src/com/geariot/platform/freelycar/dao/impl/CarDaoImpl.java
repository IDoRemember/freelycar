package com.geariot.platform.freelycar.dao.impl;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.geariot.platform.freelycar.dao.CarDao;
import com.geariot.platform.freelycar.entities.Car;
import com.geariot.platform.freelycar.utils.Constants;

@Repository
public class CarDaoImpl implements CarDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	private Session getSession(){
		return this.sessionFactory.getCurrentSession();
	}
	
	@Override
	public void deleteById(int carId) {
		String hql = "delete from Car where id = :id";
		this.getSession().createQuery(hql).setInteger("id", carId).executeUpdate();
	}

	@Override
	public Car findById(int carId) {
		String hql = "from Car where id = :id";
		return (Car) this.getSession().createQuery(hql).setInteger("id", carId)
				.setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@Override
	public Car findByLicense(String licensePlate) {
		String hql = "from Car where licensePlate = :license";
		return (Car) this.getSession().createQuery(hql).setString("license", licensePlate)
				.setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@Override
	public Car findByFuzzyLicense(String licensePlate) {
		// TODO Auto-generated method stub
		return null;
	}
	
}
