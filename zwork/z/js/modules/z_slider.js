/************************************************************

* ========================================================== */
;(function ( $, window, document, undefined )
{
	'use strict';
	var pluginName = 'ZSlider',
		trigger = '.slider',
        build = {
            
            shell: function (slider, options) {
                $("<div/>", {
                    'class': "slide_holder"
                }).prependTo(slider);
            },
            nav: function (slider, options) {
                $(slider).animate({
                    top: '+=' + options.height
                }, options.delay);
            }
        },
        actions ={
            up: function (slider, options) {
                $(slider).animate({
                    top: '+=' + options.height
                }, options.delay);
            },
            down: function (slider, options) {
                $(slider).animate({
                    top: '-=' + options.height
                }, options.delay);
            },
            forward: function (slider, options) {
                $(slider).animate({
                    left: '-=' + options.width
                }, options.delay);
            },
            back: function (slider, options) {
                $(slider).animate({
                    left: '+=' + options.width
                }, options.delay);
            },
            move: function (slider, holder, nav, config) {
                var slide_number = nav.find('.' + config.anchor).data('slide');
                var animate_left = -((slide_number * slider.width()) - slider.width()),
                    animate_top = -((slide_number * slider.height()) - slider.height());
                if(config.effect == "fade"){
                    holder.find('.slide').fadeOut();
                    holder.find('.slide').eq((slide_number-1)).fadeIn();
                }else{
                    if (config.direction === 'horizontal') {
                        holder.animate({
                            left: animate_left
                        }, config.delay);
                    } else {
                        holder.animate({
                            top: animate_top
                        }, config.delay);
                    }
                }
            },
            anchor: function (elem, nav, config) {
                $(elem).parents(config.selector).find("a").removeClass(config.anchor);
                $(elem).addClass(config.anchor);
            },
        };
	function ZSlider (element) {
		var me = this;
        this.defaults = {
            speed: 5000,
            delay: 1000,
            start: false,
            direction: 'horizontal',
            effect: 'tween',
            selector: '.slider',
            anchor: 'slide_nav_anchor',
            controls: true,
            resume: true,
            stop: true,
            loop: 0,
            type: 'nav' //nav , dots , arrows
        };
		me.element = element;
		me.settings = z.cloneData($.extend( {}, me.defaults ));
		z.updateOptions(me.element, me.settings);        
        this.init(me.element, me.settings);
	}
	ZSlider.prototype = {
		constructor: ZSlider,
        init: function (element, options) {
			zem.debug('called from init');
            zem.debug(element);
            zem.debug(options);
            var slider = $(element);
            var slide_count = slider.find('.slide').length;

            build.shell(slider, options);
            var holder = slider.find('.slide_holder');
            if(options.direction === "horizontal"){
                holder.width(slide_count * slider.width());
            }
            slider.find('.slide').appendTo(holder);

            var nav_class = '';
            switch(options.type)
            {
            case 'dots':
                nav_class = 'dots';
              break;
            case 'arrows':
                $("<a/>", {
                    href: 'javascript:void(0);',
                    'class': "slide_left",
                    html: '&#8592;'
                }).appendTo(slider);
                $("<a/>", {
                    href: 'javascript:void(0);',
                    'class': "slide_right",
                    html: '&#8594;'
                }).appendTo(slider);
              break;
            default:
                nav_class = 'nav';
                //nav default
            }
            if(options.type !== 'arrows'){
                $("<div/>", {
                    'class': "slide_nav " + nav_class
                }).appendTo(slider);
                var nav = slider.find('.slide_nav');
                for(var i=0;i<slide_count;i++){
                    $("<a/>", {
                        href: 'javascript:void(0);',
                        'class': "slide_nav_item",
                        text: (options.type==="dots") ? '' : (i + 1),
                        'data-slide': (i + 1)
                    }).appendTo(nav);
                }
                $(nav).find('.slide_nav_item').first().addClass('slide_nav_anchor');
                slider.find('.slide_nav_item').on('click', function(){   
                    actions.anchor($(this), nav, options);                 
                    actions.move(slider, holder, nav, options);
                });
            }else{
                var lazyLeft = parseInt(slider.find(".slide_holder").css('left'));
                var lazy_width = slider.width();
                if (slider.length) {
                    $('.slide_left').on('click', function () {
                        holder.animate({
                            left: '+=' + lazy_width + 'px'
                        }, 500, function () {
                            // Animation complete.
                            var pos = parseInt(slider.find(".slide_holder").css('left'));
                            if (pos === 0) {
                                $('.slide_right').show();
                                $('.slide_left').hide();
                            }else {
                                $('.slide_left').show();
                                $('.slide_right').show();
                            }
                        });
                    });
                    $('.slide_right').on('click', function () {
                        holder.animate({
                            left: '-=' + lazy_width + 'px'
                        }, 500, function () {
                            // Animation complete.
                            var pos = parseInt(slider.find(".slide_holder").css('left'));
                            var rightEdge = -Number((slide_count * slider.width()) - slider.width());
                            if (pos === 0) {
                                $('.slide_right').show();
                                $('.slide_left').hide();
                            } else if(rightEdge >= pos) {
                                $('.slide_right').hide();
                                $('.slide_left').show();
                            }else {
                                $('.slide_left').show();
                                $('.slide_right').show();
                            }
                        });
                    });
                }                    
            }
			// this element has already been initialized
			if($(document).data(options.selector)) {
				return true;
			}
			// mark element as initialized
			$(document).data(options.selector, true);
        }
    };
    // add initialisation
	z.addInitalisation(pluginName, function() {
		zem.debug(pluginName + ' initialized');
		zem.debug('------------start ' + pluginName + '----------------------');
		$(trigger).each(function() {
			var $this = $(this);
			// this element has already been initialized
			if($this.data(pluginName)) {
				return true;
			}
			// mark element as initialized
			$this.data(pluginName, true);
            new ZSlider($this);
		});
        zem.debug('------------end ' + pluginName + '----------------------');
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