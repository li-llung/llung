/************************************************************

* ========================================================== */
;(function ( $, window, document, undefined )
{
	'use strict';
	var pluginName = 'ZSlider',
		trigger = '.slider';
	function ZSlider (element) {
		var me = this;
		this.defaults = {
            slide_start: false,
            slide_speed: 1000,
            slide_direction: 'horizontal',
            slide_loop: 2,
            slide_effect: 'tween'
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