function clearSearchBox(e)
{
	if(e && e.value == 'What would you like to learn?')
		e.value = '';
}

var simpleEval = function(json) { return ("string" === typeof json) ? (json.length > 2 ? eval(json.charAt(0) != '(' ? '(' + json + ')' : json) : null) : json; };
var login = function(u, p, IsModal, RememberMe) {
    jQuery("#section-head").addClass('shrink');
    var success = false;
    var loginURL = lynda.baseUrl + "ajax/login.aspx";
    if (location.protocol == "https:")
        loginURL = lynda.baseUrl.replace("http:", "https:") + "ajax/secureLogin.aspx";
    jQuery.ajax({ async: false, url: loginURL, type: 'POST', data: { username: u, password: p, remember: RememberMe }, dataType: 'string', traditional: true, success: function(data) {
        var d = simpleEval(data);
        success = d && d.success;
        if (success) {
            var url = d.redirect;
            document.location.href = url;
        }
        else {
            if (IsModal) {
                jQuery('#no-access').hide();
                jQuery('#login-error').show();
                jQuery.fancybox.resize();
            }
            else {
                if (d.access == 'true') {
                    jQuery('#no-access').hide();
                    jQuery('#login-error').show();
                }
                else {
                    jQuery('#login-error').hide();
                    jQuery('#no-access').show();
                }
            }
        }
    }, error: function(data) {
        jQuery('#no-access').hide();
        jQuery('#login-error').show();
    }
    });
    return success;
};
function modalLogin(eu, ep, er) 
{
	login(jQuery('#'+eu).val(),jQuery('#'+ep).val(),true,jQuery('#'+er).is(':checked'));
};
function pageLogin(eu, ep) {
    login(jQuery('#' + eu).val(), jQuery('#' + ep).val(), false, false);
};
function pageLoginFull(eu, ep, er) {
    login(jQuery('#' + eu).val(), jQuery('#' + ep).val(), false, jQuery('#' + er).is(':checked'));
};
function resizeLoginModal(height)
{
	var e=jQuery("#fancybox-wrap");
	var i=jQuery("#fancybox-inner");
	var b=e.height()-i.height();
	i.height(height);
	e.height(height+b);
	
	jQuery.fancybox.center();
}

function getCookiesEnabled() {
    var cookieEnabled = (navigator.cookieEnabled) ? true : false
    //if not IE4+ nor NS6+
    if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
        document.cookie = "testcookie"
        cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
    }
    return cookieEnabled;
}

