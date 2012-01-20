/************************************************************
Start Framework Script		
************************************************************/
jQuery(document).ready(function()
{
	var el_class;
	var el_text;
	//ldc=new framework();
	//ldc.start_all();
});
function framework()
{
	/*Start Global Variables*/	
	var full_list = ["overlay","slider","externalLinks","toggles","inline_errors", "sorter"];
	/*End Global Variables*/
	
	var framework = this;
		
	/*Start Global Functions*/
		/*Start Private*/	
		var util = {
			stringFormat: function() { var a = arguments; if (a.length == 0) return null; var i = a[0]; for (var b = 1, cnt = a.length; b < cnt; b++) i = i.replace(RegExp("\\{" + (b - 1) + "\\}", "gi"), a[b]); return i; },
			mapA: function(obj, method) { for (var a = 0, cnt = obj.length; a < cnt; a++) method(obj[a], a); },
			mapP: function(obj, method) { for (var key in obj) method(obj[key], key); },
			aIndexOf: function(array, prop, val) { for (var a = 0, cnt = array.length; a < cnt; a++) if (array[a][prop] === val) return a; return -1; },
			aInArray: function(val, array) { if (!array) return -1; for (var a = 0, cnt = array.length; a < cnt; a++) if (array[a] == val) return a; return -1; },
			anyInArray: function(arrayA, arrayB) { if (!arrayA || !arrayB) return false; for (var a = 0, cntA = arrayA.length; a < cntA; a++) for (var b = 0, cntB = arrayB.length; b < cntB; b++) if (arrayA[a] == arrayB[b]) return true; return false; },
			dateToString: function(seconds) { var a = [3600, 60], f = Math.floor, s = seconds, d = function(i) { return i < 10 ? '0' + i : i; }; return [d(f(s / a[0])), d(f((s % a[0]) / a[1])), d(f((s % a[1])))].join(':'); },
			evalJson: function(json) { return ("string" === typeof json) ? (json.length > 2 ? eval(json.charAt(0) != '(' ? '(' + json + ')' : json) : null) : json; },
			truncate: function(input, limit) { var s = input, l = limit; return s && s.length > l ? s.substring(0, l) + '&hellip;' : s; },
			escapeStringForJson: function(input) { return input.replace(/\\/g, '\\\\').replace(/"/g, '\\"'); }
		};
		var clean = function(what){			
			decimal = decimal || ".";
			var regex = new RegExp("[^0-9-" + decimal + "]", ["g"]),
			cleaned = parseFloat(
				("" + what)
				.replace(/\((.*)\)/, "-$1") // replace bracketed values with negatives
				.replace(regex, '')         // strip out any cruft
				.replace(decimal, '.')      // make sure decimal point is standard
				.toLowerCase()
			);
			return cleaned;
		}
		var map = function(obj){
			for(var prop in obj) {
			    if(obj.hasOwnProperty(prop))
			        //alert(obj[prop]);
			        return obj[prop];
			}
		}
		/*End Private*/
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
		this.sorter=function(sort_defaults)
		{
			var master_sort_table=sort_defaults.sort_table==undefined?false:sort_defaults.sort_table;
			var master_sort_content=sort_defaults.sort_content==undefined?false:sort_defaults.sort_content;
			
			var header_count = jQuery(master_sort_table).find("th").length;
									
			//this.welcome('sorter');
			/*Start Sorter*/
				/*Start Public*/
				this.start_sort=function()
				{	
					jQuery(master_sort_table).find("th").each(function(index){
						jQuery(this).click(function(){
							jQuery(master_sort_table).find("th").each(function(index, el){
								jQuery(el).removeClass('active');
								$(this).find("span").addClass('dbl-arrow-gray');
								$(this).find("span").removeClass('dbl-arrow-gray-white');
								$(this).find("span").removeClass('dbl-arrow-white-gray');
							});
							$(this).addClass('active');	
							$(this).find("span").removeClass('dbl-arrow-gray');
							if ($(this).hasClass('visited')){
								if ($(this).text() == el_text){
									//Already been there so sort how it previously was.
									if ($(this).hasClass('up')){
		  								$(this).addClass('down');
										$(this).removeClass('up');
										$(this).addClass('sortdesc');
									  	$(this).removeClass('sortasc');
										$(this).find("span").addClass('dbl-arrow-gray-white');
										$(this).find("span").removeClass('dbl-arrow-white-gray');
										sort(master_sort_content, 'reverse');
									}else{
										$(this).removeClass('down');
										$(this).addClass('up');
										$(this).addClass('sortasc');
										$(this).removeClass('sortdesc');
										$(this).find("span").removeClass('dbl-arrow-gray-white');
										$(this).find("span").addClass('dbl-arrow-white-gray');
										sort(master_sort_content, 'forward');
									}
								}else{
		    						//clicked on the same one so sort it in opposite direction.
		    						if ($(this).hasClass('up')){
										$(this).addClass('up');
										$(this).removeClass('down');
										$(this).addClass('sortasc');
										$(this).removeClass('sortdesc');
										$(this).find("span").removeClass('dbl-arrow-gray-white');
										$(this).find("span").addClass('dbl-arrow-white-gray');
										sort(master_sort_content, 'forward');
									}else{
										$(this).addClass('down');
										$(this).removeClass('up');
										$(this).addClass('sortdesc');
										$(this).removeClass('sortasc');
										$(this).find("span").addClass('dbl-arrow-gray-white');
										$(this).find("span").removeClass('dbl-arrow-white-gray');
										sort(master_sort_content, 'reverse');
			    					}
								}
							}else{
		    					//Never been there before.
		    					$(this).addClass('up');
								$(this).removeClass('down');
								$(this).addClass('sortasc');
								$(this).removeClass('sortdesc');
								$(this).addClass('visited');
								$(this).find("span").removeClass('dbl-arrow-gray-white');
								$(this).find("span").addClass('dbl-arrow-white-gray');
								sort(master_sort_content, 'forward');
							} 	
							el_class = $(this).attr('class');
							el_text = $(this).text();
						});
					});
					render();
				}
				/*End Public*/
				/*Start Private*/
				var sort = function(array, direction){
					if(direction=="up"){
						array.sort(function(a, b) {							
							alert('a' + a);							
							alert('b' + b);
							if (a === undefined || b === undefined)
								return 0;
							var i =0;
							for (i=0;i<=array.length;i++){
								if (isNaN(a)){
									alert('nan ' + a);
									return a;
								}else{
									alert('is ' + a);
									return clean(a);
								}
							}
							return 0;
						});
					}else{
						array.reverse(function(a,b) {
							if (isNaN(a)){
								return a;
							}else{
								return clean(a);
							}
						});
					}
					render();
				}
				var render = function(){
					var html = '';
					
					var items;					
					var i=0;
					for (i=0;i<=header_count;i++)
					{
					    items+="<td>{"+i+"}</td>";
					}					
					var template = {
						item: "<tr>" + items + "</tr>"
					};
					//util.mapA(data.courses, function(i) {
					var obj = data.courses;
					for (var course in obj) {
						i = obj[course];
						if (i.course){
							//alert(map(i));
							//alert(clean(i.totalEarningsToDate));
							html += util.stringFormat(
						            template.item,
						            i.rankno,
									i.productid,
									i.course,
									i.courseReleaseDate,
									i.isactive,
									i.tier1Percent,
									i.tier2Percent,
									i.otl_earning,
									i.cd_sales,
									i.cd_rate,   
									i.cd_earning,
									i.total,
									i.prevAccountBalance,
									i.currAccountBalance,
									i.remainingAdvBalance,
									i.currMonthPayment,
									i.advPayment,
									i.totalEarningsToDate,
									i.usagePercent,
									i.revenuePercent,
									i.checkNumber,
									i.totalView,
									i.OTLRoyalties,
									i.OTLRoyaltiesDeke,
									i.OTLRoyaltiesDekeSecondary,
									i.RoyaltiesDekeOther,
									i.currMonthEarnings
						    );
						}
					}
					jQuery(master_sort_table).find("tbody").html(html);	
					//});
				}
				this.start_sort();
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