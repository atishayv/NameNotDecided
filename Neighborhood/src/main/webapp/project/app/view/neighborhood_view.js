Ext.define('Neighborhood.view.neighborhood_view',{
	
	extend: 'Ext.Panel',
	xtype: 'neighborhood_view',
	
	config:{
		cls: 'neighborhood_view_cls'+(Neighborhood.util.isPhone() ? ' neighborhood_view_phone_cls' : ''),
		listeners:{},
		
		items:[
		       {
		    	   xtype:'panel',
		    	   cls : 'neighborhood_view_panel_cls',
		    	   itemId:'neighborhood_view_panel_id',
		    	   html : '<div class="cover_photo_cls">'+
                            '<div class="profile_pic_cls">'+
                                '<img src="resources/images/apartment_profile.jpeg">'+
                            '</div>'+

                            '<div class="profile_info_cls">'+
                                'Suncity Gloria'+
                            '</div>'+
                        '</div>'+
                        
                        '<div class="card">'+
                            '<div class="card-header">'+
                                '<h2>About Suncity Gloria</h2>'+
                            '</div>'+
                            
                            '<div class="card-body">'+
                                'Corporate Leisure and Property Developments Pvt Ltd has launched yet another project in Bangalore. Suncity Gloria is located in Sarjapur Road.Suncity Gloria is the latest and the most delectable offering from M/s. Corporate Leisure & Property development (P) ltd after their phenomenal success of highly acclaimed mega-condominium project “Suncity”.Perfectly located on Sarjapur road, 5 minutes drive from the Wipro corporate office, Suncity Gloria is spread over 10 acres of land. With 75% of the available space dedicated to beautifully landscaped gardens and amenities, all apartments face lush green spaces. This gated community is conceived to provide the discerning young families with high quality housing loaded with amenities at true value prices.'+
                            '</div>'+
                        '</div>'+
                            
                        '<div class="card card_half">'+
	                        '<div class="card-header">'+
	                            '<h2>At A Glance</h2>'+
	                        '</div>'+
	                        
	                        '<div class="card-body">'+
	                            '<ul>'+
	                            '<li>Project Type - Apartment</li>'+
	                            '<li>Project Status - Ready to Move</li>'+
	                            '<li>Blocks - 2</li>'+
	                            '<li>Wings - 5</li>'+
	                            '<li>Units - More than 1000</li>'+
	                            '<li>Area Range - 804 - 1557 Sq. Ft.</li>'+
	                            '<li>Location :'+
	                                '<ul>'+
	                                    '<li>Opp. to upcoming SEZ</li>'+
	                                    '<li>3KM from Wipro Corporate Office</li>'+
	                                    '<li>Opp. to Decathlon Sports</li>'+
	                                '</ul>'+
	                                '</li><li>Land Size - 10 Acres</li>'+
	                        	'</ul>'+
	                        '</div>'+
                        '</div>'+
                        
                        '<div class="card card_half">'+
                        '<div class="card-header">'+
                            '<h2>Project Specifications</h2>'+
                        '</div>'+
                        
                        '<div class="card-body">'+
                            '<ul>'+
                            '<li>Structure : RCC framed structure</li>'+
                            '<li>Walls : External are 8”, Internal are 6” R.C.C constructed.</li>'+
                            '<li>Lobbies & corridors : All lobbies and corridors elegantly finished in Granite / Vitrified tiles.</li>'+
                            '<li>Doors : Main door- Teak Wood door frame with threshold and flush door shutter finished</li>'+
                            '<li>Internal doors: Sal Wood door frame with flush shutters with enamel paint.</li>'+
                            '<li>Windows : Anodized glazed aluminium sliding windows with mosquito mesh and MS grills.</li>'+
                        	'</ul>'+
                        '</div>'+
                    '</div>'+
                        
                    '<div class="card">'+
	                    '<div class="card-header">'+
	                        '<h2>Nearby</h2>'+
	                    '</div>'+
	                    
	                    '<div class="card-body">'+
	                    	'<div class="panel-group" id="accordion">'+
							'<div class="panel panel-default">'+
								'<div class="panel-heading">'+
									'<h4 class="panel-title">'+
										'<a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">School</a>'+
									'</h4>'+
								'</div>'+
								'<div id="collapseOne" class="panel-collapse collapse in">'+
									'<div class="panel-body">'+
										'<div class="text-content">'+
											'<div>St. Pauls English School</div>'+
											'<span class="stars">4</span> ICSE<br>'+
											'3rd A Cross, Near-Woodies Hotel, J P Nagar 2nd Phase, KSRTC Layout, 3rd Phase, J P Nagar, Bengaluru, Karnataka 560078'+
										'</div>'+
										'<div class="image-content">'+
											'<img src="resources/images/no_school.png">'+
										'</div>'+
									'</div>'+
									'<div class="panel-body">'+
										'<div class="text-content">'+
											'<div>St. Pauls English School</div>'+
											'<span class="stars">4</span> ICSE<br>'+
											'3rd A Cross, Near-Woodies Hotel, J P Nagar 2nd Phase, KSRTC Layout, 3rd Phase, J P Nagar, Bengaluru, Karnataka 560078'+
										'</div>'+
										'<div class="image-content">'+
											'<img src="resources/images/no_school.png">'+
										'</div>'+
									'</div>'+
									'<div class="panel-body">'+
										'<div class="text-content">'+
											'<div>St. Pauls English School</div>'+
											'<span class="stars">4</span> ICSE<br>'+
											'3rd A Cross, Near-Woodies Hotel, J P Nagar 2nd Phase, KSRTC Layout, 3rd Phase, J P Nagar, Bengaluru, Karnataka 560078'+
										'</div>'+
										'<div class="image-content">'+
											'<img src="resources/images/no_school.png">'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>'+
							'<div class="panel panel-default">'+
								'<div class="panel-heading">'+
									'<h4 class="panel-title">'+
										'<a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">Hospital</a>'+
									'</h4>'+
								'</div>'+
								'<div id="collapseTwo" class="panel-collapse collapse">'+
									'<div class="panel-body">'+
										'<div class="text-content">'+
											'<div>Apollo Cradle</div>'+
											'<span class="stars">4</span> ICSE<br>'+
											'3rd A Cross, Near-Woodies Hotel, J P Nagar 2nd Phase, KSRTC Layout, 3rd Phase, J P Nagar, Bengaluru, Karnataka 560078'+
										'</div>'+
										'<div class="image-content">'+
											'<img src="resources/images/no_school.png">'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>'+
							'<div class="panel panel-default">'+
								'<div class="panel-heading">'+
									'<h4 class="panel-title">'+
										'<a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">ATM</a>'+
									'</h4>'+
								'</div>'+
								'<div id="collapseThree" class="panel-collapse collapse">'+
									'<div class="panel-body">'+
										'<div class="text-content">'+
											'<div>State Bank ATM</div>'+
											'<span class="stars">4</span> ICSE<br>'+
											'3rd A Cross, Near-Woodies Hotel, J P Nagar 2nd Phase, KSRTC Layout, 3rd Phase, J P Nagar, Bengaluru, Karnataka 560078'+
										'</div>'+
										'<div class="image-content">'+
											'<img src="resources/images/no_school.png">'+
										'</div>'+
										'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
	                    '</div>'+
                    '<div>'
		       }
		       ]
	}

});