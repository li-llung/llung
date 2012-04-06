/************************************************************
Minimum Javascript Framework Requirements: Jquery 1.4.1		
************************************************************/  	

/********************************************************	
--Basic Slider Model--
Slider - Container
	Slider Controls - Controls Container
		Slider - Each Control
	Slider content - Slide Container with Overflow
		Slide Inner - Slide Container
			Slide - Each Slide
********************************************************/		
	
$(document).ready(function() {
	simpleSlider = new simpleSliderClass();
});
function simpleSliderClass() {
	this.start = function(){
		var new_defaults = {}
		simpleSlider.set_defaults(new_defaults);
	}
	this.start_with_options = function(new_defaults){
		simpleSlider.set_defaults(new_defaults);
	}
	this.set_defaults = function(new_defaults){
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
		master_count = (master_loop_count * $(".slide").length);

			
		if(master_direction == "horizontal"){
			master_inner_name = 'slider_inner'
			$("#slider_inner").attr('id','slider_inner');
			$("#slider_inner").attr('class','slider_inner');
		}else{
			master_inner_name = 'slider_inner_vert'
			$("#slider_inner").attr('id','slider_inner_vert');
			$("#slider_inner_vert").attr('class','slider_inner_vert');
		}
		
		$("#slide_holder").attr('id','slide_holder_1');
		$("#slide_holder_1").attr('class','slide_holder');
		$("#slide_holder_1").attr('lang','1');
		
		var i = 2;
		for (i=2;i<=master_loop_count;i++)
		{
			$(".slide_holder").clone().insertAfter($('.slide_holder').last()).attr('id','slide_holder_' + i).attr('lang', i);			
		}
		var slider_interval = 0;
		var count = 1;
		var slide_id = '';
		var new_width ='';
		
		var start = function(){
	    	if(master_debug == true){alert('starting!');}
			var left_status = "go";
			
			if(count <= master_count){
				master_slider_name.each(function(el, index) {
					if($(this).hasClass(master_class_name) && left_status == "go")
					{
						if(count != master_count){
							if(master_direction == 'horizontal'){
								animate('forward');
							}else{
								animate('down');					
							}
							$(this).removeClass(master_class_name);
							$(this).next("." + master_single_control).addClass(master_class_name);
						}else{
							$('.slider').last().addClass('end');						
						}
						slide_id = $(this).attr('lang');
						var txtstring = $('.slide').last().attr('id');
						var txt = /slide_(\d+)/;
						txtstring.match(txt)
						var new_number = RegExp.$1;
						var new_id = (Number(new_number) + Number(1));
						if(master_direction == 'horizontal'){
							new_width = (Number($("#" + master_inner_name).width()) + Number(master_width));	
							$("#" + master_inner_name).css('width', new_width);
						}
						$(this).attr('lang', Number(count));
						left_status = "stop";
					}
				})	
				count += 1;		
			}else{
				clearInterval ( slider_interval );
			}
	    }
		var stop = function(){		
	    	if(master_debug == true){alert('stopping!');}
	    	clearInterval ( slider_interval );
		}
		var resume = function(){	
	    	if(master_debug == true){alert('resuming!');}
	    	init();
		}
		var init = function() {
	    	if(master_debug == true){alert('initing!');}
			if(master_auto_play == true){
			    slider_interval = setInterval ( start, master_delay );			
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
					clearInterval ( slider_interval );
					$(this).addClass(master_class_name);
					animate_to($(this).attr('lang'));
				});	
				control_id += 1;
			})
			$("."+master_single_slide).each(function(el, index) {
				$(this).attr('id', 'slide_' + slide_id);
				slide_id += 1;
			})
			if($("#step_forward")){
				$("#step_forward").click(function() {
					var finish_line = check_end();
					clearInterval ( slider_interval );
					if(finish_line == true){
						
					}else{
						if(master_direction=="horizontal"){
							animate('forward');
						}else{
							animate('down');
						}
					}
				})			
			}
			if($("#step_back")){
				$("#step_back").click(function() {
					var starting_line = check_start();
					clearInterval ( slider_interval );
					if(check_start() == 0 || check_start() == "0px"){
						
					}else{
						if(master_direction=="horizontal"){
							animate('back');
						}else{
							animate('up');
						}
					}
				})			
			}
			if($("#stop")){
				$("#stop").click(function() {		
					stop();
				});			
			}
			if($("#resume")){
				$("#resume").click(function() {		
					resume();
				});
			}
		}
		var move_control = function(direction){
	    	if(master_debug == true){alert('moving control!');}			
			var left_status = "go";			
			master_slider_name.each(function(el, index) {
				if($(this).hasClass(master_class_name) && left_status == "go")
				{
					if($(this).hasClass('end')){
						$(this).removeClass(master_class_name);		
						if(direction == "forward" || direction == "down"){	
							$(this).next("." + master_single_control).addClass(master_class_name);
						}else if(direction == "back" || direction == "up")	{
							$(this).prev("." + master_single_control).addClass(master_class_name);
						}	
					}else{
						if($(this).attr('id')==master_slider_name.last().attr('id')){
							master_slider_name.first().addClass(master_class_name);
							$(this).removeClass(master_class_name);	
						}else{
							$(this).removeClass(master_class_name);		
							if(direction == "forward" || direction == "down"){	
								$(this).next("." + master_single_control).addClass(master_class_name);
							}else if(direction == "back" || direction == "up")	{
								$(this).prev("." + master_single_control).addClass(master_class_name);
							}	
						}	
					}
					left_status = "stop";
				}
			})		
		}
	    var animate = function(direction){
	    	if(master_debug == true){alert('animating!');}			
			var left_status = "go";
			master_slider_name.each(function(el, index) {
				if($(this).hasClass(master_class_name) && left_status == "go")
				{
					move_control(direction);
					if(direction=="forward"){
						forward();
					}else if(direction=="back"){
						back();
					}else if(direction=="up"){
						up();
					}else if(direction=="down"){
						down();
					}
					left_status = "stop";	
				}
			})
	    }
	    var check_start = function (){
	    	if(master_debug == true){alert('checking start!');}	   
			var start = $("#" + master_inner_name).css('left');
			if(start=="0px" || start==0){
				if(master_debug == true){alert('start line!');}
			}else{
				if(master_debug == true){alert('not start line!');}
			}
			return start;
	    }
	    var check_end = function (){
	    	if(master_debug == true){alert('checking end!');}	   	
			var left_status = "go";
			master_slider_name.each(function(el, index) {
				if($(this).hasClass(master_class_name) && left_status == "go")
				{
					if($(this).hasClass('end')){
						if(master_debug == true){alert('finish line!');}
						finish = true;
					}else{
						if(master_debug == true){alert('not finish line!');}
						finish = false;
					}
					left_status = "stop";	
				}
			})
			return finish;
	    }
	    var animate_to = function(slide_number){
	    	if(master_debug == true){alert('animate to');}
	    	var animate_left = -((slide_number * master_width)-master_width);
			var animate_top = -((slide_number * master_height)-master_height);
			if(master_direction == 'horizontal'){
		   		$("#" + master_inner_name).animate({ 
			    	left: animate_left
			    }, master_speed );
			}else{
		   		$("#" + master_inner_name).animate({ 
			    	top: animate_top
			    }, master_speed );
			}
	    }
	    var up = function(){
	    	if(master_debug == true){alert('going up!');} 
			$("#" + master_inner_name).animate({ 
				top: '+='+ master_height
			}, master_speed );
	    }
	    var down = function(){   
	    	if(master_debug == true){alert('going down!');} 
			$("#" + master_inner_name).animate({ 
				top: '-='+ master_height
			}, master_speed );
	    }
	    var forward = function(){
	    	if(master_debug == true){alert('forward ho!');}
			$("#" + master_inner_name).animate({ 
				left: '-='+ master_width
			}, master_speed );
	    }
	    var back = function(){
	    	if(master_debug == true){alert('backward ho!');}
			$("#" + master_inner_name).animate({ 
				left: '+='+ master_width
			}, master_speed );
	    }
	    init();
	}
}