package com.services.neighbour.dao;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.json.JSONException;
import org.json.JSONObject;

import com.services.neighbour.utils.HibernateUtil;
import com.services.neighbour.bean.User;

public class UserDAO {

	public JSONObject newUserRegister(String userName, String password, String email
			) {
		JSONObject responseObj = new JSONObject();
		
		//Get Session object
		Session session = HibernateUtil.getSessionFactory().openSession();

		try {
			
			
			// 4. Starting Transaction
			Transaction transaction = session.beginTransaction();
			
			User user = new User();
			user.setUserId(userName);
			user.setPassword(password);
			user.setEmail(email);
			session.save(user);
			transaction.commit();
			
			System.out.println("\n\n User registered successfully \n");
			
			responseObj.put("RESPONSE_STATUS", "SUCCESS");
			
			JSONObject responseObj_Object = new JSONObject();
			
			responseObj_Object.put("Message", "Registration Success");
			responseObj_Object.put("userName", userName);
			
			responseObj.put("RESPONSE_OBJECT", responseObj_Object);
			
		} catch (HibernateException e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
			System.out.println("error");
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally{
			session.close();
		}
		return responseObj;
		
	}
	
	public void userLogin(String emailId, String password){
		try {
			
			Session session = HibernateUtil.getSessionFactory().openSession();
			
			
			
		} catch (Exception e) {
			// TODO: handle exception
		}
	}
	
	public void getAllUserDetails(){
		Session session = HibernateUtil.getSessionFactory().openSession();
		List<User> users = new ArrayList<User>();
        Transaction trns = null;
		trns = session.beginTransaction();
        users = session.createQuery("from User").list();
        
        for (int i = 0; i < users.size(); i++) {
			System.out.println(users.get(i).getUserId());
		}
	}
}
