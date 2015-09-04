package com.services.neighbour.utils;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {
	public static SessionFactory getSessionFactory() {
		// 1. configuring hibernate
		Configuration configuration = new Configuration().configure();

		// 2. create sessionfactory
		SessionFactory sessionFactory = configuration.buildSessionFactory();
		
		return sessionFactory;
	}
	
	public static void shutdown() {
	        // Close caches and connection pools
	        getSessionFactory().close();
	}
}
