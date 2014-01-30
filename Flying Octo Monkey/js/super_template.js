/************************************************************

* ========================================================== */
;(function ( $, window, document, undefined )
{
	var pluginName = "ztemplate",
			trigger = ".ztemplate",
			version = "1.0";
	function SuperTemplate ( element, options ) {
		var scope = this;
				scope.el = element;
				scope.$el = $(element);
				scope.$options = options;
				scope.defaults = {
					options_1: true
				};
		scope.settings = z.cloneData($.extend( {}, scope.defaults, options ));
		z.updateOptions(element, scope.settings);
		scope.init(element, scope.settings);
	}
	SuperTemplate.prototype = {
		constructor: SuperTemplate,
      init: function (element, options) {
      	var scope = this;        
				if($(document).data(pluginName)) {
					return true;
				}
				$(document).data(pluginName, true);
				zem.debug(scope.el);
				zem.debug(scope.$el);
				zem.debug(scope.$options);
				zem.debug(scope.defaults);
				zem.debug(scope.settings);
      }
  }
  // add initialisation
	z.addInitalisation(pluginName, function() {
		zem.debug(pluginName + ' initialized');
		$(document).on('click', trigger, function ()
		{
			zem.debug('super init show');
			new SuperTemplate($(this));
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