	var map;
	var TILE_SIZE = 256;
	var alreadyInFavDB = false;
	var mapCenter;
	var searchFor = {
	    //defaultLocation: "United States",
	    defaultCoords : [12.870347, 77.65619500000003],
	    title: "",
	    keyword: "",
	    category: []
	};
	var searchFormReset,searchErrorField;
	var markerList = new Array();
	var usStates_Capitals = [['Alabama','Montgomery'],['Alaska','Juneau'],['Arizona','Phoenix'],['Arkansas','Little Rock'],['California','Sacramento'],
			['Colorado','Denver'],['Connecticut','Hartford'],['Delaware','Dover'],['Florida','Tallahassee'],['Georgia','Atlanta'],
			['Hawaii','Honolulu'],['Idaho','Boise'],['Illinois','Springfield'],['Indiana','Indianapolis'],['Iowa','Des Moines'],
			['Kansas','Topeka'],['Kentucky','Frankfort'],['Louisiana','Baton Rouge'],['Maine','Augusta'],['Maryland','Annapolis'],
			['Massachusetts','Boston'],['Michigan','Lansing'],['Minnesota','Saint Paul'],['Mississippi','Jackson'],['Missouri','Jefferson City'],
			['Montana','Helena'],['Nebraska','Lincoln'],['Nevada','Carson City'],['New Hampshire','Concord'],['New Jersey','Trenton'],
			['New Mexico','Santa Fe'],['New York','Albany'],['North Carolina','Raleigh'],['North Dakota','Bismarck'],['Ohio','Columbus'],
			['Oklahoma','Oklahoma City'],['Oregon','Salem'],['Pennsylvania','Harrisburg'],['Rhode Island','Providence'],['South Carolina','Columbia'],
			['South Dakota','Pierre'],['Tennessee','Nashville'],['Texas','Austin'],['Utah','Salt Lake City'],['Vermont','Montpelier'],
			['Virginia','Richmond'],['Washington','Olympia'],['West Virginia','Charleston'],['Wisconsin','Madison'],['Wyoming','Cheyenne']]
	var locMap = new Array();
	var mapPolyline, mapPolygon, polyLinesPath, pathEquations, polygonPath, drawing = false;
	var mapLoaded = false, mapLoadedCheckCounter = 0, allowDefaultShowSearch = true;
	var resBounds, request, service;
	var popupTemplate = "<div id=\"{itemId}\" onclick='storePOIToFavoriteDB(this,\"{itemName}\", \"{itemAddress}\")' class='favicon-baseCls favicon-inactive'></div>"+
	  "<div style='font-size:1.5em;font-weight:bold;'>{itemName}</div>"+
	  //"<div style='font-size:1.0em;font-weight:bold;'>{itemType}</div>"+
	  "<div style='font-size:1.0em;'>{itemAddress}</div>";
	
	
	function bound(value, opt_min, opt_max) {
	    if (opt_min != null) value = Math.max(value, opt_min);
	    if (opt_max != null) value = Math.min(value, opt_max);
	    return value;
	}

	function degreesToRadians(deg) {
	    return deg * (Math.PI / 180);
	}

	function radiansToDegrees(rad) {
	    return rad / (Math.PI / 180);
	}

	function MercatorProjection() {
	    this.pixelOrigin_ = new google.maps.Point(TILE_SIZE / 2,
	    TILE_SIZE / 2);
	    this.pixelsPerLonDegree_ = TILE_SIZE / 360;
	    this.pixelsPerLonRadian_ = TILE_SIZE / (2 * Math.PI);
	}

	MercatorProjection.prototype.fromLatLngToPoint = function (latLng,
	opt_point) {
	    var me = this;
	    var point = opt_point || new google.maps.Point(0, 0);
	    var origin = me.pixelOrigin_;

	    point.x = origin.x + latLng.lng() * me.pixelsPerLonDegree_;

	    // NOTE(appleton): Truncating to 0.9999 effectively limits latitude to
	    // 89.189.  This is about a third of a tile past the edge of the world
	    // tile.
	    var siny = bound(Math.sin(degreesToRadians(latLng.lat())), -0.9999,
	    0.9999);
	    point.y = origin.y + 0.5 * Math.log((1 + siny) / (1 - siny)) * -me.pixelsPerLonRadian_;
	    return point;
	};

	MercatorProjection.prototype.fromPointToLatLng = function (point) {
	    var me = this;
	    var origin = me.pixelOrigin_;
	    var lng = (point.x - origin.x) / me.pixelsPerLonDegree_;
	    var latRadians = (point.y - origin.y) / -me.pixelsPerLonRadian_;
	    var lat = radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2);
	    return new google.maps.LatLng(lat, lng);
	};

	function createInfoWindowContent() {
	    var numTiles = 1 << map.getZoom();
	    var projection = new MercatorProjection();
	    var worldCoordinate = projection.fromLatLngToPoint(chicago);
	    var pixelCoordinate = new google.maps.Point(
	    worldCoordinate.x * numTiles,
	    worldCoordinate.y * numTiles);
	    var tileCoordinate = new google.maps.Point(
	    Math.floor(pixelCoordinate.x / TILE_SIZE),
	    Math.floor(pixelCoordinate.y / TILE_SIZE));

	    return [
	        'Chicago, IL',
	        'LatLng: ' + chicago.lat() + ' , ' + chicago.lng(),
	        'World Coordinate: ' + worldCoordinate.x + ' , ' + worldCoordinate.y,
	        'Pixel Coordinate: ' + Math.floor(pixelCoordinate.x) + ' , ' + Math.floor(pixelCoordinate.y),
	        'Tile Coordinate: ' + tileCoordinate.x + ' , ' + tileCoordinate.y + ' at Zoom Level: ' + map.getZoom()].join('<br>');
	}

	function getCurrectLoc() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(
	        setCurrentPositionFromLocation,
	        errorGettingPosition, {
	            'enableHighAccuracy': false,
	            'timeout': 5000,
	            'maximumAge': 0
	        });
	    }
	}

	function resetMarkerList() {
		console.log("resetMarkerList()");
		//if (document.getElementById('mapdrawtoolid'))
			//document.getElementById('mapdrawtoolid').innerHTML = '<b>Start Drawing</b>';

	    if (markerList && markerList.length > 0) {
	        for (i in markerList) {
	            markerList[i].setMap(null);
	        }
	        markerList.length = 0;
	    }
	}

	function loadResults(resultArray) {
		console.log("loadResults()", resultArray);
	    showMap();
	    google.maps.event.trigger(map, "resize");
	    //document.getElementById("picLoc").style.visibility = "visible";
	    resetMarkerList();
	    
    resBounds = new google.maps.LatLngBounds();
	    for (var i = 0; i < resultArray.length; i++) {
	        var result = resultArray[i];
	        var resPos = result.location;
	        resBounds.extend(resPos);
	        addMarkerToMap(result);
	    }

	    if(resultArray.length >0)
    	{
	    	callPlayVoice('I found ' + resultArray.length + ' pickup location' + (resultArray.length > 1 ? 's' : '') + ' near by. Please choose ' + (resultArray.length == 1 ? 'if' : 'where') + ' you would like to pickup your order.')
    	}
	    else
    	{
	    	
	    	callPlayVoice('I could not find any pickup locations near by. Please change selection and try again.');
    	}
    zoomToResults();
}
	   
