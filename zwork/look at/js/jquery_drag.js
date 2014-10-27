$(function() {
    /*tree drag and drop*/
    var tree = {
            hasKids: false,
            settings: {},
            branches: {
                current: {
                    upStart: 0,
                    upEnd: 0,
                    downStart: 0,
                    downEnd: 0,
                    dragged: 0,
                    dropped: 0,
                    start: 0,
                    end: 0,
                    top: 0,
                    item: '',
                    parent: '',
                    text: ''
                },
                drop: {
                    end: 'top_level'
                }
            },
            dropped: false,
            setupClick: function(){
                $('.drag').find('.arrow_holder').off('click').on('click', function(){
                    console.log('click');
                    if($(this).find('span:first').hasClass('drop')){
                        $(this).find('span:first').removeClass('drop').addClass('down');
                        $(this).closest('li').find('ul:first').show();
                    }else{
                        $(this).find('span:first').removeClass('down').addClass('drop');
                        $(this).closest('li').find('span').removeClass('down').addClass('drop');
                        $(this).closest('li').find('ul').hide();
                    }
                });
            },
            setupUsersDrag: function(){
                jQuery(".users").find('li').draggable({
                    connectToSortable: ".drag",
                    helper: "clone",
                    revert: "invalid"
                });
            },
            setupDrop: function(){
                //$(".drag").find('div').droppable("destroy");
                $(".drag").find('div').droppable({
                    tolerance: "intersect",
                    hoverClass: "ui-state-active",
                    drop: function(event, ui) {
                        tree.dropped = true;
                        tree.branches.drop.end = $(this).closest('li').attr('class');
                        tree.branches.current.dragged = ui.draggable.position().top;
                        tree.branches.current.dropped = $(this).position().top;
                            console.log($(this).html());
                        if($(this).closest('li').find('ul').length){
                            tree.hasKids = true;
                        }
                        $('.activity').append(ui.draggable.text() + ' added to ' + $(this).text() + "<br />");
                    }
                });
            },
            refreshArrows: function(from){
                $('.drag').find('li').find('ul:empty').remove();
                $('.drag').find('li').each(function(index, arrow){
                    var div = $(arrow).find('div:first').find('.arrow_holder'),
                        ul = $(arrow).find('ul'),
                        a = $(arrow).find('a:first');
                    if(ul.length){
                        if(ul.is(':visible')){
                            if(div.length){
                                div.find('span').removeClass('drop').addClass('down');
                            }else{
                                a.prepend('<div class="arrow_holder"><span class="down">&nbsp;</span></div>');
                            }
                        }else{
                            if(div.length){
                                div.find('span').removeClass('down').addClass('drop');
                            }else{
                                a.prepend('<div class="arrow_holder"><span class="drop">&nbsp;</span></div>');
                            }
                        }
                    }else{
                        a.find('.arrow_holder').remove();
                    }
                });
                if($('.drag ul').find('> li').find('ul').length){
                    $('.drag ul').find('> li').find('li').removeClass('tiptop');
                }else{
                    $('.drag ul').find('li').removeClass('tiptop');
                }
                if(from === 'init' || from === 'reinit'){
                    tree.setupClick();
                }
            },
            sort: function(){
                jQuery(".drag").find("ul").sortable({
                    connectWith: '.connected',
                    distance: 5,
                    helper: "original",
                    refreshPositions: true,
                    placeholder: "ui-state-highlight",
                    start: function(e, ui){
                        //console.log(e);
                        /*
                        console.log(ui.placeholder.position().top);
                        console.log(ui.item.position().top);
                        console.log(ui.offset);
                        console.log(ui.originalPosition);
                        */
                        ui.helper.find('ul').hide();
                        ui.helper.find('span:first').removeClass('down').addClass('drop');
                        ui.helper.addClass('treePreview');
                        tree.branches.current.start = ui.placeholder.index();
                        ui.helper.height(20);
                        //ui.helper.removeClass('tiptop');
                        //ui.helper.find('ul').hide();
                        //ui.helper.find('a > span').removeClass('down').addClass('drop');
                        //ui.placeholder.css('height', ui.helper.height());
                        tree.branches.current.upStart = ui.placeholder.position().top;
                        tree.branches.current.downStart = ui.helper.position().top;
                        console.log(tree.branches.current.start);
                    },
                    beforeStop: function(e,ui){
                        /*
                        console.log(ui.placeholder.position().top);
                        console.log(ui.item.position().top);
                        console.log(ui.offset);
                        console.log(ui.originalPosition);
                        */
                        ui.helper.removeClass('treePreview');
                        ui.helper.removeAttr('style').find('div').removeAttr('style');
                        tree.branches.current.top = ui.placeholder.position().top;
                        tree.branches.current.upEnd = ui.placeholder.position().top;
                        tree.branches.current.downEnd = ui.helper.position().top;
                        tree.branches.current.item = ui.placeholder;
                        tree.branches.current.parent = ui.placeholder.parent();
                        tree.branches.current.end = ui.placeholder.index();
                        //console.log(tree.branches.current.end);
                    },
                    stop: function(e,ui){
                        //console.log(ui.placeholder.position().top);
                        //console.log(ui.item.position().top);
                        //console.log(ui.offset);
                        //console.log(ui.originalPosition);
                        var list,
                            moved,
                            upDir = false,
                            downDir = false;
                        //console.log(tree);
                        //$('.activity').append('stop' + "<br />");
                        //console.log(tree.branches.current.begin + '/' + tree.branches.current.stop);
                        //console.log('you were at ' + (tree.branches.current.start-1));
                        //console.log('your at ' + (tree.branches.current.end-1));
                        moved = ((tree.branches.current.start > tree.branches.current.end) ? (tree.branches.current.start - tree.branches.current.end) : (tree.branches.current.end - tree.branches.current.start));
                        //console.log('you moved ' + ((tree.branches.current.start > tree.branches.current.end) ? 'up ' : 'down ') + moved + ' places');
                        if(tree.branches.current.start >= tree.branches.current.end){
                            //console.log('you just passed ' + $.trim(tree.branches.current.parent.find('> li').eq(tree.branches.current.end).text()) + ' going up');
                            tree.branches.current.text = $.trim(tree.branches.current.parent.find('> li').eq(tree.branches.current.end).text());
                        }else{
                            //console.log('you just passed ' + $.trim(tree.branches.current.parent.find('> li').eq(tree.branches.current.end - 2).text()) + ' going down');
                            tree.branches.current.text = $.trim(tree.branches.current.parent.find('> li').eq(tree.branches.current.end - 2).text());
                        }
                        //console.log(tree.branches.current);
                        //console.log(ui.item.outerHeight() + parseInt(ui.item.css('marginTop')) + parseInt(ui.item.css('marginBottom')));
                        //console.log(ui.item.html());
                        /*
                        if((tree.branches.current.upStart + ui.item.height() + parseInt(ui.item.css('marginTop')) + parseInt(ui.item.css('marginBottom'))) > tree.branches.current.upEnd){
                            console.log('upward');
                            upDir = 'up';
                        }
                        if(tree.branches.current.downStart < (tree.branches.current.downEnd + ui.item.outerHeight() + parseInt(ui.item.css('marginTop')) + parseInt(ui.item.css('marginBottom')))){
                            console.log('downward');
                            downDir = 'down';
                        }*/
                        //sort up
                        /*if(tree.branches.current.start > tree.branches.current.end){
                            console.log('up');
                            upDir = 'up';
                            downDir = false;
                        }*/
                        //sort down
                        /*if(tree.branches.current.start < tree.branches.current.end){
                            console.log('down');
                            upDir = false;
                            downDir = 'down';
                        }*/
                        //item dropped on another
                        //if(tree.branches.current.start === tree.branches.current.end){
                            //console.log('dropped');
                            /*
                            console.log(tree.branches.current);
                            console.log(ui.item.height());
                            console.log(parseInt(ui.item.css('marginTop')));
                            console.log(parseInt(ui.item.css('marginBottom')));
                            */
                            if((tree.branches.current.upStart + ui.item.height() + parseInt(ui.item.css('marginTop')) + parseInt(ui.item.css('marginBottom'))) > tree.branches.current.dropped){
                                console.log('upward');
                                upDir = 'up';
                            }else if(tree.branches.current.dropped > tree.branches.current.downStart){
                                console.log('downward');
                                downDir = 'down';
                            }else{
                                console.log('neither');
                                upDir = false;
                                downDir = false;
                            }
                        //}
                        if(tree.dropped){
                            ui.item.detach();
                            //console.log(tree.branches.current.item.offset().top);
                            //console.log(tree.branches.current);
                            //console.log(tree.branches.drop.end);
                            if(tree.branches.drop.end !== undefined){
                                boom = tree.branches.drop.end.split(' ');
                            }else{
                                boom = [tree.branches.drop.end];
                            }
                            console.log(boom);
                            console.log($.inArray('tiptop', boom));
                            //if($.inArray('tiptop', boom) !== -1){
                            //    console.log('boom');
                                //list = tree.branches.current.parent.find('> li').eq((tree.branches.current.end-1));
                            //}else{
                            //    console.log('boom not to');
                                //list = tree.branches.current.parent.find('> li').eq((tree.branches.current.end-2));
                            //}
                            console.log('downDir = ' + downDir + '/upDir = ' + upDir);
                            console.log(moved);
                            console.log(tree.hasKids);
                            //default
                            list = tree.branches.current.parent.find('> li').eq((tree.branches.current.end-2));

                            if(upDir === 'up' && downDir === false && $.inArray('tiptop', boom) === -1){
                                //up 
                                console.log('a');
                                if(tree.hasKids){
                                    list = tree.branches.current.parent.find('> li').eq((tree.branches.current.end-1));
                                    tree.hasKids = false;
                                    console.log('a1');
                                }else{
                                    list = tree.branches.current.parent.find('> li').eq((tree.branches.current.end-2));
                                    console.log('a2');
                                }
                            }else if(downDir === 'down' && upDir === false && $.inArray('tiptop', boom) === -1){
                                //down
                                console.log('b');
                                list = tree.branches.current.parent.find('> li').eq((tree.branches.current.end-1));
                            }else if(upDir === 'up' && downDir === false && $.inArray('tiptop', boom) >= 1){
                                //up boom
                                console.log('c');
                                list = tree.branches.current.parent.find('> li').eq((tree.branches.current.end-1));
                            }else if(upDir === false && downDir === 'down' && $.inArray('tiptop', boom) >= 1){
                                //down boom
                                console.log('d');
                                list = tree.branches.current.parent.find('> li').eq((tree.branches.current.end-1));
                            }else{
                                console.log('e');
                            }
/*
                            if(upDir === 'up' && $.inArray('tiptop', boom) === 1 && downDir === false){
                                console.log('going up with boom');
                                list = tree.branches.current.parent.find('> li').eq((tree.branches.current.end-1));
                            }else if (upDir === 'up' && $.inArray('tiptop', boom) === -1 && downDir === false) {
                                console.log('going up with no boom');
                                if(moved > 1 && downDir === false){
                                    console.log('test1');
                                    list = tree.branches.current.parent.find('> li').eq((tree.branches.current.end-2));
                                }else{
                                    console.log('no test for you1');
                                    list = tree.branches.current.parent.find('> li').eq((tree.branches.current.end-1));
                                }
                            }else if (downDir === 'down' && $.inArray('tiptop', boom) === 1 && upDir === false) {
                                console.log('going down with boom');
                                list = tree.branches.current.parent.find('> li').eq((tree.branches.current.end-1));
                            }else if (downDir === 'down' && $.inArray('tiptop', boom) === -1 && upDir === false) {
                                console.log('going down with no boom');
                                if(moved > 1 && upDir === false){
                                    console.log('test');
                                    list = tree.branches.current.parent.find('> li').eq((tree.branches.current.end-2));
                                }else{
                                    console.log('no test for you');
                                    list = tree.branches.current.parent.find('> li').eq((tree.branches.current.end-1));
                                }
                            }else if (downDir === 'down' && $.inArray('tiptop', boom) === 1 && upDir === 'up') {
                                console.log('going down/up with boom');
                                list = tree.branches.current.parent.find('> li').eq((tree.branches.current.end-2));
                            }else if (downDir === 'down' && $.inArray('tiptop', boom) === -1 && upDir === 'up') {
                                console.log('going down/up with no boom');
                                list = tree.branches.current.parent.find('> li').eq((tree.branches.current.end-2));
                            }else{
                                console.log('going nowhere');
                                list = tree.branches.current.parent.find('> li').eq((tree.branches.current.end-2));
                            }
*/
                            //if(upDir === 'up' && $.inArray('tiptop', boom) === -1 || upDir === 'up' && downDir === 'down' && $.inArray('tiptop', boom) === -1){
                            //    console.log('going up');
                            //    list = tree.branches.current.parent.find('> li').eq((tree.branches.current.end-2));
                            //}else{
                            //    console.log('going down');
                            //    list = tree.branches.current.parent.find('> li').eq((tree.branches.current.end-1));
                            //}
                            //list = tree.branches.current.parent.find('> li').eq((tree.branches.current.end-2));
                            //console.log(list);
                            //console.log(list.html());
                            //console.log(tree.branches.current);
                            if (!list.find('> ul').length) {
                                //no kids
                                //console.log('no kids');
                                list.addClass('tiptop');
                                list.append('<ul class="connected"></ul>');
                            }else{
                                //has kids
                                //list.removeClass('tiptop');
                                //console.log('has kids');
                            }
                            ui.item.appendTo(list.find('> ul'));
                            ui.item.parents('li').find('ul').show();
                            tree.dropped = false;
                            console.log('---------------');
                        }
                        ui.item.find('ul:first').show();
                        $('.activity').append(ui.item.text() + ' sorted from init<br />');
                        tree.sort();
                        tree.setupDrop();
                        tree.refreshArrows('init');
                        tree.setupUsersDrag();
                    }
                }).disableSelection();
                tree.setupDrop();
                tree.refreshArrows('init');
                tree.setupUsersDrag();
            }
        };
    //$('.drag ul').find('> li').addClass('tiptop');
    tree.sort();
    tree.setupDrop();
    tree.refreshArrows('init');
    tree.setupUsersDrag();
    $('.drag').find('li').each(function(){
        if($(this).find('ul').length){
            $(this).addClass('tiptop');
        }
    });
    //list.addClass('tiptop');
    tree.setupClick();
    /*Clicking on a item*/
    $('.drag').find('a').on('click', function(){
        $('.activity').append('clicked me ' + $.trim($(this).text()) + "<br />");
    });
});