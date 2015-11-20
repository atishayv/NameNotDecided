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
	},
	
	showStars : function(){
		$('span.stars').each(function() {
	        // Get the value
	        var val = parseFloat($(this).html());
	        // Make sure that the value is in 0 - 5 range, multiply to get width
	        var size = Math.max(0, (Math.min(5, val))) * 16;
	        // Create stars holder
	        var $span = $('<span />').width(size);
	        // Replace the numerical value with stars
	        $(this).html($span);
	    });
	}
});