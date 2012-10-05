(function ($) {
    var ldc_overlay = new overlay();
    $(document).ready(function () {
        if ($('#overlay_frame').length) {
            $('#overlay_frame').remove();
        }
        $('<div id="overlay_frame" class="overlay_frame"></div>').appendTo("body");
        var i = 1;
        if ($('.overlay').find("img").length) {
            $('.overlay').each(function () {
                $(this).find("img").attr('id', 'od_' + i).clone().appendTo("#overlay_frame").attr('id', 'image_od_' + i).attr('class', '');
                i++;
            });
        }
        $('.overlay').on('click', function () {
            ldc_overlay.init($(this));
            return false;
        });
    });
    $(window).resize(function () {
        ldc_overlay.reposition();
    });
    $(window).scroll(function () {
        ldc_overlay.reposition();
    });
    function overlay() {
        var fob = this;
        /*Start Public*/
        fob.init = function(e){
            var ov = $(e);
            var config = {
                href: ov.attr('href'),
                css_class: ov.attr('class'),
                title: (ov.attr('title') !== undefined) ? ov.attr('title') : '',
                type: ov.data('type'),
                element: (ov.data('element') !== undefined) ? ov.data('element') : 'overlay',
                data_class: (ov.data('class') !== undefined) ? ov.data('class') : '',
                call: ov.data('call'),
                width: (ov.data('width') !== undefined) ? ov.data('width') : 'user',
                height: (ov.data('height') !== undefined) ? ov.data('height') : 'user',
                rounded: (ov.data('rounded') !== undefined) ? ov.data('rounded') : '7px'
            };
            add_bg();
            add_content(e, config);
        };
        fob.reposition = function () {
            if($('.overlay_holder').length){
                $('.overlay_holder').each(function(){
                    $("#modal_bg").css({ 'width': $(window).width(), 'height': $(window).height() });
                    var overlay_left = (((Number($('body').width()) - Number($(this).width())) / 2));
                    if (is_mobile()) {
                        $("#modal_bg").css("top", $(window).scrollTop());
                    }
                    var overlay_top = (((Number($(window).height()) - Number($(this).height())) / 2));
                    overlay_top = (overlay_top < 0) ? 50 : overlay_top;
                    $(this).css('left', overlay_left);
                    $(this).css('top', overlay_top + $(window).scrollTop());
                });
            }
        };
        /*End Public*/
        /*Start Private*/
        var is_mobile = function(){
            return (navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod') ? true : false;
        };
        var add_content = function(e, config){
            if ($('#overlay').length) {
                $('#overlay').remove();
            }
            if ($("#overlay_bar").length) {
                $("#overlay_bar").remove();
            }

            var overlay_padding = $("#" + config.element).css('padding');
            $("<div/>", {
                id: "overlay",
                'class': "overlay_holder " + config.data_class
            }).prependTo('body');
            var overlay_height = $("#" + config.element).height();
            var overlay_width = $("#" + config.element).width();
            var content_html = '';

            var total_width = ((config.width == 'user') ? overlay_width : config.width ),
                total_height = ((config.height == 'user') ? overlay_height : config.height ),
                overlay_top = (((Number($(window).height()) - Number(total_height)) / 2)),
                overlay_left = (((Number($('body').width()) - Number(total_width)) / 2));

            if (total_width >= ($(document).width()-50)) {
                total_width = (Number($('body').width()) - 100);
                total_height = 'auto';
                overlay_left = (((Number($('body').width()) - Number(total_width)) / 2));
                overlay_top = 50;
            } else if (total_height >= ($(window).height()-50)) {
                overlay_left = (((Number($('body').width()) - Number(total_width)) / 2));
                overlay_top = 50;
            }
            $("<div/>", {
                id: "overlay_bar",
                'class': "overlay_bar",
                html: '<a href="#nogo" class="overlay_close"><img src="images/btn_close_22x22_black.png" alt=""/></a>'
            }).prependTo("#overlay");
            $(".overlay_close, #modal_bg").on(function () {
               close();
            });
            switch(config.type)
            {
            case 'image':
                $("#overlay").css({'width': 'auto', 'height': 'auto'});

                var src = $(e).find('img').attr('src');
                var image_id = $(e).find('img').attr('id');
                var width = $("#image_"+ image_id).width();
                var height = $("#image_"+ image_id).height();

                total_width = width;
                total_height = height;
                overlay_top = (((Number($(window).height()) - Number(height)) / 2));
                overlay_left = (((Number($('body').width()) - Number(width)) / 2));

                if (width >= ($(document).width()-100)) {
                    total_width = (Number($('body').width()) - 100);
                    total_height = 'auto';
                    overlay_left = (((Number($('body').width()) - Number(total_width)) / 2));
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
                            $('#overlay').append('<div class="overlay_content">' + data + '</div>');
                    }
                });
                break;
            default:
                $("#overlay").append('<div class="overlay_content">'+ ((config.title !== "") ? '<h1>'+config.title+'</h1>': '')+ '' + $("#"+ config.element).html() + '</div>');
                show_overlay(overlay_top, overlay_left, total_width, total_height);
            }
            $("#overlay").css({ '-moz-border-radius': config.rounded, '-webkit-border-radius': config.rounded, 'border-radius': config.rounded, '-khtml-border-radius': config.rounded });
            $("#overlay").css({ '-moz-box-shadow': '5px 5px 5px #666666', '-webkit-box-shadow': '5px 5px 5px #666666', 'box-shadow': '5px 5px 5px #666666' });
        };
        var add_bg = function(){
            if ($("#modal_bg").length > 0) {
                $('#modal_bg').remove();
            }
            if(is_mobile()){
                $("#modal_bg").css("top", $(window).scrollTop());
            }
            $("<div/>", {
                id: "modal_bg",
                'class': "modal_bg",
                css: {
                    'width': $(window).width(),
                    'height': $(window).height()
                }
            }).appendTo("body");
            $('#modal_bg').fadeTo('fast', '0.50');
            $('#modal_bg').click(function () {
                close();
            });
        };
        var show_overlay = function(overlay_top, overlay_left, total_width, total_height){
            $("#overlay").hide().fadeTo("slow", 1).show().css({ 'left': overlay_left, 'width': total_width, 'height': total_height });
            $("#overlay").css('top', overlay_top + $(window).scrollTop());
            fob.reposition();
        };
        var close = function () {
            $("#overlay").fadeOut();
            $('#modal_bg').hide();
        };
        /*End Private*/
    }
})(jQuery);