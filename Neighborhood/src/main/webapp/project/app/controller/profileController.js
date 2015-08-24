Ext.define('Neighborhood.controller.profileController',{
	
	extend: 'Ext.app.Controller',
	
	
	enableEdit : function(blockName){
		$('.profileViewCls .aboutPanelCls .pmb-block .pmbb-body.'+blockName+' .pmbb-view')[0].style.display = "none";
		$('.profileViewCls .aboutPanelCls .pmb-block .pmbb-body.'+blockName+' .pmbb-edit')[0].style.display = "block";
	},
	
	cancelEdit : function(blockName){
		$('.profileViewCls .aboutPanelCls .pmb-block .pmbb-body.'+blockName+' .pmbb-view')[0].style.display = "block";
		$('.profileViewCls .aboutPanelCls .pmb-block .pmbb-body.'+blockName+' .pmbb-edit')[0].style.display = "none";
	}

});