Ext.define('Neighborhood.controller.profileController',{
	
	extend: 'Ext.app.Controller',
	
	
	enableEdit : function(blockName){
		$('.profileViewCls .aboutPanelCls .pmb-block .pmbb-body.'+blockName+' .pmbb-view')[0].style.display = "none";
		$('.profileViewCls .aboutPanelCls .pmb-block .pmbb-body.'+blockName+' .pmbb-edit')[0].style.display = "block";
	},
	
	cancelEdit : function(blockName){
		$('.profileViewCls .aboutPanelCls .pmb-block .pmbb-body.'+blockName+' .pmbb-view')[0].style.display = "block";
		$('.profileViewCls .aboutPanelCls .pmb-block .pmbb-body.'+blockName+' .pmbb-edit')[0].style.display = "none";
	},
	
	saveInfo : function(blockName){
		var json = {};
		if(blockName == "basicInfo"){
			//TODO : See how to save name i.e. it should have an option of both first and last name
			json.gender = $('#basic_info_gender_edit_id')[0].value;
			json.DOB = $('#basic_info_birthday_edit_id')[0].value;
			json.relationship_status = $('#basic_info_rel_status_edit_id')[0].value;
			
			
			//update the UI and store with changed values
			$('#basic_info_gender_id')[0].innerText = $('#basic_info_gender_edit_id')[0].value;
			$('#basic_info_birthday_id')[0].innerText = $('#basic_info_birthday_edit_id')[0].value;
			$('#basic_info_rel_status_id')[0].innerText = $('#basic_info_rel_status_edit_id')[0].value;
			
			var record = Ext.getStore('userProfileStore').getAt(0);  		//Assuming store contain only one data i.e. logged in user data
			record.set('gender',json.gender);
			record.set('DOB',json.DOB);
			record.set('relationship_status',json.relationship_status);
			
		}
		
		
		Neighborhood.request.DataService.updateUserData(json,function(result){
			console.log(result);
			console.log("Succesfully updated user record in table");
		},function(result){
			console.log(result);
		},this);
	}

});