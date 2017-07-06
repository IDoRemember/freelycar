package com.geariot.platform.freelycar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.geariot.platform.freelycar.dao.CardDao;
import com.geariot.platform.freelycar.entities.Card;
import com.geariot.platform.freelycar.entities.Project;
import com.geariot.platform.freelycar.model.RESCODE;
import com.geariot.platform.freelycar.utils.JsonResFactory;

import net.sf.json.JsonConfig;

@Service
@Transactional
public class CardService {

	@Autowired
	private CardDao cardDao;
	
	public String getAvailableCard(int clientId, int projectId) {
		List<Integer> cardIds = this.cardDao.getAvailableCardId(projectId);
		if(cardIds == null || cardIds.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		List<Card> cards = this.cardDao.getAvailableCard(clientId, cardIds);
		if(cards == null || cards.isEmpty()){
			return JsonResFactory.buildOrg(RESCODE.NOT_FOUND).toString();
		}
		JsonConfig config = new JsonConfig();
		config.registerPropertyExclusion(Project.class, "inventoryInfos");
		return JsonResFactory.buildNetWithData(RESCODE.SUCCESS, net.sf.json.JSONArray.fromObject(cards, config)).toString();
	}
	
}
