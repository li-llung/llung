/************************************************************

* ========================================================== */
(function ($)
{
	var config = {
		mode: 'fixed', //fixed or responsive or add new to settings=>mode
		role: 'default', //image , gallery , json , file , external , iframe, default or add new to settings=>role
		trigger: '.overlay', //css selector
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
	me;
	function SuperOverlay (el){
		me = this;	
		console.log('yay me');
		me.show(el);
		console.log(el.attr('href'));
		console.log(el.data('type'));
	}
	SuperOverlay.prototype = {
		constructor: SuperOverlay,
		show: function(element){
			console.log('super show');
			console.log(element.data());
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
		close: function(){
			console.log('super close');
			$('#overlay').fadeOut();
			$('#modal_bg').hide();
			$("body").trigger("close_overlay");	
		}      
    }
	$.fn.soverlay_boot = function(){
		{
			$(document).off('click').on('click', '.modal_bg', function ()
			{
				me.close(); 
			});
			$(document).off('click.init').on('click.init', config.trigger, function ()
			{
				new SuperOverlay($(this));
				return false;
			});		
			$(document).off('keyup').on('keyup', function (e) {
	            if (e.keyCode === 27) {
	               me.close(); 
	            }
	        });
		}
	};
	$(document).ready(function ()
	{		
		$('body').soverlay_boot();
	});
})(jQuery);