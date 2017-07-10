package com.geariot.platform.freelycar.service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.geariot.platform.freelycar.dao.CarDao;
import com.geariot.platform.freelycar.dao.ClientDao;
import com.geariot.platform.freelycar.dao.IncomeOrderDao;
import com.geariot.platform.freelycar.entities.Admin;
import com.geariot.platform.freelycar.entities.Car;
import com.geariot.platform.freelycar.entities.CarType;
import com.geariot.platform.freelycar.entities.Card;
import com.geariot.platform.freelycar.entities.Client;
import com.geariot.platform.freelycar.entities.IncomeOrder;
import com.geariot.platform.freelycar.model.RESCODE;
import com.geariot.platform.freelycar.utils.Constants;
import com.geariot.platform.freelycar.utils.DateJsonValueProcessor;
import com.geariot.platform.freelycar.utils.JsonPropertyFilter;
import com.geariot.platform.freelycar.utils.JsonResFactory;
import com.geariot.platform.freelycar.utils.query.ClientAndQueryCreator;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

@Service
@Transactional
public class ClientService {

	@Autowired
	private ClientDao clientDao;
	
	@Autowired
	private CarDao carDao;
	
	/*@Autowired
	private ConsumOrderDao consumOrderDao;*/
	
	@Autowired
	private IncomeOrderDao incomeOrderDao;
	
	public String list(int page, int number) {
		int from = (page - 1) * number;
		List<Client> list = clientDao.list(from, number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = clientDao.getCount();
		int size = (int) Math.ceil(realSize/(double)number);
		JsonConfig config = JsonResFactory.dateConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
		JsonPropertyFilter filter = new JsonPropertyFilter(Client.class);
		filter.setColletionProperties(CarType.class);
		config.setJsonPropertyFilter(filter);
		config.registerPropertyExclusions(Admin.class, new String[]{"password", "role", "current", "createDate", "comment"});
		JSONArray jsonArray = JSONArray.fromObject(list, config);
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, jsonArray);
		obj.put(Constants.RESPONSE_SIZE_KEY, size);
		obj.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
		return obj.toString();
	}

