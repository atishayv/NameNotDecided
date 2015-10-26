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
			json.DOB = Neighborhood.util.convertToDate($('#basic_info_birthday_edit_id')[0].value);
			json.relationship_status = $('#basic_info_rel_status_edit_id')[0].value;
			
			
			//update the UI and store with changed values
			$('#basic_info_gender_id')[0].innerText = $('#basic_info_gender_edit_id')[0].value;
			$('#basic_info_birthday_id')[0].innerText = $('#basic_info_birthday_edit_id')[0].value;
			$('#basic_info_rel_status_id')[0].innerText = $('#basic_info_rel_status_edit_id')[0].value;
			
			var record = Ext.getStore('userProfileStore').getAt(0);  		//Assuming store contain only one data i.e. logged in user data
			record.set('gender',json.gender);
			record.set('DOB',json.DOB);
			record.set('relationship_status',json.relationship_status);
			
			json.mail_id = record.get('mail_id');
			
		}else if(blockName == "contact"){
			//TODO : see on how to not provide option of editing mail_id
			json.contact_number = $('#basic_info_contact_number_edit_id')[0].value;
			
			//update the UI and store with changed values
			$('#basic_info_contact_number_id')[0].innerText = $('#basic_info_contact_number_edit_id')[0].value;
			
			var record = Ext.getStore('userProfileStore').getAt(0);  		//Assuming store contain only one data i.e. logged in user data
			record.set('contact_number',json.contact_number);
			
			json.mail_id = record.get('mail_id');
			
		}else if(blockName == "workEducation"){
			json.school = $('#basic_info_school_edit_id')[0].value;
			json.college = $('#basic_info_college_edit_id')[0].value;
			json.workplace = $('#basic_info_work_edit_id')[0].value;
			
			//update the UI and store with changed values
			$('#basic_info_school_id')[0].innerText = $('#basic_info_school_edit_id')[0].value;
			$('#basic_info_college_id')[0].innerText = $('#basic_info_college_edit_id')[0].value;
			$('#basic_info_work_id')[0].innerText = $('#basic_info_work_edit_id')[0].value;
			
			var record = Ext.getStore('userProfileStore').getAt(0);  		//Assuming store contain only one data i.e. logged in user data
			record.set('school',json.school);
			record.set('college',json.college);
			record.set('workplace',json.workplace);
			
			json.mail_id = record.get('mail_id');
		}
		
		
		Neighborhood.request.DataService.updateUserData(json,function(result){
			console.log(result);
			console.log("Succesfully updated user record in table");
		},function(result){
			console.log(result);
		},this);
		
		this.cancelEdit(blockName);
	},
	
	uploadProfilePic : function(){
		var me = this;
		document.getElementById("profile_pic_input_id").click();
		
		$("#profile_pic_input_id").change(function () {
	        if (this.files && this.files[0]) {
	            var reader = new FileReader();
	            reader.onload = me.setProfilePic;
	            reader.readAsDataURL(this.files[0]);
	        }
	    });
	},
	
	setProfilePic : function(e){
		$('#profilePicId').attr('src', e.target.result);
		
		//update the profile picture in database
		var json = {
				'profile_pic' : e.target.result,
				'mail_id' : Ext.getStore('userProfileStore').getAt(0).get('mail_id')
		}
		
		Neighborhood.request.DataService.update_profile_pic(json,function(result){
			console.log(result);
			console.log("Succesfully updated profile picture in table");
		},function(result){
			console.log(result);
		},this);
	}

});