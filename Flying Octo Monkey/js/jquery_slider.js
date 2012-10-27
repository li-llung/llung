/* ==========================================================
 * Lynda Slider Plugin
 * ==========================================================
 * Copyright 1995–2012 lynda.com, Inc. All rights reserved.
 *
 * ---------Options:-----------------------------------------
 *
width
height
delay
speed
auto_play
control_start
slider_start
slide_start
debug
slider_name
class_name
inner_name
single_slide
single_control
direction
type
loop
loop_count
loop_endless
count
 *
 * ---------Usage: (with options)---------------------------
 *

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
        stop: function () {

        },
        resume: function () {

        },
        move_control: function () {

        },
        animate_to: function (slide_number, width, height, direction, element, delay) {
            var animate_left = -((slide_number * width) - width);
            var animate_top = -((slide_number * height) - height);
            if (direction === 'horizontal') {
                $("#" + element).animate({
                    left: animate_left
                }, delay);
            } else {
                $("#" + element).animate({
                    top: animate_top
                }, delay);
            }
        },
        up: function (elem, width, delay) {
            $("#" + elem).animate({
                top: '+=' + width
            }, delay);
        },
        down: function (elem, width, delay) {
            $("#" + elem).animate({
                top: '-=' + width
            }, delay);
        },
        left: function (elem, width, delay) {
            $("#" + elem).animate({
                left: '-=' + width
            }, delay);
        },
        right: function (elem, width, delay) {
            $("#" + elem).animate({
                left: '+=' + width
            }, delay);
        },
        check_start: function () {

        },
        check_end: function () {

        },
        anchor: function (elem) {
            $('.slide_nav_item').removeClass('slide_nav_anchor');
            $(elem).addClass('slide_nav_anchor');
        },
        slider: function(options) {
            var defaults = {
                width: 920,
                height: 379,
                delay: 6000,
                speed: 1000,
                start: true,
                control_start: '',
                slider_start: '',
                slide_start: '',
                debug: false,
                slider_name: '',
                class_name: '',
                inner_name: '',
                single_slide: '',
                single_control: '',
                direction: 'horizontal',
                effect: 'tween',
                loop: true,
                loop_count: '',
                loop_endless: '',
                count: ''
            };
            options =  $.extend(defaults, options);
            return this.each(function() {
                var o = options;
                var slide_count = $('.slide').length;

                if(o.start){
                    //create holder
                    $("<div/>", {
                        id: "slide_holder",
                        'class': "slide_holder"
                    }).prependTo('.slider');
                    if(o.direction === "horizontal"){
                        $('.slide_holder').width(slide_count * o.width);
                    }
                    //move all slides into holder
                    $('.slide').appendTo(".slide_holder");
                    //create nav
                    $("<div/>", {
                        id: "slide_nav",
                        'class': "slide_nav"
                    }).appendTo('.slider');
                    //add controls
                    for(var i=0;i<slide_count;i++){
                        $("<a/>", {
                            href: 'javascript:void(0);',
                            'class': "slide_nav_item",
                            text: (i + 1)
                        }).appendTo('.slide_nav');
                    }
                    $('.slide_nav').find('.slide_nav_item').first().addClass('slide_nav_anchor');
                    //controls
                    $('.slide_nav_item').on('click', function(){
                        $('.slide_holder').animate_to(Number($(this).text()), o.width, o.height, o.direction, 'slide_holder', o.speed);
                        $(this).anchor(this);
                    });
                }
            });
        }
    });
    $(document).ready(function () {
        $("body").slider({start: true});
    });
})(jQuery);