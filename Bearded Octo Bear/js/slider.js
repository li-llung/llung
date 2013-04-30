(function( $ ){
	var methods = {
		init : function() {
			return this.each(function() {
				// Tooltip plugin code here
				methods.hi();
			});
		},
		settings: {
			'location'   : 'left',
			'background' : '#373737'
		},
		destroy : function( ) {
		},
		reposition : function( direction ) {
			alert(direction);
			this.css('text-align',direction);
		},
		show : function( ) {
			console.log(this);
			this.show();
		},
		hide : function( ) {
			this.hide();
		},
		update : function( content ) {
			this.html(content);
		},
		pretty: function (bg){
			this.css('background-color', (bg) ? bg.background : methods.settings.background);
		},
		hi : function() {
			console.log('hi from slider');
		}
	};
	$.fn.slider = function( method, options ) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments);
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
		}
	};
	$(document).ready(function()
	{
		$('.slider').slider({});
	});
})( jQuery );