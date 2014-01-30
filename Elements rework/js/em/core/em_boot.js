
(function($, Em){
  'use strict';
	
	window.Em.init();

	// if AMD return Em object to define
	if(typeof define == "function" && define.amd) {
		define(window.Em);
	}

})(jQuery, Em);