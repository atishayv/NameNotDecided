/**
 * Class provides data Service
 */

//Ext.namespace('SmartHub.app.data');

Ext.define('Neighborhood.request.DataService',{
	singleton: true,

	
	newUserRegister : function(userName,password,mailId,userCode,successCallBk,failureCallBk,scope){
		var reqObj = {
				requestObject : { userName:"Ayush",
									password:"ayush",
									email:"ayush@ayush.com", 
									action:"newUserRegister" 
								}
				/*action:'createNewUser',
				userName : userName,
				password : password,
				mailId : mailId,
				userCode : userCode,*/
		};
		Neighborhood.request.Service.makeServerRequest(reqObj,'POST', successCallBk, failureCallBk, this);
	},
	
});
