Ext.define('Neighborhood.view.search_results_view',{
	
	extend: 'Ext.Panel',
	xtype: 'search_results_view',
	
	config:{
		cls: 'search_results_view_cls'+(Neighborhood.util.isPhone() ? ' search_results_view_phone_cls' : ''),
		showAnimation: {
            type: 'slideIn',
            direction:'right'
        },
		listeners:{
			show : function(){
				Neighborhood.util.load_map_with_coordinates("small_map_id",12.77,12.33);
				Neighborhood.util.load_map_with_coordinates("small_map_id_1",12.77,12.33);
				Neighborhood.util.load_map_with_coordinates("small_map_id_2",12.77,12.33);
			}
		},
		
		items:[
		       {
		    	   xtype : 'panel',
		    	   cls : 'search_results_view_panel_cls',
		    	   itemId:'search_results_view_panel_id',
		    	   html : '<div class="search_results_container_div_cls">'+
		    		   			'<div class="search_result_item_cls">'+
		       						'<img src="resources/images/apartment_profile.jpeg"></img>'+
		       						'<span class="description_cls">Corporate Leisure and Property Developments Pvt Ltd has launched yet another project in Bangalore. Suncity Gloria is located in Sarjapur Road.Suncity Gloria is the latest and the most delectable offering from M/s. Corporate Leisure & Property development (P) ltd after their phenomenal success of highly acclaimed mega-condominium project “Suncity”.Perfectly located on Sarjapur road, 5 minutes drive from the Wipro corporate office, Suncity Gloria is spread over 10 acres of land. With 75% of the available space dedicated to beautifully landscaped gardens and amenities, all apartments face lush green spaces. This gated community is conceived to provide the discerning young families with high quality housing loaded with amenities at true value prices.</span>'+
		       						'<div class="small_map_cls" id="small_map_id">mapView</div>'+
		       					'</div>'+
		       					
		       					'<div class="search_result_item_cls">'+
		       						'<img src="resources/images/apartment_profile.jpeg"></img>'+
		       						'<span class="description_cls">Corporate Leisure and Property Developments Pvt Ltd has launched yet another project in Bangalore. Suncity Gloria is located in Sarjapur Road.Suncity Gloria is the latest and the most delectable offering from M/s. Corporate Leisure & Property development (P) ltd after their phenomenal success of highly acclaimed mega-condominium project “Suncity”.Perfectly located on Sarjapur road, 5 minutes drive from the Wipro corporate office, Suncity Gloria is spread over 10 acres of land. With 75% of the available space dedicated to beautifully landscaped gardens and amenities, all apartments face lush green spaces. This gated community is conceived to provide the discerning young families with high quality housing loaded with amenities at true value prices.</span>'+
		       						'<div class="small_map_cls" id="small_map_id_1">mapView</div>'+
		       					'</div>'+
		       					
		       					'<div class="search_result_item_cls">'+
		       						'<img src="resources/images/apartment_profile.jpeg"></img>'+
		       						'<span class="description_cls">Corporate Leisure and Property Developments Pvt Ltd has launched yet another project in Bangalore. Suncity Gloria is located in Sarjapur Road.Suncity Gloria is the latest and the most delectable offering from M/s. Corporate Leisure & Property development (P) ltd after their phenomenal success of highly acclaimed mega-condominium project “Suncity”.Perfectly located on Sarjapur road, 5 minutes drive from the Wipro corporate office, Suncity Gloria is spread over 10 acres of land. With 75% of the available space dedicated to beautifully landscaped gardens and amenities, all apartments face lush green spaces. This gated community is conceived to provide the discerning young families with high quality housing loaded with amenities at true value prices.</span>'+
		       						'<div class="small_map_cls" id="small_map_id_2">mapView</div>'+
		       					'</div>'+
		    		   '</div>'
		    		   
		       }
		      ]
		
	}

});