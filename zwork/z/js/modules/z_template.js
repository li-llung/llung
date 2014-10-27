/************************************************************

* ========================================================== */
;(function ( $, window, document, undefined )
{
	var pluginName = "zTemplate",
		version = "1.0",
		trigger = ".template",
		me;
	function zTemplate ( element, options ) {
		me = this;
		this.defaults = {
            name: 'bob',
            type: 'really'
		};
		me.element = element;
		me.settings = z.cloneData($.extend( {}, me.defaults, options ));
		z.updateOptions(me.element, me.settings);
        zem.debug(me.element);
        zem.debug(me.settings);
        zem.debug(z.updateOptions(me.element, me.settings));
        zem.debug(options);
        zem.debug(z.cloneData($.extend( {}, me.defaults, options )));
	}
	zTemplate.prototype = {
		constructor: zTemplate,
        init: function (element) {
			zem.debug('called from init');
            zem.debug(element);
            var options = this.settings;
			// this element has already been initialized
			if($(document).data(options.selector)) {
				return true;
			}
			// mark element as initialized
			$(document).data(options.selector, true);
        }
    }
    $.fn[ pluginName ] = function ( options ) {
	    new zTemplate($(this), options);
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
			//new zTemplate($this);
            new zTemplate($this);
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