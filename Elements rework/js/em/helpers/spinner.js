/*
//  spinner.js
*/
var em = em || {};
(function($, em){
  'use strict';
  em.spinner = {
    add_spinner: function (what) {
      $(what).append('<div class="box_spinner">&nbsp;</div>');
    },
    remove_spinner: function () {
      $('.box_spinner').remove();
    }        
  };
})(jQuery, em);