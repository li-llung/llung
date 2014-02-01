/*
//  math.js
*/
var em = em || {};
(function($, em){
    'use strict';
    em.math = {
        magnitude: function (val) {
            return Math.floor(Math.log(val) / Math.LN10);
        },
        isNumber: function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        },
        capValue: function (valueToCap, maxValue, minValue){
            if(isNumber(maxValue)) {
                if( valueToCap > maxValue ) {
                    return maxValue;
                }
            }
            if(isNumber(minValue)){
                if ( valueToCap < minValue ){
                    return minValue;
                }
            }
            return valueToCap;
        },
        decimals: function (num){
            if (num%1!==0){
                return num.toString().split(".")[1].length;
            }
            else{
                return 0;
            }
        }        
    };    
})(jQuery, em);