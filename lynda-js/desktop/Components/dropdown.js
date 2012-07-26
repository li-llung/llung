lynda.dropdown = function(container){
    items = $(container).data("items") ? $(container).data("items") : null;
    lynda.button(container, "images/dd.png", "right", function(){
                 var menu = document.createElement('ul');
                 $(menu).addClass('lynda-dropdown-menu');
                 $(items).each(function(){
                                            var item = document.createElement('li');
                                            $(item).addClass('lynda-dropdown-menu-item');
                                            $(item).text(this.title);
                                            $(item).bind("click", this, function(event){ $(container).data('value', event.data.value); $(container).children("span").html(event.data.title); $(menu).remove(); });
                                            $(item).appendTo(menu);
                                            });
                 //TODO: Make select menu disappear on any subsequent click
                 $(container).after(menu);
                 $(menu).css({ top:container.offsetTop, left:container.offsetLeft, width:container.width});
                 }, { icon:"images/dd.png", iconPosition:"right" });
}