(function( $ ){
  	var methods = {
		init : function( init_options ) {
			//alert(options);
			return this.each(function() {			
				//alert('im a initing with a width of ' + init_options.width + ' and a height of ' + init_options.height); 		
			});
		},
		destroy : function( ) {
	
		},
		reposition : function(  ) { 
		
		},
		show : function( ) { 
		
		},
		hide : function( ) { 
		
		},
		update : function( content ) { 
		
		},
		slider : function( slider_options ) { 
			var slider_options = $.extend( {
				'width'   : '640px',
				'height' : '480px'
			}, slider_options);
			$(this).click(function(){
				alert('im a slider with a width of ' + slider_options.width + ' and a height of ' + slider_options.height);
			});
		},
		overlay : function( overlay_options ) { 
			var overlay_options = $.extend( {
				'width'   : '640px',
				'height' : '480px'
			}, overlay_options);
			$(this).click(function(){
				alert('im a overlay with a width of ' + overlay_options.width + ' and a height of ' + overlay_options.height);
			});
		}
 	};
  	$.fn.ldc = function( method, options ) {
		var settings = $.extend( {
			'width'  : '640px',
			'height' : '480px'
		}, options);	
		
		
		
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
		}   
  	};  
})( jQuery );