function zoomToResults(){
	if (resBounds && !resBounds.equals(new google.maps.LatLngBounds())) {
    	map.fitBounds(resBounds);
    	mapPolygon.setOptions({fillColor:"#00dddd",});
    }
	else if(mapPolygon)
	        {
		mapPolygon.setOptions({fillColor:"#ff0000",});
		map.fitBounds(mapPolygon.getBounds());
		map.setOptions({	draggable:true});
	        }
	else if(request.location){
    	map.panTo(request.location);
    	map.setZoom(9);
	    }
	}
	
function failPolygon(){
		if(mapPolygon)
		{
			mapPolygon.setOptions({fillColor:"#ff0000"});
		map.fitBounds(mapPolygon.getBounds());
		}
	}

function search(searchCoords){
    request = {
	        name: searchFor.keyword,
	        types: searchFor.category
	    };
    if(mapPolygon && !mapPolygon.getBounds().isEmpty()){
		request.bounds = mapPolygon.getBounds();
	}
	else{
		//request.rankBy = google.maps.places.RankBy.PROMINENCE;
		//request.radius = '50000';
    	request.location = searchCoords ? searchCoords:map.getCenter();
    	request.rankBy = google.maps.places.RankBy.DISTANCE;
    	mapPolygon=null;
	}
    service = service || new google.maps.places.PlacesService(map);
    service.nearbySearch(request, searchCallback);
}

function customsearch(searchCoords, searchCategory, searchKeyword){
    request = {
	        name: searchKeyword,
	        types: searchCategory
	    };
    if(mapPolygon && !mapPolygon.getBounds().isEmpty()){
		request.bounds = mapPolygon.getBounds();
	}
	else{
		//request.rankBy = google.maps.places.RankBy.PROMINENCE;
		//request.radius = '50000';
    	request.location = searchCoords ? searchCoords:map.getCenter();
    	request.rankBy = google.maps.places.RankBy.DISTANCE;
    	mapPolygon=null;
	}
    service = service || new google.maps.places.PlacesService(map);
    service.nearbySearch(request, searchCallback);
}


