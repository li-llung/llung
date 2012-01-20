/*jQuery(document).ready(function() {
   jQuery(window).scroll(function() {
        var myWidth = jQuery(window).width() - this.width;
        var myNum = myWidth / 2;
        var curWidth = this.width;
        var curHeight = this.height;
        var left = myNum;
        var top = (jQuery(window).scrollTop()+100) + 'px';
        var overlay_top = (jQuery(window).scrollTop()) + 'px';
        jQuery("#modal-overlay").animate({top: overlay_top, left: left }, "fast");
        jQuery("#modal-container").animate({top: top, left: left }, "fast");
   });
});*/ 
//JQuery modal popup
if (!jQuery) {
    throw ('jQuery has not been loaded!');
}
//original
//TODO: rewrite this bullshit as a jQuery plugin!!!
var modalWindow = {
    parent: "body",
    windowId: null,
    url: null,
    width: null,
    height: null,
    shown: false,
    title: "",
    type: "",
    variables: null, //for data replacement
    iframe: false, //for modal popup
    modalCSSClass: null,
    skin: {
        loading: '<div id="modal-loading" >' +
						    '<img src="../images/ajax-loading.gif" alt="loading" />' +
						    '<span>Loading or <a href="javascript: modalWindow.deactivate();">Cancel</a></span>' +
					     '</div>',
        main: '<div id="modal-container" >' +
				            '<div id="modal-title-bar" >' +
					            '<span id="modal-title"></span>' +
						        '<a id="modal-close-link" >Close</a>' +
				            '</div>' +
				            '<div id="modal-contents" >' +
				            '</div>' +
				      '</div>',
        overlay: "<div id=\"modal-overlay\"></div>"
    },
    close: function() {
        IE6 = (navigator.userAgent.toLowerCase().indexOf('msie 6') != -1) &&
                          (navigator.userAgent.toLowerCase().indexOf('msie 7') == -1)
        if (IE6) {
            jQuery("select").css("visibility", "visible");
        }

        jQuery("#modal-contents").remove();
        setTimeout(function() { jQuery('#modal-overlay').remove(); }, 0);
        jQuery("#modal" + this.type).remove();

        this.variables = null;
        this.iframe = false;
        this.modalCSSClass = null;
        this.shown = false;
    },
    open: function() {
        if (this.shown)
            return;
        else
            this.shown = true;

        try {
            var modal = document.createElement('div');
            modal.setAttribute('id', 'modal' + this.type);
            if (this.type != "") {
                modal.setAttribute('class', this.type);
            }
            modal.innerHTML = this.skin.overlay + this.skin.main;

            jQuery(this.parent).append(modal);
            if (this.modalCSSClass != "") {
                jQuery("#modal" + this.type).addClass(this.modalCSSClass);
            }
            switch (this.type) {
                case "MMUS":
                    jQuery("#modal-close-link").html('<img alt="Close" src="../../../ui/images/enterprise_redesign/ent_re_icon_close.gif" style="padding-top: 3px;" />');
                    break;
                case "RetirePopup":
                    jQuery("#modal-title-bar").css("display", "none");
                    break;
                default:
                    jQuery("#modal-title-bar").css("display", "block");
                    break;
            }

            var self = this;
            jQuery("#modal-contents").html = this.skin.loading;
            jQuery("#modal-overlay, #modal-close-link").click(function() {
                jQuery("div#modal-container").trigger('close', this); //not a clean method to raise events!
                modalWindow.close();
            });

            IE6 = (navigator.userAgent.toLowerCase().indexOf('msie 6') != -1) &&
                      (navigator.userAgent.toLowerCase().indexOf('msie 7') == -1)
            if (IE6) {
                jQuery("select").css("visibility", "hidden");
            }

            //styling
            try {
                jQuery("#modal-title").html(this.title);
            }
            catch (stylingErr) {
                //console.log("Modal popup styling error: " + stylingErr.description);
            }
            var myWidth = jQuery(window).width() - this.width;
            var myNum = myWidth / 2;

            var curWidth = this.width;
            var curHeight = this.height;
            var left = myNum;
            //var left = (jQuery.browser.msie ? jQuery(window).width() : window.innerWidth) / 2 - curWidth / 2;
            //var left = (jQuery.browser.msie ? jQuery(window).height() : window.innerHeight) / 2 - curHeight / 2;
            var top = (jQuery(window).scrollTop() + 100) + 'px';
            //var overlay_top = (jQuery(window).scrollTop()) + 'px';
            var overlay_top = '0px';
            jQuery("#modal-container").css("top", top).css("left", left);
            jQuery("#modal-overlay").css("top", overlay_top).css("left", "0");
            jQuery("#modal-container").animate({ width: curWidth + "px", height: curHeight + "px" }, "slow");
            
            if (typeof (isIMobileDevice) != 'undefined') {
                if (isIMobileDevice == "True") {
                    jQuery("#modal-overlay").css("height", document.body.scrollHeight + "px").css("width", document.body.scrollWidth + "px");
                }
            }
            if (!modalWindow.iframe) {
                if (jQuery(this.url).html()) {
                    jQuery("#modal-contents").append(jQuery(this.url).html());
                    jQuery("#modal-contents #" + this.url).show();
                }
                else {
                    jQuery.get(this.url, function(data) {
                        try {
                            data = data.replace("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">", "");
                            data = data.replace("<html xmlns=\"http://www.w3.org/1999/xhtml\">", "");
                            data = data.replace("</html>", "");
                            data = data.replace("<head>", "");
                            data = data.replace("</head>", "");
                            data = data.replace("<body>", "");
                            data = data.replace("</body>", "");

                            jQuery("#modal-contents").append(data);
                        }
                        catch (err) {
                            jQuery("#modal-contents").html("Error encountered when loading page (" + err.description + ")");
                        }
                    });
                }
            }
            else {
                jQuery("#modal-contents").html("<iframe src='" + modalWindow.url +
                                                             "' width='100%' height='100%' frameborder='0' style='border: none;'></iframe>");
                if (typeof (isIMobileDevice) != 'undefined') {
                    if (isIMobileDevice == "True") {
                        jQuery("#modal-contents").height(modalWindow.height);
                    }
                }
            }
        }
        catch (Error) {
        }
    },
    redim: function() {
        var curWidth = jQuery("#modal-container").width();
        var curHeight = jQuery("#modal-container").height();
        var left = (jQuery.browser.msie ? jQuery(window).width() : window.innerWidth) / 2 - curWidth / 2;
        var top = (jQuery.browser.msie ? jQuery(window).height() : window.innerHeight) / 2 - curHeight / 2;
        jQuery("#modal-container").css("top", top).css("left", left);
    },
    redimToGivenSize: function(newWidth, newHeight) {
        if (newWidth) { jQuery("#modal-container").width(newWidth); }
        if (newHeight) { jQuery("#modal-container").height(newHeight); }
        this.redim();
    }
};
var closeJQModal = function(){
	modalWindow.close();
}

var openJQModal = function(url, width, height) {
    modalWindow.width = width;
    modalWindow.height = height;
    modalWindow.url = url;

    modalWindow.open();
};

var openJQModalExtended = function(url, width, height, title, type, data) {
    modalWindow.width = width;
    modalWindow.height = height;
    modalWindow.url = url;
    modalWindow.title = title;
    modalWindow.type = type;
    modalWindow.variables = data;

    modalWindow.open();
}

var openJQModalExtended = function(url, width, height, title, type, data, iframe) {
    modalWindow.width = width;
    modalWindow.height = height;
    modalWindow.url = url;
    modalWindow.title = title;
    modalWindow.type = type;
    modalWindow.variables = data;
    modalWindow.iframe = iframe;

    modalWindow.open();
}

var openJQModalExtendedCss = function(url, width, height, title, type, data, iframe, modalCSSClass) {
    modalWindow.width = width;
    modalWindow.height = height;
    modalWindow.url = url;
    modalWindow.title = title;
    modalWindow.type = type;
    modalWindow.variables = data;
    modalWindow.iframe = iframe;
    modalWindow.modalCSSClass = modalCSSClass;

    modalWindow.open();
}

//jQuery Lynda plugins
//jQuery.trim = function(text) {
//    var result = "";
//    result = text.replace(/\r?\t?\n/g, '');
//    result = result.replace(/\s/g, ' ').replace(/  ,/g, ''); ;
//    result = result.replace(/^\s*|\s*$/g, '');
//};

//Lynda js objects
function MMUSGroup(id, n, rs, nl) {
    this.gID = (typeof (id) != 'undefined' && id != null) ? id : 0;
    this.name = (typeof (n) != 'undefined' && n != null) ? n : '';
    this.status = (typeof (rs) != 'undefined' && rs != null) ? rs : 'Inactive';
    this.licenses = (typeof (nl) != 'undefined' && nl != null) ? nl : 0;

    this.log = function() {
        return "gID:" + this.gID + ", name:" + this.name + ", status:" + this.status + ", licenses:" + this.licenses;  
    };
};

function MMUSUser(id, fn, ln, un, e, rs, s, gid) {
    this.uID = (typeof (id) != 'undefined' && id != null) ? id : 0;
    this.firstname = (typeof (fn) != 'undefined' && fn != null) ? fn : '';
    this.lastname = (typeof (ln) != 'undefined' && ln != null) ? ln : '';
    this.fullname = fn + ' ' + ln;
    this.username = (typeof (un) != 'undefined' && un != null) ? un : '';
    this.email = (typeof (e) != 'undefined' && e != null) ? e : '';
    this.regstatus = (typeof (rs) != 'undefined' && rs != null) ? rs : 'Not Registered';
    this.status = (typeof (s) != 'undefined' && s != null) ? s : 'Inactive';
    this.gID = (typeof (gid) != 'undefined' && gid != null) ? id : 0;

    this.log = function() {
        return "uID:" + this.uID + ", firstname:" + this.firstname + ", lastname:" + this.lastname + ", fullname:" + this.fullname +
               ", email:" + this.email + ", regstatus:" + this.regstatus + ", status:" + this.regstatus + ", gID:" + this.gID;
    };
};
