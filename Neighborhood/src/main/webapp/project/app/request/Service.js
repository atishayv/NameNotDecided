/**
 * Class makes HTTP Request
 */

Ext.define('Neighborhood.request.Service',{
	singleton: true,

	
	//serviceUrl must be deploymentLocation + war name + servlet name
	serviceUrl:'http://192.168.21.193:8093'+'/Neighborhood/NeighborhoodProxy',  //service Url
	//serviceUrl:'http://192.168.21.193:8081'+'/CodeCompiler/requestServer',  //service Url

	
	emleRequestHash: {
    	/**
    	 * this object would contain (service,action) as the key and a corresponding "ajax request" handler as the value
    	 * and is used to facilitate cancellable request operations
    	 */
    },
    
    /**
     * private
     * @param params
     * @param successCB
     * @param failureCB
     */
	
	//used for making GET/POST Request
	makeServerRequest : function(params, method, successCB, failureCB, scopeParam, configJson) {
		
		this.doAjax(params, method, successCB, failureCB, scopeParam, configJson);
		
	},
	
	
	doAjax : function(params, method, successCB, failureCB, scopeParam, configJson){
		
		var me = this;
		configJson = configJson || {};
		
		var url = this.serviceUrl;   //for making request to smartHub servlet
		
		var hashKey = null;
		
		if(params)
		{
			params.request = params.request || {};
			params.request["clientTimezone"] = new Date().getTimezoneOffset();
			
			
			hashKey = url + params.action;
			var requestEntry = this.emleRequestHash[ hashKey ];
			/*if(requestEntry)
			{
				console.log("requestEntry from hashmap exists for: "+ requestEntry.id);
				console.log("about to abort & remove active request from the map..");
				try{
					Ext.Ajax.abort(requestEntry);
					//remove iscancellable request from the map
					delete this.emleRequestHash[ hashKey ];
				}
				catch(abortex)
				{
					console.error("abort exception");
				}
			}*/
			
		}
		
		var requestHandle = null;
		requestHandle = Ext.Ajax.request({
			url : url, 		
			method: method,
			withCredentials : true,
		    useDefaultXhrHeader : false,
			timeout: (configJson.timeout ? configJson.timeout : 90000),
			jsonData : params,
			scope: (scopeParam != null ? scopeParam : this),
			success: function ( result, request ) {
				
				{
					console.log("On Success clear the emleRequestHash hashKey.."+ hashKey);
					if(hashKey && me.emleRequestHash[ hashKey ])
						delete me.emleRequestHash[ hashKey ];
				 }
				
				
				if(successCB)
	 				successCB.apply(this,[result.responseText]);
				
				
	            /*var jsonObj ;
	 			try{
	 				jsonObj = JSON.parse(result.responseText);
	 			}
	 			catch (e) {
					console.log('error parsing data:'+e);
					Ext.Msg.show({
		                title:  'Error',
		                message: 'InvalidData',
		                buttons: Ext.MessageBox.OK
					});
					if(failureCB)
	 	 				failureCB.apply(this,[result]);
					return;
				}
	 			
				if(jsonObj == null || jsonObj.status == 'error' || (jsonObj.result.errorCode != null && jsonObj.result.errorCode != 0)){
					console.log("Error");
				}else{
					if(successCB)
		 				successCB.apply(this,[jsonObj]);
				}*/
	 		},
			failure: function ( result, request) 
			{ 
				
				{
					console.log("On Failure clear the emleRequestHash hashKey.."+ hashKey);
					if(hashKey && me.emleRequestHash[ hashKey ])	
						delete me.emleRequestHash[ hashKey ];
				}
				
	 			//status 0 indicates request is not initialized. Scenario when there is no network.
	 			//status 1 indicates connection established but no response.
				 if(result.timedout){
                     if(failureCB)
                          failureCB.apply(this,[result]);
                 }else if(result.status == 0 || result.status == 1){
	 				if(failureCB)
	 					failureCB.apply((scopeParam != null ? scopeParam : this), [null, null, 'No Internet']);
	 				else{
		 				Ext.Msg.show({
		 	                title:  'Info',
		 	                message: 'No Internet',
		 	                buttons: Ext.MessageBox.OK
		 				});
	 				}
	 			}else{
	 				if(failureCB)
		 				failureCB.apply(this,[result]);
	 			}
	 		} 
		});
		//End of Ajax call
		
		if(requestHandle)
		{
			console.log("saving request to emleRequestHash for hashKey: "+ hashKey);
			if(hashKey)
				this.emleRequestHash[ hashKey ] = requestHandle;
		}
	},
	
	
	
	

});