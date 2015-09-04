Ext.define('Neighborhood.model.userProfileModel',{
	
	extend: 'Ext.data.Model',
	//singleton:true,
    config: {
    	fields: [
    	        {name: 'userId'}, 
 	         	{name: 'password'},
 	         	{name: 'name'},
 	         	{name : 'relationshipStatus'},
 	         	{name: 'firstName'},
 	         	{name: 'lastName'},
 	         	{name: 'contactNumber'},
 	         	{name: 'mailId'},
 	         	{name: 'birthday'},
 	         	{name: 'profilePic'},
 	         	{name: 'school'},
 	         	{name: 'college'},
 	         	{name: 'workplace'},
 	         	{name: 'gender'},
 	         	{name: 'location'},
 	         	{name: 'localityId'},
 	         	{name: 'deactivated'}
 	        ]
    }

});