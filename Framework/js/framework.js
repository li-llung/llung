(function( $ ){
jQuery(document).ready(function()
{
	ldc=new framework();	
	ldc.init();
});
function framework()
{         
	/*Start Global Variables*/	
	
	/*End Global Variables*/
		
	/*Start Global Functions*/
		/*Start Public*/	
		this.close = function (e) {
			$("#" + e).fadeOut();
			$('#modal_bg').hide();
		}
		this.show = function (e, src, width, height, title, center, content, rounded, type) {
			if(type=="image"){
				if ($("#overlay_content").length > 0) {
					$("#overlay_content").remove();
				}
			}		
			if ($("#modal_bg").length > 0) {
				$('#modal_bg').remove();
				$('.overlay_holder').hide();
				$(".overlay_master_content").addClass("overlay_content").show();
			}
			var overlay_left = (((Number($('body').width()) - Number(width)) / 2) - 30);
			var overlay_top = (((Number($(window).height()) - Number(height)) / 2) - 30);
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
			}
			if(type=="image"){
				$("<div/>", {
					id: "overlay_bar",
					html: '<a href="#nogo" class="overlay_image_close"><img src="images/btn_close_22x22_black.png" alt=""/></a>'
				}).prependTo("#" + e);
				$('<div id="overlay_content" class="overlay_content"><img src="'+src+'" width="'+width+'" alt="" /></div>').insertAfter('#overlay_bar');
				$(".overlay_image_close, #modal_bg").click(function () {
					$(".main_overlay").fadeOut();
					$("#" + e).fadeOut();
					$('#modal_bg').hide();
				});
				$("#" + e).hide().fadeTo("slow", 1).show().css({ 'left': overlay_left, 'width': (Number(width) + 60) });
				$("#" + e).css('top', overlay_top + $(window).scrollTop());
			}else{
				$("<div/>", {
					id: "overlay_bar",
					html: '<a href="#nogo" class="overlay_close"><img src="images/btn_close_22x22_black.png" alt=""/></a>'
				}).prependTo("#" + e);
				//($("#overlay_content").length <= 0) ? $('<div id="overlay_content">&nbsp;</div>').insertAfter('#overlay_bar') : $("#overlay_content").html('');
				($("#overlay_content").length > 0) ? $("#overlay_content").insertAfter('#overlay_bar') : $("#overlay_content").html('');
				$(".overlay_close, #modal_bg").click(function () {
					$(".main_overlay").fadeOut();
					$("#" + e).fadeOut();
					$('#modal_bg').hide();
				});
				$("#" + e).hide().fadeTo("slow", 1).show().css({ 'left': overlay_left, 'width': width });
				(center == true) ? $("#" + e).css('top', overlay_top + $(window).scrollTop()) : $("#" + e).css('top', 25 + $(window).scrollTop());
			}
			if (rounded != false) {
				$("#" + e).css({ '-moz-border-radius': rounded, '-webkit-border-radius': rounded, 'border-radius': rounded, '-khtml-border-radius': rounded });
				$("#" + e).css({ '-moz-box-shadow': '5px 5px 5px #666666', '-webkit-box-shadow': '5px 5px 5px #666666', 'box-shadow': '5px 5px 5px #666666' });
			}
			if(type!="image" && content != 'default') {
				$.ajax({
					url: content,
					success: function (data) {
						$('#overlay_content').html(data);
					}
				});
			}
			$("#" + e).addClass('main_overlay');
		}
		this.overlay = function(options){
			var od = options.core.overlay;		
			var set_defaults = function (od) {
				var config = {
					master_overlay_debug:          od.debug == undefined ? false : od.debug,
				    master_overlay_width:          od.width == undefined ? '700' : od.width,
				    master_overlay_height:         od.height == undefined ? '500' : od.height,
				    master_overlay_element:        od.element == undefined ? "overlay" : od.element,
				    master_overlay_class:          od.overlay_class == undefined ? ".overlay" : od.overlay_class,
				    master_overlay_how:            od.how == undefined ? "fade" : od.how,
				    master_overlay_body_close:     od.body_close == undefined ? true : od.body_close,
				    master_top:                    od.top == undefined ? 30 : od.top,
				    master_center:                 od.center == undefined ? true : od.center,
				    master_fade_amount:            od.fade_amount == undefined ? '0.20' : od.fade_amount,
				    master_fade_speed:             od.fade_speed == undefined ? 'fast' : od.fade_amount,
				    master_overlay_header:         od.overlay_header == undefined ? false : od.overlay_header,
				    master_overlay_header_content: od.overlay_header_content == undefined ? 'test' : od.overlay_header_content,
				    master_overlay_auto_scroll:    od.auto_scroll == undefined ? true : od.auto_scroll,
				    master_overlay_content:        od.content == undefined ? 'default' : od.content,
				    master_overlay_rounded:        od.rounded == undefined ? false : od.rounded,
				    master_overlay_type:           od.type == undefined ? 'html' : od.type,
				    master_overlay_src:            od.src == undefined ? '' : od.src	
				}				
				var watcher = function () {
					$(config.master_overlay_class).each(function () {
						$(this).click(function () {
							config.master_overlay_element = $(this).attr('lang');
							if(config.master_overlay_type =="image"){
								config.master_overlay_src  = $(this).find('img').attr('src')
								ldc.show(config.master_overlay_element, config.master_overlay_src, $(this).find('img').attr('width'), $(this).find('img').attr('height'), $(this).attr('title'), config.master_center, config.master_overlay_content, config.master_overlay_rounded, 'image');	
							}else{				
								ldc.show(config.master_overlay_element, config.master_overlay_src, config.master_overlay_width, config.master_overlay_height, $(this).attr('title'), config.master_center, config.master_overlay_content, config.master_overlay_rounded, 'html');					
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
					var overlay_left = (((Number($('body').width()) - Number(config.master_overlay_width)) / 2));
					$(".overlay_close").click(function () {
						$(".main_overlay").fadeOut();
						close();
					})
					if (navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod') {
						$("#modal_bg").css("top", $(window).scrollTop());
					};
					if (config.master_overlay_body_close == true) {
						$('#modal_bg').click(function () {
							$(".main_overlay").fadeOut();
							close();
						})
					}
					if (config.master_center == true) {
			   			var overlay_top = (((Number($(window).height()) - Number(config.master_overlay_height)) / 2));
					}
					if (config.master_overlay_how == 'fade') {
						$("#" + config.master_overlay_element).css('left', overlay_left);
						if (config.master_center == true) {
							$("#" + config.master_overlay_element).css('top', overlay_top + $(window).scrollTop());
						} else {
							$("#" + config.master_overlay_element).css('top', config.master_top + $(window).scrollTop());
						}
					} else if (config.master_overlay_how == 'tween') {
						if (config.master_center == true) {
							var repo_top = (overlay_top + $(window).scrollTop());
						} else {
							var repo_top = (config.master_top + $(window).scrollTop());
						}
						$("#" + config.master_overlay_element).animate({
							left: overlay_left,
							top: repo_top
						}, 150);
					}
				}
				var close = function () {
					$("#" + config.master_overlay_element).fadeOut();
					$('#modal_bg').hide();
				}
				var close_certain = function (e) {
					$("#" + e).fadeOut();
					$('#modal_bg').hide();
				}
				watcher();
				resize();
				if (config.master_overlay_auto_scroll == true) {
					scroll();
				}
			}			
			set_defaults(od);
		}
		/*End Public*/
		/*Start Private*/
		/*End Private*/
	/*End Global Functions*/
	
	/*Start Init functions*/  
    this.init = function(options){
		if(options)
		{
			var widget_count = 0,
			 	core_count = 0,
			 	var_count = 0;
			for (j in options.widgets){
				widget_count += 1;
			}
			for (k in options.core){
				core_count += 1;
				this[k](options);
			}
			for (l in options.vars){
				var_count += 1;
			}
			//alert(widget_count + ' widgets, ' + core_count + ' core modules, ' + var_count + ' server variables found');
		}else{
			//alert('defaults to be used');	
		}
    } 
	/*End Init functions*/
}
})( jQuery );