function searchCallback(results, status) {
	console.log("nearby search callback");
	document.getElementById('searchMapLoad').style.display = "none";
	//if (document.getElementById('mapdrawtoolid'))
		//document.getElementById('mapdrawtoolid').innerHTML = '<b>Start Drawing</b>';

    var searchResults = [];
    if(status==google.maps.places.PlacesServiceStatus.ZERO_RESULTS){
    	callPlayVoice('I could not find any results. Please retry searching by drawing on map.');
    	//searchErrorField.innerHTML = "No pickup locations found. Please change Search Criteria and try again.";
    	resetMarkerList();
        zoomToResults();
    } 
    else if (status == google.maps.places.PlacesServiceStatus.OK) {
	        if (results.length) {
	        	
	        	
	        	
	            var limit = Math.min(results.length, 6);
            
	            for(var i = 0;i<results.length;i++) {
	            	var resName = (results[i].name)?results[i].name:"";
	                var resPos = results[i].geometry.location;
	                var resAddr = results[i].formatted_address || results[i].vicinity || "";
	                if (avoidDuplicateResults(searchResults,resPos, resAddr) && (mapPolygon ? mapPolygon.containsLatLng(resPos) : true)) {
	                    searchResults.push({
	                        "location": resPos,
	                        "address": resAddr,
	                        "name": resName,
	                        "id": results[i].id
	                    });
	                }
                if(searchResults.length >= limit)
                	{
	                	break;
                	}
	            }
	            loadResults(searchResults);
	        } else {
        	callPlayVoice('I could not find any results nearby. Please retry searching by drawing on map.');
        	//searchErrorField.innerHTML = "Search Criteria resulted in a " + status;
            //failPolygon();
            zoomToResults();
	        }
	    } else {
        console.log("searchCallback : Error : " + status + " occured.");
        //searchErrorField.innerHTML = "Sorry! Search Criteria resulted in a " + status;
        
        zoomToResults();
	    }
	    setTimeout(function(){
        	map.setOptions({
        		draggable: true
        	});
        },1500);
	}
	
	function addMarkerToMap(result) {
		console.log(result);
		//alreadyInDB(result["name"]);
		//console.log("svg path : "+result.svgpathid);
		console.log(result.name);
		console.log(result.address);
		console.log(result.id);
		console.log("Location : "+result.location);
		
		var location = new google.maps.LatLng(result.location.A,result.location.F);
		
		var marker = new google.maps.Marker({
            position: location,
            map: map,
            title: result.name,
            optimized:false
        });

		markerList.push(marker);
        app.eva.db.markerList.push(marker);
        
        marker.setMap(map);
        
        setTimeout(function () {
            marker.setAnimation(null);
        }, 2000);
		
        var options = result["options"];
        console.log(markerList,popupTemplate);
        console.log(result,popupTemplate);
        var popupMarkup = popupTemplate.replace(/{itemName}/g,result["name"]).
		 replace(/{itemType}/g,searchFor.category).
		 replace(/{itemId}/g,'poi-'+result["id"]).
		 replace(/{itemAddress}/g,result["address"]);
        console.log(popupMarkup );
		var thumbnailImg = result["thumbnail"]; 
		
		if(thumbnailImg){
			popupMarkup += '<img src="'+thumbnailImg+'" class="thumbNailImgCls"/>';
		}
		
		if(options && options.length > 0){
			for(var a=0; a < options.length; a++) {
				if (options[a]["value"].indexOf("http") == 0) {
					popupMarkup += "<a href='javascript:app.eva.maps.handleAnchorReferences(\""+options[a]["value"]+"\")'>"+options[a]["name"]+"</a>&nbsp;&nbsp;";
				} else if (app.eva.maps.isOptionEmail(options[a]["value"])) {
					try {
						popupMarkup += "<a href='javascript:void(0)' onclick='javascript:app.eva.maps.handleEmailReferences(\""+options[a]["value"]+"\")'>"+options[a]["name"]+"</a>&nbsp;&nbsp;";
					} catch (e) {
						popupMarkup += "<a href='mailto:"+options[a]["value"]+"'>"+options[a]["name"]+"</a>&nbsp;&nbsp;";
					}
				} else {
					popupMarkup += "<span style='margin: 0px;'><b>"+options[a]["name"]+":</b> "+options[a]["value"]+"</span>";
				}
				popupMarkup += "<br/>";
			}
		}
		
		popupMarkup += "<a href='javascript:openDirectionsToView(\""+result["address"]+"\")'>Directions To Here</a>&nbsp;&nbsp;<a href='javascript:openDirectionsFromView(\""+result["address"]+"\")'>Directions From Here</a>";

        var item = { 'name' : marker.title, 'id' :'poi-'+result["id"]  };
		var itemId = 'poi-'+result["id"];
		console.log('itemId='+itemId);
		
		var infowindow = new google.maps.InfoWindow({
	        content: popupMarkup
	    });
	    
		google.maps.event.addListener(marker, 'mousedown', function (e) {
			infowindow.open(map,marker);
	    });
		google.maps.event.addListener(infowindow, 'domready', function(){
			//app.eva.db.checkFavorites(item);
		}); 
		//google.maps.event.addDomListener(window, 'load', app.eva.db.checkFavorites(item));
	}

	function callPlayVoice(voiceData) {
	    setTimeout(function () {
	        appCommon.voiceData = voiceData;
	        //'I found 6 pickup locations near by. Please choose where you would like to pickup your order.';
	       //Ankita playVoice();
	    }, 1500);
	}

	function errorGettingPosition(err) {
	    //setTimeout(function(){if(!drawing && allowDefaultShowSearch)showSearch();},200);
		if(!drawing && allowDefaultShowSearch){
			if (err.code == 1) {
    			//showSearch();
    			//callPlayVoice("Please enter your location details and Search");
    	    } else if (err.code == 2) {
    			//showSearch();
    			//callPlayVoice('Your position is currently unavailable. Please try searching or try again later');
		    } else if (err.code == 3) {
    			//showSearch();
    			//callPlayVoice('Your position is currently unavailable. Please try searching or try again later');
		    	console.log("Timeout expired.");
		    } else {
				//showSearch();
				//callPlayVoice("Please enter your location details and Search");
	    		console.log("ERROR:" + err.message);
		    }
			initializeMap();
			search(mapCenter);
		}
	}

	function clearPolys()
	{
		if(drawing){
			resetMarkerList();
		}
		//jsUtilRemoveClass(document.getElementById('mapContainer'),"mapDraw");
		polyLinesPath = new google.maps.MVCArray();
		polygonPath = new google.maps.MVCArray();
		pathEquations = [];
		
		if (mapPolyline) mapPolyline.setOptions({
		    path: polyLinesPath,
		    map: null
		});
		mapPolyline = null;
		if (mapPolygon) mapPolygon.setOptions({
		    path: polygonPath,
		    map: null
		});
	    mapPolygon=null;
	}
	function reDrawPolyGon(paths,callBackFn){
		corArray = [];
		for(var i = 0;i<paths[0].j.length;i++){
			corArray.push({'lat':paths[0].j[i].G,'lng':paths[0].j[i].K});
			}
		  mapPolygon = new google.maps.Polygon({
		        strokeColor: '#ff0000',
		        strokeOpacity: 0,//.5,
		        fillColor: '#00dddd',
		        fillOpacity: 0.15,
		        strokeWeight: 3,
		        clickable: true,
		        geodesic: true,
		        draggable: true,
		        paths: corArray
		    });
		  mapPolygon.setMap(map);
		  if (callBackFn && typeof (callBackFn) == "function") callBackFn();
	}
	function startDrawing() {
		console.log("drawing started");
		//document.getElementById('mapdrawtoolid').innerHTML = 'In Progress';

        
        
		var bod = document.body;
		var noScroll = function(event){ console.log('scroll event prevented'); event.preventDefault(); event.stopPropagation(); };
		
	    
		drawing = true;
		allowDefaultShowSearch = false;
		
	    var mapDownHandler, mapMoveHandler, polylineUpHandler, mapOutHandler, mapUpHandler;
	    
	    showMap();
	    resetSearchForm();
	    clearPolys();
	    //jsUtilAddClass(document.getElementById('mapContainer'),"mapDraw");
	    
	    
	    mapPolyline = new google.maps.Polyline({
	        strokeColor: '#0000ff',
	        strokeOpacity: 0.6,
	        strokeWeight: 3,
	        clickable: false,
	        geodesic: true,
	        map: map
	    });
	    mapPolygon = new google.maps.Polygon({
	        strokeColor: '#ff0000',
	        strokeOpacity: 0,//.5,
	        fillColor: '#00dddd',
	        fillOpacity: 0.15,
	        strokeWeight: 3,
	        clickable: true,
	        geodesic: true,
	        draggable: true,
	    });
	    
	    

		/*//-----------------
		//addPtToPolyLine(event);
        mapMoveHandler = google.maps.event.addListener(map, 'mousemove', mapMove);
        mapUpHandler = google.maps.event.addListener(map, 'mouseup', removeAllHandlers);
        polylineUpHandler = google.maps.event.addListener(mapPolyline, 'mouseup', mouseup);
        mapOutHandler = google.maps.event.addListener(map, 'mouseout', removeAllHandlers);
		//-----------------		
		*/
	    mapDownHandler = google.maps.event.addListener(map, 'mousedown', function (event) {
		    if(!drawing){
	    		clearPolys();
	    		removeAllHandlers();
	    		return;
	    	}
	    	bod.addEventListener('touchmove',noScroll,false);
	    	map.setOptions({
		        draggable: false
		    }); 
	    	addPtToPolyLine(event);
	        mapMoveHandler = google.maps.event.addListener(map, 'mousemove', mapMove);
	        mapUpHandler = google.maps.event.addListener(map, 'mouseup', removeAllHandlers);
	        polylineUpHandler = google.maps.event.addListener(mapPolyline, 'mouseup', mouseup);
	        mapOutHandler = google.maps.event.addListener(map, 'mouseout', removeAllHandlers);
	    });
	    
	    function mapMove(event){
	    	console.log('mapMove::drawing='+drawing);
	    	if(!drawing){
	    		removeAllHandlers();
	    	}
	    	addPtToPolyLine(event);
	        mapPolyline.setOptions({
	                path: polyLinesPath
	        });
	        if (pathEquations.length >2) {
	            for (var e = 0; e < pathEquations.length - 3; e++) {
	            	var pt = solveLinesEquations(pathEquations[pathEquations.length - 1], pathEquations[e]);
	                if (pt != null) {
	                	polyLinesPath.setAt((polyLinesPath.getLength() - 1), pt);
	                    var newPathCount = 0;
	                    var newPath = new google.maps.MVCArray();
	                    for (var e1 = e; e1 < polyLinesPath.getLength(); e1++) {
	                    	newPath.insertAt(newPathCount++, polyLinesPath.getAt(e1));
	                    }
	                    polyLinesPath = newPath;
	                    removeAllHandlers();
	                    break;
	                }
	            }
	        }
	    }
	    
	    function mouseup(event){
	    	console.log("mouseup event");
	    	mapMove(event);
	    	removeAllHandlers();
	    }
	    
	    function removeAllHandlers() {
	    	
	    	bod.removeEventListener("touchmove",noScroll,false);
	    	
	    	//jsUtilRemoveClass(document.getElementById('mapContainer'),"mapDraw");
	    	google.maps.event.removeListener(mapMoveHandler);
	    	google.maps.event.removeListener(mapDownHandler);
	        google.maps.event.removeListener(polylineUpHandler);
	        google.maps.event.removeListener(mapOutHandler);
	        google.maps.event.removeListener(mapUpHandler);
	        
	        if(!drawing) {
	        	console.log('removeAllHandlers :: drawing is false. returning');
	        	return;
	        }
	        
	        polygonPath = polyLinesPath;
	        if(mapPolygon){
	        	
	        	console.log("map polygon");
	        	console.log(mapPolygon,polygonPath);
		        var complexPath=new google.maps.MVCArray();
		        complexPath.setAt(0,polygonPath);
		     //   rootScope.$emit("mapDrawn" , polygonPath);
		        mapPolyline.setOptions({path:new google.maps.MVCArray(),map:null});
		        mapPolygon.setOptions({paths: complexPath,map: map});
		       for(var e=pathEquations.length-2;e>0;e--){
			        var pt = solveLinesEquations(equationOfLine(polyLinesPath.getAt(0), polyLinesPath.getAt(polyLinesPath.getLength() - 1)), pathEquations[e]);
			        if (pt != null) {
			        	polyLinesPath.setAt(polyLinesPath.getLength(), pt);
			        	var newEq=equationOfLine(polyLinesPath.getAt(polyLinesPath.getLength()-1), polyLinesPath.getAt(polyLinesPath.getLength()-2));
			        	pathEquations.push(newEq);
			            
			            var newPath = new google.maps.MVCArray();
			            console.log(newPath);
			            newPath.setAt(0,pt);
			            
			            var newPathCount = 1;
			            for (var e1 = e; e1 < polyLinesPath.getLength(); e1++) {
			            	newPath.insertAt(newPathCount++, polyLinesPath.getAt(e1));
			            }
			            complexPath.setAt(complexPath.getLength(),newPath);
			        }
		        }
		        mapPolyline.setOptions({path:new google.maps.MVCArray(),map:null});
		        mapPolygon.setOptions({paths: complexPath,map: map});
       
			if(drawing){
	        	resetMarkerList();
	        	if(complexPath.getLength()==1 && complexPath.getAt(0).getLength()>0 && complexPath.getAt(0).getLength()<4){
	        		mapPolygon = null;
	        		search(complexPath.getAt(0).getAt(0));
		        }
	        	else{
//	        		search();
	        	}
	    	}
    	}
	   // drawing=false;
	    }
	}
	
	function addPtToPolyLine(event) {
	    if (polyLinesPath.getLength() > 0) {
	        var prev = polyLinesPath.getAt(polyLinesPath.getLength() - 1);
	        if (prev.toUrlValue(10) != event.latLng.toUrlValue(10)) {
	            polyLinesPath.insertAt(polyLinesPath.getLength(), event.latLng);
	            if (polyLinesPath.getLength() >= 2) {
	                pathEquations.push(equationOfLine(event.latLng, polyLinesPath.getAt(polyLinesPath.getLength() - 2)));
	            }
	        }
	    } else {
	        polyLinesPath.push(event.latLng);
	    }
	}

	function equationOfLine(pt1, pt2){
		
		var x1, x2, y1, y2, m, b;
		
		y1 = pt1.lat();
	    x1 = pt1.lng();
	    y2 = pt2.lat();
	    x2 = pt2.lng();
	    if (x2!==x1) {
	        m = (y2-y1)/(x2-x1);
	        b = y1-(x1 * m);
	    } else {
	        m = "Infinity";
	        b = x1;
	    }
	    	    
	    return {
	        m: m,
	        b: b,
	        p1: pt1,
	        p2: pt2,
	        bounds:extendBounds(pt1,pt2)
	    };
	}

	function solveLinesEquations(l1, l2) {
		var bounds1 = l1.bounds;
		var bounds2 = l2.bounds;
		if(!bounds1.intersects(bounds2)){return null;}
		
		var m1 = +l1.m;
		var m2 = +l2.m;
	    var b1 = l1.b;
	    var b2 = l2.b;
	    var l1p1 = l1.p1;
	    var l1p2 = l1.p2;
	    var l2p1 = l2.p1;
	    var l2p2 = l2.p2;
	    var x, y, pt = null;
	    if(m1==m2){
	    	if(b1==b2){
		    	if(l2.bounds.contains(l1p1))
		    			return l1p1;
			    	else if(l2.bounds.contains(l1p2))
			    		return l1p2;
			    	else
			    		return null;
		    }
	    	else
	    		return null;
	    }
	    if (isFinite(m1) && isFinite(m2)) {
	        x = -(b1 - b2) / (m1 - m2);
	        var y = (m1 * x) + b1;
	        pt = new google.maps.LatLng(y, x);
	    } 
	    else 
	    {
	        if (!isFinite(m1) && isFinite(m2)) 
	        {
	            x = b1;
	            y = (m2 * b1) + b2;
	            pt = new google.maps.LatLng(y, x);
	        } 
	        else if (isFinite(m1) && !isFinite(m2)) 
	        {
	            x = b2;
	            y = (m1 * b2) + b1;
	            pt = new google.maps.LatLng(y, x);
	        }
	    }
	    if(pt && bounds1.contains(pt) && bounds2.contains(pt)) {
			return pt;
	    }
	    return null;
	}

	// called after obatining mapCenter from GPS or Location API
	function initializeMap() {
		/*
	    if (mapCenter == null) {
			searchFor.defaultCoords ? searchFor.defaultCoords = new google.maps.LatLng(searchFor.defaultCoords[0], searchFor.defaultCoords[1]) : null;
	    	mapCenter = searchFor.defaultCoords;
	    }
	    */
	    
    	loadMap();
	    updateGooglePolygonPrototype();
	    
	    google.maps.event.addListener(map,"dragend", function(){
			resBounds = null;
		});
		google.maps.event.addListener(map,"zoom_changed", function(){
			resBounds = null;	
		});
		window.addEventListener("resize", function(event) {
			var c = map.getCenter();
			map?google.maps.event.trigger(map, 'resize'):null;
			c?map.panTo(c):null;
			var bounds = resBounds;
			resBounds? map.fitBounds(resBounds) :null;
			resBounds = bounds;
		}, false);
	    google.maps.event.addListenerOnce(map, "tilesloaded", function(){
		    	mapLoaded = true;
		    	//document.getElementById("startDrawing").style.visibility="visible";//removeAttribute("disabled");
		    	//document.getElementById("searchTab").style.visibility = "visible";
	    });
	}

	function userSearch() {
		
		clearPolys();
		drawing=false;
	    var searchAddress = document.getElementById("searchAddressField").value;
	    var searchState = document.getElementById("searchStateField").value;
	    var stateValue  = searchState.split(", ");
	    var searchStateCapital = stateValue[0];
	    var searchStateName = stateValue[1];
	    var searchZip = document.getElementById("searchZipField").value;

	    if(!searchAddress && searchState){
	    	document.getElementById("searchAddressField").value = searchStateCapital;
	    }
	    
	    var searchAddressValue = searchAddress ? searchAddress : "";
	    searchAddressValue += (searchAddressValue ? (searchState ? " " + searchStateName : "") : (searchState ? searchState : ""));
	    searchAddressValue += (searchAddressValue ? (searchZip ? " " + searchZip : "") : (searchZip ? searchZip : ""));

	    
		   
    //searchErrorField.innerHTML = "";
	    if (!searchAddressValue) {
    	//searchErrorField.innerHTML = "Please enter location details and try again!";
	        return;
	    }
	    var searchCoords = getCoords(searchAddressValue, null, function (searchCoords, status) {
	        if (!searchCoords) {
        	//searchErrorField.innerHTML = "The search criteria resulted in : " + status + "\nPlease enter different location details and try again!";
	            return;
	        }
	        var searchDistance = document.getElementById("searchDistance").value;
	        var searchDistanceM = searchDistance * 1609.34;
        request = {
	            location: searchCoords,
	            name: searchFor.keyword,
	            radius: searchDistanceM,
	            types: searchFor.category
	        };
        service = service || new google.maps.places.PlacesService(map);
	        service.nearbySearch(request, searchCallback);
	    });
	}

	function getCoords(address, keyword, callBackFn) {
	    var geocoder = new google.maps.Geocoder();
	    var addressVal = address ? address : searchFor.defaultLocation;
	    addressVal = (keyword ? keyword : "") + " " + address;
	    geocoder.geocode({
        'address': addressVal.trim()
	    }, function (results, status) {
	        if (status == google.maps.GeocoderStatus.OK) {
	        	if (results && results.length > 0 && results[0]) {
	                if (callBackFn && typeof (callBackFn) == "function") callBackFn(results[0].geometry.location);
	            } else {
	                console.log('getCoords : No results returned for ' + addressVal);
	                if (callBackFn && typeof (callBackFn) == "function") callBackFn(null, 'No results returned for ' + addressVal);
	            }
	        } else {
	            console.log("getCoords : Reverse Geocoding for " + addressVal + " failed due to : " + status);
	            if (callBackFn && typeof (callBackFn) == "function") callBackFn(null, status);
	        }
	    });
	}

	function showSearch() {
		if(!mapLoaded && mapLoadedCheckCounter<5){ 
			mapLoadedCheckCounter++;
			setTimeout(showSearch,100);
			return;
		}
		
		var searchTab = document.getElementById("searchTab")
		drawing=false;
		jsUtilAddClass(searchTab,"selectedTab");
	    var prev = searchTab.previousElementSibling;
	    jsUtilRemoveClass(prev,"selectedTab");


	    var mapContainer = document.getElementById("mapContainer");
	    mapContainer.style.display = "none";
	    var searchContainer = document.getElementById("searchContainer");
	    searchContainer.style.display = "block";
	}

	function showMap() {
		/*
		map?google.maps.event.trigger(map, "resize"):null;
		var mapTab = document.getElementById("mapTab");
		
		jsUtilAddClass(mapTab,"selectedTab");
	    var next = mapTab.nextElementSibling;
	    jsUtilRemoveClass(next,"selectedTab");

	    var searchContainer = document.getElementById("searchContainer");
	    searchContainer.style.display = "none";
	    var mapContainer = document.getElementById("mapContainer");
	    mapContainer.style.display = "block";
	    */
	}

	function loadInitialCoordinates(callbackFn) {
	    getCoords(searchFor.defaultLocation, null, function (resCoords, status) {
	        if (!resCoords) {
	            return;
	        }
	        mapCenter = resCoords;
	        if (callbackFn && typeof (callbackFn) == "function") {
	            callbackFn();
	        }
	    });
	}

	function setCurrentPositionFromLocation(position) {
		curpos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		//initializeMap();
	    //loadMap();
	    //search(mapCenter);
	}

	function loadMap(divId,callbackFn) {
		google.maps.visualRefresh = true;
		/*
	    if (map) {
	        resetMarkerList();
	        map.panTo(mapCenter);
	    } else {
	        var mapOptions = {
	            zoom: 4,
	            maxZoom:14,
	            zoomControl:true,
	            zoomControlOptions:{style:"SMALL"},
	            center: mapCenter,
	            mapTypeId: google.maps.MapTypeId.ROADMAP,
	            draggable:true
	        };
	        map = new google.maps.Map(document.getElementById('mapContainer'),mapOptions);
	        
	        var StartDrawControlDiv = document.createElement('div');
	        var startDrawControl = new StartDrawControl(StartDrawControlDiv, map);
	        startDrawControl.index = 1;
	        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(StartDrawControlDiv);

	    }
	    */
	    if (map) {
	        resetMarkerList();
	    } 
	        var mapOptions = {
	            zoom: 10,
	            maxZoom:14,
	            zoomControl:true,
	            zoomControlOptions:{style:"SMALL"},
	            center: mapCenter,
	            mapTypeId: google.maps.MapTypeId.ROADMAP,
	            draggable:true
	        };
	        map = new google.maps.Map(document.getElementById(divId),mapOptions);
	        
	        var StartDrawControlDiv = document.createElement('div');
	        var startDrawControl = new StartDrawControl(StartDrawControlDiv, map);
	        startDrawControl.index = 1;
	        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(StartDrawControlDiv);
	        if (callbackFn && typeof (callbackFn) == "function") {
	            callbackFn();
	        }

	    

	}

	function avoidDuplicateResults(searchResultsArray,resObj,resAddress) {
	    for (var i = 0; i < searchResultsArray.length; i++) {
	        var latDiff = resObj.lat() - searchResultsArray[i].location.lat();
	        var lngDiff = resObj.lng() - searchResultsArray[i].location.lng();
	        
	        if (Math.abs(lngDiff) < 0.01 || Math.abs(lngDiff) < 0.01 || resAddress.overlaps(searchResultsArray[i].address)) {
	            return false;
	        }
	    }
	    return true;
	}

	function updateGooglePolygonPrototype(){
		if (!google.maps.Polygon.prototype.getBounds) {
		    google.maps.Polygon.prototype.getBounds = function (latLng) {
		        var bounds = new google.maps.LatLngBounds();
		        var paths = this.getPaths();
		        var path;
	
		        for (var p = 0; p < paths.getLength(); p++) {
		            path = paths.getAt(p);
		            for (var i = 0; i < path.getLength(); i++) {
		                bounds.extend(path.getAt(i));
		            }
		        }
		        return bounds;
		    }
		}
	
		google.maps.Polygon.prototype.containsLatLng = function (latLng) {
		    
			var lat = latLng.lat();
			var lng = latLng.lng();
			var bounds = this.getBounds();
			if(bounds != null && !bounds.contains(latLng)) {
				return false;
			}
			
			var numPaths = this.getPaths().getLength();
			var inPoly = false;
			
			for(var p=0;p<numPaths;p++){
				var tempPoly = new google.maps.Polygon({
			        strokeColor: '#ff0000',
			        strokeOpacity: 0.0,
			        fillColor: '#00dddd',
			        fillOpacity: 0,
			        strokeWeight: 0,
			        geodesic:true,
			        path : this.getPaths().getAt(p)
			    });
				
				inPoly = google.maps.geometry.poly.containsLocation(latLng?latLng:new google.maps.LatLng(lat, lng),tempPoly);
				if(inPoly){//} || numPaths ==1){
					return  inPoly;
				}
			}
		}
	}

	String.prototype.overlaps = function(it) { return (this.indexOf(it) != -1) || (it.indexOf(this) != -1)};
	
	function extendBounds(pt1,pt2){
		
		var bounds = new google.maps.LatLngBounds();
		
		function extendBoundsByPt(pt){
			var lat = pt.lat();
			var lng = pt.lng();
			var tol = 0.00000001;//tolerance
			
			var p1 = new google.maps.LatLng(lat + tol, lng - tol);
			var p2 = new google.maps.LatLng(lat - tol, lng + tol);
			var p3 = new google.maps.LatLng(lat - tol, lng - tol);
			var p4 = new google.maps.LatLng(lat + tol, lng + tol);
	
			bounds.extend(pt);
			bounds.extend(p1);
			bounds.extend(p2);
			bounds.extend(p3);
			bounds.extend(p4);
		}
		
		extendBoundsByPt(pt1);
		extendBoundsByPt(pt2);
		
		return bounds;
	}
	
	//google.maps.event.addDomListener(window, 'load', initializeMap);
	
