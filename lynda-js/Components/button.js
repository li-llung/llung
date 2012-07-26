lynda.button = function(container, icon, iconPosition, action){
    /* options {
     data-icon:An icon to display in the left or right side of the button
     data-iconPosition:You may choose to display the icon to the left or right side of the button title
     }
     */
    //Required Files go here…
    if(!icon){ icon = $(container).data("icon"); }
    if(!iconPosition){ iconPosition = $(container).data("iconposition") ? $(container).data("iconposition") : "left"; }
    //Component logic goes here…
    var label = document.createElement('span');
    $(container).data('title') ? $(label).text($(container).data('title')) : null;
    $(label).appendTo(container);
    
    icon ? function(){
        var iconElement = document.createElement('img');
        $(iconElement).attr('src', icon);
        $(iconElement).css({ height:$(container).height(), width:$(container).height() });
        iconPosition == "right" ? function(){
            $(iconElement).addClass("lynda-button-icon-right");
            $(container).append(iconElement);
        }() : function(){
            $(iconElement).addClass("lynda-button-icon-left");
            $(container).prepend(iconElement);
        }();
    }() : null;
    $(container).mousedown(function(){ $(container).addClass('pressed'); });
    if(!action){
        $(container).click(function(){ if(typeof $(container).data('action') == 'function'){ $(container).data('action')(); } else{ eval($(container).data('action')); }});
    }
    else{
        $(container).click(function(){ action(); });
    }
    $(container).mouseup(function(){ $(container).removeClass('pressed'); });
}