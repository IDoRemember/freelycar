package com.geariot.platform.freelycar.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.geariot.platform.freelycar.dao.ClientDao;
import com.geariot.platform.freelycar.entities.Car;
import com.geariot.platform.freelycar.entities.Client;
import com.geariot.platform.freelycar.model.RESCODE;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.DateJsonValueProcessor;
import com.geariot.platform.freelycar.utils.JsonResFactory;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;

@Service
@Transactional
public class ClientService {

	@Autowired
	private ClientDao clientDao;
	
	public String list(int page, int number) {
		int from = (page - 1) * number;
		List<Client> list = clientDao.list(from, number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = clientDao.getCount();
		int size = (int) Math.ceil(realSize/(double)number);
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
		JSONArray jsonArray = JSONArray.fromObject(list, config);
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
		obj.put(Constants.RESPONSE_SIZE_KEY, size);
		return obj.toString();
	}

	public String add(Client client) {
		Client exist = clientDao.findByPhone(client.getPhone());
		if(exist != null){
			return JsonResFactory.buildOrg(RESCODE.PHONE_EXIST).toString();
		}
		if(client.getCars() != null){
			for(Car car : client.getCars()){
				car.setCreateDate(new Date());
			}
		}
		client.setCreateDate(new Date());
		clientDao.save(client);
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String modify(Client client) {
		Client exist = clientDao.findById(client.getId());
		if(exist == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		if(this.clientDao.findByPhone(client.getPhone()) != null){
			return JsonResFactory.buildOrg(RESCODE.PHONE_EXIST).toString();
		}
		exist.setAge(client.getAge());
		exist.setBirthday(client.getBirthday());
		exist.setCars(client.getCars());
		exist.setCards(client.getCards());
		exist.setDirveLicense(client.getDirveLicense());
		exist.setGender(client.getGender());
		exist.setIdNumber(client.getIdNumber());
		exist.setName(client.getName());
		exist.setPhone(client.getPhone());
		exist.setState(client.getState());
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String delete(List<Integer> clientIds) {
		this.clientDao.delete(clientIds);
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String query(String phone, String licensePlate) {
		// TODO Auto-generated method stub
		return null;
	}

	public String detail(int clientId) {
		// TODO Auto-generated method stub
		return null;
	}

	public String addCar(Car car) {
		Client client = clientDao.findById(car.getClient().getId());
		if(client == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		client.getCars().add(car);
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String deleteCar(int carId) {
		clientDao.deleteCar(carId);
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

}
