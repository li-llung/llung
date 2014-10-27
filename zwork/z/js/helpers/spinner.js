/*
//  spinner.js
*/
var z = z || {};
(function($, z){
    'use strict';
    z.spinner = {
	    add_spinner: function (what) {
	    	$(what).append('<div class="box_spinner">&nbsp;</div>');
	    },
	    remove_spinner: function () {
	    	$('.box_spinner').remove();
	    }        
    };
})(jQuery, z);