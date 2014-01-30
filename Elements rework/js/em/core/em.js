(function($){

	'use strict';

	function Em() {
		var scope = this;
		scope.$dom = $(document);
		scope.click = 'click';
		scope.onReady = scope.onTouch = false;
		scope.uiModules = {};
		scope.inits = {};
	}

	// initialize Em
	Em.prototype.init = function() {
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

	// public helper - set Em ready callback
	Em.prototype.ready = function(code) {
		if(code && typeof code === 'function') {
			this.onReady = code;
		}
	};

	// public helper - set touch callback
	Em.prototype.touch = function(code) {
		if(code && typeof code === 'function') {
			this.onTouch = code;
		}
	};

	// public helper - return debuggin object including uiModules object
	Em.prototype.debuggin = function() {
		return {
			$dom: this.$dom,
			uiModules: this.uiModules,
			click: this.click
		};
	};

	// grab attribute value, testing data- gumby- and no prefix
	Em.prototype.selectAttr = function() {
		var i = 0;

		// any number of attributes can be passed
		for(; i < arguments.length; i++) {
			// various formats
			var attr = arguments[i],
				dataAttr = 'data-'+arguments[i],
				gumbyAttr = 'Em-'+arguments[i];

			// first test for data-attr
			if(this.attr(dataAttr)) {
				return this.attr(dataAttr);

			// next test for Em-attr
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

  Em.settings = {
      status: true,
      show_output: true,
      output: '<div id="output" class="output" style="background-color: #fbfbd5;border: solid 1px #ffdc7f;padding:10px;position: absolute;top: 50px;left: 50px;z-index:99999;"></div>'
  };
  Em.prototype.log = function (message) {
      console.log(message);
  };
  Em.prototype.debug = function (message) {
      if (Em.settings.status) {
          console.log(message);
          if(Em.settings.show_output && !$('.output').length){
              $('body').prepend(Em.settings.output);
          }
      }
  };
  Em.prototype.debug_all = function (messages) {
      if (Em.settings.status) {
          var itEm;
          for(itEm in arguments) {
              console.log(arguments[itEm]);
          }
          if(Em.settings.show_output && !$('.output').length){
              $('body').prepend(Em.settings.output);
          }
      }
  };

	// 
	Em.prototype.cla = function(itEm) {
		return itEm.slice(1);
	};
	// 
	Em.prototype.sel = function(itEm) {
		return itEm.slice(1);
	};
	// 
	Em.prototype.cloneData = function(itEm) {
		return JSON.parse(JSON.stringify(itEm));
	};
	// 
	Em.prototype.testDataAttr = function(elEment, options, what){
		if(elEment.data(what) !== undefined){
			options[what] = elEment.data(what);
			return elEment.data(what);
		}else{
			return options[what];
		}
	};
	// 
	Em.prototype.updateOptions = function(elEment, options){
		var x;
		for(x in options) {
			this.testDataAttr (elEment, options, x);
		}
		//this.init(elEment, options);	
	};
	// add an initialisation method
	Em.prototype.addInitalisation = function(ref, code) {
		this.inits[ref] = code;
	};

	// initialize a uiModule
	Em.prototype.initialize = function(ref) {
		this.debug('initing ' + ref);
		if(this.inits[ref] && typeof this.inits[ref] === 'function') {
			this.inits[ref]();
		}
	};

	// store a UI module
	Em.prototype.UIModule = function(data) {
		this.debug('add ui module');
		this.debug(data);
		var module = data.module;
		this.uiModules[module] = data;
	};

	// loop round and init all UI modules
	Em.prototype.initUIModules = function() {
		this.debug('init ui mods');
		this.debug(this.uiModules);
		var x;
		for(x in this.uiModules) {
			this.debug(x);
			this.uiModules[x].init();
		}
	};

	window.Em = new Em();

})(jQuery);
