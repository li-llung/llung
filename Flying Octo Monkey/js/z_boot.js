!function() {

	'use strict';
	
	window.z.init();

	// if AMD return z object to define
	if(typeof define == "function" && define.amd) {
		define(window.z);
	}

}();