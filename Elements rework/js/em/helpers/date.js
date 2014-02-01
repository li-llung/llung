/*
//  date.js
*/
var em = em || {};
(function($, em){
    'use strict';
    em.datehelper = {
        convert: function(what , type){
            var longMonthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"],
                shortMonthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
                convertedMonth = '';
            if(type === 'long'){
                convertedMonth = longMonthNames[what];
            }else if(type === 'short'){
                convertedMonth = shortMonthNames[what];
            }
            return convertedMonth;
        }     
    };
})(jQuery, em);