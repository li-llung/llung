/**
* Elements Tempalte
*/
!function() {
	'use strict';
	function Template($el) {
		this.$el = $el;
		var scope = this;

	}

	// hide/show dropdowns
	Template.prototype.dropdown = function($this) {
		
	};

	// add initialisation
	Elements.addInitalisation('template', function() {
		$('.template').each(function() {
			var $this = $(this);
			// this element has already been initialized
			if($this.data('isTemplate')) {
				return true;
			}
			// mark element as initialized
			$this.data('isTemplate', true);
			new Template($this);
		});
	});

	// register UI module
	Elements.UIModule({
		module: 'template',
		events: [],
		init: function() {
			Elements.initialize('template');
		}
	});
}();
