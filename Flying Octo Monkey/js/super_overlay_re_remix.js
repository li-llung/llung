/************************************************************

* ========================================================== */
;(function ( $, window, document, undefined )
{
	var pluginName = "zoverlay",
		version = "1.0",
        counter = 1,
		trigger = ".overlay";
	function SuperOverlay ( element, options ) {
		var scope = this,
			doTrigger = false;
		if(options === 'trigger'){
			doTrigger = true;
		}
		this.defaults = {
			type: 'default', //image , ajax , json , file, external , default
			class_bg: '.modal_bg',
			class_frame: '.overlay_frame',
			class_images: '.overlay_image_content',
			class_overlay: '.overlay',
			class_spinner: '.spinner',
			class_bar: '.overlay_bar',
			class_holder: '.overlay_holder',
			class_content: '.overlay_content',
			class_close: '.overlay_close',
			class_rendered: '.rendered',
			class_caption: '.overlay_caption',
			class_prev: '.prev',
			class_next: '.next',
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
            slide_anchor: '.slide_nav_anchor',
            slide_speed: 5000,
            slide_controls: true,
            slide_resume: true,
            slide_stop: true,
            slide_loop: 2
		};
		scope.settings = z.cloneData($.extend( {}, scope.defaults, options ));
		z.updateOptions(element, scope.settings);
		if(doTrigger){				
			this.show(element, scope.settings);				
		}else{
			this.init(element, scope.settings);				
		}
	}
	SuperOverlay.prototype = {
		constructor: SuperOverlay,
        init: function (element, options) {
        	zem.debug(options);
        	var scope = this;
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
			if($(document).data(options.class_bg)) {
				return true;
			}
			$(document).data(options.class_bg, true);
			$(document).on('click', options.class_bg, function ()
			{
				scope.close(element, options); 
			});
			$(document).on('click', options.class_close, function ()
			{
				scope.close(element, options); 
			});
        },
		show: function(element, options){
			zem.debug('super proto show');
			var scope = this;
			zem.debug(options.class_bg);
			scope.bg(element, options);
			if ($(options.class_frame).length)
			{
				$(options.class_frame).remove();
			}
			if ($(options.class_rendered).length)
			{
				$(options.class_rendered).remove();
			}
			if ($(element).find("img").length)
			{
				$('<div/>', {
					id: z.cla(options.class_frame),
					'class': z.cla(options.class_frame)
				}).appendTo('body');
				var i = 1;
				$(options.class_frame).each(function ()
				{
					$(this).find("img").attr('id', 'od_' + i).clone().appendTo(options.class_frame).attr('id', 'image_od_' + i).attr('class', '');
					i++;
				});
			}
			$('<div/>', {
				id: z.cla(options.class_rendered),
				'class': z.cla(options.class_holder) + ' ' + options.data_class + ' ' + has_gallery
			}).prependTo('body');
			if(options.show_x){
				$('<div/>', {
					id: z.cla(options.class_bar),
					'class': z.cla(options.class_bar),
					html: '<a href="javascript: void(0);" class="'+z.cla(options.class_close)+'"></a>'
				}).prependTo(options.class_rendered);
			}
			zem.debug(options.type);
			switch (options.type)
			{
				case 'image':
					if(options.gallery !== false && options.gallery !== ""){
						//build.gallery(element, options);								
						zem.debug('super gallery');
						var slide_number = $(element).attr('id').split('_')[2],
							src = $(element).find('img').attr('src'),
		                    image_id = $(element).find('img').attr('id'),
		                    width = $('#image_' + image_id).width(),
		                    height = $('#image_' + image_id).height(),
						    slider_width = 0,
			                slide_offset = 0,
			                slide_offset_top = 0;
						var slide_items = $("[data-gallery^="+options.gallery+"]").find('img');
		                var o = options;
						var gallery = $(".has_gallery");
						var isFirst = $(element).hasClass('isFirst');
						var isLast = $(element).hasClass('isLast');
						zem.debug(slide_number);
		                $("<div/>", {
		                    'class': z.cla(options.class_content)
		                }).appendTo(options.class_rendered);
		                $("<div/>", {
		                    id: "slide_holder_" + counter,
		                    'class': "slide_holder"
		                }).appendTo(options.class_content).wrap('<div class="slider" style="width: '+width+'px;height: '+height+'px;"></div>');
						slide_items.each(function(index){
							var slide_src = $(this).attr('src'),
			                    slide_image_id = $(this).attr('id'),
			                    slide_width = $('#image_' + slide_image_id).width(),
			                    slide_height = $('#image_' + slide_image_id).height();
							$('<div class="slide" style="height: '+slide_height+'px;width: '+slide_width+'px;"><img src="' + slide_src + '" alt="' + $(this).attr('title') + '" id="slide_'+slide_image_id+'" /></div>').appendTo($(options.class_overlay).find('.slide_holder'));
							slider_width += slide_width;
						});
		                var slide_count = $(options.class_rendered).find('.slide').length,
		                    holder = '#slide_holder_' + counter,
		                    nav =  '#slide_nav_' + counter;
			            $(options.class_rendered).find('.slide').each(function(index){
			            	if((index + 1) < slide_number){
			            		slide_offset += $(this).width();
			            		slide_offset_top += $(this).height();
			            	}
			            });
		                if(options.slide_direction === "horizontal"){
		                    $(options.class_rendered).find('.slide_holder').width(slide_count * slider_width);	
		                }
		                $(options.class_rendered).find('.slide').appendTo(holder);
		                $("<div/>", {
		                    id: "slide_nav_" + counter,
		                    'class': "slide_nav"
		                }).appendTo(holder);
		                for(var i=0;i<slide_count;i++){
		                    $("<a/>", {
		                        href: 'javascript:void(0);',
		                        'class': "slide_nav_item",
		                        text: (i + 1)
		                    }).appendTo(nav);
		                }
						if(options.gallery !== false){
							$(options.class_rendered).append('<a href="javascript: void(0)" class="prev"></a><a href="javascript: void(0)" class="next"></a>');
						}
		                $(nav).find('.slide_nav_item').first().addClass('slide_nav_anchor');
						$(options.class_rendered).on('click', '.slide_nav_item', function ()
						{
							$(options.class_next).hide();
							$(options.class_prev).hide();
				            actions.jump_to($(this), options.class_rendered, options, width, height, image_id);
				            actions.content_anchor($(this), options.class_rendered, options);
				        });
						$(options.class_rendered).on('click', options.class_next, function ()
						{
							$(options.class_next).hide();
							actions.next_slide(element, options); 
						});
						$(options.class_rendered).on('click', options.class_prev, function ()
						{
							$(options.class_prev).hide();
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
							$(options.class_caption).fadeTo("slow", 0.60);
						}	
		                if (options.slide_direction === 'horizontal') {
							$(options.class_overlay).find('.slide_holder').css('left', '-' + slide_offset + 'px');
						}else{
							$(options.class_overlay).find('.slide_holder').css('top', '-' + slide_offset_top + 'px');
						}
						scope.content_anchor($(options.class_overlay).find('.slide_nav_item').eq(slide_number-1), "#" + options.class_overlay, options);
						//scope.show(element, options);
		                counter+=1;
					}else{
						$(options.class_rendered).css({ 'width': 'auto', 'height': 'auto' });
						var src = $(element).find('img').attr('src'),
                            image_id = $(element).find('img').attr('id'),
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
						$('<div id="'+z.cla(options.class_images)+'" class="'+z.cla(options.class_content)+'"><img src="' + src + '" alt="' + options.title + '" /></div>').insertAfter(options.class_bar);
						if (options.title !== "")
						{
							$('<div class="'+z.cla(options.class_caption)+'"><h1>' + options.title + '</h1></div>').appendTo(options.class_content);
							$(options.class_caption).fadeTo("slow", 0.60);
						}
					}
					break;					
				case 'json':
					$(options.class_rendered).append('<div class="'+z.cla(options.class_content)+'">' + ((window[options.call].title !== "") ? '<h1>' + window[options.call].title + '</h1>' : '') + '' + window[options.call].content + '</div>');
					break;
				case 'file':
					$.ajax({
						dataType: "text",
						url: $(element).attr('href'),
						success: function (data)
						{
							$('<div id="'+z.cla(options.class_content)+'" class="'+z.cla(options.class_content)+'">'+((options.title !== "" && options.show_header) ? '<h1>' + options.title + '</h1>' : '')+'' + data + '</div>').insertAfter(options.class_bar);
						}
					});
					break;
				case 'ajax':
					$.ajax({
						type: options.httpMethod,
						url: $(element).attr('href'),
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
							if ($(options.class_rendered).find(options.class_content).length)
							{
								$(options.class_rendered).find(options.class_content).remove();
							}
							$(options.class_rendered).append('<div class="'+z.cla(options.class_content)+'">' + data + '</div>');
						}
					});
					break;
				default:
					$(options.class_rendered).append('<div class="'+z.cla(options.class_content)+'">' + ((options.title !== "" && options.show_header) ? '<h1>' + options.title + '</h1>' : '') + '' + '</div>');
                    $("#" + options.element).clone(true, true).appendTo(options.class_content).clone();
                    $(options.class_content).find('.hidden').show().css('position', 'relative').css('margin','0');
			}
			if(options.rounded !== false){
				scope.rounded(element, options);
			}
			if(options.shadow_size !== false && options.shadow_color !== false){
				scope.shadow(element, options);
			}		
			var has_gallery = (options.gallery !== false) ? 'has_gallery': 'no_gallery',
				total_width = ((options.width == 'user') ? 'auto' : options.width),
                total_height = ((options.height == 'user') ? 'auto' : options.height),
                overlay_top = (((Number($(window).height()) - Number(total_height)) / 2)),
                overlay_left = (((Number($('body').width()) - Number(total_width)) / 2));
			    total_height = ((options.max_height != 'user' && total_height > options.max_height) ? options.max_height : total_height)
			    outerOverlay = {
					paddingHeight: parseInt($(options.class_content).css('padding-top')) + parseInt($(options.class_content).css('padding-bottom')),
					paddingWidth: parseInt($(options.class_content).css('padding-left')) + parseInt($(options.class_content).css('padding-right'))
				},
				finalHeight = parseInt(total_height) + parseInt(outerOverlay.paddingHeight),
				finalWidth = parseInt(total_width) + parseInt(outerOverlay.paddingWidth);
			zem.debug_all(has_gallery,total_width,total_height,overlay_top,overlay_left,outerOverlay.paddingHeight,outerOverlay.paddingWidth);
			if(options.gallery !== false){
					$(options.class_rendered).hide().fadeTo("slow", 1).show().css({ 'left': overlay_left, 'width': finalWidth, 'height': finalHeight });
			}else{
				if(options.height !== 'user'){
					$(options.class_rendered).hide().fadeTo("slow", 1).show().css({ 'left': overlay_left, 'width': finalWidth, 'height': finalHeight, 'min-height': finalHeight, 'min-width': finalWidth });
				}else{
					$(options.class_rendered).hide().fadeTo("slow", 1).show().css({ 'left': overlay_left, 'min-height': finalHeight, 'min-width': finalWidth });
				}					
			}		
			$(options.class_rendered).css('top', overlay_top + $(window).scrollTop());
			$(options.class_bg).removeClass(options.class_spinner);
			$("body").trigger("show_overlay");
			if (typeof (callback) === 'function')
			{
				callback(options.overlay_data);
			} else if (options.callback)
			{
				window[options.callback](options.overlay_data);
			}
			if(options.focus_first){
				$(options.class_rendered).find('input').first().trigger('focus');
			}
			if(options.force_scroll){
				$(options.class_rendered).find(options.class_content).css('overflow-y','scroll').css('overflow-x','hidden').height(total_height);
			}
			if(options.slide_start){
				$(options.class_rendered).find(".slide").each(function(index){
                    $(this).attr('data-slide', (index + 1)).attr('data-set', 1);
                });
                //$(options.class_rendered).children().clone().appendTo(options.class_rendered).attr('data-set', 2);
			}
			scope.reposition(options);
			if (options.sticky)
			{
				$(window).scroll(function ()
				{
					scope.reposition_bg(options);
				});
			}	
		},
		close: function(){
			zem.debug('super proto close');
			$(this.settings['class_rendered']).fadeOut();
			$(this.settings['class_bg']).hide();
			$(window).unbind('scroll');
		    $("body").trigger("close_overlay");
		},
		shadow: function (element, options)
		{
			if(options.shadow_size !== false && options.shadow_color !== false){
				zem.debug('super shadow');
    			zem.effects.shadow($(options.class_rendered), options.shadow_size, options.shadow_color);
			}
		},
		rounded: function (element, options)
		{
			if(options.rounded !== false){					
				zem.debug('super round');
				zem.effects.round($(options.class_rendered), options.rounded);
			}
		},
		bg: function(element, options){			
			zem.debug('super bg');
			if (!$(options.class_bg).length)
			{
				$('<div/>', {
					id: z.cla(options.class_bg),
					'class': z.cla(options.class_bg) + " " + z.cla(options.class_spinner)
				}).appendTo("body");				
			}
			$(options.class_bg).fadeTo('fast', '0.60').css('top', $(window).scrollTop());
		},
		reposition: function(options){
			zem.debug('super proto repo');
			if ($(options.class_holder).length)
			{
				$(options.class_holder).each(function ()
				{
					//$('#' + options.class_bg).css({ 'width': '100%', 'height': document.body.clientHeight });
					var overlay_top = (((Number($(window).height()) - Number($(options.class_rendered).height())) / 2));
					var overlay_left = (((Number($('body').width()) - Number($(options.class_rendered).width())) / 2));
					overlay_top = (overlay_top < 0) ? 50 : overlay_top;
					if(options.gallery !== false){
						$(options.class_rendered).animate({
	                        left: overlay_left,
	                        top: (overlay_top + $(window).scrollTop())
	                    }, options.slide_delay);		                    
					}else{
						$(options.class_rendered).css({ 'left': overlay_left, 'top': overlay_top + $(window).scrollTop() });	
					}
				});
			}
		},
		reposition_bg: function(options){
			zem.debug('super proto repo bg');
			if ($(options.class_bg).length)
			{
				$(options.class_bg).css({
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
        },
		play: function(element, options){
			zem.debug('super play');
			zem.debug(element);
		},
		stop: function(element, options){
			zem.debug('super stop');
            clearInterval(slider_interval);
		},
		prev_slide: function(element, options){
			zem.debug('super prev');
		},
		next_slide: function(element, options){
			zem.debug('super next');
		},
		jump_to: function (element, options) {
			zem.debug('super jump');
        },
        content_anchor: function (element, options) {
        }  
    }
    var local = SuperOverlay.prototype;
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
		$(document).on('click', trigger, function ()
		{
			zem.debug('super init show');
			new SuperOverlay($(this), 'trigger');
			return false;
		});
		$(document).on('keyup', function (e) {
            if (e.keyCode === 27) { 
            	zem.debug('super proto esc');
            	local.close();
               //actions.dismiss(element, options); 
            }
        });		
		$(window).resize(function ()
		{
			zem.debug('super proto resize');
            //local.close();
			//actions.reposition(options);
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