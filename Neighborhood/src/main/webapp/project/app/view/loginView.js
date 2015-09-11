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
							    	
							    	var userName = cmp.up().getComponent('panelFieldSetID').getComponent('userNameID').getValue();
							    	var emailId = cmp.up().getComponent('panelFieldSetID').getComponent('userEmailID').getValue();
							    	var password = cmp.up().getComponent('panelFieldSetID').getComponent('passwordID').getValue();
							    	
							    	
							    	var emailFilter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
								    var illegalChars= /[\(\)\<\>\,\;\:\\\"\[\]]/ ;
							    	if(userName=="" || userName==null || emailId=="" || emailId==null ||password=="" || password==null){
							    		Ext.Msg.show({
								             title : 'Error',
											 message: 'Please enter all the fields correctly',
								             cls: 'alertMsgCls',
								             buttons: Ext.MessageBox.OK,
										});
							    	}else if(!emailFilter.test(emailId) || emailId.match(illegalChars)){
							    		Ext.Msg.show({
								             title : 'Error',
											 message: 'Please enter a valid email-id',
								             cls: 'alertMsgCls',
								             buttons: Ext.MessageBox.OK,
										});
							    	}else{
							    		Neighborhood.request.DataService.newUserRegister(userName,emailId,password,function(result){
							    			console.log("success"+result);
							    			if(result == "User already exist"){
							    				Ext.Msg.show({
										             title : 'Error',
													 message: 'User with same creadentials already exist. Please try again',
										             cls: 'alertMsgCls',
										             buttons: Ext.MessageBox.OK,
												});
							    			}else if(result == "Successfully inserted user in DB"){
							    				Ext.Msg.show({
										             title : 'Info',
													 message: 'Successfully created user. Login again to continue..',
										             cls: 'alertMsgCls',
										             buttons: Ext.MessageBox.OK,
										             fn: function(buttonId) {
										            	 //switch to login view
										            	 Neighborhood.app.getController('loginController').showLoginPanel();
										             }
												});
							    			}else{
							    				Ext.Msg.show({
										             title : 'Error',
													 message: 'Something went wrong. Please try again.',
										             cls: 'alertMsgCls',
										             buttons: Ext.MessageBox.OK,
												});
							    			}
							    		},function(result){
							    			console.log(result);
							    			Ext.Msg.show({
									             title : 'Error',
												 message: 'Something went wrong. Please try again.',
									             cls: 'alertMsgCls',
									             buttons: Ext.MessageBox.OK,
											});
							    		},this);
							    	}
							    	
							    }
							},
							{
							    xtype: 'button',
							    itemId: 'loginAccButton',
							    ui: 'action',
							    cls : 'loginBtnCls',
							    padding: '10px',
							    text: 'Sign In',
							    handler : function(cmp){
							    	var emailId = cmp.up().getComponent('panelFieldSetID').getComponent('userEmailID').getValue();
							    	var password = cmp.up().getComponent('panelFieldSetID').getComponent('passwordID').getValue();
							    	var emailFilter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
								    var illegalChars= /[\(\)\<\>\,\;\:\\\"\[\]]/ ;
							    	if(emailId=="" || emailId==null ||password=="" || password==null){
							    		Ext.Msg.show({
								             title : 'Error',
											 message: 'Please enter all the fields correctly',
								             cls: 'alertMsgCls',
								             buttons: Ext.MessageBox.OK,
										});
							    	}else if(!emailFilter.test(emailId) || emailId.match(illegalChars)){
							    		Ext.Msg.show({
								             title : 'Error',
											 message: 'Please enter a valid email-id',
								             cls: 'alertMsgCls',
								             buttons: Ext.MessageBox.OK,
										});
							    	}else{
							    		Neighborhood.request.DataService.doLogin(emailId,password,function(result){
							    			if(result=="User does not exist"){
							    				Ext.Msg.show({
										             title : 'Error',
													 message: 'Please enter a valid emailId or password',
										             cls: 'alertMsgCls',
										             buttons: Ext.MessageBox.OK,
												});
							    			}else{
							    				result = JSON.parse(result);
							    				if(result && result.length>0){
							    					if(result[0].locality_id<1){
							    						//adding the user deatils into store
							    						Ext.getStore('userProfileStore').add({
							    							mailId : result[0].mail_id,
							    							firstName : result[0].first_name,
							    							name : result[0].first_name,
							    							userId : result[0].user_id
							    						});
							    						Neighborhood.app.getController('MainController').showMainView(true);
							    					}
							    				}
							    			}
							    		},function(result){
							    			console.log(result);
							    			Ext.Msg.show({
									             title : 'Error',
												 message: 'Something went wrong. Please try again.',
									             cls: 'alertMsgCls',
									             buttons: Ext.MessageBox.OK,
											});
							    		},this);
							    	}
							    }
							},
							{
							    xtype: 'button',
							    itemId: 'facebookAccButton',
							    ui: 'action',
							    cls : 'facebookBtnCls',
							    padding: '10px',
							    text: 'Connect with Facebook',
							    handler : function(cmp){
							    	FB.getLoginStatus(function(response) {
							    		  if (response.status === 'connected') {
							    		    console.log('Logged in.');
							    		    FB.api(
							    		    	    "/me?fields=id,name,picture,about,bio,birthday,education,email,gender,first_name,last_name,relationship_status,work",
							    		    	    function (response) {
							    		    	      if (response && !response.error) {
							    		    	    	  console.log(response);
							    		    	    	  Neighborhood.request.DataService.newUserRegister(response.name,response.email,'',function(result){
							    		    	    		 console.log(result); 
							    		    	    		 Neighborhood.app.getController('loginController').onLoginSuccess(response);
							    		    	    	  },function(result){
							    		    	    		  console.log(result); 
							    		    	    	  });
							    		    	    	  
							    		    	      }
							    		    	    }
							    		    	);
							    		  }
							    		  else {
							    		    FB.login(function(response) {
							    		    	   // handle the response
							    		    	console.log(response);
							    		    	FB.api(
								    		    	    "/me?fields=id,name,about,bio,birthday,education,email,gender,picture,first_name,last_name,relationship_status,work",
								    		    	    function (response) {
								    		    	      if (response && !response.error) {
								    		    	    	  console.log(response);
								    		    	    	  Neighborhood.request.DataService.newUserRegister(response.name,response.email,'',function(result){
								    		    	    		 console.log(result); 
								    		    	    		 Neighborhood.app.getController('loginController').onLoginSuccess(response);
								    		    	    	  },function(result){
								    		    	    		  console.log(result); 
								    		    	    	  });
								    		    	      }
								    		    	    }
								    		    	);
							    		    }, {scope: 'email,user_birthday,user_about_me,user_education_history,user_relationships,user_work_history'});
							    		  }
							    		});
							    	
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