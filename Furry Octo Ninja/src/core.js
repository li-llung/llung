function Core(){
	this.masterinit = function(){
		//alert('ignite');
	};
	this.init = function(widget_name){
		var widget = new this[widget_name]();

		for(var i in widget.params)
		{
			if(widget.params.autostart === true){
				widget[i](widget.params[i]);
			}
		}
	};
	this.util  = function(){
		$('.content').css('background-color', '#f9f9f9');
		overlay.border();
	};
}
ldc=new Core();	
//ldc.masterinit();