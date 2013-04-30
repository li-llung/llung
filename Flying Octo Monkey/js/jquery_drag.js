$(function() {
    /*tree drag and drop*/
    var currentItem,
        treeSettings = {},
        phTop, container, indx, phStart, phDirection, currentPos, someText, phItem;
    jQuery(".drag").find("ul").sortable({
        connectWith: '.connected',
        distance: 5,
        helper: "clone",
        placeholder: "ui-state-highlight",
        hoverClass: "ui-state-hover",
        start: function(e, ui){
            //$(ui.item).show();
            ui.helper.css({'border': '1px solid #bbbbbb', width: 'auto', paddingRight: '15px', backgroundColor: '#cccccc'}).find('> div').css('padding-left', 0);
            treeSettings.startIndex = ui.placeholder.index();
        },
        change: function(e,ui){
        },
        beforeStop: function(e,ui){
            treeSettings.endIndex = ui.item.index();
            phTop = ui.placeholder.position().top;
            container = ui.placeholder.parent();
            phItem = ui.placeholder;
            indx = ui.placeholder.index();
        },
        stop: function(e,ui){
            //console.log(treeSettings.startIndex);
            //console.log(treeSettings.endIndex);
            //console.log(ui.item.index());
            //console.log(treeSettings.startIndex - treeSettings.endIndex);
            //console.log(((treeSettings.endIndex - treeSettings.startIndex < 1)));
            currentItem = ((treeSettings.endIndex - 1));
            var list = container.find('> li').eq(currentItem);
            console.log(list);
            console.log(currentItem);
            console.log(list.html());
            console.log(indx);
            console.log(phItem);
            //console.log(currentItem);
            //console.log(e);
            //console.log(ui);
            //alert(list.html());
            if(container.find('> li').eq(currentItem).is(':hover')){
                console.log('how dare you hover me'); //create child
                if (!list.find('> ul').length) {
                    //no kids
                    console.log('no kids');
                    someText = container.find('li').eq(currentItem).find('> div').text();
                    list.append('<ul class="connected"></ul>');
                }else{
                    //has kids
                    console.log('has kids');
                    someText = container.find('li').eq(currentItem).find('ul > li').find('> div').text()
                }
                $('.activity').append(ui.item.text() + ' dropped on ' + someText + "<br />");
                ui.item.appendTo( list.find('> ul'));
                ui.item.parents('li.top_level').find('ul').show();
            }else{
                console.log('why not hover me'); //in between two items
            }
            container.find('li > ul:empty').remove(); // remove empty subgroups
        }
    }).disableSelection();
    /*Clicking on a item*/
    $('.drag').find('a').on('click', function(){
        $('.activity').append('clicked me ' + $.trim($(this).text()) + "<br />");
    });
    /*expanding/collapsing tree*/
    $('.drag').find('span').on('click', function(){
        if($(this).hasClass('drop')){
            $(this).removeClass('drop').addClass('down');
            $(this).parent().parent().parent().find('ul').first().show();
        }else{
            $(this).removeClass('down').addClass('drop');
            $(this).parent().parent().parent().find('ul').hide();
        }
    });
    /*Drag and drop users*/
    jQuery(".users").find('li').draggable({
        connectToSortable: ".drag",
        helper: "clone",
        revert: "invalid"
    });
    $(".drag").find('li').find('> div').droppable({
        accept: $('.users').find('li'),
        activeClass: "ui-state-hover",
        hoverClass: "ui-state-active",
        drop: function(event, ui) {
            $(this).addClass("ui-state-highlight");
            $('.activity').append(ui.draggable.text() + ' added to ' + $(this).text() + "<br />");
        }
    });
});