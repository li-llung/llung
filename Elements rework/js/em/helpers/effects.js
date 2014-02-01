/*
//  array.js
*/
(function($, em){
    'use strict';
    em.effects = {
        shadow: function(element, shadow_size, shadow_color){
            $(element).css({ 
                '-moz-box-shadow': '' + shadow_size + ' ' + shadow_color + '', 
                '-webkit-box-shadow': '' + shadow_size + ' ' + shadow_color + '', 
                'box-shadow': '' + shadow_size + ' ' + shadow_color + ''
            });
        },
        round: function(element, rounded){
            $(element).css({
                '-moz-border-radius': rounded, 
                '-webkit-border-radius': rounded, 
                'border-radius': rounded, 
                '-khtml-border-radius': rounded 
            });
        },
        rotate: function(element, angle){
            $(element).css({ 
                '-moz-transform': 'rotate('+angle+')',
                '-webkit-transform': 'rotate('+angle+')',
                'transform': 'rotate('+angle+')'
            });
        },
        slide: function(element, direction, time){
            $(element).css({ 
                '-moz-transition': direction + ' '+time+', -moz-transform ' + time,
                '-webkit-transition': direction + ' '+time+', -webkit-transform ' + time,
                '-o-transition': direction + ' '+time+', -o-transform ' + time,
                'transition': direction + ' '+time+', transform ' + time
            });
        }
    };
})(jQuery, em);