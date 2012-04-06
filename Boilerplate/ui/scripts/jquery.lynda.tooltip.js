/*
* Lynda.com tooltip 
*/
; (function($) {
    var isIE = ($.browser.msie || navigator.appName.indexOf("Microsoft") != -1);
    var skin = {
        base: '<div class="toolTipWrapper"></div>',
        noArrow: '<div id="divHover" class="toolTipMid">...</div>',
        leftArrow: '<div class="toolTipArrow"></div>' +
                   '<div id="divHover" class="toolTipMid">...</div>',
        rightArrow: '<div id="divHover" class="toolTipMid mmusTooltipRight">...</div>' +
                    '<div class="toolTipArrow rightArrow"></div>',
        arrow: '<div class="toolTipArrow"></div>'
    };

    $.fn.tooltip = function(options) {
        var alignment = { right: 'right', left: 'left', top: 'top', bottom: 'bottom' };
        var settings = $.extend({
            text: '',
            isUrl: true,
            jsonParams: function() { return "{}"; },
            withArrow: true,
            align: alignment.right, //toltip is at element's right and its arrow is pointing to left
            offsetLeft: 0,
            offsetTop: 0
        }, options || {});

        return this.each(function(index) {
            var $element = $(fixDisabled(this, index));
            var $tooltip;
            $element.bind('mouseover.lyndatooltip', function(event) {
                if ($(this).siblings("div[class='toolTipWrapper']").length >= 1) {
                    return false;
                }

                $(this).parent().append(skin.base);
                $tooltip = $('div.toolTipWrapper', $(this).parent());
                $tooltip.append((settings.withArrow ? (settings.align == alignment.left ? skin.rightArrow : skin.leftArrow) : skin.noArrow));
                if (settings.isUrl == true) {
                    var paramsJSON = '';
                    if ($.isFunction(settings.jsonParams))
                        paramsJSON = settings.jsonParams(this);
                    $.ajax(
		                {
		                    type: "POST",
		                    url: settings.text,
		                    data: paramsJSON,
		                    async: false,
		                    cache: true,
		                    dataType: "json",
		                    contentType: "application/json; charset=utf-8",
		                    success: function(message) {
		                        $('#divHover', $tooltip).html(message);
		                    }
		                });
                }
                else {
                    $('#divHover', $tooltip).html(settings.text);
                };

                //search base offset element
                var parent = $tooltip.parents().filter(function(index) {
                    return $(this).css('position') == 'relative';
                });
                var wndPos = position(window),
                    currPos = position(this),
                    ttPos = position($tooltip),
                    parentPos = position(parent),
                    align = settings.align;

                var leftt = ((isIE || $.browser.safari) ? currPos.offx - parentPos.offx + currPos.w + settings.offsetLeft + 3
                                                        : currPos.offx + currPos.w + settings.offsetLeft + 3),
                    rightt = "auto",
                    topt = "auto";
                //check for right collision with browser border
                //set tooltip to 3px far from the base element
                if (settings.align == alignment.right && wndPos.x + wndPos.w < currPos.offx + currPos.w + ttPos.w) {
                    align = alignment.left;
                    if (isIE || $.browser.safari) {
                        leftt = currPos.offx - parentPos.offx - ttPos.w - settings.offsetLeft - 3;
                    }
                    else {
                        leftt = currPos.offx - ttPos.w - settings.offsetLeft - 3;
                    }
                };
                $tooltip.css({ left: leftt, right: "auto", top: topt });
                if (settings.align == alignment.left || align == alignment.left) {
                    $('div#divHover').addClass('mmusTooltipRight');
                    if (settings.withArrow) {
                        $('div.toolTipArrow', $tooltip).remove();
                        $tooltip.append(skin.arrow);
                        $('div.toolTipArrow', $tooltip).addClass('rightArrow');
                    };
                };
                //left, top and bottom collisions should be implemented

                $tooltip.fadeIn(300);
            }).bind('mouseout.lyndatooltip', function(event) {
                $tooltip.fadeOut(100, function() { $(this).remove(); });
            });
        });
    }
})(jQuery);

function position(element) {
    var isIE = (jQuery.browser.msie || navigator.appName.indexOf("Microsoft") != -1);
    return {
        x: jQuery(element).scrollLeft(),
        y: jQuery(element).scrollTop(),
        offx: ((element == window || jQuery(element).offset() == null) ? 0 : jQuery(element).offset().left),
        offy: ((element == window || jQuery(element).offset() == null) ? 0 : jQuery(element).offset().top),
        w: jQuery(element).width(),
        h: jQuery(element).height()//,
//        log: 'element: ' + element + ', scrollLeft: ' + jQuery(element).scrollLeft() + ', scrollTop: ' + jQuery(element).scrollTop() +
//                                     ', offsetLeft: ' + (element == window ? 0 : jQuery(element).offset().left) +
//                                     ', offsetTop: ' + (element == window ? 0 : jQuery(element).offset().top) +
//                                     ', width: ' + jQuery(element).width() +
//                                     ', height: ' + jQuery(element).height()
    };
}

function fixDisabled(element, index) {
    if (element.type == 'image' && element.disabled == true) {
        $element = jQuery(element).removeAttr('disabled').bind('click select', function(e) { e.preventDefault(); });
        return $element;
    }
    else {
        return element;
    }
}