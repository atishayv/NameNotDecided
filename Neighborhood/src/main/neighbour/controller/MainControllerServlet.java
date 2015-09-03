package controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONException;
import org.json.JSONObject;

import sun.org.mozilla.javascript.internal.json.JsonParser;
import dao.UserDAO;

public class MainControllerServlet {
	
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		try{
			
			JSONObject requestObject = new JSONObject(request.getParameter("requestObject"));
			
			if(requestObject.getString("action").equalsIgnoreCase("newUserRegister")){
				
				String userName = requestObject.getString("userName");
				String password = requestObject.getString("password");
				String email = requestObject.getString("email");
				String phone = requestObject.getString("phone");
				String currentAddress = requestObject.getString("currentAddress");
				
				HttpSession session = request.getSession(true);
				
				try {
					UserDAO userDAO = new UserDAO();
					JSONObject responseObj = userDAO.newUserRegister(userName, password, email, phone, currentAddress);
					//esponse.sendRedirect("Success");
					
					PrintWriter writer = response.getWriter();
					writer.print("");
					writer.close();
				} catch (Exception e) {

					e.printStackTrace();
				}
				
				
			}
			else if(requestObject.getString("action").equalsIgnoreCase("userLogin")){
				
				String emailId = requestObject.getString("emailId");
				String password = requestObject.getString("password");
				try {
					UserDAO userDAO = new UserDAO();
					userDAO.userLogin(emailId, password);
					//esponse.sendRedirect("Success");
					
				} catch (Exception e) {

					e.printStackTrace();
				}
				
			}	
			
			
		}catch(JSONException e){
			
		}
		
		
		
		
		

	}
}
