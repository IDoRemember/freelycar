package com.geariot.platform.freelycar.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.geariot.platform.freelycar.dao.CardDao;
import com.geariot.platform.freelycar.entities.Card;
import com.geariot.platform.freelycar.entities.CardProjectRemainingInfo;
import com.geariot.platform.freelycar.utils.Constants;

@Repository
public class CardDaoImpl implements CardDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	private Session getSession() {
		return this.sessionFactory.getCurrentSession();
	}
	
	@Override
	public Card getCardById(int id) {
		String hql = "from Card where id = :id";
		return (Card) this.getSession().createQuery(hql).setInteger("id", id)
				.setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@Override
	public CardProjectRemainingInfo getProjectRemainingInfo(int cardId, int projectId) {
		String hql = "from CardProjectRemainingInfo where cardId = :cardId and projectId = :projectId";
		return (CardProjectRemainingInfo) this.getSession().createQuery(hql).setInteger("cardId", cardId).setInteger("projectId", projectId)
				.setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Card> findByMakerAccount(String account) {
		String hql = "from Card where orderMaker.account = :account";
		return this.getSession().createQuery(hql).setString("account", account)
				.setCacheable(Constants.SELECT_CACHE).list();
	}

	@Override
	public long countProjectByIds(List<Integer> ids) {
		String hql = "select count(*) from CardProjectRemainingInfo where project.id in :list";
		return (long) this.getSession().createQuery(hql).setParameterList("list", ids)
				.setCacheable(Constants.SELECT_CACHE).uniqueResult();
	}

}
