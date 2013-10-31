/************************************************************

* ========================================================== */
(function ($)
{
	var config = {
		trigger: '.overlay'
	};
	var me;
	function SuperOverlay (el){
		me = this;	
		console.log('yay me');
		this.show();
		console.log(el.attr('href'));
		console.log(el.data('type'));
	}
	SuperOverlay.prototype.show = function() {
		console.log('super show');
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
	};
	SuperOverlay.prototype.close = function() {
		console.log('super close');
		$('#overlay').fadeOut();
		$('#modal_bg').hide();
	    $("body").trigger("close_overlay");	
	};
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