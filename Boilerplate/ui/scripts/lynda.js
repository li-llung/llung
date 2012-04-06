// JScript File
// ------------------------------------------------------------------
// formatDate (date_object, format)
// Returns a date in the output format specified.
// The format string uses the same abbreviations as in getDateFromFormat()
// ------------------------------------------------------------------
function formatDate(date,format) {
	format=format+"";
	var result="";
	var i_format=0;
	var c="";
	var token="";
	var y=date.getYear()+"";
	var M=date.getMonth()+1;
	var d=date.getDate();
	var E=date.getDay();
	var H=date.getHours();
	var m=date.getMinutes();
	var s=date.getSeconds();
	var yyyy,yy,MMM,MM,dd,hh,h,mm,ss,ampm,HH,H,KK,K,kk,k;
	// Convert real date parts into formatted versions
	var value=new Object();
	if (y.length < 4) {y=""+(y-0+1900);}
	value["y"]=""+y;
	value["yyyy"]=y;
	value["yy"]=y.substring(2,4);
	value["M"]=M;
	value["MM"]=LZ(M);
	value["MMM"]=MONTH_NAMES[M-1];
	value["NNN"]=MONTH_NAMES[M+11];
	value["d"]=d;
	value["dd"]=LZ(d);
	value["E"]=DAY_NAMES[E+7];
	value["EE"]=DAY_NAMES[E];
	value["H"]=H;
	value["HH"]=LZ(H);
	if (H==0){value["h"]=12;}
	else if (H>12){value["h"]=H-12;}
	else {value["h"]=H;}
	value["hh"]=LZ(value["h"]);
	if (H>11){value["K"]=H-12;} else {value["K"]=H;}
	value["k"]=H+1;
	value["KK"]=LZ(value["K"]);
	value["kk"]=LZ(value["k"]);
	if (H > 11) { value["a"]="PM"; }
	else { value["a"]="AM"; }
	value["m"]=m;
	value["mm"]=LZ(m);
	value["s"]=s;
	value["ss"]=LZ(s);
	while (i_format < format.length) {
		c=format.charAt(i_format);
		token="";
		while ((format.charAt(i_format)==c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
			}
		if (value[token] != null) { result=result + value[token]; }
		else { result=result + token; }
		}
	return result;
	};
var MONTH_NAMES=new Array('January','February','March','April','May','June','July','August','September','October','November','December','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
var DAY_NAMES=new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sun','Mon','Tue','Wed','Thu','Fri','Sat');
function LZ(x) {return(x<0||x>9?"":"0")+x};
function isAlphaNumeric(content){
    var regexNum = /\d/;
    var regexLetter = /[a-zA-z]/;
    if(!regexNum.test(content) || !regexLetter.test(content))
        return false;

    return true;
};
function isAlpha(content){
    var regexLetter = /[a-zA-z]/;
    if(!regexLetter.test(content))
        return false;

    return true;
};
function isNumeric(content){
    var regexNum = /^\d+$/;
    if(!regexNum.test(content))
        return false;

    return true;
};
function isValidEmail(emailAddress) {  
     var emailReg = "^[\\w-_\.+]*[\\w-_\.]\@([\\w-]+\\.)+[\\w]+[\\w]$";
     var regex = new RegExp(emailReg); 
     return regex.test(emailAddress);
};
function isValidDate(dateStr, format) {
     if (format == null) { format = "MDY"; }
     format = format.toUpperCase();
     if (format.length != 3) { format = "MDY"; }
     if ((format.indexOf("M") == -1) || (format.indexOf("D") == -1) || 
      (format.indexOf("Y") == -1)) { format = "MDY"; }
     if (format.substring(0, 1) == "Y") { // If the year is first
         var reg1 = /^\d{2}(\-|\/|\.)\d{1,2}\1\d{1,2}$/
         var reg2 = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/
     } else if (format.substring(1, 2) == "Y") { // If the year is second
         var reg1 = /^\d{1,2}(\-|\/|\.)\d{2}\1\d{1,2}$/
         var reg2 = /^\d{1,2}(\-|\/|\.)\d{4}\1\d{1,2}$/
     } else { // The year must be third
         var reg1 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{2}$/
         var reg2 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/
     }
     // If it doesn't conform to the right format (with either a 2 digit year or 4 digit year), fail
     if ((reg1.test(dateStr) == false) && (reg2.test(dateStr) == false)) { return false; }
     var parts = dateStr.split(RegExp.$1); // Split into 3 parts based on what the divider was
     // Check to see if the 3 parts end up making a valid date
     if (format.substring(0, 1) == "M") { var mm = parts[0]; } else 
     if (format.substring(1, 2) == "M") { var mm = parts[1]; } else { var mm = parts[2]; }
     if (format.substring(0, 1) == "D") { var dd = parts[0]; } else 
     if (format.substring(1, 2) == "D") { var dd = parts[1]; } else { var dd = parts[2]; }
     if (format.substring(0, 1) == "Y") { var yy = parts[0]; } else 
     if (format.substring(1, 2) == "Y") { var yy = parts[1]; } else { var yy = parts[2]; }
     if (parseFloat(yy) <= 50) { yy = (parseFloat(yy) + 2000).toString(); }
     if (parseFloat(yy) <= 99) { yy = (parseFloat(yy) + 1900).toString(); }
     var dt = new Date(parseFloat(yy), parseFloat(mm) - 1, parseFloat(dd), 0, 0, 0, 0);
     if (parseFloat(dd) != dt.getDate()) { return false; }
     if (parseFloat(mm) - 1 != dt.getMonth()) { return false; }
     return true;
 };
function removeSpaces(string) 
{
	var tstring = "";
	string = '' + string;
	splitstring = string.split(" ");
	for(i = 0; i < splitstring.length; i++)
	tstring += splitstring[i];
	
	return tstring;
}

// used in registration 
function SetAmmount(val) 
{
    var objName = "" + "lblChosenSubscription"; 
    var obj = document.getElementById(objName); 
    if (obj == null )
        return; 
    obj.innerHtml = val; 
}
function humanSpoofing(sender, validator)
{       
        validator.IsValid = true;
        if (gebid('txtHV').value == "")
        {
            validator.IsValid = false;   
        }
        else    
        {
            validator.IsValid = gebid('hdIsCaptchaValid').value;
        }
}

function checkTermsAndCond(val, args) 
{
    args.IsValid = true;
    if (gebid('chkTerms') != null)
    {
        if (gebid('chkTerms').checked != true)
        {
            args.IsValid = false;
        }
    }
    else
    {//in case chk is inside a control then a variable chkTerms needs to be inserted into client script with the full name of the control.
        if (gebid(chkTerms).checked != true)
        {
            args.IsValid = false;
        }
    }
}

function checkSelectSubscription(val, args) 
{
    args.IsValid = true;
    if ( gebid(chkSubscriptions) != null && gebid(chkSubscriptionForEducators) != null 
        && gebid(chkSubscriptionForCompanies) != null && gebid(chkSelectCoursesSubscription) != null )
    {
        if (gebid(chkSubscriptions).checked != true)
        {
            if (gebid(chkSubscriptionForEducators).checked != true )
            {
                if (gebid(chkSubscriptionForCompanies).checked != true )
                {
                    if (gebid(chkSelectCoursesSubscription).checked != true )
                    {
                        args.IsValid = false;
                    }
                }
            }
        }
    }
}


function checkAccept(val, args) 
{
    args.IsValid = true;
    if (gebid('cbxAccept').checked != true)
    {
           args.IsValid = false;   
    }             
}

function tour_goto(menutour)
{

    selecteditem = menutour.ddlNewtour.selectedIndex ;
    ddlNewtour = menutour.ddlNewtour.options[ selecteditem ].value ;
    if (ddlNewtour.length != 0) {
        window.name = "ldc";
        window.open(ddlNewtour, 'tours', 'width=480, height=320')
    }
}

function video_goto( menuvid )
{
    selecteditem = menuvid.ddlVideoTours.selectedIndex ;
    ddlVideoTours = menuvid.ddlVideoTours.options[ selecteditem ].value ;
    if (ddlVideoTours.length != 0) {
        window.name = "ldc";
        window.open(ddlVideoTours, 'testimonials', 'width=480, height=318')
    }
}

 function joinNow()
{
    window.open('../home/registration/ConsumerRegistrationStep1.aspx', 'ldc')
    window.close();
}

function setToIPValue(fromIPId, toIPId)
{
    document.getElementById(toIPId).focus();
    document.getElementById(toIPId).value = document.getElementById(fromIPId).value;
}

function showwindow_nonmember(url,width,height){
    var left = (screen.width/2)-(width/2);
    objMovieWindow=window.open(url, "trailers", "width=" + width + ", height=" + height + ", top=0, left="+left+", scrollbars=false"); 
    objMovieWindow.focus();
};

function showwindow_centered(url,width,height){
    var left = (screen.width/2)-(width/2);
    objMovieWindow=window.open(url, "popup", "width=" + width + ", height=" + height + ", top=0, left="+left+", scrollbars=false"); 
    objMovieWindow.focus();
};

/* Client-side access to querystring name=value pairs Version 1.3 28 May 2008 License (Simplified BSD): http://adamv.com/dev/javascript/qslicense.txt */
function Querystring(qs)
{
	this.params = {};
	if(qs == null)
		qs = location.search.substring(1, location.search.length);
	if(qs.length == 0)
		return;
	qs = qs.replace(/\+/g, ' ');
	var args = qs.split('&');
	for (var i = 0; i < args.length; i++) {
		var pair = args[i].split('=');
		var name = decodeURIComponent(pair[0]);

		var value = (pair.length==2)
			? decodeURIComponent(pair[1])
			: name;

		this.params[name] = value;
	}
}
Querystring.prototype.get = function(key, default_)
{
	var value = this.params[key];
	return (value != null) ? value : default_;
}
Querystring.prototype.contains = function(key)
{
	var value = this.params[key];
	return (value != null);
}

var external = {};
// methods dealing with adding the DirectTrack tracking pixels into the DOM.
external.directTrack = function()
{
	var baseUrl = "http://affiliates.lynda.com";
	return {
		click:function(bannerId) { var qs = new Querystring(); external.directTrack.addImage(baseUrl + "/tracking/js.html?aid=" + escape(qs.get("aid")) + "&bid=" + escape(qs.get("bid")) + "&bbid=" + bannerId + "&ref=" + escape(document.referrer)); },
		lead:function(bannerId, opt) { external.directTrack.addImage(baseUrl + "/lead/lynda/" + bannerId + "/" + opt); },
		sale:function(bannerId, products, documentId, opt) { external.directTrack.addImage(baseUrl + "/i_prod/lynda/" + products + "/" + documentId + "/" + opt + "&sale_status=a"); },
		//  + bannerId + "/"

		//addImage:function(url) { document.write('<img src="' + url + '" />'); }
		addImage:function(url) { var tag = document.createElement('img'); tag.src = url; var bd = document.getElementsByTagName("body")[0]; bd.appendChild(tag); }
	};
}();

function showDialog(control, visible)
{
    if (control)
        control.style.display = visible ? 'block' : 'none';
}

// Utilities
String.type = typeof String();
String.empty = new String();
String.replace = function()
{
	var _string = arguments[0];
	if(typeof _string !== String.type)
		return _string;
	if(arguments.length != 0)
		for(var i = 1, n = arguments.length; i !== n; i++)
			while(_string.indexOf(arguments[i]) !== -1){ _string = _string.replace(arguments[i],String.empty) };
	return _string;
};
String.format = function()
{
	if(arguments.length == 0)
		return null;
	var input = arguments[0];
	for(var a = 1, cnt = arguments.length; a < cnt; a++)
		input = input.replace(RegExp("\\{" + (a - 1) + "\\}", "gi"), arguments[a]);
	return input;
};
String.truncate = function()
{
	if(arguments.length == 0)
		return null;
	var s=arguments[0],l=arguments[1];
	return s.length>l?s.substring(0,l):s;
};

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

var utilities = {};
utilities.redirect = function(href){document.location.href = href;};
utilities.random = function(max){return Math.floor(Math.random()*(max+1));};
utilities.randomSort = function(array){array.sort(function(a,b){return utilities.random(2);return array;});};
utilities.contextualTruncate = function(text,maxLength,tagName)
{
	var beforeLength = (maxLength*.25);
	var first = text.indexOf('<'+tagName+'>');
	var start = (first - beforeLength);
	var len = Math.min(text.length - (first - beforeLength), maxLength);
	if (maxLength - len <= start)
	{
		var delta = (maxLength - len);
		start -= delta;
		len += delta;
	}
	text = first > beforeLength
		? "&hellip; " + text.substring(start, len)
		: text.substring(0, maxLength)
		;
	// fix broken full tags
	var iA = text.lastIndexOf('<'+tagName+'>'),
		iB = text.lastIndexOf('</'+tagName+'>');
	if (iA != -1 && iA > iB)
		text += '</'+tagName+'>';
	// add ellipsis
	if (len == maxLength)
		text += "&hellip;";
	return text;
};

function charCounter(textId,messageId,max)
{
	var self = this;
	var textElement = jQuery('#'+textId), messageElement = jQuery('#'+messageId);
	var messageFormatString = messageElement.html();
	this.exec = function(e)
	{
		var val = textElement.val();
		var len = max - val.length;
		var ret = true;
		if(e && e.which >= 32 && e.which != 127)	// todo: add selection check
		{
			if(len == 0)
				ret = false;
			if(len < 0)
			{
				len = 0;
				textElement.val(val.substring(0,max));
				ret = false;
			}
		}
		messageElement.html(String.format(messageFormatString,len));
		return ret;
	};

	textElement
		.unbind('keydown').unbind('keyup').unbind('change')
		.keydown(self.exec).keyup(self.exec).change(self.exec);
	self.exec();
}

function retry(method,condition,ms,max)
{
	var i = setInterval(function(){
		if(--max<=0){clearInterval(i);return;}
		if(condition()){clearInterval(i);method();}
	},ms);
}

var tags = new function()
{
	var self = this;
	var genericTags = ['to watch', 'remember', 'ideas', 'projects', 'to share', 'important'];

	var simpleEval = function(json) { return ("string" === typeof json) ? (json.length > 2 ? eval(json.charAt(0) != '(' ? '(' + json + ')' : json) : null) : json; };
	this.find = function(term)
	{
		var terms = [];
		jQuery.ajax({ async: false, url: lynda.baseUrl + "ajax/tags.aspx", type: 'GET', data: { term: term }, dataType: 'string', traditional: true, success: function(data)
		{
			var d = simpleEval(data);
			if (d && d.length)
				terms = d;
		}
		});
		return terms;
	};
	this.populate = function(itemtypeid, itemid, parentElement, callback)
	{
		var parameters = { itemtypeid: itemtypeid, itemid: itemid };
		jQuery.ajax({ async: false, url: lynda.baseUrl + "ajax/tags.aspx", type: 'GET', data: parameters, dataType: 'string', traditional: true, success: function(data)
		{
			var d = simpleEval(data);
			var listItems = '';
			if (d && d.tags)
			{
				if (d.tags.length < genericTags.length)
				{
					utilities.randomSort(genericTags);
					for (var a = 0, cnt = (genericTags.length - d.tags.length); a < cnt; a++)
						d.tags.push({ name: genericTags[a] });
				}
				jQuery.each(d.tags, function(i, item) { listItems += '<a href="#"><div class="add"></div>' + item.name + '</a>'; });
			}
			var e = jQuery(parentElement);
			if (e)
				e.html(listItems);
			if (callback)
				callback();
		}});
	};
	this.join = function(tagArray)
	{
		var txt = '', t = tagArray;
		for (var a = 0, cnt = t.length; a < cnt; a++)
			txt += (a > 0 ? ' ' : '') + (t[a].indexOf(' ') != -1 ? '"' + t[a] + '"' : t[a]);
		return txt;
	};
	this.cleanTags = function(text, tag)	// tag=optional tag to add
	{
		var t = self.parseTerms(text);
		if (tag && tag.length > 0)
		{
			if (!t)
				t = [];
			if (jQuery.inArray(tag, t) == -1)
				t.push(tag);
		}
		t = self.truncate(t, lynda.tags.maxLength);
		return self.join(t);
	};
	this.parseTerms = function(text)
	{
		var nextTerm = function()
		{
			if (!text || text.length == 0)
				return '';

			var term = '', isMulti = false;
			for (var a = 0, cnt = text.length; a < cnt; a++)
			{
				if (text.charAt(a) == ' ' && !isMulti)
				{
					text = (a + 1) > text.length ? '' : text.substring(a + 1);
					return term;
				}
				if (text.charAt(a) == '"')
				{
					if (term.length == 0)
					{
						isMulti = true;
						continue;
					}
					text = (a + 1) > text.length ? '' : text.substring(a + 1);
					return term;
				}
				term += text.charAt(a);
			}
			text = '';
			return term;
		};

		if (!text || text.length == 0)
			return [];

		var terms = [], term = ' ';
		for (var a = 0; a < 100 && term && term.length > 0; a++)
		{
			term = nextTerm();
			if (!term || term.length == 0)
				continue;
			if (jQuery.inArray(term, terms) == -1)
				terms.push(term);

			// psuedo trim
			while (text && text.charAt(0) == ' ')
				text = text.substring(1);
		}
		return terms;
	};
	this.truncate = function(tagArray, maxLength)
	{
		var terms = [];
		for (var a = 0, c = tagArray.length; a < c; a++)
		{
			var e = String.truncate(tagArray[a], maxLength);
			if (jQuery.inArray(e, terms) == -1)
				terms.push(e);
		}
		return terms;
	};
} ();

var repository=new function()
{
	var simpleEval=function(json) { return ("string"===typeof json)?(json.length>2?eval(json.charAt(0)!='('?'('+json+')':json):null):json; };
	var find=function(parameters,url) { var item;jQuery.ajax({ async: false,url: url?url:lynda.baseUrl+"ajax/item.aspx",type: 'GET',data: parameters,dataType: 'string',traditional: true,success: function(data) { item=simpleEval(data); } });return item; };
	this.findBookmark=function(id) { return find({ itemtypeid: 5,itemid: id }); };
	this.findBookmarksByTags=function(tags) { return find({ itemtypeid: 5,tag: tags.join('|') }); };
	this.findBookmarksBySearch=function(text) { return find({ itemtypeid: 5,q: text }); };
	this.findVideo=function(id) { return find({ itemtypeid: 2,itemid: id }); };
	this.findBookmarkByVideoPosition=function(id,position) { return find({ itemtypeid: 5,itemid: id,position: position }); };
	this.findBlogEntries=function(c,p,l) { return find({categoryid:c,page:p,limit:l},lynda.baseUrl+"ajax/blog.aspx"); };
};
// oh god refactor me
var bookmark = new function() {
    var _maxCrumbSize = 60; // 60 visible
    var self = this;
    var modal = {}, buttons = {}, iframe = {}, baseElement = {}, deleteDialog = {};
    var cssStates = [
		{ 'background-position': '0px -48px', 'width': '40px', 'height': '22px' },
		{ 'background-position': '0px -25px', 'width': '40px', 'height': '22px' },
		{ 'background-position': '0px -71px', 'width': '319px', 'height': '417px' },
		{ 'background-position': '0px -489px', 'width': '319px', 'height': '396px' },
		{ 'background-position': '-352px -2px', 'width': '9px', 'height': '13px' },
		{ 'background-position': '-320px -71px', 'width': '319px', 'height': '417px' },
		{ 'background-position': '-380px -1px', 'width': '40px', 'height': '17px' },
		{ 'background-position': '0px -2px', 'width': '40px', 'height': '22px' }
	];
    var meta = { type: 0, id: 0, position: 0, title: '', breadcrumbs: [] };
    var iconStates = { types: [] };
    var initParameters = {};
    var isModalDisplayed = false;

    var joinCrumbs = function(crumbs, separater) {
        if (!crumbs || crumbs.length == 0)
            return '';

        var out = crumbs[crumbs.length - 1];
        if (crumbs.length > 1)
            for (var a = crumbs.length - 2; a >= 0; a--) {
            if (out.replace('&raquo;', ' ').length + separater.length + crumbs[a].length < _maxCrumbSize)
                out = crumbs[a] + separater + out;
            else if (out.replace('&raquo;', ' ').length + separater.length < _maxCrumbSize - 3) {
                var len = (_maxCrumbSize - 3) - (out.replace('&raquo;', ' ').length + separater.length);
                out = crumbs[a].substring(0, len) + '...' + separater + out;
            }
            else
                return out;
        }
        return out;
    };
    var initModal = function() {
        var bookmark;
        var bookmarkID = 0;
        if (meta.bi > 0) { bookmark = repository.findBookmark(meta.bi); }
        if ((meta.position > 0) && ((meta.type == 2) || (meta.type == 3))) { bookmark = repository.findBookmarkByVideoPosition(meta.id, meta.position); }

        if (bookmark != null) {
            jQuery('#bookmark-name').val(jQuery.htmlDecode(bookmark.name)).unbind('click').click(function() { this.select(); });
            jQuery('#bookmark-description').val(jQuery.htmlDecode(bookmark.description)).unbind('click').click(function() { this.select(); });
            if (bookmark.tags)
                jQuery.each(bookmark.tags, function() { cleanTags(this.name); });
        }
        else {
            jQuery('#bookmark-name').val(jQuery.htmlDecode(meta.title)).unbind('click').click(function() { this.select(); });
        }
        //Simulate keydown event
        var press = jQuery.Event("keydown");
        press.ctrlKey = false;
        press.which = 40;
        jQuery("#bookmark-description").trigger(press);

        tags.populate(meta.type, meta.id, jQuery('#bookmark-tags-ul').get(0), function() { jQuery('#bookmark-tags-ul a').click(self.addTag); });

        jQuery('#bookmark-breadcrumb').html(meta.title);
        var a = 'Movie';
        switch (meta.type) {
            case 1: a = 'Course'; break;
            case 6: a = 'Chapter'; break;
            case 3: a = 'Time Code'; break;
        }
        jQuery('#bookmark-title').html('Bookmark this ' + a);
        jQuery('#bookmark-tags').unbind('blur').blur(function() { return cleanTags(); });
        new tagSuggest({
            element: jQuery("#bookmark-tags"),
            find: tags.find,
            item: function(item) { return item.type == 'head' ? '<li class="h">' + item.text + '</li>' : '<li>' + item.text + '</li>'; },
            parse: function(element) { var terms = tags.parseTerms(element.val()); return terms && terms.length > 0 ? terms[terms.length - 1] : ''; },
            add: function(element, tag) { var terms = tags.parseTerms(element.val()); if (terms && terms.length > 0) terms[terms.length - 1] = tag; element.val(tags.join(terms)); }
        });
    };
    var post = function(parameters, funct) { jQuery.ajax({ url: lynda.baseUrl + "ajax/bookmark.aspx", type: 'POST', data: parameters, success: function(data) { funct(simpleEval(data)); }, dataType: 'text' }); };
    var check = function(optionalData) {
        if (iconStates && iconStates.types) {
            for (var a = 0, cnt = iconStates.types.length; a < cnt; a++) {
                var f = function(data) {
                    var bookmarkIdentifierIconState = ""; //this identifies if its a course details page > bookmarks tab
                    if (jQuery('#hShowBkmkOnly').length > 0) { if (jQuery('#hShowBkmkOnly').val() == "1") bookmarkIdentifierIconState = "_bkm3"; }
                    if (data && data.data) {
                        for (tid in data.data) {
                            var _type = iconStates[tid];
                            if (_type)
                                for (pid in data.data[tid])
                                if (_type[pid + bookmarkIdentifierIconState]) _type[pid + bookmarkIdentifierIconState](data.data[tid][pid]);
                        }
                    }
                };

                if (optionalData)
                    f(optionalData);
                else {
                    var type = iconStates[iconStates.types[a]];
                    var ids = type.ids.join(',');
                    post({ action: 'check', itemtypeid: iconStates.types[a], ids: ids }, f);
                }
            }
        }
    };
    var cleanTags = function(tag)	// optional tag to add
    {
        var tagsElement = jQuery('#bookmark-tags');
        tagsElement.val(tags.cleanTags(tagsElement.val(), tag));
        return false;
    };
    var save = function(name, description, tagsText) {
        description = description.substring(0, 300);
        var parameters = { itemtypeid: meta.type, itemid: meta.id, position: meta.position, name: name, description: description };
        if (meta.bi) {
            parameters.action = 'update';
            parameters.bookmarkid = meta.bi;
        }

        cleanTags();
        var terms = tags.parseTerms(tagsText);
        if (terms && terms.length > 0)
            for (var a = 0, cnt = terms.length; a < cnt; a++)
            parameters["tag" + a] = terms[a];
        post(parameters, function(data) {
            if (data && data.success) {
                // success, need to flip icon
                check();
                if (initParameters.postsave) initParameters.postsave();
            }
            else {
                var msg = 'Error';
                if (data && data.errors) {
                    msg += ' details:\n';
                    for (var a = 0, cnt = data.errors.length; a < cnt; a++)
                        msg += '  - ' + data.errors[a] + '\n';
                }

                // error, provide feedback
                alert(msg);
            }
        });
        // clear form and close window
        self.cancel();
        // give the appearance of instant activation for non-timecode
        if (meta.type != 3)
            baseElement.addClass('active');
        return false;
    };
    this.currentState = 0;

    var state = function(index) {
        self.currentState = index;
        modal.css(cssStates[0 <= index && index < cssStates.length ? index : 0]); return false;
    };

    this.track = function(e) {
        var o = modal.offset(), w = modal.width(), h = modal.height();
        var x = e.pageX, y = e.pageY;
        if (!(o.left <= x && x <= (o.left + w) && o.top <= y && y <= (o.top + h)) && self.currentState != 2)
            self.hide();
    };
    this.changeVideoForTimeline = function(id) {
        var video = repository.findVideo(id);
        var opt = { id: id, title: video.name };
        if (video.breadcrumbs && video.breadcrumbs.length > 0) {
            var bc = [];
            for (var a = 0, c = video.breadcrumbs.length; a < c; a++)
                bc.push(video.breadcrumbs[a].name);
            opt.breadcrumbs = bc;
        }
        jQuery('.' + initParameters.css).each(function(i) { self.initLink(this, true, opt); });
        self.reinit();
    };
    this.reinit = function() {
        self.init(initParameters.id, initParameters.css, initParameters);
    };
    this.init = function(id, css, opts) {
        //alert('im here');
        initParameters.id = id;
        initParameters.css = css;
        initParameters.isIPad = navigator.userAgent.match(/iPad/i) != null;
        if (opts) {
            if (opts.isplayer) initParameters.isplayer = opts.isplayer; // i don't like specifics like this, but in this case, this means to center the modal above a plugin/activex control with an iframe behind it
            if (opts.disabledetails) initParameters.disabledetails = opts.disabledetails;
            if (opts.preshow) initParameters.preshow = opts.preshow;
            if (opts.predetails) initParameters.predetails = opts.predetails;
            if (opts.posthide) initParameters.posthide = opts.posthide;
            if (opts.postsave) initParameters.postsave = opts.postsave;
        }
        iframe = jQuery('#bookmarkiframe');

        modal = jQuery('#' + id);
        // init buttons
        buttons = modal.find('#buttons');
        initButtons(true);
        // delete dialog
        deleteDialog = jQuery('#dialogDeleteConfirm');
        deleteDialog.find('.btnLink').unbind('click').click(self.deleteCancel);
        deleteDialog.find('.btnRed94').unbind('click').click(self.deleteSave);

        var tabName = 'tabcontentTOC';

        //if bookmarked only, hide chapter tables
        var showBookmarkedOnly = "0";
        if (jQuery('#hShowBkmkOnly').length > 0) { showBookmarkedOnly = jQuery('#hShowBkmkOnly').val(); }

        if (showBookmarkedOnly == "1") {
            jQuery('div#' + tabName).find('table[name=chapterTable]').attr('style', 'display:none;'); //.addClass('hideDetail'); 
            tabName = 'tabcontentBookmarks';
        }

        // init icon links

        jQuery('.' + css).each(function(i) {
            var e = jQuery(this);
            var d = self.initLink(e, true);

            //*** change this to skip only if not bkmkonly on coursedetails page
            var bookmarkIdentifierIconState = "_bkm3";

            if (showBookmarkedOnly != "1") {
                bookmarkIdentifierIconState = "";
                if (d.ty == 3)//skip timecode
                    return;
            }
            // add all visible bookmarks to the collection for testing
            if (!iconStates[d.ty]) {
                iconStates[d.ty] = { ids: [] };
                iconStates.types.push(d.ty);
            }

            if (d.ty == 3) {
                if (!iconStates[d.ty][d.i + '_' + d.p + bookmarkIdentifierIconState]) {
                    iconStates[d.ty][d.i + '_' + d.p + bookmarkIdentifierIconState] = function(id) { self.initLink(e, false, { bookmark: id }); };
                    iconStates[d.ty].ids.push(d.i + '_' + d.p + bookmarkIdentifierIconState);
                }
            }
            else {
                if (!iconStates[d.ty][d.i + bookmarkIdentifierIconState]) {
                    iconStates[d.ty][d.i + bookmarkIdentifierIconState] = function(id) { self.initLink(e, false, { bookmark: id }); };
                    iconStates[d.ty].ids.push(d.i + bookmarkIdentifierIconState);
                }
            }
            //hide all chapters and movies if SHOWBOOKMARKONLY. UnHide later if they are bookmarked or their children are bookmarked
            if (showBookmarkedOnly == "1") {
                if (d.ty == 2) //videos
                    e.parent().parent().addClass('hideDetail');
                else if (d.ty == 6) // chapters
                    e.parent().addClass('hideDetail');

                jQuery('table[name=chapterTable]').addClass('hideDetail'); //.attr('style','display:none;');
            }
        });

        // init suggested tags
        modal.find('#tags > li').each(function(i) { jQuery(this).unbind('click').click(self.addTag); });
        modal.find('#bookmark-save').unbind('click').click(self.detailsSave);
        modal.find('#bookmark-cancel').unbind('click').click(self.cancel);

        // init already bookmarked items
        if (opts && opts.data)
            check(opts.data);
        else
            check();
    };
    var initButtons = function(create) {
        buttons.css({ 'position': 'relative', 'top': 0, 'margin-top': 0 });
        buttons.find('li').each(function(i) {
            var e = jQuery(this);
            if (i == 0)  //first li
            {
                if (initParameters.disabledetails)
                    e.unbind('click');
                else
                    e.unbind('click')
						.click(self.details)
						.attr('title', 'Bookmark options');
            }
            else  //second li
            {
                if (create)
                    e.unbind('mouseover').unbind('mouseout').unbind('click')
						.click(self.quickSave)
						.attr('title', 'Create bookmark');
                else
                    e.unbind('mouseover').unbind('mouseout').unbind('click')
						.click(self.deleteShow)
						.attr('title', 'Delete bookmark');
            }
        });
    };
    this.initLink = function(element, create, opt) {
        var showBookmarkedOnly = "0"; //showbkmkonly is set to true if you want to show BOOKMARKED items only
        if (jQuery('#hShowBkmkOnly').length > 0) { showBookmarkedOnly = jQuery('#hShowBkmkOnly').val(); }

        var e = jQuery(element);

        var h = e.attr('json');
        if (!h || h.length == 0)
            h = e.html();

        if (h == '')
            return;
        var d = eval(h.charAt(0) != '(' ? '(' + h + ')' : h);

        if (create)
            e.removeClass('active');
        else
            e.addClass('active');

        if (showBookmarkedOnly == "1")   //show bookmarks only in course details
        {
            if (!create) {
                if (d.ty == 2)   //movie (show movie and show its corresponding chapter name)
                {
                    e.parent().parent().removeClass('hideDetail');  //show movie row
                    jQuery('#table_' + e.parent().parent().attr('name')).attr('style', 'display:block'); //show table containing the movie
                    jQuery('#' + e.parent().parent().attr('name')).removeClass('hideDetail'); //show chapter name

                    //if chapter is not bookmarked, remove bookmark div
                    if (!(jQuery('#' + e.parent().parent().attr('name')).find('.bkm3').hasClass('active')))
                        jQuery('#' + e.parent().parent().attr('name')).find('.bkm3').attr('style', 'display:none;');
                }
                else if (d.ty == 6)  //show chapter
                {
                    e.parent().removeClass('hideDetail');
                }
                else if (d.ty == 3) //timecode
                {
                    jQuery('#table_' + jQuery('#' + e.parent().parent().parent().attr('name')).attr('name')).attr('style', 'display:block;'); //show chapter
                    jQuery('#' + jQuery('#' + e.parent().parent().parent().attr('name')).attr('name')).attr('style', 'display:block;'); //show chapter name
                    if (!(jQuery('#' + jQuery('#' + e.parent().parent().parent().attr('name')).attr('name')).find('.bkm3').hasClass('active')))
                        jQuery('#' + jQuery('#' + e.parent().parent().parent().attr('name')).attr('name')).find('.bkm3').attr('style', 'display:none;'); //hide chapter if not active

                    if (!(jQuery('#' + e.parent().parent().parent().attr('name')).find('div.bkm3').hasClass('active')))
                        jQuery('#' + e.parent().parent().parent().attr('name')).find('div.bkm3').attr('style', 'display:none;'); //hide bkmk icon if movie not bookmarked
                    jQuery('#' + e.parent().parent().parent().attr('name')).removeClass('hideDetail'); //show movie
                }
            }
        }

        if (opt) // optional data update
        {
            if (opt.type) d.ty = opt.type;
            if (opt.id) d.i = opt.id;
            if (opt.position) d.p = opt.position;
            if (opt.title) d.t = opt.title;
            if (opt.breadcrumbs) d.b = opt.breadcrumbs;
            if (typeof (opt['bookmark']) != 'undefined') d.bi = opt.bookmark;
        }
        if (initParameters.isIPad == 1) {
            if (create)
                e.unbind('mouseover').unbind('mouseout').unbind('click').attr('title', 'Create bookmark').attr('json', jQuery.toJSON(d)).html('')
						.click(function() { return self.quickSaveIPad(this, { type: d.ty, id: d.i, position: d.p, title: d.t, breadcrumbs: d.b, bi: d.bi }); });
            else
                e.unbind('mouseover').unbind('mouseout').unbind('click').attr('title', 'Delete bookmark').attr('json', jQuery.toJSON(d)).html('')
						.click(function() { return self.quickDeleteIPad(this, { type: d.ty, id: d.i, position: d.p, title: d.t, breadcrumbs: d.b, bi: d.bi }); });
        }
        else {
            e.attr('json', jQuery.toJSON(d)).html('')
			    .unbind('mouseover')
			    .mouseover(function() { return self.show(this, { type: d.ty, id: d.i, position: d.p, title: d.t, breadcrumbs: d.b, bi: d.bi }); });
            //bug 3408

            jQuery('#bookmark').hover(function() {
            }, function() {
                if (!isModalDisplayed) {
                    jQuery('#bookmark-breadcrumb').html();
                    jQuery('#bookmark-name').val('');
                    jQuery('#bookmark-description').val('');
                    jQuery('#bookmark-tags').val('');
                    jQuery('#bookmark').hide();
                }
            });
            //Simulate keydown event
            var press = jQuery.Event("keydown");
            press.ctrlKey = false;
            press.which = 40;
            jQuery("#bookmark-description").trigger(press);
            //bug 3408  
        }

        return d;
    };
    this.hide = function() {
        modal.hide();
        if (iframe) { iframe.hide(); buttons.show(); }
        jQuery().unbind('mousemove', self.track);
        if (initParameters.posthide) initParameters.posthide();
        isModalDisplayed = false;
        return false;
    };
    this.show = function(element, metadata) {
        if (initParameters.preshow) initParameters.preshow(element, metadata);
        baseElement = jQuery(element);

        var create = !(metadata.bi && metadata.bi > 0);
        initButtons(create);

        var offset = baseElement.offset();
        var css = { 'left': (offset.left - 26) + 'px', 'top': (offset.top - 4) + 'px' };
        state(initParameters.disabledetails ? 6 : create ? 0 : 7);
        modal.css(css).show();
        meta = metadata;
        jQuery().mousemove(self.track);
        return false;
    };
    this.details = function() {
        if (initParameters.predetails) initParameters.predetails();
        jQuery().unbind('mousemove', self.track);

        initModal();

        var offset = modal.offset();
        if (initParameters.isplayer) {
            state(3);
            var w = jQuery(window).width(), h = jQuery(window).height();
            modal.css({ 'left': (w / 2 - modal.width() / 2) + 'px', 'top': (h / 2 - modal.height() / 2) + 'px' });
            if (iframe) { buttons.hide(); iframe.css({ 'left': offset.left, 'top': offset.top, 'width': modal.width(), 'height': modal.height(), 'display': 'block' }); }
        }
        else if (jQuery(document).height() < ((offset.top - 4) + Number(cssStates[5].height.replace('px', '')))) {
            state(5);
            modal.css({ 'top': (offset.top - modal.height() + 29) + 'px' });
            buttons.css({ 'position': 'relative', 'top': (386 + 20) + 'px', 'margin-top': '-20px' });
        }
        else {
            if (self.currentState != 2) { state(2); } else { state(0); }
        }

        isModalDisplayed = true;

        return false;
    };
    this.detailsSave = function() { return save(jQuery('#bookmark-name').val(), jQuery('#bookmark-description').val(), jQuery('#bookmark-tags').val()); };
    this.quickHover = function() { return state(initParameters.disabledetails ? 4 : 1); };
    this.quickOut = function() { return state(initParameters.disabledetails ? 4 : 0); };
    this.quickSave = function() { return save(meta.title, '', ''); };
    this.quickSaveIPad = function(element, metadata) { baseElement = jQuery(element); meta = metadata; return save(meta.title, '', ''); };
    this.quickDeleteIPad = function(element, metadata) { baseElement = jQuery(element); meta = metadata; jQuery().mousemove(self.track); return self.deleteShow(); };

    this.addTag = function() { return cleanTags(jQuery(this).text()); };
    this.cancel = function() {
        jQuery('#bookmark-breadcrumb').html();
        jQuery('#bookmark-name').val('');
        jQuery('#bookmark-description').val('');
        jQuery('#bookmark-tags').val('');
        return self.hide();
    };
    this.remove = function() {
        var e = baseElement;
        var j = e.attr('json');
        var d = eval(j.charAt(0) != '(' ? '(' + j + ')' : j);

        post({ action: 'delete', bookmarkid: d.bi }, function(data) {
            if (data && data.success) {
            }
            else {
                var msg = 'Error';
                if (data && data.errors) {
                    msg += ' details:\n';
                    for (var a = 0, cnt = data.errors.length; a < cnt; a++)
                        msg += '  - ' + data.errors[a] + '\n';
                }

                // error, provide feedback
                alert(msg);
            }
        });

        self.initLink(e, true, { bookmark: 0 });

        return false;
    };
    this.deleteShow = function() {
        if (initParameters.isIPad) {
            self.remove();
            return false;
        }
        if (initParameters.isplayer) {
            self.remove();
            return false;
        }
        var e = baseElement;
        var offset = e.offset();
        deleteDialog.css({ 'left': (offset.left - 17) + 'px', 'top': (offset.top + 19) + 'px' });
        deleteDialog.show();
        return false;
    }
    this.deleteCancel = function() { deleteDialog.hide(); return false; };
    this.deleteSave = function() {
        self.remove();
        self.deleteCancel();
        return false;
    };
    this.populateTimecodes = function(rectangle, secondsArray, totalVideoSeconds, click) {
        jQuery('div.bkm2').remove();
        var body = jQuery('body');
        var x = rectangle.x, y = rectangle.y, w = rectangle.w
        jQuery.each(secondsArray, function(i, time) {
            var xOff = ((time / totalVideoSeconds) * w + x);
            body.append('<div style="top:' + y + 'px;left:' + xOff + 'px;" class="bkm2"></div>');
            if (click) body.find('div.bkm2:last').unbind('click').click(function() { return click(time); });
        });
    };
    var simpleEval = function(json) { return ("string" === typeof json) ? (json.length > 2 ? eval(json.charAt(0) != '(' ? '(' + json + ')' : json) : null) : json; };
    this.findPositions = function(id) {
        var positions = [];
        jQuery.ajax({ async: false, url: lynda.baseUrl + "ajax/bookmark.aspx", type: 'GET', data: { action: 'positions', itemid: id }, dataType: 'string', traditional: true, success: function(data) {
            var d = simpleEval(data);
            if (d && d.positions)
                positions = d.positions;
        }
        });
        return positions;
    };
} ();

jQuery.fn.highlight = function(text, css)
{
	function innerHighlight(node, text, css)
	{
		var skip = 0;
		if(node.nodeType == 3)
		{
			var position = node.data.toUpperCase().indexOf(text);
			if(position >= 0)
			{
				// wrap found text in span tag with css
				var spannode = document.createElement('span');
				spannode.className = css;
				var middlebit = node.splitText(position);
				var endbit = middlebit.splitText(text.length);
				var middleclone = middlebit.cloneNode(true);
				spannode.appendChild(middleclone);
				middlebit.parentNode.replaceChild(spannode, middlebit);
				skip = 1;
			}
		}
		else if(node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName))
		{
			for(var i=0,cnt=node.childNodes.length;i<cnt;i++)
				i += innerHighlight(node.childNodes[i], text, css);
		}
		return skip;
	}
	return this.each(function(){innerHighlight(this, text.toUpperCase(), css.toString());});
};

//parameters = {element,find,item,parse,add,empty}
function tagSuggest(parameters)
{// textInputElement,findMethod, liMethod,inputParseMethod,inputAddMethod,emptyMethod
	var self = this;
	var options = setProperties({
		element:{},
		find:function(){},
		item:function(text){return '<li>'+text+'</li>';},
		parse:function(element){return element.val();},
		add:function(element,text){element.val(text);},
		empty:function(){return '<li class="h">Suggested Tags</li><li><i>none</i></li>';}
	},parameters);
	var _waitMiliseconds = 700;
	var _element = jQuery(options.element);
	
	var _modal = jQuery('ul.autoSuggest');
	if(_modal.length==0)
	{
		jQuery('body').append('<ul class="autoSuggest"></ul>');
		_modal = jQuery('ul.autoSuggest');
	}
	var _timer, _data;
	var _last = '';

	var find = function()
	{
		var txt = options.parse(_element);
		_data = _last == txt?_data:options.find(txt);
		var html = '';
		if(_data && _data.length > 0)
			for(var a=0,cnt=_data.length;a<cnt;a++)
				html += options.item(_data[a]);
		if(html.length==0)
			html=options.empty();
		show(html);
		_last = txt;
	};
	var show = function(html)
	{
		var offset = _element.offset();
		_modal.html(html).css({'left':(offset.left-5)+'px','top':(offset.top+_element.height())+'px'}).show()
			.children().each(function(i){var e=jQuery(this);if(!e.hasClass('h')){e.mouseover(function(){jQuery(this).addClass('a');}).mouseout(function(){jQuery(this).removeClass('a')}).click(function(){options.add(_element,jQuery(this).text());return false;});}});
	};
	var hide = function(){_modal.html('').hide();};
	this.starthide = function(){setTimeout(hide,150);};
	this.keypress = function(e)
	{
		if(e.which != 8 && !(32 <= e.which && e.which <= 127))
			return true;
		if(_timer)
			clearTimeout(_timer);
		_timer = setTimeout(find,_waitMiliseconds);
		return true;
	};

	_element.unbind('keypress').keypress(self.keypress);
	_element.unbind('blur').blur(self.starthide);
};


function loadingToggle(ToggleOn, ElementIDs)
{
	var selectors = [];
	if(ElementIDs)
		for(var a=0,c=ElementIDs.length;a<c;a++)
			selectors[a]='#'+ElementIDs[a];
	loadingFade(ToggleOn,selectors);
}
function loadingFade(ToggleOn, Selectors)
{
	var id='dynamicLoadingAjax';
	jQuery('.'+id).remove();
	
	if(ToggleOn && Selectors)
	{
		for(var a=0,c=Selectors.length;a<c;a++)
		{
			var e=jQuery(Selectors[a]);
			if(e.length>0)
			{
				jQuery('body').append('<div id="'+id+a+'" class="'+id+'">&nbsp;</div>');
				var o=e.offset();
				jQuery('#'+id+a).css({'opacity':0.75,'position':'absolute','z-index':10000,'background':'#fff','left':o.left,'top':o.top,'width':e.width(),'height':e.height()});
			}
		}
	}
}


function setProperties(dest,src)
{
	if(src && dest)
		for(property in src)
			dest[property]=src[property];
	return dest;
}
function flyOut(parameters)
{
	var self = this;
	var options = setProperties({
		// the text to be replaced on the html template with content
		templateContentIdentifier:'',
		// the html template
		template:'',
		// selectors for the elements that should allow the hover
		selector:'',
		// shows the modal
		show:function(element){},
		// executed after the setContent loads the content, meant to adjust the size of the modal
		adjust:function(element,contentElement,modalElement){},
		// repositions the modal to the specified location
		reposition:function(currentElement,modalElement,offset){},
		// hard offset for the modal window
		offset:{},
		// use explicit open, meaning call a funtion to open the modal, instead of the mouse enter event
		useExplicitOpen:false,
		// use explicit close, meaning call a funtion to close the modal, instead of the mouse leave event
		useExplicitClose:false,
		// the delay in milliseconds before the flyout fades away
		closeDelayMS:300,
		// this allows the flyout to not close if the mouse is over it
		enableModalHover:true
	},parameters);
	var closeTimer;

	// methods to setContent and fade for hover	
	this.setContent = function(element,html)
	{
		_element.html(html);
		options.adjust(element,_element,_modal);
	};
	this.hoverIn = function(element) {
	    if (closeTimer)
	        clearTimeout(closeTimer);
	    if(element.constructor){
	        var e=element.constructor.toString().indexOf('HTML')!=-1?jQuery(element):jQuery(this);
	    }
	    else{
	        var e = jQuery(element);
	    }
	    if (options.show && options.show(e)) {
	        var o = { left: options.offset.left + e.width(), top: options.offset.top + 0 };
	        options.reposition(e, _modal.stop().css({ display: 'block' }), o).stop().animate({ opacity: 100 }, { duration: 300, complete: function() { options.reposition(e, _modal, o); } });
	    }
	    return false;
	};
	this.hoverOut = function(){closeTimer=setTimeout(function(){_modal.stop().animate({opacity:0},300,'swing',function(){jQuery(this).css({display:'none'});_element.html(options.templateContentIdentifier);});},options.closeDelayMS); return false;};
	this.dispose = function(){_modal.remove();jQuery(options.selector).unbind('mouseenter').unbind('mouseleave');};
	this.open = function(){return self.hoverIn(this);};
	this.close = function(){return self.hoverOut();};
	this.modalHoverIn = function(){if(closeTimer)clearTimeout(closeTimer);return false;};
	this.modalHoverOut = function(){self.hoverOut();};

	// insert modal into dom
	var _modal = jQuery(options.template);
	var _element={};
	_modal.find('*').each(function(){if(jQuery(this).html()==options.templateContentIdentifier)_element=jQuery(this);});
	jQuery('body').append(_modal);
	
	// add hover to selected elements
	var e=jQuery(options.selector);
	if(!options.useExplicitOpen)
		e.mouseenter(self.hoverIn);
	if(!options.useExplicitClose)
		e.mouseleave(self.hoverOut);
	if(options.enableModalHover)
		_modal.unbind('mouseenter').unbind('mouseleave').hover(self.modalHoverIn, self.modalHoverOut);
}
function toolTip(parameters)
{
	var self;
	return self = new flyOut(setProperties({
		templateContentIdentifier:'...',
		template:'<div class="toolTipWrapper2"><div class="toolTipMid2">...</div><div class="toolTipArrow2"></div></div>',
		selector:'.toolTip, .levelToolTip',
		show:function(element)
		{
			if(element.attr('cid'))
				Lynda.Web.P.M5([element.attr('cid')],function(data){self.setContent(element,data);},function(){});
			else if(element.attr('lvlid'))
				Lynda.Web.P.M10([element.attr('lvlid')],function(data){self.setContent(element,data);},function(){});
			else if(element.attr('aid'))
				Lynda.Web.P.M13([element.attr('aid')],function(data){self.setContent(element,data.length>150?(data.substring(0,150)+'&hellip;'):data);},function(){});
			else
				return false;
			return true;
		},
		adjust:function(element,contentElement,modalElement)
		{
			var midHeight=(modalElement.find('div.toolTipMid2').height() / 2) + (element.height() / 2);
			var t=modalElement.height() * -.5;
			var h=modalElement.find('div.toolTipArrow2').css({top:t}).height()/2;
			var o=element.offset();
			modalElement.css({top:(o.top-midHeight)});
		},
		reposition:function(currentElement,modalElement,offset)
		{
			var l=offset.left;
			var o=currentElement.offset();
			if((o.left+modalElement.width()+offset.left) > jQuery(window).width())
			{
				l=l-currentElement.width()-modalElement.width();
				modalElement.find('div.toolTipMid2,div.toolTipArrow2').addClass('right');
			}
			else
			{
				modalElement.find('div.toolTipMid2,div.toolTipArrow2').removeClass('right');
			}
			var midHeight=(modalElement.find('div.toolTipMid2').height() / 2) + (currentElement.height() / 2);
			var t=modalElement.height() * -.5;
			var h=modalElement.find('div.toolTipArrow2').css({top:t}).height()/2;
			return modalElement.css({top:(o.top-midHeight),left:(o.left+l)});
		},
		offset:{left:0,top:0}
	},parameters));
}
function filterOverflow(parameters)
{
    var onclickCloseFlyOut = String.format("javascript:jQuery(\'div#filter-wrapper\').css(\'background-color\', \'#EDEAE2\');{0}",
                                            (isIMobileDevice == "True") ? "jQuery(\'div#filtering li\').css(\'background-color\', \'#EDEAE2\')" : "");
    var self;
	return self = new flyOut(setProperties({
		templateContentIdentifier:'...',
		template: '<div class="filterOverflowWrapper"><div class="top"><span class="title"></span><a class="close" href="" onclick="' + onclickCloseFlyOut + '"><span class="icon remove">&nbsp;</span></a></div><div class="bottom"><div>...</div><div class="cl"></div></div></div>',
		selector:'.filterOverflow',
		show:function(element)
		{
			var html=element.next().html();
			self.setContent(element,html);
			return true;
		},
		adjust:function(element,contentElement,modalElement){},
		reposition:function(currentElement,modalElement,offset)
		{
			var o=currentElement.offset();
			var o1 = {
				left:offset.left - currentElement.width(),
				top:offset.top - currentElement.height()
			};
			
			modalElement.find('a.close').unbind('click').click(self.close);
		
			var t=modalElement.find('div.top');
			var b=modalElement.find('div.bottom');
			var cnt=b.find('a').length;
			
			var columns = cnt>30?4:cnt>20?3:cnt>10?2:1;
			var newWidth=182*columns;
			
			var adj=(newWidth-142)/2;
			if(((o.left+o1.left)-adj) <= 0)
			{
				adj += ((o.left+o1.left)-adj);
				adj -= 10;
			}
			if (cnt<=10) adj -= 9;
			t.css({marginLeft:adj-11});
			b.css({width:newWidth+2});
			
			return modalElement.css({width:newWidth+2,top:(o.top+o1.top),left:((o.left+o1.left)-adj)});
		},
		offset:{left:0,top:-75},
		useExplicitOpen:true,
		useExplicitClose:true,
		closeDelayMS:50,
		enableModalHover:false
	},parameters));
}

function isValidUserName(userName)
{
    var userNameReg = "(^[\\S+].*[\\S+]$)|(^[\\S+]$)";
    var regex = new RegExp(userNameReg); 
    return regex.test(userName);
}
function isValidZip(zip)
{
    var zipreg= "(^[0-9]{5}([-/]?[0-9]{4})?$)";
    var regex = new RegExp(zipreg); 
    return regex.test(zip);
}


