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
	}

});