!function() {

	'use strict';

	function z() {
		this.$dom = $(document);
		this.isOldie = !!this.$dom.find('html').hasClass('oldie');
		this.click = 'click';
		this.onReady = this.onOldie = this.onTouch = false;
		this.uiModules = {};
		this.inits = {};

		// check and set path with js/libs default
		this.path = $('script[gumby-path]').attr('gumby-path') ||
					$('script[data-path]').attr('data-path') ||
					$('script[path]').attr('path') ||
					'js/libs';
	}

	// initialize z
	z.prototype.init = function() {
		zem.debug('ignition');
		// init UI modules
		this.initUIModules();

		var scope = this;

		// call ready() code when dom is ready
		this.$dom.ready(function() {
			if(scope.onReady) {
				scope.onReady();
			}

			// call oldie() callback if applicable
			if(scope.isOldie && scope.onOldie) {
				scope.onOldie();
			}

			// call touch() callback if applicable
			if(Modernizr.touch && scope.onTouch) {
				scope.onTouch();
			}
		});
	};

	// public helper - set z ready callback
	z.prototype.ready = function(code) {
		if(code && typeof code === 'function') {
			this.onReady = code;
		}
	};

	// public helper - set oldie callback
	z.prototype.oldie = function(code) {
		if(code && typeof code === 'function') {
			this.onOldie = code;
		}
	};

	// public helper - set touch callback
	z.prototype.touch = function(code) {
		if(code && typeof code === 'function') {
			this.onTouch = code;
		}
	};

	// public helper - return debuggin object including uiModules object
	z.prototype.debuggin = function() {
		return {
			$dom: this.$dom,
			isOldie: this.isOldie,
			uiModules: this.uiModules,
			click: this.click
		};
	};

	// grab attribute value, testing data- gumby- and no prefix
	z.prototype.selectAttr = function() {
		var i = 0;

		// any number of attributes can be passed
		for(; i < arguments.length; i++) {
			// various formats
			var attr = arguments[i],
				dataAttr = 'data-'+arguments[i],
				gumbyAttr = 'gumby-'+arguments[i];

			// first test for data-attr
			if(this.attr(dataAttr)) {
				return this.attr(dataAttr);

			// next test for gumby-attr
			} else if(this.attr(gumbyAttr)) {
				return this.attr(gumbyAttr);

			// finally no prefix
			} else if(this.attr(attr)) {
				return this.attr(attr);
			}
		}

		// none found
		return false;
	};

	// 
	z.prototype.cloneData = function(item) {
		return JSON.parse(JSON.stringify(item));
	};

	// add an initialisation method
	z.prototype.addInitalisation = function(ref, code) {
		this.inits[ref] = code;
	};

	// initialize a uiModule
	z.prototype.initialize = function(ref) {
		zem.debug('initing ' + ref);
		if(this.inits[ref] && typeof this.inits[ref] === 'function') {
			this.inits[ref]();
		}
	};

	// store a UI module
	z.prototype.UIModule = function(data) {
		zem.debug('add ui module');
		zem.debug(data);
		var module = data.module;
		this.uiModules[module] = data;
	};

	// loop round and init all UI modules
	z.prototype.initUIModules = function() {
		zem.debug('init ui mods');
		zem.debug(this.uiModules);
		var x;
		for(x in this.uiModules) {
			zem.debug(x);
			this.uiModules[x].init();
		}
	};

	window.z = new z();

}();
