/*
//  check.js
*/
var z = z || {};
(function($, z){
    'use strict';
    z.check = {
        right: function(what){
            var doc = $(document).width();
            return ((($(what).width() + $(what).offset().left) + 5) >= doc);
        }     
    };
})(jQuery, z);