function Core(){
	this.masterinit = function(){
		//alert('ignite');
	};
	this.init = function(widget_name){
		//alert('widgets');
		var widget = new this[widget_name]();
		if(widget.params.autostart === true){
			widget.autostart();
		}
		if(widget.params.watch === true){
			widget.watch();
		}
		//alert('over');
	};
	this.util  = function(){
		$('.content').css('background-color', '#f9f9f9');
		var overlay = new ldc.overlay();
		overlay.border();
	};	
}
ldc=new Core();	
//ldc.masterinit();