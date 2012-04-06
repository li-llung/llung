(function( $ ){

  $.fn.tooltip = function( options ) {  

    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      'location'         : 'top',
      'background-color' : 'blue'
    }, options);

    return this.each(function() {        

      // Tooltip plugin code here

    });

  };
})( jQuery );