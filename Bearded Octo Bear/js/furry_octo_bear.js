(function ($) {
    var overlay = new overlay();
    $(document).ready(function () {  
        if ($('#overlay_frame').length) {
            $('#overlay_frame').remove();
        }
        $('<div id="overlay_frame"></div>').appendTo("body");      
        var i = 1;
        $('.overlay').each(function () {
            $(this).find("img").attr('id', 'od_' + i).clone().appendTo("#overlay_frame").attr('id', 'image_od_' + i).attr('class', '');                        
            i++;
        });
        $('.overlay').on('click', function () {
            overlay.init($(this));
            return false;
        });
    });    
    $(window).resize(function () {
        overlay.reposition();
    })
    $(window).scroll(function () {
        overlay.reposition();
    })
    function overlay() {
        /*Start Global Variables*/
        var fob = this;
        /*End Global Variables*/

        /*Start Global Functions*/
            /*Start Public*/
            fob.init = function(e){
                var ov = $(e);
                var config = {
                    href: ov.attr('href'),
                    css_class: ov.attr('class'),
                    title: (ov.attr('title') != undefined) ? ov.attr('title') : '',
                    type: ov.data('type'),
                    element: (ov.data('element') != undefined) ? ov.data('element') : 'overlay',
                    call: ov.data('call'),
                    width: (ov.data('width') != undefined) ? ov.data('width') : '500',
                    height: (ov.data('height') != undefined) ? ov.data('height') : '500',
                    rounded: (ov.data('rounded') != undefined) ? ov.data('rounded') : '7px'
                }
                add_bg();
                add_content(e, config);
            }
            /*End Public*/
            /*Start Private*/
            var is_mobile = function(){
                if (navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod') {    
                    return true;
                }else{
                    return false;
                }
            }
            var add_content = function(e, config){
                if (!$('.overlay_holder').length) {
                    $('.overlay_holder').remove();
                }
                var total_width = config.width,
                    total_height = config.height,
                    overlay_top = (((Number($(window).height()) - Number(total_height)) / 2) - 30),
                    overlay_left = (((Number($('body').width()) - Number(total_width)) / 2) - 30);

                if (total_width >= ($(document).width()-50)) {
                    total_width = (Number($('body').width()) - 100);
                    total_height = 'auto';
                    overlay_left = (((Number($('body').width()) - Number(total_width)) / 2) - 30);
                    overlay_top = 50;
                } else if (total_height >= ($(window).height()-50)) {
                    overlay_left = (((Number($('body').width()) - Number(total_width)) / 2) - 30);
                    overlay_top = 50;
                } 
                var content_html ='';
                if ($('#overlay').length) {
                    $('#overlay').remove();
                }    
                if ($("#overlay_bar").length > 0) {
                    $("#overlay_bar").remove();
                }                            
                $("<div/>", {
                    id: "overlay",
                    class: "overlay_holder"
                }).prependTo('body');
                $("<div/>", {
                    id: "overlay_bar",
                    html: '<a href="#nogo" class="overlay_close"><img src="images/btn_close_22x22_black.png" alt=""/></a>'
                }).prependTo("#overlay");
                $(".overlay_close, #modal_bg").click(function () {
                    $(".main_overlay").fadeOut();
                    $("#overlay").fadeOut();
                    $('#modal_bg').hide();
                });
                switch(config.type)
                {
                case 'image':                    
                    var src = $(e).find('img').attr('src');
                    var image_id = $(e).find('img').attr('id');
                    var width = $("#image_"+ image_id).width();
                    var height = $("#image_"+ image_id).height();     

                    var total_width = width,
                        total_height = height,
                        overlay_top = (((Number($(window).height()) - Number(height)) / 2) - 30),
                        overlay_left = (((Number($('body').width()) - Number(width)) / 2) - 30);

                    if (width >= ($(document).width()-100)) {
                        total_width = (Number($('body').width()) - 100);
                        total_height = 'auto';
                        overlay_left = (((Number($('body').width()) - Number(total_width)) / 2) - 30);
                        overlay_top = 50;
                    } else if (height >= ($(window).height()-100)) {
                        overlay_top = 50;
                        total_width = 'auto';
                    }
                    $('<div id="overlay_image_content" class="overlay_content"><img src="' + src + '" width="' + total_width + '" height="' + total_height + '" style="height: ' + total_height + ''+((total_height =="auto") ? '':'px')+';width: ' + total_width + ''+((total_width =="auto")? '':'px')+';" alt="" /></div>').insertAfter('#overlay_bar');
                    if(config.title != ""){
                        $('<div class="image_caption"><h1>'+config.title+'</h1></div>').appendTo('.overlay_content');
                        $('.image_caption').width(total_width).fadeTo("slow", 0.60);
                    }
                    $("#overlay").hide().fadeTo("slow", 1).show().css({ 'left': overlay_left, 'width': (Number(total_width) + 60) });
                    $("#overlay").css('top', overlay_top + $(window).scrollTop());

                    break;
                case 'json':
                    $("#overlay").append('<div class="overlay_content">'+ ((config.title != "") ? '<h1>'+config.title+'</h1>': '')+ '' + window[config.call].content + '</div>');
                    $("#overlay").hide().fadeTo("slow", 1).show().css({ 'left': overlay_left, 'width': total_width, 'height': total_height });
                    $("#overlay").css('top', overlay_top + $(window).scrollTop());                    
                    break;
                case 'ajax':
                    /*TODO*/
                    /*$.ajax({
                        url: config.href,
                        success: function (data) {
                            $('#overlay').html(data);
                        }
                    });*/
                    break;
                case 'external':
                    /*TODO*/
                    break;
                default:
                    $("#overlay").append('<div class="overlay_content">'+ ((config.title != "") ? '<h1>'+config.title+'</h1>': '')+ '' + $("#"+ config.element).html() + '');                   
                    $("#overlay").hide().fadeTo("slow", 1).show().css({ 'left': overlay_left, 'width': total_width, 'height': total_height });
                    $("#overlay").css('top', overlay_top + $(window).scrollTop());
                }                    
                $("#overlay").css({ '-moz-border-radius': config.rounded, '-webkit-border-radius': config.rounded, 'border-radius': config.rounded, '-khtml-border-radius': config.rounded });
                $("#overlay").css({ '-moz-box-shadow': '5px 5px 5px #666666', '-webkit-box-shadow': '5px 5px 5px #666666', 'box-shadow': '5px 5px 5px #666666' });
            }
            var add_bg = function(){
                if ($("#modal_bg").length > 0) {
                    $('#modal_bg').remove();
                }
                if(is_mobile()){
                    $("#modal_bg").css("top", $(window).scrollTop());      
                }
                $('#modal_bg').attr('display', 'none');
                $("<div/>", {
                    id: "modal_bg",
                    css: {
                        'width': $(window).width(),
                        'height': $(window).height()
                    }
                }).appendTo("body");
                $('#modal_bg').fadeTo('fast', '0.50');

                $('#modal_bg').click(function () {
                    close();
                })
            }
            var close = function () {
                $("#overlay").fadeOut();
                $('#modal_bg').hide();
            }
            var close_certain = function (e) {
                $("#" + e).fadeOut();
                $('#modal_bg').hide();
            }
            this.reposition = function () {
                if($('.overlay_holder').length){
                    $('.overlay_holder').each(function(){
                        $("#modal_bg").css({ 'width': $(window).width(), 'height': $(window).height() });
                        var overlay_left = (((Number($('body').width()) - Number($(this).width())) / 2));
                        $(".overlay_close").click(function () {
                            $(".main_overlay").fadeOut();
                            close();
                        })
                        if (is_mobile()) {
                            $("#modal_bg").css("top", $(window).scrollTop());
                        };                
                        $('#modal_bg').click(function () {
                            $(".main_overlay").fadeOut();
                            close();
                        })
                        var overlay_top = (((Number($(window).height()) - Number($(this).height())) / 2)-30);
                        (overlay_top < 0) ? overlay_top = 50 : overlay_top;
                        $(this).css('left', overlay_left);
                        $(this).css('top', overlay_top + $(window).scrollTop());
                    });                    
                }
            }
            /*End Private*/
        /*End Global Functions*/

        /*Start Init functions*/
        /*End Init functions*/
    }
})(jQuery);