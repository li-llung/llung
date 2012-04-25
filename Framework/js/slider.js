(function( $ ){
	jQuery(document).ready(function()
	{
    	if (typeof (window['ldc']) == 'undefined'){
        	ldc = new core();	
		}
		ldc.widgets('slider');	
	});	
 	var methods = {
		destroy : function( ) {
		},
		reposition : function( direction ) { 
			alert(direction);
			this.css('text-align',direction);
		},
		show : function( ) { 
			this.show();
		},
		hide : function( ) { 
			this.hide();
		},
		update : function( content ) { 
			this.html(content);
		},
		hi : function( ) { 
			alert('hi from slider');
		}
	};
	$.fn.slider = function( method, options ) {  
		var settings = $.extend( {
			'location'   : 'left',
			'background' : '#373737'
		}, options);	
		return this.each(function() {        	
			// Tooltip plugin code here
			methods.hi;
		});
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
		}
	};
})( jQuery );