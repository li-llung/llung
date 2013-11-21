/************************************************************

* ========================================================== */
;(function ( $, window, document, undefined )
{
	var pluginName = "zoverlay",
		version = "1.0",
		trigger = ".overlay",		
		apiKey = "eb88bfe9ce12bbfa5c867df78a1b55dc",
    	apiClientId = "d5f816034e83e1d3cde5",
    	apiClientSecret = "bcdb732a0a29969f59749e626e3d6069cbd976ec",
		me,
		add = {
			shadow: function (options)
			{
				$('.' + options.class_holder).css({ '-moz-box-shadow': '' + options.shadow_size + ' ' + options.shadow_color + '', '-webkit-box-shadow': '' + options.shadow_size + ' ' + options.shadow_color + '', 'box-shadow': '' + options.shadow_size + ' ' + options.shadow_color + '' });
			},
			rounded: function (options)
			{
				$('.' + options.class_holder).css({ '-moz-border-radius': options.rounded, '-webkit-border-radius': options.rounded, 'border-radius': options.rounded, '-khtml-border-radius': options.rounded });
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
			gallery: function(){
				zem.debug('super gallery');
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
                    content_html = '';
				$('<div/>', {
					id: options.class_overlay,
					'class': options.class_holder + ' ' + options.data_class
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
					html: !options.hideX ? '<a href="javascript: void(0);" class="'+options.class_close+'"></a>' : ''
				}).prependTo("#" + options.class_overlay);
				switch (options.type)
				{
					case 'image':
						console.log(total_width);
						console.log(total_height);
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
						if(options.gallery !== false){
							$("#" + options.class_overlay).append('<a href="javascript: void(0)" class="prev"></a><a href="javascript: void(0)" class="next"></a>');
						}
						actions.show(overlay_top, overlay_left, total_width, total_height, options);
						break;
					case 'json':
						$("#" + options.class_overlay).append('<div class="'+options.class_content+'">' + ((window[options.call].title !== "") ? '<h1>' + window[options.call].title + '</h1>' : '') + '' + window[options.call].content + '</div>');
						actions.show(overlay_top, overlay_left, total_width, total_height, options);
						break;
					case 'file':
						$.ajax({
							dataType: "text",
							url: overlay.attr('href'),
							success: function (data)
							{
								$("#" + options.class_overlay).html(((options.title !== "") ? '<h1>' + options.title + '</h1>' : '') + '<div class="'+options.class_content+'">' + data + '</div>');
								actions.show(overlay_top, overlay_left, total_width, total_height, options);
							}
						});
						break;
					case 'ajax':
						console.log(typeof (options.ajax_content));
						$.ajax({
							type: options.httpMethod,
							url: overlay.attr('href'),
							dataType: "jsonp",
							crossDomain: true,
							success: function (data)
							{
								console.log(data);
								if (typeof (options.ajax_content) === 'function')
								{
									options.ajax_content(data['data'], options);
								} else if (options.ajax_content)
								{
									window[options.ajax_content](data['data'], options);
								}
								actions.show(overlay_top, overlay_left, total_width, total_height, options);
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
								actions.show(overlay_top, overlay_left, total_width, total_height, options);
							}
						});
						break;
					default:
						$("#" + options.class_overlay).append('<div class="'+options.class_content+'">' + ((options.title !== "") ? '<h1>' + options.title + '</h1>' : '') + '' + '</div>');
                        $('#' + options.element).clone().appendTo('.'+options.class_content);
                        $('.' + options.class_content).find('.hidden').show().css('position', 'relative').css('margin','0');
						if (total_height < options.max_height)
						{
							total_height = 'auto';
						}
						actions.show(overlay_top, overlay_left, total_width, total_height, options);
				}
				add.rounded(options);
				add.shadow(options);
			}
		},
		actions = {
			dismiss: function(elements, options){
				console.log(options.class_bg);
				$('#' + options.class_overlay).fadeOut();
				$('#' + options.class_bg).hide();
			    $("body").trigger("close_overlay");
			},
			show: function(overlay_top, overlay_left, total_width, total_height, options){
				var outerOverlay = {
					paddingHeight: parseInt($('.' + options.class_content).css('padding-top')) + parseInt($('.' + options.class_content).css('padding-bottom')),
					paddingWidth: parseInt($('.' + options.class_content).css('padding-left')) + parseInt($('.' + options.class_content).css('padding-right'))
				};
				var finalHeight = parseInt(total_height) + parseInt(outerOverlay.paddingHeight);
				var finalWidth = parseInt(total_width) + parseInt(outerOverlay.paddingWidth);
				if(options.height !== 'user'){
					$("#" + options.class_overlay).hide().fadeTo("slow", 1).show().css({ 'left': overlay_left, 'width': finalWidth, 'height': finalHeight, 'min-height': finalHeight, 'min-width': finalWidth });
				}else{
					$("#" + options.class_overlay).hide().fadeTo("slow", 1).show().css({ 'left': overlay_left, 'width': finalWidth, 'min-height': finalHeight, 'min-width': finalWidth });
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
						$('#' + options.class_overlay).css({ 'left': overlay_left, 'top': overlay_top + $(window).scrollTop() });
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
			update: function(){
				zem.debug('super update');
			},
			play: function(){
				zem.debug('super play');
			},
			stop: function(){
				zem.debug('super stop');
			},
			prev: function(){
				zem.debug('super prev');
			},
			next: function(){
				zem.debug('super next');
			},
			jump: function(){
				zem.debug('super jump');
			}    
		};
	function SuperOverlay ( element, options ) {
		me = this;
		this.defaults = {
			mode: 'fixed',
			role: 'default',
			type: 'default',
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
			element: '',
			href: '',
			title: '',
			exists: false,
			data_target: '',
			css_class: '',
			show_header: '',
			scrollable: '',
			sticky: false,
			rounded: '7px',
			shadow_color: '#666666',
			shadow_size: '5px 5px 5px',
			show_x : '',
			escapable: true,
			focus_first: '',
			overrides: '',
			start: '',
			show: '',
			close: '',
			callback: '',
			ajax_content: '',
			width: 'user',
			height: 'user',
			max_height: 'user',
			unit: '%',
			pass_data: '',
			overlay_data: '',
			data_class: '',
			call: '',
			params: '',
			httpMethod: 'post',
			gallery: false
		};
		me.element = element;
		me.settings = me.cloneData($.extend( {}, me.defaults, options ));
		me.updateOptions(me.element, me.settings);

	}
	SuperOverlay.prototype = {
		constructor: SuperOverlay,
		cloneData: function(item){
			return JSON.parse(JSON.stringify(item));
		},
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
        	console.log(options.class_bg);	
			$(element).on('click', function ()
			{
				console.log(options.class_bg);
				me.show($(this), element, options);	
				return false;
			});	
			// this element has already been initialized
			if($(document).data(options.class_bg)) {
				return true;
			}
			// mark element as initialized
			$(document).data(options.class_bg, true);
			$(document).on('click', '.' + options.class_bg, function ()
			{
				me.close(element, options); 
			});
			$(document).on('click', '.' + options.class_close, function ()
			{
				me.close(element, options); 
			});
			$(document).on('keyup', function (e) {
	            if (e.keyCode === 27) {
	               me.close(element, options); 
	            }
	        });		
			if (options.sticky)
			{
				$(window).resize(function ()
				{
					actions.reposition(options);
				});
				$(window).scroll(function ()
				{
					actions.reposition(options);
				});
			} else
			{
				actions.reposition_bg(options);
			}
        },
		show: function(overlay, element, options){
			zem.debug('super show');
			build.overlay(overlay, element, options);			
		},
		close: function(element, options){
			zem.debug('super close');
			console.log('yarp');
			console.log(options.class_bg);
			actions.dismiss(element, options);
		},
		reposition: function(){
			zem.debug('super reposition');
			actions.reposition();
		},
		update: function(){
			zem.debug('super update');
			actions.update();
		},
		gallery: function(){
			zem.debug('super gallery');
			build.gallery();
		},
		play: function(){
			zem.debug('super play');
			actions.play();
		},
		stop: function(){
			zem.debug('super stop');
			actions.stop();
		},
		prev: function(){
			zem.debug('super prev');
			actions.prev();
		},
		next: function(){
			zem.debug('super next');
			actions.next();
		},
		jump: function(){
			zem.debug('super jump');
			actions.jump();
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