(function($) {
    $.rand = function(arg) {
        if ($.isArray(arg)) {
            return arg[$.rand(arg.length)];
        } else if (typeof arg === "number") {
            return Math.floor(Math.random() * arg);
        } else {
            return 4;  // chosen by fair dice roll
        }
    };
})(jQuery);
function rand(end){
	var final_answer = 0;
	var rand=Math.floor(Math.random()*end);
	final_answer = rand;
	return final_answer;
}
function panel(what,panel_error){
	//$(".xfer_content li, .xfer_content span").removeClass('caution');
	var people = ['Nur Duygun','Landon Lung','Brian Coyle','Tom Kiefer','Joseph Balint','Auriga Martin'];	
	var users = ['user1','user2','user3','user4','user5','user6','user7','user8','user9','user10','user11','user12','user13','user14','user15','user16','user17','user18','user19','user20'];	
	if(panel_error!=true){
		$(".checks").each(function(index, elem){
			var result_name = ($("#" + $(elem).attr('id')).is(':checked'));
			if(result_name){
				if(!$('#' + what +'_'+$(elem).attr('id')+'_row').length > 0 ){
					$("#" + what).find('.results_box_message').html('<h3>'+$.rand(people)+' (username: '+$.rand(users)+')</h3>');
					$("#" + what).find('.results_box').append('<div class="result_row" id="'+what+'_'+$(elem).attr('id')+'_row">'+$(elem).val()+': '+rand(1000)+' items</div>');			
				}else{
					$('#' + what +'_'+$(elem).attr('id')+'_row').remove();
					$("#" + what).find('.results_box_message').html('<h3>'+$.rand(people)+' (username: '+$.rand(users)+')</h3>');
					$("#" + what).find('.results_box').append('<div class="result_row" id="'+what+'_'+$(elem).attr('id')+'_row">'+$(elem).val()+': '+rand(1000)+' items</div>');
				}
			}
		});
	}
}
/************************************************************
Start Overlay Script    
************************************************************/
jQuery(document).ready(function () {
    if (navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod') {
        jQuery("#modal_bg").css("top", jQuery(window).scrollTop());
    };
    if (typeof (window['simpleOverlay']) == 'undefined')
        simpleOverlay = new overlay();
});
function overlay() {
    this.start = function () {
        var overlay_defaults = {}
        return set_defaults(overlay_defaults);
    }
    this.start_with_options = function (overlay_defaults) {
        return set_defaults(overlay_defaults);
    }
    this.close = function (e) {
        $("#" + e).fadeOut();
        $('#modal_bg').hide();
    }
	this.show_image = function (e, title, image_src) {
		//alert('width = ' + width + ' height = ' + height);
		//$("#overlay_image").html('<img src="'+image_src+'" alt="" />');	
		
		alert('height: ' + $("#overlay_image").find("img").height() + ' width:  ' +  $("#overlay_image").find("img").width());
		
		var width = $("#overlay_image").find("img").width(),
			height = $("#overlay_image").find("img").height();
		
		if ($("#modal_bg").length > 0) {
            $('#modal_bg').remove();
            $('.overlay_holder').hide();
            $(".error_type").each(function () {
                $(this).removeAttr("style");
            });
            $(".overlay_master_content").addClass("overlay_content").show();
            $(".success_message").removeClass("overlay_content").hide();
        }
        var myValues = $('body').width();
        var myWidth = (Number(myValues) - Number(width));
        var myNum = myWidth / 2;
        var myValuesHeight = $(window).height();
       	var myHeight = (Number(myValuesHeight) - Number(height));
        var myNumHeight = myHeight / 2;
        if ($("#overlay_bar").length > 0) {
            $("#overlay_bar").remove();
            var bar_title;
            (title != "" || title != undefined || title != null) ? bar_title = '<h5>' + title + '</h5>' : bar_title = '';
            $("<div/>", {
                id: "overlay_bar",
                html: bar_title + '<a href="#nogo" class="overlay_close"><img src="images/btn_close_22x22_black.png" alt=""/></a>'
            }).prependTo("#" + e);
        } else {
            $("<div/>", {
                id: "overlay_bar",
                html: '<a href="#nogo" class="overlay_close"><img src="images/btn_close_22x22_black.png" alt=""/></a>'
            }).prependTo("#" + e);
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
        $(".overlay_close").click(function () {
            $(".main_overlay").fadeOut();
            $("#" + e).fadeOut();
            $('#modal_bg').hide();
        })
        $('#modal_bg').click(function () {
            $(".main_overlay").fadeOut();
            $("#" + e).fadeOut();
            $('#modal_bg').hide();
        })
        $("#" + e).hide().fadeTo("slow", 1).show().css({ 'left': myNum, 'width': width });
        $("#" + e).css('top', myNumHeight + $(window).scrollTop());	
        $("#" + e).addClass('main_overlay');
		
	}
    this.show = function (e, width, height, title, center, content, rounded) {
        if ($("#modal_bg").length > 0) {
            $('#modal_bg').remove();
            $('.overlay_holder').hide();
            $(".error_type").each(function () {
                $(this).removeAttr("style");
            });
            $(".overlay_master_content").addClass("overlay_content").show();
            $(".success_message").removeClass("overlay_content").hide();
        }
        var myValues = $('body').width();
        var myWidth = (Number(myValues) - Number(width));
        var myNum = myWidth / 2;
        if (center == true) {
            var myValuesHeight = $(window).height();
            var myHeight = (Number(myValuesHeight) - Number(height));
            var myNumHeight = myHeight / 2;
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
        if (navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod') {
            $("#modal_bg").css("top", $(window).scrollTop());
        };
        if ($("#overlay_bar").length > 0) {
            $("#overlay_bar").remove();
            var bar_title;
            (title != "" || title != undefined || title != null) ? bar_title = '<h5>' + title + '</h5>' : bar_title = '';
            $("<div/>", {
                id: "overlay_bar",
                html: bar_title + '<a href="#nogo" class="overlay_close"><img src="images/btn_close_22x22_black.png" alt=""/></a>'
            }).prependTo("#" + e);
        } else {
            $("<div/>", {
                id: "overlay_bar",
                html: '<a href="#nogo" class="overlay_close"><img src="images/btn_close_22x22_black.png" alt=""/></a>'
            }).prependTo("#" + e);
        }
        ($("#overlay_content").length <= 0) ? $('<div id="overlay_content">&nbsp;</div>').insertAfter('#overlay_bar') : $("#overlay_content").html('');
        $(".overlay_close").click(function () {
            $(".main_overlay").fadeOut();
            $("#" + e).fadeOut();
            $('#modal_bg').hide();
        })
        $('#modal_bg').click(function () {
            $(".main_overlay").fadeOut();
            $("#" + e).fadeOut();
            $('#modal_bg').hide();
        })
        $("#" + e).hide().fadeTo("slow", 1).show().css({ 'left': myNum, 'width': width });
        (center == true) ? $("#" + e).css('top', myNumHeight + $(window).scrollTop()) : $("#" + e).css('top', 25 + $(window).scrollTop());
        if (rounded != false) {
            $("#" + e).css({ '-moz-border-radius': rounded, '-webkit-border-radius': rounded, 'border-radius': rounded, '-khtml-border-radius': rounded });
            $("#" + e).css({ '-moz-box-shadow': '5px 5px 5px #666666', '-webkit-box-shadow': '5px 5px 5px #666666', 'box-shadow': '5px 5px 5px #666666' });
        }	
        if (content != 'default') {
            $.ajax({
                url: content,
                success: function (data) {
                    $('#overlay_content').html(data);
                }
            });
        }
        $("#" + e).addClass('main_overlay');
    }
    var set_defaults = function (overlay_defaults) {
        var master_overlay_debug = overlay_defaults.debug == undefined ? false : overlay_defaults.debug;
        var master_overlay_width = overlay_defaults.width == undefined ? '500' : overlay_defaults.width;
        var master_overlay_height = overlay_defaults.height == undefined ? '400' : overlay_defaults.height;
        var master_overlay_element = overlay_defaults.element == undefined ? "overlay" : overlay_defaults.element;
        var master_overlay_class = overlay_defaults.overlay_class == undefined ? ".overlay" : overlay_defaults.overlay_class;
        var master_overlay_how = overlay_defaults.how == undefined ? "fade" : overlay_defaults.how;
        var master_overlay_body_close = overlay_defaults.body_close == undefined ? true : overlay_defaults.body_close;
        var master_top = overlay_defaults.top == undefined ? 30 : overlay_defaults.top;
        var master_center = overlay_defaults.center == undefined ? false : overlay_defaults.center;
        var master_fade_amount = overlay_defaults.fade_amount == undefined ? '0.20' : overlay_defaults.fade_amount;
        var master_fade_speed = overlay_defaults.fade_speed == undefined ? 'fast' : overlay_defaults.fade_amount;
        var master_overlay_header = overlay_defaults.overlay_header == undefined ? false : overlay_defaults.overlay_header;
        var master_overlay_header_content = overlay_defaults.overlay_header_content == undefined ? 'test' : overlay_defaults.overlay_header_content;
        var master_overlay_auto_scroll = overlay_defaults.auto_scroll == undefined ? true : overlay_defaults.auto_scroll;
        var master_overlay_content = overlay_defaults.content == undefined ? 'default' : overlay_defaults.content;
        var master_overlay_rounded = overlay_defaults.rounded == undefined ? false : overlay_defaults.rounded;
        var master_overlay_type = overlay_defaults.type == undefined ? false : overlay_defaults.type;
				
        var watcher = function () {
            $(master_overlay_class).each(function () {
                $(this).click(function () {
                    master_overlay_element = $(this).attr('lang');
                    if(master_overlay_type == 'image'){						
						$("#overlay_image").html('<img src="'+$(this).find('img').attr('src')+'" alt="" />');	
						show_image($(this).attr('lang'), $(this).attr('title'), $(this).find('img').attr('src'));
					}else{
						show_certain($(this).attr('lang'), $(this).attr('title'));	
					}
                })
            });
            $(".overlay_close").click(function () {
                $(".main_overlay").fadeOut();
                close();
            })
        }
        var resize = function () {
            $(window).resize(function () {
                reposition();
            })
        }
        var scroll = function () {
            $(window).scroll(function () {
                reposition();
            })
        }
        var reposition = function () {
            $("#modal_bg").css({'width': $(window).width() , 'height': $(window).height()});
            var myValues = $('body').width();
            var myWidth = myValues - master_overlay_width;
            var myNum = myWidth / 2;
            $(".overlay_close").click(function () {
                $(".main_overlay").fadeOut();
                close();
            })
            if (navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod') {
                $("#modal_bg").css("top", $(window).scrollTop());
            };
            if (master_overlay_body_close == true) {
                $('#modal_bg').click(function () {
                    $(".main_overlay").fadeOut();
                    close();
                })
            }
            if (master_center == true) {
                var myValuesHeight = $(window).height();
                var myHeight = (Number(myValuesHeight) - Number(master_overlay_height));
                var myNumHeight = myHeight / 2;
            }
            if (master_overlay_how == 'fade') {
                $("#" + master_overlay_element).css('left', myNum);
                if (master_center == true) {
                    $("#" + master_overlay_element).css('top', myNumHeight + $(window).scrollTop());
                } else {
                    $("#" + master_overlay_element).css('top', master_top + $(window).scrollTop());
                }
            } else if (master_overlay_how == 'tween') {
                if (master_center == true) {
                    var repo_top = (myNumHeight + $(window).scrollTop());
                } else {
                    var repo_top = (master_top + $(window).scrollTop());
                }
                $("#" + master_overlay_element).animate({
                    left: myNum,
                    top: repo_top
                }, 150);
            }
        }
        var show_certain = function (e, title) {
            simpleOverlay.show(e, master_overlay_width, master_overlay_height, title, master_center, master_overlay_content, master_overlay_rounded);
        }
        var show_image = function (e, title, image_src, width, height) {
            simpleOverlay.show_image(e, title, image_src, width, height);
        }
        var close = function () {
            if (master_overlay_debug == true) { alert('closing!'); }
            if (master_overlay_how == 'fade') {
                if (master_overlay_debug == true) { alert('fade out!'); }
                $("#" + master_overlay_element).fadeOut();
            } else if (master_overlay_how == 'tween') {
                if (master_overlay_debug == true) { alert('tween!'); }
                $("#" + master_overlay_element).fadeOut();
            }
            $('#modal_bg').hide();
        }
        var close_certain = function (e) {
            if (master_overlay_debug == true) { alert('closing!'); }
            if (master_overlay_how == 'fade') {
                if (master_overlay_debug == true) { alert('fade out!'); }
                $("#" + e).fadeOut();
            } else if (master_overlay_how == 'tween') {
                if (master_overlay_debug == true) { alert('tween!'); }
                $("#" + e).fadeOut();
            }
            $('#modal_bg').hide();
        }
        watcher();
        resize();
        if (master_overlay_auto_scroll == true) {
            scroll();
        }
    }
}
/************************************************************
End Overlay Script    
************************************************************/
$(document).ready(function(){
	$('#edit').click(function(){
		//alert($(this).val());
		if ($(this).val()=="edit"){
			$(this).val('save');
			$('.uploader').show();
			$('.remove').show();
		}else{
			$(this).val('edit');
			$('.uploader').hide();
			$('.remove').hide();
		}
	});
	$('.remove a').click(function(){
		$(this).parents("td").next().find('img').attr('src','images/na.jpg');
		$(this).parents(".upload_box").find('input').val('');
	});
	$('.upload').change(function(){
		var loc;
		if($.browser.msie){
			loc = 'file:///' + $(this).val();
		}else{
			loc = 'images/' + $(this).val();
		}		
		if($(this).parents("td").next().find('img').length > 0){
			$(this).parents("td").next().find('img').attr('src',loc);
		}else{
			$(this).parents("td").next().html('<img src="'+loc+'" alt="" />')
		}		
	});	
	$('.results_box').html('');
	$('.xfer_content').find("input").val('');
	$('.results').hide();
	$('.xfer_header').find("input:checkbox").removeAttr("checked");
	
	$("#submit").click(function(){
		var answer = confirm("Are you sure you want to Transfer Account History?");
		if(answer){
		
		}
	});
	$('.xfer_content').find("input").blur(function(){
		var result_id = (($(this).parent().attr('id')) + "_results");
		$("#"+ result_id).show();
	});	
	$(".xfer_header").find("input").each(function(index, el){	
		$(el).click(function(){
			if($(el).is(':checked')){
				$(".xfer_content_panel").each(function(index, elem){
					if($(elem).find("input").val() != '' || $(elem).find("input").val() != 0){
						panel($(elem).attr('id'));
					}else{
					
					}
				});	
			}else{
				$(".xfer_content_panel").each(function(index, elem){
					$('#' + $(elem).attr('id') +'_'+$(el).attr('id')+'_row').remove();					
				});	
			}	
		});		
	});	
	$('.xfer_content').find("input.numbers").keyup(function(){
		var panel_error = false;
		$(this).parent().removeClass('caution');
		if(isNaN($(this).val())){
			$("#submit").attr("disabled", "disabled");
			$(this).parent().addClass('caution');
			$(this).parent().parent().find('.results_box_message').html('<span class="caution">Please enter only numbers.</span>');
			$(this).parent().parent().find('.results_box').html('');
			panel_error = true;	
		}else if($(this).val() == '0'){
			$("#submit").attr("disabled", "disabled");
			$(this).parent().addClass('caution');
			$(this).parent().parent().find('.results_box_message').html('<span class="caution">Please enter only numbers that are greater than 0.</span>');
			$(this).parent().parent().find('.results_box').html('');
			panel_error = true;	
		}else if($(this).val() == ''){
			$("#submit").attr("disabled", "disabled");
			$(this).parent().addClass('caution');
			$(this).parent().parent().find('.results_box_message').html('<span class="caution">Field cannot be blank.</span>');
			$(this).parent().parent().find('.results_box').html('');
			panel_error = true;	
		}else{
			$("#submit").removeAttr("disabled");
			$(this).parent().parent().find('.results_box_message').html('');
			panel_error = false;
		}
		panel($(this).parent().parent().attr('id'),panel_error);
	});
});