function resetSearchForm(){
	//searchFormReset.click();
	//searchErrorField.innerHTML = '';
}

function StartDrawControl(controlDiv, map) {

	  controlDiv.style.padding = '5px';

	  var controlUI = document.createElement('div');
	  controlUI.style.backgroundColor = 'white';
	  controlUI.style.borderStyle = 'solid';
	  controlUI.style.borderWidth = '2px';
	  controlUI.style.cursor = 'pointer';
	  controlUI.style.textAlign = 'center';
	  controlUI.title = 'Click to start drawing on map';
	  controlDiv.appendChild(controlUI);

	  var controlText = document.createElement('div');
	  controlText.style.fontFamily = 'Arial,sans-serif';
	  controlText.style.fontSize = '11px';
	  controlText.style.paddingLeft = '4px';
	  controlText.style.paddingRight = '4px';
	  controlText.id = 'mapdrawtoolid';
	  controlText.innerHTML = '<b>Start Drawing</b>';

	  controlUI.appendChild(controlText);

	  google.maps.event.addDomListener(controlUI, 'click', function() {
		  resetMarkerList();
		  startDrawing();
	  });
}

function openDirectionsFromView(paddr){
	var saddr = map.getCenter().lat()+','+map.getCenter().lng();
	if (window.sendCUEMEevent) {
		var durl = 'http://maps.apple.com/?q&saddr='+paddr+'&daddr='+saddr+'&maptype=map&vs=directions';
		durl = 'http://maps.apple.com/?saddr='+paddr;
		durl = 'http://maps.google.com/maps?saddr='+paddr+'&daddr=';
		//app.eva.maps.handleAnchorReferences(durl);
		sendCUEMEevent('click', 'launchMap', durl);
	} else {
		var durl = 'http://maps.google.com/?le=t&saddr='+paddr+'&daddr=&maptype=map&vs=directions';
		durl = 'http://maps.google.com/maps?saddr='+paddr+'&daddr=';
		window.open(durl);
	}
}
	
