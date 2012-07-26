(function ($) {
    var methods = {
        handbook: function (options) {
            //alert(options.chapter);
            //alert('all your base are belong to us');
            var hb = this;
            /*-------------------------------------------------------------Handbook Page-------------------------------------------------------------*/
            //alert(options.revalidate_url);
            /*Start Global Variables*/
            var chapter = options.chapter,
                    sub_chapter = options.sub_chapter,
                    sub_sub_chapter = options.sub_sub_chapter,
                    expanded = false,
                    collapsed = false;

            /*End Global Variables*/

            /*Start Global Functions*/
            /*Start Private*/
            this.setup = function () {
                jQuery(document).ready(function () {
                    jQuery(".toc a, .controls a").live("click", function (event) {
                        var my_id = $(this).attr('id').substr(4);
                        var my_text = $(this).text();
                        var my_anchor = $(this).attr('id');
                        hb.load_content(my_id, my_text, my_anchor);
                        expanded = false;
                        collapsed = false;
                    });
                    jQuery("#expand").click(function () {
                        jQuery(".sub").show();
                        jQuery(".tableOfContents ul").show();
                        jQuery('.toc li a.link_bullet, .toc li a.link_bullet_down').each(function () {
                            if ($(this).parent().find("ul").length > 0) {
                                jQuery(this).removeClass('link_bullet').addClass('link_bullet_down');
                            }
                        });
                        expanded = true;
                        collapsed = false;
                    });
                    jQuery("#collapse").click(function () {
                        jQuery(".sub").hide();
                        jQuery(".tableOfContents ul ul").hide();
                        jQuery('.toc li a.link_bullet, .toc li a.link_bullet_down').each(function () {
                            if ($(this).parent().find("ul").length > 0) {
                                jQuery(this).removeClass('link_bullet_down').addClass('link_bullet');
                            }
                        });
                        expanded = false;
                        collapsed = true;
                    });
                    jQuery('.toc li a').each(function () {
                        jQuery(this).click(function () {
                            if ($(this).parent().find("ul").length > 0) {
                                jQuery('.toc li a.link_bullet, .toc li a.link_bullet_down').removeClass('link_bullet_down').addClass('link_bullet');
                            }
                            if ($(this).next().css('display') == 'none') {
                                $(this).next().show();
                                $(this).removeClass('link_bullet').addClass('link_bullet_down');
                            } else {
                                ($(this).parent().find("ul").length > 0) ? $(this).removeClass('link_bullet').addClass('link_bullet_down') : $(this).removeClass('link_bullet_down').removeClass('link_bullet');
                                if ($(this).parent().find("ul").length > 0) {
                                    $(this).removeClass('link_bullet_down').addClass('link_bullet');
                                }
                                $(this).next().hide();
                            }
                            $(this).parents('.section_toc').show();
                            $(this).parents('.section_toc').prev().removeClass('link_bullet').addClass('link_bullet_down');
                        });
                    });
                    jQuery('.toc li').each(function () {
                        ($(this).find("ul").length > 0) ? $(this).find('a').addClass('link_bullet') : $(this).find('a').removeClass('link_bullet');
                    });
                    hb.redirect(chapter, sub_chapter, sub_sub_chapter);
                });
                jQuery(window).scroll(function () {
                    var nav_tabletop = $(window).scrollTop();
                    if (jQuery(window).scrollTop() > 203) {
                        jQuery("#sub-head").css('top', (nav_tabletop - 34));
                    } else {
                        jQuery("#sub-head").css('top', '203px');
                    }
                });
            };
            /*End Private*/
            /*Start Public*/
            this._is = function (what, item) {
                var you = $(item);

                switch (what) {
                    case "expanded":
                        return (expanded);
                        break;
                    case "collapsed":
                        return (collapsed);
                        break;
                    case "open":
                        return (you.next().css('display') == 'block');
                        break;
                    case "closed":
                        return (you.next().css('display') == 'none');
                        break;
                    case "chapter":
                        return (you.parents("ul").hasClass("chapter_toc") || you.hasClass('chapter_links'));
                        break;
                    case "section":
                        return (you.parents("ul").hasClass("section_toc") || you.hasClass('section_links'));
                        break;
                    case "sub_section":
                        return (you.parents("ul").hasClass("sub_section_toc") || you.hasClass('sub_section_links'));
                        break;
                    case "anchored":
                        return (you.hasClass('anchor'));
                        break;
                    case "list":
                        return (you.is("ul"));
                    case "has_ul":
                        return (you.find("ul").length > 0);
                        break;
                    default:
                }
            };
            this.load_content = function (id, chapter_name, anchor) {
                jQuery.ajax(
                {
                    type: "GET",
                    url: options.manual_content,
                    data: { "CategoryID": id },
                    success: function (result) {
                        if (result != null) {
                            jQuery('.manualContent').html(result);
                            jQuery('#chapterContent').show();
                        }
                    }
                }
                );
                jQuery.ajax(
                {
                    type: "GET",
                    url: options.manual_sibling,
                    data: { "CategoryID": id },
                    success: function (result) {
                        if (result != null) {
                            var prev = result.Previous;
                            var next = result.Next;
                            if (prev == '0') {
                                jQuery('.prevChapterNav').hide();
                            } else {
                                jQuery('.prevChapterNav').html("<a href='javascript:void(0);' id='con_" + result.Previous + "'>&larr; previous</a>").show();
                            }
                            /*onclick='loadContent("+result.Previous+","+result.CategoryID+","+result.CategoryID+");'*/
                            (prev != '0' && next != '0') ? jQuery('.ChapterNavSep').html(' | ') : jQuery('.ChapterNavSep').hide();
                            if (next == '0') {
                                jQuery('.nextChapterNav').hide();
                            } else {
                                jQuery('.nextChapterNav').html("<a href='javascript:void(0);' id='con_" + result.Next + "'>next &rarr;</a>").show();
                            }
                        }
                    }
                });
                $(".toc_links").removeClass("anchor");
                if (isNaN(chapter_name) && chapter_name != '&larr; previous' && chapter_name != 'next &rarr;' && chapter_name != 'next →' && chapter_name != '← previous') {
                    //toc
                    $("#chapter-head").text(chapter_name);
                    $("#" + anchor).addClass("anchor");
                    $("#" + anchor).parents('.section_toc').prev().addClass("anchor");
                    $("#" + anchor).parents('.sub_section_toc').prev().addClass("anchor");
                } else {
                    //prev and next
                    var head_title = $("#toc_" + id).parents('.sub_section_toc').prev().text();
                    $("#chapter-head").text(head_title);
                    $("#toc_" + id).addClass("anchor");
                    $("#toc_" + id).parents('.section_toc').prev().addClass("anchor");
                    $("#toc_" + id).parents('.sub_section_toc').prev().addClass("anchor");

                    if ($("#toc_" + id).next().css('display') == 'none') {
                        if (this._is('sub_section', "#toc_" + id)) {
                            if (chapter_name == '&larr; previous' || chapter_name == '? previous') {
                                $("#toc_" + id).parent().next().find("ul").hide();
                            } else if (chapter_name == 'next &rarr;' || chapter_name == 'next ?') {
                                $("#toc_" + id).parent().prev().find("ul").hide();
                            }
                        } else if (this._is('section', "#toc_" + id)) {
                            if (chapter_name == '&larr; previous' || chapter_name == '? previous') {
                                $("#toc_" + id).parent().next().find("ul").hide();
                            } else if (chapter_name == 'next &rarr;' || chapter_name == 'next ?') {
                                $("#toc_" + id).parent().prev().find("ul").hide();
                            }
                        }
                        $("#toc_" + id).next().show();
                    } else {
                        $("#toc_" + id).next().hide();
                    }
                }
            };
            this.search = function (page) {
                var q = jQuery('#searchBox').val(),
                    isActiveAuthor = options.is_active_author,
                    isPotentialAuthor = options.is_potential_author;
                if (q.length > 0) {
                    var url = 'ajax/search.aspx?q=' + escape(q);

                    url += '&page=' + page;
                    url += '&sa=' + 'true';
                    url += "&f=producttypeid:100";
                    if (isActiveAuthor)
                        url += escape('\nfree:True');
                    else if (isPotentialAuthor)
                        url += escape('\ncc:True');
                    jQuery.ajax({ async: true, url: url, type: 'GET', dataType: 'string', success: render });
                }
            };
            this.redirect = function (chapter, sub_chapter, sub_sub_chapter) {
                if (sub_sub_chapter > 0) {
                    jQuery('.toc .chapter_links').eq(chapter).next().show().find('.section_links').eq(sub_chapter).next().show().find('.sub_section_links').eq(sub_sub_chapter).trigger('click');
                } else {
                    if (sub_chapter >= 0) {
                        jQuery('.toc .chapter_links').eq(chapter).next().show().find('.section_links').eq(sub_chapter).trigger('click').next().show();
                    } else {
                        if (chapter >= 0) {
                            jQuery('.toc .chapter_links').eq(chapter).trigger('click').next().show();
                        }
                    }
                }
            };
            /*End Public*/
            /*End Global Functions*/

            //alert(setup);
            this.setup();
        }
    };
    $.fn.setup = function (method) {

        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tooltip');
        }
    };
})(jQuery);