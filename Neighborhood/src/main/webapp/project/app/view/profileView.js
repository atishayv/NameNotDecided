Ext.define('Neighborhood.view.profileView',{
	
	extend: 'Ext.Panel',
	xtype: 'profileView',
	
	config:{
		cls: 'profileViewCls'+(Neighborhood.util.isPhone() ? ' profileViewPhoneCls' : ''),
		showAnimation: {
            type: 'slideIn',
            direction:'right'
        },
		listeners:{
             show : function(){
            	 Neighborhood.app.getController('mapController').loadMapWithMarker('userMapContainer',{lat:12.9715987,lng : 77.5945627});
             }
		},
		
		items:[
		       {
		    	   xtype : 'panel',
		    	   cls : 'aboutPanelCls',
		    	   itemId:'aboutPanelId',
		    	   html : /*'<div class="pmb-block">'+
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
		       '</div>'+*/
		    	//basic information section
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
                                            '<dd id="basicInfoNameId">Mallinda Hollaway</dd>'+
                                        '</dl>'+
                                        '<dl class="dl-horizontal">'+
                                            '<dt>Gender</dt>'+
                                            '<dd id="basicInfoGenderId">Female</dd>'+
                                        '</dl>'+
                                        '<dl class="dl-horizontal">'+
                                            '<dt>Birthday</dt>'+
                                            '<dd id="basicInfoBirthdayId">June 23, 1990</dd>'+
                                        '</dl>'+
                                        '<dl class="dl-horizontal">'+
                                            '<dt>Martial Status</dt>'+
                                            '<dd id="basicInfoRelStatusId">Single</dd>'+
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
                                                    '<input type="date" class="form-control date-picker" data-toggle="dropdown" aria-expanded="false">'+
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
                            //contact information section
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
                                            '<dd id="basicInfoMailId">malinda.h@gmail.com</dd>'+
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
                                        
                                        '<div class="m-t-30">'+
                                            '<button class="btn btn-primary btn-sm waves-effect">Save</button>'+
                                            '<button onclick="Neighborhood.app.getController(\'profileController\').cancelEdit(\'contact\')" data-pmb-action="reset" class="btn btn-link btn-sm waves-effect">Cancel</button>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            
                            //education and workplace section
                            '<div class="pmb-block">'+
                            '<div class="pmbb-header">'+
                            '<h2><i class="fa fa-building"></i> Education and Workplace</h2>'+
                            '<ul class="actions"><li class="dropdown"><a href="" data-toggle="dropdown">'+
                            '<i class="fa fa-bars"></i></a>'+
                            '<ul class="dropdown-menu dropdown-menu-right"><li>'+
                            '<a data-pmb-action="edit" onclick="Neighborhood.app.getController(\'profileController\').enableEdit()">Edit</a>'+
                            '</li></ul></li></ul></div>'+
                            '<div class="pmbb-body workEducation">'+
                            	'<div class="pmbb-view workEducation">'+
	                            	'<dl class="dl-horizontal">'+
		                                '<dt>School</dt>'+
		                                '<dd id="basicInfoSchoolId">Lions School</dd>'+
		                            '</dl>'+
			                            '<dl class="dl-horizontal">'+
		                                '<dt>College</dt>'+
		                                '<dd id="basicInfoCollegeId">Inderprastha Engineering College</dd>'+
		                            '</dl>'+
		                            '<dl class="dl-horizontal">'+
		                                '<dt>Workplace</dt>'+
		                                '<dd id="basicInfoWorkId">Openstream Technologies Pvt Ltd</dd>'+
		                            '</dl>'+
                            	'</div>'+
                            
	                            '<div class="pmbb-edit workEducation">'+
		                            '<dl class="dl-horizontal">'+
			                            '<dt class="p-t-10">School</dt>'+
			                            '<dd>'+
			                                '<div class="fg-line">'+
			                                    '<input type="text" class="form-control" placeholder="eg. your school name">'+
			                                '</div>'+
			                            '</dd>'+
			                        '</dl>'+
			                        '<dl class="dl-horizontal">'+
			                            '<dt class="p-t-10">College</dt>'+
			                            '<dd>'+
			                                '<div class="fg-line">'+
			                                    '<input type="text" class="form-control" placeholder="eg. your college name">'+
			                                '</div>'+
			                            '</dd>'+
			                        '</dl>'+
			                        '<dl class="dl-horizontal">'+
			                            '<dt class="p-t-10">Workplace</dt>'+
			                            '<dd>'+
			                                '<div class="fg-line">'+
			                                    '<input type="text" class="form-control" placeholder="eg. your workplace">'+
			                                '</div>'+
			                            '</dd>'+
			                        '</dl>'+
			                    '</div>'+
			                '</div>'+
                            '</div>'+
                            
                            //location information section
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
		       }
		       ]
	},
	
	initialize: function(){
		this.callParent(arguments);
	},
	
});