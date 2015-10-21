Ext.define('Neighborhood.model.userProfileModel',{
	
	extend: 'Ext.data.Model',
	//singleton:true,
    config: {
    	fields: [
    	        {name: 'user_id'}, 
 	         	{name: 'password'},
 	         	{name: 'first_name'},
 	         	{name: 'last_name'},
 	         	{name: 'name'},
 	         	{name: 'mail_id'},
 	         	{name: 'profile_pic'},
 	         	{name: 'DOB'},
 	         	{name: 'school'},
 	         	{name: 'college'},
 	         	{name: 'workplace'},
 	         	{name: 'gender'},
 	         	{name: 'address'},
 	         	{name: 'latitude'},
 	         	{name: 'longitude'},
 	         	{name: 'contact_number'},
 	         	{name : 'relationship_status'},
 	         	{name: 'locality_id'},
 	         	{name: 'user_status'}
 	        ]
    }

});