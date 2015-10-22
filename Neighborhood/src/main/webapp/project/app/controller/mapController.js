Ext.define('Neighborhood.controller.mapController',{
	extend: 'Ext.app.Controller',
	loadMap: function(){
		loadInitialCoordinates(function(){
			loadMap('mapContainer');
		});
	},
	loadMapWithMarker: function(divId,location){
		var me = this;
		if(location){
			me.placeMarker(divId,location)
		}
		google.maps.event.addListener(map, 'click', function(event) {
		    me.placeMarker(divId,event.latLng);
		});
	},
	placeMarker :function (divId,location,contentString,title) {
			var mymap = "";
			var mapOptions = {
	            zoom: 12,
	            maxZoom:20,
	            center: new google.maps.LatLng(location.lat, location.lng),
	            zoomControl:true,
	            zoomControlOptions:{style:"SMALL"},
	            mapTypeId: google.maps.MapTypeId.ROADMAP,
	            draggable:true
	        };
			mymap = new google.maps.Map(document.getElementById(divId),mapOptions);
		
		
		
		  var marker = new google.maps.Marker({
		      position: location, 
		      map: mymap,
		      title: (title ? title : '')
		  });
		  if(contentString && contentString != ''){
		  var infowindow = new google.maps.InfoWindow({
			    content: contentString
			  });

			  
			  marker.addListener('click', function() {
			    infowindow.open(mymap, marker);
			  });
		  }
		  
	},
	getMapPath: function(){
		return mapPolygon.latLngs.j;
	},
	reDrawPolyGon:  function(paths,markers){
		reDrawPolyGon(paths,function(){
			if(markers.length > 0){
				 for( i = 0; i < markers.length; i++ ) {
					me.placeMarker(markers[i].location,markers[i].contentString,markers[i].title);
				 }
			}
			google.maps.event.addListener(map, 'click', function(event) {
			    me.placeMarker(event.latLng);
			  });
		});
	}
	
});