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