Ext.define('Neighborhood.controller.mapController',{
	extend: 'Ext.app.Controller',
	loadMap: function(){
		loadInitialCoordinates(function(){
			loadMap('mapContainer');
		});
	},
	loadMapWithMarker: function(divId,location){
		var me = this;
		loadMap(divId,function(){
			if(location){
				me.placeMarker(location)
			}
			google.maps.event.addListener(map, 'click', function(event) {
			    me.placeMarker(event.latLng);
			  });
		});
	},
	placeMarker :function (location,contentString,title) {
		  var marker = new google.maps.Marker({
		      position: location, 
		      map: map,
		      title: (title ? title : '')
		  });
		  if(contentString && contentString != ''){
		  var infowindow = new google.maps.InfoWindow({
			    content: contentString
			  });

			  
			  marker.addListener('click', function() {
			    infowindow.open(map, marker);
			  });
		  }
		  
		  map.setCenter(location);
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