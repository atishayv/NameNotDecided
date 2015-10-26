/**
 * Class provides data Service
 */

//Ext.namespace('SmartHub.app.data');

Ext.define('Neighborhood.request.DataService',{
	singleton: true,

	
	newUserRegister : function(first_name,last_name,emailId,password,successCallBk,failureCallBk,scope){
		var reqObj = { 
				first_name:first_name,
				last_name:last_name,
				password:password,
				email:emailId, 
				action:"newUserRegister" 
			};
		Neighborhood.request.Service.makeServerRequest(reqObj,'POST', successCallBk, failureCallBk, scope);
	},
	
	doLogin : function(emailId,password,successCallBk,failureCallBk,scope){
		var reqObj = { 
				password:password,
				email:emailId, 
				action:"login" 
			};
		Neighborhood.request.Service.makeServerRequest(reqObj,'POST', successCallBk, failureCallBk, scope);
	},
	
	updateUserData : function(data,successCallBk,failureCallBk,scope){
		var reqObj = {
				action : 'updateUserData',
				data : data
		}
		Neighborhood.request.Service.makeServerRequest(reqObj,'POST', successCallBk, failureCallBk, scope);
	},
	
	update_profile_pic : function(data,successCallBk,failureCallBk,scope){
		var reqObj = {
				action : 'update_profile_pic',
				data : data
		}
		Neighborhood.request.Service.makeServerRequest(reqObj,'POST', successCallBk, failureCallBk, scope);
	},
	
});
