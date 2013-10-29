/************************************************************

* ========================================================== */
(function ($)
{
	var config = {
		mode: 'fixed', //fixed or responsive or add new to settings=>mode
		role: 'default', //image , json , file , external , iframe, default or add new to settings=>role
		trigger: 'overlay', //css selector
		from: {
			data: '',
			href: '',
			title: ''
		},
		overlay: {
			exists: false,
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
					unit: ''
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
	overlay = function(options, callback){
		var build = {
			bg: function ()
			{
				if ($('#modal_bg').length > 0)
				{
					$('#modal_bg').remove();
				}
				/*if (is_mobile())
				{
					$('#modal_bg').css("top", $(window).scrollTop());
				}*/
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
			overlay: function(element)
			{

			}
		},
		actions = {
			dismiss: function(){
				$('#overlay').fadeOut();
				$('#modal_bg').hide();
			    $("body").trigger("close_overlay");					
			}
		};
		$(document).ready(function ()
		{
			$(document).off('keyup').on('keyup', function (e) {
	            if (config.overlay.escapable && e.keyCode === 27) {
	                actions.dismiss();
	            }
	        });
			$(document).off('click').on('click', '.modal_bg', function ()
			{
				actions.dismiss();
			});
			$(document).off('click.init').on('click.init', '.' + options.trigger, function ()
			{
				build.bg();
				build.overlay($(this));
				return false;
			});
		});
	};
	$.fn.extend({
		overlay: function (options, callback)
		{
			options = $.extend(config, options);
			return this.each(function ()
			{
				overlay(options, callback);
			});
		}
	});
	$(document).ready(function ()
	{
		$('.overlay').overlay();
	});
})(jQuery);