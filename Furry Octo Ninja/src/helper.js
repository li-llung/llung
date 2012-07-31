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