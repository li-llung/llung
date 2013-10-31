/************************************************************

* ========================================================== */
(function ($)
{
	var config = {
		trigger: '.overlay'
	};
	function SuperOverlay (el){
		console.log('yay me');
		this.show();
		console.log(el.attr('href'));
		console.log(el.data('type'));
	}
	SuperOverlay.prototype.show = function() {
		console.log('super show');
	};
	$.fn.soverlay_boot = function(){
		{
			$(document).off('click.init').on('click.init', config.trigger, function ()
			{
				new SuperOverlay($(this));
				return false;
			});		
		}
	};
	$(document).ready(function ()
	{		
		$('body').soverlay_boot();
	});
})(jQuery);