Ext.define('Neighborhood.controller.mapController',{
	extend: 'Ext.app.Controller',
	loadMap: function(){
		loadInitialCoordinates(function(){
			loadMap('mapContainer');
		});
	},
	loadMapWithMarker: function(divId,location){
		var me = this;
		
		var mymap = "";
		var mapOptions = {
            zoom: 12,
            maxZoom:20,
            //center: new google.maps.LatLng(location.lat, location.lng),
            zoomControl:true,
            zoomControlOptions:{style:"SMALL"},
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            draggable:true
        };
		mymap = new google.maps.Map(document.getElementById(divId),mapOptions);
		
		
		//for enabling search box in map
		// Create the search box and link it to the UI element.
		var input = document.getElementById('user_map_search_box_id');
	    var searchBox = new google.maps.places.SearchBox(input);
	    mymap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
		
	 // Bias the SearchBox results towards current map's viewport.
	    mymap.addListener('bounds_changed', function() {
	      searchBox.setBounds(mymap.getBounds());
	    });
	    
	    
	    var markers = [];
	    // Listen for the event fired when the user selects a prediction and retrieve
	    // more details for that place.
	    searchBox.addListener('places_changed', function() {
	      var places = searchBox.getPlaces();

	      if (places.length == 0) {
	        return;
	      }

	      // Clear out the old markers.
	      markers.forEach(function(marker) {
	        marker.setMap(null);
	      });
	      markers = [];

	      // For each place, get the icon, name and location.
	      var bounds = new google.maps.LatLngBounds();
	      places.forEach(function(place) {
	        var icon = {
	          url: place.icon,
	          size: new google.maps.Size(71, 71),
	          origin: new google.maps.Point(0, 0),
	          anchor: new google.maps.Point(17, 34),
	          scaledSize: new google.maps.Size(25, 25)
	        };

	        // Create a marker for each place.
	        var marker = new google.maps.Marker({
		          map: mymap,
		          icon: icon,
		          title: place.name,
		          position: place.geometry.location
		        });
	        
	        var infowindow = new google.maps.InfoWindow({
	        	content: '<b>Do you want this to be your home location??<b><button>Save</button>'
		    });
		    marker.addListener('click', function() {
		        infowindow.open(mymap, marker);
		    });
		    
	        markers.push(marker);
	        
	        
	        
	        if (place.geometry.viewport) {
	          // Only geocodes have viewport.
	          bounds.union(place.geometry.viewport);
	        } else {
	          bounds.extend(place.geometry.location);
	        }
	      });
	      mymap.fitBounds(bounds);
	    });
		
		
		if(location){
			me.placeMarker(mymap,location)
		}else{
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position){
					me.placeMarker(mymap,{
						lat : position.coords.latitude,
						lng : position.coords.longitude
					});
				});
		    } else {
		    	console.log("Geolocation is not supported by this browser.");
		    }
		}
		/*google.maps.event.addListener(mymap, 'click', function(event) {
		    me.placeMarker(mymap,divId,event.latLng);
		});*/
	},
	
	placeMarker :function (map,location,contentString,title) {
		map.setCenter(new google.maps.LatLng(location.lat, location.lng));
		
		
		
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