function openDirectionsToView(paddr){
	var saddr = map.getCenter().lat()+','+map.getCenter().lng();
	if (window.sendCUEMEevent) {
		var durl = 'http://maps.apple.com/?q&saddr='+saddr+'&daddr='+paddr+'&maptype=map&vs=directions';
		durl = 'http://maps.apple.com/?daddr='+paddr;
		durl = 'http://maps.google.com/maps?saddr='+saddr+'&daddr='+paddr;
		sendCUEMEevent('click', 'launchMap', durl);
	} else {
		var durl = 'http://www.mapquest.com/?le=t&saddr='+saddr+'&daddr='+paddr+'&maptype=map&vs=directions';
		durl = 'http://maps.google.com/maps?saddr='+saddr+'&daddr='+paddr;
		window.open(durl);
	}
}

function storePOIToFavoriteDB(el, itemname, itemAddr)
{
	var amarker = null;
	// get marker coords
	for(var m=0; m < markerList.length; m++) {
		amarker = markerList[m];
		if (amarker.getTitle() == itemname) {
			break;
		}
	}
	//var svgpathid = amarker != null ? (amarker.getPosition().lat()+','+amarker.getPosition().lng()) : '';
	//var elemId = el.id.toString();
	//var item = { 'name' : itemname, 'svgpathid' : svgpathid,'uniqueId' : elemId,'address':itemAddr };
	//app.eva.db.updateFavoriteDB(el, item);
}

