Ext.define('Neighborhood.view.timelineView',{
	
	extend: 'Ext.Panel',
	xtype: 'timelineView',
	
	config:{
		cls: 'timelineViewCls enableTouchScroll',
		showAnimation: {
            type: 'slideIn',
            direction:'right'
        },
		listeners:{
			show : function(){
				//make server request and get the feeds
			}
		},
		
		items:[
		       {
		    	   xtype : 'panel',
		    	   cls : 'timelinePanelCls',
		    	   itemId:"timelinePanelId",
		    	   html : '<ul class="tab-nav tn-justified" tabindex="1">'+
			    		   '<li onclick="Neighborhood.app.getController(\'MainController\').changePostAreaFormat(this,\'Feeds\')" class="active waves-effect"><span>Post feed</span></li>'+ 
			    		   '<li onclick="Neighborhood.app.getController(\'MainController\').changePostAreaFormat(this,\'Issue\')" class="waves-effect"><span>Raise society issue</span></li>'+ 
			    		   '<li onclick="Neighborhood.app.getController(\'MainController\').changePostAreaFormat(this,\'Question\')" class="waves-effect"><span>Ask a question</span></li>'+ 
			    		   '<li onclick="Neighborhood.app.getController(\'MainController\').changePostAreaFormat(this,\'Info\')" class="waves-effect"><span>Provide information</span></li>'+
			    		   '</ul>'+
		    		   
		    		   '<div class="quick-update">'+
		    		   			'<textarea rows="1" class="form-control title" style="display:none;" placeholder="Write a topic..."></textarea>'+
								'<textarea rows="6" class="form-control desc" placeholder="Type Something..."></textarea>'+
								'<div class="qu-buttons">'+
									'<div class="pull-left">'+
										'<a href="#"><i class="fa fa-paperclip"></i></a> &nbsp;'+
										'<a href="#"><i class="fa fa-camera"></i></a> &nbsp;'+
										'<a href="#"><i class="fa fa-film"></i></a>'+
									'</div>'+
									'<div class="pull-right">'+
										'<button class="btn btn-info btn-xs">Submit</button>  <button class="btn btn-default btn-xs">Reset</button>'+
									'</div>'+
									'<div class="clearfix"></div>'+
								'</div>'+
							'</div>'+
		    		   
		    		   '<div class="timeline" id="timelinePostId">'+
						//<!-- Timeline header -->
					/*'<div class="tl-header now">Now</div>'+

					'<div class="tl-entry">'+
						'<div class="tl-time">1h ago</div>'+
						'<div class="tl-icon bg-warning"><i class="fa fa-envelope"></i></div>'+
						'<div class="panel tl-body">'+
							'<h4 class="text-warning">Lorem ipsum dolor sit amet</h4>'+
							'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'+
						'</div>'+// <!-- / .tl-body -->
					'</div>'+// <!-- / .tl-entry -->

					'<div class="tl-entry left">'+
						'<div class="tl-time">2h ago</div>'+
						'<div class="tl-icon bg-success"><i class="fa fa-picture-o"></i></div>'+
						'<div class="panel tl-body">'+
							'<a href="#">Denise Steiner</a> shared an image on <a href="#">The Gallery</a>'+
							'<div class="tl-wide text-center" style="padding: 10px;margin-top:15px;margin-bottom: 15px;background: #f1f1f1">'+
								'<img src="resources/images/timeline/signin-bg-5.jpg" alt="" style="max-height: 150px;max-width: 100%;">'+
							'</div>'+
							'<i class="text-muted text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</i>'+
						'</div>'+// <!-- / .tl-body -->
					'</div>'+ // <!-- / .tl-entry -->

					'<div class="tl-entry">'+
						'<div class="tl-time">3h ago</div>'+
						'<div class="tl-icon bg-success"><img src="resources/images/timeline/2.jpg" alt=""></div>'+
						'<div class="panel tl-body">'+
							'<a href="#">Robert Jang</a> commented on <a href="#">The Article</a>'+
							'<div class="well well-sm" style="margin: 10px 0 0 0;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>'+
						'</div>'+ // <!-- / .tl-body -->
					'</div>'+  // <!-- / .tl-entry -->

					'<div class="tl-entry left">'+
						'<div class="tl-time">4h ago</div>'+
						'<div class="tl-icon bg-dark-gray"><i class="fa fa-check"></i></div>'+
						'<div class="panel tl-body">'+
							'<img src="resources/images/timeline/5.jpg" alt="" class="rounded" style=" width: 20px;height: 20px;margin-top: -2px;">&nbsp;&nbsp;<a href="#">Denise Steiner</a> followed <a href="#">Johg Doe</a>'+
						'</div>'+ // <!-- / .tl-body -->
					'</div>'+ // <!-- / .tl-entry -->

					//<!-- Timeline header -->
					'<div class="tl-header">Yesterday</div>'+

					'<div class="tl-entry">'+
						'<div class="tl-time">9:02 pm</div>'+
						'<div class="tl-icon bg-info"><i class="fa fa-comment"></i></div>'+
						'<div class="panel tl-body">'+
							'<a href="#">Denise Steiner</a> liked a comment on <a href="#">Some Article</a>'+
							'<div style="margin-top: 10px;" class="text-sm">'+
								'<img src="resources/images/timeline/3.jpg" alt="" class="rounded" style=" width: 20px;height: 20px;margin-top: -2px;">&nbsp;&nbsp;<a href="#">Michelle Bortz</a> commented 2 days ago'+
								'<div class="well well-sm" style="margin: 6px 0 0 0;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>'+
							'</div>'+
						'</div>'+ // <!-- / .tl-body -->
					'</div>'+ // <!-- / .tl-entry -->

					'<div class="tl-entry left">'+
						'<div class="tl-time">5:47 pm</div>'+
						'<div class="panel tl-body">'+
							'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'+
						'</div>'+ // <!-- / .tl-body -->
					'</div>'+ // <!-- / .tl-entry -->

					'<div class="tl-entry">'+
						'<div class="tl-time">2:35 pm</div>'+
						'<div class="tl-icon bg-danger"><i class="fa fa-heart"></i></div>'+
						'<div class="panel tl-body">'+
							'<a href="#">Denise Steiner</a> liked <a href="#">Shop Item</a>'+
						'</div>'+// <!-- / .tl-body -->
					'</div>'+ // <!-- / .tl-entry -->

					'<div class="tl-entry left">'+
						'<div class="tl-time">11:21 am</div>'+
						'<div class="panel tl-body">'+
							'<h4 class="text-danger">Lorem ipsum dolor sit amet</h4>'+
							'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'+
						'</div>'+ // <!-- / .tl-body -->
					'</div>'+ // <!-- / .tl-entry -->
*/
				'</div>',
		       }
		       ]
	},
	
	initialize: function(){
		this.callParent(arguments);
	},
	
});