Ext.define('Neighborhood.view.profileView',{
	
	extend: 'Ext.Panel',
	xtype: 'profileView',
	
	config:{
		cls: 'profileViewCls'+(Neighborhood.util.isPhone() ? ' profileViewPhoneCls' : ''),
		listeners:{
		},
		
		items:[
		       {
		    	   xtype : 'panel',
		    	   cls : 'aboutPanelCls',
		    	   itemId:'aboutPanelId',
		    	   html : '<div class="pmb-block">'+
		                       '<div class="pmbb-header">'+
		               '<h2><i class="fa fa-file"></i> Summary</h2>'+
		               
		               '<ul class="actions">'+
		                   '<li class="dropdown">'+
		                       '<a href="" data-toggle="dropdown">'+
		                           '<i class="fa fa-bars"></i>'+
		                       '</a>'+
		                       
		                       '<ul class="dropdown-menu dropdown-menu-right">'+
		                           '<li>'+
		                               '<a data-pmb-action="edit" onclick="Neighborhood.app.getController(\'profileController\').enableEdit(\'summary\')">Edit</a>'+
		                           '</li>'+
		                       '</ul>'+
		                   '</li>'+
		               '</ul>'+
		           '</div>'+
		           '<div class="pmbb-body summary">'+
		               '<div class="pmbb-view">'+
		                   'Sed eu est vulputate, fringilla ligula ac, maximus arcu. Donec sed felis vel magna mattis ornare ut non turpis. Sed id arcu elit. Sed nec sagittis tortor. Mauris ante urna, ornare sit amet mollis eu, aliquet ac ligula. Nullam dolor metus, suscipit ac imperdiet nec, consectetur sed ex. Sed cursus porttitor leo.'+
		               '</div>'+
		               
		               '<div class="pmbb-edit summary">'+
		                   '<div class="fg-line">'+
		                       '<textarea class="form-control" rows="5" placeholder="Summary...">Sed eu est vulputate, fringilla ligula ac, maximus arcu. Donec sed felis vel magna mattis ornare ut non turpis. Sed id arcu elit. Sed nec sagittis tortor. Mauris ante urna, ornare sit amet mollis eu, aliquet ac ligula. Nullam dolor metus, suscipit ac imperdiet nec, consectetur sed ex. Sed cursus porttitor leo.</textarea>'+
		                   '</div>'+
		                   '<div class="m-t-10">'+
		                       '<button class="btn btn-primary btn-sm waves-effect">Save</button>'+
		                       '<button onclick="Neighborhood.app.getController(\'profileController\').cancelEdit(\'summary\')" data-pmb-action="reset" class="btn btn-link btn-sm waves-effect">Cancel</button>'+
		                   '</div>'+
		               '</div>'+
		           '</div>'+
		       '</div>'+
		       '<div class="pmb-block">'+
                                '<div class="pmbb-header">'+
                                    '<h2><i class="fa fa-user"></i> Basic Information</h2>'+
                                    
                                    '<ul class="actions">'+
                                        '<li class="dropdown">'+
                                            '<a href="" data-toggle="dropdown" aria-expanded="false">'+
                                                '<i class="fa fa-bars"></i>'+
                                            '</a>'+
                                            
                                            '<ul class="dropdown-menu dropdown-menu-right">'+
                                                '<li>'+
                                                    '<a data-pmb-action="edit" onclick="Neighborhood.app.getController(\'profileController\').enableEdit(\'basicInfo\')">Edit</a>'+
                                                '</li>'+
                                            '</ul>'+
                                        '</li>'+
                                    '</ul>'+
                                '</div>'+
                                '<div class="pmbb-body basicInfo">'+
                                    '<div class="pmbb-view">'+
                                        '<dl class="dl-horizontal">'+
                                            '<dt>Full Name</dt>'+
                                            '<dd>Mallinda Hollaway</dd>'+
                                        '</dl>'+
                                        '<dl class="dl-horizontal">'+
                                            '<dt>Gender</dt>'+
                                            '<dd>Female</dd>'+
                                        '</dl>'+
                                        '<dl class="dl-horizontal">'+
                                            '<dt>Birthday</dt>'+
                                            '<dd>June 23, 1990</dd>'+
                                        '</dl>'+
                                        '<dl class="dl-horizontal">'+
                                            '<dt>Martial Status</dt>'+
                                            '<dd>Single</dd>'+
                                        '</dl>'+
                                    '</div>'+
                                    
                                    '<div class="pmbb-edit basicInfo">'+
                                        '<dl class="dl-horizontal">'+
                                            '<dt class="p-t-10">Full Name</dt>'+
                                            '<dd>'+
                                                '<div class="fg-line">'+
                                                    '<input type="text" class="form-control" placeholder="eg. Mallinda Hollaway">'+
                                                '</div>'+
                                                
                                            '</dd>'+
                                        '</dl>'+
                                        '<dl class="dl-horizontal">'+
                                            '<dt class="p-t-10">Gender</dt>'+
                                            '<dd>'+
                                                '<div class="fg-line">'+
                                                    '<select class="form-control">'+
                                                        '<option>Male</option>'+
                                                        '<option>Female</option>'+
                                                        '<option>Other</option>'+
                                                    '</select>'+
                                                '</div>'+
                                            '</dd>'+
                                        '</dl>'+
                                        '<dl class="dl-horizontal">'+
                                            '<dt class="p-t-10">Birthday</dt>'+
                                            '<dd>'+
                                                '<div class="dtp-container dropdown fg-line">'+
                                                    '<input type="text" class="form-control date-picker" data-toggle="dropdown" placeholder="Click here..." aria-expanded="false">'+
                                                '</div>'+
                                            '</dd>'+
                                        '</dl>'+
                                        '<dl class="dl-horizontal">'+
                                            '<dt class="p-t-10">Martial Status</dt>'+
                                            '<dd>'+
                                                '<div class="fg-line">'+
                                                    '<select class="form-control">'+
                                                        '<option>Single</option>'+
                                                        '<option>Married</option>'+
                                                        '<option>Other</option>'+
                                                    '</select>'+
                                                '</div>'+
                                            '</dd>'+
                                        '</dl>'+
                                        
                                        '<div class="m-t-30">'+
                                            '<button class="btn btn-primary btn-sm waves-effect">Save</button>'+
                                            '<button onclick="Neighborhood.app.getController(\'profileController\').cancelEdit(\'basicInfo\')" data-pmb-action="reset" class="btn btn-link btn-sm waves-effect">Cancel</button>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="pmb-block">'+
                                '<div class="pmbb-header">'+
                                    '<h2><i class="fa fa-phone"></i> Contact Information</h2>'+
                                    
                                    '<ul class="actions">'+
                                        '<li class="dropdown">'+
                                            '<a href="" data-toggle="dropdown" aria-expanded="false">'+
                                                '<i class="fa fa-bars"></i>'+
                                            '</a>'+
                                            
                                            '<ul class="dropdown-menu dropdown-menu-right">'+
                                                '<li>'+
                                                    '<a data-pmb-action="edit" onclick="Neighborhood.app.getController(\'profileController\').enableEdit(\'contact\')">Edit</a>'+
                                                '</li>'+
                                            '</ul>'+
                                        '</li>'+
                                    '</ul>'+
                                '</div>'+
                                '<div class="pmbb-body contact">'+
                                    '<div class="pmbb-view">'+
                                        '<dl class="dl-horizontal">'+
                                            '<dt>Mobile Phone</dt>'+
                                            '<dd>00971 12345678 9</dd>'+
                                        '</dl>'+
                                        '<dl class="dl-horizontal">'+
                                            '<dt>Email Address</dt>'+
                                            '<dd>malinda.h@gmail.com</dd>'+
                                        '</dl>'+
                                        '<dl class="dl-horizontal">'+
                                            '<dt>Twitter</dt>'+
                                            '<dd>@malinda</dd>'+
                                        '</dl>'+
                                        '<dl class="dl-horizontal">'+
                                            '<dt>Skype</dt>'+
                                            '<dd>malinda.hollaway</dd>'+
                                        '</dl>'+
                                    '</div>'+
                                    
                                    '<div class="pmbb-edit contact">'+
                                        '<dl class="dl-horizontal">'+
                                            '<dt class="p-t-10">Mobile Phone</dt>'+
                                            '<dd>'+
                                                '<div class="fg-line">'+
                                                    '<input type="text" class="form-control" placeholder="eg. 00971 12345678 9">'+
                                                '</div>'+
                                            '</dd>'+
                                        '</dl>'+
                                        '<dl class="dl-horizontal">'+
                                            '<dt class="p-t-10">Email Address</dt>'+
                                            '<dd>'+
                                                '<div class="fg-line">'+
                                                    '<input type="email" class="form-control" placeholder="eg. malinda.h@gmail.com">'+
                                                '</div>'+
                                            '</dd>'+
                                        '</dl>'+
                                        '<dl class="dl-horizontal">'+
                                            '<dt class="p-t-10">Twitter</dt>'+
                                            '<dd>'+
                                                '<div class="fg-line">'+
                                                    '<input type="text" class="form-control" placeholder="eg. @malinda">'+
                                                '</div>'+
                                            '</dd>'+
                                        '</dl>'+
                                        '<dl class="dl-horizontal">'+
                                            '<dt class="p-t-10">Skype</dt>'+
                                            '<dd>'+
                                                '<div class="fg-line">'+
                                                    '<input type="text" class="form-control" placeholder="eg. malinda.hollaway">'+
                                                '</div>'+
                                            '</dd>'+
                                        '</dl>'+
                                        
                                        '<div class="m-t-30">'+
                                            '<button class="btn btn-primary btn-sm waves-effect">Save</button>'+
                                            '<button onclick="Neighborhood.app.getController(\'profileController\').cancelEdit(\'contact\')" data-pmb-action="reset" class="btn btn-link btn-sm waves-effect">Cancel</button>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="pmb-block">'+
                            '<div class="pmbb-header">'+
                            '<h2><i class="fa fa-map-marker"></i> Location</h2>'+
                            '<ul class="actions"><li class="dropdown"><a href="" data-toggle="dropdown">'+
                            '<i class="fa fa-bars"></i></a>'+
                            '<ul class="dropdown-menu dropdown-menu-right"><li>'+
                            '<a data-pmb-action="edit" onclick="Neighborhood.app.getController(\'profileController\').enableEdit()">Change Location</a>'+
                            '</li></ul></li></ul></div>'+
                            '<div class="pmbb-body map">'+
                            '<div id="userMapContainer" style="height: 300px"></div>'+
                            '<div>'+
                            '<div>',
                            listeners:{
                           	 painted: function(){
                           		Neighborhood.app.getController('mapController').loadMapWithMarker('userMapContainer',[12.9715987,77.5945627]);
                                },
                             show : function(){
                            	 alert("show");
                             }
                            }
		       }
		       ]
	},
	
	initialize: function(){
		this.callParent(arguments);
	},
	
});