(function( $ ){
	function core(){
		this.init = function(){
			//alert('ignite');
		}
		this.widgets = function(widget_name){
			//alert('widgets');
			//this[widget_name].init();
		}
		this.util = function(){
			//alert('util');
		}		
	}
	ldc=new core();	
	ldc.init();
})( jQuery );