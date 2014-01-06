/************************************************************

* ========================================================== */
;(function ( $, window, document, undefined )
{
	var pluginName = "zoverlay",
		version = "1.0",
		trigger = ".overlay",	
        counter = 1,	
        flip = false,
        slider_interval,
		me,
		add = {
			shadow: function (options)
			{
				if(options.shadow_size !== false && options.shadow_color !== false){
					$('.' + options.class_holder).css({ '-moz-box-shadow': '' + options.shadow_size + ' ' + options.shadow_color + '', '-webkit-box-shadow': '' + options.shadow_size + ' ' + options.shadow_color + '', 'box-shadow': '' + options.shadow_size + ' ' + options.shadow_color + '' });
				}
			},
			rounded: function (options)
			{
				if(options.rounded !== false){
					$('.' + options.class_holder).css({ '-moz-border-radius': options.rounded, '-webkit-border-radius': options.rounded, 'border-radius': options.rounded, '-khtml-border-radius': options.rounded });
				}
			}
		},
		build = {		
			bg: function(overlay, elements, options){
				if ($('#' + options.class_bg).length > 0)
				{
					$('#' + options.class_bg).remove();
				}
				$('<div/>', {
					id: options.class_bg,
					'class': options.class_bg + " " + options.class_spinner
				}).appendTo("body");
				$('#' + options.class_bg).fadeTo('fast', '0.60');
			},
			gallery: function(overlay, element, options){
				zem.debug('super gallery');
				var slide_number = overlay.attr('id').split('_')[2],
					src = overlay.find('img').attr('src'),
                    image_id = overlay.find('img').attr('id'),
                    width = $('#image_' + image_id).width(),
                    height = $('#image_' + image_id).height(),
				    total_width = width,
				    total_height = height,
				    overlay_top = (((Number($(window).height()) - Number(height)) / 2)),
				    overlay_left = (((Number($('body').width()) - Number(width)) / 2)),
				    slider_width = 0,
	                slide_offset = 0,
	                slide_offset_top = 0;
				var slide_items = $("[data-gallery^="+options.gallery+"]").find('img');
                var o = options;
				var gallery = $(".has_gallery");
				var isFirst = overlay.hasClass('isFirst');
				var isLast = overlay.hasClass('isLast');
				zem.debug(slide_number);
                $("<div/>", {
                    'class': options.class_content
                }).appendTo("#" + options.class_overlay);
                $("<div/>", {
                    id: "slide_holder_" + counter,
                    'class': "slide_holder"
                }).appendTo($("#" + options.class_overlay).find('.' + options.class_content)).wrap('<div class="slider" style="width: '+width+'px;height: '+height+'px;"></div>');
				slide_items.each(function(index){
					var slide_src = $(this).attr('src'),
	                    slide_image_id = $(this).attr('id'),
	                    slide_width = $('#image_' + slide_image_id).width(),
	                    slide_height = $('#image_' + slide_image_id).height();
					$('<div class="slide" style="height: '+slide_height+'px;width: '+slide_width+'px;"><img src="' + slide_src + '" alt="' + $(this).attr('title') + '" id="slide_'+slide_image_id+'" /></div>').appendTo($("#" + options.class_overlay).find('.slide_holder'));
					slider_width += slide_width;
				});
                var slide_count = $("#" + options.class_overlay).find('.slide').length,
                    holder = '#slide_holder_' + counter,
                    nav =  '#slide_nav_' + counter;
	            $('#' + options.class_overlay).find('.slide').each(function(index){
	            	if((index + 1) < slide_number){
	            		slide_offset += $(this).width();
	            		slide_offset_top += $(this).height();
	            	}
	            });
                if(options.slide_direction === "horizontal"){
                    $("#" + options.class_overlay).find('.slide_holder').width(slide_count * slider_width);	
                }
                $("#" + options.class_overlay).find('.slide').appendTo(holder);
                $("<div/>", {
                    id: "slide_nav_" + counter,
                    'class': "slide_nav"
                }).appendTo("#" + options.class_overlay);
                for(var i=0;i<slide_count;i++){
                    $("<a/>", {
                        href: 'javascript:void(0);',
                        'class': "slide_nav_item",
                        text: (i + 1)
                    }).appendTo(nav);
                }
				if(options.gallery !== false){
					$("#" + options.class_overlay).append('<a href="javascript: void(0)" class="prev"></a><a href="javascript: void(0)" class="next"></a>');
				}
                $(nav).find('.slide_nav_item').first().addClass('slide_nav_anchor');
				$("#" + options.class_overlay).on('click', '.slide_nav_item', function ()
				{
					$('.' + options.class_next).hide();
					$('.' + options.class_prev).hide();
		            actions.jump_to($(this), "#" + options.class_overlay, options, width, height, image_id);
		            actions.content_anchor($(this), "#" + options.class_overlay, options);
		        });
				$("#" + options.class_overlay).on('click', '.' + options.class_next, function ()
				{
					$('.' + options.class_next).hide();
					actions.next_slide(element, options); 
				});
				$("#" + options.class_overlay).on('click', '.' + options.class_prev, function ()
				{
					$('.' + options.class_prev).hide();
					actions.prev_slide(element, options); 
				});
				if(isFirst){
					gallery.find('.prev').hide();	
				}				
				if(isLast){
					gallery.find('.next').hide();	
				}
				/*if (width >= ($(document).width() - 100))
				{
					total_width = (Number($('body').width()) - 100);
					total_height = 'auto';
					overlay_top = 50;
				} else if (height >= ($(window).height() - 100))
				{
					overlay_top = 50;
					total_width = 'auto';
				}*/			
				if (options.title !== "")
				{
					$('<div class="'+options.class_caption+'"><h1>' + options.title + '</h1></div>').appendTo('.' + options.class_content);
					$('.' + options.class_caption).fadeTo("slow", 0.60);
				}	
                if (options.slide_direction === 'horizontal') {
					$("#" + options.class_overlay).find('.slide_holder').css('left', '-' + slide_offset + 'px');
				}else{
					$("#" + options.class_overlay).find('.slide_holder').css('top', '-' + slide_offset_top + 'px');
				}
				actions.content_anchor($("#" + options.class_overlay).find('.slide_nav_item').eq(slide_number-1), "#" + options.class_overlay, options);
				actions.show(overlay_top, overlay_left, total_width, total_height, options, element);
                counter+=1;
			},
			overlay: function(overlay, elements, options){
				if ($('#' + options.class_frame).length)
				{
					$('#' + options.class_frame).remove();
				}
				$('<div/>', {
					id: options.class_frame,
					'class': options.class_frame
				}).appendTo('body');
				var i = 1;
				if ($('.' + options.class_overlay).find("img").length)
				{
					$('.' + options.class_overlay).each(function ()
					{
						$(this).find("img").attr('id', 'od_' + i).clone().appendTo('#' + options.class_frame).attr('id', 'image_od_' + i).attr('class', '');
						i++;
					});
				}
				build.bg(overlay, elements, options);
				zem.debug(options);
				zem.debug(options.type);
				zem.debug(options.gallery);

				if ($('#' + options.class_overlay).length)
				{
					$('#' + options.class_overlay).remove();
				}
				if ($('#' + options.class_bar).length)
				{
					$('#' + options.class_bar).remove();
				}

				var overlay_padding = overlay.css('padding'),
                    //overlay_height = overlay.height(),
                    //overlay_width = overlay.width(),
                    overlay_height = options.height,
                    overlay_width = options.width,
                    content_html = '',
                    has_gallery = (options.gallery !== false) ? 'has_gallery': 'no_gallery';
				$('<div/>', {
					id: options.class_overlay,
					'class': options.class_holder + ' ' + options.data_class + ' ' + has_gallery
				}).prependTo('body');
				var total_width = ((options.width == 'user') ? overlay_width : options.width),
                    total_height = ((options.height == 'user') ? overlay_height : options.height),
                    overlay_top = (((Number($(window).height()) - Number(total_height)) / 2)),
                    overlay_left = (((Number($('body').width()) - Number(total_width)) / 2));
				    total_height = ((options.max_height != 'user' && total_height > options.max_height) ? options.max_height : total_height);
				if (total_width >= ($(document).width() - 50))
				{
					total_width = (Number($('body').width()) - 100);
					total_height = 'auto';
					overlay_top = 50;
				} else if (total_height >= ($(window).height() - 50))
				{
					overlay_top = 50;
				}
				$('<div/>', {
					id: options.class_bar,
					'class': options.class_bar,
					html: options.show_x ? '<a href="javascript: void(0);" class="'+options.class_close+'"></a>' : ''
				}).prependTo("#" + options.class_overlay);
				switch (options.type)
				{
					case 'image':
						if(options.gallery !== false && options.gallery !== ""){
							build.gallery(overlay, elements, options);
						}else{
							$("#" + options.class_overlay).css({ 'width': 'auto', 'height': 'auto' });
							var src = overlay.find('img').attr('src'),
	                            image_id = overlay.find('img').attr('id'),
	                            width = $('#image_' + image_id).width(),
	                            height = $('#image_' + image_id).height();
							    total_width = width;
							    total_height = height;
							    overlay_top = (((Number($(window).height()) - Number(height)) / 2));
							    overlay_left = (((Number($('body').width()) - Number(width)) / 2));
							if (width >= ($(document).width() - 100))
							{
								total_width = (Number($('body').width()) - 100);
								total_height = 'auto';
								overlay_top = 50;
							} else if (height >= ($(window).height() - 100))
							{
								overlay_top = 50;
								total_width = 'auto';
							}
							//$('<div id="#'+options.class_images+'" class="'+options.class_content+'"><img src="' + src + '" width="' + total_width + '" height="' + total_height + '" alt="' + options.title + '" style="height: ' + total_height + '' + ((total_height == "auto") ? '' : 'px') + ';width: ' + total_width + '' + ((total_width == "auto") ? '' : 'px') + ';" alt="" /></div>').insertAfter('#' + options.class_bar);
							$('<div id="#'+options.class_images+'" class="'+options.class_content+'"><img src="' + src + '" alt="' + options.title + '" /></div>').insertAfter('#' + options.class_bar);
							if (options.title !== "")
							{
								$('<div class="'+options.class_caption+'"><h1>' + options.title + '</h1></div>').appendTo('.' + options.class_content);
								$('.' + options.class_caption).fadeTo("slow", 0.60);
							}
							actions.show(overlay_top, overlay_left, total_width, total_height, options, overlay);							
						}
						break;
					case 'json':
						$("#" + options.class_overlay).append('<div class="'+options.class_content+'">' + ((window[options.call].title !== "") ? '<h1>' + window[options.call].title + '</h1>' : '') + '' + window[options.call].content + '</div>');
						actions.show(overlay_top, overlay_left, total_width, total_height, options, overlay);
						break;
					case 'file':
						$.ajax({
							dataType: "text",
							url: overlay.attr('href'),
							success: function (data)
							{
								$('<div id="#'+options.class_content+'" class="'+options.class_content+'">'+((options.title !== "" && options.show_header) ? '<h1>' + options.title + '</h1>' : '')+'' + data + '</div>').insertAfter('#' + options.class_bar);
								actions.show(overlay_top, overlay_left, total_width, total_height, options, overlay);
							}
						});
						break;
					case 'ajax':
						$.ajax({
							type: options.httpMethod,
							url: overlay.attr('href'),
							dataType: "jsonp",
							crossDomain: true,
							success: function (data)
							{
								if (typeof (options.ajax_content) === 'function')
								{
									options.ajax_content(data['data'], options);
								} else if (options.ajax_content)
								{
									window[options.ajax_content](data['data'], options);
								}
								actions.show(overlay_top, overlay_left, total_width, total_height, options, overlay);
							}
						});
						break;
					case 'external':
						var newObj = {},
                            branch = options.params.split(',');
						for (var i = 0; i < branch.length; i++)
						{
							var item = branch[i].split(':');
							newObj[item[0]] = item[1];
						}
						$.ajax({
							type: options.httpMethod,
							url: overlay.attr('href'),
							data: newObj,
							success: function (data)
							{
                                if(options.pass_data){
                                    options.overlay_data = data;
                                }
								if ($("#" + options.class_overlay).find('.' + options.class_content).length)
								{
									$("#" + options.class_overlay).find('.' + options.class_content).remove();
								}
								$("#" + options.class_overlay).append('<div class="'+options.class_content+'">' + data + '</div>');
								actions.show(overlay_top, overlay_left, total_width, total_height, options, overlay);
							}
						});
						break;
					default:
						$("#" + options.class_overlay).append('<div class="'+options.class_content+'">' + ((options.title !== "" && options.show_header) ? '<h1>' + options.title + '</h1>' : '') + '' + '</div>');
                        $('#' + options.element).clone(true, true).appendTo('.'+options.class_content).clone().appendTo('body');
                        $('.' + options.class_content).find('.hidden').show().css('position', 'relative').css('margin','0');
						if (total_height < options.max_height)
						{
							total_height = 'auto';
						}
						actions.show(overlay_top, overlay_left, total_width, total_height, options, overlay);
				}
				if(options.rounded !== false){
					add.rounded(options);
				}
				if(options.shadow_size !== false && options.shadow_color !== false){
					add.shadow(options);
				}
				$(document).on('keyup', function (e) {
		            if (e.keyCode === 27) { 
		               actions.dismiss(overlay, options); 
		            }
		        });		
				$(window).resize(function ()
				{
					actions.reposition(options);
				});
				if (options.sticky)
				{
					$(window).scroll(function ()
					{
						actions.reposition(options);
					});
				} else
				{
					//actions.reposition_bg(options);
				}
			}
		},
		actions = {
			dismiss: function(elements, options){
				$('#' + options.class_overlay).fadeOut();
				$('#' + options.class_bg).hide();
			    $("body").trigger("close_overlay");
			},
			show: function(overlay_top, overlay_left, total_width, total_height, options, element){
				var outerOverlay = {
					paddingHeight: parseInt($('.' + options.class_content).css('padding-top')) + parseInt($('.' + options.class_content).css('padding-bottom')),
					paddingWidth: parseInt($('.' + options.class_content).css('padding-left')) + parseInt($('.' + options.class_content).css('padding-right'))
				};
				var finalHeight = parseInt(total_height) + parseInt(outerOverlay.paddingHeight);
				var finalWidth = parseInt(total_width) + parseInt(outerOverlay.paddingWidth);
				if(options.gallery !== false){
						$("#" + options.class_overlay).hide().fadeTo("slow", 1).show().css({ 'left': overlay_left, 'width': finalWidth, 'height': finalHeight });
				}else{
					if(options.height !== 'user'){
						$("#" + options.class_overlay).hide().fadeTo("slow", 1).show().css({ 'left': overlay_left, 'width': finalWidth, 'height': finalHeight, 'min-height': finalHeight, 'min-width': finalWidth });
					}else{
						$("#" + options.class_overlay).hide().fadeTo("slow", 1).show().css({ 'left': overlay_left, 'width': finalWidth, 'min-height': finalHeight, 'min-width': finalWidth });
					}					
				}		
				$("#" + options.class_overlay).css('top', overlay_top + $(window).scrollTop());
				$('.' + options.class_bg).removeClass(options.class_spinner);
    			$("body").trigger("show_overlay");
				if (typeof (callback) === 'function')
				{
					callback(options.overlay_data);
				} else if (options.callback)
				{
					window[options.callback](options.overlay_data);
				}
				if(options.focus_first){
					$("#" + options.class_overlay).find('input').first().trigger('focus');
				}
				if(options.force_scroll){
					$("#" + options.class_overlay).find('.' + options.class_content).css('overflow-y','scroll').css('overflow-x','hidden').height(total_height);
				}
				if(options.slide_start){
					$("#" + options.class_overlay).find(".slide").each(function(index){
	                    $(this).attr('data-slide', (index + 1)).attr('data-set', 1);
	                });
	                $("#" + options.class_overlay).children().clone().appendTo("#" + options.class_overlay).attr('data-set', 2);
					actions.play(element, options);
				}
				actions.reposition(options);
            },
            reposition: function (options) {
				if ($('.' + options.class_holder).length)
				{
					$('.' + options.class_holder).each(function ()
					{
						//$('#' + options.class_bg).css({ 'width': '100%', 'height': document.body.clientHeight });
						var overlay_top = (((Number($(window).height()) - Number($('#' + options.class_overlay).height())) / 2));
						var overlay_left = (((Number($('body').width()) - Number($('#' + options.class_overlay).width())) / 2));
						overlay_top = (overlay_top < 0) ? 50 : overlay_top;
						if(options.gallery !== false){
							$('#' + options.class_overlay).animate({
		                        left: overlay_left,
		                        top: (overlay_top + $(window).scrollTop())
		                    }, options.slide_delay);		                    
						}else{
							$('#' + options.class_overlay).css({ 'left': overlay_left, 'top': overlay_top + $(window).scrollTop() });	
						}
					});
				}
            },
            reposition_bg: function (options) {
				if ($('.' + options.class_holder).length)
				{
					$('#' + options.class_bg).css({
						"top": ($(window).scrollTop()), 
						'left': $(window).scrollLeft(), 
						"height": ($(window).height() + 30), 
						"width": ($(window).width())
					});
				}
            },
			refresh: function(element, options){
				zem.debug('super refresh');
			},
	        up: function (element, options) {
				zem.debug('super up');
	        },
	        down: function (element, options) {
				zem.debug('super down');
	        },
	        forward: function (element, options) {
	        	zem.debug('super forward');
	        },
	        back: function (element, options) {
				zem.debug('super back');
	        },
			begin: function(element, options){
				zem.debug('super begin');
			},
			end: function(element, options){
				zem.debug('super end');
			},
	        move: function (element, options, direction){
	        	zem.debug('super move');
	        	//next slide (up or forward) , previous slide (back or down), beginning , end
	        	switch (direction)
				{
					case 'next':
						if(options.direction === "vertical"){
							zem.debug('upward');
							actions.up(element, options);
						}else{
							zem.debug('forward/next');
							actions.forward(element, options);
						}
						break;
					case 'prev':
						if(options.direction === "vertical"){
							zem.debug('down');
							actions.down(element, options);
						}else{
							zem.debug('back/previous');
							actions.back(element, options);
						}
						break;
					case 'begin':
						zem.debug('go to start');
						actions.begin(element, options);
						break;
					case 'end':
						zem.debug('go to end');
						actions.end(element, options);
						break;
					default:
						zem.debug('default');
				}
	        },
	        move_control: function (element, options){
				zem.debug('move control called');
				zem.debug(element);
	            var selected = $('#' + options.class_overlay).find('.' + options.slide_anchor).last(),
	                next = selected.removeClass('slide_nav_anchor').next(),
	                nav = $('#' + options.class_overlay).find('.slide_nav').last();
	           	zem.debug('moving control and selected = ' + selected.text());
				zem.debug(selected);
				zem.debug(nav);
	            if(selected.is(':last-child')){
	                zem.debug('im slow');
	                nav.find("a").first().addClass('slide_nav_anchor');
	                //nav.find("a").first().attr('data-slide', (Number(selected.attr('data-slide')) + 1));
	                var num_start = Number(selected.attr('data-slide'));
	                nav.find("a").each(function(){
	                    $(this).attr('data-slide', (num_start + 1));
	                    num_start +=1;
	                });
	                //console.log(holder + ' selected = ' + selected.text() + ' total ' + (Number(selected.text()) + 1));
	            }else{
	                next.addClass('slide_nav_anchor');
	                //console.log(holder + ' selected = ' + selected.text() + ' total ' + (Number(selected.text()) + 1));
	                next.attr('data-slide', (Number(selected.attr('data-slide')) + 1));
	            }
	        },
			play: function(element, options){
				var slider_count = 1;
				zem.debug('super play');
				zem.debug(element);
                slider_interval = setInterval(function(){
                    zem.debug('yay im sliding');
                    actions.move_control(element, options);
                    if(slider_count === $(element).find(".slide").length && flip === false){
                        $(element).find('[data-set="1"]').clone().insertAfter($(element).find('.slide').last()).attr('data-set', counter);
                        flip = true;
                    }else{
                        flip = false;
                    }
                    if(options.slide_direction == "horizontal"){
                        //actions.forward(element, options);
                        $(element).width($(element).find(".slide").length * options.width);
                    }else if(options.slide_direction == "vertical"){
                        //actions.down(element, options);
                    }
                    actions.move(element, options, 'next');


                    if(options.loop > 0){
                        if((slider_count+1) === total_slides){
                            actions.stop(element, options);
                        }
                    }
                    slider_count += 1;
                }, options.slide_speed);
			},
			stop: function(element, options){
				zem.debug('super stop');
                clearInterval(slider_interval);
			},
			prev_slide: function(element, options){
				zem.debug('super prev');
				var slide_anchor = Number($(element).index()),
	            	slide_number = Number($('#' + options.class_overlay).find('.' + options.slide_anchor).prev().text()),
	                current_slide = Number($('#' + options.class_overlay).find('.' + options.slide_anchor).prev().text()),
	            	width = ($('#' + options.class_overlay).find('.slide').eq((current_slide - 1)).width()),
	            	height = ($('#' + options.class_overlay).find('.slide').eq((current_slide - 1)).height()),
	            	title = ($('#set_' + options.gallery + '_' + (current_slide)).attr('title')),
	            	animate_left = -((slide_number * $('#slide_od_' + current_slide).width()) - $('#slide_od_' + current_slide).width()),
	                animate_top = -((slide_number * $('#slide_od_' + current_slide).height()) - $('#slide_od_' + current_slide).height()),
	                slide_offset = 0,
	                slide_offset_top = 0;
	            $('#' + options.class_overlay).find('.slide').each(function(index){
	            	if((index + 1) < slide_number){	      
	            		slide_offset += $(this).find('img').width();
	            		slide_offset_top += $(this).find('img').height();
	            	}
	            });
	            if(options.slide_effect == "fade"){
	                $('#' + options.class_overlay).find('.slide').fadeOut();
	                $('#' + options.class_overlay).find('.slide').eq((current_slide - 1)).fadeIn();
	                $('#' + options.class_overlay).find('.slide_holder').css('top', 0);
                    $("#" + options.class_overlay).animate({
                        width: width,
                        height: height
                    }, options.slide_delay, function() {
						actions.reposition(options);
					});
                    $("#" + options.class_overlay).find('.slider').animate({
                        width: width,
                        height: height
                    }, options.slide_delay);
	            }else{
	                if (options.slide_direction === 'horizontal') {
	                    $("#" + options.class_overlay).animate({
	                        width: width,
	                        height: height
	                    }, options.slide_delay, function() {
							actions.reposition(options);
						});
	                    $("#" + options.class_overlay).find('.slider').animate({
	                        width: width,
	                        height: height
	                    }, options.slide_delay);                   
	                    $("#" + options.class_overlay).find('.slide_holder').animate({
	                        left: '-' + slide_offset + 'px'
	                    }, options.slide_delay);
	                } else {
	                    $("#" + options.class_overlay).animate({
	                        width: width,
	                        height: height
	                    }, options.slide_delay, function() {
							actions.reposition(options);
						});
	                    $("#" + options.class_overlay).find('.slider').animate({
	                        width: width,
	                        height: height
	                    }, options.slide_delay);
	                    $("#" + options.class_overlay).find('.slide_holder').animate({
	                        top: '-' + slide_offset_top + 'px'
	                    }, options.slide_delay);	       
	                }
	            }
				if (title !== "")
				{
					$('.'+options.class_caption).find('h1').text(title);
					$('.' + options.class_caption).fadeTo("slow", 0.60);
				}	
		        actions.content_anchor($('#' + options.class_overlay).find('.' + options.slide_anchor).prev('.slide_nav_item'), "#" + options.class_overlay, options);
			},
			next_slide: function(element, options){
				zem.debug('super next');
				var slide_anchor = Number($(element).index()),
	            	slide_number = Number($('#' + options.class_overlay).find('.' + options.slide_anchor).next().text()),
	                current_slide = Number($('#' + options.class_overlay).find('.' + options.slide_anchor).next().text()),
	            	width = ($('#' + options.class_overlay).find('.slide').eq((current_slide - 1)).width()),
	            	height = ($('#' + options.class_overlay).find('.slide').eq((current_slide - 1)).height()),
	            	title = ($('#set_' + options.gallery + '_' + (current_slide)).attr('title')),
	            	animate_left = -((slide_number * $('#slide_od_' + current_slide).width()) - $('#slide_od_' + current_slide).width()),
	                animate_top = -((slide_number * $('#slide_od_' + current_slide).height()) - $('#slide_od_' + current_slide).height()),
	                slide_offset = 0,
	                slide_offset_top = 0;
	            if(options.slide_effect == "fade"){
	                $('#' + options.class_overlay).find('.slide').fadeOut();
	                $('#' + options.class_overlay).find('.slide').eq((current_slide - 1)).fadeIn();
	                $('#' + options.class_overlay).find('.slide_holder').css('top', 0);
                    $("#" + options.class_overlay).animate({
                        width: width,
                        height: height
                    }, options.slide_delay, function() {
						actions.reposition(options);
					});
                    $("#" + options.class_overlay).find('.slider').animate({
                        width: width,
                        height: height
                    }, options.slide_delay);
	            }else{
		            $('#' + options.class_overlay).find('.slide').each(function(index){
		            	if((index + 1) < slide_number){
		            		slide_offset += $(this).find('img').width();
		            		slide_offset_top += $(this).find('img').height();
		            	}
		            });
	                if (options.slide_direction === 'horizontal') {
	                    $(element).find('.slide_holder').animate({
	                        left: animate_left
	                    }, options.slide_delay);
	                    $("#" + options.class_overlay).animate({
	                        width: width,
	                        height: height
	                    }, options.slide_delay, function() {
							actions.reposition(options);
						});
	                    $("#" + options.class_overlay).find('.slider').animate({
	                        width: width,
	                        height: height
	                    }, options.slide_delay);
	                    $("#" + options.class_overlay).find('.slide_holder').animate({
	                        left: '-' + slide_offset
	                    }, options.slide_delay);	            		
	                } else {
	                    $(element).find('.slide_holder').animate({
	                        top: animate_top
	                    }, options.slide_delay);
	                    $("#" + options.class_overlay).animate({
	                        width: width,
	                        height: height
	                    }, options.slide_delay, function() {
							actions.reposition(options);
						});
	                    $("#" + options.class_overlay).find('.slider').animate({
	                        width: width,
	                        height: height
	                    }, options.slide_delay);
	                    $("#" + options.class_overlay).find('.slide_holder').animate({
	                        top: '-' + slide_offset_top
	                    }, options.slide_delay);	       
	                }
	            }
				if (title !== "")
				{
					$('.'+options.class_caption).find('h1').text(title);
					$('.' + options.class_caption).fadeTo("slow", 0.60);
				}	
		        actions.content_anchor($('#' + options.class_overlay).find('.' + options.slide_anchor).next('.slide_nav_item'), "#" + options.class_overlay, options);
			},
			jump_to: function (slider, element, options, slide_width, slide_height, slide_id) {
				zem.debug('super jump');
	            var slide_anchor = Number(slider.index()),
	            	slide_number = Number(slider.text()),
	                current_slide = Number(slider.text()),
	            	width = ($(element).find('.slide').eq((current_slide - 1)).width()),
	            	height = ($(element).find('.slide').eq((current_slide - 1)).height()),
	            	title = ($('#set_' + options.gallery + '_' + (current_slide)).attr('title')),
	            	animate_left = -((slide_number * $('#slide_od_' + current_slide).width()) - $('#slide_od_' + current_slide).width()),
	                animate_top = -((slide_number * $('#slide_od_' + current_slide).height()) - $('#slide_od_' + current_slide).height()),
	                slide_offset = 0,
	                slide_offset_top = 0;
	            $(element).find('.slide').each(function(index){
	            	if((index + 1) < slide_number){
	            		slide_offset += $(this).find('img').width();
	            		slide_offset_top += $(this).find('img').height();
	            	}
	            });
	            if(options.slide_effect == "fade"){
	                $(element).find('.slide').fadeOut();
	                $(element).find('.slide').eq((slide_number-1)).fadeIn();
                    $("#" + options.class_overlay).animate({
                        width: width,
                        height: height
                    }, options.slide_delay, function() {
						actions.reposition(options);
					});
                    $("#" + options.class_overlay).find('.slider').animate({
                        width: width,
                        height: height
                    }, options.slide_delay);
	            }else{
	                if (options.slide_direction === 'horizontal') {
	                    $(element).find('.slide_holder').animate({
	                        left: animate_left
	                    }, options.slide_delay);
	                    $("#" + options.class_overlay).animate({
	                        width: width,
	                        height: height
	                    }, options.slide_delay, function() {
							actions.reposition(options);
						});
	                    $("#" + options.class_overlay).find('.slider').animate({
	                        width: width,
	                        height: height
	                    }, options.slide_delay);
	                    $("#" + options.class_overlay).find('.slide_holder').animate({
	                        left: '-' + slide_offset
	                    }, options.slide_delay);	            		
	                } else {
	                    $(element).find('.slide_holder').animate({
	                        top: animate_top
	                    }, options.slide_delay);
	                    $("#" + options.class_overlay).animate({
	                        width: width,
	                        height: height
	                    }, options.slide_delay, function() {
							actions.reposition(options);
						});
	                    $("#" + options.class_overlay).find('.slider').animate({
	                        width: width,
	                        height: height
	                    }, options.slide_delay);
	                    $("#" + options.class_overlay).find('.slide_holder').animate({
	                        top: '-' + slide_offset_top
	                    }, options.slide_delay);	       
	                }
	            }	
				if (title !== "")
				{
					$('.'+options.class_caption).find('h1').text(title);
					$('.' + options.class_caption).fadeTo("slow", 0.60);
				}	
	        },
	        content_anchor: function (slider, element, options) {
	            slider.parents('.slide_nav').find("a").removeClass(options.slide_anchor);
	            slider.addClass(options.slide_anchor);
                if(!$('#' + options.class_overlay).find('.' + options.slide_anchor).prev('.slide_nav_item').length){
                	$('.' + options.class_prev).hide();
                }else{
                	$('.' + options.class_prev).show();
                }
                if(!$('#' + options.class_overlay).find('.' + options.slide_anchor).next('.slide_nav_item').length){
                	$('.' + options.class_next).hide();
                }else{
                	$('.' + options.class_next).show();
                }
	        }  
		};
	function SuperOverlay ( element, options ) {
		me = this;
		this.defaults = {
			type: 'default', //image , ajax , json , file, external , default
			class_bg: 'modal_bg',
			class_frame: 'overlay_frame',
			class_images: 'overlay_image_content',
			class_overlay: 'overlay',
			class_spinner: 'spinner',
			class_bar: 'overlay_bar',
			class_holder: 'overlay_holder',
			class_content: 'overlay_content',
			class_close: 'overlay_close',
			class_rendered: 'rendered',
			class_caption: 'overlay_caption',
			class_prev: 'prev',
			class_next: 'next',
			title: (($(element).attr('title') === undefined) ? "" : $(element).attr('title')),
			show_header: true,
			sticky: false,
			rounded: false, //'7px'
			shadow_color: false, //'#666666'
			shadow_size: false, //'5px 5px 5px'
			show_x : true,
			escapable: true,
			width: 'user',
			height: 'user',
			max_height: 'user',
			pass_data: false,
			overlay_data: {},
			data_class: 'rendered',
			call: false,
			callback: false,
			ajax_content: false,
			params: {},
			element: false,
			force_scroll: false,
			focus_first: false,
			httpMethod: 'post',
			gallery: false,
            slide_delay: 1000,
            slide_start: false,
            slide_direction: 'horizontal',
            slide_effect: 'tween',
            slide_selector: '.slider',
            slide_anchor: 'slide_nav_anchor',
            slide_speed: 5000,
            slide_controls: true,
            slide_resume: true,
            slide_stop: true,
            slide_loop: 2

		};
		me.element = element;
		me.settings = z.cloneData($.extend( {}, me.defaults, options ));
		me.updateOptions(me.element, me.settings);

	}
	SuperOverlay.prototype = {
		constructor: SuperOverlay,
		testDataAttr: function(element, options, what){
			if(element.data(what) !== undefined){
		        me.settings[what] = element.data(what);
				return element.data(what);
			}else{
				return this.defaults[what]
			}
		},
		updateOptions: function (element, options){
			var x;
			for(x in options) {
				this.testDataAttr (element, options, x);
			}
			me.init(element, options);
		},
        init: function (element, options) {
			$(element).on('click', function ()
			{
				me.show($(this), element, options);	
				return false;
			});	
			if(options.gallery !== false){
				zem.debug('current gallery is: ' + options.gallery);
				if($(document).data(options.gallery)) {
					return true;
				}else{
					var gallery = $("[data-gallery^="+options.gallery+"]");
					gallery.first().addClass('isFirst');
					gallery.last().addClass('isLast');
					var j = 1;
					if (gallery.length)
					{
						gallery.each(function ()
						{
							zem.debug('set_' + options.gallery + '_' + j);
							$(this).attr('id', 'set_' + options.gallery + '_' + j);
							j++;
						});
					}
					$(document).data(options.gallery, true);					
				}
			}
			// mark element as initialized
			// this element has already been initialized
			if($(document).data(options.class_bg)) {
				return true;
			}
			$(document).data(options.class_bg, true);
			$(document).on('click', '.' + options.class_bg, function ()
			{
				me.close(element, options); 
			});
			$(document).on('click', '.' + options.class_close, function ()
			{
				me.close(element, options); 
			});
        },
		show: function(overlay, element, options){
			zem.debug('super proto show');
			build.overlay(overlay, element, options);			
		},
		close: function(element, options){
			zem.debug('super proto close');
			actions.stop(element, options);
			actions.dismiss(element, options);
		},
		reposition: function(){
			zem.debug('super proto reposition');
			actions.reposition();
		},
		refresh: function(){
			zem.debug('super proto refresh');
			actions.refresh();
		},
		gallery: function(){
			zem.debug('super proto gallery');
			build.gallery();
		},
		play: function(){
			zem.debug('super proto play');
			actions.play();
		},
		stop: function(){
			zem.debug('super proto stop');
			actions.stop();
		},
		prev_slide: function(element, options){
			zem.debug('super proto prev');
			actions.prev_slide(element, options);
		},
		next_slide: function(element, options){
			zem.debug('super proto next');
			actions.next_slide(element, options);
		},
		jump_to: function(){
			zem.debug('super proto jump');
			actions.jump_to();
		}    
    }
    $.fn[ pluginName ] = function ( options ) {
	    new SuperOverlay($(this), options);
    };
    // add initialisation
	z.addInitalisation(pluginName, function() {
		zem.debug(pluginName + ' initialized');
		$(trigger).each(function() {
			var $this = $(this);
			// this element has already been initialized
			if($this.data(pluginName)) {
				return true;
			}
			// mark element as initialized
			$this.data(pluginName, true);
			new SuperOverlay($this);
		});
	});
	// register UI module
	z.UIModule({
		module: pluginName,
		events: [],
		init: function() {
			zem.debug('run '+pluginName+' init');
			z.initialize(pluginName);
		}
	});	
})( jQuery, window, document );