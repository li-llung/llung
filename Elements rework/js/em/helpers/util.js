/*
//  util.js
*/
var em = em || {};
(function($, em){
    'use strict';
    if (!String.prototype.format) {
        String.prototype.format = function () {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] !== 'undefined' ? args[number] : match;
            });
        };
    }
    em.util = {
        button: {
            disable: function(control){
                $(control).addClass('group_btn_disabled').attr('disabled', 'disabled');
            },
            enable: function(control){
                $(control).removeClass('group_btn_disabled').removeAttr('disabled');
            }
        },
        form: {
            boot: function(form){
                $(form).find('input:first').focus();
            },
            clear: function(form){
                $(form).find('input:first').val('');
            }
        },
        redirect: function(where){
            window.location = where;
        }
    };
})(jQuery, em);