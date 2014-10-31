/************************************************************

* ========================================================== */
;(function ( $, window, document, undefined )
{
	var pluginName = "zTemplate",
		trigger = ".template";
	function zTemplate (element) {
		var me = this;
		this.defaults = {
            name: 'bob',
            type: 'really'
		};
		me.element = element;
		me.settings = z.cloneData($.extend( {}, me.defaults ));
		z.updateOptions(me.element, me.settings);        
        this.init(me.element, me.settings);
	}
	zTemplate.prototype = {
		constructor: zTemplate,
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
    }
    // add initialisation
	z.addInitalisation(pluginName, function() {
		zem.debug(pluginName + ' initialized');
		zem.debug('------------start ' + pluginName + '----------------------');
		$(trigger).each(function() {
			var $this = $(this);
			// this element has already been initialized
			if($this.data(pluginName)) {
				return true;
			}
			// mark element as initialized
			$this.data(pluginName, true);
            new zTemplate($this);
		});
        zem.debug('------------end ' + pluginName + '----------------------');
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