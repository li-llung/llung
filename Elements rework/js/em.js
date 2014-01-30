!function() {

	'use strict';

	function em() {
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

	// initialize em
	em.prototype.init = function() {
		//em.debug('ignition');
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

	// public helper - set em ready callback
	em.prototype.ready = function(code) {
		if(code && typeof code === 'function') {
			this.onReady = code;
		}
	};

	// public helper - set oldie callback
	em.prototype.oldie = function(code) {
		if(code && typeof code === 'function') {
			this.onOldie = code;
		}
	};

	// public helper - set touch callback
	em.prototype.touch = function(code) {
		if(code && typeof code === 'function') {
			this.onTouch = code;
		}
	};

	// public helper - return debuggin object including uiModules object
	em.prototype.debuggin = function() {
		return {
			$dom: this.$dom,
			isOldie: this.isOldie,
			uiModules: this.uiModules,
			click: this.click
		};
	};

	// grab attribute value, testing data- gumby- and no prefix
	em.prototype.selectAttr = function() {
		var i = 0;

		// any number of attributes can be passed
		for(; i < arguments.length; i++) {
			// various formats
			var attr = arguments[i],
				dataAttr = 'data-'+arguments[i],
				gumbyAttr = 'em-'+arguments[i];

			// first test for data-attr
			if(this.attr(dataAttr)) {
				return this.attr(dataAttr);

			// next test for em-attr
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
	em.prototype.cla = function(item) {
		return item.slice(1);
	};
	// 
	em.prototype.sel = function(item) {
		return item.slice(1);
	};
	// 
	em.prototype.cloneData = function(item) {
		return JSON.parse(JSON.stringify(item));
	};
	// 
	em.prototype.testDataAttr = function(element, options, what){
		if(element.data(what) !== undefined){
	        options[what] = element.data(what);
			return element.data(what);
		}else{
			return options[what]
		}
	};
	// 
	em.prototype.updateOptions = function(element, options){
		var x;
		for(x in options) {
			this.testDataAttr (element, options, x);
		}
		//this.init(element, options);	
	};
	// add an initialisation method
	em.prototype.addInitalisation = function(ref, code) {
		this.inits[ref] = code;
	};

	// initialize a uiModule
	em.prototype.initialize = function(ref) {
		//em.debug('initing ' + ref);
		if(this.inits[ref] && typeof this.inits[ref] === 'function') {
			this.inits[ref]();
		}
	};

	// store a UI module
	em.prototype.UIModule = function(data) {
		//em.debug('add ui module');
		//em.debug(data);
		var module = data.module;
		this.uiModules[module] = data;
	};

	// loop round and init all UI modules
	em.prototype.initUIModules = function() {
		//em.debug('init ui mods');
		//em.debug(this.uiModules);
		var x;
		for(x in this.uiModules) {
			//em.debug(x);
			this.uiModules[x].init();
		}
	};

	window.em = new em();

}();
