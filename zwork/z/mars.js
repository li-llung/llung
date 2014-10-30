/************************************************************

* ========================================================== */
;(function ( $, window, document, undefined)
{
    'use strict';
	$.fn.extend({
        content_slider: function(options) {
            var defaults = {
                speed: 5000
            };
            options =  $.extend(defaults, options);
            return this.each(function() {
                var o = options;
                var slider = $(this);
            });
    });
    $(document).ready(function () {
        $('.content_slider').content_slider();
    });
})( jQuery, window, document );