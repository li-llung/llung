/*
//  array.js
*/
var z = z || {};
(function($, z){
    'use strict';
    z.arrayhelper = {
        fill: function(howmany, start_at){
            var something = new Array();
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
})(jQuery, z);