/* ==========================================================
 * Lynda Back to Top Plugin
 * ==========================================================
 * Copyright 1995–2012 lynda.com, Inc. All rights reserved.
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
        //pass the options variable to the function
        back_to_top: function(options) {
            //Set the default values, use comma to separate the settings:
            var defaults = {
                selector: '.back_to_top',
                css_class: 'back_to_top',
                speed: 'fast',
                threshold: 100,
                faded: 0.5,
                delay: 800,
                text: 'back to top',
                start: true
            };
            options =  $.extend(defaults, options);
            return this.each(function() {
                var o = options;
                if (jQuery(o.selector).length) {
                    jQuery(o.selector).remove();
                }
                if(o.start){
                    $("<div/>", {
                        class: o.css_class,
                        html: '<a>'+o.text+'</a>'
                    }).fadeTo("fast", o.faded).hide().appendTo("body");
                    $("<a/>", {
                        id: "top"
                    }).prependTo('body');
                    $(window).bind('scroll resize', function () {
                        if($(window).scrollTop() > o.threshold){
                            $(o.selector).fadeIn();
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
                              $(this).fadeTo(o.speed, 1);
                          },
                          function () {
                              $(this).fadeTo(o.speed, o.faded);
                          }
                    );
                }
            }); 
        } 
    });
    //auto-start plugin
    $(document).ready(function () {
        $("body").back_to_top({start: true});
    });
})(jQuery);