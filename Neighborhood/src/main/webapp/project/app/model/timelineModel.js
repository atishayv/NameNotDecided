Ext.define('Neighborhood.model.timelineModel',{
	
	extend: 'Ext.data.Model',
	//singleton:true,
    config: {
    	fields: [
 	         	{name: 'id'},
 	         	{name: 'userName'},
 	         	{name: 'userPic'},
 	         	{name: 'title'},
 	         	{name: 'description'},
 	         	{name: 'imageUrl'},
 	         	{name: 'imageComment'},
 	         	{name: 'tags'},
 	         	{name: 'time'},
 	         	{name: 'links'},
 	         	{name: 'category'},
 	         	{name : 'commentsArr'}	//format of commentsArr = [commentText,time,likes,user_name,user_pic]
 	        ]
    }

});