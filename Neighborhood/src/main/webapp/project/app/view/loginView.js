Ext.define('Neighborhood.view.loginView',{
	
	extend: 'Ext.Panel',
	xtype: 'loginView',
	
	config:{
		cls: 'loginViewCls'+(Neighborhood.util.isPhone() ? ' loginViewPhoneCls' : ''),
		listeners:{},
		
		items:[
		       {
		    	   xtype:"toolbar",
		    	   cls:"loginToolbarCls",
		    	   itemId:"loginToolbarId",
		    	   docked: 'top',
		    	   html : '<div class="loginToolbarTextCls"><span class="spanTitle">Neighborhood.com         </span><span class="spanDesc">The private special network for your locality</span></div>'
		       },
		       {
		    	   xtype:"panel",
		    	   cls:"loginPanelCls",
		    	   centered : true,
		    	   itemId:"loginPanelId",
		    	   items:[
							{
							    xtype: 'fieldset',
							    itemId : "panelFieldSetID",
							    //title : 'Create Account',
							    items: [
									{
									    xtype: 'textfield',
									    placeHolder: 'Name',
									    itemId:"userNameID",
									    cls:"loginPanelTextFieldCls",
									    hidden : true,
									    //value:"Atishay Verma",
									    required: true
									},
							        {
							            xtype: 'textfield',
							            placeHolder: 'Email Address',
							            itemId:"userEmailID",
							            cls:"loginPanelTextFieldCls",
							            //value:"Atishay Verma",
							            required: true
							        },
							        {
							            xtype: 'passwordfield',
							            placeHolder: 'Password',
							            itemId:"passwordID",
							            cls:"loginPanelTextFieldCls",
							            //value:"atishayv123@12",
							            required: true
							        },
							    ]
							},
							{
							    xtype: 'button',
							    itemId: 'createAccButton',
							    ui: 'action',
							    cls : 'loginBtnCls',
							    padding: '10px',
							    text: 'Create Account',
							    hidden : true,
							    handler : function(cmp){
							    	
							    	/*var request1 = { userName:"Ayush",password:"ayush",email:"ayush@ayush.com", action:"newUserRegister" }; 
							    	
							    	var jsonString1 = JSON.stringify({			
						    			requestObject : request1
						    		});
							    	
							    	console.log(jsonString1);
							    	
							    	$.ajax({
										url : "http://192.168.21.193:8093/Neighborhood/NeighborhoodProxy",
										type : "POST",
										data 	: jsonString1,
										dataType : "json",
										success : function(data) {
											console.log(data);
										},
										error : function(data) {
											console.log(data);
										}
									});*/
							    	Neighborhood.request.DataService.newUserRegister();
							    	
							    }
							},
							{
							    xtype: 'button',
							    itemId: 'loginAccButton',
							    ui: 'action',
							    cls : 'loginBtnCls',
							    padding: '10px',
							    text: 'Sign In',
							    handler : function(cmp){}
							},
							{
							    xtype: 'button',
							    itemId: 'facebookAccButton',
							    ui: 'action',
							    cls : 'facebookBtnCls',
							    padding: '10px',
							    text: 'Connect with Facebook',
							    handler : function(cmp){
							    	/*FB.getLoginStatus(function(response) {
							    		  if (response.status === 'connected') {
							    		    console.log('Logged in.');
							    		    FB.api(
							    		    	    "/me?fields=id,name,picture",
							    		    	    function (response) {
							    		    	      if (response && !response.error) {
							    		    	         handle the result 
							    		    	    	  console.log(response);
							    		    	      }
							    		    	    }
							    		    	);
							    		  }
							    		  else {
							    		    FB.login();
							    		  }
							    		});*/
							    	
							    	Neighborhood.app.getController('MainController').onLoginSuccess();
							    }
							},
							{
								xtype : 'component',
								cls : 'registerComponentCls',
								itemId : 'loginTextCmpId',
								html : '<p class="register-account"> <a onclick="Neighborhood.app.getController(\'loginController\').showCreateAccountPanel()" class="register-link">Need an account? <strong>Register here </strong><i class="fa fa-arrow-right"></i></a><br><a class="password-link"><small>Forgot your password?</small></a> </p>',
							},
							{
								xtype : 'component',
								cls : 'registerComponentCls',
								itemId : 'registerTextCmpId',
								hidden : true,
								html : '<p class="register-account"><i class="fa fa-arrow-left"></i><a onclick="Neighborhood.app.getController(\'loginController\').showLoginPanel()" class="register-link">Back to <strong>Login </strong></a></p>',
							}
		    	         ]
		       }
		       ]
		
	},
	
	initialize: function(){
		this.callParent(arguments);
	},
	
});