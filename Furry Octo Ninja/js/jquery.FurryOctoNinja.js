/*! jQuery Furryoctoninja - v0.1.0 - 2012-08-03
* https://github.com/llung/FurryOctoNinja
* Copyright (c) 2012 ; Licensed MIT, GPL */

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
ldc.helper = function(){	
	var helper = this;
	this.params = {
	};	
	this.welcome=function(text)
	{
		var final_text = text;
		final_text==undefined ? final_text = "from framework" : text;
		alert('hi '+final_text+'!');
	};
	this.say = function(words){
		alert(words);
	};
	this.log = function(words){
		console.log(words);
	};
	this.speak = function(words){
		jQuery("body").append(words);
	};
	this.tell = function(who , what){
		jQuery(who).append(what);
	};
	this.yell = function(at){
		jQuery(at).css('text-transform', 'uppercase');
	};
	this.shh = function(at){
		jQuery(at).css('text-transform', 'lowercase');
	};
	this.asyouwere = function(who){
		jQuery(who).removeAttr("style");
	};
	this.getlost = function(who){
		jQuery(who).remove();
	};
	this.convert=function(what,to)
	{
		if(to == 'int'){
			return (parseInt(what) + 0);				
		}
	};
	this.externalLinks=function() { 
		if (!document.getElementsByTagName) return; 
			var anchors = document.getElementsByTagName("a"); 
			for (var i=0; i<anchors.length; i++) { 
				var anchor = anchors[i]; 
					if (anchor.getAttribute("href") && 
						anchor.getAttribute("rel") == "external") 
						anchor.target = "_blank"; 
			} 
	}; 
	this._is=function(obj) {
		if ( typeof(obj) == 'object' )
		if (obj.length){
			return 'array';
		} else{
			return 'object';
		} else{
			return typeof(obj);
		}
	};
	this.addParameter = function(func, argIndex, argValue) {
	    return function() {
	        arguments[argIndex] = argValue;
	        arguments.length = Math.max(arguments.length, argIndex);
	        return func.apply(this, arguments);
	    };
	}
	this.bookmark=function(url, title){
		if (window.sidebar) // firefox
			window.sidebar.addPanel(title, url, "");
		else if(window.opera && window.print){ // opera
			var elem = document.createElement('a');
			elem.setAttribute('href',url);
			elem.setAttribute('title',title);
			elem.setAttribute('rel','sidebar');
			elem.click();
		} 
		else if(document.all)// ie
			window.external.AddFavorite(url, title);
	};
	this.navigate=function(to)
	{
		return false;
		window.location = to;
	};
	this.roundme=function(num, dec) {
		var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
		return result;
	};
	this.goback=function()
	{
		history.back();	
	};
	this.date=function(){
		var c_currentTime = new Date();
		return c_currentTime;						
	};
	this.time=function(){
		var c_currentTime = new Date();
		var c_miliseconds = c_currentTime.getTime();
		return c_miliseconds;
	};
};
var helper = new ldc.helper();
ldc.init('helper');
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
var overlay = new ldc.overlay();
ldc.init('overlay');
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