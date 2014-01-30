/*
//  array.js
*/
var Em = Em || {};
(function($, Em){
    'use strict';
    Em.arrayhelper = {
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
})(jQuery, Em);