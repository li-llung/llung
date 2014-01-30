/*
//  debug.js
*/
(function($, Em){
    'use strict';
    Em.settings = {
        status: true,
        show_output: true,
        output: '<div id="output" class="output" style="background-color: #fbfbd5;border: solid 1px #ffdc7f;padding:10px;position: absolute;top: 50px;left: 50px;z-index:99999;"></div>'
    };
    Em.log = function (message) {
        console.log(message);
    };
    Em.debug = function (message) {
        if (Em.settings.status) {
            console.log(message);
            if(Em.settings.show_output && !$('.output').length){
                $('body').prepend(Em.settings.output);
            }
        }
    };
    Em.debug_all = function (messages) {
        if (Em.settings.status) {
            var itEm;
            for(itEm in arguments) {
                console.log(arguments[itEm]);
            }
            if(Em.settings.show_output && !$('.output').length){
                $('body').prepend(Em.settings.output);
            }
        }
    };
})(jQuery, Em);