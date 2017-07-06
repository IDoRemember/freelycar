package com.geariot.platform.freelycar.dao;

import java.util.List;

import com.geariot.platform.freelycar.entities.Card;
import com.geariot.platform.freelycar.entities.CardProjectRemainingInfo;

public interface CardDao {
	
	Card getCardById(int id);
	
	CardProjectRemainingInfo getProjectRemainingInfo(int cardId, int projectId);
	
	List<Card> findByMakerAccount(String account);
	
	long countProjectByIds(List<Integer> ids);
	
}
