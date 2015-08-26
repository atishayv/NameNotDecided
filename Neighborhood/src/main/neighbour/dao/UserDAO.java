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

	public JSONObject newUserRegister(String userName, String password, String email,
			String phone, String currentAddress) {
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
				user.setCurrentAddress(currentAddress);
				user.setPhone(phone);
				session.save(user);
				transaction.commit();
			}
			
			System.out.println("\n\n User registered successfully \n");
			JSONObject responseObj = new JSONObject();
			responseObj.put("RESPONSE_STATUS", "SUCCESS");
			responseObj.put("RESPONSE_OBJECT", "SUCCESS");

		} catch (HibernateException e) {
			System.out.println(e.getMessage());
			System.out.println("error");
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
	public void userLogin(String emailId, String password){
		try {
			
			Session session = HibernateUtil.getSessionFactory().openSession();
			
			
			
		} catch (Exception e) {
			// TODO: handle exception
		}
	}
}
