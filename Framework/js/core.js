(function( $ ){
	jQuery(document).ready(function()
	{
		alert('ignition');
		ldc=new core();	
		ldc.init();
	});
	function core(){
		this.overlay = function(){
			alert('overlay');
		}
		this.init = function(){
			this.overlay();
			alert('ignite');
		}
		this.widgets = function(widget_name){
			alert('widgets');
			//this[widget_name].init();
		}
		this.util = function(){
			alert('util');
		}		
	}
})( jQuery );