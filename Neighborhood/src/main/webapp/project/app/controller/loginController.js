Ext.define('Neighborhood.controller.loginController',{
	
	extend: 'Ext.app.Controller',
	
	
	index : function(){
		this.loginView = Ext.create('Neighborhood.view.loginView');
		
		Ext.Viewport.add(this.loginView);
		Ext.Viewport.setActiveItem(this.loginView);
	},
	
	showCreateAccountPanel : function(){
		var loginPanelId = this.loginView.getComponent('loginPanelId');
		loginPanelId.addCls('createAccCls'); 
		loginPanelId.getComponent('panelFieldSetID').getComponent('user_first_name_id').show();
		loginPanelId.getComponent('panelFieldSetID').getComponent('user_last_name_id').show();
		loginPanelId.getComponent('createAccButton').show();
		loginPanelId.getComponent('loginAccButton').hide();
		loginPanelId.getComponent('facebookAccButton').hide();
		loginPanelId.getComponent('loginTextCmpId').hide();
		loginPanelId.getComponent('registerTextCmpId').show();
	},
	
	showLoginPanel : function(){
		var loginPanelId = this.loginView.getComponent('loginPanelId');
		loginPanelId.removeCls('createAccCls');
		loginPanelId.getComponent('panelFieldSetID').getComponent('user_first_name_id').hide();
		loginPanelId.getComponent('panelFieldSetID').getComponent('user_last_name_id').hide();
		loginPanelId.getComponent('createAccButton').hide();
		loginPanelId.getComponent('loginAccButton').show();
		loginPanelId.getComponent('facebookAccButton').show();
		loginPanelId.getComponent('loginTextCmpId').show();
		loginPanelId.getComponent('registerTextCmpId').hide();
	},
	
	createAccount : function(first_name,last_name,emailId,password){
		
		var emailFilter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	    var illegalChars= /[\(\)\<\>\,\;\:\\\"\[\]]/ ;
    	if(first_name=="" || first_name==null || last_name=="" || last_name==null || emailId=="" || emailId==null ||password=="" || password==null){
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
    		Neighborhood.request.DataService.newUserRegister(first_name,last_name,emailId,password,function(result){
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
	},
	
	doLogin : function(emailId,password){
		
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
    				//adding the user deatils into store
    				var response  = JSON.parse(result)[0]
    				Ext.getStore('userProfileStore').add(response);
    				
    				Neighborhood.app.getController('MainController').showMainView(true);
    				
    				//setting the userName and profilePic to view
    				if(response.profile_pic)
    					$('#profilePicId')[0].src = response.profile_pic;
    				$('#profileNameId')[0].innerText = (response.first_name ? response.first_name+" " : "") + (response.last_name ? response.last_name : "");
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
	},
	
	doFBLogin : function(){
		
		FB.getLoginStatus(function(response) {
  		  if (response.status === 'connected') {
  		    console.log('Logged in.');
  		    FB.api(
  		    	    "/me?fields=id,name,picture,about,bio,birthday,education,email,gender,first_name,last_name,relationship_status,work",
  		    	    function (response) {
  		    	      if (response && !response.error) {
  		    	    	  console.log(response);
  		    	    	  //newUserRegister will either insert new user into DB if not exist or it will return User already exist
  		    	    	  Neighborhood.request.DataService.newUserRegister(response.first_name,response.last_name,response.email,'',function(result){
  		    	    		 console.log(result); 
  		    	    		 Neighborhood.app.getController('loginController').onFBLoginSuccess(response); //response is USer data coming from facebook
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
	    		    	    	  //newUserRegister will either insert new user into DB if not exist or it will return User already exist
	    		    	    	  Neighborhood.request.DataService.newUserRegister(response.first_name,response.last_name,response.email,'',function(result){
	    		    	    		 console.log(result); 
	    		    	    		 Neighborhood.app.getController('loginController').onFBLoginSuccess(response);//response is USer data coming from facebook
	    		    	    	  },function(result){
	    		    	    		  console.log(result); 
	    		    	    	  });
	    		    	      }
	    		    	    }
	    		    	);
  		    }, {scope: 'email,user_birthday,user_about_me,user_education_history,user_relationships,user_work_history'});
  		  }
  		});
	},
	
	onFBLoginSuccess : function(response){
		//response is User data coming from facebook
		
		//extracting user details
		var schoolName = "";
		var collegeName = "";
		if(response && response.education){
			for(var i=0;i<response.education.length;i++){
				if(response.education[i].type=="Graduate School")
					collegeName = response.education[i].school.name;
				else if(response.education[i].type.indexOf('School')!=-1)
					schoolName = response.education[i].school.name;
			}
		}
		
		var json = {
				DOB : response.birthday ? response.birthday : '',
				mail_id : response.email ? response.email : '',
				gender : response.gender ? response.gender : '',
				first_name : response.first_name ? response.first_name : '',
				last_name : response.last_name ? response.last_name : '',
				name : response.name ? response.name : '',
				relationship_status : response.relationship_status ? response.relationship_status : '',
				college : collegeName,
				school : schoolName,
				workplace :(response.work && response.work[0] && response.work[0]) ? response.work[0].employer.name : '',
				profile_pic : response.id ? 'http://graph.facebook.com/'+response.id+'/picture?type=large' : ''
			}
		
		//first update the user information coming from facebook to DB and then select all data from User_profile table and add it store
		Neighborhood.request.DataService.updateUserData(json,function(result){
			console.log(result);
			//get more information from user_profile table and add it to store
			
			//adding the user deatils into store
			Ext.getStore('userProfileStore').add(JSON.parse(result)[0]);
			
			
			
			Neighborhood.app.getController('MainController').showMainView();
			
			//setting the userName and profilePic to view
			$('#profilePicId')[0].src = 'http://graph.facebook.com/'+response.id+'/picture?type=large';
			$('#profileNameId')[0].innerText = response.name;
			
		},function(result){
			console.log(result);
		},this);
		
		
		
	},

});