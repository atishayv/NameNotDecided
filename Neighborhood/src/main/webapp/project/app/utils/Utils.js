/** Utility Functions */

Ext.define('Neighborhood.util',{
	singleton: true,
	
	
	isPhone  :function(){
		if(Ext.os.deviceType == 'Phone'){
			return true;
		}
		else{
			return false;
		}
	},
});