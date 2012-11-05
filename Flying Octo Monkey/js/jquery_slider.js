/* ==========================================================
 * Lynda Content Slider Plugin
 * ==========================================================
 * Copyright 1995–2012 lynda.com, Inc. All rights reserved.
 *
 * ---------Options:-----------------------------------------
 * delay: time it takes to animate to the next slide (integer)
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
        content_anchor: function (elem, selector, anchor) {
            $(elem).parents(selector).find("a").removeClass(anchor);
            $(elem).addClass(anchor);
        },
        setup_controls: function (holder, config, counter){
            if(config.controls){
                $("<div/>", {
                    id: "slide_controls_" + counter,
                    'class': "slide_controls"
                }).prependTo($(this));
                if(config.resume){
                    $("<a/>", {
                        href: 'javascript:void(0);',
                        'class': "slider_resume",
                        text: 'resume'
                    }).appendTo('#slide_controls_' + counter);
                }
                if(config.stop){
                    $("<a/>", {
                        href: 'javascript:void(0);',
                        'class': "slider_stop",
                        text: 'stop'
                    }).appendTo('#slide_controls_' + counter);
                }
            }
        },
        move_control: function (holder, config){
            var selected = $(holder).parents(config.selector).find('.slide_nav_anchor'),
                next = selected.removeClass('slide_nav_anchor').next(),
                nav = $(holder).parents(config.selector).find('.slide_nav');

            if(selected.is(':last-child')){
                nav.find("a").first().addClass('slide_nav_anchor');
            }else{
                next.addClass('slide_nav_anchor');
            }

        },
        content_slider: function(options) {
            var defaults = {
                speed: 5000,
                delay: 1000,
                start: false,
                direction: 'horizontal',
                effect: 'tween',
                selector: '.slider',
                anchor: 'slide_nav_anchor',
                controls: true,
                resume: true,
                stop: true,
                loop: 0
            };
            options =  $.extend(defaults, options);
            return this.each(function() {
                var o = options,
                    counter = 1;
                $(o.selector).each(function(){
                    var slider_interval;
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
                        anchor: (ov.data('anchor') !== undefined) ? ov.data('anchor') : o.anchor,
                        controls: (ov.data('controls') !== undefined) ? ov.data('controls') : true,
                        resume: (ov.data('resume') !== undefined) ? ov.data('resume') : true,
                        stop: (ov.data('stop') !== undefined) ? ov.data('stop') : true,
                        loop: (ov.data('loop') !== undefined) ? ov.data('loop') : 0
                    };
                    var stop = function() {
                        clearInterval(slider_interval);
                    };
                    var slide_count = $(this).find('.slide').length,
                        holder = '#slide_holder_' + counter,
                        nav =  '#slide_nav_' + counter;

                    $("<div/>", {
                        id: "slide_holder_" + counter,
                        'class': "slide_holder"
                    }).prependTo(ov);
                    if(config.direction === "horizontal"){
                        $(holder).width(slide_count * config.width);
                    }
                    ov.find('.slide').appendTo(holder);
                    $("<div/>", {
                        id: "slide_nav_" + counter,
                        'class': "slide_nav"
                    }).appendTo(ov);
                    for(var i=0;i<slide_count;i++){
                        $("<a/>", {
                            href: 'javascript:void(0);',
                            'class': "slide_nav_item",
                            text: (i + 1)
                        }).appendTo(nav);
                    }
                    $(nav).find('.slide_nav_item').first().addClass('slide_nav_anchor');
                    ov.find('.slide_nav_item').on('click', function(){
                        $(holder).content_animate_to(Number($(this).text()), config.width, config.height, config.direction, holder, config.delay, config.effect);
                        $(this).content_anchor(this, config.selector, config.anchor);
                    });

                    ov.setup_controls(holder, config, counter);

                    var slider_count = 1;
                    var flip = false;
                    var total_slides = ($(holder).find(".slide").length * config.loop);

                    if(config.start){
                        $(holder).find(".slide").each(function(index){
                            $(this).attr('data-slide', (index + 1)).attr('data-set', 1);
                        });
                        $(holder).children().clone().appendTo(holder).attr('data-set', 2);
                        slider_interval = setInterval(function(){
                            if(slider_count === $(holder).find(".slide").length && flip == false){
                                $(holder).find('[data-set="1"]').clone().insertAfter($(holder).find('.slide').last()).attr('data-set', counter);
                                flip = true;
                            }else{
                                flip = false;
                            }
                            if(config.direction == "horizontal"){
                                $(holder).forward(holder, config);
                                $(holder).width($(holder).find(".slide").length * config.width);
                            }else if(config.direction == "vertical"){
                                $(holder).down(holder, config);
                            }

                            ov.move_control(holder, config);

                            if(config.loop > 0){
                                if((slider_count+1) === total_slides){
                                    stop();
                                }
                            }

                            slider_count += 1;
                        }, config.speed);
                    }

                    $(this).find('.slider_stop').on('click', function(){
                        stop();
                    });
                    counter+=1;
                });
            });
        }
    });
    $(document).ready(function () {
        $('body').content_slider({start: true});
    });
})(jQuery);