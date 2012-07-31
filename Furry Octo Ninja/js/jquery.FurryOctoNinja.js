/*! jQuery Furryoctoninja - v0.1.0 - 2012-07-30
* https://github.com/llung/FurryOctoNinja
* Copyright (c) 2012 ; Licensed MIT, GPL */

function Core(){
	this.masterinit = function(){
		//alert('ignite');
	};
	this.init = function(widget_name){
		//alert('widgets');
		var widget = new this[widget_name]();

		for(var i in widget.params)
		{
			if(widget.params[i] === true){
				widget[i]();
			}
			//this[params[i]]();
		}
		/*if(widget.params.autostart === true){
			widget.autostart();
		}
		if(widget.params.watch === true){
			widget.watch();
		}*/
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
ldc.overlay = function(){
	var overlay = this;
	this.params = {
		'autostart': true,
		'watch': true
	};
	this.autostart = function(){
		//alert('hi from overlay');
	};	
	this.show = function(){
		alert('hi from overlay');	
	};	
	this.border = function(){
		jQuery(document).ready(function()
		{
			$('.content').css('border', '1px solid #999999');
		});		
	};
	this.watch = function(){
		jQuery(document).ready(function()
		{
			$('.overlay').on('click' , function(){
				overlay.show();
			});
		});				
	};
};
ldc.init('overlay');
ldc.slider = function(){	
	var slider = this;
	this.params = {
		'autostart': true,
		'watch': false
	};
	this.autostart = function(){
		//alert('hi from slider');
		jQuery(document).ready(function()
		{
			ldc.util();
		});
	};	
	this.say = function(what){
		alert(what);
	};
	this.watch = function(){
		jQuery(document).ready(function()
		{
			$('.content').on('click' , function(){
				slider.say('hi!');
			});
		});				
	};
};
ldc.init('slider');