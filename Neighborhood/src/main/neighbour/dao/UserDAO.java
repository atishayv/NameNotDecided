package dao;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.json.JSONException;
import org.json.JSONObject;

import utils.HibernateUtil;
import bean.User;

public class UserDAO {

	public JSONObject newUserRegister(String userName, String password, String email
			) {
		
		JSONObject responseObj = new JSONObject();
		try {
			
			// 3. Get Session object
			Session session = HibernateUtil.getSessionFactory().openSession();

			// 4. Starting Transaction
			Transaction transaction = session.beginTransaction();
			
			if(session.isConnected()){
				User user = new User();
				user.setUserName(userName);
				user.setPassword(password);
				user.setEmail(email);
				session.save(user);
				transaction.commit();
			}
			
			System.out.println("\n\n User registered successfully \n");
			
			responseObj.put("RESPONSE_STATUS", "SUCCESS");
			
			JSONObject responseObj_Object = new JSONObject();
			
			responseObj_Object.put("Message", "Registration Success");
			responseObj_Object.put("userName", userName);
			
			responseObj.put("RESPONSE_OBJECT", responseObj_Object);
			
		} catch (HibernateException e) {
			System.out.println(e.getMessage());
			System.out.println("error");
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
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
}
