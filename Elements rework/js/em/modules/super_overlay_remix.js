/************************************************************

* ========================================================== */
;(function ( $, window, document, undefined )
{
	var pluginName = "zoverlay",
		version = "1.0",
		trigger = ".overlay",
		slider_interval;
	function SuperOverlay () {
		var scope = this;
		this.defaults = {
			type: 'default', //image , ajax , json , file, external , default
			class_bg: '.modal_bg',
			class_frame: '.overlay_frame',
			class_images: '.slide_images',
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
			title: '',
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
		$(document).on('click', trigger, function(){
				em.debug('super init show');
				scope.settings = em.cloneData($.extend( {}, scope.defaults ));
				em.updateOptions($(this), scope.settings);
				scope.show($(this), scope.settings);	 
				if($(document).data(scope.settings.class_bg)) {
					return true;
				}
				$(document).data(scope.settings.class_bg, true);
				$(document).on('click', scope.settings.class_bg, function ()
				{
					scope.close($(this), scope.settings); 
				});
				$(document).on('click', scope.settings.class_close, function ()
				{
					scope.close($(this), scope.settings); 
				});
				$(document).on('keyup', function (e) {
					if (e.keyCode === 27 && $(scope.settings.class_bg).is(':visible')) { 
						em.debug('super proto esc');
						scope.close($(this), scope.settings); 
						//actions.dismiss($this, scope.settings); 
					}
				});		
				$(window).resize(function ()
				{
					em.debug('super proto resize');
					//local.close();
					//actions.reposition(scope.settings);
				});
				return false;
		});
		$("[data-gallery^=]").addClass('gallery');
	}
	SuperOverlay.prototype = {
		constructor: SuperOverlay,
		init: function (element, options) {
			var scope = this;		 
			if($(document).data(options.class_bg)) {
				return true;
			}
			$(document).data(options.class_bg, true);
		},
		show: function(element, options){
			em.debug('super proto show');
			var scope = this;
			em.debug(options.class_bg);
			em.debug(options);
			scope.bg(element, options);
			scope.shell(element, options);
			scope.populate(element, options);
			scope.bling(element, options);
			scope.raise(element, options);
			scope.afterraise(element, options);
			scope.clean(element, options);
		},		
		populate: function (element, options)
		{
			em.debug('super proto populate');
			var scope = this;
			var hasGallery = $(element).hasClass('gallery');
			$(options.class_content).html('');
			$(options.class_images).html('');
			$(options.slide_holder).html('');
			var i = 1;
			/*
			$(trigger).each(function ()
			{
				$(this).find("img").attr('id', 'od_' + i).clone().appendTo('.overlay_frame').attr('id', 'image_od_' + i).attr('class', '').data('gallery', options.gallery);
				i++;
			});
			if ($('.overlay_frame').length)
			{
				$('.overlay_frame').remove();
			}*/
			if($(options.class_frame).length){
				$(options.class_frame).html('');
			}else{
				$('<div/>', {
					id: 'overlay_frame',
					'class': 'overlay_frame'
				}).appendTo('body');
			}
			if(hasGallery){
				var slide_number = $(element).attr('id').split('_')[2],
					slide_offset = 0,
					slide_offset_top = 0;
				$("[data-gallery^="+options.gallery+"]").find('img').each(function(index){
					$(this).clone().appendTo(options.class_frame).attr('id', 'image_od_' + i);
					$(this).clone().appendTo(options.slide_holder);
					if((index + 1) < slide_number){
						slide_offset += $('#image_od_' + i).width();
						slide_offset_top += $('#image_od_' + i).height();
						em.debug($('#image_od_' + i).width());
						em.debug($('#image_od_' + i).height());
					}
					i++;
				});
				em.debug(slide_offset);
				em.debug(slide_offset_top);
				$(options.class_rendered).find(options.slide_holder).css('left', '-' + slide_offset + 'px');
				$(options.slide_selector).css(
					{
						'width': $('#image_od_' + slide_number).width(),
						'height': $('#image_od_' + slide_number).height()
					}
				);				
				var slider_width = 0;
				var slide_items = $("[data-gallery^="+options.gallery+"]");
				var slide_count = slide_items.length;
				var j = 1;
				slide_items.each(function(index){
					slider_width += $('#image_od_' + j).width();
					em.debug('my width = ' + $('#image_od_' + j).width());
					j++;
				});
				em.debug('slider width ' + slider_width);
				if(options.slide_direction === "horizontal"){
					$(options.class_rendered).find(options.slide_holder).width(slide_count * slider_width);	
				}
			}else{
				$(element).find('img').each(function(){
					$(this).clone().appendTo(options.class_frame).attr('id', 'image_od_' + i);
					$(element).find('img').attr('id', 'od_' + i);
					i++;
				});	
			}
			if(options.title !== "" && options.show_header){
				$('<h1>' + options.title + '</h1>').appendTo(options.class_content);
			}
			//em.debug(options.type);
			switch (options.type)
			{
				case 'image':
					$(options.class_rendered).css({ 'width': 'auto', 'height': 'auto' });
					var src = $(element).find('img').attr('src'),
						image_id = $(element).find('img').attr('id'),
						width = $('#image_' + image_id).width(),
						height = $('#image_' + image_id).height(),
						total_width = width,
						total_height = height,
						overlay_top = (((Number($(window).height()) - Number(height)) / 2)),
						overlay_left = (((Number($('body').width()) - Number(width)) / 2));
					if (options.title !== "")
					{
						$('<div class="'+em.cla(options.class_caption)+'"><h1>' + options.title + '</h1></div>').appendTo(options.slide_holder);
						$(options.class_caption).fadeTo("slow", 0.60);
					}
					em.debug('gallery is ' + hasGallery);
					if(!hasGallery){
						$('<img src="' + src + '" alt="' + options.title + '" height="auto" width="auto" /></div>').appendTo(options.class_images);
						$(options.class_rendered).find(options.slide_holder).width(width).height(height);
					}
					break;					
				case 'json':
					$(options.class_rendered).append('<div class="'+em.cla(options.class_content)+'">' + ((window[options.call].title !== "") ? '<h1>' + window[options.call].title + '</h1>' : '') + '' + window[options.call].content + '</div>');
					break;
				case 'file':
					$.ajax({
						dataType: "text",
						url: $(element).attr('href'),
						success: function (data)
						{
							$(options.class_rendered).append(data);
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
								options.ajax_content(data.data, options);
							} else if (options.ajax_content)
							{
								window[options.ajax_content](data.data, options);
							}
						}
					});
					break;
				case 'external':
					var newObj = {},
						branch = options.params.split(',');
					for (var k = 0; k < branch.length; k++)
					{
						var item = branch[k].split(':');
						newObj[item[0]] = item[k];
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
						}
					});
					break;
				default:
					$("#" + options.element).clone(true, true).appendTo(options.class_content).clone();
					$(options.class_content).find('.hidden').show().css('position', 'relative').css('margin','0');
			}
		},	
		afterraise: function (element, options)
		{
			em.debug('super proto after');
			var scope = this;
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
			}else{
				$(options.class_rendered).find(options.class_content).css('overflow','auto').css('height', 'auto');
			}
			if(options.slide_start){
				$(options.class_rendered).find(".slide").each(function(index){
					$(this).attr('data-slide', (index + 1)).attr('data-set', 1);
				});
				//$(options.class_rendered).children().clone().appendTo(options.class_rendered).attr('data-set', 2);
				scope.play(element, options);
			}
			$(options.class_rendered).on('click', options.class_next, function ()
			{
				scope.move(element, options, 'next'); 
			});
			$(options.class_rendered).on('click', options.class_prev, function ()
			{
				scope.move(element, options, 'prev'); 
			});
			if($(element).hasClass('isFirst')){
				$(options.class_prev).hide();
				$(options.class_next).show();
			}
			if($(element).hasClass('isLast')){
				$(options.class_prev).show();
				$(options.class_next).hide();
			}
			if(!$(element).hasClass('isLast') && !$(element).hasClass('isFirst')){
				$(options.class_prev).show();
				$(options.class_next).show();
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
		bling: function (element, options)
		{
			em.debug('super proto bling');
			var scope = this;
			if(options.rounded !== false){
				scope.rounded(element, options);
			}
			if(options.shadow_size !== false && options.shadow_color !== false){
				scope.shadow(element, options);
			}	
		},
		shell: function(element, options){
			em.debug('super proto build shell');
			var scope = this;
			$(options.class_rendered).remove();			
			$('<div/>', {
				id: em.cla(options.class_rendered),
				'class': em.cla(options.class_holder) + ' ' + options.data_class
			}).prependTo('body');				
			if(options.show_x){
				$('<div/>', {
					id: em.cla(options.class_bar),
					'class': em.cla(options.class_bar),
					html: '<a href="javascript: void(0);" class="'+em.cla(options.class_close)+'"></a>'
				}).prependTo(options.class_rendered);
			}
			if($(element).hasClass('gallery')){
				$('<div/>', {
					id: em.cla(options.slide_selector),
					'class': em.cla(options.slide_selector),
					'html': '<div class="slide_holder"></div>'
				}).insertAfter(options.class_bar);
				$('<div/>', {
					id: em.cla(options.class_prev),
					'class': em.cla(options.class_prev),
					'html': '',
					'href': '#nogo'
				}).appendTo(options.class_rendered);
				$('<div/>', {
					id: em.cla(options.class_next),
					'class': em.cla(options.class_next),
					'html': '',
					'href': '#nogo'
				}).appendTo(options.class_rendered);
			}else{
				$(options.class_prev).remove();
				$(options.class_next).remove();
				if(options.type==="image"){
					$('<div/>', {
						id: em.cla(options.class_images),
						'class': em.cla(options.class_images),
						'html': ''
					}).insertAfter(options.class_bar);
				}else{	
					$('<div/>', {
						id: em.cla(options.class_content),
						'class': em.cla(options.class_content),
						'html': ''
					}).insertAfter(options.class_bar);				
				}
			}
		},
		clean: function(element, options){
			em.debug('super proto clean house');
			//$(options.class_bg).removeClass(em.cla(options.class_spinner));
		},
		raise: function(element, options){
			em.debug('super proto open');
			var scope = this;
			var total_width = ((options.width == 'user') ? 'auto' : options.width),
				total_height = ((options.max_height != 'user' && total_height > options.max_height) ? options.max_height : total_height),
				overlay_top = (((Number($(window).height()) - Number(total_height)) / 2)),
				overlay_left = (((Number($('body').width()) - Number(total_width)) / 2)),
				outerOverlay = {
					paddingHeight: parseInt($(options.class_content).css('padding-top')) + parseInt($(options.class_content).css('padding-bottom')),
					paddingWidth: parseInt($(options.class_content).css('padding-left')) + parseInt($(options.class_content).css('padding-right'))
				},
				finalHeight = parseInt(total_height) + parseInt(outerOverlay.paddingHeight),
				finalWidth = parseInt(total_width) + parseInt(outerOverlay.paddingWidth);
					
			if(options.height !== 'user'){
				$(options.class_rendered).hide().fadeTo("slow", 1).show().css({ 'left': overlay_left, 'width': finalWidth, 'height': finalHeight, 'min-height': finalHeight, 'min-width': finalWidth });
			}else{
				$(options.class_rendered).hide().fadeTo("slow", 1).show().css({ 'left': overlay_left, 'min-height': finalHeight, 'min-width': finalWidth });
			}				
			$(options.class_rendered).css('top', overlay_top + $(window).scrollTop());
		},
		close: function(element, options){
			em.debug('super proto close');
			this.stop();
			$(options.class_rendered).fadeOut();
			$(options.class_bg).hide();
			$(window).unbind('scroll'); 
			$("body").trigger("close_overlay");
		},
		shadow: function (element, options)
		{
			if(options.shadow_size !== false && options.shadow_color !== false){
				em.debug('super shadow');
				em.effects.shadow($(options.class_rendered), options.shadow_size, options.shadow_color);
			}
		},
		rounded: function (element, options)
		{
			if(options.rounded !== false){					
				em.debug('super round');
				em.effects.round($(options.class_rendered), options.rounded);
			}
		},
		bg: function(element, options){			
			em.debug('super bg');
			if (!$(options.class_bg).length)
			{
				$('<div/>', {
					id: em.cla(options.class_bg),
					'class': em.cla(options.class_bg) + " " + em.cla(options.class_spinner)
				}).appendTo("body");				
			}
			$(options.class_bg).fadeTo('fast', '0.60').css('top', $(window).scrollTop());
		},
		reposition: function(options){
			em.debug('super proto repo');
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
			em.debug('super proto repo bg');
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
			em.debug('super move');
		},
		play: function(element, options){
			em.debug('super proto play');
		},
		stop: function(){
			em.debug('super stop');
			clearInterval(slider_interval);
		},
		jump_to: function (element, options) {
			em.debug('super jump');
		},
		anchor: function (slider, element, options) {
			em.debug('super anchor');
		}  
	};
	// add initialisation
	em.addInitalisation(pluginName, function() {
		em.debug(pluginName + ' initialized');
		new SuperOverlay();
	});
	// register UI module
	em.UIModule({
		module: pluginName,
		events: [],
		init: function() {
			em.debug('run '+pluginName+' init');
			em.initialize(pluginName);
		}
	});	
})( jQuery, window, document );