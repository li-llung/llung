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
			bg: function(){
				if ($('#modal_bg').length > 0)
				{
					$('#modal_bg').remove();
				}
				$('<div/>', {
					id: "modal_bg",
					'class': "modal_bg spinner",
					css: {
						'width': '100%',
						'height': document.body.clientHeight
					}
				}).appendTo("body");
				$('#modal_bg').fadeTo('fast', '0.50');
			},
			overlay: function(overlay, elements, options){
				build.bg();
				console.log(options);
				console.log(options.type);
			}
		},
		actions = {
			dismiss: function(){
				$('#overlay').fadeOut();
				$('#modal_bg').hide();
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
		//console.log('--------------superman!---------------');
		me = this;
		this.config = {
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
		me.settings = me.cloneData($.extend( {}, me.config, options ));
		me._defaults = me.config;
		me._name = pluginName; 
		//console.log(element.attr('href'));
		//console.log(options);
		//console.log(element.data('type'));
		//console.log(element.data());
		me.updateOptions(me.element, me.settings);
		//console.log('--------------superman!---------------');
	}
	SuperOverlay.prototype = {
		constructor: SuperOverlay,
		cloneData: function(item){
			return JSON.parse(JSON.stringify(item));
		},
		testDataAttr: function(element, options, what, value, count){
			//console.log('element = ' + element + ' and options = ' + options + ' and what = ' + what + ' and lastly value = ' + value + '*****');
			if(element.data(what) !== undefined){
		        me.settings[what] = element.data(what);
				return element.data(what);
			}else{
				return this.config[what]
			}
		},
		updateOptions: function (element, options){
			//console.log('-----------start testing-----------');
			var x,
				count = 0;
			for(x in options) {
				//console.log(x + '!!');
				this.testDataAttr (element, options, x, options[x], count);
				//console.log(this.settings[x] + '@@');
				count += 1;
			}
			//console.log(me.settings);
			me.init(element, me.settings);
			//console.log('-----------end testing-----------');
		},
        init: function (element, options) {
			//console.log('from init');
			$(document).off('click').on('click', '.modal_bg', function ()
			{
				me.close(); 
			});
			$(document).off('keyup').on('keyup', function (e) {
	            if (e.keyCode === 27) {
	               me.close(); 
	            }
	        });		
			$(element).off('click').on('click', function ()
			{
				//console.log('yay me');
				me.show($(this), options);	
				return false;
			});		
        },
		show: function(overlay, options){
			console.log('super show');
			//console.log(me.settings);
			build.overlay(overlay, me.element, options);			
		},
		close: function(){
			console.log('super close');
			actions.dismiss();
		},
		reposition: function(){
			console.log('super reposition');
			actions.reposition();
		},
		update: function(){
			console.log('super update');
			actions.update();
		},
		gallery: function(){
			console.log('super gallery');
			build.gallery();
		},
		play: function(){
			console.log('super play');
			actions.play();
		},
		stop: function(){
			console.log('super stop');
			actions.stop();
		},
		prev: function(){
			console.log('super prev');
			actions.prev();
		},
		next: function(){
			console.log('super next');
			actions.next();
		},
		jump: function(){
			console.log('super jump');
			actions.jump();
		}    
    }
    $.fn[ pluginName ] = function ( options ) {
	    new SuperOverlay($(this), options);
    };
    // add initialisation
	z.addInitalisation('zoverlay', function() {
		console.log('zoverlay initialized');
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
			console.log('run zoverlay init');
			z.initialize('zoverlay');
		}
	});

	//z.zoverlay = new SuperOverlay(this);
})( jQuery, window, document );