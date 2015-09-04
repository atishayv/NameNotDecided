Ext.define('Neighborhood.controller.loginController',{
	
	extend: 'Ext.app.Controller',
	
	
	index : function(){
		this.loginView = Ext.create('Neighborhood.view.loginView');
		
		Ext.Viewport.add(this.loginView);
		Ext.Viewport.setActiveItem(this.loginView);
	},
	
	showCreateAccountPanel : function(){
		this.loginView.getComponent('loginPanelId').addCls('createAccCls');
		this.loginView.getComponent('loginPanelId').getComponent('panelFieldSetID').getComponent('userNameID').show();
		this.loginView.getComponent('loginPanelId').getComponent('createAccButton').show();
		this.loginView.getComponent('loginPanelId').getComponent('loginAccButton').hide();
		this.loginView.getComponent('loginPanelId').getComponent('facebookAccButton').hide();
		this.loginView.getComponent('loginPanelId').getComponent('loginTextCmpId').hide();
		this.loginView.getComponent('loginPanelId').getComponent('registerTextCmpId').show();
	},
	
	showLoginPanel : function(){
		this.loginView.getComponent('loginPanelId').removeCls('createAccCls');
		this.loginView.getComponent('loginPanelId').getComponent('panelFieldSetID').getComponent('userNameID').hide();
		this.loginView.getComponent('loginPanelId').getComponent('createAccButton').hide();
		this.loginView.getComponent('loginPanelId').getComponent('loginAccButton').show();
		this.loginView.getComponent('loginPanelId').getComponent('facebookAccButton').show();
		this.loginView.getComponent('loginPanelId').getComponent('loginTextCmpId').show();
		this.loginView.getComponent('loginPanelId').getComponent('registerTextCmpId').hide();
	},
	
	onLoginSuccess : function(response){
		//extracting user details
		var schoolName = "";
		var collegeName = "";
		for(var i=0;i<response.education.length;i++){
			if(response.education[i].type=="Graduate School")
				collegeName = response.education[i].school.name;
			else if(response.education[i].type.indexOf('School')!=-1)
				schoolName = response.education[i].school.name;
		}
		
		
		//adding the user deatils into store
		Ext.getStore('userProfileStore').add({
			birthday : response.birthday,
			mailId : response.email,
			gender : response.gender,
			firstName : response.first_name,
			lastName : response.last_name,
			name : response.name,
			relationshipStatus : response.relationship_status,
			college : collegeName,
			school : schoolName,
			workplace : response.work[0].employer.name,
			profilePic : 'http://graph.facebook.com/'+response.id+'/picture?type=large'
		});
		
		Neighborhood.app.getController('MainController').showMainView();
		
		//setting the userName and profilePic to view
		$('#profilePicId')[0].src = 'http://graph.facebook.com/'+response.id+'/picture?type=large';
		$('#profileNameId')[0].innerText = response.name;
	},

});