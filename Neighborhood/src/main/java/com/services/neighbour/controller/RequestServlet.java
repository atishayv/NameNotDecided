package com.services.neighbour.controller;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.OutputStream;
import java.sql.*;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.google.gson.JsonObject;
import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;

public class RequestServlet extends HttpServlet{
	
	private MysqlDataSource datasource;
	
	// JDBC driver name and database URL
   static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";  
   static final String DB_URL = "jdbc:mysql://localhost/localitydb";

   //  Database credentials
   static final String USER = "root";
   static final String PASS = "root";
	   
	
	@Override
	public void init() throws ServletException {
		// TODO Auto-generated method stub
		super.init();
		 try {
			 datasource = new MysqlDataSource();
			 datasource.setUrl(DB_URL);
			 datasource.setUser("root");
			 datasource.setPassword("root");
	    }
	    catch (Exception e) {
	      e.printStackTrace();
	    }
	}
	
	private Connection getConnection() throws SQLException {
	    return datasource.getConnection();
	}
	
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		//super.doGet(req, resp);
		System.out.println("Inside doGet");
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		//super.doPost(req, resp);
		
		 Connection connection=null;
		 Statement stmt = null;
		 ResultSet rs = null;
	    try {
	      connection = getConnection();
	      //..<do JDBC work>..
				StringBuilder sb = new StringBuilder();
				String line;
				try {
				    BufferedReader reader = req.getReader();
				    while ((line = reader.readLine()) != null)
				    	sb.append(line);
				  } catch (Exception e) { /*report an error*/ }

			
				JSONObject requestObject = new JSONObject(sb.toString());
				
				System.out.println(requestObject);
				
				if(requestObject.getString("action").equalsIgnoreCase("newUserRegister")){
					String userName = requestObject.getString("userName");
					String password = requestObject.getString("password");
					String email = requestObject.getString("email");
					
					
					stmt = connection.createStatement();
				    String sql;
				    sql = "SELECT * FROM USER_DATA WHERE mail_id='"+email+"'";
				    rs = stmt.executeQuery(sql);
				    if (!rs.isBeforeFirst() ) {
				    	 sql = "INSERT INTO USER_DATA (password,first_name,mail_id) VALUES ('"+password+"','"+userName+"','"+email+"')";
				    	 System.out.println(sql);
				    	 stmt.executeUpdate(sql);
				    	 String responseStr = "Successfully inserted user in DB";
			    		resp.setHeader("Cache-Control", "no-cache");
						sendResponse(resp,responseStr.getBytes("UTF-8")); 
			    	}else{
			    		String responseStr = "User already exist";
			    		resp.setHeader("Cache-Control", "no-cache");
						sendResponse(resp,responseStr.getBytes("UTF-8"));
			    		
			    	}
				}else if(requestObject.getString("action").equalsIgnoreCase("login")){
					String password = requestObject.getString("password");
					String email = requestObject.getString("email");
					
					stmt = connection.createStatement();
				    String sql;
				    sql = "SELECT * FROM USER_DATA WHERE mail_id='"+email+"' AND password='"+password+"'";
				    rs = stmt.executeQuery(sql);
				    if (!rs.isBeforeFirst() ) {
				    	String responseStr = "User does not exist";
			    		resp.setHeader("Cache-Control", "no-cache");
						sendResponse(resp,responseStr.getBytes("UTF-8")); 
				    }else{
				    	JSONArray responseArr = convertToArray(rs);
				    	resp.setHeader("Cache-Control", "no-cache");
						sendResponse(resp,responseArr.toString().getBytes("UTF-8"));
				    	
				    }
				}else if(requestObject.getString("action").equalsIgnoreCase("updateUserData")){
					JSONObject data = new JSONObject(requestObject.getString("data"));
					String dateString = "";
					
					if(!data.getString("birthday").equalsIgnoreCase("")){
						java.util.Date dt = new java.util.Date(data.getString("birthday"));
						 java.text.SimpleDateFormat sdf = 
							     new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
						 dateString = "DOB='"+sdf.format(dt)+"',";
					}
					
					 String sql = "UPDATE USER_DATA SET first_name='"+data.getString("firstName")+"',"
					 		+ "last_name='"+data.getString("lastName")+"',"
					 		+ "profile_pic='"+data.getString("profilePic")+"',"
					 		+ dateString
					 		+ "school='"+data.getString("school")+"',"
					 		+ "college='"+data.getString("college")+"',"
					 		+ "workplace='"+data.getString("workplace")+"',"
					 		+ "gender='"+data.getString("gender").substring(0, 1)+"' WHERE mail_id='"+data.getString("mailId")+"'";
					System.out.println(sql);
					stmt = connection.createStatement();
					stmt.executeUpdate(sql);
			    	String responseStr = "Successfully updated user in DB";
		    		resp.setHeader("Cache-Control", "no-cache");
					sendResponse(resp,responseStr.getBytes("UTF-8"));
				}
				
	      
	    }
	    catch(JSONException e){
			e.printStackTrace();
		}
	    catch (SQLException sqlException) {
	      sqlException.printStackTrace();
	    }
	    catch (Exception e) {
		      e.printStackTrace();
		}
	    finally {
    	  if (rs != null) 
	        try {rs.close();} catch (SQLException e) {}
    	  if (stmt != null) 
		    try {stmt.close();} catch (SQLException e) {}
	      if (connection != null) 
	        try {connection.close();} catch (SQLException e) {}
	    }
	}
	
	
	
	 public static JSONArray convertToArray( ResultSet rs )
			    throws SQLException, JSONException
	  {
	    JSONArray json = new JSONArray();
	    ResultSetMetaData rsmd = rs.getMetaData();

	    while(rs.next()) {
	      int numColumns = rsmd.getColumnCount();
	      JSONObject obj = new JSONObject();

	      for (int i=1; i<numColumns+1; i++) {
	        String column_name = rsmd.getColumnName(i);

	        if(rsmd.getColumnType(i)==java.sql.Types.ARRAY){
	         obj.put(column_name, rs.getArray(column_name));
	        }
	        else if(rsmd.getColumnType(i)==java.sql.Types.BIGINT){
	         obj.put(column_name, rs.getInt(column_name));
	        }
	        else if(rsmd.getColumnType(i)==java.sql.Types.BOOLEAN){
	         obj.put(column_name, rs.getBoolean(column_name));
	        }
	        else if(rsmd.getColumnType(i)==java.sql.Types.BLOB){
	         obj.put(column_name, rs.getBlob(column_name));
	        }
	        else if(rsmd.getColumnType(i)==java.sql.Types.DOUBLE){
	         obj.put(column_name, rs.getDouble(column_name)); 
	        }
	        else if(rsmd.getColumnType(i)==java.sql.Types.FLOAT){
	         obj.put(column_name, rs.getFloat(column_name));
	        }
	        else if(rsmd.getColumnType(i)==java.sql.Types.INTEGER){
	         obj.put(column_name, rs.getInt(column_name));
	        }
	        else if(rsmd.getColumnType(i)==java.sql.Types.NVARCHAR){
	         obj.put(column_name, rs.getNString(column_name));
	        }
	        else if(rsmd.getColumnType(i)==java.sql.Types.VARCHAR){
	         obj.put(column_name, rs.getString(column_name));
	        }
	        else if(rsmd.getColumnType(i)==java.sql.Types.TINYINT){
	         obj.put(column_name, rs.getInt(column_name));
	        }
	        else if(rsmd.getColumnType(i)==java.sql.Types.SMALLINT){
	         obj.put(column_name, rs.getInt(column_name));
	        }
	        else if(rsmd.getColumnType(i)==java.sql.Types.DATE){
	         obj.put(column_name, rs.getDate(column_name));
	        }
	        else if(rsmd.getColumnType(i)==java.sql.Types.TIMESTAMP){
	        obj.put(column_name, rs.getTimestamp(column_name));   
	        }
	        else{
	         obj.put(column_name, rs.getObject(column_name));
	        }
	      }

	      json.put(obj);
	    }

	    return json;
	  }
	 
	 
	 private static void sendResponse(HttpServletResponse response, byte[] data){
			OutputStream out = null;
			try {

				response.setStatus( HttpServletResponse.SC_OK );
				response.setContentLength(data.length);
				out = response.getOutputStream();
				out.write(data);
				out.flush();
			} catch (IOException e) {
				System.out.println("Exception while sending response"+e);
			} finally {
				try{
					out.close();
				}catch (Exception e) {
				}
			}
		}

}
