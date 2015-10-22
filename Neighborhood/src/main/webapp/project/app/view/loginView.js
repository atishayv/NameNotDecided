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
									    placeHolder: 'First Name',
									    itemId:"user_first_name_id",
									    cls:"loginPanelTextFieldCls",
									    hidden : true,
									    //value:"Atishay",
									    required: true
									},
									{
									    xtype: 'textfield',
									    placeHolder: 'Last Name',
									    itemId:"user_last_name_id",
									    cls:"loginPanelTextFieldCls",
									    hidden : true,
									    //value:"Verma",
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
							    	
							    	var user_first_name = cmp.up().getComponent('panelFieldSetID').getComponent('user_first_name_id').getValue();
							    	var user_last_name = cmp.up().getComponent('panelFieldSetID').getComponent('user_last_name_id').getValue();
							    	var emailId = cmp.up().getComponent('panelFieldSetID').getComponent('userEmailID').getValue();
							    	var password = cmp.up().getComponent('panelFieldSetID').getComponent('passwordID').getValue();
							    	
							    	Neighborhood.app.getController('loginController').createAccount(user_first_name,user_last_name,emailId,password);
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
							    	Neighborhood.app.getController('loginController').doLogin(emailId,password);
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
							    	Neighborhood.app.getController('loginController').doFBLogin();
							    	
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