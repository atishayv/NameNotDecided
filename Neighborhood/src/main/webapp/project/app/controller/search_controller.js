Ext.define('Neighborhood.controller.search_controller',{
	
	extend: 'Ext.app.Controller',
	
	
	on_search : function(e){
		var code = (e.keyCode ? e.keyCode : e.which);
		if(code == 13) { //Enter keycode
			if(!this.search_results_view){
				this.search_results_view = Ext.create('Neighborhood.view.search_results_view');
			}
				
			Neighborhood.app.getController('MainController').mainView.getComponent('detailPanelId').setActiveItem(this.search_results_view);
		}
	}

});