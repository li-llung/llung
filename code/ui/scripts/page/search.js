(function(lynda, lp, jQuery) {
    lp.search = function(Options) {
        var self = this;
        var options = jQuery.extend({
            'isLoggedIn': '',
            'isAbusive': '',
            'urlTemplates': { '2': '', '3': '', '4': '', '1000': '', 'register': '', 'abusive': '','restricted':'' },
            'query': '',
			isAdobeIP: false,
			limitedAccessCourses : {},
			limitedAccessCoursePopupURL: ""
        }, Options);
        var filtersMax = 5;
        var filterMaxItems = 4;
        var TAB_COURSES = 0, TAB_MOVIES = 1, TAB_SITE = 2;
        var tabIndex = 0;
        var tooltips, filterModal;
        var isLoggedIn = options.isLoggedIn;
        var isAbusive = options.isAbusive;
        var templates = {
            tab: '<li class="nav-option"><a href="#">{0}</a></li>',
            tabSelected: '<li class="nav-option current"><a href="#">{0}</a></li>',
            tabHidden: '<li class="nav-option" style="display:none"><a href="#">{0}</a></li>',

            trayQuery: '<span>&ldquo;{0}&rdquo;</span>',
            trayFilter: '<li class="callout extra"><b>{0}</b>: {1}</li>',
            trayFilterFirst: '<li class="callout"><b>{0}</b>: {1}</li>',

            filter: '<div class="column"><div class="title">{0}</div><ul>{1}</ul></div>',
            filterLast: '<div class="column last"><div class="title">{0}</div><ul>{1}</ul></div>',
            filterItem: '<li {2}><a href="javascript:void(0);">{0} <span>({1})</span></a></li>',
			filterItem_Version: '<li {3}><a href="javascript:void(0);">{0} <span name="{2}">({1})</span></a></li>',
            //filterEmpty:'<div class="empty">You have selected all filter options and your results are below.</div>',
            filterEmpty: '',
			adobeIP: {
			notSelected: '<li class="adobefilter"><a class="adobeCallOut" onclick="{0}">{1}</a><a onclick="{0}" class="btn-mini"><span>off</span></a><a class="preselectedTooltip" href="{2}">&nbsp;</a></li>',
			Selected: '<li class="adobefilter"><a class="adobeCallOutSelected" onclick="{0}">{1}</a><a onclick="{0}" class="btn-mini"><span>on</span></a><a class="preselectedTooltip" href="{2}">&nbsp;</a></li>'
				},
            itemHeadCourses: '<thead><tr><th class="title" style="width: 640px;"><a href="">Course name <span class="sprite dbl-arrow-gray">&nbsp;</span></a></th><th class="level"><a href="">Level <span class="sprite dbl-arrow-gray">&nbsp;</span></a></th><th class="duration"><a href="">Duration <span class="sprite dbl-arrow-gray">&nbsp;</span></a></th><th class="date"><a href="">Released <span class="sprite dbl-arrow-gray">&nbsp;</span></a></th><th class="cc"><a href="" class="sprite ccicon" title="closed caption">&nbsp;<span class="sprite dbl-arrow-gray"></span></a></th><th class="cd"><a href="" class="sprite cdicon" title="compact disc">&nbsp;<span class="sprite dbl-arrow-gray"></span></a></th></tr></thead>',
            itemHeadMovies: '<thead><tr><th class="movie"><a href="">Movie name <span class="sprite dbl-arrow-gray">&nbsp;</span></a></th><th class="title"><a href="">Course name <span class="sprite dbl-arrow-gray">&nbsp;</span></a></th><th class="level"><a href="">Level <span class="sprite dbl-arrow-gray">&nbsp;</span></a></th><th class="duration"><a href="">Duration <span class="sprite dbl-arrow-gray">&nbsp;</span></a></th><th class="date"><a href="">Released <span class="sprite dbl-arrow-gray">&nbsp;</span></a></th><th class="cc"><a href="" class="sprite ccicon" title="closed caption">&nbsp;<span class="sprite dbl-arrow-gray"></span></a></th><th class="cd"><a href="" class="sprite cdicon" title="compact disc">&nbsp;<span class="sprite dbl-arrow-gray"></span></a></th></tr></thead>',
            itemHeadSite: '<thead><tr><th class="title"><a href="">Title <span class="sprite dbl-arrow-gray">&nbsp;</span></a></th></tr></thead>',

            itemCourse: '<tr class="gray-back"><td><a cid="{0}" href="{1}">{2}</a><br/><div class="sub">{4}<br/>Author: <a href="{6}">{7}</a></div></td><td>{8}</td><td>{9}</td><td>{10}</td><td>{11}</td><td>{3}</td></tr>',
            itemMovie: '<tr class="gray-back"><td><a href="{2}">{3}</a><br/><div class="chapter"><a href="{5}">{6}</a></div></td><td><a cid="{1}" href="{7}">{8}</a></td><td>{12}</td><td>{13}</td><td>{14}</td><td>{15}</td><td>{4}</td></tr>',
            itemSite: '<tr class="gray-back"><td><a href="{0}">{1}</a><br/><div class="sub">{2}</div></td></tr>',

            itemTranscript0: '{0}',
            itemTranscript1: '<a href="{0}">{1}</a>',

            iconDvd: '<a href="" onclick="return false" class="sprite cdicon" title="compact disc">&nbsp;</a>',
            iconCc: '<a href="" onclick="return false" class="sprite ccicon" title="closed caption">&nbsp;</a>',
            iconNoCc: '&nbsp;',
            iconBeginner: '<a href="" onclick="return false" class="sprite level1" title="beginner">&nbsp;</a>',
            iconIntermediate: '<a href="" onclick="return false" class="sprite level2" title="intermediate">&nbsp;</a>',
            iconAdvanced: '<a href="" onclick="return false" class="sprite level3" title="advanced">&nbsp;</a>',
            iconAll: '<a href="" onclick="return false" class="sprite level4" title="for all audiences">&nbsp;</a>',

            iconSortNone: '<span class="icon sort none">&nbsp;</span>',
            iconSortAsc: '<span class="icon sort asc">&nbsp;</span>',
            iconSortDesc: '<span class="icon sort desc">&nbsp;</span>',
            iconMovie: '',
            iconMovieFree: '',

            pagerPrev: '<li><a class="prev" href="#">&laquo; Prev</a></li>',
            pagerNext: '<li><a class="next" href="#">Next &raquo;</a></li>',
            pagerPage: '<li><a href="#">{0}</a></li>',
            pagerSelectedPage: '<li><a class="s" href="#">{0}</a></li>',
            pagerGap: '<li><span>...</span></li>',

            resultsFootText: 'showing {0}-{1} of {2}',
            resultsFootTextNoResult: 'no results',

            resultsOnNoTabs: '<div class="noresults_msg"><h3>Your search for <span class="searchAspect">{0}</span> returned no results.</h3><p>Search tips:</p><ul><li>Try using single words (such as <i>Photoshop</i> or <i>spreadsheet</i>)</li><li>Search for a less specific term</li><li>Use our search filters to narrow your results</li><li>Double-check your spelling</li><ul></div>',
            noResultsOnOneTab: '<div class="tray noResults"><i>Your selections returned no results.</i><br/>Please remove one or more selections or clear all selections to start over.</div>',
            selectOption: '<option value="{0}">{1}</option>',

            itemFreeCourse: '<tr class="white-back"><td><a cid="{0}" href="{1}">{2}</a><br/><div class="sub">{4}<br/>Author: <a href="{6}">{7}</a></div></td><td>{8}</td><td>{9}</td><td>{10}</td><td>{11}</td><td>{3}</td></tr>',
            itemFreeMovie: '<tr class="white-back"><td><a href="{2}">{3}</a><br/><div class="chapter"><a href="{5}">{6}</a></div></td><td><a cid="{1}" href="{7}">{8}</a></td><td>{12}</td><td>{13}</td><td>{14}</td><td>{15}</td><td>{4}</td></tr>',
            itemFreeSite: '<tr class="white-back"><td><a href="{0}">{1}</a><br/><div class="sub">{2}</div></td></tr>'
        };

        var urlTemplates = options.urlTemplates;

        var url = function(index, typeid, courseid, id) {
            if (typeof (id) == 'string' && id.indexOf('a') == 0)
                id = id.substring(1);

            var tracking = 'index:' + index + '\nlinktypeid:' + typeid;
            var opts = generateSearchOptions();
            for (var o in opts)
                tracking += '\n' + (o != 'f' ? (o + ':') : '') + opts[o];

			if(urlTemplates[typeid.toString()])
			{
				var u=String.format(urlTemplates[typeid.toString()],courseid,id,(urlTemplates[typeid.toString()].indexOf('?')!= -1?'&':'?')+'srchtrk='+escape(tracking)); 
				return u.indexOf('http') >= 0 ?u:(lynda.baseUrl+u);
			}
			
            return id + (id.indexOf('?') != -1 ? '&' : '?') + 'srchtrk=' + escape(tracking);
        };

        var filterNames = {
            "category_facet": "subject",
            "software_facet": "software",
            "vendor_facet": "vendor",
            "author_facet": "author",
            "release_year": "release year",
            "meta_subject_facet": "subject",
            "meta_topic_facet": "subtopic",
            "meta_software_facet": "software",
            "meta_company_facet": "company",
            "version_facet" : "version"
        };
        var filterNamesLookup = {
            "subject": "category_facet",
            "software": "software_facet",
            "vendor": "vendor_facet",
            "author": "author_facet",
            "release year": "release_year",
            "subject": "meta_subject_facet",
            "subtopic": "meta_topic_facet",
            "software": "meta_software_facet",
            "company": "meta_company_facet",
            "version" : "version_facet"
        };
		var filterOrder = [
			"meta_subject_facet",
			"meta_topic_facet",
			"meta_software_facet",
			"version_facet",
			"meta_company_facet",
			"author_facet",
			"release_year"
		];
		var productidTypes = {
			"IPProgram": "1006",
			"Acrobat8" : "1007",
			"IPProgramAdobe" : "1009"
		};
        this.query = { text: options.query, filters: { "producttypeid": ["4"]}, page: 1, sort: 'relevance', sortAscending: true };
        var tabOptions = [{ text: 'courses', id: 2, display: false }, { text: 'movies', id: 4, display: false }, { text: 'entire site', id: 0, display: false}];
        var sortOptions = [{ sort: 'relevance', asc: true }, { sort: 'title_string', asc: true }, { sort: 'author', asc: true }, { sort: 'release_date', asc: false }, { sort: 'duration', asc: true }, { sort: 'level', asc: true }, { sort: 'course_name', asc: true }, { sort: 'cc', asc: false }, { sort: 'dvd', asc: false}];
        var queryFilters = { lastid: '4', filters: { "producttypeid": ["4"]} };

        var logPageView = function() {
            var url = '/search.aspx?q=' + escape(self.query.text);
            for (var f in self.query.filters) {
                for (var a = 0, cnt = self.query.filters[f].length; a < cnt; a++) {
                    if (filterNames[f]) {
                        url += '+ref-' + filterNames[f].replace(" ", "-") + '-';
                        url += self.query.filters[f][a].replace(" ", "-");
                    }
                    else {
                        switch (f) {
                            case "dvd":
                            case "cc":
                                url += '+' + f + '-on';
                                break;
                            case "level":
                                url += '+level-' + self.query.filters[f][a].replace(" ", "-");
                                break;
                        }
                    }
                }
            }

            //if(self.query.page > 1)
            url += '+page-' + self.query.page;

            //if(self.query.sort != 'relevance')
            url += '+sortby-' + self.query.sort + '-' + (self.query.sortAscending ? 'asc' : 'desc');


            var id = 0, urlSCat = '&scat=Site';
            if (self.query.filters.producttypeid && self.query.filters.producttypeid.length > 0)
                id = self.query.filters.producttypeid[0];
            for (var a = 0, cnt = tabOptions.length; a < cnt; a++) {
                if (id == tabOptions[a].id) {
                    urlSCat = '&scat=' + tabOptions[a].text;
                    break;
                }
            }
            url += urlSCat;

            //pageTracker._trackPageview(url);			
        };

        this.clickClear = function() {
            self.query = { text: options.query, filters: { "producttypeid": [self.query.filters.producttypeid]}, page: 1, sort: 'relevance', sortAscending: true };
            self.SetQueryCookies();
            self.search();
            return false;
        };
        this.clickRemove = function() {
            var e = jQuery(this);
            var filter = e.find('b');
            if (filter.length > 0) {
                var raw = filter.text();
                var filterText = filterNamesLookup[raw];
                var val = e.text();
                val = val.substring(raw.length + 2, val.length);
                removeFilter(filterText, val);
            }
            return false;
        };
        this.clickReplace = function() {
            var e = jQuery(this);
            var filter = e.parent().parent().parent().find('div.title');
            if (filter.length > 0) {
                var filterText = filterNamesLookup[filter.text()]; 
                var val = e.text(); 
                val = val.substring(0, val.indexOf('(') - 1);
				if(filterText == "version_facet")
				{
					val = jQuery(e).find('span').attr('name'); 
				}
                replaceFilter(filterText, val);
            }
            return false;
        };
		
        this.changePage = function(page) {
            if (page == self.query.page)
                return false;
            self.query.page = page;
            self.SetQueryCookies();
            self.search();
            return false;
        };
        this.changeSort = function(parameters, element) {
            var field = parameters.sort;
            var asc = parameters.asc;
            if (field == self.query.sort && asc == self.query.sortAscending)
                asc = !asc;
            self.query.sort = field;
            if (field != 'relevance')
                self.query.sortAscending = asc;
            self.SetQueryCookies();
            self.search();
            return false;
        };
        this.tabClick = function() {
            var e = jQuery(this);

            var txt = e.text(), id = 0;
            for (var a = 0, cnt = tabOptions.length; a < cnt; a++) {
                if (txt == tabOptions[a].text) {
                    id = tabOptions[a].id;
                    break;
                }
            }

            self.query.sort = 'relevance';
            self.query.sortAscending = true;
            self.query.page = 1;
            if (id > 0) {
                if (queryFilters.lastid <= 0) {
                    self.query.filters = queryFilters.filters;
                    queryFilters.lastid = id;
                    queryFilters.filters = self.query.filters;
                }
                replaceFilterSet("producttypeid", [id]);
            }
            else if (self.query.filters["producttypeid"]) {
                queryFilters.lastid = 0;
                queryFilters.filters = self.query.filters;
                self.query.filters = {};
                replaceFilterSet("producttypeid", ["1000", "2000", "2001", "2002", "2003"]);
            }
            return false;
        };
        this.SetQueryCookies = function() {
            createCookie("WebSearchPageView_Filters", escape(jQuery.toJSON(this.query.filters)), 1);
            createCookie("WebSearchPageView_LastQuery", this.query.text, 1);
            createCookie("WebSearchPageView_Page", this.query.page, 1);
            createCookie("WebSearchPageView_sort", this.query.sort, 1);
            createCookie("WebSearchPageView_sortAscending", this.query.sortAscending, 1);
        };
        this.GetQueryCookies = function() {
            var lastQuery = this.query.text;
            if (readCookie("WebSearchPageView_LastQuery") != null) lastQuery = readCookie("WebSearchPageView_LastQuery");
            if (lastQuery == this.query.text) //remember previous queries only if this is a old search query bug 1097
            {
                if (readCookie("WebSearchPageView_Filters") != null) { this.query.filters = simpleEval(readJSONCookie("WebSearchPageView_Filters")); }
                if (readCookie("WebSearchPageView_Page") != null) { this.query.page = readCookie("WebSearchPageView_Page"); }
                if (readCookie("WebSearchPageView_SortAscending") != null) { this.query.sortAscending = readCookie("WebSearchPageView_SortAscending"); }
                if (readCookie("WebSearchPageView_sort") != null) { this.query.sort = readCookie("WebSearchPageView_sort"); }
            }
        };
        this.ClearQueryCookies = function() {
            eraseCookie("WebSearchPageView_Filters");
            eraseCookie("WebSearchPageView_Page");
            eraseCookie("WebSearchPageView_SortAscending");
            eraseCookie("WebSearchPageView_sort");
        }
        var replaceFilter = function(name, val) { 
            replaceFilterSet(name, [val]);
        };
        var replaceFilterSet = function(name, val) { 
            self.query.filters[name] = val;

            self.query.sort = 'relevance';
            self.query.sortAscending = true;
            self.query.page = 1;
            self.SetQueryCookies();
            self.search();
        };
        var appendFilter = function(name, val) { 
            if (!self.query.filters[name])
                self.query.filters[name] = [val];
            else if (self.query.filters[name].indexOf(val) == -1)
                self.query.filters[name].push(val);

            self.query.sort = 'relevance';
            self.query.sortAscending = true;
            self.query.page = 1;
            self.SetQueryCookies();
            self.search();
        };
        var removeFilter = function(name, val) { 
            if (!self.query.filters[name])
                return;
			if(name == "version_facet")
			{
				var re = new RegExp("[0-9]*\\^[" + val + "]");
				for(var vf = 0; vf < self.query.filters[name].length; vf++)
				{
					 if(self.query.filters[name][vf].match(re))
					 {
						self.query.filters[name].remove(vf);
						break;
					 }
				}
			}	
            var index = jQuery.inArray(val, self.query.filters[name]);
            if (index != -1)
                self.query.filters[name].remove(index);
            if (self.query.filters[name].length == 0)
                delete self.query.filters[name];

            self.query.sort = 'relevance';
            self.query.sortAscending = true;
            self.query.page = 1;
            self.SetQueryCookies();
            self.search();
        };

        var generateSearchOptions = function() {
            var filters = '';
            for (var f in self.query.filters) {
                if (filters.length > 0)
                    filters += '\n';
                filters += f + ':' + self.query.filters[f].join('\t');
            }
            var opts = { "q": self.query.text, "page": self.query.page, "s": self.query.sort, "sa": self.query.sortAscending };
            if (filters.length > 0)
                opts.f = filters;
            return opts;
        };

        var simpleEval = function(json) { return ("string" === typeof json) ? eval(json.charAt(0) != '(' ? '(' + json + ')' : json) : json; };
        var ajax = function(parameters) { jQuery.ajax({ async: true, url: lynda.baseUrl + "ajax/search.aspx", type: 'GET', data: parameters, dataType: 'string', success: self.render, traditional: true }); };
        var prerender_ajax = function(parameters, callBack) { jQuery.ajax({ async: false, url: lynda.baseUrl + "ajax/search.aspx", type: 'GET', data: parameters, dataType: 'string', success: callBack, traditional: true }); };

        this.search = function() {
            jQuery('div.nosearchresults').hide();
            jQuery('div.searchWrapper2').show();
            jQuery('div.options').show();
            jQuery('table#tbl-subject').show();
            self.GetQueryCookies();
            loadingFade(true, ['div.searchWrapper', 'div.searchWrapper2']);

			//ip programs - productid
			if(jQuery('input#showAdobeIPOnly').val() == "true")
				self.query.filters.productid = ["1009"];
			else
				delete self.query.filters["productid"];

            var opts = generateSearchOptions(); 
            logPageView();
            self.SetQueryCookies();
            ajax(opts);
        };

        this.firstSearch = function() {
            var setDisplay = function(enable) {
                var id = 0;
                if (self.query.filters.producttypeid && self.query.filters.producttypeid.length > 0)
                    id = self.query.filters.producttypeid[0];
                if (id > 4) { id = 0; }
                var tabs = jQuery('ul.subsection-nav');
                for (var a = 0, cnt = tabOptions.length; a < cnt; a++) {
                    if (id == tabOptions[a].id) {
                        tabOptions[a].display = enable;
                        break;
                    }
                }
            };
            var count = function(data) { data = simpleEval(data); return (data && data.results && data.results.count > 0) ? data.results.count : 0; };

            var a1 = 0, a2 = 0, a3 = 0;

            self.query.filters["producttypeid"] = ["4"];
            prerender_ajax(generateSearchOptions(), function(data) { a1 = count(data); });
            setDisplay(a1 > 0);

            self.query.filters["producttypeid"] = ["2"];
            prerender_ajax(generateSearchOptions(), function(data) { a2 = count(data); });
            setDisplay(a2 > 0);

            self.query.filters["producttypeid"] = ["1000", "2000", "2001", "2002", "2003"];
            prerender_ajax(generateSearchOptions(), function(data) { a3 = count(data); });
            setDisplay(a3 > 0);

            if (a2 > 0)
                self.query.filters["producttypeid"] = ["2"];
            else if (a1 > 0)
                self.query.filters["producttypeid"] = ["4"];
            else if (a3 > 0)
                self.query.filters["producttypeid"] = ["1000", "2000", "2001", "2002", "2003"];

            self.search();
        };

        this.changeSortValues = function() {
            var asc = self.query.sortAscending;

            var hp = jQuery('table#tbl-subject > thead > tr');
            hp.find('th > a > span')
				.removeClass('dbl-arrow-gray-white')
				.removeClass('dbl-arrow-white-gray')
				.addClass('dbl-arrow-gray');

            var i = {
                'relevance': '#nothingWillMatchThis',
                'title_string': 'th.movie > a > span',
                'author': '#nothingWillMatchThis',
                'release_date': 'th.date > a > span',
                'duration': 'th.duration > a > span',
                'level': 'th.level > a > span',
                'course_name': 'th.title > a > span',
                'cc': 'th.cc > a > span',
                'dvd': 'th.cd > a > span'
            };

            jQuery(i[self.query.sort])
				.removeClass('dbl-arrow-gray')
				.addClass(asc ? 'dbl-arrow-white-gray' : 'dbl-arrow-gray-white');
        };

        this.render = function(data) { 
            data = simpleEval(data);
            renderTabs();
            if (!data.results.count > 0) {
                var id = 0;
                if (self.query.filters.producttypeid && self.query.filters.producttypeid.length > 0)
                    id = self.query.filters.producttypeid[0];
                var tabType = "movie";
                if (id == 2) { tabType = "course"; } else if (id == 0) { tabType = "site"; }
                jQuery('div.searchWrapper2').hide();
                jQuery('table#tbl-subject').html('');
                renderOptions_NoResults(data.results);
                loadingFade(false, []);
                return;
            }

            renderOptions(data.results); 
            renderItems(data.results, data.pager);
            renderPagination(data.pager);

            jQuery("div#filter-wrapper").css({ "background-color": "", "height": "" });
            
            // sort icons
            self.changeSortValues();

            // add links
            var hp = jQuery('table#tbl-subject > thead > tr');
            hp.find('th.movie > a').unbind('click').click(function() { self.changeSort(sortOptions[1], this); return false; });
            hp.find('th.level > a').unbind('click').click(function() { self.changeSort(sortOptions[5], this); return false; });
            hp.find('th.duration > a').unbind('click').click(function() { self.changeSort(sortOptions[4], this); return false; });
            hp.find('th.date > a').unbind('click').click(function() { self.changeSort(sortOptions[3], this); return false; });
            hp.find('th.title > a').unbind('click').click(function() { self.changeSort(sortOptions[6], this); return false; });
            hp.find('th.cc > a').unbind('click').click(function() { self.changeSort(sortOptions[7], this); return false; });
            hp.find('th.cd > a').unbind('click').click(function() { self.changeSort(sortOptions[8], this); return false; });

            if (tooltips)
                tooltips.dispose();
            tooltips = new lynda.toolTip();
            if (filterModal)
                filterModal.dispose();
            filterModal = new lynda.filterOverflow({
                selector: 'div#filtering > div.column > ul > li > a.view-more',
                adjust: function(element, contentElement, modalElement) {
                    modalElement.find('div.bottom').find('ul>li>a').unbind('click').bind('click', function() {
                        var e = jQuery(this);
                        var filter = jQuery(element).parent().parent().parent().find('div.title');
                        if (filter.length > 0) {
                            var filterText = filterNamesLookup[filter.text()];
                            var val = e.text();
                            val = val.substring(0, val.indexOf('(') - 1);
                            replaceFilter(filterText, val);
                        }
                        return false;
                    });
                    
                    var filterName = element.parent().find('a').attr("fname");
					modalElement.find('div.top').find('span.title').html(filterName);
					
					var cnt = modalElement.find('div.bottom').find('a').length;
					var columns = cnt>40?5:cnt>30?4:cnt>20?3:cnt>10?2:1;
					var size = Math.ceil(cnt / columns);
                    var ul  = modalElement.find('div.bottom').find('ul');
                    var list = ul.children().filter(':gt(' + (size - 1) + ')');

                    for (i = 0; i < Math.ceil(list.length / size); i++) {
                        ul = jQuery("<ul />").append(list.slice(i * size, (i * size) + size)).insertAfter(ul);
                    }
                },
                reposition:function(currentElement,modalElement,offset)
		        {
		            var o=currentElement.offset();
			        var o1 = {
				        left:offset.left - currentElement.width(),
				        top:offset.top - currentElement.height()
			        };
			        
			        var cnt = modalElement.find('div.bottom').find('a').length;
		            var columns = cnt>40?5:cnt>30?4:cnt>20?3:cnt>10?2:1;
		            var columnWidth = 182;
		            var adj = 11;
		            var newWidth=columnWidth * columns;
		            newWidth += cnt>30?4:cnt>20?4:cnt>10?3:2;
			        var viewMoreColumnIndex = currentElement.parent().find('a').attr("col");
			        
                    modalElement.find('a.close').unbind('click').click(filterModal.close);
			        var t=modalElement.find('div.top');
                    
                    switch(viewMoreColumnIndex)
                    {
                        case "0":
                            switch(columns)
                            {
                                case 1:
                                case 4:
                                case 5:
                                    t.css({marginLeft:0, width:182, textIndent:9});
                                    return modalElement.css({width:newWidth,top:(o.top+o1.top),left:((o.left+o1.left)-adj+1)});
                                    break;
                                case 2:
                                case 3:
                                    t.css({marginLeft:0, width:182, textIndent:9});
                                    return modalElement.css({width:newWidth-1,top:(o.top+o1.top),left:((o.left+o1.left)-adj+1)});
                                    break;
                            }
                            break;
                        case "1":
                            switch(columns)
                            {
                                case 1:
                                case 2:
                                case 3:
                                    t.css({marginLeft:0, width:182, textIndent:10});
                                    return modalElement.css({width:newWidth,top:(o.top+o1.top),left:((o.left+o1.left)-adj)});
                                    break;
                                case 4:
                                    t.css({marginLeft:columnWidth, width:182, textIndent:10});
                                    return modalElement.css({width:newWidth,top:(o.top+o1.top),left:((o.left+o1.left)-(columnWidth+adj))});
                                    break;
                                case 5:
                                    t.css({marginLeft:columnWidth, width:182, textIndent:10});
                                    return modalElement.css({width:newWidth,top:(o.top+o1.top),left:((o.left+o1.left)-(columnWidth+adj))});
                                    break;
                            }
                            break;
                        case "2":
                            switch(columns)
                            {
                                case 1:
                                case 2:
                                    t.css({marginLeft:0, width:182, textIndent:10});
                                    return modalElement.css({width:newWidth,top:(o.top+o1.top),left:((o.left+o1.left)-adj)});
                                    break;
                                case 3:
                                    t.css({marginLeft:columnWidth+1, width:182, textIndent:10});
                                    return modalElement.css({width:newWidth,top:(o.top+o1.top),left:((o.left+o1.left)-(columnWidth+adj+1))});
                                    break;
                                case 4:
                                    t.css({marginLeft:2*columnWidth+1, width:182, textIndent:10});
                                    return modalElement.css({width:newWidth,top:(o.top+o1.top),left:((o.left+o1.left)-(2*columnWidth+adj+1))});
                                    break;
                                case 5:
                                    t.css({marginLeft:2*columnWidth+1, width:182, textIndent:10});
                                    return modalElement.css({width:newWidth,top:(o.top+o1.top),left:((o.left+o1.left)-(2*columnWidth+adj+1))});
                                    break;
                            }
                            break;
                        case "3":
                            switch(columns)
                            {
                                case 1:
                                    t.css({marginLeft:0, width:182, textIndent:10});
                                    return modalElement.css({width:newWidth,top:(o.top+o1.top),left:((o.left+o1.left)-adj)});
                                    break;
                                case 2:
                                    t.css({marginLeft:columnWidth+1, width:182, textIndent:10});
                                    return modalElement.css({width:newWidth,top:(o.top+o1.top),left:((o.left+o1.left)-(columnWidth+adj+1))});
                                    break;
                                case 3:
                                    t.css({marginLeft:2*columnWidth+2, width:182, textIndent:10});
                                    return modalElement.css ({width:newWidth,top:(o.top+o1.top),left:((o.left+o1.left)-(2*columnWidth+adj+2))});
                                    break;
                                case 4:
                                    t.css({marginLeft:3*columnWidth+2, width:182, textIndent:10});
                                    return modalElement.css({width:newWidth,top:(o.top+o1.top),left:((o.left+o1.left)-(3*columnWidth+adj+2))});
                                    break;
                                case 5:
                                    t.css({marginLeft:3*columnWidth+2, width:182, textIndent:10});
                                    return modalElement.css({width:newWidth,top:(o.top+o1.top),left:((o.left+o1.left)-(3*columnWidth+adj+2))});
                                    break;
                            }
                            break;
                        case "4":
                            switch(columns)
                            {
                                case 1:
                                    t.css({marginLeft:0, width:182, textIndent:10});
                                    return modalElement.css({width:newWidth,top:(o.top+o1.top),left:((o.left+o1.left)-adj)});
                                    break;
                                case 2:
                                    t.css({marginLeft:columnWidth+1, width:181, textIndent:10});
                                    return modalElement.css({width:newWidth,top:(o.top+o1.top),left:((o.left+o1.left)-(columnWidth+adj))});
                                    break;
                                case 3:
                                    t.css({marginLeft:2*columnWidth+2, width:181, textIndent:10});
                                    return modalElement.css({width:newWidth,top:(o.top+o1.top),left:((o.left+o1.left)-(2*columnWidth+adj))});
                                    break;
                                case 4:
                                    t.css({marginLeft:3*columnWidth+2, width:181, textIndent:10});
                                    return modalElement.css({width:newWidth,top:(o.top+o1.top),left:((o.left+o1.left)-(3*columnWidth+adj))});
                                    break;
                                case 5:
                                    t.css({marginLeft:4*columnWidth+2, width:181, textIndent:10});
                                    return modalElement.css({width:newWidth,top:(o.top+o1.top),left:((o.left+o1.left)-(4*columnWidth+adj))});
                                    break;
                            }
                            break;     
                    }
                }
            });

            jQuery('div#filtering > div.column > ul > li > a.view-more').unbind('click').click(filterModal.open);
            jQuery("div#filtering > div.column > ul > li > a.view-more").click(function() {
                jQuery("div#filter-wrapper").css("background-color", "#BAB9B6");
                if (isIMobileDevice == "True") {
                    jQuery("div#filtering li").css("background-color", "#BAB9B6");
                    jQuery("div.filterOverflowWrapper li, div.filterOverflowWrapper li a").css({ backgroundColor: "#EDEAE2", backgroundImage: "none" });
                }
            });
            
            // close "view more" fly-out when clicking outside of it
			jQuery(document).click(function(e) {
                if (jQuery("div.filterOverflowWrapper").is(':visible')) {
                    if(jQuery(e.target).closest(".filterOverflowWrapper").length == 0) {
                        filterModal.hoverOut();
                        jQuery("div#filter-wrapper").css("background-color", "#EDEAE2");
                        if (isIMobileDevice == "True") {
                            jQuery("div#filtering li").css("background-color", "#EDEAE2");
                        }
                    }
                }
            });
            loadingFade(false, []);
        };
        var renderTabs = function() {
            var id = 0;
            if (self.query.filters.producttypeid && self.query.filters.producttypeid.length > 0)
                id = self.query.filters.producttypeid[0];
            var hasData = false;
            var tabs = jQuery('ul.subsection-nav');
            var html = '';
            for (var a = 0, cnt = tabOptions.length; a < cnt; a++) {
                tabIndex = a;
                if (tabOptions[a].display) { hasData = true; }
                if (id == tabOptions[a].id)
                    break;
            }
            if (!hasData) {
                //show 'no results on any tabs' message
                jQuery('div.searchWrapper2').hide();
                jQuery('div.searchWrapper').hide();
                jQuery('div.nosearchresults').show().html(String.format(templates.resultsOnNoTabs, self.query.text));
                tabs.html("");
            }
            else {
                for (var a = 0, cnt = tabOptions.length; a < cnt; a++) {
                    if (tabOptions[a].display == false)
                        html += String.format(templates.tabHidden, tabOptions[a].text);
                    else if (tabIndex == a)
                        html += String.format(templates.tabSelected, tabOptions[a].text);
                    else
                        html += String.format(templates.tab, tabOptions[a].text);
                }
                tabs.html(html).find('a').unbind('click').click(self.tabClick);
            }
        };

        var renderOptions_NoResults = function(searchResults) {
            var options = jQuery('div#filtering');
            var tray = options.find('div#selections').html('<ul id="your-selections"></ul>');

            // count
            //tray.find('b.count').html('<span class="searchAspect">' + searchResults.count + '</span> results for <span class="searchAspect">' + self.query.text + '</span>');

            // show/hide the filters based on tab
            if (tabIndex == TAB_SITE) {
                //options.find('div#filter-box,div#filtering').hide();
                jQuery('#filter-box,#filtering').hide();
                jQuery('#websearch div.orange-bar').hide();
            } else {
                //options.find('div#filter-box,div#filtering').show();
                jQuery('#filter-box,#filtering').show();
                jQuery('#websearch div.orange-bar').show();
            }

            // query parameters
            var hasFilters = false;
            var html = "<li><strong>your filters: </strong></li>";
            for (var f in self.query.filters) {
                if (filterNames[f]) {
                    html += String.format(hasFilters ? templates.trayFilter : templates.trayFilterFirst,
						filterNames[f],
						self.query.filters[f].join(','));
                    hasFilters = true;
                }
            }
            tray.find('ul').html(html)
				.find('li').click(self.clickRemove);

            options.children('div.column,div.empty').remove();
            options.prepend(html);
            options.find('a').unbind('click').click(self.clickReplace);

            // clear
            //				var clear=tray.find('div.clearSelections').find('a').unbind('click').click(function(){self.clickClear();return false;});
            //				if(hasFilters)
            //					clear.show();
            //				else
            //					clear.hide();
        };
        var renderOptions = function(searchResults) {
            var filter_options = jQuery('div#filtering');
            var tray = jQuery('div#selections');

            // count
            var filterText = {};
            filterText[TAB_COURSES] = "filter this list of courses (" + searchResults.count + ")";
            filterText[TAB_MOVIES] = "filter this list of movies (" + searchResults.count + ")";
            filterText[TAB_SITE] = "filter this list of results (" + searchResults.count + ")";

            jQuery('div#filter-box > span:first').html(filterText[tabIndex]);
            //tray.find('b.count').html('<span class="searchAspect">' + searchResults.count + '</span> results for <span class="searchAspect">' + self.query.text + '</span>');

            if (tabIndex == TAB_COURSES || tabIndex == TAB_MOVIES) {
                jQuery("div#filter-box a.toggle-blue-plus").removeClass("toggle-blue-plus").addClass("toggle-blue-minus");
                jQuery("div#filter-box a.toggle-blue-minus").html("close filters");
            }

            // show/hide the filters based on tab
            if (tabIndex == TAB_SITE) {
                //options.find('div#filter-box,div#filtering').hide();
                jQuery('#filter-box,#filtering').hide();
                jQuery('#websearch div.orange-bar').hide();
            } else {
                //options.find('div#filter-box,div#filtering').show();
                jQuery('#filter-box,#filtering').show();
                jQuery('#websearch div.orange-bar').show();
            }

            // query parameters
            var hasFilters = false;
            var html = "";
			
			if(options.isAdobeIP)
			{
				hasFilters = true;
				html += String.format(jQuery('input#showAdobeIPOnly').val() == "true" ? templates.adobeIP.Selected : templates.adobeIP.notSelected,"showRestrictedList(this);", "preselected courses",options.limitedAccessCoursePopupURL);
			}
			
            for (var f in self.query.filters) { 
                if (filterNames[f]) { 
					var displayFilterName = self.query.filters[f].slice(0,self.query.filters[f].length);
					if(filterNames[f] == "version") //remove ^
					{
					    for(var fCnt = 0; fCnt < displayFilterName.length; fCnt++)
					    {
					        var labelName = displayFilterName[fCnt];
					        if(labelName.indexOf("^") > 0)
					           labelName = labelName.split('^')[1]; 
					        displayFilterName[fCnt] = labelName;
					    }				
					}
                    html += String.format(hasFilters ? templates.trayFilter : templates.trayFilterFirst,
						filterNames[f],
						displayFilterName.join(','));
                    hasFilters = true;
                }
            }
            if (hasFilters) {
                html = '<ul id="your-selections"><li><strong>your filters: </strong></li>' + html + '</ul>';
                tray.html(html).show()
					.find('b').parent().click(self.clickRemove);
            }
            else {
                tray.hide();
            }


            // filters
            html = '';
            var filterCount = 0;
			var showSubtopics = true;
			var showVersion = true;

			for(var fOrder=0; fOrder < filterOrder.length;fOrder++)
			{
				var index = 0;
				for (var a = 0, cnt = searchResults.facets.length; a < cnt; a++) {  //bad hack :(
					if(searchResults.facets[a].title == filterOrder[fOrder])
						break;
					else 
						index++;
				}
				var item = searchResults.facets[index];
				if (!filterNames[item.title] || self.query.filters[item.title] || item.items.length == 0)
                    continue;
                var itemsHtml = '';
               
				if(filterNames[item.title] == "subject")
					showSubtopics = false;
				if(filterNames[item.title] == "software")
					showVersion = false;

				if(filterNames[item.title] == "subtopic" && !showSubtopics)
					continue;
				if(filterNames[item.title] == "version" && !showVersion)
					continue;

				if (filterNames[item.title] == "release year" || filterNames[item.title] == "version")
                    item.items.sort(sortFilterDescending);
                for (var b = 0, cntB = Math.min(item.items.length, filterMaxItems); b < cntB; b++)
                {
                    var _tempItem = item.items[b].item;
                    //6068 - Filter names with special characters are causing problems
                    //     - first number is version id, next the name so "^" can have only an index > 0 
					if (filterNames[item.title] == "version" && _tempItem.indexOf("^") > 0) 
					{
						//added only for backward compatibility
						_tempItem = item.items[b].item.split('^')[1];
						itemsHtml += String.format(templates.filterItem_Version, _tempItem, item.items[b].count,item.items[b].item, (isIMobileDevice == "True") ? 'style="background-color:#EDEAE2"' : '');
					}
					else
						itemsHtml += String.format(templates.filterItem, _tempItem, item.items[b].count,  (isIMobileDevice == "True") ? 'style="background-color:#EDEAE2"' : '');
				}
                if (item.items.length > filterMaxItems) {
                    itemsHtml += '<li><a href="#" class="view-more" fname="'+filterNames[item.title]+'" col="'+filterCount+'">+ view more</a><div style="display:none"><ul>';

                    //4249 - Sort order for "View All" filter pop-ups on Search page
                    //subject, software, vendor, author should stay sorted the same way, no changes
                    var moreitems = item.items;//.slice(filterMaxItems + 1);
                    if (filterNames[item.title] != "release year" && filterNames[item.title] != "version") {
                        moreitems.sort(function(x, y) {
                            if (x.item.toLowerCase() < y.item.toLowerCase()) return -1;
                            if (x.item.toLowerCase() > y.item.toLowerCase()) return +1;
                            return 0;
                        });
                    }
                    for (var b = 0, cntB = moreitems.length; b < cntB; b++)
					{
					    var _tempItem = moreitems[b].item;
					    //6068 - Filter names with special characters are causing problems
					    //     - first number is version id, next the name so "^" can have only an index > 0 
						if (filterNames[item.title] == "version" && _tempItem.indexOf("^") > 0)
						{
							_tempItem = moreitems[b].item.split('^')[1];
							itemsHtml += String.format(templates.filterItem_Version, _tempItem, moreitems[b].count,moreitems[b].item).replace('<br/>', '', (isIMobileDevice == "True") ? 'style="background-color:#EDEAE2"' : '');
						}
						else
							itemsHtml += String.format(templates.filterItem, _tempItem, moreitems[b].count, (isIMobileDevice == "True") ? 'style="background-color:#EDEAE2"' : '').replace('<br/>', '');
					}
                    itemsHtml += '</ul></div></li>';
                }
                filterCount++;
                if (filterCount == filtersMax) {
                    html += String.format(templates.filterLast, filterNames[item.title], itemsHtml);
                    break;
                }
                else {
                    html += String.format(templates.filter, filterNames[item.title], itemsHtml);
                }
			}

            if (filterCount == 0)
                html += templates.filterEmpty;

            filter_options.children('div.column,div.empty').remove();
            filter_options.prepend(html);
            filter_options.find('a').unbind('click').click(self.clickReplace);
			setModal();
            // clear
            //				var clear=tray.find('div.clearSelections').find('a').unbind('click').click(function(){self.clickClear();return false;});
            //				if(hasFilters)
            //					clear.show();
            //				else
            //					clear.hide();
        };
        function sortFilterDescending(a, b) {
            var x = a.item.toLowerCase();
            var y = b.item.toLowerCase();
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        };
        var getTruncatedString = function(myString, len) {
            if (myString.length <= len) return myString;
            var E = new Array(); var EIndex = 0;
            var prevChar = "";
            var currentTag = "";
            var count = 0;
            var outputString = "";
            var inOpeningTag = false; var inClosingTag = false; var inTag = false;
            for (i = 0; i < myString.length; i++) {
                if (count <= len) {
                    outputString += myString.charAt(i);
                    if (myString.charAt(i) == ">") {
                        if (inOpeningTag) {
                            E[EIndex] = currentTag.replace('<', '').replace('/', '').replace('>', '');
                            EIndex = EIndex + 1;
                            currentTag = "";
                            inOpeningTag = false; inTag = false; inClosingTag = false;
                        }
                        else if (inClosingTag) {
                            E = closeTag(E, currentTag.replace('<', '').replace('/', '').replace('>', '')); EIndex = EIndex - 1;
                            currentTag = "";
                            inClosingTag = false; inTag = false;
                        }
                    }
                    else if (myString.charAt(i) == "/") {
                        if (prevChar == "<") {
                            inClosingTag = true; inTag = true; inOpeningTag = false;
                        }
                    }
                    else if (myString.charAt(i) == "<") { //tag begins  
                        inOpeningTag = true; inTag = true;
                    }
                    else if (myString.charAt(i) == " " & inTag) {
                        if (inOpeningTag) {
                            E[EIndex] = currentTag.replace('<', '').replace('/', '').replace('>', '');
                            EIndex = EIndex + 1;
                            currentTag = "";
                            inOpeningTag = false;
                        }
                    }
                    if (inTag == false)
                        count = count + 1;
                    else if (inOpeningTag || inClosingTag)
                        currentTag = currentTag + myString.charAt(i);
                    prevChar = myString.charAt(i);
                } else break;
            }
            if (E.length > 0) {
                for (j = E.length - 1; j >= 0; j--) {
                    outputString = outputString + "</" + E[j] + ">";
                }
            }
            return outputString + '&#8230;';
        };
        var closeTag = function(E, closingTag) {
            //this function assumes that a corresponding opening tag is always found for the given closing tag
            var F = new Array();
            var FIndex = E.length - 2;
            if (FIndex < 0) return F;
            for (k = E.length - 1; k >= 0; k--) {
                if (E[k] != closingTag) { F[FIndex] = E(k); FIndex = FIndex - 1; closingTag = ""; }
            }
            return F;
        };

        var renderItems = function(searchResults, pager) {  
            var html = tabIndex == TAB_COURSES ? templates.itemHeadCourses : tabIndex == TAB_MOVIES ? templates.itemHeadMovies : templates.itemHeadSite;
            if (searchResults && searchResults.items) {
                var templateHtml = {};
                templateHtml[TAB_COURSES] = [templates.itemCourse, templates.itemFreeCourse];
                templateHtml[TAB_MOVIES] = [templates.itemMovie, templates.itemFreeMovie];
                templateHtml[TAB_SITE] = [templates.itemSite, templates.itemFreeSite];

                for (var a = 0, cnt = searchResults.items.length; a < cnt; a++) {
                    var item = searchResults.items[a];
					
					//if(options.isAdobeIP && jQuery('input#showAdobeIPOnly').val() == "true" && jQuery.inArray(item.courseId,options.limitedAccessCourses.id) == -1)
					//    continue;

                    var highlights = {};
                    for (var b = 0, cntB = searchResults.highlights.length; b < cntB; b++) {
                        if (searchResults.highlights[b].id == item.id) {
                            highlights = searchResults.highlights[b].items;
                            break;
                        }
                    }
                    var templateHtmlIndex = ((tabIndex != TAB_MOVIES || item.free == 'True'  || (isLoggedIn == 'True' && isAbusive != 'True')) ? 1 : 0);

					if(options.isAdobeIP)  //override if its adobeIP
					{
						templateHtmlIndex = (jQuery.inArray(item.courseId,options.limitedAccessCourses.id) == -1) ? 0: 1;
					}
		
                    if (tabIndex == TAB_COURSES)
                        html += String.format(templateHtml[tabIndex][templateHtmlIndex],
							item.courseId,
							url(pager.start + a, item.typeId, item.courseId, item.id),
							highlights.title ? highlights.title : item.title,
							(item.dvd == 'True' ? ' ' + templates.iconDvd : ''),
							utilities.contextualTruncate(highlights.description ? highlights.description : item.description, 100, 'span'),
							item.authorId,
							url(pager.start + a, '1000', item.courseId, item.authorId), //author url
							(item.authors && item.authors.length > 0 ? item.authors[0] : ''),
							(item.level && templates["icon" + item.level] ? templates["icon" + item.level] : templates["iconAll"]),
							item.duration,
							item.releaseDate,
							(item.cc == 'True' ? templates.iconCc + ' ' : templates.iconNoCc + ' ') + (item.timecodes && item.timecodes.length > 0 ? String.format(templates.itemTranscript0, item.timecodes.length) : String.format(templates.itemTranscript0, 0))
							);
                    else if (tabIndex == TAB_MOVIES)
                        html += String.format(templateHtml[tabIndex][templateHtmlIndex],
							(item.free == 'True' ? templates.iconMovieFree : templates.iconMovie),
							item.courseId,
							((item.free == 'True' || (isLoggedIn == 'True' && isAbusive != 'True' && !options.isAdobeIP) || (options.isAdobeIP && (jQuery.inArray(item.courseId,options.limitedAccessCourses.id) >= 0))) ? url(pager.start + a, item.typeId, item.courseId, item.id) : options.isAdobeIP ? url(pager.start + a, 'restricted', 0, 0) : (isAbusive == 'True') ? url(pager.start + a, 'abusive', 0, 0) : url(pager.start + a, 'register', 0, 0)),
							getTruncatedString(highlights.title ? highlights.title : item.title, 50),
							(item.dvd == 'True' ? ' ' + templates.iconDvd : ''),
							url(pager.start + a, '3', item.courseId, item.chapterId), //chapter url
							getTruncatedString(item.chapterName, 45), //chapter								
							url(pager.start + a, '2', item.courseId, item.courseId),
							item.courseName,
							item.authorId,
							url(pager.start + a, '1000', item.courseId, item.authorId), //author url
							(item.authors && item.authors.length > 0 ? item.authors[0] : ''),
							(item.level && templates["icon" + item.level] ? templates["icon" + item.level] : templates["iconAll"]),
							item.duration,
							item.releaseDate,
							(item.cc == 'True' ? templates.iconCc + ' ' : templates.iconNoCc + ' ') + (item.timecodes && item.timecodes.length > 0 ? String.format(templates.itemTranscript1, url(pager.start + a, '2', item.courseId, item.courseId) + '&t=' + escape(self.query.text), item.timecodes.length) : String.format(templates.itemTranscript0, 0))
							);
                    else
                        html += String.format(templateHtml[tabIndex][templateHtmlIndex],
							url(pager.start + a, item.typeId, item.courseId, item.id),
							highlights.title ? highlights.title : item.title,
							highlights.description ? highlights.description : item.description
							);
                }
            }
            jQuery('table#tbl-subject').html(html);
			setModal();
        };
        var renderPagination = function(pager) {
            var html = '';
            if (pager && pager.pageCount > 1) {
                var start = pager.currentPage < 9 ? 1 : pager.currentPage - 3;
                var end = pager.currentPage <= 7 ? Math.max(7, pager.currentPage + 3) : pager.currentPage + 3;
                if (end > pager.pageCount)
                    end = pager.pageCount;

                if (pager.currentPage > 1)
                    html += templates.pagerPrev;

                var pages = [];
                if (start > 2)
                    pages = [1, 2, -1];
                for (var a = start; a <= end; a++)
                    pages.push(a);
                if (end < (pager.pageCount - 2)) {
                    pages.push(-1);
                    pages.push(pager.pageCount - 1);
                    pages.push(pager.pageCount);
                }

                for (var a = 0, cnt = pages.length; a < cnt; a++) {
                    if (pages[a] == -1)
                        html += templates.pagerGap;
                    else if (pages[a] == pager.currentPage)
                        html += String.format(templates.pagerSelectedPage, pages[a]);
                    else
                        html += String.format(templates.pagerPage, pages[a]);
                }

                if (pager.currentPage < pager.pageCount)
                    html += templates.pagerNext;
            }


            jQuery('div.paging > div > ul.page-nmbrs').html(html)
				.find("li > a").unbind("click").click(function() { var e = jQuery(this); self.changePage(e.hasClass('prev') ? pager.currentPage - 1 : e.hasClass('next') ? pager.currentPage + 1 : Number(e.text())); return false; })
				;

            jQuery('div.paging > div.showing').html(pager.totalItemCount > 0
				? String.format(templates.resultsFootText, pager.start, Math.min((pager.start + pager.limit - 1), pager.totalItemCount), pager.totalItemCount)
				: templates.resultsFootTextNoResult
				);
        };
    };
	var setModal = function(){
			//preselected tooltip modal
			var preselectedModal=jQuery("a.preselectedTooltip");
	
			if(preselectedModal && preselectedModal.fancybox)
				preselectedModal.fancybox({
					'hideOnContentClick': false,
					'autoDimensions': false,
					'height': 'auto',
					'width': 405,
					'padding': 0, /* NOTE -- set this in our css */
					'titleShow': true,
					'title': '',
					'overlayOpacity': 0.5,
					'titlePosition': 'inside',
					'disableNavButtons': false 
				});
        };
})(lynda, lynda.page, jQuery);
