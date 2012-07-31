ldc.slider = function(){	
	var slider = this;
	this.params = {
		'autostart': true,
		'watch': true,
		'log': 'zombie!;killer!;yay!;qwerty'
	};
	this.autostart = function(){
		//alert('hi from slider');
		jQuery(document).ready(function()
		{
			ldc.util();
		});
	};	
	this.say = function(what){
		helper.say(what);
	};
	this.log = function(what){
		var say_array = what.split(';');
		var say_array_length = say_array.length;
		var say_text = "";
		for(j = 0; j < say_array_length; j++){
			(j===0) ? say_text += say_array[j] : say_text += " and " + say_array[j];
		}
		helper.log(say_text);
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
var slider = new ldc.slider();
ldc.init('slider');