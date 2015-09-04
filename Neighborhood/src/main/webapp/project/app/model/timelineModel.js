Ext.define('Neighborhood.model.timelineModel',{
	
	extend: 'Ext.data.Model',
	//singleton:true,
    config: {
    	fields: [
 	         	{name: 'id'},
 	         	{name: 'userId'},
 	         	{name: 'description'},
 	         	{name: 'imageUrl'},
 	         	{name: 'tags'},
 	         	{name: 'time'},
 	         	{name: 'links'},
 	         	{name: 'category'}
 	        ]
    }

});