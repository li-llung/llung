/************************************************************

* ========================================================== */
;(function ( $, window, document, undefined )
{
	var pluginName = "zslider",
		version = "1.0",
		trigger = ".slider",
        counter = 1,
		me,
		add = {
		},
		build = {			
	        slider: function(slider, element, options) {
                zem.debug('slider starting now');
                var o = options;
                var ov = slider;
                var slide_count = $(element).find('.slide').length,
                    holder = '#slide_holder_' + counter,
                    nav =  '#slide_nav_' + counter;
            	zem.debug('slider '+counter+' starting now');
            	zem.debug($(element));
            	zem.debug($(element).find('.slide'));
            	zem.debug(slide_count);
            	zem.debug(o);
            	zem.debug(ov);
            	zem.debug(holder);
            	zem.debug(nav);
                $("<div/>", {
                    id: "slide_holder_" + counter,
                    'class': "slide_holder"
                }).prependTo(element);
                if(options.direction === "horizontal"){
            		zem.debug('count = ' + slide_count);
            		zem.debug('width = ' + $(element).width());
            		zem.debug('count * width  = ' + (slide_count * $(element).width()));
                    $(element).find('.slide_holder').width(slide_count * $(element).width());
                }
                $(element).find('.slide').appendTo(holder);
                $("<div/>", {
                    id: "slide_nav_" + counter,
                    'class': "slide_nav"
                }).appendTo(element);
                for(var i=0;i<slide_count;i++){
                    $("<a/>", {
                        href: 'javascript:void(0);',
                        'class': "slide_nav_item",
                        text: (i + 1)
                    }).appendTo(nav);
                }
                $(nav).find('.slide_nav_item').first().addClass('slide_nav_anchor');
				$(element).on('click', '.slide_nav_item', function ()
				{
					zem.debug('bam');
		            actions.content_animate_to($(this), element, options);
		            actions.content_anchor($(this), element, options);
		        });
                counter+=1;
	        }
		},
		actions = {
	        content_animate_to: function (slider, element, options) {
	        	zem.debug($(element).find('.slide_holder'));
	        	zem.debug(slider.index());
	            var slide_number = slider.text();
	            	width = $(element).width();
	            	height = $(element).height();
	            	animate_left = -((slide_number * width) - width),
	                animate_top = -((slide_number * height) - height);
	        	zem.debug(slide_number);
	        	zem.debug(width);
	        	zem.debug(height);
	        	zem.debug(animate_left);
	        	zem.debug(animate_top);
	            if(options.effect == "fade"){
	                $(element).find('.slide').fadeOut();
	                $(element).find('.slide').eq((slide_number-1)).fadeIn();
	            }else{
	                if (options.direction === 'horizontal') {
	                    $(element).find('.slide_holder').animate({
	                        left: animate_left
	                    }, options.delay);
	                } else {
	                    $(element).find('.slide_holder').animate({
	                        top: animate_top
	                    }, options.delay);
	                }
	            }
	        },
	        content_anchor: function (slider, element, options) {
	            slider.parents(options.selector).find("a").removeClass(options.anchor);
	            slider.addClass(options.anchor);
	        }  
		};
	function SuperSlider ( element, options ) {
		me = this;
		this.defaults = {
            delay: 1000,
            start: false,
            direction: 'horizontal',
            effect: 'tween',
            selector: '.slider',
            anchor: 'slide_nav_anchor'
		};
		me.element = element;
		me.settings = z.cloneData($.extend( {}, me.defaults, options ));
		me.updateOptions(me.element, me.settings);
	}
	SuperSlider.prototype = {
		constructor: SuperSlider,
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
			me.start($(this), element, options);	
			// this element has already been initialized
			if($(document).data(options.selector)) {
				return true;
			}
			// mark element as initialized
			$(document).data(options.selector, true);
        },
		start: function(slider, element, options){
			zem.debug('super start');
			build.slider(slider, element, options);			
		} ,
		content_animate_to: function(slider, element, options){
			zem.debug('super animate');
			actions.content_animate_to(slider, element, options);			
		} ,
		content_anchor: function(slider, element, options){
			zem.debug('super anchor');
			actions.content_anchor(slider, element, options);			
		}  
    }
    $.fn[ pluginName ] = function ( options ) {
	    new SuperSlider($(this), options);
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
			new SuperSlider($this);
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