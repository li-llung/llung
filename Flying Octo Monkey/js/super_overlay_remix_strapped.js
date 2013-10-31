!function ($) {
  "use strict"; // jshint ;_;
  /* 
   * ========================== */
  function Overlay( element, options) {
    this.options = $.extend({}, $.fn.overlay.defaults, options);
    var $this = this;
      $(document).off('click').on('click', '.modal_bg', function ()
      {
        $this.close(element, options);
      });
      $(document).off('click.init').on('click.init', this.options.trigger, function ()
      {
        $this.show(element, options);
        return false;
      });   
      $(document).off('keyup').on('keyup', function (e) {
          if (e.keyCode === 27) {
             $this.close(element, options);
          }
      });    
  }
  Overlay.prototype = {
      constructor: Overlay
    , show: function (element, options) {
        console.log('strapped show');
        console.log($(element).data());
        if ($('#modal_bg').length > 0)
        {
          $('#modal_bg').remove();
        }
        $('<div/>', {
          id: "modal_bg",
          'class': "modal_bg spinner",
          css: {
            'width': '100%',
            'height': document.body.clientHeight
          }
        }).appendTo("body");
        $('#modal_bg').fadeTo('fast', '0.50');
      }
    , close: function (element, options) {
        console.log('strapped close');
        $('#overlay').fadeOut();
        $('#modal_bg').hide();
        $("body").trigger("close_overlay"); 
      }
  }
 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */
  $.fn.overlay = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('overlay')
        , options = typeof option == 'object' && option
      if (!data) $this.data('overlay', (data = new Overlay(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.overlay.Constructor = Overlay

  $.fn.overlay.defaults = {
    trigger: '.overlay'
  }
 /* SCROLLSPY DATA-API
  * ================== */

  $(function () {
    $('.overlay').each(function () {
      var $spy = $(this)
      $spy.overlay($spy.data())
    })
  })

}(window.jQuery);