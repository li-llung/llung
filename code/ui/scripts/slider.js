/************************************
Minimum Javascript Framework Requirements: Jquery 1.4.1		
************************************/  	
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
		master_slide_timer = new_defaults.slide_timer == undefined ? 1000 : new_defaults.slide_timer;
		master_auto_play = new_defaults.auto_play == undefined ? true : new_defaults.auto_play;
		master_slider_control_start = new_defaults.slider_control_start == undefined ? 1 : new_defaults.slider_control_start;
		master_slider_start = new_defaults.slider_start == undefined ? 1 : new_defaults.slider_start;
		master_debug = new_defaults.debug == undefined ? false : new_defaults.debug;
		master_slide_name = new_defaults.slide_name == undefined ? $('div.slider_controls a.slider') : new_defaults.slide_name;
		master_class_name = new_defaults.class_name == undefined ? 'thisFeature' : new_defaults.class_name;
		//master_inner_name = new_defaults.inner_name == undefined ? 'slider_inner' : new_defaults.inner_name;
		master_single_slider = new_defaults.single_slider == undefined ? 'slide' : new_defaults.single_slider;
		master_single_slider_control = new_defaults.single_slider_control == undefined ? 'slider' : new_defaults.single_slider_control;
		master_slider_direction = new_defaults.direction == undefined ? 'hori' : 'vert';
		if(master_slider_direction == "hori"){
			master_inner_name = 'slider_inner'
			slide_direction = 'left';
			$("#slider_inner").attr('id','slider_inner');
			$("#slider_inner").attr('class','slider_inner');
		}else{
			master_inner_name = 'slider_inner_vert'
			slide_direction = 'top';
			$("#slider_inner").attr('id','slider_inner_vert');
			$("#slider_inner_vert").attr('class','slider_inner_vert');
		}
					
		var wooYayIntervalId = 0;
		var start = function(){
	    	if(master_debug == true){alert('start');}
			var left_status = "go";	
			master_slide_name.each(function(el, index) {
				if($(this).hasClass(master_class_name) && left_status == "go")
				{
					if($(this).attr('id')==master_slide_name.last().attr('id')){
						if(slide_direction == 'left'){
							$("#" + master_inner_name).animate({ 
								left: '0'
							}, master_slide_timer );						
						}else{
							$("#" + master_inner_name).animate({ 
								top: '0'
							}, master_slide_timer );						
						}
						master_slide_name.first().addClass(master_class_name);
						$(this).removeClass(master_class_name);	
					}else{
						if(slide_direction == 'left'){
							$("#" + master_inner_name).animate({ 
								left: '-=' + master_width
							}, master_slide_timer );					
						}else{
							$("#" + master_inner_name).animate({ 
								top: '-=' + master_height
							}, master_slide_timer );					
						}
						$(this).removeClass(master_class_name);
						$(this).next("." + master_single_slider_control).addClass(master_class_name);
					}
					left_status = "stop";
				}
			})	
		}
		var stop = function(){
	    	if(master_debug == true){alert('stopping');}
			clearInterval ( wooYayIntervalId );			
		}
		var resume = function(){
	    	if(master_debug == true){alert('resuming');}
	    	init();			
		}
		var init = function() {
	    	if(master_debug == true){alert('init');}
			if(master_auto_play == true){
			    wooYayIntervalId = setInterval ( start, master_delay );			
			}
			var control_id = master_slider_control_start;
			var content_id = master_slider_start;
			
			master_slide_name.each(function(el, index) {
				$(this).attr('id', 'slide_control_' + control_id);
				$(this).attr('lang', control_id);
				$(this).click(function() {		
					master_slide_name.each(function(el, index) {
						$(this).removeClass(master_class_name);
					})
					clearInterval ( wooYayIntervalId );
					$(this).addClass(master_class_name);
					animate(master_inner_name,'1',$(this).attr('lang'));
				});	
				control_id += 1;
			})
			if($("#step_forward")){
				$("#step_forward").click(function() {
					clearInterval ( wooYayIntervalId );
					step_to('forward');
				})			
			}
			if($("#step_back")){
				$("#step_back").click(function() {
					clearInterval ( wooYayIntervalId );
					step_to('back');
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
	    var animate = function(e,duration,what){
	    	if(master_debug == true){alert('animate');}
			if(slide_direction == 'left'){
		   		$("#" + e).animate({ 
			    	left: -((what * master_width)-master_width)
			    }, duration );
			}else{
		   		$("#" + e).animate({ 
			    	top: -((what * master_height)-master_height)
			    }, duration );
			}
	    }	
	    var step_to = function(direction){ 
	    	if(master_debug == true){alert('step_to');}
			var left_status = "go";
			var status = "go";	
			var slide_stop = '';
			if(direction == "forward"){	
				master_slide_name.each(function(el, index) {
					if($(this).hasClass(master_class_name) && left_status == "go")
					{
						if($(this).attr('id')==master_slide_name.last().attr('id')){
							slide_stop = 0;
							master_slide_name.first().addClass(master_class_name);
							$(this).removeClass(master_class_name);	
						}else{
							slide_stop = '-='+ master_width;
							$(this).removeClass(master_class_name);			
							$(this).next("." + master_single_slider_control).addClass(master_class_name);
						}
						left_status = "stop";
					}
				})
				if(slide_direction == 'left'){
					slide_stop = '-='+ master_width;
					$("#" + master_inner_name).animate({ 
						left: slide_stop
					}, master_slide_timer );
				}else{
					slide_stop = '-='+ master_height;
					$("#" + master_inner_name).animate({ 
						top: slide_stop
					}, master_slide_timer );
				}
			}else if(direction == "back"){
				master_slide_name.each(function(el, index) {
					if($(this).hasClass(master_class_name) && status == "go")
					{
						if($(this).attr('id')==master_slide_name.first().attr('id')){
							slide_stop = - ($("." + master_single_slider).last().position().left);
							master_slide_name.last().addClass(master_class_name);
							$(this).removeClass(master_class_name);	
						}else{
							slide_stop = '+='+ master_width;
							$(this).removeClass(master_class_name);			
							$(this).prev("." + master_single_slider_control).addClass(master_class_name);
						}
						status = "stop";
					}
				})
				if(slide_direction == 'left'){
					slide_stop = '-='+ master_width;
					$("#" + master_inner_name).animate({ 
						left: slide_stop
					}, master_slide_timer );
				}else{
					slide_stop = '+='+ master_height;
					$("#" + master_inner_name).animate({ 
						top: slide_stop
					}, master_slide_timer );
				}
			}
	    }
		init();
	}
}