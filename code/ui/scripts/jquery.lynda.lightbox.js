/*
** Lynda Lightbox functionality **

Usage:
jQuery('selector').lightbox(options);

Options:
- maskBackground
    * the background used for the mask
    * default value: "#000000"
- modal
    * if false, clicking on the mask will close the lightbox
    * default value: false
- closeElements
    * a jQuery selector that will match the elements that should close the lightbox
    * default value: ""
- openElements
    * a jQuery selector that will match the elements that should open the lightbox
    * default value: ""
- contentFadeInSpeed
    * the content fade in speed
    * default value: 2000
- maskFadeInSpeed
    * the mask fade in speed
    * default value: 2000
- maskFadeToSpeed
    * the mask fade to speed (will be used for fading to the maskOpacity)
    * default value: "slow"
- maskFadeToOpacity
    * the mask opacity (the opacity value the mask will fade to)
    * default value: 0.8
- top
    * the distance from the top of the page (accepted values: "center" or any css top property value)
    * default value: "center" (will vertically align the lightbox to the center)
- left
    * the distance from the left side (accepted values: "center" or any css left property value)
    * default value: "center" (will horizontally align the lightbox to the center)
*/

(function($) {
    var defaults = {
        maskBackground: "#000000",
        modal: false,
        closeElements: "",
        openElements: "",
        contentFadeInSpeed: 2000,
        maskFadeInSpeed: 2000,
        maskFadeToSpeed: "slow",
        maskFadeToOpacity: 0.8,
        top: "center",
        left: "center"
    };
    var options;

    $.fn.lightbox = function(prefs) {
        options = $.extend(defaults, prefs);

        return this.each(function() {
            obj = $(this);

            // Wrap the content with necessary html
            obj.wrap('<div id="lightbox-dialog" class="lightbox-window"></div>');
            obj.parent().wrap('<div id="lightbox-boxes"></div>');
            obj.parent().after('<div id="lightbox-mask"></div>');

            // Set the elements that will close the lightbox
            if (options.modal == false) {
                $('#lightbox-mask').click(function() {
                    $.hideLightbox();
                });
            }
            $(options.closeElements).click(function() {
                $.hideLightbox();
            });
            $(options.openElements).click(function() {
                $.showLightbox();
            });

            $('#lightbox-mask').css('background', options.maskBackground);
        });
    };

    $.showLightbox = function() {

        //Get the div to show
        var dialog = '#lightbox-dialog';
        var mask = '#lightbox-mask';

        //Get the screen height and width
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();

        //Get the window height and width
        var winH = $(window).height();
        var winW = $(window).width();

        //Set height and width to mask to fill up the whole screen
        $(mask).css({ 'width': maskWidth, 'height': maskHeight });
        $(mask).css('top', 0);
        $(mask).css('left', 0);

        //transition effect
        $(mask).fadeIn(options.maskFadeInSpeed);
        $(mask).fadeTo(options.maskFadeToSpeed, options.maskFadeToOpacity);

        //Set the popup window position
        if (options.top == "center") {
            if ($(dialog).height() > winH) {
                $(dialog).css('top', 0);
            }
            else {
                $(dialog).css('top', winH / 2 - $(dialog).height() / 2);
            }
        }
        else {
            $(dialog).css('top', options.top)
        }
        if (options.left == "center") {
            $(dialog).css('left', winW / 2 - $(dialog).width() / 2);
        }
        else {
            $(dialog).css('left', options.left);
        }

        //transition effect
        $(dialog).fadeIn(options.contentFadeInSpeed);
    };

    $.hideLightbox = function() {
        jQuery('#lightbox-mask, .lightbox-window').hide();
        return false;
    };
})(jQuery); 