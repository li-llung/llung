/*
//  debug.js
*/
var zem = zem || {};
(function($, zem){
    'use strict';
    zem.settings = {
        status: true,
        show_output: true,
        output: '<div id="output" class="output" style="background-color: #fbfbd5;border: solid 1px #ffdc7f;padding:10px;position: absolute;top: 50px;left: 50px;z-index:99999;"></div>'
    };
    zem.log = function (message) {
        console.log(message);
    };
    zem.debug = function (message) {
        if (zem.settings.status) {
            console.log(message);
            if(zem.settings.show_output && !$('.output').length){
                $('body').prepend(zem.settings.output);
            }
        }
    };
})(jQuery, zem);