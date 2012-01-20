/************************************************************
Start Framework Script		
************************************************************/
jQuery(document).ready(function()
{
	if(typeof (window['simpleOverlay'])=='undefined'){
		ldc=new framework();
		ldc.start_all();
		//ldc.start(["welcome","overlay","slider"]);
		simpleSlider = new simpleSliderClass();
		if(navigator.platform=='iPad'||navigator.platform=='iPhone'||navigator.platform=='iPod')
		{
			jQuery("#modal_bg").css("top", jQuery(window).scrollTop());
		};
		if(typeof (window['simpleOverlay'])=='undefined')
			simpleOverlay=new overlay();
	}
});
function framework()
{
	/*Start Global Variables*/	
	var full_list = ["overlay","slider","externalLinks","toggles","inline_errors"];
	/*End Global Variables*/
		
	/*Start Global Functions*/
		/*Start Public*/
		this.welcome=function(text)
		{
			var final_text = text;
			final_text==undefined ? final_text = "from framework" : text;
			alert('hi '+final_text+'!');
		}
		this.say = function(words){
			alert(words);
		}
		this.speak = function(words){
			jQuery("body").append(words);
		} 
		this.tell = function(who , what){
			jQuery(who).append(what);
		}
		this.yell = function(at){
			jQuery(at).css('text-transform', 'uppercase');
		}
		this.shh = function(at){
			jQuery(at).css('text-transform', 'lowercase');
		}
		this.asyouwere = function(who){
			jQuery(who).removeAttr("style");
		}
		this.getlost = function(who){
			jQuery(who).remove();
		}
		this.slider=function()
		{
			//this.welcome('slider');	
			//this.init();
			/*Start Slider*/
				/*Start Private*/
				var start = function() {
				}
				var stop = function() {
				}
				var resume = function() {
				}
				var init = function() {
				}
				var move_control = function() {
				}
				var animate = function() {
				}
				var check_start = function() {
				}
				var check_end = function() {
				}
				var doneAnimating = function() {
				}
				var animate_to = function() {
				}
				var up = function() {
				}
				var down = function() {
				}
				var forward = function() {
				}
				var back = function() {
				}
				/*End Private*/
			/*End Slider*/
		}
		this.overlay=function()
		{
			//this.welcome('overlay');
			//this.watcher();
			//this.resize();
			//this.scroll();
			/*Start Overlay*/
				/*Start Public*/
				this.show=function()
				{
				}
				/*End Public*/
				/*Start Private*/
				var watcher=function()
				{
				}
				var resize=function()
				{
				}
				var scroll=function()
				{
				}
				var reposition=function()
				{
				}
				var show_certain=function()
				{
				}
				var close=function()
				{
				}
				var close_certain=function()
				{
				}
				/*End Private*/
			/*End Overlay*/
		}
		this.cancel=function(){
			jQuery(".editible").find("li").each(function(){
				jQuery(this).find(".edit").show();
				jQuery(this).removeClass('edit_row');
				jQuery(this).find(".edit_buttons").remove();			
			});
		}
		this.toggles=function(){
			//this.welcome('toggles');	
			/*Start Toggles*/
				/*Start Public*/
				
				/*End Public*/
				/*Start Private*/
				var start_toggles=function(){					
					jQuery(".editible").find("li").each(function(){
						jQuery(this).removeClass('edit_row');
						jQuery(this).mouseenter(function(){
							jQuery(this).addClass('edit_row_highlight');
						});
						jQuery(this).mouseleave(function(){
							jQuery(this).removeClass('edit_row_highlight');
						});
						jQuery(this).find(".edit").click(function(){
							jQuery(".editible").find("li").each(function(){
								jQuery(".edit_buttons").remove();
								jQuery(this).find(".edit").show();
								jQuery(this).removeClass('edit_row');
							});
							jQuery(this).parent().find(".edit").hide();
							jQuery(this).parent().addClass('edit_row');
							jQuery(this).parent().append('<div class="edit_buttons"><a href="#nogo" onclick="ldc.cancel();">cancel</a></div>');
						});
					});
				}
				start_toggles();
				/*End Private*/
			/*End Toggles*/		
		}
		this.inline_errors=function(){
			//this.welcome('inline errors');
			/*Start Public*/
			
			/*End Public*/
			/*Start Private*/
			var start_inline_errors=function(){					
				jQuery(".form").find("input").each(function(){
					jQuery(this).blur(function(){
						if(jQuery(this).val()==""){
							jQuery(this).parent().find(".inline").removeClass("inline_success").addClass("inline_error").html('').append(jQuery(this).parent().find(".inline").attr('lang')).show();							
						}else{
							jQuery(this).parent().find(".inline").removeClass("inline_error").addClass("inline_success").html('').append(jQuery(this).parent().find(".inline").attr('dir')).show();
						}
					});
				});
			}
			start_inline_errors();
			/*End Private*/
		}
		this.tooltips=function(){
			//this.welcome('toggles');
			/*Start Public*/
			
			/*End Public*/
			/*Start Private*/

			/*End Private*/
		}
		this.tabs=function(){
			//this.welcome('toggles');
			/*Start Public*/
			
			/*End Public*/
			/*Start Private*/

			/*End Private*/
		}
		this.convert=function(what,to)
		{
			if(to == 'int'){
    			return (parseInt(what) + 0);				
			}
		}
		this.externalLinks=function() { 
			if (!document.getElementsByTagName) return; 
				var anchors = document.getElementsByTagName("a"); 
				for (var i=0; i<anchors.length; i++) { 
					var anchor = anchors[i]; 
						if (anchor.getAttribute("href") && 
							anchor.getAttribute("rel") == "external") 
							anchor.target = "_blank"; 
				} 
		} 
		this.whatis=function(obj) {
			if ( typeof(obj) == 'object' )
			if (obj.length){
				return 'array';
			} else{
				return 'object';
			} else{
				return typeof(obj);
			}
		}
		this.bookmark=function(url, title){
			if (window.sidebar) // firefox
				window.sidebar.addPanel(title, url, "");
			else if(window.opera && window.print){ // opera
				var elem = document.createElement('a');
				elem.setAttribute('href',url);
				elem.setAttribute('title',title);
				elem.setAttribute('rel','sidebar');
				elem.click();
			} 
			else if(document.all)// ie
				window.external.AddFavorite(url, title);
		}
		this.navigate=function(to)
		{
			return false;
			window.location = to;
		}
		this.roundme=function(num, dec) {
			var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
			return result;
		}
		this.goback=function()
		{
			history.back();	
		}
		this.date=function(){
			var c_currentTime = new Date();
			return c_currentTime;						
		}
		this.time=function(){
			var c_currentTime = new Date();
			var c_miliseconds = c_currentTime.getTime();
			return c_miliseconds;
		}
		/*End Public*/
	/*End Global Functions*/
	/*Start Init functions*/
	this.autostart = function(){
		
	}
	this.start_all=function(){		
		for(var i in full_list)
		{
		  this[full_list[i]]();
		  //return set_defaults(overlay_defaults);
		}
		this.autostart();
		//var overlay_defaults={}
		//return set_defaults(overlay_defaults);
	}
	this.start=function(params){
		for(var i in params)
		{
		  this[params[i]]();
		  //return set_defaults(overlay_defaults);
		}
		this.autostart();
	}
	/*End Init functions*/
}
function simpleSliderClass() {
	this.start = function() {
		var new_defaults = {}
		simpleSlider.set_defaults(new_defaults);
	}
	this.start_with_options = function(new_defaults) {
		simpleSlider.set_defaults(new_defaults);
	}
	this.set_defaults = function(new_defaults) {
		master_width = new_defaults.width == undefined ? 805 : new_defaults.width;
		master_height = new_defaults.height == undefined ? 400 : new_defaults.height;
		master_delay = new_defaults.delay == undefined ? 6000 : new_defaults.delay;
		master_speed = new_defaults.speed == undefined ? 1000 : new_defaults.speed;
		master_auto_play = new_defaults.auto_play == undefined ? true : new_defaults.auto_play;
		master_control_start = new_defaults.control_start == undefined ? 1 : new_defaults.control_start;
		master_slider_start = new_defaults.slider_start == undefined ? 1 : new_defaults.slider_start;
		master_slide_start = new_defaults.slide_start == undefined ? 1 : new_defaults.slide_start;
		master_debug = new_defaults.debug == undefined ? false : new_defaults.debug;
		master_slider_name = new_defaults.slider_name == undefined ? $('div.slider_controls a.slider') : new_defaults.slider_name;
		master_class_name = new_defaults.class_name == undefined ? 'thisFeature' : new_defaults.class_name;
		master_inner_name = new_defaults.inner_name == undefined ? 'slider_inner' : new_defaults.inner_name;
		master_single_slide = new_defaults.single_slide == undefined ? 'slide' : new_defaults.single_slide;
		master_single_control = new_defaults.single_control == undefined ? 'slider' : new_defaults.single_control;
		master_direction = new_defaults.direction == undefined ? 'horizontal' : new_defaults.direction;
		master_type = new_defaults.type == undefined ? 'slider' : new_defaults.fade;
		master_loop = new_defaults.loop == undefined ? true : new_defaults.loop;
		master_loop_count = new_defaults.loop_count == undefined ? '1' : new_defaults.loop_count;
		master_loop_endless = new_defaults.loop_endless == undefined ? false : new_defaults.loop_endless;
		master_count = (master_loop_count * $(".slide").length);

		if (master_direction == "horizontal") {
			master_inner_name = 'slider_inner'
			$("#slider_inner").attr('id', 'slider_inner');
			$("#slider_inner").attr('class', 'slider_inner');
		} else {
			master_inner_name = 'slider_inner_vert'
			$("#slider_inner").attr('id', 'slider_inner_vert');
			$("#slider_inner_vert").attr('class', 'slider_inner_vert');
		}

		$("#slide_holder").attr('id', 'slide_holder_1');
		$("#slide_holder_1").attr('class', 'slide_holder');
		$("#slide_holder_1").attr('lang', '1');

		if (master_loop_endless == true) {
			var i = 2;
			master_loop_count = 100;
			for (i = 2; i <= master_loop_count; i++) {
				$(".slide_holder").clone().insertAfter($('.slide_holder').last()).attr('id', 'slide_holder_' + i).attr('lang', i);
			}
		} else {
			var i = 2;
			for (i = 2; i <= master_loop_count; i++) {
				$(".slide_holder").clone().insertAfter($('.slide_holder').last()).attr('id', 'slide_holder_' + i).attr('lang', i);
			}
		}
		var slider_interval = 0;
		var count = 1;
		var slide_id = '';
		var new_width = '';
		var isAnimating = false; // To prevent scrolling before the beginning or past the end

		var start = function() {
			if (master_debug == true) { alert('starting!'); }
			var left_status = "go";

			if (count <= master_count) {
				master_slider_name.each(function(el, index) {
					if ($(this).hasClass(master_class_name) && left_status == "go") {
						if (count != master_count) {
							if (master_direction == 'horizontal') {
								animate('forward');
							} else {
								animate('down');
							}
							$(this).removeClass(master_class_name);
							$(this).next("." + master_single_control).addClass(master_class_name);
						} else {
							$('.slider').last().addClass('end');
						}
						slide_id = $(this).attr('lang');
						var txtstring = $('.slide').last().attr('id');
						var txt = /slide_(\d+)/;
						txtstring.match(txt)
						var new_number = RegExp.$1;
						var new_id = (Number(new_number) + Number(1));
						if (master_direction == 'horizontal') {
							new_width = (Number($("#" + master_inner_name).width()) + Number(master_width));
							$("#" + master_inner_name).css('width', new_width);
						}
						$(this).attr('lang', Number(count));
						left_status = "stop";
					}
				})
				count += 1;
			} else {
				clearInterval(slider_interval);
			}
		}
		var stop = function() {
			if (master_debug == true) { alert('stopping!'); }
			clearInterval(slider_interval);
		}
		var resume = function() {
			if (master_debug == true) { alert('resuming!'); }
			init();
		}
		var init = function() {
			if (master_debug == true) { alert('initing!'); }
			if (master_auto_play == true) {
				slider_interval = setInterval(start, master_delay);
			}
			var control_id = master_control_start;
			var content_id = master_slider_start;
			var slide_id = master_slide_start;

			master_slider_name.each(function(el, index) {
				$(this).attr('id', 'slide_control_' + control_id);
				$(this).attr('lang', control_id);
				$(this).click(function() {
					master_slider_name.each(function(el, index) {
						$(this).removeClass(master_class_name);
					})
					clearInterval(slider_interval);
					$(this).addClass(master_class_name);
					animate_to($(this).attr('lang'));
				});
				control_id += 1;
			})
			$("." + master_single_slide).each(function(el, index) {
				$(this).attr('id', 'slide_' + slide_id);
				slide_id += 1;
			})
			if ($("#step_forward")) {
				$("#step_forward").click(function() {
					var finish_line = check_end();
					clearInterval(slider_interval);
					if (finish_line == true) {
						//$('#step_forward').addClass('inactive');
						//$('#step_back').removeClass('inactive');
					} else {
						//$('#step_forward').removeClass('inactive');
						//$('#step_back').removeClass('inactive');
						if (master_direction == "horizontal") {
							animate('forward');
						} else {
							animate('down');
						}
					}
				})
			}
			if ($("#step_back")) {
				$("#step_back").click(function() {
					var starting_line = check_start();
					clearInterval(slider_interval);
					if (check_start() == 0 || check_start() == "0px") {
						//$('#step_back').addClass('inactive');		
						//$('#step_forward').removeClass('inactive');				
					} else {
						//$('#step_back').removeClass('inactive');
						//$('#step_forward').removeClass('inactive');
						if (master_direction == "horizontal") {
							animate('back');
						} else {
							animate('up');
						}
					}
				})
			}
			if ($("#stop")) {
				$("#stop").click(function() {
					stop();
				});
			}
			if ($("#resume")) {
				$("#resume").click(function() {
					resume();
				});
			}
		}
		var move_control = function(direction) {
			if (master_debug == true) { alert('moving control!'); }
			var left_status = "go";
			master_slider_name.each(function(el, index) {
				if ($(this).hasClass(master_class_name) && left_status == "go") {
					if ($(this).hasClass('end')) {
						$(this).removeClass(master_class_name);
						if (direction == "forward" || direction == "down") {
							$(this).next("." + master_single_control).addClass(master_class_name);
						} else if (direction == "back" || direction == "up") {
							$(this).prev("." + master_single_control).addClass(master_class_name);
						}
					} else {
						if ($(this).attr('id') == master_slider_name.last().attr('id')) {
							master_slider_name.first().addClass(master_class_name);
							$(this).removeClass(master_class_name);
						} else {
							$(this).removeClass(master_class_name);
							if (direction == "forward" || direction == "down") {
								$(this).next("." + master_single_control).addClass(master_class_name);
							} else if (direction == "back" || direction == "up") {
								$(this).prev("." + master_single_control).addClass(master_class_name);
							}
						}
					}
					left_status = "stop";
				}
			})
		}
		var animate = function(direction) {
			if (master_debug == true) { alert('animating!'); }
			var left_status = "go";
			master_slider_name.each(function(el, index) {
				if ($(this).hasClass(master_class_name) && left_status == "go") {
					move_control(direction);
					if (direction == "forward") {
						forward();
					} else if (direction == "back") {
						back();
					} else if (direction == "up") {
						up();
					} else if (direction == "down") {
						down();
					}
					left_status = "stop";
				}
			})
		}
		var check_start = function() {
			if (master_debug == true) { alert('checking start!'); }
			if (isAnimating) // Do not allow moving if we are animating already
				return 0;
			var start = $("#" + master_inner_name).css('left');
			if (start == "0px" || start == 0) {
				if (master_debug == true) { alert('start line!'); }
				//$('#step_back').addClass('inactive');
			} else {
				if (master_debug == true) { alert('not start line!'); }
				//$('#step_back').removeClass('inactive');
			}
			return start;
		}
		var check_end = function() {
			if (master_debug == true) { alert('checking end!'); }
			if (isAnimating) // Do not allow moving if we are animating already
				return true;
			var left_status = "go";
			master_slider_name.each(function(el, index) {
				if ($(this).hasClass(master_class_name) && left_status == "go") {
					if ($(this).hasClass('end')) {
						if (master_debug == true) { alert('finish line!'); }
						finish = true;
						//$('#step_forward').addClass('inactive');
					} else {
						if (master_debug == true) { alert('not finish line!'); }
						finish = false;
						//$('#step_forward').removeClass('inactive');
					}
					left_status = "stop";
				}
			})
			return finish;
		}
		var doneAnimating = function() {
			isAnimating = false;
		}
		var animate_to = function(slide_number) {
			if (master_debug == true) { alert('animate to'); }
			var animate_left = -((slide_number * master_width) - master_width);
			var animate_top = -((slide_number * master_height) - master_height);
			if (master_direction == 'horizontal') {
				isAnimating = true;
				$("#" + master_inner_name).animate({
					left: animate_left
				}, master_speed, doneAnimating);
			} else {
				isAnimating = true;
				$("#" + master_inner_name).animate({
					top: animate_top
				}, master_speed, doneAnimating);
			}
		}
		var up = function() {
			if (master_debug == true) { alert('going up!'); }
			isAnimating = true;
			$("#" + master_inner_name).animate({
				top: '+=' + master_height
			}, master_speed, doneAnimating);
		}
		var down = function() {
			if (master_debug == true) { alert('going down!'); }
			isAnimating = true;
			$("#" + master_inner_name).animate({
				top: '-=' + master_height
			}, master_speed, doneAnimating);
		}
		var forward = function() {
			if (master_debug == true) { alert('forward ho!'); }
			isAnimating = true;
			$("#" + master_inner_name).animate({
				left: '-=' + master_width
			}, master_speed, doneAnimating);
		}
		var back = function() {
			if (master_debug == true) { alert('backward ho!'); }
			isAnimating = true;
			$("#" + master_inner_name).animate({
				left: '+=' + master_width
			}, master_speed, doneAnimating);
		}
		init();
	}
}
function overlay()
{
	this.start=function()
	{
		var overlay_defaults={}
		return set_defaults(overlay_defaults);
	}
	this.start_with_options=function(overlay_defaults)
	{
		return set_defaults(overlay_defaults);
	}
	this.show=function(e,width,height,title,center)
	{
		if($("#modal_bg").length>0)
		{
			$('#modal_bg').remove();
			$('.overlay_holder').hide();
			$(".error_type").each(function()
			{
				$(this).removeAttr("style");
			});
			$(".overlay_master_content").addClass("overlay_content").show();
			$(".success_message").removeClass("overlay_content").hide();
		}
		var myValues=$('body').width();
		var myWidth=(Number(myValues)-Number(width));
		var myNum=myWidth/2;

		if(center==true)
		{
			var myValuesHeight=$(window).height();
			var myHeight=(Number(myValuesHeight)-Number(height));
			var myNumHeight=myHeight/2;
		}

		$('#modal_bg').attr('display','none');
		$("<div/>",{
			id: "modal_bg",
			css: {
				'width': $(window).width(),
				'height': $(window).height()
			}
		}).appendTo("body");
		$('#modal_bg').fadeTo('fast','0.50');
		if(navigator.platform=='iPad'||navigator.platform=='iPhone'||navigator.platform=='iPod')
		{
			$("#modal_bg").css("top",$(window).scrollTop());
		};
		if($("#overlay_bar").length>0)
		{
			$("#overlay_bar").remove();
			if(title!=""||title!=undefined||title!=null)
			{
				$("<div/>",{
					id: "overlay_bar",
					html: '<h5>'+title+'</h5><a href="#nogo" class="overlay_close"><img src="../../ui/images/enterprise_redesign/ent_re_icon_close.gif" alt=""/></a>'
				}).prependTo("#"+e);
			} else
			{
				$("<div/>",{
					id: "overlay_bar",
					html: '<a href="#nogo" class="overlay_close"><img src="../../ui/images/enterprise_redesign/ent_re_icon_close.gif" alt=""/></a>'
				}).prependTo("#"+e);
			}
		} else
		{
			$("<div/>",{
				id: "overlay_bar",
				html: '<a href="#nogo" class="overlay_close"><img src="../../ui/images/enterprise_redesign/ent_re_icon_close.gif" alt=""/></a>'
			}).prependTo("#"+e);
		}
		$(".overlay_close").click(function()
		{
			$(".main_overlay").fadeOut();
			$("#"+e).fadeOut();
			$('#modal_bg').hide();
		})
		$('#modal_bg').click(function()
		{
			$(".main_overlay").fadeOut();
			$("#"+e).fadeOut();
			$('#modal_bg').hide();
		})
		$('div#errorsOccured').hide();
		$("#"+e).hide();
		$("#"+e).fadeTo("slow",1);
		$("#"+e).show();
		$("#"+e).css('left',myNum);
		$("#"+e).css('width',width);
		if(center==true)
		{
			$("#"+e).css('top',myNumHeight+$(window).scrollTop());
		} else
		{
			$("#"+e).css('top',25+$(window).scrollTop());
		}
		$("#"+e).addClass('main_overlay');
		reset_multi_user_form();
	}
	var set_defaults=function(overlay_defaults)
	{
		var master_overlay_debug=overlay_defaults.debug==undefined?false:overlay_defaults.debug;
		var master_overlay_width=overlay_defaults.width==undefined?'500':overlay_defaults.width;
		var master_overlay_height=overlay_defaults.height==undefined?'400':overlay_defaults.height;
		var master_overlay_element=overlay_defaults.element==undefined?"overlay":overlay_defaults.element;
		var master_overlay_class=overlay_defaults.overlay_class==undefined?".overlay":overlay_defaults.overlay_class;
		var master_overlay_how=overlay_defaults.how==undefined?"fade":overlay_defaults.how;
		var master_overlay_body_close=overlay_defaults.body_close==undefined?true:overlay_defaults.body_close;
		var master_top=overlay_defaults.top==undefined?30:overlay_defaults.top;
		var master_center=overlay_defaults.center==undefined?false:overlay_defaults.center;
		var master_fade_amount=overlay_defaults.fade_amount==undefined?'0.50':overlay_defaults.fade_amount;
		var master_fade_speed=overlay_defaults.fade_speed==undefined?'fast':overlay_defaults.fade_amount;
		var master_overlay_header=overlay_defaults.overlay_header==undefined?false:overlay_defaults.overlay_header;
		var master_overlay_header_content=overlay_defaults.overlay_header_content==undefined?'test':overlay_defaults.overlay_header_content;
		var master_overlay_auto_scroll=overlay_defaults.auto_scroll==undefined?true:overlay_defaults.auto_scroll;

		var watcher=function()
		{
			$(master_overlay_class).each(function()
			{
				$(this).click(function()
				{
					master_overlay_element=$(this).attr('lang');
					show_certain($(this).attr('lang'),$(this).attr('title'));
				})
			});
			$(".overlay_close").click(function()
			{
				$(".main_overlay").fadeOut();
				close();
			})
		}

		var resize=function()
		{
			$(window).resize(function()
			{
				reposition();
			})
		}
		var scroll=function()
		{
			$(window).scroll(function()
			{
				reposition();
			})
		}
		var reposition=function()
		{
			$("#modal_bg").css('width',$(window).width());
			$("#modal_bg").css('height',$(window).height());
			var myValues=$('body').width();
			var myWidth=myValues-master_overlay_width;
			var myNum=myWidth/2;
			$(".overlay_close").click(function()
			{
				$(".main_overlay").fadeOut();
				close();
			})
			if(navigator.platform=='iPad'||navigator.platform=='iPhone'||navigator.platform=='iPod')
			{
				$("#modal_bg").css("top",$(window).scrollTop());
			};
			if(master_overlay_body_close==true)
			{
				$('#modal_bg').click(function()
				{
					$(".main_overlay").fadeOut();
					close();
				})
			}
			if(master_center==true)
			{
				var myValuesHeight=$(window).height();
				var myHeight=(Number(myValuesHeight)-Number(master_overlay_height));
				var myNumHeight=myHeight/2;
			}
			if(master_overlay_how=='fade')
			{
				$("#"+master_overlay_element).css('left',myNum);
				if(master_center==true)
				{
					$("#"+master_overlay_element).css('top',myNumHeight+$(window).scrollTop());
				} else
				{
					$("#"+master_overlay_element).css('top',master_top+$(window).scrollTop());
				}
			} else if(master_overlay_how=='tween')
			{
				if(master_center==true)
				{
					var repo_top=(myNumHeight+$(window).scrollTop());
				} else
				{
					var repo_top=(master_top+$(window).scrollTop());
				}
				$("#"+master_overlay_element).animate({
					left: myNum,
					top: repo_top
				},150);
			}
		}
		var show_certain=function(e,title)
		{
			if($("#modal_bg").length>0)
			{
				$('#modal_bg').remove();
				$('.overlay_holder').hide();
				$(".error_type").each(function()
				{
					$(this).removeAttr("style");
				});
				$(".overlay_master_content").addClass("overlay_content").show();
				$(".success_message").removeClass("overlay_content").hide();
			}
			var myValues=$('body').width();
			var myWidth=(Number(myValues)-Number(master_overlay_width));
			var myNum=myWidth/2;

			if(master_center==true)
			{
				var myValuesHeight=$(window).height();
				var myHeight=(Number(myValuesHeight)-Number(master_overlay_height));
				var myNumHeight=myHeight/2;
			}

			$('#modal_bg').attr('display','none');
			$("<div/>",{
				id: "modal_bg",
				css: {
					'width': $(window).width(),
					'height': $(window).height()
				}
			}).appendTo("body");
			$('#modal_bg').fadeTo(master_fade_speed,master_fade_amount);
			if(navigator.platform=='iPad'||navigator.platform=='iPhone'||navigator.platform=='iPod')
			{
				$("#modal_bg").css("top",$(window).scrollTop());
			};
			if($("#overlay_bar").length>0)
			{
				$("#overlay_bar").remove();
				if(master_overlay_header)
				{
					$("<div/>",{
						id: "overlay_bar",
						html: '<h5>'+title+'</h5><a href="#nogo" class="overlay_close"><img src="../../ui/images/enterprise_redesign/ent_re_icon_close.gif" alt=""/></a>'
					}).prependTo("#"+e);
				} else
				{
					$("<div/>",{
						id: "overlay_bar",
						html: '<a href="#nogo" class="overlay_close"><img src="../../ui/images/enterprise_redesign/ent_re_icon_close.gif" alt=""/></a>'
					}).prependTo("#"+e);
				}
			} else
			{
				$("<div/>",{
					id: "overlay_bar",
					html: '<a href="#nogo" class="overlay_close"><img src="../../ui/images/enterprise_redesign/ent_re_icon_close.gif" alt=""/></a>'
				}).prependTo("#"+e);
			}
			$(".overlay_close").click(function()
			{
				$(".main_overlay").fadeOut();
				close();
			})
			if(master_overlay_body_close==true)
			{
				$('#modal_bg').click(function()
				{
					$(".main_overlay").fadeOut();
					close();
				})
			}
			$('div#errorsOccured').hide();
			if(master_overlay_how=='fade')
			{
				$("#"+e).hide();
				$("#"+e).fadeTo("slow",1);
				$("#"+e).show();
				$("#"+e).css('left',myNum);
				$("#"+e).css('width',master_overlay_width);
				if(master_center==true)
				{
					$("#"+e).css('top',(myNumHeight+$(window).scrollTop()));
				} else
				{
					$("#"+e).css('top',master_top+$(window).scrollTop());
				}
			} else if(master_overlay_how=='tween')
			{
				$("#"+e).css('opacity','1');
				$("#"+e).css('width','1px');
				$("#"+e).css('height','1px');
				$("#"+e).css('overflow','hidden');
				$("#"+e).hide();
				$("#"+e).css('left',myNum);
				if(master_center==true)
				{
					$("#"+e).css('top',myNumHeight);
				} else
				{
					$("#"+e).css('top',master_top+$(window).scrollTop());
				}
				$("#"+e).css('overflow','visible');
				$("#"+e).animate({
					width: master_overlay_width,
					height: master_overlay_height
				},1000);
			}
			$("#"+e).addClass('main_overlay');
			reset_multi_user_form();
		}
		var close=function()
		{
			if(master_overlay_debug==true) { alert('closing!'); }
			if(master_overlay_how=='fade')
			{
				if(master_overlay_debug==true) { alert('fade out!'); }
				$("#"+master_overlay_element).fadeOut();
			} else if(master_overlay_how=='tween')
			{
				if(master_overlay_debug==true) { alert('tween!'); }
				$("#"+master_overlay_element).fadeOut();
			}
			$('#modal_bg').hide();
		}
		var close_certain=function(e)
		{
			if(master_overlay_debug==true) { alert('closing!'); }
			if(master_overlay_how=='fade')
			{
				if(master_overlay_debug==true) { alert('fade out!'); }
				$("#"+e).fadeOut();
			} else if(master_overlay_how=='tween')
			{
				if(master_overlay_debug==true) { alert('tween!'); }
				$("#"+e).fadeOut();
			}
			$('#modal_bg').hide();
		}
		watcher();
		resize();
		if(master_overlay_auto_scroll==true)
		{
			scroll();
		}
	}
}
/************************************************************
End Framework Script		
************************************************************/