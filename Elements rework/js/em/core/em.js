(function($){

	'use strict';

	function Elemets() {
		var scope = this;
		scope.$dom = $(document);
		scope.click = 'click';
		scope.onReady = scope.onTouch = false;
		scope.uiModules = {};
		scope.inits = {};
	}

	// initialize em
	Elemets.prototype.init = function() {
		this.debug('ignition');
		// init UI modules
		this.initUIModules();

		var scope = this;

		// call ready() code when dom is ready
		this.$dom.ready(function() {
			if(scope.onReady) {
				scope.onReady();
			}

			// call touch() callback if applicable
			if(Modernizr.touch && scope.onTouch) {
				scope.onTouch();
			}
		});
	};

	// public helper - set em ready callback
	Elemets.prototype.ready = function(code) {
		if(code && typeof code === 'function') {
			this.onReady = code;
		}
	};

	// public helper - set touch callback
	Elemets.prototype.touch = function(code) {
		if(code && typeof code === 'function') {
			this.onTouch = code;
		}
	};

	// public helper - return debuggin object including uiModules object
	Elemets.prototype.debuggin = function() {
		return {
			$dom: this.$dom,
			uiModules: this.uiModules,
			click: this.click
		};
	};

	// grab attribute value, testing data- gumby- and no prefix
	Elemets.prototype.selectAttr = function() {
		var i = 0;

		// any number of attributes can be passed
		for(; i < arguments.length; i++) {
			// various formats
			var attr = arguments[i],
				dataAttr = 'data-'+arguments[i],
				EmAttr = 'em-'+arguments[i];

			// first test for data-attr
			if(this.attr(dataAttr)) {
				return this.attr(dataAttr);

			// next test for em-attr
			} else if(this.attr(EmAttr)) {
				return this.attr(EmAttr);

			// finally no prefix
			} else if(this.attr(attr)) {
				return this.attr(attr);
			}
		}

		// none found
		return false;
	};

  Elemets.settings = {
      status: true,
      show_output: false,
      output: '<div id="output" class="output" style="background-color: #fbfbd5;border: solid 1px #ffdc7f;padding:10px;position: absolute;top: 50px;left: 50px;z-index:99999;"></div>'
  };
  Elemets.prototype.log = function (message) {
      console.log(message);
  };
  Elemets.prototype.debug = function (message) {
      if (Elemets.settings.status) {
          console.log(message);
          if(Elemets.settings.show_output && !$('.output').length){
              $('body').prepend(Elemets.settings.output);
          }
      }
  };
  Elemets.prototype.debug_all = function (messages) {
      if (Elemets.settings.status) {
          var item;
          for(item in arguments) {
              console.log(arguments[item]);
          }
          if(Elemets.settings.show_output && !$('.output').length){
              $('body').prepend(Elemets.settings.output);
          }
      }
  };

	// 
	Elemets.prototype.cla = function(item) {
		return item.slice(1);
	};
	// 
	Elemets.prototype.sel = function(item) {
		return item.slice(1);
	};
	// 
	Elemets.prototype.cloneData = function(item) {
		return JSON.parse(JSON.stringify(item));
	};
	// 
	Elemets.prototype.testDataAttr = function(element, options, what){
		if(element.data(what) !== undefined){
			options[what] = element.data(what);
			return element.data(what);
		}else{
			return options[what];
		}
	};
	// 
	Elemets.prototype.updateOptions = function(element, options){
		var x;
		for(x in options) {
			this.testDataAttr (element, options, x);
		}
		//this.init(element, options);	
	};
	// add an initialisation method
	Elemets.prototype.addInitalisation = function(ref, code) {
		this.inits[ref] = code;
	};

	// initialize a uiModule
	Elemets.prototype.initialize = function(ref) {
		this.debug('initing ' + ref);
		if(this.inits[ref] && typeof this.inits[ref] === 'function') {
			this.inits[ref]();
		}
	};

	// store a UI module
	Elemets.prototype.UIModule = function(data) {
		this.debug('add ui module');
		this.debug(data);
		var module = data.module;
		this.uiModules[module] = data;
	};

	// loop round and init all UI modules
	Elemets.prototype.initUIModules = function() {
		this.debug('init ui mods');
		this.debug(this.uiModules);
		var x;
		for(x in this.uiModules) {
			this.debug(x);
			this.uiModules[x].init();
		}
	};

	window.em = new Elemets();

})(jQuery);
