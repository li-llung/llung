!function ($) {
  "use strict"; // jshint ;_;
  /* MODAL CLASS DEFINITION
  * ====================== */
  var Something = function (content, options) {
  };
  Something.prototype = {
    constructor: Something
    , toggle: function () {
      
    }
    , show: function () {

    }
    , hide: function (e) {

    }
  };
  /* MODAL PRIVATE METHODS
  * ===================== */
  function hideWithTransition() {
  }
  function hideModal(that) {
  }
  function backdrop(callback) {
  }
  function removeBackdrop() {
  }
  function escape() {
  }
  /* MODAL PLUGIN DEFINITION
  * ======================= */
  $.fn.something = function (option) {
  };
  $.fn.something.defaults = {
  };
  $.fn.something.Constructor = Something;
  /* MODAL DATA-API
  * ============== */
  $(function () {
    $('body').on('click.something.data-api', '[data-toggle="something"]', function ( e ) {

    });
  });
}(window.jQuery);