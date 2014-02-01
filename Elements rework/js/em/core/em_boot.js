
(function($, em){
  'use strict';
	
	window.em.init();

	// if AMD return em object to define
	if(typeof define == "function" && define.amd) {
		define(window.em);
	}

})(jQuery, em);