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
        content_animate: function (slider, holder, nav, config) {
            var slide_number = nav.find('.' + config.anchor).data('slide');
            console.log(nav.find('.' + config.anchor));
            var animate_left = -((slide_number * config.width) - config.width),
                animate_top = -((slide_number * config.height) - config.height);
            if(config.effect == "fade"){
                holder.find('.content_slide').fadeOut();
                holder.find('.content_slide').eq((slide_number-1)).fadeIn();
            }else{
                if (config.direction === 'horizontal') {
                    holder.animate({
                        left: animate_left
                    }, config.delay);
                } else {
                    holder.animate({
                        top: animate_top
                    }, config.delay);
                }
            }
        },
        content_anchor: function (elem, config) {
            $(elem).parents(config.selector).find("a").removeClass(config.anchor);
            $(elem).addClass(config.anchor);
        },
        content_slider: function(options) {
            var defaults = {
                speed: 5000,
                delay: 1000,
                start: false,
                direction: 'horizontal',
                effect: 'tween',
                selector: '.content_slider',
                anchor: 'content_slide_nav_anchor',
                controls: true,
                resume: true,
                stop: true,
                loop: 0,
                type: 'nav' //nav , dots , arrows
            };
            options =  $.extend(defaults, options);
            return this.each(function() {
                var o = options;
                var slider = $(this);
                var config = {
                    width: slider.width(),
                    height: slider.height(),
                    delay: (slider.data('delay') !== undefined) ? slider.data('delay') : o.delay,
                    speed: (slider.data('speed') !== undefined) ? slider.data('speed') : o.speed,
                    start: (slider.data('start') !== undefined) ? slider.data('start') : false,
                    direction: (slider.data('direction') !== undefined) ? slider.data('direction') : o.direction,
                    effect: (slider.data('effect') !== undefined) ? slider.data('effect') : o.effect,
                    selector: (slider.data('selector') !== undefined) ? slider.data('selector') : o.selector,
                    anchor: (slider.data('anchor') !== undefined) ? slider.data('anchor') : o.anchor,
                    controls: (slider.data('controls') !== undefined) ? slider.data('controls') : true,
                    resume: (slider.data('resume') !== undefined) ? slider.data('resume') : true,
                    stop: (slider.data('stop') !== undefined) ? slider.data('stop') : true,
                    loop: (slider.data('loop') !== undefined) ? slider.data('loop') : 0,
                    type: (slider.data('type') !== undefined) ? slider.data('type') : 'nav'
                };
                var slide_count = slider.find('.content_slide').length;

                $("<div/>", {
                    'class': "content_slide_holder"
                }).prependTo(slider);
                var holder = slider.find('.content_slide_holder');
                if(config.direction === "horizontal"){
                    holder.width(slide_count * config.width);
                }
                slider.find('.content_slide').appendTo(holder);
                
                var nav_class = '';
                switch(config.type)
                {
                case 'dots':
                    nav_class = 'dots';
                  break;
                case 'arrows':
                    $("<a/>", {
                        href: 'javascript:void(0);',
                        'class': "content_slide_left",
                        html: '&#8592;'
                    }).appendTo(slider);
                    $("<a/>", {
                        href: 'javascript:void(0);',
                        'class': "content_slide_right",
                        html: '&#8594;'
                    }).appendTo(slider);
                  break;
                default:
                    nav_class = 'nav';
                    //nav default
                }
                if(config.type !== 'arrows'){
                    $("<div/>", {
                        'class': "content_slide_nav " + nav_class
                    }).appendTo(slider);
                    var nav = slider.find('.content_slide_nav');
                    for(var i=0;i<slide_count;i++){
                        $("<a/>", {
                            href: 'javascript:void(0);',
                            'class': "content_slide_nav_item",
                            text: (config.type==="dots") ? '' : (i + 1),
                            'data-slide': (i + 1)
                        }).appendTo(nav);
                    }
                    $(nav).find('.content_slide_nav_item').first().addClass('content_slide_nav_anchor');
                    slider.find('.content_slide_nav_item').on('click', function(){   
                        $(this).content_anchor(this, config);                 
                        holder.content_animate(slider, holder, nav, config);
                    });
                }else{
                    var lazyLeft = parseInt(slider.find(".content_slide_holder").css('left'));
                    var lazy_width = config.width;
                    if (slider.length) {
                        $('.content_slide_left').on('click', function () {
                            holder.animate({
                                left: '+=' + lazy_width + 'px'
                            }, 500, function () {
                                // Animation complete.
                                var pos = parseInt(slider.find(".content_slide_holder").css('left'));
                                if (pos === 0) {
                                    $('.content_slide_right').show();
                                    $('.content_slide_left').hide();
                                }else {
                                    $('.content_slide_left').show();
                                    $('.content_slide_right').show();
                                }
                            });
                        });
                        $('.content_slide_right').on('click', function () {
                            holder.animate({
                                left: '-=' + lazy_width + 'px'
                            }, 500, function () {
                                // Animation complete.
                                var pos = parseInt(slider.find(".content_slide_holder").css('left'));
                                var rightEdge = -Number((slide_count * config.width) - config.width);
                                if (pos === 0) {
                                    $('.content_slide_right').show();
                                    $('.content_slide_left').hide();
                                } else if(rightEdge >= pos) {
                                    $('.content_slide_right').hide();
                                    $('.content_slide_left').show();
                                }else {
                                    $('.content_slide_left').show();
                                    $('.content_slide_right').show();
                                }
                            });
                        });
                    }                    
                }
            });
        }
    });
    $(document).ready(function () {
        $('.content_slider').content_slider();
    });
})(jQuery);