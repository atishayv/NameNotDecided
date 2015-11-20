Ext.define('Neighborhood.controller.MainController',{
	
	extend: 'Ext.app.Controller',
	
	
	index : function(){
		//Neighborhood.app.getController('loginController').index();
		this.showMainView();
		
	},
	
	showMainView : function(showProfileView){
		this.mainView = Ext.create('Neighborhood.view.mainView'); 
		
		Ext.Viewport.add(this.mainView);
		Ext.Viewport.setActiveItem(this.mainView);
		
		this.mainView.getComponent('detailPanelId').on('activeitemchange', function(cmp,newCard, oldCard) {
            if (oldCard) {
                this.remove(oldCard, false);                    
            }
        }, this.mainView.getComponent('detailPanelId'));
		
		if(!showProfileView)
			this.gotoDashboard();
		else
			this.gotoProfileView();
		
		scrollPanelDomArr = $('.enableTouchScroll');
		for(var i=0;i<scrollPanelDomArr.length;i++){
			scrollPanelDomArr[i].addEventListener("touchmove", function(e){
		        e.stopPropagation();
		    }, false);
		}
	},
	
	switchProfilePanel : function(){
		var profilePanel = Neighborhood.app.getController('MainController').mainView.getComponent('profilePanelId');
		if(profilePanel.getCls().indexOf('minimised')!=-1){
			profilePanel.removeCls('minimised');
			$('#main-menu-toggle').removeClass('toggle-hide');
			Neighborhood.app.getController('MainController').mainView.getComponent('detailPanelId').removeCls('toggle-hide');
		}else{
			profilePanel.addCls('minimised');
			$('#main-menu-toggle').addClass('toggle-hide');
			Neighborhood.app.getController('MainController').mainView.getComponent('detailPanelId').addCls('toggle-hide');
		}
		
		/*if(profilePanel._hidden){
			profilePanel.show();
			Neighborhood.app.getController('MainController').mainView.getComponent('minimizedProfilePanelId').hide();
			$('#main-menu-toggle').removeClass('toggle-hide');
			Neighborhood.app.getController('MainController').mainView.getComponent('detailPanelId').removeCls('toggle-hide');
		}else{
			profilePanel.hide();
			Neighborhood.app.getController('MainController').mainView.getComponent('minimizedProfilePanelId').show();
			$('#main-menu-toggle').addClass('toggle-hide');
			Neighborhood.app.getController('MainController').mainView.getComponent('detailPanelId').addCls('toggle-hide');
			
		}*/
	},
	
	switchChatOverlay : function(){
		var chatPanel = Neighborhood.app.getController('MainController').mainView.getComponent('rightPanelId');
		if(chatPanel.getCls().length>1){
			chatPanel.removeCls('show');
		}else{
			chatPanel.addCls('show')
		}
	},
	
	
	showNotificationOverlay : function(){
		if(!this.notificationOverlay){
			this.notificationOverlay=Ext.create('Ext.Panel',{
	            hidden: true,
				hideOnMaskTap: true,
				modal : true,
				cls : 'notifOverlayCls'+(Neighborhood.util.isPhone() ? ' notifOverlayPhoneCls' : ''),
				zIndex: 3,
				showAnimation: {
	                type: 'fade',
	                duration: 500,
	            },
				html : '<div class="notif-menu">'+
	            '<div class="listview" id="notifications">'+
	            '<div class="lv-header">Notification'+
	            	'<i class="fa fa-check" onclick="Neighborhood.app.getController(\'MainController\').dismissNotifItems()"></i>'+
	            '</div>'+
	            '<div class="lv-body c-overflow enableTouchScroll" tabindex="2">'+
	                '<a class="lv-item" href="">'+
	                    '<div class="media">'+
	                        '<div class="pull-left">'+
	                            '<img class="lv-img-sm" src="resources/images/chat/a1.jpg" alt="">'+
	                        '</div>'+
	                        '<div class="media-body">'+
	                            '<div class="lv-title">David Belle</div>'+
	                            '<small class="lv-small">Cum sociis natoque penatibus et magnis dis parturient montes</small>'+
	                        '</div>'+
	                    '</div>'+
	                '</a>'+
	                '<a class="lv-item" href="">'+
	                    '<div class="media">'+
	                        '<div class="pull-left">'+
	                            '<img class="lv-img-sm" src="resources/images/chat/a2.jpg" alt="">'+
	                        '</div>'+
	                        '<div class="media-body">'+
	                            '<div class="lv-title">Jonathan Morris</div>'+
	                            '<small class="lv-small">Nunc quis diam diamurabitur at dolor elementum, dictum turpis vel</small>'+
	                        '</div>'+
	                    '</div>'+
	                '</a>'+
	                '<a class="lv-item" href="">'+
	                    '<div class="media">'+
	                        '<div class="pull-left">'+
	                            '<img class="lv-img-sm" src="resources/images/chat/a3.jpg" alt="">'+
	                        '</div>'+
	                        '<div class="media-body">'+
	                            '<div class="lv-title">Fredric Mitchell Jr.</div>'+
	                            '<small class="lv-small">Phasellus a ante et est ornare accumsan at vel magnauis blandit turpis at augue ultricies</small>'+
	                        '</div>'+
	                    '</div>'+
	                '</a>'+
	                '<a class="lv-item" href="">'+
	                    '<div class="media">'+
	                        '<div class="pull-left">'+
	                            '<img class="lv-img-sm" src="resources/images/chat/a4.jpg" alt="">'+
	                        '</div>'+
	                        '<div class="media-body">'+
	                            '<div class="lv-title">Glenn Jecobs</div>'+
	                            '<small class="lv-small">Ut vitae lacus sem ellentesque maximus, nunc sit amet varius dignissim, dui est consectetur neque</small>'+
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
	                            '<small class="lv-small">Proin laoreet commodo eros id faucibus. Donec ligula quam, imperdiet vel ante placerat</small>'+
	                        '</div>'+
	                    '</div>'+
	                '</a>'+
	            '</div>'+
	
	            '<a class="lv-footer" href="">View Previous</a>'+
	        '</div>'+
	
	    '</div>',
		        initialize: function(){
		        	 this.callParent(arguments);
		        } 
			});
		}
		
		var notifBtn =Ext.get('notificationBellID');
		Ext.Viewport.add(this.notificationOverlay);
	    this.notificationOverlay.showBy(notifBtn); 
	},

	dismissNotifItems : function(){
		var me = this;
		var notifItmesArr = $('.notifOverlayCls .notif-menu .listview .lv-body .lv-item');
		var timer = function doSetTimeout(i) {
			setTimeout(function(){
				$(notifItmesArr[i]).addClass('dismiss');
				if(i==notifItmesArr.length-1){
					me.notificationOverlay.hide();
					$('.notifOverlayCls .notif-menu .listview .lv-body .lv-item').removeClass('dismiss');
				}
			},i*100);
		};
		for(var i=0;i<notifItmesArr.length;i++){
			timer(i);
		}
		
		
	},
	
	msgTapHandler : function(cmp){
		$('.mainViewCls .rightPanelCls .skin-setttings .tab-pane .sidebar-tab-menu span').removeClass('select');
		$(cmp).addClass('select');
		$('.mainViewCls .rightPanelCls .x-innerhtml .skin-setttings .tab-pane .friend-status').addClass('slideOut');
		setTimeout(function(){
			$('.mainViewCls .rightPanelCls .x-innerhtml .skin-setttings .tab-pane .friend-status')[0].style.display = "none";
			$('.mainViewCls .rightPanelCls .x-innerhtml .skin-setttings .tab-pane .sidebar-overlay')[0].style.display = "block";
			$('.mainViewCls .rightPanelCls .x-innerhtml .skin-setttings .tab-pane .friend-status').removeClass('slideOut');
		},200);
		
	},
	
	chatTapHandler : function(cmp){
		$('.mainViewCls .rightPanelCls .skin-setttings .tab-pane .sidebar-tab-menu span').removeClass('select');
		$(cmp).addClass('select');
		$('.mainViewCls .rightPanelCls .x-innerhtml .skin-setttings .tab-pane .sidebar-overlay').addClass('slideOut');
		setTimeout(function(){
			$('.mainViewCls .rightPanelCls .x-innerhtml .skin-setttings .tab-pane .friend-status')[0].style.display = "block";
			$('.mainViewCls .rightPanelCls .x-innerhtml .skin-setttings .tab-pane .sidebar-overlay')[0].style.display = "none";
			$('.mainViewCls .rightPanelCls .x-innerhtml .skin-setttings .tab-pane .sidebar-overlay').removeClass('slideOut');
		},200);
		
	},
	
	minimiseChatPanel : function(cmp){
		$(cmp.parentElement.parentElement.parentElement.parentElement).toggleClass('minimised');
		if(Neighborhood.util.isPhone()){
			if($('.mainViewCls .rightPanelCls .x-innerhtml .skin-setttings .tab-pane .sidebar-overlay')[0].style.display=="" && $('.mainViewCls .rightPanelCls .x-innerhtml .skin-setttings .tab-pane .friend-status')[0].style.display==""){
				$('.mainViewCls .rightPanelCls .x-innerhtml .skin-setttings .tab-pane .friend-status')[0].style.display = "block";
			}else if(!$(cmp.parentElement.parentElement.parentElement.parentElement).hasClass('minimised')){
				if($('.mainViewCls .rightPanelCls .x-innerhtml .skin-setttings .tab-pane .friend-status')[0].style.display == "block"){
					$('.mainViewCls .rightPanelCls .x-innerhtml .skin-setttings .tab-pane .friend-status')[0].style.display = "none";
				}else if($('.mainViewCls .rightPanelCls .x-innerhtml .skin-setttings .tab-pane .sidebar-overlay')[0].style.display == "block"){
					$('.mainViewCls .rightPanelCls .x-innerhtml .skin-setttings .tab-pane .sidebar-overlay')[0].style.display = "none";
				}
			}else if($(cmp.parentElement.parentElement.parentElement.parentElement).hasClass('minimised')){
				if($('.mainViewCls .rightPanelCls .x-innerhtml .skin-setttings .tab-pane .sidebar-tab-menu .tab-item.select')[0].innerText == "ONLINE"){
					$('.mainViewCls .rightPanelCls .x-innerhtml .skin-setttings .tab-pane .friend-status')[0].style.display = "block";
				}else if($('.mainViewCls .rightPanelCls .x-innerhtml .skin-setttings .tab-pane .sidebar-tab-menu .tab-item.select')[0].innerText == "MESSAGES"){
					$('.mainViewCls .rightPanelCls .x-innerhtml .skin-setttings .tab-pane .sidebar-overlay')[0].style.display = "block";
				}
			}
			
		}
	},
	
	gotoDashboard : function(){
		var viewExist = true;
		if(!this.timelineView){
			this.timelineView = Ext.create('Neighborhood.view.timelineView');
			viewExist = false;
		}
		
		this.mainView.getComponent('detailPanelId').setActiveItem(this.timelineView);
		
		//set the information in view
		if(!viewExist){
			var timelineStore = Ext.getStore('timelineStore');
			for(var i=0;i<timelineStore.getCount();i++){
				if(i==0)
					$('#timelinePostId')[0].innerHTML += '<div class="tl-header now">Now</div>';
				else if(i==4)
					$('#timelinePostId')[0].innerHTML += '<div class="tl-header now">Yesterday</div>';
				
				var data = timelineStore.getAt(i).data;
				
				var htmlTemplate = '<div class="tl-entry">'+
					'<div class="tl-time">'+data.time+'</div>'+	//post time
					'<div class="tl-icon bg-success">'+
						'<img src="'+data.userPic+'" alt="">'+		//post user pic
					'</div>'+
					'<div class="panel tl-body">'+
						'<h4 class="text-warning" style="display : '+(data.title?'block':'none')+'">'+data.title+'</h4>'+	//post title
						//'<a href="#">Robert Jang</a> commented on <a href="#">The Article</a>'+	//post description
						data.description+
						
						'<div class="tl-wide text-center" style="padding: 10px;margin-top:15px;margin-bottom: 15px;background: #f1f1f1;display:'+(data.imageUrl?'block':'none')+'">'+	 //post image
							'<img src="'+data.imageUrl+'" alt="" style="max-height: 150px;max-width: 100%;">'+
						'</div>'+
						
						'<i class="text-muted text-sm" style="display:'+(data.imageComment?'block':'none')+'">'+data.imageComment+'</i>'+	 	//post image comments
						
						//comments section
						'<div style="margin-top: 10px;display:'+(data.commentsArr && data.commentsArr.length>0?'block':'none')+'" class="text-sm">'+
							'<img src="'+(data.commentsArr[0] && data.commentsArr[0].user_pic ? data.commentsArr[0].user_pic:'')+'" alt="" class="rounded" style=" width: 20px;height: 20px;margin-top: -2px;">&nbsp;&nbsp;'+  	//commented user pic
							'<a href="#">'+(data.commentsArr[0] && data.commentsArr[0].user_name ? data.commentsArr[0].user_name:'')+'</a> commented '+(data.commentsArr[0] && data.commentsArr[0].time ? data.commentsArr[0].time:'')+			//commented user time and name
							'<div class="well well-sm" style="margin: 6px 0 0 0;">'+(data.commentsArr[0] && data.commentsArr[0].commentText ? data.commentsArr[0].commentText:'')+  //actual comment
							'</div>'+
						'</div>'+
						
					'</div>'+
				'</div>';
					
					
				$('#timelinePostId')[0].innerHTML +=htmlTemplate;
			}
		}
		
		
		
		if(Neighborhood.util.isPhone()){
			Neighborhood.app.getController('MainController').switchProfilePanel();
		}
	},
	
	gotoProfileView : function(){
		var viewExist = true;
		if(!this.profileView){
			this.profileView = Ext.create('Neighborhood.view.profileView');
			viewExist = false;
		}
			
		
		this.mainView.getComponent('detailPanelId').setActiveItem(this.profileView);
		
		//set the information in view
		if(!viewExist){
			var userData = Ext.getStore('userProfileStore').getAt(0).data;
			var gender="Enter your gender";
			if(userData.gender=="M")
				gender = "Male";
			else if(userData.gender=="F")
				gender = "Female";
			
			
			$('#basic_info_name_id')[0].innerText = (userData.first_name ? userData.first_name+" " : "") + (userData.last_name ? userData.last_name : "");
			$('#basic_info_name_edit_id')[0].value = $('#basic_info_name_id')[0].innerText;
			
			$('#basic_info_gender_id')[0].innerText = gender;
			$('#basic_info_gender_edit_id')[0].value = gender;
			
			$('#basic_info_birthday_id')[0].innerText = userData.DOB ? userData.DOB : "Provide your date of birth";
			$('#basic_info_birthday_edit_id')[0].value = userData.DOB ? Ext.Date.format(new Date(userData.DOB),'Y-m-d') : "";
			
			$('#basic_info_rel_status_id')[0].innerText = userData.relationship_status ? userData.relationship_status : "Enter your relationship status";
			$('#basic_info_rel_status_edit_id')[0].value = userData.relationship_status ? userData.relationship_status : "Single";
			
			$('#basic_info_contact_number_id')[0].innerText = userData.contact_number ? userData.contact_number : "Provide your phone number";
			$('#basic_info_contact_number_edit_id')[0].value = userData.contact_number ? userData.contact_number : "Provide your phone number";
			
			$('#basic_info_mail_id')[0].innerText = userData.mail_id ? userData.mail_id : "Provide your mail Id";
			$('#basic_info_mail_edit_id')[0].value = userData.mail_id ? userData.mail_id : "Provide your mail Id";
			
			$('#basic_info_school_id')[0].innerText = userData.school ? userData.school : "Where did you go to school?";
			$('#basic_info_school_edit_id')[0].value = userData.school ? userData.school : "Where did you go to school?";
			
			$('#basic_info_college_id')[0].innerText = userData.college ? userData.college : "Where did you go to college?";
			$('#basic_info_college_edit_id')[0].value = userData.college ? userData.college : "Where did you go to college?";
			
			$('#basic_info_work_id')[0].innerText = userData.workplace ? userData.workplace : "Provide your work place name";
			$('#basic_info_work_edit_id')[0].value = userData.workplace ? userData.workplace : "Provide your work place name";
			
			
			if(!userData.latitude && !userData.longitude){
				Neighborhood.app.getController('user_map_controller').loadMapWithMarker('userMapContainer');
				$('#user_map_search_box_id').attr("placeholder", "Search to add your location..");
			}else if(userData.latitude && userData.longitude){
				Neighborhood.app.getController('user_map_controller').loadMapWithMarker('userMapContainer',{
					lat : parseFloat(userData.latitude),
					lng : parseFloat(userData.longitude)
				},'Your Home');
			}
				
			
		}
		
		if(Neighborhood.util.isPhone()){
			Neighborhood.app.getController('MainController').switchProfilePanel();
		}
		scrollPanelDomArr = $('.enableTouchScroll');
		for(var i=0;i<scrollPanelDomArr.length;i++){
			scrollPanelDomArr[i].addEventListener("touchmove", function(e){
		        e.stopPropagation();
		    }, false);
		}
	},
	
	gotoContactView : function(){
		if(!this.contactView)
			this.contactView = Ext.create('Neighborhood.view.contactView');
		
		this.mainView.getComponent('detailPanelId').setActiveItem(this.contactView)
		
		if(Neighborhood.util.isPhone()){
			Neighborhood.app.getController('MainController').switchProfilePanel();
		}
		scrollPanelDomArr = $('.enableTouchScroll');
		for(var i=0;i<scrollPanelDomArr.length;i++){
			scrollPanelDomArr[i].addEventListener("touchmove", function(e){
		        e.stopPropagation();
		    }, false);
		}
	},
	
	gotoEventView : function(){
		if(!this.eventView)
			this.eventView = Ext.create('Neighborhood.view.eventView');
		
		this.mainView.getComponent('detailPanelId').setActiveItem(this.eventView)
		
		if(Neighborhood.util.isPhone()){
			Neighborhood.app.getController('MainController').switchProfilePanel();
		}
		scrollPanelDomArr = $('.enableTouchScroll');
		for(var i=0;i<scrollPanelDomArr.length;i++){
			scrollPanelDomArr[i].addEventListener("touchmove", function(e){
		        e.stopPropagation();
		    }, false);
		}
	},
	
	gotoMapView : function(){
		if(!this.mapView)
			this.mapView = Ext.create('Neighborhood.view.mapView');
		
		this.mainView.getComponent('detailPanelId').setActiveItem(this.mapView)
		
		if(Neighborhood.util.isPhone()){
			Neighborhood.app.getController('MainController').switchProfilePanel();
		}
		scrollPanelDomArr = $('.enableTouchScroll');
		for(var i=0;i<scrollPanelDomArr.length;i++){
			scrollPanelDomArr[i].addEventListener("touchmove", function(e){
		        e.stopPropagation();
		    }, false);
		}
	},
	
	changePostAreaFormat : function(cmp,category){
		$('.mainViewCls .detailPanelCls .x-innerhtml .tab-nav .waves-effect.active').removeClass('active');
		$(cmp).addClass('active');
		if(category == 'Issue'){
			$('.mainViewCls .detailPanelCls .x-innerhtml .quick-update .title')[0].style.display="block";
		}else{
			$('.mainViewCls .detailPanelCls .x-innerhtml .quick-update .title')[0].style.display="none";
		}
	},
	
	go_to_neighborhood_view : function(){
		if(!this.neighborhood_view)
			this.neighborhood_view = Ext.create('Neighborhood.view.neighborhood_view');
		
		this.mainView.getComponent('detailPanelId').setActiveItem(this.neighborhood_view);
		
		Neighborhood.util.showStars();
	}
	
	
});