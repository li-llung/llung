/*
//  array.js
*/
var zem = zem || {};
(function($, z){
    'use strict';
    zem.effects = {
        shadow: function(element, shadow_size, shadow_color){
            $(element).css({ 
                '-moz-box-shadow': '' + shadow_size + ' ' + shadow_color + '', 
                '-webkit-box-shadow': '' + shadow_size + ' ' + shadow_color + '', 
                'box-shadow': '' + shadow_size + ' ' + shadow_color + ''
            });
        },
        round: function(element, rounded){
            $(element).css({ '-moz-border-radius': rounded, '-webkit-border-radius': rounded, 'border-radius': rounded, '-khtml-border-radius': rounded });
        },
        rotate: function(element, angle){
            $(element).css({ 
                '-moz-transform': 'rotate('+angle+')',
                '-webkit-transform': 'rotate('+angle+')',
                'transform': 'rotate('+angle+')'
            });
        },
        perspective: function(element, amount){
            $(element).css({ 
                '-moz-perspective': amount, 
                '-webkit-perspective': amount, 
                'perspective': amount
            });
        }
    };
})(jQuery, zem);