/*
//  check.js
*/
var Em = Em || {};
(function($, Em){
    'use strict';
    Em.check = {
        right: function(what){
            var doc = $(document).width();
            return ((($(what).width() + $(what).offset().left) + 5) >= doc);
        }     
    };
})(jQuery, Em);