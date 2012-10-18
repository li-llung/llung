/* ==========================================================
 * Lynda Back to Top Plugin
 * ==========================================================
 * Copyright 1995–2012 lynda.com, Inc. All rights reserved.
 *
 * ---------Options:-----------------------------------------
 *
 * selector: css selector to find the back to top link (string)
 * css_class: css class applied to the back to top div (string)
 * speed: speed at which animations happen (fast/slow)
 * threshold: scroll after X number of pixels (integer)
 * faded: fade the back to top to X , on hover will make it 1.0 and mouse out it will return to X (integer)
 * delay: speed at which page scrolls to top (integer)
 * text: text for back to top anchor tag (string)
 * start: automatically add back to top to the page. (true/false)
 * fixed: true if your css is using position fixed, false if using absolute. Absolute is best for webkit devices. (true/false)
 * snapto: full css selector for item you want to snap the back to top with. (string)
 * snap_adjust: full css selector for item you want to snap the back to top with. (integer)
 *
 * ---------Useage: (with options)---------------------------
 *
 $(document).ready(function () {
      $("body").back_to_top({text: 'set from page', faded: 0.60, start: true});
 });
 *
 * ---------License------------------------------------------
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

(function($){
    $.fn.extend({
        back_to_top: function(options) {
            var defaults = {
                selector: '.back_to_top',
                css_class: 'back_to_top',
                speed: 'fast',
                threshold: 100,
                faded: 0.5,
                delay: 800,
                text: 'back to top',
                start: true,
                fixed: true,
                snapto: false,
                snap_adjust: 0
            };
            options =  $.extend(defaults, options);
            return this.each(function() {
                var o = options;
                if (jQuery(o.selector).length) {
                    jQuery(o.selector).remove();
                }
                if(o.start){
                    $("<div/>", {
                        'class': o.css_class,
                        html: '<a>'+o.text+'</a>'
                    }).fadeTo("fast", o.faded).hide().appendTo("body");
                    if(o.snapto !== false){
                        var position = ((($('body').width() - $(o.snapto).outerWidth()) / 2) + o.snap_adjust);
                        $('.' + o.css_class).css('right', position);
                    }
                    $("<a/>", {
                        id: "top"
                    }).prependTo('body');
                    $(window).bind('scroll resize', function () {
                        if($(window).scrollTop() > o.threshold){
                            if(o.fixed){
                                $(o.selector).fadeIn();
                            }else{
                                var btt_top = (($(window).scrollTop() + $(window).height()) - $(o.selector).height());
                                $(o.selector).css('top', btt_top).fadeIn();
                            }
                        }else{
                            $(o.selector).fadeOut();
                        }
                    });
                    $(o.selector).live('click', function () {
                        $('body,html').animate({
                            scrollTop: 0
                        }, o.delay);
                        return false;
                    }).hover(
                        function () {
                            if($(window).scrollTop() > o.threshold){
                                $(this).fadeTo(o.speed, 1);
                            }else{
                                $(this).fadeOut();
                            }
                        },
                        function () {
                            if($(window).scrollTop() > o.threshold){
                                $(this).fadeTo(o.speed, o.faded);
                            }else{
                                $(this).fadeOut();
                            }
                        }
                    );
                }
            });
        }
    });
    $(document).ready(function () {
        $("body").back_to_top({start: true});
    });
})(jQuery);