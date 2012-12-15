(function($){
    lynda.is_mobile= function(){
        var ext = this;
        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
        var isiPad = navigator.userAgent.match(/iPad/i) != null;
        var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
        var isiPod = navigator.userAgent.match(/iPod/i) != null;

        return (isiPad || isiPhone || isiPod || isAndroid);
    }
    lynda.overlay=function(command, options, callback)
    {
        var ext = this;
        ext.is_open = false;
        ext.is_loaded = false;
        var $scope = {element:this, command: command, options:options, callback:callback};
        $scope.defaults = {
            href: '',
            css_class: 'overlay',
            title: '',
            type: 'regular',
            element: 'overlay',
            data_class: 'my_overlay',
            call: '',
            width: 'user',
            height: 'user',
            rounded: '7px',
            start: true,
            show: false,
            close: false,
            sticky: true
        };
        $scope.reposition = function (element, settings) {
            var ext = this;
            return $(element).each(function() {
                if($('.overlay_holder').length){
                    $('.overlay_holder').each(function(){
                        $("#modal_bg").css({ 'width': $(window).width(), 'height': $(window).height() });
                        if (lynda.is_mobile()) {
                            $("#modal_bg").css("top", $(window).scrollTop());
                        }
                        var overlay_top = (((Number($(window).height()) - Number($(this).height())) / 2));
                        var overlay_left = (((Number($('body').width()) - Number($(this).width())) / 2));
                        overlay_top = (overlay_top < 0) ? 50 : overlay_top;
                        $(this).css({'left': overlay_left, 'top': overlay_top + $(window).scrollTop()});
                    });
                }
            });
        };
        $scope.reposition_bg = function () {
            if ($('.overlay_holder').length) {
                $("#modal_bg").css({"top": ($(window).scrollTop()), 'left': $(window).scrollLeft(), "height": ($(window).height() + 30), "width": ($(window).width())});
            }
        };
        $scope.open = function(overlay_top, overlay_left, total_width, total_height){
            $("#overlay").hide().fadeTo("slow", 1).show().css({ 'left': overlay_left, 'width': total_width, 'height': total_height });
            $("#overlay").css('top', overlay_top + $(window).scrollTop());
            $scope.reposition();
        };
        $scope.close = function(){
            $("#overlay").fadeOut();
            $('#modal_bg').hide();
        };
        $scope.init = function(element, settings){
            var o =settings;

            if(o.start){
                var fob = this;

                if ($('#overlay_frame').length) {
                    $('#overlay_frame').remove();
                }
                $("<div/>", {
                    id: "overlay_frame",
                    'class': "overlay_frame"
                }).appendTo('body');
                var i = 1;
                if ($('.overlay').find("img").length) {
                    $('.overlay').each(function () {
                        $(this).find("img").attr('id', 'od_' + i).clone().appendTo("#overlay_frame").attr('id', 'image_od_' + i).attr('class', '');
                        i++;
                    });
                }

                /*Start Public*/
                fob.init = function(e){
                    var ov = $(e);
                    var config = {
                        href: ov.attr('href'),
                        css_class: ov.attr('class'),
                        title: (ov.attr('title') !== undefined) ? ov.attr('title') : '',
                        type: ov.data('type'),
                        element: (ov.data('element') !== undefined) ? ov.data('element') : o.element,
                        data_class: (ov.data('class') !== undefined) ? ov.data('class') : o.data_class,
                        call: ov.data('call'),
                        width: (ov.data('width') !== undefined) ? ov.data('width') : o.width,
                        height: (ov.data('height') !== undefined) ? ov.data('height') : o.height,
                        rounded: (ov.data('rounded') !== undefined) ? ov.data('rounded') : o.rounded
                    };
                    add_bg(), 300;
                    add_content(e, config);
                };
                /*End Public*/
                /*Start Private*/
                var add_content = function(e, config){
                    if ($('#overlay').length) {
                        $('#overlay').remove();
                    }
                    if ($("#overlay_bar").length) {
                        $("#overlay_bar").remove();
                    }

                    var overlay_padding = $("#" + config.element).css('padding'),
                        overlay_height = $("#" + config.element).height(),
                        overlay_width = $("#" + config.element).width(),
                        content_html = '';

                    $("<div/>", {
                        id: "overlay",
                        'class': "overlay_holder " + config.data_class
                    }).prependTo('body');
                    var total_width = ((config.width == 'user') ? overlay_width : config.width ),
                        total_height = ((config.height == 'user') ? overlay_height : config.height ),
                        overlay_top = (((Number($(window).height()) - Number(total_height)) / 2)),
                        overlay_left = (((Number($('body').width()) - Number(total_width)) / 2));

                    if (total_width >= ($(document).width()-50)) {
                        total_width = (Number($('body').width()) - 100);
                        total_height = 'auto';
                        overlay_top = 50;
                    } else if (total_height >= ($(window).height()-50)) {
                        overlay_top = 50;
                    }
                    $("<div/>", {
                        id: "overlay_bar",
                        'class': "overlay_bar",
                        html: '<a href="#nogo" class="overlay_close"><img src="images/btn_close_22x22_black.png" alt=""/></a>'
                    }).prependTo("#overlay");
                    switch(config.type)
                    {
                        case 'image':
                            $("#overlay").css({'width': 'auto', 'height': 'auto'});
                            var src = $(e).find('img').attr('src'),
                                image_id = $(e).find('img').attr('id'),
                                width = $("#image_"+ image_id).width(),
                                height = $("#image_"+ image_id).height();
                            total_width = width;
                            total_height = height;
                            overlay_top = (((Number($(window).height()) - Number(height)) / 2));
                            overlay_left = (((Number($('body').width()) - Number(width)) / 2));

                            if (width >= ($(document).width()-100)) {
                                total_width = (Number($('body').width()) - 100);
                                total_height = 'auto';
                                overlay_top = 50;
                            } else if (height >= ($(window).height()-100)) {
                                overlay_top = 50;
                                total_width = 'auto';
                            }
                            $('<div id="overlay_image_content" class="overlay_content"><img src="' + src + '" width="' + total_width + '" height="' + total_height + '" alt="'+config.title+'" style="height: ' + total_height + ''+((total_height =="auto") ? '':'px')+';width: ' + total_width + ''+((total_width =="auto")? '':'px')+';" alt="" /></div>').insertAfter('#overlay_bar');
                            if(config.title !== ""){
                                $('<div class="overlay_caption"><h1>'+config.title+'</h1></div>').appendTo('.overlay_content');
                                $('.overlay_caption').fadeTo("slow", 0.60);
                            }
                            $("#overlay").hide().fadeTo("slow", 1).show().css({ 'left': overlay_left}).width((Number(total_width) + overlay_padding));
                            $("#overlay").css('top', overlay_top + $(window).scrollTop());
                            break;
                        case 'json':
                            $("#overlay").append('<div class="overlay_content">'+ ((window[config.call].title !== "") ? '<h1>'+window[config.call].title+'</h1>': '')+ '' + window[config.call].content + '</div>');
                            show_overlay(overlay_top, overlay_left, total_width, total_height);
                            break;
                        case 'file':
                            $.ajax({
                                dataType: "text",
                                url: config.href,
                                success: function (data) {
                                    $('#overlay').html('<div class="overlay_content">'+ data + '</div>');
                                    show_overlay(overlay_top, overlay_left, total_width, total_height);
                                }
                            });
                            break;
                        case 'external':
                            $.ajax({
                                url: config.href,
                                success: function (data) {
                                    if($('#overlay').find(".overlay_content").length){
                                        $('#overlay').find(".overlay_content").remove();
                                    }
                                    $('#overlay').append('<div class="overlay_content">' + data + '</div>');
                                    show_overlay(overlay_top, overlay_left, total_width, total_height);
                                }
                            });
                            break;
                        default:
                            $("#overlay").append('<div class="overlay_content">'+ ((config.title !== "") ? '<h1>'+config.title+'</h1>': '')+ '' + $("#"+ config.element).html() + '</div>');
                            show_overlay(overlay_top, overlay_left, total_width, total_height);
                    }
                    add_rounded(config.rounded);
                    add_shadow('5px 5px 5px', '#666666');

                    $('.overlay_close').on('click', function () {
                        $scope.close();
                    });
                };
                var add_rounded = function(amount){
                    $("#overlay").css({ '-moz-border-radius': amount, '-webkit-border-radius': amount, 'border-radius': amount, '-khtml-border-radius': amount });
                };
                var add_shadow = function(shadow_size, shadow_color){
                    $("#overlay").css({ '-moz-box-shadow': ''+shadow_size+' '+shadow_color+'', '-webkit-box-shadow': ''+shadow_size+' '+shadow_color+'', 'box-shadow': ''+shadow_size+' '+shadow_color+'' });
                };
                var add_bg = function(){
                    if ($("#modal_bg").length > 0) {
                        $('#modal_bg').remove();
                    }
                    if (lynda.is_mobile()) {
                        $("#modal_bg").css("top", $(window).scrollTop());
                    }
                    $("<div/>", {
                        id: "modal_bg",
                        'class': "modal_bg",
                        css: {
                            'width': '100%',
                            'height': document.body.clientHeight
                        }
                    }).appendTo("body");
                    $('#modal_bg').fadeTo('fast', '0.50');
                    $('#modal_bg').on('click', function () {
                        $scope.close();
                    });
                };
                var show_overlay = function(overlay_top, overlay_left, total_width, total_height){
                    $scope.open(overlay_top, overlay_left, total_width, total_height);
                };
                $(document).ready(function () {
                    $('.' + o.css_class).on('click', function () {
                        fob.init($(this));
                        return false;
                    });
                });
                if(o.sticky){
                    $(window).bind('resize scroll', function(){
                        $scope.reposition(element, settings);
                    });
                }else{
                    $scope.reposition_bg();
                }
                if(o.show){
                    fob.init($(this));
                }else if(o.close){
                    $scope.close();
                }
                /*End Private*/
            }
        };

        lynda.modularize($scope);
        $scope.callback();
        return $scope.returnValue;
    };
    $(document).ready(function () {
        $('body').lynda().overlay({start: true});
    });
})(jQuery);