	public String add(Client client) {
		Client exist = clientDao.findByPhone(client.getPhone());
		if(exist != null){
			return JsonResFactory.buildOrg(RESCODE.PHONE_EXIST).toString();
		}
		if(client.getCars() != null){
			for(Car car : client.getCars()){
				if(carDao.findByLicense(car.getLicensePlate()) != null){
					return JsonResFactory.buildOrg(RESCODE.CAR_LICENSE_EXIST).toString();
				}
				car.setCreateDate(new Date());
				car.setClient(client);
			}
		}
		client.setCreateDate(new Date());
		clientDao.save(client);
		Client added = this.carDao.findByLicense(client.getCars().iterator().next().getLicensePlate()).getClient();
		JsonConfig config = JsonResFactory.dateConfig(Collection.class);
		return JsonResFactory.buildNetWithData(RESCODE.SUCCESS, net.sf.json.JSONObject.fromObject(added, config)).toString();
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
		exist.setDriverLicense(client.getDriverLicense());
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

	public String query(String name, String phone, int page, int number) {
		int from = (page - 1) * number;
		String andCondition = new ClientAndQueryCreator(name, phone).createStatement();
		List<Client> list = clientDao.query(andCondition, from, number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = this.clientDao.getQueryCount(andCondition);
		int size = (int) Math.ceil(realSize/(double)number);
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
		JsonPropertyFilter filter = new JsonPropertyFilter(Client.class);
		filter.setColletionProperties(CarType.class);
		config.setJsonPropertyFilter(filter);
		config.registerPropertyExclusions(Card.class, new String[]{"projectInfos", "service", "orderMaker"});
		net.sf.json.JSONObject res = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, 
				JSONArray.fromObject(list, config));
		res.put(Constants.RESPONSE_SIZE_KEY, size);
		res.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
		return res.toString();
	}

	public String detail(int clientId) {
		Client client = clientDao.findById(clientId);
		if(client == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		JsonConfig config = JsonResFactory.dateConfig();
//		config.registerPropertyExclusion(Car.class, "client");
//		config.registerPropertyExclusion(CarBrand.class, "types");
		JsonPropertyFilter filter = new JsonPropertyFilter(Client.class);
		filter.setColletionProperties(CarType.class);
		config.setJsonPropertyFilter(filter);
		JSONObject obj = JsonResFactory.buildNet(RESCODE.SUCCESS, 
				Constants.RESPONSE_CLIENT_KEY, JSONObject.fromObject(client, config));
		List<IncomeOrder> consumHist = this.incomeOrderDao.findByClientId(clientId);
//		List<ConsumOrder> consumHist = this.consumOrderDao.findWithClientId(clientId);
//		config.registerPropertyExclusions(Admin.class, new String[]{"password", "role", "current", "createDate", "comment"});
		if(consumHist != null){
			obj.put(Constants.RESPONSE_DATA_KEY, JSONArray.fromObject(consumHist, config));
		}
		return obj.toString();
	}

	public String addCar(Car car) {
		Client client = clientDao.findById(car.getClient().getId());
		if(client == null){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		Car exist = carDao.findByLicense(car.getLicensePlate());
		if(exist != null){
			return JsonResFactory.buildOrg(RESCODE.CAR_LICENSE_EXIST).toString();
		}
		car.setCreateDate(new Date());
		client.getCars().add(car);
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String deleteCar(int carId) {
		carDao.deleteById(carId);;
		return JsonResFactory.buildOrg(RESCODE.SUCCESS).toString();
	}

	public String getClientNames(String name) {
		List<String> names = this.clientDao.getClientNames(name);
		return JsonResFactory.buildNetWithData(RESCODE.SUCCESS, net.sf.json.JSONArray.fromObject(names)).toString();
	}

	public String stat() {
		//当前日期
		Calendar now = Calendar.getInstance();
		now.setTimeInMillis(System.currentTimeMillis());
		//会员总数
		long all = this.clientDao.getQueryCount(null);
		//本月新增
		Calendar monthStart = (Calendar) now.clone();
		monthStart.set(monthStart.get(Calendar.YEAR), monthStart.get(Calendar.MONTH), 1, 0, 0, 0);
		Calendar monthEnd = (Calendar) monthStart.clone();
		monthEnd.add(Calendar.MONTH, 1);
		long thisMonth = this.clientDao.getQueryCount(this.buildCondition(monthStart, monthEnd));
		//本日新增
		Calendar dayStart = (Calendar) now.clone();
		dayStart.set(dayStart.get(Calendar.YEAR), dayStart.get(Calendar.MONTH), dayStart.get(Calendar.DAY_OF_MONTH), 0, 0, 0);
		Calendar dayEnd = (Calendar) dayStart.clone();
		dayEnd.add(Calendar.DAY_OF_MONTH, 1);
		long today = this.clientDao.getQueryCount(this.buildCondition(dayStart, dayEnd));
		
		org.json.JSONObject res = JsonResFactory.buildOrg(RESCODE.SUCCESS);
		res.put(Constants.RESPONSE_REAL_SIZE_KEY, all);
		res.put("thisMonth", thisMonth);
		res.put("today", today);
		return res.toString();
	}
	
	private String buildCondition(Calendar start, Calendar end){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		StringBuilder condition = new StringBuilder();
		condition.append("createDate >= '");
		condition.append(sdf.format(start.getTime()));
		condition.append("' and createDate < '");
		condition.append(sdf.format(end.getTime()));
		condition.append("'");
		return condition.toString();
	}

	public String consumHistory(int clientId, Date startTime, Date endTime, int page, int number) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		StringBuilder con = new StringBuilder();
		if(startTime != null){
			con.append("payDate >= '");
			con.append(sdf.format(startTime));
			con.append("'");
		}
		if(endTime != null){
			if(con.length() > 0){
				con.append(" and ");
			}
			con.append("payDate < '");
			con.append(sdf.format(endTime));
			con.append("'");
		}
		String condition = con.toString();
		int from = (page - 1) * number;
		List<IncomeOrder> list = this.incomeOrderDao.listIncomeOrderByClientId(condition.toString(), clientId, from, number);
		if(list == null || list.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		long realSize = this.incomeOrderDao.countIncomeOrderByClientId(condition, clientId);
		int size = (int) Math.ceil(realSize/(double)number);
		double amount = this.incomeOrderDao.countAmountByClientId(condition, clientId);
		net.sf.json.JSONObject obj = JsonResFactory.buildNetWithData(RESCODE.SUCCESS, 
				net.sf.json.JSONArray.fromObject(list, JsonResFactory.dateConfig()));
		obj.put(Constants.RESPONSE_REAL_SIZE_KEY, realSize);
		obj.put(Constants.RESPONSE_SIZE_KEY, size);
		obj.put(Constants.RESPONSE_AMOUNT_KEY, amount);
		return obj.toString();
	}

}
