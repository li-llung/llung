/*COMPONENT_NAME_1*/
function getQueryString() {
    var result = {}, queryString = location.search.substring(1),
        re = /([^&=]+)=([^&]*)/g, m;

    while (m = re.exec(queryString)) {
        result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    return result;
}

(function($){
    $.fn.extend({
        COMPONENT_NAME_1: function(options) {
            var defaults = {
            };
            options =  $.extend(defaults, options);
            return this.each(function() {
                $(this).css('background-color', 'red');
            });
        }
    });
    $(document).ready(function () {
    });
})(jQuery);

/*COMPONENT_NAME_2*/
var lynda = {};
(function($){

lynda.COMPONENT_NAME_2=function(container){
    $(container).css('background-color', 'blue');
    return container;
}
})(jQuery);

/*COMPONENT_NAME_3*/
(function($){
    lynda.COMPONENT_NAME_3 = function(container, options){
        var defaults = {
            'color': 'green'
        };
        options =  $.extend(defaults, options);
        $(container).css('background-color', options.color);
        return container;
    }
})(jQuery);

/*COMPONENT_NAME_4*/
(function($){
    // The if statement allows the file to be used with
    // other files that use the same shared namespace
    if(!$.Lynda){
        $.Lynda = { };
    };
    $.Lynda.COMPONENT_NAME_4 = function( params ){
        //... code1 ...
        return $('.box4b').each(function(){
            $(this).css('background-color', 'teal');
        });
    };
    // And for the wrapper sets ($.fn):
    $.fn.extend({
        COMPONENT_NAME_4: function(options) {
            var defaults = {
            };
            options =  $.extend(defaults, options);
            return this.each(function() {
                $(this).css('background-color', 'yellow');
            });
        }
    });
})(jQuery);

/*COMPONENT_NAME_5*/
(function($){
    $.Lynda.COMPONENT_NAME_5 = function( params ){
        //... code1 ...
        return $('.box5b').each(function(){
            $(this).css('background-color', 'purple');
        });
    };
})(jQuery);

/*COMPONENT_NAME_6*/
(function($) {
    if (!$.COMPONENT_NAME_6) {
        $.extend({
            COMPONENT_NAME_6: function(elm, command, args) {
                return elm.each(function(index){
                    $(this).css('background-color', 'aqua');
                });
            }
        });
        $.fn.extend({
            COMPONENT_NAME_6: function(command) {
                return $.COMPONENT_NAME_6($(this), command, Array.prototype.slice.call(arguments, 1));
            }
        });
    }
})(jQuery);


/*MARGIN*/
/*Extend lynda namespace with margin function and create a extention to call for chaining*/
(function($){
    $.Lynda.margin = function(element, options){
        //... code1 ...
        return $(element).each(function(){
            $(this).css('margin', options.margin);
        });
    };
    $.fn.extend({
        margin: function(options) {
            return $.Lynda.margin(this, options);
        }
    });
})(jQuery);


!function ($) {
    "use strict"; // jshint ;_;
    var toggle_bg = ''
        , Colorize = function (element) {
            var toggler = 'test';
            console.log('a');
            $("#box7").css('background-color', 'black');
        }
    Colorize.prototype = {
        constructor: Colorize
        , toggle_bg: function () {
           console.log('d');
            $(".box").css('background-color', 'black');
        }

    }
    $.fn.colorize = function (option) {
        return this.each(function () {
            $(this).css('background-color', 'brown');
        })
    }
    $.fn.colorize.Constructor = Colorize
    $(function () {
        $('.box').on('click', function(){
        });
    })
}(window.jQuery);


(function( $ ){

    var methods = {
        init : function( options ) {
            return this.each(function () {
                $("#box8").css('background-color', 'salmon');
            })
        },
        show : function( ) {
            // IS
        },
        hide : function( ) {
            // GOOD
        },
        update : function( content ) {
            // !!!
        },
        red : function() {
            return this.each(function () {
                $("#box8").css('background-color', 'salmon');
            })
        }
    };

    $.fn.COMPONENT_NAME_7 = function( method, options, callback ) {
        if(options && typeof options === "object"){
            console.log('has options');
        }
        if(callback && typeof callback === "function"){
            console.log('has callback');
            callback()
        }

        // Method calling logic
        if ( methods[method] ) {
            console.log('has method');
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
        }
    };

})( jQuery );

function COMPONENT_NAME_8(){
    this.sub_meth = function(){
        $("#box9b").css('background-color', 'pink');
    }
    $("#box9").css('background-color', 'black');
}
var comp_name = new COMPONENT_NAME_8();


