Ext.define('Neighborhood.view.mainView',{
	
	extend: 'Ext.Panel',
	xtype: 'mainView',
	
	config:{
		cls: 'mainViewCls'+(Neighborhood.util.isPhone() ? ' mainViewPhoneCls' : ''),
		listeners:{},
		
		items:[
		       {
		    	   xtype:"toolbar",
		    	   cls:"mainViewToolbarCls",
		    	   itemId:"mainViewToolbarId",
		    	   docked: 'top',
		    	   html : '<div class="leftToolbarCls"><button onclick="Neighborhood.app.getController(\'MainController\').switchProfilePanel()" type="button" id="main-menu-toggle"><i class="navbar-icon fa fa-bars icon"></i></button>'+
		    	   '<span class="spanTitle">Neighborhood.com</span></div>'+
		    	   	'<div class="mainViewToolbarTextCls">'+
		    		   '<span class="spanDesc">The private special network for your locality</span>'+
		    		   '<span class="top-search-wrap">'+
		                '<input type="text">'+
		                '<i class="top-search-close" onclick="$(this.parentElement.parentElement.parentElement).removeClass(\'search\')">×</i>'+
		    		   '</span>'+
		    		    '<span class="top-menu">'+
	                    '<i class="fa fa-search" onclick="$(this.parentElement.parentElement.parentElement).addClass(\'search\')"></i>'+
	                    '<i onclick="Neighborhood.app.getController(\'MainController\').showNotificationOverlay()" class="fa fa-bell dropdown open faa-ring animated" id="notificationBellID"><i class="tmn-counts">9</i>'+
	                    
	                    '</i>'+
	                    '</span>'+
		    		    '</div>'
		       },
		       {
		    	   xtype : 'panel',
		    	   cls : 'profilePanelCls',
		    	   showAnimation: {
		                type: 'slideIn',
		                duration: 500,
		                direction:'right'
		            },
		           hideAnimation: {
		                type: 'slideOut',
		                duration: 200,
		                //direction:'left'
		            },
		    	   itemId:"profilePanelId",
		    	   html : '<div class="profile-block">'+
						'<div class="panel profile-photo">'+
						'<img id="profilePicId" src="resources/images/profilePic.jpg" alt="">'+
					'</div><br>'+
					'<div id="profileNameId" style="font-size: 20px;">Denise Steiner</div>'+
				'</div>'+
			
					'<ul class="navigation enableTouchScroll">'+
					'<li>'+
					'<a onclick="Neighborhood.app.getController(\'MainController\').gotoDashboard()"><i class="menu-icon fa fa-home"></i><span class="mm-text mmc-dropdown-delay animated fadeIn">Home</span></a>'+
				'</li>'+
				'<li>'+
					'<a onclick="Neighborhood.app.getController(\'MainController\').gotoProfileView()"><i class="menu-icon fa fa-user"></i><span class="mm-text mmc-dropdown-delay animated fadeIn">My Profile</span></a>'+
				'</li>'+
				'<li>'+
					'<a onclick="Neighborhood.app.getController(\'MainController\').gotoContactView()"><i class="menu-icon fa fa-users"></i><span class="mm-text mmc-dropdown-delay animated fadeIn">Neighbours</span></a>'+
				'</li>'+
				'<li>'+
					'<a onclick="Neighborhood.app.getController(\'MainController\').gotoEventView()"><i class="menu-icon fa fa-calendar-check-o"></i><span class="mm-text mmc-dropdown-delay animated fadeIn">Events</span></a>'+
				'</li>'+
				'<li class="mm-dropdown mm-dropdown-root active" onclick="$(this).toggleClass(\'open\')">'+
					'<a ><i class="menu-icon fa fa-user-plus"></i><span class="mm-text mmc-dropdown-delay animated fadeIn">Groups</span></a>'+
					'<ul class="mmc-dropdown-delay animated fadeInLeft" style="">'+
						'<li>'+
							'<a tabindex="-1"><span class="mm-text">Last Inings</span></a>'+
						'</li>'+
						'<li class=" active">'+
							'<a tabindex="-1"><i class="menu-icon fa fa-plus"></i><span class="mm-text">Create Group</span></a>'+
						'</li>'+
					'</ul>'+
				'</li>'+
				'<li>'+
					'<a onclick="Neighborhood.app.getController(\'MainController\').gotoMapView()"><i class="menu-icon fa fa-street-view"></i><span class="mm-text mmc-dropdown-delay animated fadeIn">Map</span></a>'+
				'</li>'+
				'<li class="mm-dropdown mm-dropdown-root"  onclick="$(this).toggleClass(\'open\')">'+
					'<a href="#"><i class="menu-icon fa fa-desktop"></i><span class="mm-text mmc-dropdown-delay animated fadeIn">UI elements</span></a>'+
					'<ul class="mmc-dropdown-delay animated fadeInLeft" style="">'+
						'<li>'+
							'<a tabindex="-1" href="ui-buttons.html"><span class="mm-text">Buttons</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="ui-typography.html"><span class="mm-text">Typography</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="ui-tabs.html"><span class="mm-text">Tabs &amp; Accordions</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="ui-modals.html"><span class="mm-text">Modals</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="ui-alerts.html"><span class="mm-text">Alerts &amp; Tooltips</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="ui-components.html"><span class="mm-text">Components</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="ui-panels.html"><span class="mm-text">Panels</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="ui-jqueryui.html"><span class="mm-text">jQuery UI</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="ui-icons.html"><span class="mm-text">Icons</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="ui-utility-classes.html"><span class="mm-text">Utility classes</span></a>'+
						'</li>'+
					'</ul>'+
				'</li>'+
				'<li class="mm-dropdown mm-dropdown-root"  onclick="$(this).toggleClass(\'open\')">'+
					'<a href="#"><i class="menu-icon fa fa-check-square"></i><span class="mm-text mmc-dropdown-delay animated fadeIn">Form components</span></a>'+
					'<ul class="mmc-dropdown-delay animated fadeInLeft" style="">'+
						'<li>'+
							'<a tabindex="-1" href="forms-layouts.html"><span class="mm-text">Layouts</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="forms-general.html"><span class="mm-text">General</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="forms-advanced.html"><span class="mm-text">Advanced</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="forms-pickers.html"><span class="mm-text">Pickers</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="forms-validation.html"><span class="mm-text">Validation</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="forms-editors.html"><span class="mm-text">Editors</span></a>'+
						'</li>'+
					'</ul>'+
				'</li>'+
				'<li>'+
					'<a href="charts.html"><i class="menu-icon fa fa-bar-chart-o"></i><span class="mm-text mmc-dropdown-delay animated fadeIn">Charts</span></a>'+
				'</li>'+
				'<li class="mm-dropdown mm-dropdown-root"  onclick="$(this).toggleClass(\'open\')">'+
					'<a href="#"><i class="menu-icon fa fa-files-o"></i><span class="mm-text mmc-dropdown-delay animated fadeIn">Pages</span><span class="label label-success">16</span></a>'+
					'<ul class="mmc-dropdown-delay animated fadeInLeft">'+
						'<li>'+
							'<a tabindex="-1" href="pages-search.html"><span class="mm-text">Search results</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="pages-pricing.html"><span class="mm-text">Plans &amp; pricing</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="pages-faq.html"><span class="mm-text">FAQ</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="pages-profile.html"><span class="mm-text">Profile</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="pages-timeline.html"><span class="mm-text">Timeline</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="pages-signin.html"><span class="mm-text">Sign In</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="pages-signup.html"><span class="mm-text">Sign Up</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="pages-signin-alt.html"><span class="mm-text">Sign In Alt</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="pages-signup-alt.html"><span class="mm-text">Sign Up Alt</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="pages-invoice.html"><span class="mm-text">Invoice</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="pages-404.html"><span class="mm-text">Error 404</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="pages-500.html"><span class="mm-text">Error 500</span></a>'+
						'</li>'+
						'<li class="mm-dropdown">'+
							'<a href="#"><i class="menu-icon fa fa-envelope"></i><span class="mm-text">Messages</span></a>'+
							'<ul>'+
								'<li>'+
									'<a tabindex="-1" href="pages-inbox.html"><span class="mm-text">Inbox</span></a>'+
								'</li>'+
								'<li>'+
									'<a tabindex="-1" href="pages-show-email.html"><span class="mm-text">Show message</span></a>'+
								'</li>'+
								'<li>'+
									'<a tabindex="-1" href="pages-new-email.html"><span class="mm-text">New message</span></a>'+
								'</li>'+
							'</ul>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="pages-blank.html"><span class="mm-text">Blank page</span></a>'+
						'</li>'+
					'</ul>'+
				'</li>'+
				'<li>'+
					'<a href="complete-ui.html"><i class="menu-icon fa fa-briefcase"></i><span class="mm-text mmc-dropdown-delay animated fadeIn">Complete UI</span></a>'+
				'</li>'+
				'<li>'+
					'<a href="color-builder.html"><i class="menu-icon fa fa-tint"></i><span class="mm-text mmc-dropdown-delay animated fadeIn">Color Builder</span></a>'+
				'</li>'+
				'<li class="mm-dropdown mm-dropdown-root"  onclick="$(this).toggleClass(\'open\')">'+
					'<a href="#"><i class="menu-icon fa fa-sitemap"></i><span class="mm-text mmc-dropdown-delay animated fadeIn">Menu levels</span><span class="badge badge-primary">6</span></a>'+
					'<ul class="mmc-dropdown-delay animated fadeInLeft">'+
						'<li>'+
							'<a tabindex="-1" href="#"><span class="mm-text">Menu level 1.1</span><span class="badge badge-danger">12</span><span class="label label-info">21</span></a>'+
						'</li>'+
						'<li>'+
							'<a tabindex="-1" href="#"><span class="mm-text">Menu level 1.2</span></a>'+
						'</li>'+
						'<li class="mm-dropdown">'+
							'<a tabindex="-1" href="#"><span class="mm-text">Menu level 1.3</span><span class="label label-warning">5</span></a>'+
							'<ul>'+
								'<li>'+
									'<a tabindex="-1" href="#"><span class="mm-text">Menu level 2.1</span></a>'+
								'</li>'+
								'<li class="mm-dropdown">'+
									'<a tabindex="-1" href="#"><span class="mm-text">Menu level 2.2</span></a>'+
									'<ul>'+
										'<li class="mm-dropdown">'+
											'<a tabindex="-1" href="#"><span class="mm-text">Menu level 3.1</span></a>'+
											'<ul>'+
												'<li>'+
													'<a tabindex="-1" href="#"><span class="mm-text">Menu level 4.1</span></a>'+
												'</li>'+
											'</ul>'+
										'</li>'+
										'<li>'+
											'<a tabindex="-1" href="#"><span class="mm-text">Menu level 3.2</span></a>'+
										'</li>'+
									'</ul>'+
								'</li>'+
								'<li>'+
									'<a tabindex="-1" href="#"><span class="mm-text">Menu level 2.2</span></a>'+
								'</li>'+
							'</ul>'+
						'</li>'+
					'</ul>'+
				'</li>'+
			'</ul>',
		       },
		       {
		    	   xtype : 'panel',
		    	   cls : 'detailPanelCls',
		    	   itemId:"detailPanelId",
		    	   layout:'card',
		    	   items : [
		    	            /*{
		    	    	    	   xclass:'Neighborhood.view.timelineView',
		    	    	    	   itemId:'timelineViewId'
		    	    	    },
		    	    	    {
		    	    	    	   xclass:'Neighborhood.view.profileView',
		    	    	    	   itemId:'profileViewId'
		    	    	    },
		    	    	    {
		    	    	    	   xclass:'Neighborhood.view.contactView',
		    	    	    	   itemId:'contactViewId'
		    	    	    },
		    	    	    {
		    	    	    	   xclass:'Neighborhood.view.eventView',
		    	    	    	   itemId:'eventViewId'
		    	    	    }*/
		    	            ],
    	            listeners:{
                   	 activeitemchange: function(cmp,newCard, oldCard){
                   		/*if (oldCard) {
                            this.remove(oldCard);                    
                        }*/
                     }
                    }
		       },
		       {
		    	   xtype : 'panel',
		    	   cls : 'rightPanelCls',
		    	   itemId : 'rightPanelId',
		    	   html : '<div class="theme-config-box">'+
		    		   '<div class="spin-icon" onclick="Neighborhood.app.getController(\'MainController\').switchChatOverlay()">'+
			               '<i class="fa fa-weixin faa-shake animated"></i>'+
			               '</div>'+
			               '<div class="skin-setttings">'+
			               '<div id="tab-1" class="tab-pane active">'+
			              
			            '<div class="sidebar-tab-menu">'+
			               '<span onclick="Neighborhood.app.getController(\'MainController\').chatTapHandler(this)" class="tab-item select">ONLINE</span>'+
			               '<span onclick="Neighborhood.app.getController(\'MainController\').msgTapHandler(this)" class="tab-item">MESSAGES</span>'+
			            '</div>'+   
                        
                        
                        '<div class="friend-status">'+
                        
                        '<div class="chat-search">'+
		                    '<div class="fg-line">'+
		                        '<input type="text" class="form-control" placeholder="Search People">'+
		                    '</div>'+
	                    '</div>'+
                        
	                    '<div role="tabpanel" class="tab-pane fade active in enableTouchScroll" id="friends">'+
	                        '<div class="listview">'+
	                            '<a class="lv-item" href="">'+
	                                '<div class="media">'+
	                                    '<div class="pull-left p-relative">'+
	                                        '<img class="lv-img-sm" src="resources/images/chat/a1.jpg" alt="">'+
	                                        '<i class="chat-status-busy"></i>'+
	                                    '</div>'+
	                                    '<div class="media-body">'+
	                                        '<div class="lv-title">Jonathan Morris</div>'+
	                                        '<small class="lv-small">Available</small>'+
	                                    '</div>'+
	                                '</div>'+
	                            '</a>'+
	                            
	                            '<a class="lv-item" href="">'+
	                                '<div class="media">'+
	                                    '<div class="pull-left">'+
	                                        '<img class="lv-img-sm" src="resources/images/chat/a2.jpg" alt="">'+
	                                    '</div>'+
	                                    '<div class="media-body">'+
	                                        '<div class="lv-title">David Belle</div>'+
	                                        '<small class="lv-small">Last seen 3 hours ago</small>'+
	                                    '</div>'+
	                                '</div>'+
	                            '</a>'+
	                            
	                            '<a class="lv-item" href="">'+
	                                '<div class="media">'+
	                                    '<div class="pull-left p-relative">'+
	                                        '<img class="lv-img-sm" src="resources/images/chat/a3.jpg" alt="">'+
	                                        '<i class="chat-status-online"></i>'+
	                                    '</div>'+
	                                    '<div class="media-body">'+
	                                        '<div class="lv-title">Fredric Mitchell Jr.</div>'+
	                                        '<small class="lv-small">Availble</small>'+
	                                    '</div>'+
	                                '</div>'+
	                            '</a>'+
	                            
	                            '<a class="lv-item" href="">'+
	                                '<div class="media">'+
	                                    '<div class="pull-left p-relative">'+
	                                        '<img class="lv-img-sm" src="resources/images/chat/a4.jpg" alt="">'+
	                                        '<i class="chat-status-online"></i>'+
	                                    '</div>'+
	                                    '<div class="media-body">'+
	                                        '<div class="lv-title">Glenn Jecobs</div>'+
	                                        '<small class="lv-small">Availble</small>'+
	                                    '</div>'+
	                                '</div>'+
	                            '</a>'+
	                            
	                            '<a class="lv-item" href="">'+
	                                '<div class="media">'+
	                                    '<div class="pull-left">'+
	                                        '<img class="lv-img-sm" src="resources/images/chat/a6.jpg" alt="">'+
	                                    '</div>'+
	                                    '<div class="media-body">'+
	                                        '<div class="lv-title">Bill Phillips</div>'+
	                                        '<small class="lv-small">Last seen 3 days ago</small>'+
	                                    '</div>'+
	                                '</div>'+
	                            '</a>'+
	                            
	                            '<a class="lv-item" href="">'+
	                                '<div class="media">'+
	                                    '<div class="pull-left">'+
	                                        '<img class="lv-img-sm" src="resources/images/chat/a7.jpg" alt="">'+
	                                    '</div>'+
	                                    '<div class="media-body">'+
	                                        '<div class="lv-title">Wendy Mitchell</div>'+
	                                        '<small class="lv-small">Last seen 2 minutes ago</small>'+
	                                    '</div>'+
	                                '</div>'+
	                            '</a>'+
	                            '<a class="lv-item" href="">'+
	                                '<div class="media">'+
	                                    '<div class="pull-left p-relative">'+
	                                        '<img class="lv-img-sm" src="resources/images/chat/a1.jpg" alt="">'+
	                                        '<i class="chat-status-busy"></i>'+
	                                    '</div>'+
	                                    '<div class="media-body">'+
	                                        '<div class="lv-title">Teena Bell Ann</div>'+
	                                        '<small class="lv-small">Busy</small>'+
	                                    '</div>'+
	                                '</div>'+
	                            '</a>'+
	                        '</div>'+
	                    '</div>'+
	                    
	                '</div>'+
                        
                        
                        
                        '<div class="sidebar-overlay">'+
                        
	                        '<div class="sidebar-title">'+
		                        '<h3> <i class="fa fa-comments-o"></i> Latest Notes</h3>'+
		                        '<small><i class="fa fa-tim"></i> You have 10 new message.</small>'+
		                    '</div>'+
		                    
		                    '<div class="sidebar-list enableTouchScroll">'+
                            '<div class="sidebar-message">'+
                                '<a href="#">'+
                                    '<div class="pull-left text-center">'+
                                        '<img alt="image" class="img-circle message-avatar" src="resources/images/chat/a1.jpg">'+

                                        '<div class="m-t-xs">'+
                                            '<i class="fa fa-star text-warning"></i>'+
                                            '<i class="fa fa-star text-warning"></i>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="media-body">There are many variations of passages of Lorem Ipsum available.'+
                                        '<br>'+
                                        '<small class="text-muted">Today 4:21 pm</small>'+
                                    '</div>'+
                                '</a>'+
                            '</div>'+
                            '<div class="sidebar-message">'+
                                '<a href="#">'+
                                    '<div class="pull-left text-center">'+
                                        '<img alt="image" class="img-circle message-avatar" src="resources/images/chat/a2.jpg">'+
                                    '</div>'+
                                    '<div class="media-body">The point of using Lorem Ipsum is that it has a more-or-less normal.'+
                                        '<br>'+
                                        '<small class="text-muted">Yesterday 2:45 pm</small>'+
                                    '</div>'+
                                '</a>'+
                            '</div>'+
                            '<div class="sidebar-message">'+
                                '<a href="#">'+
                                    '<div class="pull-left text-center">'+
                                        '<img alt="image" class="img-circle message-avatar" src="resources/images/chat/a3.jpg">'+

                                        '<div class="m-t-xs">'+
                                            '<i class="fa fa-star text-warning"></i>'+
                                            '<i class="fa fa-star text-warning"></i>'+
                                            '<i class="fa fa-star text-warning"></i>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="media-body">Mevolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'+
                                        '<br>'+
                                        '<small class="text-muted">Yesterday 1:10 pm</small>'+
                                    '</div>'+
                                '</a>'+
                            '</div>'+
                            '<div class="sidebar-message">'+
                                '<a href="#">'+
                                    '<div class="pull-left text-center">'+
                                        '<img alt="image" class="img-circle message-avatar" src="resources/images/chat/a4.jpg">'+
                                    '</div>'+

                                    '<div class="media-body">Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the'+
                                        '<br>'+
                                        '<small class="text-muted">Monday 8:37 pm</small>'+
                                    '</div>'+
                                '</a>'+
                            '</div>'+
                            '<div class="sidebar-message">'+
                                '<a href="#">'+
                                    '<div class="pull-left text-center">'+
                                        '<img alt="image" class="img-circle message-avatar" src="resources/images/chat/a8.jpg">'+
                                    '</div>'+
                                    '<div class="media-body">All the Lorem Ipsum generators on the Internet tend to repeat.'+
                                        '<br>'+
                                        '<small class="text-muted">Today 4:21 pm</small>'+
                                    '</div>'+
                                '</a>'+
                            '</div>'+
                            '<div class="sidebar-message">'+
                                '<a href="#">'+
                                    '<div class="pull-left text-center">'+
                                        '<img alt="image" class="img-circle message-avatar" src="resources/images/chat/a7.jpg">'+
                                    '</div>'+
                                    '<div class="media-body">Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'+
                                        '<br>'+
                                        '<small class="text-muted">Yesterday 2:45 pm</small>'+
                                    '</div>'+
                                '</a>'+
                            '</div>'+
                            '<div class="sidebar-message">'+
                                '<a href="#">'+
                                    '<div class="pull-left text-center">'+
                                        '<img alt="image" class="img-circle message-avatar" src="resources/images/chat/a3.jpg">'+

                                        '<div class="m-t-xs">'+
                                            '<i class="fa fa-star text-warning"></i>'+
                                            '<i class="fa fa-star text-warning"></i>'+
                                            '<i class="fa fa-star text-warning"></i>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="media-body">The standard chunk of Lorem Ipsum used since the 1500s is reproduced below.'+
                                        '<br>'+
                                        '<small class="text-muted">Yesterday 1:10 pm</small>'+
                                    '</div>'+
                                '</a>'+
                            '</div>'+
                            '<div class="sidebar-message">'+
                                '<a href="#">'+
                                    '<div class="pull-left text-center">'+
                                        '<img alt="image" class="img-circle message-avatar" src="resources/images/chat/a4.jpg">'+
                                    '</div>'+
                                    '<div class="media-body">Uncover many web sites still in their infancy. Various versions have.'+
                                        '<br>'+
                                        '<small class="text-muted">Monday 8:37 pm</small>'+
                                    '</div>'+
                                '</a>'+
                            '</div>'+
                        '</div>'+
                        '</div>'+

                        '<div class="small-chat-box active">'+

    		            '<div class="heading" draggable="true">'+
    		                '<i class="fa fa-times pull-right" onclick="Neighborhood.app.getController(\'MainController\').minimiseChatPanel(this)"></i>'+
    		                'Small chat'+
    		            '</div>'+
    		
    		            '<div class="slimScrollDiv enableTouchScroll"><div class="content">'+
    		
    		                '<div class="left">'+
    		                    '<div class="author-name">Monica Jackson <small class="chat-date">10:02 am'+
    		                    '</small>'+
    		                    '</div>'+
    		                    '<div class="chat-message active">Lorem Ipsum is simply dummy text input.'+
    		                    '</div>'+
    		
    		                '</div>'+
    		                '<div class="right">'+
    		                    '<div class="author-name">Mick Smith'+
    		                        '<small class="chat-date">11:24 am'+
    		                        '</small>'+
    		                    '</div>'+
    		                    '<div class="chat-message">Lorem Ipsum is simpl.'+
    		                    '</div>'+
    		                '</div>'+
    		                '<div class="left">'+
    		                    '<div class="author-name">Alice Novak'+
    		                        '<small class="chat-date">08:45 pm'+
    		                        '</small>'+
    		                    '</div>'+
    		                    '<div class="chat-message active">Check this stock char.'+
    		                    '</div>'+
    		                '</div>'+
    		                '<div class="right">'+
    		                    '<div class="author-name">Anna Lamson'+
    		                        '<small class="chat-date">11:24 am'+
    		                        '</small>'+
    		                    '</div>'+
    		                    '<div class="chat-message">The standard chunk of Lorem Ipsum'+
    		                    '</div>'+
    		                '</div>'+
    		                '<div class="left">'+
    		                    '<div class="author-name">Mick Lane'+
    		                        '<small class="chat-date">08:45 pm'+
    		                        '</small>'+
    		                    '</div>'+
    		                    '<div class="chat-message active">I belive that. Lorem Ipsum is simply dummy text.'+
    		                    '</div>'+
    		                '</div>'+
    		
    		
    		            '</div></div>'+
    		            '<div class="form-chat">'+
    		                '<div class="input-group input-group-sm"><input type="text" class="form-control"> <span class="input-group-btn"> <button class="btn btn-primary" type="button">Send'+
    		                '</button> </span></div>'+
    		            '</div>'+
    		
    		        '</div>'+
    		        
                    '</div>'+
                    '</div>'+
			        '</div>'
		       }
		       ]
		
	},
	
	initialize: function(){
		this.callParent(arguments);
	},
	
});