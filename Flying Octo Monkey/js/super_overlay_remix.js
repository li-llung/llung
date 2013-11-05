/************************************************************

* ========================================================== */
;(function ( $, window, document, undefined )
{
	var pluginName = "soverlay",
		version = "1.0",
        config = {
		mode: 'fixed', //fixed or responsive or add new to settings=>mode
		role: 'default', //image , gallery , json , file , external , iframe, default or add new to settings=>role
		trigger: '.overlay', //css selector
		classes: {
			bg: 'modal_bg',
			images: {
				frame: 'overlay_frame',
				images: 'overlay_image_content'
			},
			overlay: 'overlay',
			spinner: 'spinner',
			bar: 'overlay_bar',
			holder: 'overlay_holder',
			content: 'overlay_content',
			rendered: 'rendered'
		},
		from: {
			data: '',
			href: '',
			title: ''
		},
		overlay: {
			exists: false,
			target: '',
			css_class: '',
			show_header: '',
			scrollable: '',
			sticky: '',
			rounded: '',
			show_x : '',
			escapable: true,
			focus_first: '',
			overrides: {
				style: ''
			}
		},
		settings: {
			boot: {
				start: '',
				show: '',
				close: '',
				callback: ''
			},
			mode: {
				fixed: {
					width: 640,
					height: 480,
					max_height: 480
				},
				responsive: {
					unit: '%'
				}
			},
			role: {
				image: '',
				json: '',
				file: '',
				external: '',
				iframe: '',
				'default': ''
			},
			data: {
		        pass_data: '',
		        overlay_data: '',
				data_class: '',
				call: '',
				params: '',
				httpMethod: ''
			},
		}
	},
	me,
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
					'height': '100%'
				}
			}).appendTo("body");
			$('#modal_bg').fadeTo('fast', '0.50');			
		}
	},
	actions = {
		dismiss: function(){
			$('#overlay').fadeOut();
			$('#modal_bg').hide();
			$("body").trigger("close_overlay");				
		}
	};
	function SuperOverlay ( element, options ) {
		me = this;
		this.element = element;
		this.settings = $.extend( {}, config, options );
		this._defaults = config;
		this._name = pluginName;
		this.init();
	}
	SuperOverlay.prototype = {
		constructor: SuperOverlay,
        init: function () {
			$(document).off('click').on('click', '.modal_bg', function ()
			{
				me.close(); 
			});
			$(document).off('click.init').on('click.init', config.trigger, function ()
			{
				var el = this.element;
				console.log('yay me');
				me.show(el);
				console.log($(this).attr('href'));
				console.log($(this).data('type'));
				console.log($(this).data());	
				return false;
			});		
			$(document).off('keyup').on('keyup', function (e) {
	            if (e.keyCode === 27) {
	               me.close(); 
	            }
	        });			
        },
		show: function(element){
			console.log('super show');
			build.bg();
		},
		close: function(){
			console.log('super close');
			actions.dismiss();
		}      
    }
    $.fn[ pluginName ] = function ( options ) {
	    return this.each(function() {
	        if ( !$.data( this, "plugin_" + pluginName ) ) {
	        	$.data( this, "plugin_" + pluginName, new SuperOverlay( this, options ) );
	        }
	    });
    };
	$(document).ready(function ()
	{		
		$('body').soverlay();
	});
})( jQuery, window, document );