/*
//  array.js
*/
var em = em || {};
(function($, em){
    'use strict';
    em.arrayhelper = {
        fill: function(howmany, start_at){
            var something = [];
            for(var i = start_at; i<= howmany; i++){
                something.push(i);
            }
            return something;
        },
        max: function(array){
            return Math.max.apply( Math, array );
        },
        min: function(array){
            return Math.min.apply( Math, array );
        }
    };
})(jQuery, em);