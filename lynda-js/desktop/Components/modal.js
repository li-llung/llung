
lynda.modal = function(content){
    /* options {
     data-width:The width of the content area in the Modal View. (The content margin will be added later)
     data-height:The height of the content area in the Modal View. (The content margin will be added later)
     data-margin:The margin between the content area and the edge of the Modal View. 
     }
     */
    var trigger = $(content).data("trigger");
    options = {
        width:$(content).data("width"),
        height:$(content).data("height"),
        margin:$(content).data("margin")
    }
    //Required Files go here…
    //Component logic goes here…
    //Initialize Modal Visibility and trigger
    $(content).hide();
    $("#"+trigger).click(function(){
                         //modalShade is the semi-transparent black shade that covers the page.
                         var modalShade = document.createElement('div');
                         $(modalShade).addClass('lynda-modal-shade');
                         $(modalShade).text(" ");
                         $(modalShade).click(function(){
                                             $(".lynda-modal-view").fadeOut();
                                             $(".lynda-modal-shade").fadeOut();
                                             });
                         //Modal View is the main view area of the modal window
                         var modalView = document.createElement('div');
                         $(modalView).addClass('lynda-modal-view');
                         
                         //Close button removes the modal shade and view but is not necessary as clicking anywhere on modal shade will remove both elements as well.
                         var modalCloseButton = document.createElement('div');
                         $(modalCloseButton).addClass('lynda-modal-close-button');
                         $(modalCloseButton).text(" ");
                         $(modalCloseButton).click(function(){
                                                   $(".lynda-modal-view").fadeOut();
                                                   $(".lynda-modal-shade").fadeOut();
                                                   });
                         $(modalCloseButton).appendTo(modalView);
                         
                         //ModalContent is the content area of the modalView. The page's lynda-modal element is cloned into the content area. 
                         var modalContent = document.createElement('div');
                         $(modalContent).addClass('lynda-modal-content');
                         var width = options.width ? options.width : $(content).width();
                         width = width && width < ($(window).width() * .80) ? width : ($(window).width() * .80);
                         $(modalContent).width(width);
                         var margin = options.margin ? options.margin : 60;
                         $(modalContent).css('margin', margin);
                         
                         
                         $(content).clone().appendTo(modalContent).show();
                         $(modalContent).appendTo(modalView);
                         $(modalShade).appendTo('body');
                         $(modalView).appendTo('body');
                         
                         //The following is processed after modalView is appended so that the browser can compute the offsetHeight and position
                         var height = options.height ? options.height : $(modalContent).height();
                         height = height && height < ($(window).height() * .80) ? height : ($(window).height() * .80);
                         $(modalContent).height(height);
                         
                         var modalViewTopPosition = ($(window).height() / 2) - (height / 2) - margin;
                         var modalViewLeftPosition = ($(window).width() / 2) - (width / 2) - margin;
                         $(modalView).offset({ top:modalViewTopPosition, left:modalViewLeftPosition });
                         
                         $(modalShade).hide();
                         $(modalView).hide();
                         
                         $(modalShade).fadeIn();
                         $(modalView).fadeIn();
                         });
}
