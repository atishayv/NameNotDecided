Ext.define('Neighborhood.view.mapView',{
	
	extend: 'Ext.Panel',
	xtype: 'mapView',
	
	config:{
		cls: 'mapViewCls'+(Neighborhood.util.isPhone() ? ' mapViewPhoneCls' : ''),
		showAnimation: {
            type: 'slideIn',
            direction:'right'
        },
		listeners:{
			show : function(){
           	 	Neighborhood.app.getController('user_map_controller').loadMapWithMarker('localityMapContainer',{lat:12.9715987,lng : 77.5945627});
            }
		},
		
		items:[
		       {
		    	   xtype : 'panel',
		    	   cls : 'mapPanelCls',
		    	   itemId:'mapPanelId',
		    	   html : '<div id="localityMapContainer" style="height: 100%"></div>',
		       }
		      ]
	}

});