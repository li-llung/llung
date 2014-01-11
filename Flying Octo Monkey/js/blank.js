/************************************************************

* ========================================================== */
;(function ( $, window, document, undefined )
{
	var pluginName = "zoverlay",
		version = "1.0",
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
            slide_holder: '.slide_holder',
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
        	var scope = this;        
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
		},		
		content: function (element, options, data)
		{
		},
		close: function(){
			zem.debug('super proto close');
			this.stop();
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
        move: function (element, options, direction){
        	zem.debug('super move');
        	//next slide (up or forward) , previous slide (back or down), beginning , end
        	switch (direction)
			{
				case 'next':
					if(options.direction === "vertical"){
						zem.debug('upward');
						//actions.up(element, options);
					}else{
						zem.debug('forward/next');
					}
					break;
				case 'prev':
					if(options.direction === "vertical"){
						zem.debug('down');
						//actions.down(element, options);
					}else{
						zem.debug('back/previous');
						//actions.back(element, options);
					}
					break;
				case 'begin':
					zem.debug('go to start');
					//actions.begin(element, options);
					break;
				case 'end':
					zem.debug('go to end');
					//actions.end(element, options);
					break;
				default:
					zem.debug('default');
			}
        },
		play: function(element, options){
			var scope = this;
			zem.debug('super play');
		},
		stop: function(){
			zem.debug('super stop');
            clearInterval(slider_interval);
		},
		jump_to: function (element, options) {
			zem.debug('super jump');
        },
        anchor: function (slider, element, options) {
			zem.debug('super anchor');
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
		if ($('.overlay_frame').length)
		{
			$('.overlay_frame').remove();
		}
		$('<div/>', {
			id: 'overlay_frame',
			'class': 'overlay_frame'
		}).appendTo('body');
		var i = 1;
		$(trigger).each(function ()
		{
			$(this).find("img").attr('id', 'od_' + i).clone().appendTo('.overlay_frame').attr('id', 'image_od_' + i).attr('class', '');
			i++;
		});
		var gallery = $("[data-gallery^=]"),
			prev_gallery = '',
			prev_index = 0,
			j = 1;
		gallery.each(function (index)
		{
			var current_item = $(this).data('gallery'),
				next_item = $(this).next().data('gallery'),
				prev_item = $(this).prev().data('gallery');
			if(prev_gallery !== current_item){
				$(this).addClass('isFirst');
			}else if(next_item !== current_item || next_item === undefined){
				$(this).addClass('isLast');
			}
			$(this).attr('id', 'set_' + current_item + '_' + j);
			j++;
			prev_gallery = $(this).data('gallery');
			prev_index = $(this).index();
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