// called by IM after getting GPS location
function setCurrentGpsLocation(latlng)
{
	//alert(latlng.latitude + ':' + latlng.longitude);
	var coords = new Array();
	coords[coords.length] = latlng.latitude;
	coords[coords.length] = latlng.longitude;
	searchFor.defaultCoords = coords;
	mapCenter = new google.maps.LatLng(latlng.latitude, latlng.longitude);
	initializeMap();
	search(mapCenter);
}

// called by IM after failing to get GPS location. Use Browser GeoLocation API
function useDefaultLocation()
{
    //getCurrectLoc(); // this will initialize map and search the map
	var curpos = '';
	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
        function(position) {
        	console.log(position.coords.latitude+'::'+position.coords.longitude);
        	mapCenter = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        	initializeMap();
  		},
        function() {
            console.log('error getting location.useDefaultLocation::mapCenter is NULL from navigator. Using defaults');
    		var coords = new Array();
    		coords[coords.length] = 40.21504167;
    		coords[coords.length] = -75.30089722;
    		searchFor.defaultCoords = coords;
    		mapCenter = new google.maps.LatLng(40.21504167,-75.30089722);
        	initializeMap();
        }
  		);
        
    }
	
	
	//search(mapCenter);
	
	 /*var myLatlng = new google.maps.LatLng(12.870347, 77.65619500000003);
	  var mapOptions = {
	    zoom: 9,
	    center: myLatlng
	  }
	  var map = new google.maps.Map(document.getElementById('mapContainer'), mapOptions);

	  var marker = new google.maps.Marker({
	      position: myLatlng,
	      map: map,
	      title: 'Hello World!'
	  });*/
}

