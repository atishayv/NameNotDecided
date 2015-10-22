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
	
	
	convertToDate : function(inputFormat){
		function pad(s) { return (s < 10) ? '0' + s : s; }
		var d = new Date(inputFormat);
		return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
	}
});