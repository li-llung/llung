(function ($) {
    $(document).ready(function () {
        if (jQuery('.back_to_top').length) {
            jQuery('.back_to_top').remove();
        }
        $('<div class="back_to_top"><a>back to top</a></div>').hide().appendTo("body");
        $('<div id="top"><a href="javascript: void(0)"></a></div>').prependTo("body");
        $(window).bind('scroll resize', function () {
            ($(window).scrollTop() > 100) ? $('.back_to_top').fadeIn() : $('.back_to_top').fadeOut();
        });
        $('.back_to_top').live('click', function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        }).hover(
              function () {
                  $(this).fadeTo("fast", 1);
              },
              function () {
                  $(this).fadeTo("fast", 0.5);
              }
            );
    });
})(jQuery);