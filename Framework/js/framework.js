(function( $ ){
jQuery(document).ready(function()
{
	ldc=new framework();
	ldc.silent_init();
});
function framework()
{         
	/*Start Global Variables*/	
	/*End Global Variables*/
		
	/*Start Global Functions*/
		/*Start Public*/
		/*End Public*/
		/*Start Private*/
		this.overlay = function(){
			alert('hi from overlay');
		}
		this.toggles = function(){
			alert('hi from toggles');			
		}
		/*End Private*/
	/*End Global Functions*/
	
	/*Start Init functions*/  
	this.silent_init = function(){
		/*init code to go here*/
	}
    this.init = function(options){
		/*start with some options*/		
		if(options)
		{
			var widget_count = 0,
			 	core_count = 0,
			 	var_count = 0;
			for (j in options.widgets){
				widget_count += 1;
			}
			for (k in options.core){
				core_count += 1;
				//alert(k());
				this[k]();
			}
			for (l in options.vars){
				var_count += 1;
			}
			alert(widget_count + ' widgets, ' + core_count + ' core modules, ' + var_count + ' server variables found');
		}else{
			alert('defaults to be used');	
		}
    } 
	/*End Init functions*/
}
})( jQuery );