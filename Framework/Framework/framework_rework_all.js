/************************************************************
Start Framework Script		
************************************************************/
jQuery(document).ready(function()
{
	ldc=new framework();
	ldc.start_all();
});
function framework()
{                        
    this.init = function(new_defaults){
        alert(new_defaults.widgets.slider.width);
    }
	/*Start Global Variables*/	
	var full_list = ["overlay","slider","externalLinks","toggles","inline_errors", "sorter"];
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
		this.sorter=function()
		{
			//this.welcome('sorter');	
			//this.init();
			/*Start Sorter*/
				/*Start Public*/
				this.start_sort=function()
				{
					this.say('hi from sorting');
				}
				/*End Public*/
				/*Start Private*/
				var start_sort = function() {
				}
				start_sort();
				/*End Private*/
			/*End Sorter*/
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
/************************************************************
End Framework Script		
************************************************************/