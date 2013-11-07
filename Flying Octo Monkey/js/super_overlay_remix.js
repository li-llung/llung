/************************************************************

* ========================================================== */
;(function ( $, window, document, undefined )
{
	var pluginName = "zoverlay",
		version = "1.0",
		me,
		add = {
			shadow: function(){
			
			},
			rounded: function(){

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
					'class': options.class_bg + " " + options.class_spinner,
					css: {
						'width': '100%',
						'height': document.body.clientHeight
					}
				}).appendTo("body");
				$('#' + options.class_bg).fadeTo('fast', '0.50');
			},
			overlay: function(overlay, elements, options){
				build.bg(overlay, elements, options);
				zem.debug(options);
				zem.debug(options.type);
			}
		},
		actions = {
			dismiss: function(elements, options){
				$('#' + options.class_overlay).fadeOut();
				$('#' + options.class_bg).hide();
			    $("body").trigger("close_overlay");
			},
			show: function(){

            },
            reposition: function () {

            },
            reposition_bg: function () {

            }
		};
	function SuperOverlay ( element, options ) {
		me = this;
		this.defaults = {
			mode: 'fixed',
			role: 'default',
			type: 'default',
			trigger: '.overlay',
			class_bg: 'modal_bg',
			class_frame: 'overlay_frame',
			class_images: 'overlay_image_content',
			class_overlay: 'overlay',
			class_spinner: 'spinner',
			class_bar: 'overlay_bar',
			class_holder: 'overlay_holder',
			class_content: 'overlay_content',
			class_rendered: 'rendered',
			element: '',
			href: '',
			title: '',
			exists: false,
			data_target: '',
			css_class: '',
			show_header: '',
			scrollable: '',
			sticky: '',
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
			width: 640,
			height: 480,
			max_height: 480,
			unit: '%',
			pass_data: '',
			overlay_data: '',
			data_class: '',
			call: '',
			params: '',
			httpMethod: ''
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
			$(document).off('click').on('click', '.' + options.class_bg, function ()
			{
				me.close(element, options); 
			});
			$(document).off('keyup').on('keyup', function (e) {
	            if (e.keyCode === 27) {
	               me.close(element, options); 
	            }
	        });		
			$(element).off('click').on('click', function ()
			{
				me.show($(this), element, options);	
				return false;
			});		
        },
		show: function(overlay, element, options){
			zem.debug('super show');
			build.overlay(overlay, element, options);			
		},
		close: function(element, options){
			zem.debug('super close');
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
	z.addInitalisation('zoverlay', function() {
		zem.debug('zoverlay initialized');
		$('.overlay').each(function() {
			var $this = $(this);
			// this element has already been initialized
			if($this.data('isZoverlay')) {
				return true;
			}
			// mark element as initialized
			$this.data('isZoverlay', true);
			new SuperOverlay($this);
		});
	});
	// register UI module
	z.UIModule({
		module: 'zoverlay',
		events: [],
		init: function() {
			zem.debug('run zoverlay init');
			z.initialize('zoverlay');
		}
	});	
})( jQuery, window, document );