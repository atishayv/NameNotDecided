Ext.define('Neighborhood.controller.MainController',{
	
	extend: 'Ext.app.Controller',
	
	
	index : function(){
		Neighborhood.app.getController('loginController').index();
		
	},
	
	showMainView : function(){
		this.mainView = Ext.create('Neighborhood.view.mainView');
		
		Ext.Viewport.add(this.mainView);
		Ext.Viewport.setActiveItem(this.mainView);
		
		this.mainView.getComponent('detailPanelId').on('activeitemchange', function(cmp,newCard, oldCard) {
            if (oldCard) {
                this.remove(oldCard, false);                    
            }
        }, this.mainView.getComponent('detailPanelId'));
		
		this.gotoDashboard();
		
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
		if(!this.timelineView)
			this.timelineView = Ext.create('Neighborhood.view.timelineView');
		
		this.mainView.getComponent('detailPanelId').setActiveItem(this.timelineView)
		/*Neighborhood.app.getController('MainController').mainView.getComponent('detailPanelId').animateActiveItem(0,{
            type: 'slide',
            direction: 'left'
		});*/
		if(Neighborhood.util.isPhone()){
			Neighborhood.app.getController('MainController').switchProfilePanel();
		}
	},
	
	gotoProfileView : function(){
		if(!this.profileView)
			this.profileView = Ext.create('Neighborhood.view.profileView');
		
		this.mainView.getComponent('detailPanelId').setActiveItem(this.profileView);
		
		/*Neighborhood.app.getController('MainController').mainView.getComponent('detailPanelId').animateActiveItem(1,{
            type: 'slide',
            direction: 'left'
		});*/
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
		
		/*Neighborhood.app.getController('MainController').mainView.getComponent('detailPanelId').animateActiveItem(2,{
            type: 'slide',
            direction: 'left'
		});*/
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
		
		/*Neighborhood.app.getController('MainController').mainView.getComponent('detailPanelId').animateActiveItem(3,{
            type: 'slide',
            direction: 'left'
		});*/
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
		
		/*Neighborhood.app.getController('MainController').mainView.getComponent('detailPanelId').animateActiveItem(3,{
            type: 'slide',
            direction: 'left'
		});*/
		if(Neighborhood.util.isPhone()){
			Neighborhood.app.getController('MainController').switchProfilePanel();
		}
		scrollPanelDomArr = $('.enableTouchScroll');
		for(var i=0;i<scrollPanelDomArr.length;i++){
			scrollPanelDomArr[i].addEventListener("touchmove", function(e){
		        e.stopPropagation();
		    }, false);
		}
	}
	
	
});