/**
 * Class provides data Service
 */

//Ext.namespace('SmartHub.app.data');

Ext.define('Neighborhood.request.DataService',{
	singleton: true,

	
	newUserRegister : function(userName,emailId,password,successCallBk,failureCallBk,scope){
		var reqObj = { 
				userName:userName,
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
	
});
