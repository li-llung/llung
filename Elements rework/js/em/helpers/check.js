/*
//  check.js
*/
var em = em || {};
(function($, em){
    'use strict';
    em.check = {
        right: function(what){
            var doc = $(document).width();
            return ((($(what).width() + $(what).offset().left) + 5) >= doc);
        }     
    };
})(jQuery, em);