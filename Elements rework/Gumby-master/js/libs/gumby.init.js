/**
* Elements Init
*/

// test for touch event support
Modernizr.load({
	test: Modernizr.touch,

	// if present load custom jQuery mobile build and update Elements.click
	yep: Elements.path+'/jquery.mobile.custom.min.js',
	callback: function(url, result, key) {
		// check jQuery mobile has successfully loaded before using tap events
		if($.mobile) {
			window.Elements.click = 'tap';
		}
	},

	// either way initialize Elements
	complete: function() {
		window.Elements.init();

		// if AMD return Elements object to define
		if(typeof define == "function" && define.amd) {
			define(window.Elements);
		}
	}
});
