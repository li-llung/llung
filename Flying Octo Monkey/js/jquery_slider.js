/* ==========================================================
 * Lynda Content Slider Plugin
 * ==========================================================
 * Copyright 1995–2012 lynda.com, Inc. All rights reserved.
 *
 * ---------Options:-----------------------------------------
 * delay: time it takes to animate to the next slide (integer)
 * start: auto start (true/false)
 * direction: direction of slider (horizontal/vertical)
 * effect: effect slider has when changing slides (fade/tween)
 * selector: a css selector that is the main class on your slider, Example: '.slider' (css selector)
 * anchor: overrides the default name of the slider anchor. (string)
 *
 * ---------Usage: (with options)---------------------------
 *
 * $(document).ready(function () {
 *    $("body").slider({start: true});
 * });
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
        up: function (holder, config) {
            $(holder).animate({
                top: '+=' + config.height
            }, config.delay);
        },
        down: function (holder, config) {
            $(holder).animate({
                top: '-=' + config.height
            }, config.delay);
        },
        forward: function (holder, config) {
            $(holder).animate({
                left: '-=' + config.width
            }, config.delay);
        },
        back: function (holder, config) {
            $(holder).animate({
                left: '+=' + config.width
            }, config.delay);
        },
        is_start: function (elem) {
            return $(this).hasClass('first');
        },
        is_end: function (elem) {
            return $(this).hasClass('end');
        },
        current_slide: function (holder, config){
            var direction,
                type;
            if(config.direction == "horizontal"){
                direction = 'left';
                type = config.width;
            }else if(config.direction == "vertical"){
                direction = 'top';
                type = config.height;
            }
            var offset = -((parseFloat($(holder).css(direction)) / type));
            return offset;
        },
        start: function (holder, config) {
            var last_item = $(holder).find('.slide').last(),
                first_item = $(holder).find('.slide').first();
            first_item.addClass('first');
            last_item.addClass('end');
            $(holder).addClass('go');
            //alert('moo');
            //console.log($(this).current_slide(holder, config));
            $(config.selector).each(function(){
                if(config.direction == "horizontal" && $(holder).hasClass('go')){
                    //$(this).forward(holder, config);
                    //$(this).find(holder).width($(holder).find(".slide").length * config.width).children().clone().appendTo(holder);
                }else if(config.direction == "vertical" && $(holder).hasClass('go')){
                    //$(this).down(holder, config);
                }
            });
        },
        stop_slider: function (slider_interval) {
            //alert(slider_interval);
            clearInterval(slider_interval);
        },
        resume: function () {

        },
        content_animate_to: function (slide_number, width, height, direction, element, delay, effect) {
            var animate_left = -((slide_number * width) - width),
                animate_top = -((slide_number * height) - height);
            if(effect == "fade"){
                $(element).find('.slide').fadeOut();
                $(element).find('.slide').eq((slide_number-1)).fadeIn();
            }else{
                if (direction === 'horizontal') {
                    $(element).animate({
                        left: animate_left
                    }, delay);
                } else {
                    $(element).animate({
                        top: animate_top
                    }, delay);
                }
            }
        },
        content_anchor: function (elem, selector, anchor, slider_interval) {
            $(elem).stop_slider(slider_interval);
            $(elem).parents(selector).find("a").removeClass(anchor);
            $(elem).addClass(anchor);
        },
        content_slider: function(options) {
            var defaults = {
                speed: 5000,
                delay: 1000,
                start: false,
                direction: 'horizontal',
                effect: 'tween',
                selector: '.slider',
                anchor: 'slide_nav_anchor'
            };
            options =  $.extend(defaults, options);
            return this.each(function() {
                var o = options,
                    counter = 1,
                    slider_interval = 0;
                $(o.selector).each(function(){
                    var ov = $(this);
                    var config = {
                        width: ov.width(),
                        height: ov.height(),
                        delay: (ov.data('delay') !== undefined) ? ov.data('delay') : o.delay,
                        speed: (ov.data('speed') !== undefined) ? ov.data('speed') : o.speed,
                        start: (ov.data('start') !== undefined) ? ov.data('start') : false,
                        direction: (ov.data('direction') !== undefined) ? ov.data('direction') : o.direction,
                        effect: (ov.data('effect') !== undefined) ? ov.data('effect') : o.effect,
                        selector: (ov.data('selector') !== undefined) ? ov.data('selector') : o.selector,
                        anchor: (ov.data('anchor') !== undefined) ? ov.data('anchor') : o.anchor
                    };
                    var slide_count = $(this).find('.slide').length,
                        holder = '#slide_holder_' + counter,
                        nav =  '#slide_nav_' + counter;

                    $("<div/>", {
                        id: "slide_holder_" + counter,
                        'class': "slide_holder"
                    }).prependTo($(this));
                    if(config.direction === "horizontal"){
                        $(holder).width(slide_count * config.width);
                    }
                    $(this).find('.slide').appendTo(holder);
                    $("<div/>", {
                        id: "slide_nav_" + counter,
                        'class': "slide_nav"
                    }).appendTo($(this));
                    for(var i=0;i<slide_count;i++){
                        $("<a/>", {
                            href: 'javascript:void(0);',
                            'class': "slide_nav_item",
                            text: (i + 1)
                        }).appendTo(nav);
                    }
                    $(nav).find('.slide_nav_item').first().addClass('slide_nav_anchor');
                    $(this).find('.slide_nav_item').on('click', function(){
                        $(holder).content_animate_to(Number($(this).text()), config.width, config.height, config.direction, holder, config.delay, config.effect);
                        $(this).content_anchor(this, config.selector, config.anchor , slider_interval);
                    });
                    if(config.start){
                        slider_interval = setInterval(function(){$(this).start(holder,config)}, config.speed);
                    }
                    counter+=1;
                });
            });
        }
    });
    $(document).ready(function () {
        $('body').content_slider({start: true});
    });
})(jQuery);