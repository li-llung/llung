(function ($) {
    var urls = ({
        queueList: "/queue/list", 									//Url.QueueList()
        queueDelete: "/queue/delete/{0}", 							//Url.QueueDelete("{0}")
        queueMoveToTop: "/queue/movetotop/{0}", 					//Url.QueueMoveToTop("{0}")
        queueUpdate: "/queue/update", 								//Url.QueueUpdate()
        queueMoveTo: "/queue/moveto/{0}/{1}", 						//Url.QueueMoveTo("{0}", "{1}")
    });

    var totalCoursesPerPage = 25; //global count of courses allowed per page
    var totalCourses = new Array(); //global array of course data
    var delayTime = 4000; //used in animated messages

    showQueue = function () {
        $.ajax({
            method: "POST",
            url: urls.queueList,
            data: null,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                data = jQuery.parseJSON(data);
                if (data.success == "True") {
                    for (var b = 0; b < data.queue.length; b++) {
                        var item = data.queue[b];
                        totalCourses.push(item);
                    }
                    totalCourses = simpleEval(totalCourses);
                    renderQueue(0);
                } else if (data.messages == "User is not logged in.") { window.location.href = '/home'; }
                else { console.log('Return message: ' + data.messages); }
            },
            error: function (jqXHR, textStatus, errorThrown) { showQueueError(jqXHR, textStatus, errorThrown); },
            complete: function (jqXHR, textStatus) { showQueueComplete(jqXHR, textStatus); },
            cache: false
        });
    };

    simpleEval = function (json) { return ("string" === typeof json) ? eval(json.charAt(0) != '(' ? '(' + json + ')' : json) : json; };

    showQueueError = function (jqXHR, textStatus, errorThrown) {
        $('#preloader').hide();
        $('#serverError').show();
        console.log("Text Status: " + textStatus + ", Error: " + errorThrown);
    };

    showQueueComplete = function (jqXHR, textStatus) { };

    renderQueue = function (startIndex) {
        var totalCourseLength = totalCourses.length;
        var count = 0;
        //'Load more' button displays, and button onclick value changes, depending on how many courses in the totalCourses returned are left to show. Max courses=200.
        var nextBtn = ((startIndex + totalCoursesPerPage) >= totalCourseLength + 1) ? "" : $('<a class="greybuttons loadmore" href="javascript:;" onclick="renderQueue(' + (startIndex + totalCoursesPerPage) + ')">Load more...</a>');
        var currentPageOfCourses = totalCourses.slice(startIndex, startIndex + totalCoursesPerPage);

        $('#btn_loadmore').html(""); //reset 'load more' Div

        if (currentPageOfCourses != null && totalCourseLength > 0) {
            // get current already rendered list of courses if exists and turn on 'down' button for last item before rendering new items
            if ($('.courselistitem').length > 0) { $('#qSortable li:last-child div.qSortBtns a.downcourse').removeClass('hide'); }

            for (var b = 0; b < currentPageOfCourses.length; b++) {
                var item = currentPageOfCourses[b];
                var courseURL = item.courseUrl;
                var percentComplete = item.percentComplete;
                var remaining = (item.percentComplete == '100') ? '' : ', ' + item.minutesRemaining + ' remaining';
                var newLI = document.createElement('li');
                $(newLI).attr('id', 'courseItem' + item.courseId).addClass('courselistitem');
                $('<div class="qPriority">' + item.priority + '</div>').appendTo(newLI);
                $('<a class="courselistmain" href="' + courseURL + '"><span class="major">' + item.courseName + '</span><span class="meta">' + percentComplete + '% complete' + remaining + '</span></a>').appendTo(newLI);
                var newDiv = document.createElement('div');
                $(newDiv).addClass('qSortBtns');
                $('<a href="javascript:;" class="greybuttons borderRad4 rmvcourse" onclick="deleteQueue(' + item.courseId + '); return false;"><span class="btnIcons symbol_x"></span></a>').appendTo(newDiv);
                var btn_up = $('<a href="javascript:;" class="greybuttons borderRad4 upcourse" onclick="moveToQueue(' + item.courseId + ', \'up\'); return false;"><span class="btnIcons symbol_up"></span></a>');
                var btn_down = $('<a href="javascript:;" class="greybuttons borderRad4 downcourse" onclick="moveToQueue(' + item.courseId + ', \'down\'); return false;"><span class="btnIcons symbol_down"></span></a>');
                var btn_top = $('<a href="javascript:;" class="greybuttons borderRad4 topcourse small" onclick="moveToTopQueue(' + item.courseId + '); return false;"><span class="btnIcons symbol_up"></span>top</a>');
                //if first course in the whole list, then hide 'up' and 'top' buttons for now
                if (item.priority == "1") {
                    $(btn_up).addClass('hide');
                    $(btn_top).addClass('hide');
                }
                //if last course in the current displayed list, then hide 'down' button for now
                if (count == (currentPageOfCourses.length - 1)) { $(btn_down).addClass('hide'); }
                $(btn_up).appendTo(newDiv);
                $(btn_down).appendTo(newDiv);
                $(btn_top).appendTo(newDiv);
                $(newDiv).appendTo(newLI);
                $(newLI).appendTo('#qSortable');
                count += 1;
            }
            //if items from initial list are deleted before 'load more' is clicked, make sure list order number is updated
 	        if(startIndex > 0)
 	            updateDisplaySortOrder();
            $(nextBtn).appendTo('#btn_loadmore');
            $('#backtotop').removeClass('hide');
        } else if (totalCourseLength == 0) {
            $('#listCnt').html('<div class="qEmpty">Your queue is empty.</div>');
            $('#backtotop').addClass('hide');
        }
        $('#preloader').hide();
    };


    //Delete Course
    deleteQueue = function (courseId) {
        $('#queueMsg').remove();
        $('#serverError').hide();
        $.ajax({
            method: "POST",
            url: urls.queueDelete.replace("{0}", courseId),
            data: null,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                data = jQuery.parseJSON(data);
                if (data.success == "True") {
                    deleteQueueSuccess(data, textStatus, jqXHR, courseId);
                } else if (data.messages == "User is not logged in.") { window.location.href = '/home'; }
                else { console.log('Return message: ' + data.messages); }
            },
            error: function (jqXHR, textStatus, errorThrown) { deleteQueueError(jqXHR, textStatus, errorThrown, courseId); },
            complete: function (jqXHR, textStatus) { deleteQueueComplete(jqXHR, textStatus); },
            cache: false
        });
    };

    deleteQueueSuccess = function (data, textStatus, jqXHR, courseId) {
        var liItem = "#courseItem" + courseId;
        var msg = "<div>This course has been removed from your queue:</div><div class='major'><a href='" + data.courseLink + "'>" + data.courseName + "&nbsp;&raquo;</a></div>";
        showInlineMsg(courseId, msg);
        $(liItem).remove();
        updateDisplaySortOrder(); 
        updateQueueMenuItem(data.itemsCount);
    };

    deleteQueueError = function (jqXHR, textStatus, errorThrown, courseId) { $('#serverError').show(); var msg = "Error: " + errorThrown; showInlineMsg(courseId, msg); };

    deleteQueueComplete = function (jqXHR, textStatus) { };

    //Move Course To Top
    moveToTopQueue = function (courseId) {
        $('#serverError').hide();
        $.ajax({
            method: "POST",
            url: urls.queueMoveToTop.replace("{0}", courseId),
            data: null,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                data = jQuery.parseJSON(data);
                if (data.success == "True") {
                    moveToTopSuccess(data, textStatus, jqXHR, courseId);
                } else if (data.messages == "User is not logged in.") { window.location.href = '/home'; }
                else { console.log('Return message: ' + data.messages); }
            },
            error: function (jqXHR, textStatus, errorThrown) { moveToTopError(jqXHR, textStatus, errorThrown, courseId); },
            complete: function (jqXHR, textStatus) { moveToTopComplete(jqXHR, textStatus); },
            cache: false
        });
    };

    moveToTopSuccess = function (jqXHR, textStatus, errorThrown, courseId) {
        var liItem = "#courseItem" + courseId;
        $('#qSortable').prepend($(liItem));
         updateDisplaySortOrder();
        $(liItem).css("background-color", "#E8F2FF").animate({ backgroundColor: '#FFF' }, delayTime);
    };

    moveToTopError = function (jqXHR, textStatus, errorThrown, courseId) { $('#serverError').show(); var msg = "Error: " + errorThrown; showInlineMsg(courseId, msg); };

    moveToTopComplete = function (jqXHR, textStatus) { };

    //Switch Course1 with Course2
    moveToQueue = function (courseId1, direction) {
        $('#serverError').hide();
        var liItem = "#courseItem" + courseId1;
        var index = $(liItem).index();
        var courseId2 = (direction == 'up') ? $("#qSortable li:eq(" + (index - 1) + ")").attr('id').replace('courseItem', '') : $("#qSortable li:eq(" + (index + 1) + ")").attr('id').replace('courseItem', '');
        $.ajax({
            method: "POST",
            url: urls.queueMoveTo.replace("{0}", courseId1).replace("{1}", courseId2),
            data: null,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                data = jQuery.parseJSON(data);
                if (data.success == "True") {
                    moveToSuccess(data, textStatus, jqXHR, courseId1, direction);
                } else if (data.messages == "User is not logged in.") { window.location.href = '/home'; }
                else { console.log('Return message: ' + data.messages); }
            },
            error: function (jqXHR, textStatus, errorThrown) { moveToError(jqXHR, textStatus, errorThrown, courseId1); },
            complete: function (jqXHR, textStatus) { moveToComplete(jqXHR, textStatus); },
            cache: false
        });
    };

    moveToSuccess = function (jqXHR, textStatus, errorThrown, courseId, direction) {
        var liItem = "#courseItem" + courseId;
        var index = $(liItem).index();
        (direction == 'up') ? $("#qSortable li:eq(" + (index - 1) + ")").before($(liItem)) : $("#qSortable li:eq(" + (index + 1) + ")").after($(liItem));
        updateDisplaySortOrder();
        $(liItem).css("background-color", "#E8F2FF").animate({ backgroundColor: '#FFF' }, delayTime);
    };

    moveToError = function (jqXHR, textStatus, errorThrown, courseId1) { $('#serverError').show(); var msg = "Error: " + errorThrown; showInlineMsg(courseId1, msg); };

    moveToComplete = function (jqXHR, textStatus) {  };

    // Since pagination has to be done without a complete list refresh, need to update numbering without AJAX
    updateDisplaySortOrder = function () {
        var currentQueue = $("#qSortable").find("li");
        var len = currentQueue.length;
        if (len > 0) {
            $(currentQueue).each(function (i) {
                $("#" + this.id + " div.qPriority").html(i + 1); // reorder list visually
                if (i == 0) { // first item
                    $("#" + this.id + " div.qSortBtns a.upcourse").addClass("hide");
                    $("#" + this.id + " div.qSortBtns a.downcourse").removeClass("hide");
                    $("#" + this.id + " div.qSortBtns a.topcourse").addClass("hide");
                } else if (i == len - 1) { // last item
                    $("#" + this.id + " div.qSortBtns a.upcourse").removeClass("hide");
                    $("#" + this.id + " div.qSortBtns a.downcourse").addClass("hide");
                    $("#" + this.id + " div.qSortBtns a.topcourse").removeClass("hide");
                } else { // all other items
                    $("#" + this.id + " div.qSortBtns a.upcourse").removeClass("hide");
                    $("#" + this.id + " div.qSortBtns a.downcourse").removeClass("hide");
                    $("#" + this.id + " div.qSortBtns a.topcourse").removeClass("hide");
                }
            });
        } else {
            $('#listCnt').html('<div class="qEmpty">Your queue is empty.</div>');
            $('#backtotop').addClass('hide');
        }
    };

    showInlineMsg = function (courseId, msg) {
        $('#queueMsg').remove();
        var liItem = "#courseItem" + courseId;
        var outerdiv = document.createElement('div');
        outerdiv.id = "queueMsg";
        outerdiv.setAttribute("class", 'queueMsg queuePageMsg');
        $(outerdiv).html(msg);
        $(liItem).after(outerdiv);
        $(outerdiv).slideDown('slow', function () {
            //if the message does not appear within the viewport, scroll up to show it
            var liHt = $(liItem).height();
            var outerDivHt = $(outerdiv).height();
            var scrollTop = document.body.scrollTop;
            var scrollBottom = parseInt(scrollTop + window.innerHeight);
            var outerDivBottom = parseInt($(outerdiv).offset().top + outerDivHt);
            var scrollDist = parseInt((outerDivBottom + outerDivHt / 2) - window.innerHeight);
            //parseInt(scrollTop+liHt+outerDivHt) //alernate calc
            if (outerDivBottom && outerDivBottom > scrollBottom)
                $('html, body').animate({ scrollTop: scrollDist }, 'slow');
        }).delay(delayTime).slideUp('slow', function () { $(this).remove(); });
    };

    updateQueueMenuItem = function (newNo) {
        if($('#qCount').length > 0) $('#qCount').html(newNo);
    };

})(jQuery);