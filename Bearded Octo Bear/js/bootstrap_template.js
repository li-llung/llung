!function ($) {

  "use strict"; // jshint ;_; triggers ECMAScript 5 Strict Mode.  More here: http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/

  var Carousel = function (element, options) {

  };

  Carousel.prototype = {

    cycle: function (e) {
    },
    cycle2: function (e) {
    }
  };

  $.fn.carousel = function (option) {
    return this.each(function () {

    });
  };

  $.fn.carousel.defaults = {
    
  };

  $.fn.carousel.Constructor = Carousel;

  $(function () {
    $('body').on('click.carousel.data-api', '[data-slide]', function ( e ) {

    });
  });

}(window.jQuery);