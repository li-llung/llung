ldc.slider = function(){	
	var slider = this;
	this.params = {
		'autostart': true,
		'watch': true
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