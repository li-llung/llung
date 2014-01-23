/*
//	messages.js
//  Usage: z.messages.error("#users", 'test');
//  Usage: z.messages.success("#users", 'test');
//
//
//  Dependent on Util.js being before it.
*/
var em = em || {};
(function($, em){
	'use strict';
	em.messages = {
        templates: {
            base: '<div class="{0} alt messages"><h3>{1}</h3><ul id="{2}">{3}</ul><div class="clear">&nbsp;</div></div>',
            base_no_header: '<div class="{0} alt messages"><ul id="{1}">{2}</ul><div class="clear">&nbsp;</div></div>',
            warning: '<div class="{0}>{1}<div class="clear">&nbsp;</div></div>'
        },
        error: function (where, error) {
			$(where).find(".issueAlert").remove();
            $(where).prepend(em.messages.templates.base.format('issueAlert', 'Please correct the following items:', 'issueAlert', error));
        },
        success: function (where, message, header_text) {
            var message_text = (message === undefined) ? '' : message;
            $(where).prepend(em.messages.templates.base.format('successAlert', header_text, 'successAlert', message_text));
        },
        success_no_header: function (where, message) {
            var message_text = (message === undefined) ? '' : message;
            $(where).prepend(em.messages.templates.base_no_header.format('successAlert', 'successAlert', message_text));
        },
        warning: function (where, message) {
            var message_text = (message === undefined) ? '' : message;
            $(where).prepend(em.messages.templates.warning.format(message_text));
        },
        clear: function(){
            $('.messages').remove();
        }
	};
})(jQuery, em);