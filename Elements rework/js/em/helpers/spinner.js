/*
//  spinner.js
*/
var Em = Em || {};
(function($, Em){
  'use strict';
  Em.spinner = {
    add_spinner: function (what) {
      $(what).append('<div class="box_spinner">&nbsp;</div>');
    },
    remove_spinner: function () {
      $('.box_spinner').remove();
    }        
  };
})(jQuery, Em);