function searchInMap(searchParams){
	
	var address = searchParams.location;
	var name =  searchParams.name;
	searchFor.keyword = name;
	searchFor.category = '';
	if(searchParams.location==""){
		search();
	}else{
			
		console.log("searching in given area.");
		geocoder = new google.maps.Geocoder();
		 geocoder.geocode( { 'address': address}, function(results, status) {
			    if (status == google.maps.GeocoderStatus.OK) {
			    	console.log(results);
			      map.setCenter(results[0].geometry.location);
			      var placeId = results[0].place_id;
			     /* var marker = new google.maps.Marker({
			          map: map,
			          position: results[0].geometry.location
			      });*/
			      
				      var request = {
					            location: results[0].geometry.location,
					            //radius: 40000,
					            rankBy: google.maps.places.RankBy.DISTANCE,
					            name: name
					            //types: ['atm']
					        };
			        service = service || new google.maps.places.PlacesService(map);
			        service.nearbySearch(request, callback);
			      
			    } else {
			      alert('Geocode was not successful for the following reason: ' + status);
			    }
		 });
		}
}
function callback(results, status) {
	console.log(results);
  if (status == google.maps.places.PlacesServiceStatus.OK) {
	  console.log(results);
	    /////-------------------
	  clearPolys();
		resetMarkerList();
		document.getElementById('userloc').value ='';
		document.getElementById('searchMapLoad').style.display = "none";

	    /////-------------------	  
	  for (var i = 0; i < results.length; i++) {
/*      var place = results[i];
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });*/
    	var location = new Object();
		result = results[i];
		location.address = result.vicinity;
		location.id =  result.id;
		location.location = new Object();
		location.location.A = result.geometry.location.A;
		location.location.F = result.geometry.location.F;
		location.name =  result.name;
		addMarkerToMap(location);
    }
    //document.getElementById('searchMapLoad').style.display = "none";
    map.setZoom(9);
    /////-------------------
	drawing = false;
	
    /////-------------------
  }
  
  else if(results.length == 0){
	  alert("No results found");
	  resetMarkerList();
	  document.getElementById('searchMapLoad').style.display = "none";
	  drawing = false; 
  }
}

