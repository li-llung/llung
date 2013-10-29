/*
//  debug.js
*/
var em = em || {};
(function($, em){
    'use strict';
    em.settings = {
        status: false,
        show_output: false,
        output: '<div id="output" class="output" style="background-color: #fbfbd5;border: solid 1px #ffdc7f;padding:10px;position: absolute;top: 50px;left: 50px;z-index:99999;"></div>'
    };
    em.log = function (message) {
        console.log(message);
    };
    em.debug = function (message) {
        if (em.settings.status) {
            console.log(message);
            if(em.settings.show_output){
                $('body').prepend(em.settings.output);
            }
        }
    };
})(jQuery, em);