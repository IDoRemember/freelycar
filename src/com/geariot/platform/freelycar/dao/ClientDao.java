package com.geariot.platform.freelycar.dao;

import java.util.List;

import com.geariot.platform.freelycar.entities.Client;

public interface ClientDao {
	
	List<Client> list(int from, int pageSize);

	long getCount();
	
	Client findByPhone(String phone);
	
	Client findById(int clientId);

	void save(Client client);
	
	void delete(List<Integer> clientId);
	
}
