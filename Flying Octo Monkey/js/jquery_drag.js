$(function() {
    /*tree drag and drop*/
    var tree = {
            settings: {},
            branches: {
                current: {
                    start: 0,
                    end: 0,
                    top: 0,
                    item: '',
                    parent: '',
                    text: ''
                }
            },
            dropped: false
        };
    jQuery(".drag").find("ul").sortable({
        connectWith: '.connected',
        distance: 5,
        helper: "original",
        refreshPositions: true,
        placeholder: "ui-state-highlight",
        //hoverClass: "ui-state-hover",
        activate: function (event, ui) {
            //$('.activity').append('activate' + "<br />");
        },
        create: function (event, ui) {
            //$('.activity').append('create' + "<br />");
        },
        deactivate: function (event, ui) {
            //$('.activity').append('deactivate' + "<br />");
        },
        out: function (event, ui) {
            //$('.activity').append('out' + "<br />");
        },
        over: function (event, ui) {
            //$('.activity').append('over' + "<br />");
        },
        receive: function (event, ui) {
            //$('.activity').append('receive' + "<br />");
        },
        remove: function (event, ui) {
            //$('.activity').append('remove' + "<br />");
        },
        sort: function (event, ui) {
            //$('.activity').append('sort' + "<br />");
        },
        update: function (event, ui) {
            //$('.activity').append('update' + "<br />");
        },
        start: function(e, ui){
            //$('.activity').append('start' + "<br />");
            //ui.helper.css({'border': '1px solid #bbbbbb', width: 'auto', paddingRight: '15px', backgroundColor: '#cccccc'}).find('> div').css('padding-left', 0);
            tree.branches.current.start = ui.placeholder.index();
        },
        change: function(e,ui){
            //$('.activity').append('change' + "<br />");
        },
        beforeStop: function(e,ui){
            //$('.activity').append('beforeStop' + "<br />");
            //console.log(e);
            //console.log(ui);
            ui.helper.removeAttr('style').find('div').removeAttr('style');
            tree.branches.current.top = ui.placeholder.position().top;
            tree.branches.current.item = ui.placeholder;
            tree.branches.current.parent = ui.placeholder.parent();
            tree.branches.current.end = ui.placeholder.index();
            //console.log(tree.branches.current.end);
        },
        stop: function(e,ui){
            var list;
            //console.log(tree.branches.current.item.offset().top);
            console.log(tree);
            //$('.activity').append('stop' + "<br />");
            //console.log('you were at ' + (tree.branches.current.start-1) + ' who is ' + $.trim(tree.branches.current.parent.find('> li').eq(tree.branches.current.start - 1).text()));
            //console.log('your at ' + (tree.branches.current.end-1) + ' who is ' + $.trim(tree.branches.current.parent.find('> li').eq(tree.branches.current.end - 1).text()));
            var moved = ((tree.branches.current.start > tree.branches.current.end) ? (tree.branches.current.start - tree.branches.current.end) : (tree.branches.current.end - tree.branches.current.start));
            //console.log('you moved ' + ((tree.branches.current.start > tree.branches.current.end) ? 'up ' : 'down ') + moved + ' places');
            if(tree.branches.current.start > tree.branches.current.end){
                //console.log('you just passed ' + $.trim(tree.branches.current.parent.find('> li').eq(tree.branches.current.end).text()) + ' going up');
                tree.branches.current.text = $.trim(tree.branches.current.parent.find('> li').eq(tree.branches.current.end).text());
            }else{
                //console.log('you just passed ' + $.trim(tree.branches.current.parent.find('> li').eq(tree.branches.current.end - 2).text()) + ' going down');
                tree.branches.current.text = $.trim(tree.branches.current.parent.find('> li').eq(tree.branches.current.end - 2).text());
            }
            if(tree.dropped){
                ui.item.detach();
                //console.log(tree.branches.current);
                //if(tree.branches.current.start > tree.branches.current.end){
                    //list = tree.branches.current.parent.find('> li').eq((tree.branches.current.end-2));
                    //console.log('here');
                //}else{
                    //list = tree.branches.current.parent.find('> li').eq((tree.branches.current.end+2));
                    //console.log('there');
                //}
                //console.log(list);
                list = tree.branches.current.parent.find('> li').eq((tree.branches.current.end-2));
                if (!list.find('> ul').length) {
                    //no kids
                    //console.log('no kids');
                    //tree.branches.current.text = tree.branches.current.parent.find('li').eq(tree.branches.current.end - 1).find('> div').text();
                    list.append('<ul class="connected"></ul>');
                }else{
                    //has kids
                    //console.log('has kids');
                    //tree.branches.current.text = tree.branches.current.parent.find('li').eq(tree.branches.current.end - 1).find('ul > li').find('> div').text()
                }
                ui.item.appendTo(list.find('> ul'));
                ui.item.parents('li.top_level').find('ul').show();
            }
            //$('.activity').append(ui.item.text() + ' dropped on ' + tree.branches.current.text + "<br />");
            /*currentItem = ((treeSettings.endIndex - 1));
            var list = container.find('> li').eq(currentItem);
            container.find('> li').eq(currentItem).hover(function() {
                console.log('how dare you hover me1'); //create child
            }, function() {
                console.log('why not hover me1'); //in between two items
            });
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
            container.find('li > ul:empty').remove(); // remove empty subgroups*/
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
        //activeClass: "ui-state-hover",
        //hoverClass: "ui-state-active",
        drop: function(event, ui) {
            $(this).addClass("ui-state-highlight");
            $('.activity').append(ui.draggable.text() + ' added to ' + $(this).text() + "<br />");
        }
    });
    $(".drag").find('div').droppable({
        accept: $('.drag').find('li'),
        tolerance: "intersect",
        //activeClass: "ui-state-hover",
        hoverClass: "ui-state-active",
        drop: function(event, ui) {
            //$(this).addClass("ui-state-highlight");
            tree.dropped = true;
            $('.activity').append(ui.draggable.text() + ' added to ' + $(this).text() + "<br />");
        }
    });
});