jQuery(document).ready(function()
{
	if(jQuery("a#login-modal").length>0)
	{
		jQuery("a#login-modal").attr("href",parseSecureUrl(jQuery("a#login-modal").attr("href")));
	}

	//jQuery('#btmsrchbox').focus(function() { document.onkeypress = null; }).blur(function() { document.onkeypress = handleKeyPress; });

	jQuery('#btmsrchbox').blur(function() { if(this.value=='') this.value='What would you like to learn?'; });
	jQuery('#srchbox').blur(function() { if(this.value=='') this.value='What would you like to learn?'; });	
	jQuery('#topsrchbox').blur(function() { if (this.value == '') this.value = 'What would you like to learn?'; });
	// Login
	var loginModal=jQuery("a#login-modal");

	if(loginModal&&loginModal.fancybox)
		loginModal.fancybox({
			'type': 'iframe',
			'scrolling': 'no',
			'hideOnContentClick': false,
			'autoDimensions': false,
			'height': 250,
			'width': 350,
			'padding': 0, /* NOTE -- set this in our css */
			'titleShow': true,
			'title': 'Log in to your account',
			'overlayOpacity': 0.5,
			'titlePosition': 'outside',
			'onComplete': function() { jQuery(".frm-username").focus(); }
		});

	//feedback modal
	var feedbackModal=jQuery("a#feedback-modal");
	if(feedbackModal&&feedbackModal.fancybox)
		feedbackModal.fancybox({
			'type': 'ajax',
			'hideOnContentClick': false,
			'autoDimensions': false,
			'height': 'auto',
			'width': 405,
			'padding': 0, /* NOTE -- set this in our css */
			'titleShow': true,
			'title': '',
			'overlayOpacity': 0.5,
			'titlePosition': 'inside',
			'disableNavButtons': false,
			'onComplete': function()
			{
				if(typeof (lynda.isIMobileDevice) != 'undefined' && lynda.isIMobileDevice)
					jQuery("#fancybox-overlay").css({ width: document.body.scrollWidth + 'px', height: document.body.scrollHeight + 'px' });
				jQuery(".frm-name").focus();
			},
			'onClosed': function() { jQuery("div#fancybox-outer").removeAttr('style'); }
		});
	jQuery('#section-sitefeedback')
		.css({ 'right': (jQuery('#eyebrow').offset().left),'opacity': '0.6' })
		.mouseenter(function() { jQuery(this).fadeTo("fast",1.0); })
		.mouseleave(function() { jQuery(this).fadeTo("fast",0.60); });
	jQuery(window).resize(function()
	{
		jQuery('#section-sitefeedback')
			.hide()
			.css({ 'right': (jQuery('#eyebrow').offset().left) })
			.show()
			;
    });
    //header administration menu click
    var selector = "div#eyebrow ul.nav li.with-sub-menu:last a:first:contains('administration')";
    var url = "div#eyebrow ul.nav li.with-sub-menu:last ul.sub-menu:first li.multirole:first a";
    jQuery(selector).attr("href", jQuery(url).attr("href"));
	// Footer tooltip
	jQuery(".view-more > a").click(function(e)
	{
		e.preventDefault();
		var sibs=jQuery(e.target).siblings();
		sibs.toggle();
		//sibs.find('img.close-btn').unbind('click').click(function () { sibs.hide(); });
		return false;

	});
	jQuery('.view-more img.close-btn').click(function(e)
	{
		jQuery(e.target).parents('.view-more').find('div:first').hide();
	});

	jQuery('ul.nav > li.with-sub-menu .sub').css({ opacity: 0 }).hide();

	jQuery("li.with-sub-menu").each(function(index,el)
	{
		jQuery(this).mouseenter(function()
		{
			var e=jQuery(this);
			e.find("div.sub").stop().fadeTo('fast',1);
		});
		jQuery(this).mouseleave(function()
		{
			jQuery(this).find(".sub").hide();
		});
	});
	//Promo banner
	if(jQuery("#topart"))
	{
		jQuery("#topart").mouseenter(function()
		{
			jQuery("#topart").clearQueue();
			jQuery("#topart").delay(750).animate({ "height": "300px" },"fast",function() { jQuery('div.ac_results').hide(); });
		});
		jQuery("#topart").mouseleave(function()
		{
			jQuery("#topart").clearQueue();
			jQuery("#topart").animate({ "height": "40px" },"fast");
		});
		jQuery("#topart").click(function()
		{
			if(jQuery("#topart").css('height')=="300px")
			{
				jQuery("#topart").animate({ "height": "40px" },"fast");
			} else
			{
				jQuery("#topart").animate({ "height": "300px" },"fast",function() { jQuery('div.ac_results').hide(); });
			}
		});
	}
	//sidebar curves
	if(jQuery(".monopod"))
	{
		jQuery('div.monopod').first().addClass('monotop');
		//jQuery('<div class="monotop">&nbsp;</div>').insertBefore(jQuery('div.monopod').first());
		jQuery('<div class="monobottom">&nbsp;</div>').insertAfter(jQuery('div.monopod').last());
		//jQuery('div.monopod').last().addClass('monobottom');
	}

	//this is used for redirecting the user to login page
	//when trying to access a method that requires authentication
	jQuery("body").ajaxError(
            function(e,request,settings)
            {
            	if(request.status==403)
            	{
            		//alert(settings.url+'\r\n'+request.responseText);
            		//document.location.href=lynda.baseUrl+"login/login.aspx";
            	}
            }
     );

	//calling method for affiliates tracking
	if(typeof affiliatesTracks!='undefined')
	{
		if(affiliatesTracks.action=='click')
		{
			external.directTrack.click(affiliatesTracks.bannerId);
		} else if(affiliatesTracks.action=='lead')
		{
			external.directTrack.lead(affiliatesTracks.bannerId,affiliatesTracks.opt);
		} else if(affiliatesTracks.action=='sale')
		{
			external.directTrack.sale(affiliatesTracks.bannerId,affiliatesTracks.products,
                affiliatesTracks.documentId,affiliatesTracks.opt);
		}
	}
	//Show an alert message if the cookies are not enabled
	//if (getCookiesEnabled()==false) 
	    //alert('We require that your browser can accept cookies. Please enable your browser cookies and then close and restart your browser.');
	
});
function toggle(id) {
	var e=document.getElementById(id);
	if (e.className=='closed')
		e.className='open';
	else
		e.className='closed';
}
function toggleWithWork(func, paramArray) {
	var e = document.getElementById(paramArray[0]);
	if(e.className == 'closed')
		e.className = 'open';
	else
		e.className = 'closed';
	func(paramArray);
}

function parseSecureUrl(url)
{
	if(url==undefined)
		return;
	return location.protocol+'//'+location.host+url.substring(url.indexOf('/',9));
}
