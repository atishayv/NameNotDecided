Ext.define('Neighborhood.controller.eventController',{
	
	extend: 'Ext.app.Controller',
	
	
	showNewEventOverlay : function(){
		if(!this.addEventOverlay){
			this.addEventOverlay=Ext.create('Ext.Panel',{
	            hidden: true,
				hideOnMaskTap: true,
				modal : true,
				cls : 'newEventOverlayCls',
				centered : true,
				zIndex: 3,
				showAnimation: {
	                type: 'fade',
	                duration: 500,
	            },
				html : '<div class="modal-header">'+
                    '<h4 class="modal-title">Add an Event</h4>'+
                    '</div>'+
                    
                    '<div class="modal-body">'+
	                    '<form class="addEvent" role="form">'+
	                        '<div class="form-group has-error">'+
	                            '<label for="eventName">Event Name</label>'+
	                            '<div class="fg-line">'+
	                                '<input type="text" class="input-sm form-control" placeholder="eg: Sports day">'+
	                            '</div>'+
	                        '</div>'+
	                        
	                        '<div class="form-group has-error">'+
	                            '<label for="eventName">Event Detail</label>'+
	                            '<div class="fg-line">'+
	                                '<input type="text" class="input-sm form-control" placeholder="eg: Add Detail">'+
	                            '</div>'+
                            '</div>'+
                            
                            '<div class="form-group has-error">'+
	                            '<label for="eventName">Location</label>'+
	                            '<div class="fg-line">'+
	                                '<input type="text" class="input-sm form-control" placeholder="eg: Add a Place">'+
	                            '</div>'+
	                        '</div>'+
	                        
	                        '<div class="form-group has-error">'+
                            '<label for="eventName">Date</label>'+
                            '<div class="fg-line">'+
                                '<input type="date" class="input-sm form-control">'+
                            '</div>'+
                        '</div>'+
	                       
	                    '</form>'+
	                '</div>'+
                    
                    
                    '<div class="modal-footer">'+
                    '<button type="submit" class="btn btn-link waves-effect" id="addEvent">Add Event</button>'+
                    '<button type="button" class="btn btn-link waves-effect" data-dismiss="modal">Close</button>'+
                    '</div>',
		        initialize: function(){
		        	 this.callParent(arguments);
		        } 
			});
		}
		
		Ext.Viewport.add(this.addEventOverlay);
		this.addEventOverlay.show();
	}

});