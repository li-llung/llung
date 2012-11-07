/*COMPONENT_NAME_1*/
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