package com.services.neighbour.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONException;
import org.json.JSONObject;

import com.services.neighbour.utils.HibernateUtil;
import com.services.neighbour.dao.UserDAO;

public class MainControllerServlet extends HttpServlet {
	
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		try{
			StringBuilder sb = new StringBuilder();
			String line;
			try {
			    BufferedReader reader = request.getReader();
			    while ((line = reader.readLine()) != null)
			    	sb.append(line);
			  } catch (Exception e) { /*report an error*/ }

		
			JSONObject jsonObjectRequest = new JSONObject(sb.toString());
			
			JSONObject requestObject = jsonObjectRequest.getJSONObject("requestObject");
			
			System.out.println(requestObject);
			
			if(requestObject.getString("action").equalsIgnoreCase("newUserRegister")){
				String userName = requestObject.getString("userName");
				String password = requestObject.getString("password");
				String email = requestObject.getString("email");
			/*	String phone = requestObject.getString("phone");
				String currentAddress = requestObject.getString("currentAddress");
			*/	
				HttpSession session = request.getSession(true);
				
				try {
					UserDAO userDAO = new UserDAO();
					JSONObject responseObj = userDAO.newUserRegister(userName, password, email);
					//esponse.sendRedirect("Success");
					
					PrintWriter writer = response.getWriter();
					writer.print(responseObj);
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
			else if(requestObject.getString("action").equalsIgnoreCase("getAllUserDetails")){
				
				try {
					UserDAO userDAO = new UserDAO();
					userDAO.getAllUserDetails();
					//esponse.sendRedirect("Success");
					
				} catch (Exception e) {

					e.printStackTrace();
				}
				
				
			}
			
		}catch(JSONException e){
			e.printStackTrace();
		}
		finally{
			HibernateUtil.shutdown();
		}
		

	}
}
