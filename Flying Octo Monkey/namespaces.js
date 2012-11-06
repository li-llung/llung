/*Current - Landon*/
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

/*Braden*/
var lynda = {};
(function($){

lynda.COMPONENT_NAME_2=function(container){
    $(container).css('background-color', 'blue');
    return container;
}
})(jQuery);

/*Braden - Hybrid*/
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

(function($){

    // The if statement allows the file to be used with
    // other files that use the same shared namespace
    if(!$.Lynda){
        $.Lynda = { };
    };

    $.Lynda.COMPONENT_NAME_4 = function( params ){
        //... code1 ...
        $('.box6').each(function(){
            $(this).css('background-color', 'purple');
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