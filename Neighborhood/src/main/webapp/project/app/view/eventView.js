Ext.define('Neighborhood.view.eventView',{
	
	extend: 'Ext.Panel',
	xtype: 'eventView',
	
	config:{
		cls: 'eventViewCls'+(Neighborhood.util.isPhone() ? ' eventViewPhoneCls' : ''),
		listeners:{},
		
		items:[
		       {
		    	   xtype : 'panel',
		    	   cls : 'eventPanelCls',
		    	   itemId:'eventPanelId',
		    	   html : '<div class="fc-toolbar">'+
		    		   '<div class="fc-center">'+
		    		   '<input type="date" value="2015-08-19">'+
		    		   '</div>'+
		    		   '<ul class="actions actions-alt" id="fc-actions">'+
		    		   '<li class="dropdown"><a href="" data-toggle="dropdown" aria-expanded="false">'+
		    		   '<i class="fa fa-bars"></i></a>'+
		    		   '<ul class="dropdown-menu dropdown-menu-right">'+
		    		   '<li  onclick="Neighborhood.app.getController(\'eventController\').showNewEventOverlay()"><a>Add Event</a></li>'+
		    		   '</ul></li></ul>'+
		    		   '</div>'+
		    		   '<div class="col-md-12">'+

				      '<h5>Today 24/12/2012</h5>'+
				
				      '<div class="task important">'+
				        '<h6>Aliquam fringilla mauris lectus</h6>'+
				        '<div class="tmeta"><i class="fa fa-calendar"></i> 25/2/2012 - <i class="fa fa-thumb-tack"></i> Chennai, Tamil Nadu</div>'+
				        '<p>Maecenas turpis urna, eleifend et venenatis eget, ultricies quis urna.  Aliquam ut pharetra erat. Nulla semper odio et turpis hendrerit tempor</p>'+
				      '</div>'+
				
				      '<div class="task cool">'+
				        '<h6>Aliquam fringilla mauris lectus</h6>'+
				        '<div class="tmeta"><i class="fa fa-calendar"></i> 25/2/2012 - <i class="fa fa-thumb-tack"></i> Chennai, Tamil Nadu</div>'+
				        '<p>Maecenas turpis urna, eleifend et venenatis eget, ultricies quis urna.  Aliquam ut pharetra erat. Nulla semper odio et turpis hendrerit tempor</p>'+
				      '</div>'+
				
				      '<div class="task">'+
				        '<h6>Aliquam fringilla mauris lectus</h6>'+
				        '<div class="tmeta"><i class="fa fa-calendar"></i> 25/2/2012 - <i class="fa fa-thumb-tack"></i> Chennai, Tamil Nadu</div>'+
				        '<p>Maecenas turpis urna, eleifend et venenatis eget, ultricies quis urna.  Aliquam ut pharetra erat. Nulla semper odio et turpis hendrerit tempor</p>'+
				      '</div>'+
				
				    '</div>'
		    		   
		       }
		      ]
		
	}

});