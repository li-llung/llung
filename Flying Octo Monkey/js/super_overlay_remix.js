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
				element: '',
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
				rounded: '7px',
				shadow_color: '#666666',
				shadow_size: '5px 5px 5px',
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
				}
			}
		},
		me,
		add = {
			shadow: function(element, options){
				$('#overlay').css({ '-moz-box-shadow': ''+options.overlay.shadow_size+' '+options.overlay.shadow_color+'', '-webkit-box-shadow': ''+options.overlay.shadow_size+' '+options.overlay.shadow_color+'', 'box-shadow': ''+options.overlay.shadow_size+' '+options.overlay.shadow_color+'' });
			},
			rounded: function(element, options){
				$('#overlay').css({ '-moz-border-radius': options.overlay.rounded, '-webkit-border-radius': options.overlay.rounded, 'border-radius': options.overlay.rounded, '-khtml-border-radius': options.overlay.rounded });
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
						'height': '100%'
					}
				}).appendTo("body");
				$('#modal_bg').fadeTo('fast', '0.50');			
			},
			overlay: function(overlay, element, options){
				console.log(overlay.attr('href'));
				console.log(options);
				console.log(overlay.data('type'));
				console.log(overlay.data());                
			}
		},
		actions = {
			dismiss: function(){
				$('#overlay').fadeOut();
				$('#modal_bg').hide();
				$("body").trigger("close_overlay");				
			},
			show: function(overlay_top, overlay_left, total_width, total_height){
                $("#overlay").hide().fadeTo("slow", 1).show().css({ 'left': overlay_left, 'width': total_width, 'height': total_height });
                $("#overlay").css('top', overlay_top + $(window).scrollTop());
                actions.reposition();
            },
            reposition: function () {
                if($('.overlay_holder').length){
                    $('.overlay_holder').each(function(){
                        $("#modal_bg").css({ 'width': '100%', 'height': document.body.clientHeight });
                        /*if (is_mobile()) {
                            $("#modal_bg").css("top", $(window).scrollTop());
                        }*/;
                        var overlay_top = (((Number($(window).height()) - Number($(this).height())) / 2));
                        var overlay_left = (((Number($('body').width()) - Number($(this).width())) / 2));
                        overlay_top = (overlay_top < 0) ? 50 : overlay_top;
                        $(this).css({'left': overlay_left, 'top': overlay_top + $(window).scrollTop()});
                    });
                }
            },
            reposition_bg: function () {
                if ($('.overlay_holder').length) {
                    $("#modal_bg").css({"top": ($(window).scrollTop()), 'left': $(window).scrollLeft(), "height": ($(window).height() + 30), "width": ($(window).width())});
                }
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
				console.log('yay me');
				me.show($(this));	
				return false;
			});		
			$(document).off('keyup').on('keyup', function (e) {
	            if (e.keyCode === 27) {
	               me.close(); 
	            }
	        });		
			/*$(document).off('click').on('click', '.overlay_close', function ()
			{
				me.close(); 
            });	*/
        },
		show: function(overlay){
			console.log('super show');
			build.bg();
			build.overlay(overlay, this.element, this.settings);			
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
		$(config.trigger).soverlay();
	});
})( jQuery, window, document );