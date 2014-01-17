/************************************************************

* ========================================================== */
;(function ( $, window, document, undefined )
{
	var pluginName = "zoverlay",
		trigger = ".overlay",
		version = "1.0";
	function SuperOverlay ( element, options ) {
		var scope = this;
		this.$el = element;
		this.$options = options;
		this.defaults = {
            slide_loop: 2
		};
		scope.settings = z.cloneData($.extend( {}, scope.defaults, options ));
		z.updateOptions(element, scope.settings);
		this.init(element, scope.settings);
	}
	SuperOverlay.prototype = {
		constructor: SuperOverlay,
        init: function (element, options) {
        	var scope = this;        
					if($(document).data(z.cla(options.trigger))) {
						return true;
					}
					$(document).data(z.cla(options.trigger), true);
        }
    }
    var local = SuperOverlay.prototype;
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
			new SuperOverlay($this);
		});
		$(document).on('click', trigger, function ()
		{
			zem.debug('super init show');
			new SuperOverlay($(this), 'trigger');
			return false;
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