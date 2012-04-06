(function( $ ){

  var methods = {
     init : function( options ) {
     	alert(options);
       return this.each(function(){
		 //alert(location);
		 //alert(options);
         
         var $this = $(this),
             data = $this.data('tooltip'),
             tooltip = $('<div />', {
               text : $this.attr('title')
             });
	     
		alert(options);
		//var $this = $(this);
		
		if(options){
			$this.css('text-align' , options.location);
			$this.css('background-color' , options.background);
		}else{
			$this.css('text-align' , settings.location);
			$this.css('background-color' , settings.background);	
		}
         
         // If the plugin hasn't been initialized yet
         if ( ! data ) {

           $(this).data('tooltip', {
               target : $this,
               tooltip : tooltip
           });

         }
       });
     },
     destroy : function( ) {

       return this.each(function(){

		var $this = $(this);
         //var $this = $(this),
         //    data = $this.data('tooltip');

         // Namespacing FTW
         //$(window).unbind('.tooltip');
         //data.tooltip.remove();
         //$this.removeData('tooltip');
		 $this.remove();	
       })

     },
     reposition : function( direction ) { 
     	alert(direction);
     	this.css('text-align',direction);
     },
     show : function( ) { 
     	this.show();
     },
     hide : function( ) { 
     	this.hide();
     },
     update : function( content ) { 
     	this.html(content);
     }/*,
     slider : function( slider_options ) { 
     	var slider_settings = $.extend( {
	      'width'   : '640px',
	      'height' : '480px'
	    }, slider_options);
     }*/
  };

  $.fn.tooltip = function( method, options ) {  

    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      'location'   : 'left',
      'background' : '#373737'
    }, options);
    /*var settings = $.extend( {
      'location'   : 'left',
      'background' : '#373737'
    }, options);

    return this.each(function() {        
		//alert(options);
		var $this = $(this);
		
		if(options){
			$this.css('text-align' , options.location);
			$this.css('background-color' , options.background);
		}else{
			$this.css('text-align' , settings.location);
			$this.css('background-color' , settings.background);	
		}
    });*/
    //alert(options);
    /*$(this).init(options);*/
    
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }    

  };
  
})( jQuery );