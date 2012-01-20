(function(lynda, lp, jQuery) {
	lp.category = function(Data, Options) {
		var self = this, data = Data;
		var showAdobeIPOnly = false;
		var options = jQuery.extend({
			sections: { "Subjects": "u", "Subtopics": "t", "Software": "s", "Software Company": "c", "Author": "a", "Learning Level": "pl", "Version": "v", "Release Date": "dateYear", "OS Platform": "p" },
			sectionsLookup: { "u": "Subjects", "t": "Subtopics", "s": "Software", "c": "Software Company", "a": "Author", "pl": "Learning Level", "v": "Version", "dateYear": "Release Date", "p": "OS Platform" },
			sectionsOrder: ["Subtopics", "Software", "Version", "Software Company", "Author", "Release Date", "Learning Level", "OS Platform"],
			sectionsValueSort: { "Release Date": "asc", "Version": "desc" },
			filtersEnabled: true,
			filtersDefault: {},
			filtersNameLookup: { 'dvd': 'DVD', 'cc': 'Closed Captioning' },
			filtersMenus: { "subtopics": "Subtopics", "version": "Version", "series": "Subtopics", "Series": "Subtopics", "Subjects": "Subjects", "subjects": "Subjects" },
			filtersTrayExclusions: { "page": true, "sort": true, "mode": true, "groupby": true },
			sortPropertyLookup: { "Course Title": "title", "Level": "pl", "Duration": "duration", "Date": "dateNumeric", "Released": "dateNumeric", "closed caption": "cc", "compact disc": "dvd" },
			postRender: function() { },
			navTextAll: "all courses",
			isAdobeIP: false,
			limitedAccessCoursePopupURL: "",
			selector: "table#tbl-subject",
			currentSort: { "column": "","sortOrderAsc": "" }
		}, Options);

		var util = {
			stringFormat: function() { var a = arguments; if (a.length == 0) return null; var i = a[0]; for (var b = 1, cnt = a.length; b < cnt; b++) i = i.replace(RegExp("\\{" + (b - 1) + "\\}", "gi"), a[b]); return i; },
			mapA: function(obj, method) { for (var a = 0, cnt = obj.length; a < cnt; a++) method(obj[a], a); },
			mapP: function(obj, method) { for (var key in obj) method(obj[key], key); },
			aIndexOf: function(array, prop, val) { for (var a = 0, cnt = array.length; a < cnt; a++) if (array[a][prop] === val) return a; return -1; },
			aInArray: function(val, array) { if (!array) return -1; for (var a = 0, cnt = array.length; a < cnt; a++) if (array[a] == val) return a; return -1; },
			anyInArray: function(arrayA, arrayB) { if (!arrayA || !arrayB) return false; for (var a = 0, cntA = arrayA.length; a < cntA; a++) for (var b = 0, cntB = arrayB.length; b < cntB; b++) if (arrayA[a] == arrayB[b]) return true; return false; },
			dateToString: function(seconds) { var a = [3600, 60], f = Math.floor, s = seconds, d = function(i) { return i < 10 ? '0' + i : i; }; return [d(f(s / a[0])), d(f((s % a[0]) / a[1])), d(f((s % a[1])))].join(':'); },
			evalJson: function(json) { return ("string" === typeof json) ? (json.length > 2 ? eval(json.charAt(0) != '(' ? '(' + json + ')' : json) : null) : json; },
			truncate: function(input, limit) { var s = input, l = limit; return s && s.length > l ? s.substring(0, l) + '&hellip;' : s; },
			escapeStringForJson: function(input) { return input.replace(/\\/g, '\\\\').replace(/"/g, '\\"'); }
		};

		var compare = {
			operator: function(a, b) { return a === b ? 0 : (a > b ? 1 : -1); },
			lowerCaseOperator: function(a, b) { if (typeof a === 'string' && typeof b === 'string') return (a.toLowerCase() === b.toLowerCase() ? 0 : (a.toLowerCase() > b.toLowerCase() ? 1 : -1)); else return compare.operator(a, b); },
			array: function(a, b) { return a.length === 0 && b.length > 0 ? -1 : a.length > 0 && b.length === 0 ? 1 : a.length === 0 && b.length === 0 ? 0 : compare.operator(a[0], b[0]); }
		};

		var filterSummary = function(sections, courses) {
			var summaries = {};

			//prepare courses list before counting each category's number of courses in filter menu
			var hasCategoryOther = checkCategoryOther(courses, true, true);
			if (hasCategoryOther) {
				removeCategoryOtherDuplicateOccurrences(courses);
			}

			//bug: 3265 - the following structure will eliminate the ie none responsive msg.  
			//but, don't know for how long if our filter req || course size increases
			var hashFilterMap = [];
			for (var name in sections) {
				var section = sections[name];
				var filterKey = options.sections[name];

				for (var value in section) {
					hashFilterMap[filterKey + value/*title id*/] = section[value]; //title
				}
			}

			for (var i = 0, icnt = courses.length; i < icnt; i++) {
				var course = courses[i];
				for (var name in options.sections) {
					var filterKey = options.sections[name];
					var courseFilterData = course[filterKey];
					for (var j = 0, jcnt = courseFilterData.length; j < jcnt; j++) {
						var value/*title id*/ = courseFilterData[j];
						if (hashFilterMap[filterKey + value]) {

							if (!summaries[name])
								summaries[name] = [];
							if (value === "_")
								return;

							var title = hashFilterMap[filterKey + value];
							var titleName = title.name;
							var pushCourse = true;
							if (name == "Version") //if version, remove the parentCatogoryID that is attached to the name
							{
								if (titleName.indexOf("^") >= 0) {
									var titleArray = titleName.split("^");
									titleName = titleArray[0];
									var parent = titleArray[1];
									if (filter["s"]) // and push only if parentCategory = selected filter category
										if (parent == filter["s"])
										pushCourse = true;
									else pushCourse = false;
								}
							}

							if (pushCourse) {
								var indx = util.aIndexOf(summaries[name], "id", value);
								if (indx === -1) {
									summaries[name].push({ "id": value, "name": titleName, "sort": title.sort, "count": 1 });
								}
								else
									summaries[name][indx]["count"] = summaries[name][indx]["count"] + 1;
							}
						}
					}
				}
			}

			util.mapP(summaries, function(array, key) {
				var p = "count";
				var m = -1; // desc

				var srt = options.sectionsValueSort;
				if (srt && srt[key]) {
					p = "sort";
					if (srt[key] == 'asc')
						m = 1;
				}

				array.sort(function(a, b) {
					var c = (compare.operator(a[p], b[p]) * m);
					return c != 0 ? c : compare.operator(a.name, b.name);
				});
			});

			return summaries;
		};


		var createPager = function(totalCourses, filteredCount, limit, currentPage) {
			return {
				"totalCourses": totalCourses,
				"filteredCount": filteredCount,
				"limit": limit,
				"currentPage": currentPage,
				"pageCount": Math.ceil(filteredCount / limit),
				"start": (limit * currentPage) - limit,
				"end": Math.min(((limit * currentPage) - limit) + limit, filteredCount)
			};
		};
		var pager = {};
		var pageCourses = function(courses, filteredCourses, pager) {
			return (pager && pager.limit > 0 && pager.currentPage > 0)
				? filteredCourses.slice(pager.start, pager.end)
				: filteredCourses;
		}
		var filterCourses = function(courses, filterSet) {

			//check if Other version category is needed to be displayed in the course list grouping by Version
			var hasCategoryOther = checkCategoryOther(courses, true, false);
			if (hasCategoryOther) {
				removeCategoryOtherDuplicateOccurrences(courses);
				data.sections["Version"][0] = { name: (filter.s ? "Other^" + filter.s.toString() : "Other"), sort: 0 };
			}

			var hasFilters = propertyCount(filterSet) > 0;
			var filteredCourses = [];
			util.mapA(courses, function(course, i) {
				if (!course.title)
					return;

				if (showAdobeIPOnly)
					if (jQuery.inArray(course.cid, limitedAccessData.courses.id) == -1)
					return;

				var add = true;
				if (hasFilters)
					util.mapP(filterSet, function(val, key) {
						if (key == "page" || key == "sort" || key == "groupby")
							return;
						if (add)
							add = jQuery.isArray(course[key])
								? util.anyInArray((jQuery.isArray(val) ? val : [val]), course[key])
								: ((jQuery.isArray(val) ? val[0] : val) == course[key])
								;
					});
				if (add)
					filteredCourses.push(course);
			});

			return filteredCourses;
		};

		//removes Other version from a course's versions array if it is present multiple times
		var removeCategoryOtherDuplicateOccurrences = function(courses) {
			var allCategoryOther;
			var gP = "v";
			util.mapA(courses, function(course) {
				allCategoryOther = true;
				if (jQuery.isArray(course[gP]) && course[gP].length > 0) {
					for (j = 0; j < course[gP].length; j++) {
						if (course[gP][j] != 0 && course[gP].length > 1) {
							allCategoryOther = false;
							break;
						}
					}
					if (allCategoryOther == true && course[gP].length > 1) {
						course[gP].length = 1;
						course[gP][0] = 0;
					}
					if (allCategoryOther == false) {
						for (i = 0; i < course[gP].length; i++)
							if (course[gP][i] == 0 && course[gP].length > 1)
								delete course[gP][i];
					}
				}
				else course[gP][0] = 0;
			});
		}

		this.sortItemsMulti = function(array, propertyInfo) {
			var p = propertyInfo;

			array.sort(function(a, b) {
				if (a === undefined || b === undefined || a.cid === undefined || b.cid === undefined)
					return 0;
				for (var k in p) {
					var c = a[k], d = b[k];
					if (p[k].val) {
						c = p[k].val(c);
						d = p[k].val(d);
					}
					var i = compare.lowerCaseOperator(c, d) * (p[k].asc ? 1 : -1);
					if (i != 0)
						return i;
				}
				return 0;
			});
		};
		this.sortItems = function(array, property, asc) {
			var obj = {};
			obj[property] = { 'asc': asc };
			return self.sortItemsMulti(array, obj);
		};
		this.sortArrayItems = function(array, property, asc) {
			array.sort(function(a, b) { return compare.lowerCaseOperator(a[property], b[property]) * (asc ? 1 : -1); });
		};
		this.sortItemArrays = function(array, property, asc) {
			array.sort(function(a, b) { return compare.array(a[property], b[property]) * (asc ? 1 : -1); });
		};

		var pushPropertyValue = function(item, property, value) {
			item[property] = item[property] || [];
			if (value)
				item[property].push(value);
		};

		var isNewReleasesSet = false;
		var setNewReleases = function(limit) {
			self.sortItems(data.courses, 'dateNumeric', false);
			year = new Date().getFullYear();
			for (var a = 0, cnt = data.courses.length; a < cnt; a++) {
				if (a < limit && jQuery.isArray(data.courses[a].dateYear) && (data.courses[a].dateYear[0] == (year-1).toString() || data.courses[a].dateYear[0] == year.toString()))
					pushPropertyValue(data.courses[a], 'mode', 'new');
				else
					pushPropertyValue(data.courses[a], 'mode');
			}
			isNewReleasesSet = true;
		};
		var isDocumentariesSet = false;
		var setDocumentaries = function(id) {
			self.sortItems(data.courses, 'dateNumeric', false);
			for (var a = 0, cnt = data.courses.length; a < cnt; a++) {
				if (id) {
					if (data.courses[a]['t'] && util.aInArray(id, data.courses[a]['t']) != -1)
						pushPropertyValue(data.courses[a], 'mode', 'documentaries');
					else
						pushPropertyValue(data.courses[a], 'mode');
				}
				else {
					pushPropertyValue(data.courses[a], 'mode', 'documentaries');
				}
			}
			isDocumentariesSet = true;
		};

		var filter = {};
		this.addFilter = function(name, val) {
			var n = options.sections[name] ? options.sections[name] : name;
			util.mapA(val, function(item) {
				if (!filter[n])
					filter[n] = [item];
				else if (filter[n].indexOf(item) == -1)
					filter[n].push(item);
			});
			//if Software filter is selected from the filter menu then the courses should be grouped by Version
			if (name == "Software")
				filter.groupby = "Version";
			resetPage();
			self.resetMode();
			self.rerender();
		};
		this.removeFilter = function(name, val) {
			var n = options.sections[name] ? options.sections[name] : name;
			if (val)
				util.mapA(val, function(item) {
					if (!filter[n])
						return;
					var index = jQuery.inArray(item, filter[n]);
					if (index != -1)
						filter[n].splice(index, 1);
					if (filter[n].length == 0)
						delete filter[n];
				});
			else
				if (filter[n])
				delete filter[n];
			//if Software filter is removed from the filter menu then the courses should be grouped by Software on Software Providers page and not grouped on Subjects page
			if (name == "s")
				if (options.isFromCompany) filter.groupby = "Software";
			else filter.groupby = "";
			resetPage();
			self.resetMode();
			self.rerender();
		};
		this.showRestrictedList = function(id) {
			if (showAdobeIPOnly) {
				showAdobeIPOnly = false;
				jQuery(id).addClass("adobeCallOut").removeClass("adobeCallOutSelected");
			}
			else {
				showAdobeIPOnly = true;
				jQuery(id).addClass("adobeCallOutSelected").removeClass("adobeCallOut");
			}
			resetPage();
			self.resetMode();
			self.rerender();
		};
		this.replaceFilter = function(name, val) {
			var n = options.sections[name] ? options.sections[name] : name;
			filter[n] = val;

			resetPage();
			self.resetMode();
			self.rerender();
		};

		var resetPage = function() {
			if (!filter)
				return;

			if (filter['page'])
				filter['page'][1] = 1;
		};
		this.resetMode = function() {
			if (!filter)
				return;

			if (filter['mode'])
				delete filter['mode'];
		};
		this.setMode = function(mode) {
			if (!filter)
				return;
			filter['mode'] = [mode];
		};

		var findFilterName = function(data, section, val) {
			if (options.filtersNameLookup[section])
				return options.filtersNameLookup[section];

			var arr = [];
			util.mapA(val, function(item) { arr.push(data.sections[options.sectionsLookup[section]][item].name); });
			return arr.join(', ');
		};
		var findId = function(section, name) {
			for (var id in data.sections[section]) {
				var item = data.sections[section][id];
				if (item && item.name && item.name.toLowerCase() === name.toLowerCase())
					return id;
			}
		};

		this.clearFilter = function() {
			filter = jQuery.extend(true, {}, options.filtersDefault);
			filter['groupby'] = options.groupby;
			self.rerender();
		};

		this.jsonFilters = function() { return jQuery.toJSON(filter); };

		this.reset = function(type, applyFilters) {
			filter = jQuery.extend(true, {}, options.filtersDefault);
			if (applyFilters)
				filter = jQuery.extend(true, filter, applyFilters);

			if (type === 'new') {
				self.setMode(type);
				if (!isNewReleasesSet)
					setNewReleases(10);
			}
			else if (type === 'documentaries') {
				self.setMode(type);
				if (!isDocumentariesSet)
					setDocumentaries(data.info && data.info.title === 'Documentaries' ? null : findId('Subtopics', 'Documentaries'));
			}
			else if (filter['mode'] && !options.filtersDefault['mode'])
				self.resetMode();

			if (!type && options.groupby)
				//if Software filter is added from the top right menu then the courses should be grouped by Version on Software Providers page
				if (filter.s && options.isFromCompany) filter['groupby'] = 'Version';
				else filter['groupby'] = options.groupby;

			var index = 3, dir = 'desc';

			if (filter.sort) {
				index = filter.sort[0];
				dir = filter.sort[1] ? 'asc' : 'desc';
			}
			//self.renderSort(jQuery('table#tbl-subject > thead > tr > th > a').eq(index), dir, null, filter['groupby']);
			self.renderSort(jQuery(options.selector + ' > thead > tr > th > a').eq(index), dir, null, filter['groupby']);
		};
		this.page = function(limit, pageNumber,scrollUp) {
			filter["page"] = [limit, pageNumber];
			self.rerender();
			if(scrollUp)
				scrollToAnchor('TopOfResults', 0);
		};
		var renderPages = function(ulElement, showingElement, isBottom) {
			//var displayCount = 7;
			jQuery(showingElement).html(
				pager.currentPage == 0
					? 'showing all ' + pager.totalCourses
					: util.stringFormat('showing {0}-{1} of {2}', pager.start + 1, pager.end, pager.filteredCount)
				);
			var html = '';
			if (pager.currentPage > 0) {
				var template = '<li><a href="" onclick="{0}"{2}>{1}</a></li>';
				//
				if (pager && pager.pageCount > 1) {
					var start = pager.currentPage < 9 ? 1 : pager.currentPage - 3;
					var end = pager.currentPage <= 7 ? Math.max(7, pager.currentPage + 3) : pager.currentPage + 3;
					if (end > pager.pageCount)
						end = pager.pageCount;
				}

				//
				if (pager.pageCount > 0 && pager.filteredCount > pager.limit) {
					if (pager.currentPage > 1)
						html += util.stringFormat(template, "page.page(" + pager.limit + ", " + (pager.currentPage - 1) + ", " + isBottom + ");return false;", "&#171; Prev");

					var pages = [];
					if (start > 2)
						pages = [1, 2, -1];
					for (var a = start; a <= end; a++)
						pages.push(a);
					if (end <= (pager.pageCount - 2)) {
						if (end != pager.pageCount - 2) {
							pages.push(-1);
						}
						pages.push(pager.pageCount - 1);
						pages.push(pager.pageCount);
					}

					for (var a = 0, cnt = pages.length; a < cnt; a++) {
						if (pages[a] == -1)
							html += '<li><span>...</span></li>';
						else if (pages[a] == pager.currentPage)
							html += String.format(template, "page.page(" + pager.limit + ", " + pages[a] + ", " + isBottom + ");return false;", pages[a], "class='active'");
						else
							html += String.format(template, "page.page(" + pager.limit + ", " + pages[a] + ", " + isBottom + ");return false;", pages[a], "");
					}

					if (pager.currentPage < pager.pageCount)
						html += util.stringFormat(template, "page.page(" + pager.limit + ", " + (pager.currentPage + 1) + ", " + isBottom + ");return false;", "Next &#187;");
					html += util.stringFormat('<li class="viewall{1}"><a href="" onclick="{0}">view all</a></li>', "page.page(" + pager.limit + ", 0, " + isBottom + ");return false;", (pager.currentPage == 0 ? ' active' : ''));
				}
			}
			jQuery(ulElement).html(html);
		};

		this.rerender = function() {
			render(data, filter);
		};

		var propertyCount = function(obj) {
			var count = 0;
			for (var k in obj)
				count++;
			return count;
		};

		this.renderSort = function(thElement, directionOverride, defaultDirection, groupby) {
			var a = jQuery(thElement);
			var s = a.find('span');
			var name = jQuery.trim(a.text());
			
			
			
			if(name.toLowerCase() == 'released')
			{
			    var asc = directionOverride ? (directionOverride == 'asc') : s.hasClass('dbl-arrow-gray-white');
			}
			else
			{
			    var asc = directionOverride ? (directionOverride == 'asc') : !s.hasClass('dbl-arrow-white-gray');
			}

			
			if (!directionOverride && defaultDirection && !s.hasClass('dbl-arrow-white-gray') && !s.hasClass('dbl-arrow-gray-white'))
				asc = (defaultDirection == 'asc');

			if (name.length == 0 && a.attr('title'))
				name = jQuery.trim(a.attr('title'));

			var n = options.sortPropertyLookup[name] ? options.sortPropertyLookup[name] : name;
			options.currentSort.column=n;
			options.currentSort.sortOrderAsc=asc;
			filter['sort'] = [a.parent().index(), asc];


			if (groupby && options.sections[groupby]) {
				var info = {};
				info[options.sections[groupby]] = { 'asc': groupby === 'Version' ? false : true, val: function(id) { return id.length == 0 ? 0/*empty group; 0 - on top; max int - on bottom*/ : data.sections[groupby][id[0]] ? data.sections[groupby][id[0]].sort : 0; } };
				info[n] = { 'asc': asc };
				self.sortItemsMulti(data.courses, info);

				//filter['groupby']=groupby;

				var thead = a.parent().parent();
				thead.find('th').removeClass('active').find('a > span').removeClass('dbl-arrow-gray-white').removeClass('dbl-arrow-white-gray');
			}
			else {
				self.sortItems(data.courses, n, asc);

				var thead = a.parent().parent();
				thead.find('th').removeClass('active').find('a > span').removeClass('dbl-arrow-gray-white').removeClass('dbl-arrow-white-gray');
				s.addClass(asc ? 'dbl-arrow-white-gray' : 'dbl-arrow-gray-white');
				a.parent().addClass('active');

				if (filter['groupby'])
					delete filter['groupby'];
			}

			resetPage();
			self.rerender();
		};

		var latestReleases = function(courses, year) {
			for (var a = 0; a<courses.length; a++)
				if(jQuery.isArray(courses[a].dateYear) && (courses[a].dateYear[0] == (year-1).toString() || courses[a].dateYear[0] == year.toString()))
					return true;
			return false;
		};

		var filterModal;
		var filterSummaryData = {};
		var render = function(data, filters) {
			//use a copy of data.courses that will be altered depending on the filter applied.
			//data.courses should not be altered as it will be used when new filters are applied
			var dataCoursesCopy = eval(jQuery.toJSON(data.courses));
			var courses = filterCourses(dataCoursesCopy, filters);
			//Bug 3472 - [Task] Dev - Hiding Tabs when they do not apply
			var showVersion = (data.courses.length >= 5), showReleases = (data.courses.length >= 10 && latestReleases(data.courses, new Date().getFullYear()));
			var blogMenu = jQuery("#section-nav>ul.nav>li>a:contains('blog')").parent();
			var releasesMenu = jQuery("#section-nav>ul.nav>li.nav-option>a:contains('releases')").parent();
			var versionMenu = jQuery("#section-nav>ul.nav>li.with-sub-menu>a:contains('version')").parent();
			var allCoureses = jQuery("#section-nav>ul.nav>li.nav-option>a:contains('all courses')").parent();
			if (showReleases == true) {
				versionMenu.show(); versionMenu.addClass('versionTab'); releasesMenu.show(); allCoureses.show();
			}
			else if (showVersion == true) {
				versionMenu.show(); versionMenu.addClass('versionTab'); releasesMenu.hide(); allCoureses.show();
			}
			else {
				versionMenu.hide(); releasesMenu.hide(); if (blogMenu.length == 0) allCoureses.hide();
			} //

			filterSummaryData = filterSummary(data.sections, courses);

			jQuery("#resultCount").html("(" + (propertyCount(filters) == 0 ? "showing all " : "") + courses.length + ")");

			selectSubheaderTab(filters);
			renderFilters(filters, filterSummaryData);
			if (!hasSelections()) options.filtersEnabled = ((countFilterSections(filterSummaryData) > 0) && (courses.length > 1))
			if (filters && filters['page']) {
				pager = createPager(data.courses.length, courses.length, filters["page"][0], filters["page"][1]);
				renderPages(jQuery("div.paging>div.fr>ul.page-nmbrs"), jQuery("div.paging>div.showing"), false);
				renderPages(jQuery("div.paging-bottom>div.fr>ul.page-nmbrs"), jQuery("div.paging>div.showing"), true);
				courses = pageCourses(data.courses, courses, pager);
			}
			renderItems(filters, courses, jQuery(options.selector + " tbody"));

			jQuery("div#filter-wrapper").css({ "background-color": "", "height": "" });
			if (!options.filtersEnabled || (filters && filters['mode']
				&& filters['mode'][0] === 'new')) {
				jQuery("div#filter-box, div#selections, div#filtering").hide();
				jQuery("div#no-filter-spacer").show()
				jQuery("div#filter-wrapper").css("background-color", "white", "height", "20px");
			}
			else {
				if (isFilterOpen()) {
					jQuery("div#filter-box, div#selections, div#filtering").show();
				}
				else {
					jQuery("div#filter-box, div#selections").show();
					jQuery("div#filtering").hide();
				}
				jQuery("div#no-filter-spacer").hide();
			}

			if (filterModal)
				filterModal.dispose();
			var onclickCloseFlyOut = String.format("javascript:jQuery(\'div#filter-wrapper\').css(\'background-color\', \'#EDEAE2\');{0}",
                                                        (lynda.isIMobileDevice)?"jQuery(\'div#filtering li\').css(\'background-color\', \'#EDEAE2\')":"");
			filterModal = new filterOverflow({
				template: '<div class="filterOverflowWrapper"><div class="top"><span class="title"></span><a class="close" href="" onclick="' + onclickCloseFlyOut + '"><span class="icon remove">&nbsp;</span></a></div><div class="bottom"><div>...</div><div class="cl"></div></div></div>',
				selector: ".view-more",
				adjust: function(element, contentElement, modalElement) {
					modalElement.find('div.bottom').find('a').unbind('click').click(function() {
						var e = jQuery(this);
						var filter = element.parent().find('b');
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
					var columns = cnt > 30 ? 4 : cnt > 20 ? 3 : cnt > 10 ? 2 : 1;
					var size = Math.ceil(cnt / columns);
					var ul = modalElement.find('div.bottom').find('ul');
					var list = ul.children().filter(':gt(' + (size - 1) + ')');

					for (i = 0; i < Math.ceil(list.length / size); i++) {
						ul = jQuery("<ul />").append(list.slice(i * size, (i * size) + size)).insertAfter(ul);
					}
				},
				reposition: function(currentElement, modalElement, offset) {
					var o = currentElement.offset();
					var ocol = currentElement.closest("div.column").offset();
					ocol.top = ocol.top -4 - (jQuery.support.cssFloat == true ? 0 : 1);//for IE we need one pixel more
					var o1 = {
						left: offset.left - currentElement.width(),
						top: 0
					};

					var cnt = modalElement.find('div.bottom').find('a').length;
					var columns = cnt > 30 ? 4 : cnt > 20 ? 3 : cnt > 10 ? 2 : 1;
					var columnWidth = 182;
					var adj = 11;
					var newWidth = columnWidth * columns;
					newWidth += cnt > 30 ? 3 : cnt > 20 ? 3 : cnt > 10 ? 2 : 2;
					var viewMoreColumnIndex = currentElement.parent().find('a').attr("col");

					modalElement.find('a.close').unbind('click').click(filterModal.close);
					var t = modalElement.find('div.top');

					switch (viewMoreColumnIndex) {
						case "0":
							t.css({ marginLeft: 0, width: 182, textIndent: 9 });
							return modalElement.css({ width: newWidth, top: ocol.top, left: ((o.left + o1.left) - adj + 1) });
							break;
						case "1":
							switch (columns) {
								case 1:
								case 2:
								case 3:
									t.css({ marginLeft: 0, width: 182, textIndent: 10 });
									return modalElement.css({ width: newWidth, top: ocol.top, left: ((o.left + o1.left) - adj) });
									break;
								case 4:
									t.css({ marginLeft: columnWidth, width: 182, textIndent: 10 });
									return modalElement.css({ width: newWidth, top: ocol.top, left: ((o.left + o1.left) - (columnWidth + adj)) });
									break;
							}
							break;
						case "2":
							switch (columns) {
								case 1:
								case 2:
									t.css({ marginLeft: 0, width: 182, textIndent: 10 });
									return modalElement.css({ width: newWidth, top: ocol.top, left: ((o.left + o1.left) - adj) });
									break;
								case 3:
									t.css({ marginLeft: columnWidth + 1, width: 182, textIndent: 10 });
									return modalElement.css({ width: newWidth, top: ocol.top, left: ((o.left + o1.left) - (columnWidth + adj + 1)) });
									break;
								case 4:
									t.css({ marginLeft: 2 * columnWidth + 1, width: 182, textIndent: 10 });
									return modalElement.css({ width: newWidth, top: ocol.top, left: ((o.left + o1.left) - (2 * columnWidth + adj + 1)) });
									break;
							}
							break;
						case "3":
							switch (columns) {
								case 1:
									t.css({ marginLeft: 0, width: 182, textIndent: 11 });
									return modalElement.css({ width: newWidth, top: ocol.top, left: ((o.left + o1.left) - adj - 1) });
									break;
								case 2:
									t.css({ marginLeft: columnWidth + 1, width: 181, textIndent: 10 });
									return modalElement.css({ width: newWidth, top: ocol.top, left: ((o.left + o1.left) - (columnWidth + adj + 1)) });
									break;
								case 3:
									t.css({ marginLeft: 2 * columnWidth + 2, width: 181, textIndent: 10 });
									return modalElement.css({ width: newWidth, top: ocol.top, left: ((o.left + o1.left) - (2 * columnWidth + adj + 2)) });
									break;
								case 4:
									t.css({ marginLeft: 3 * columnWidth + 2, width: 181, textIndent: 10 });
									return modalElement.css({ width: newWidth, top: ocol.top, left: ((o.left + o1.left) - (3 * columnWidth + adj + 2)) });
									break;
							}
							break;
					}
				}
			});

			jQuery("div#filtering > div.column > ul > li > a.view-more").unbind('click').click(filterModal.open);
			jQuery("div#filtering > div.column > ul > li > a.view-more").click(function() {
				jQuery("div#filter-wrapper").css("background-color", "#BAB9B6");
				if(lynda.isIMobileDevice)
				{
					jQuery("div#filtering li").css("background-color", "#BAB9B6");
					jQuery("div.filterOverflowWrapper li, div.filterOverflowWrapper li a").css({ backgroundColor: "#EDEAE2", backgroundImage: "none" });
				}
			});
			if(lynda.isIMobileDevice)
			{
				jQuery("div#filtering > div.column > ul > li").css("background-color", "#EDEAE2");
			}

			// close "view more" fly-out when clicking outside of it
			jQuery(document).click(function(e) {
				if (jQuery("div.filterOverflowWrapper").is(':visible')) {
					if (jQuery(e.target).closest(".filterOverflowWrapper").length == 0) {
						filterModal.hoverOut();
						jQuery("div#filter-wrapper").css("background-color", "#EDEAE2");
						if(lynda.isIMobileDevice)
						{
							jQuery("div#filtering li").css("background-color", "#EDEAE2");
						}
					}
				}
			});

			if (options.postRender)
				options.postRender();
		};
		var selectSubheaderTab = function(filters, override) {
			var subheaderMenus = options.filtersMenus;

			var navLookup = {};
			util.mapP(subheaderMenus, function(v, k) { util.mapP(data.sections[v], function(val, key) { navLookup[val.name.toLowerCase()] = { 'name': options.sections[v], 'value': [key] }; }); });

			var navText = options.navTextAll;
			if (override)
				navText = override;
			else if (filters && filters.mode && filters.mode[0] == 'new')
				navText = 'latest releases';
			else if (filters && filters.mode && filters.mode[0] == 'documentaries')
				navText = 'documentaries';
			else {
				jQuery("li.with-sub-menu > a").each(function() {
					if (navText != options.navTextAll)
						return;
					var txt = jQuery.trim(jQuery(this).text()).toLowerCase();
					var sectionName = subheaderMenus[txt];
					if (!sectionName)
						return;
					var sectionItems = filters[options.sections[sectionName]];
					if (!sectionItems)
						return;
					navText = data.sections[sectionName][sectionItems[0]].name;
				});
			}

			jQuery("li.with-sub-menu.active").removeClass("active");
			jQuery("li.nav-option > a").each(function() {
				var e = jQuery(this);
				var txt = jQuery.trim(e.attr('href')).toLowerCase();
				if (txt.indexOf('#') >= 0) { var txtArray = txt.split('#'); if (txtArray.length == 3) { txt = txtArray[1] + '#'; } else { txt = txtArray[1]; txt = txt.replace('#', ''); } }
				if (txt == null || txt.length == 0) txt = jQuery.trim(e.text()).toLowerCase();
				if (txt == navText.toLowerCase() || (txt.indexOf(navText) != -1 && navText.toLowerCase() == 'documentaries'))
					e.parent().addClass("active").parents("li.with-sub-menu").addClass("active");
				else
					e.parent().removeClass("active");

				var v = navLookup[txt.toLowerCase()];
				e.unbind("click").click(txt == options.navTextAll
					? function() { self.reset(); return false; }
					: (txt == "documentaries"
						? function() { self.reset('documentaries'); return false; }
						: (txt == "new releases" || txt == "latest releases"
							? function() { self.reset('new'); return false; }
							: function() { var obj = {}; obj[v.name] = v.value; self.reset('', obj); return false; }
							)
						)
					);
			});
			navText = navText.indexOf('^') > 0 ? navText.split('^')[0] : navText;
			jQuery("div#section-name > h3.section-sub").html(navText);
			var keepCapitalizeSectionName = false;
			// 4721 - if the subheader starts with or contains the strings defined in category data, don't change the text to lower case
			if (navText != options.navTextAll) {
				var count = 0;
				for (count = 0; count < data.capitalizeSections.startsWith.length; count++) {
					if (navText.toLowerCase().indexOf(data.capitalizeSections.startsWith[count]) == 0) {
						keepCapitalizeSectionName = true;
						break;
					}
				}
				if (!keepCapitalizeSectionName) {
					for (count = 0; count < data.capitalizeSections.contains.length; count++) {
						if (navText.toLowerCase().indexOf(data.capitalizeSections.contains[count]) != -1) {
							keepCapitalizeSectionName = true;
							break;
						}
					}
				}
			}
			if (keepCapitalizeSectionName) {
				jQuery("div#section-name > h3.section-sub").css('text-transform', 'none');
			}
			else jQuery("div#section-name > h3.section-sub").css('text-transform', '');
		}
		var countFilterSections = function(summaries) {
			var cnt = 0;
			util.mapP(summaries, function(obj, key) {
				if (obj.length > 1) cnt++;
			});
			return cnt;
		};
		var renderFilters = function(filters, summaries) {
			var html = '<ul id="your-selections"><li><strong>your filters: </strong></li>';
			var template = {
				selections: {
					item: {
						first: '<li class="callout" onclick="{0}">{1}</li>',
						mid: '<li class="callout extra" onclick="{0}">{1}</li>'
					}
				},
				filters: {
					column: {
						wrapper: '<div class="column"><div class="title">{0}</div><ul>{1}</ul></div>',
						wrapperLast: '<div class="column last"><div class="title">{0}</div><ul>{1}</ul></div>',
						item: '<li {3} ><a href="#" onclick="{0}return false;">{1} <span>({2})</span></a></li>',
						more: '<li><a href="#" class="view-more" fname="{0}" col="{1}">+ view more</a><div style="display:none"><ul>{2}</ul></div></li>'
					}
				},
				adobeIP: {
					notSelected: '<li class="adobefilter"><a class="adobeCallOut" onclick="{0}">{1}</a><a onclick="{0}" class="btn-mini"><span>off</span></a><a class="preselectedTooltip" href="{2}">&nbsp;</a></li>',
					Selected: '<li class="adobefilter"><a class="adobeCallOutSelected" onclick="{0}">{1}</a><a onclick="{0}" class="btn-mini"><span>on</span></a><a class="preselectedTooltip" href="{2}">&nbsp;</a></li>'
				}
			};

			// selections
			var cnt = 0;
			if (options.isAdobeIP)
				html += util.stringFormat(showAdobeIPOnly ? template.adobeIP.Selected : template.adobeIP.notSelected, "page.showRestrictedList(this);", "preselected courses", options.limitedAccessCoursePopupURL);

			util.mapP(filters, function(val, key) {
				if (options.filtersTrayExclusions[key])
					return;

				var value = '';
				if (typeof val[0] == 'boolean')
					value = "[" + val.join(",") + "]";
				else
					value = "['" + val.join("','") + "']";
				var filterName = findFilterName(data, key, val);
				filterName = filterName.indexOf('^') >= 0 ? filterName.split('^')[0] : filterName;
				html += util.stringFormat(cnt === 0 ? template.selections.item.first : template.selections.item.mid, "page.removeFilter('" + key + "'," + value + ");", filterName);
				cnt++;
			});
			html += '</ul><div class="clear"></div>';

			if (cnt > 0 || options.isAdobeIP) {
				jQuery("div#selections").html(html).show();
				if (cnt > 0)
					jQuery("div#filter-box").children('a.clear-filter').show();
			}
			else {
				jQuery("div#selections").html('').hide();
				jQuery("div#filter-box").children('a.clear-filter').hide();
			}

			if (hasSelections() || isFilterOpen())
				jQuery("div#filter-wrapper").css({ 'margin-bottom': '0px' });
			//else
			//	jQuery("div#filter-wrapper").css({ 'margin-bottom': '10px' });

			// dynamic filters
			html = '';
			var limit = 4, itemLimit = 3;
			util.mapA(options.sectionsOrder, function(s, i) {
				if (!summaries[s])
					return;
				var key = s;
				var obj = summaries[s];

				var n = options.sections[key] ? options.sections[key] : key;
				if (filters[n] || obj.length <= 1)
					return;

				// dependencies
				if ((n == 'v' && !filters['s'] && data.info.type != 'Software')	// Software <- Version
					|| (n == 't' && !filters['u'] && data.info.type != 'Subjects') // Subject <- Subtopic
					)
					return;

				if (limit > 0) {
					var moreitems = obj; //.slice(itemLimit + 1);
					var itemsitems = obj.slice(0, itemLimit + 1);
					//4122 - Sort order for "View All" filter pop-ups
					//for Version, Level and Release Date, leave it as is, sorted by position
					if (n != 'v' && n != 'dateYear' && n != 'l') {
						moreitems.sort(function(x, y) {
							if (x.name.toLowerCase() < y.name.toLowerCase()) return -1;
							if (x.name.toLowerCase() > y.name.toLowerCase()) return +1;
							return 0;
						});
					}
					if (moreitems.length != itemsitems.length)
						obj = itemsitems.concat(moreitems);

					var tempHtml = { items: "", more: "" };
					util.mapA(obj, function(item, index) {
						//Bug 6065 - Issues on the "view more" fly-out
						var itemname = item.name;
						if (item.name.toLowerCase() == "santa barbara international film festival") itemname = "Santa Barbara Film Festival"
						else if (item.name.toLowerCase() == "the professional association for design aiga") itemname = "AIGA";

						tempHtml[index>itemLimit?"more":"items"]+=util.stringFormat(template.filters.column.item,"page.addFilter('"+key+"',['"+item.id+"']);",itemname,item.count,(lynda.isIMobileDevice)?"style=background-color:#EDEAE2":"");
					});
					if (tempHtml["more"].length > 0) {
						tempHtml["items"] += util.stringFormat(template.filters.column.more, key, 4 - limit, tempHtml["more"]);
						html += util.stringFormat(template.filters.column.wrapper, key, tempHtml["items"]);
					} else {
						//3637 - Redesign - Course Listings - Filter borderlines are not equal on both sides of longer filter selections
						//Added extra li to balance columns
						tempHtml["items"] += "<li>&nbsp;</li>";
						html += util.stringFormat(template.filters.column.wrapper, key, tempHtml["items"]);
					}
					limit--;
				}
			});

			var e = jQuery("div#filtering");
			e.find("div.column").remove();
			e.prepend(html);
			e.find("div.column").last().addClass("last");
			setModal();
			var checkboxes = [
				{ sel: 'input#optdvd', type: 'arr', filter: 'dvd', value: true },
				{ sel: 'input#optcc', type: 'arr', filter: 'cc', value: true }
				];
			util.mapA(checkboxes, function(c, i) {
				if (c.type === 'str')
					jQuery(c.sel)
							.attr("checked", (filters[c.filter] && filters[c.filter].indexOf(c.value) != -1) ? true : false)
							.unbind('click').click(function() { if (!this.checked) self.removeFilter(c.filter, [c.value]); else self.addFilter(c.filter, [c.value]); });
				else if (c.type === 'arr')
					jQuery(c.sel)
							.attr("checked", (filters[c.filter] && filters[c.filter][0] == c.value) ? true : false)
							.unbind('click').click(function() { if (!this.checked) self.removeFilter(c.filter, [c.value]); else self.addFilter(c.filter, [c.value]); });
			});
		};
		var renderItems = function(filters, courses, element) {
			var html = '';
			var template = {
				item: '<tr><td class="title">{0}<a cid="{2}" href="{3}" class="tTip">{1}</a></td><td>{4}</td><td>{5}</td><td>{6}</td><td class="cc">{7}</td><td class="cd">{8}</td></tr>',
				restricteditem: '<tr class="n"><td class="title">{0}<a cid="{2}" href="{3}" class="tTip">{1}</a></td><td>{4}</td><td>{5}</td><td>{6}</td><td class="cc">{7}</td><td class="cd">{8}</td></tr>',
				group: '<tr><td colspan="6" class="section-head">{0}</td></tr>',
				spriteLink: '<a href="" onclick="return false" class="sprite {0}" title="{1}">&nbsp;</a>',
				sprites: {
					cc: { css: "ccicon", title: "closed caption" },
					dvd: { css: "cdicon", title: "compact disc" },
					level1: { css: "level1", title: "beginner" },
					level2: { css: "level2", title: "intermediate" },
					level3: { css: "level3", title: "advanced" },
					level4: { css: "level4", title: "for all audiences" }
				}
			};
			/*  0=title, 1=url, 2=level / sprite, 3=duration, 4=release date, 5=cc / sprite, 6=dvd / sprite  */

			//hack
			var lev1, lev2, lev3, lev4;
			util.mapP(data.sections["Learning Level"], function(val, key) {
				if (val.name == 'Beginner') lev1 = key;
				else if (val.name == 'Intermediate') lev2 = key;
				else if (val.name == 'Advanced') lev3 = key;
				else if (val.name == 'Appropriate for All') lev4 = key;
			});

			var lastGroup = '', gP = filters.groupby && courses.length > 1 ? options.sections[filters.groupby] : null;
			var isGpValid = false;
			var allCoursesHaveCategory = true;

			var categoryOther;
			if (filters.s)
				categoryOther = { name: "Other^" + filters.s[0], sort: -1 };
			else
				if (filters.c)
				categoryOther = { name: "Other", sort: 0 };

			if (gP) {
				var courseGroups = [];
				var courseGroupsSorted = [];

				for (var a = 0, cnt = courses.length; a < cnt; a++) {
					if (jQuery.isArray(courses[a][gP]) && courses[a][gP].length > 0) {
						for (j = 0; j < courses[a][gP].length; j++) {
							if (filter[gP])
								if (filter[gP] != courses[a][gP][j])
								continue;
							var v = data.sections[filters.groupby][courses[a][gP][j]];
							if (v && v.name.split('^')[0] != 'Other' && (filters.groupby == "Software" || filters.s && v.name.split('^')[1] == filters.s[0])) {
								if (!courseGroups[v.name])
								{ courseGroups[v.name] = []; courseGroupsSorted.push(v); }
								courseGroups[v.name].push(courses[a]);
							}
							else {
								//if the course version is not found in data.sections["Version"] then the course is added to Other version category
								if (!courseGroups[categoryOther.name])
								{ courseGroups[categoryOther.name] = []; courseGroupsSorted.push(categoryOther); }
								courseGroups[categoryOther.name].push(courses[a]);
							}
						}
					}
					else {
						if (filter[gP])
							if (filter[gP] != courses[a][gP])
							continue;
						var v = data.sections[filters.groupby][courses[a][gP]];
						if (v && v.name.split('^')[0] != 'Other' && (filters.groupby == "Software" || filters.s && v.name.split('^')[1] == filters.s[0])) {
							if (!courseGroups[v.name])
								courseGroups[v.name] = [];
							courseGroups[v.name].push(courses[a]);
						}
						else {
							//if the course version is not found in data.sections["Version"] then the course is added to Other version category
							if (!courseGroups[categoryOther.name])
							{ courseGroups[categoryOther.name] = []; }
							courseGroups[categoryOther.name].push(courses[a]);
						}
					}
				}

				// remove course from Other version category if case they are already present in at least one version category
				if (filters.s && courseGroups[categoryOther.name]) {
					util.mapA(courseGroupsSorted, function(courseGroupSorted) {
						if (courseGroupSorted.name != categoryOther.name) {
							util.mapA(courseGroups[courseGroupSorted.name], function(courseGroup) {
								if (courseGroups[categoryOther.name].indexOf(courseGroup) >= 0) {
									var foundItems = [];
									var index = courseGroups[categoryOther.name].indexOf(courseGroup);
									while (index != -1) {
										foundItems.push(index);
										index = courseGroups[categoryOther.name].indexOf(courseGroup, ++index);
									}
									var courseGroupsCopy = [];
									courseGroupsCopy[categoryOther.name] = [];
									util.mapA(courseGroups[categoryOther.name], function(courseGroupOther, i) {
										if (foundItems.indexOf(i) == -1) courseGroupsCopy[categoryOther.name].push(courseGroupOther);
									});
									courseGroups[categoryOther.name] = courseGroupsCopy[categoryOther.name].slice(0);
								}
							});
						}
					});
				}

				self.sortArrayItems(courseGroupsSorted, gP == "v" ? "sort" : "name", gP == "v" ? false : true);

				if (courseGroupsSorted.length > 0 && allCoursesHaveCategory) {
					isGpValid = true;
					for (var mytemp = 0; mytemp < courseGroupsSorted.length; mytemp++) {
						self.sortItems(courseGroups[courseGroupsSorted[mytemp].name],options.currentSort.column,options.currentSort.sortOrder);
						var obj=courseGroups[courseGroupsSorted[mytemp].name];
						var titleHTML = util.stringFormat(template.group, courseGroupsSorted[mytemp].name.indexOf('^') >= 0 ? courseGroupsSorted[mytemp].name.split('^')[0] : courseGroupsSorted[mytemp].name);
						var courseHTML = "";
						for (var course in obj) {
							i = obj[course];
							if (i.title)
								courseHTML += util.stringFormat(
									(options.isAdobeIP && jQuery.inArray(i.cid, limitedAccessData.courses.id) == -1) ? template.restricteditem : template.item,
									!lynda.isQueueEnabled?'':'<div class="q baq_'+i.cid+'">{courseId:'+i.cid+',title:"'+util.escapeStringForJson(i.title)+'"}</div>',
									util.truncate(i.title, 47),
									i.cid,
									i.url.indexOf('http') == 0 ? url : (lynda.baseUrl + i.url),
									i.l[0] == lev1 ? util.stringFormat(template.spriteLink, template.sprites.level1.css, template.sprites.level1.title)
									: i.l[0] == lev2 ? util.stringFormat(template.spriteLink, template.sprites.level2.css, template.sprites.level2.title)
									: i.l[0] == lev3 ? util.stringFormat(template.spriteLink, template.sprites.level3.css, template.sprites.level3.title)
									: i.l[0] == lev4 ? util.stringFormat(template.spriteLink, template.sprites.level4.css, template.sprites.level4.title)
									: "&nbsp;",
									i.courseDuration,
									i.date,
									(i.cc&&(!lynda.isIMobileDevice))?util.stringFormat(template.spriteLink,template.sprites.cc.css,template.sprites.cc.title):'&nbsp;',
									i.dvd ? util.stringFormat(template.spriteLink, template.sprites.dvd.css, template.sprites.dvd.title) : '&nbsp;'
									);
						}
						if (courseHTML.length > 0) {
							html += titleHTML + courseHTML;
						}
					}
				}
			}
			if (!isGpValid) {
				util.mapA(courses, function(i) {
					html += util.stringFormat(
				            (options.isAdobeIP && jQuery.inArray(i.cid, limitedAccessData.courses.id) == -1) ? template.restricteditem : template.item,
				            !lynda.isQueueEnabled?'':'<div class="q baq_'+i.cid+'">{courseId:'+i.cid+',title:"'+util.escapeStringForJson(i.title)+'"}</div>',
				            util.truncate(i.title, 47),
				            i.cid,
				            i.url.indexOf('http') == 0 ? url : (lynda.baseUrl + i.url),
				            i.l[0] == lev1 ? util.stringFormat(template.spriteLink, template.sprites.level1.css, template.sprites.level1.title)
				            : i.l[0] == lev2 ? util.stringFormat(template.spriteLink, template.sprites.level2.css, template.sprites.level2.title)
				            : i.l[0] == lev3 ? util.stringFormat(template.spriteLink, template.sprites.level3.css, template.sprites.level3.title)
				            : i.l[0] == lev4 ? util.stringFormat(template.spriteLink, template.sprites.level4.css, template.sprites.level4.title)
				            : "&nbsp;",
				            i.courseDuration,
				            i.date,
				            (i.cc&&(!lynda.isIMobileDevice))?util.stringFormat(template.spriteLink,template.sprites.cc.css,template.sprites.cc.title):'&nbsp;',
				            i.dvd ? util.stringFormat(template.spriteLink, template.sprites.dvd.css, template.sprites.dvd.title) : '&nbsp;'
				            );
				});
			}

			var msg = element.find("tr.sub-msg");
			if (msg)
				element.find("tr[class!='sub-msg']").remove();
			else
				element.empty();
			element.append(html);
		};


		this.addFilterMenu = function(previousSiblingElement, section) {
			var wrapper = '<li class="with-sub-menu"><a href="#">{0}</a><div class="sub hidden"><ul>{1}</ul></div></li>';
			var item = '<li class="nav-option"><a href="#">{0}</a></li>';

			var sectionName = options.filtersMenus[section] ? options.filtersMenus[section] : section;

			var items = [];
			util.mapP(data.sections[sectionName], function(val, key) { if (val && val.name && val.name.length > 0) items.push({ "name": val.name, "id": key, "sort": val.sort }); });
			if (items.length == 0)
				return;

			self.sortArrayItems(items, sectionName === "Version" ? "sort" : "name", sectionName === "Version" ? false : true);

			var html = '';
			util.mapA(items, function(val, i) { html += util.stringFormat(item, val["name"]); });

			jQuery(previousSiblingElement).after(util.stringFormat(wrapper, section.toLowerCase(), html));
		};

		this.addFilterMenu = function(previousSiblingElement, section, redirectTo, categoryName) {

			//check if Other version category is needed to be displayed in the right top menu under Version tab
			var hasCategoryOther = checkCategoryOtherMenu(data.courses);
			if (hasCategoryOther)
				data.sections["Version"][0] = { name: "Other^" + data.info.id, sort: -1 };

			var wrapper = '<li class="with-sub-menu"><a href="#">{0}</a><div class="sub hidden"><ul>{1}</ul></div></li>';
			if (redirectTo != '' && redirectTo != "undefined" && redirectTo != undefined) {
				if (categoryName == "Documentaries") {
					var item = '<li class="nav-option"><a href="' + redirectTo + '#Subjects_{0}">{1}</a></li>';
				}
				else {
					var item = '<li class="nav-option"><a href="#' + redirectTo + '{0}">{1}</a></li>';
				}
			}
			else {
				if (categoryName == "Documentaries") {
					var item = '<li class="nav-option"><a href="#Subjects_{0}">{1}</a></li>';
				}
				else {
					var item = '<li class="nav-option"><a href="#{0}">{1}</a></li>';
				}
			}
			var sectionName = options.filtersMenus[section] ? options.filtersMenus[section] : section;

			var items = [];
			util.mapP(data.sections[sectionName], function(val, key) { if (val && val.name && val.name.length > 0) items.push({ "name": val.name, "id": key, "sort": val.sort }); });
			if (items.length == 0)
				return;

			self.sortArrayItems(items, sectionName === "Version" ? "sort" : "name", sectionName === "Version" ? false : true);

			var html = '';
			util.mapA(items, function(val, i) { if (val["name"].toLowerCase() == "documentaries") return; html += util.stringFormat(item, val["name"], ((val["name"].indexOf('^') >= 0) ? val["name"].split('^')[0] : val["name"])); });

			jQuery(previousSiblingElement).after(util.stringFormat(wrapper, section.toLowerCase(), html));

			if (jQuery(previousSiblingElement).next().next().find('a:first').html() == jQuery(previousSiblingElement).next().find('a:first').html())
				jQuery(previousSiblingElement).next().next().hide();

			//set min-width to width of section for drop down menus if text is short
			var sectionElement = jQuery('li.with-sub-menu > a:contains("' + section.toLowerCase() + '")');
			var minWidthPad = parseInt(jQuery(sectionElement).outerWidth(true)) - parseInt(jQuery(sectionElement).css('padding-right')) + 2;
			jQuery(sectionElement).next().css('width', '').css('min-width', minWidthPad).children(':eq(0)').css('float', 'left');
		};

		//check if courses have Other version category and convert to 0 any course version that is not present in data.sections["Version"]
		var checkCategoryOther = function(courses, shouldPutZero, checkFilters) {
			var hasCategoryOther = false;
			var gP = "v";
			util.mapA(courses, function(course) {
				for (j = 0; j < course[gP].length; j++) {
					if (checkFilters && filter[gP])
						if (filter[gP] != course[gP][j])
						continue;
					var v = data.sections["Version"][course[gP][j]];
					if (!v || (filter.s && v.name.split('^')[1] != filter.s.toString())) {
						if (shouldPutZero) course[gP][j] = 0;
						hasCategoryOther = true;
					}
				}
			})
			return hasCategoryOther;
		}

		//check if Other version category is needed to be displayed in the right top menu under Version tab
		var checkCategoryOtherMenu = function(courses) {
			var hasCategoryOther = true;
			var gP = "v";
			for (var a = 0, cnt = courses.length; a < cnt; a++) {
				hasCategoryOther = true;
				for (j = 0; j < courses[a][gP].length; j++) {
					if (filter[gP])
						if (filter[gP] != courses[a][gP][j])
						continue;
					var v = data.sections["Version"][courses[a][gP][j]];
					if (v) {
						hasCategoryOther = false;
					}
				}
				if (hasCategoryOther == true) break;
			}
			return hasCategoryOther;
		}

		var isFilterOpen = function() {
			return jQuery("div#filter-box a.toggle-blue-minus").length != 0;
		};
		var hasSelections = function() {
			var cnt = 0;
			util.mapP(filter, function(val, key) {
				if (options.filtersTrayExclusions[key])
					return;
				cnt++;
			});
			return cnt > 0 ? true : false;
		};

		this.toggleFilters = function() {
			if (!jQuery("#filtering").toggle().is(":visible")) {
				jQuery("div#filter-box a.toggle-blue-minus").removeClass("toggle-blue-minus").addClass("toggle-blue-plus");
				jQuery("div#filter-box a.toggle-blue-plus").html("open filters");
			}
			else {
				jQuery("div#filter-box a.toggle-blue-plus").removeClass("toggle-blue-plus").addClass("toggle-blue-minus");
				jQuery("div#filter-box a.toggle-blue-minus").html("close filters");
			}

			if (hasSelections() || isFilterOpen())
				jQuery("div#filter-wrapper").css({ 'margin-bottom': '0px' });
			//else
			//	jQuery("div#filter-wrapper").css({ 'margin-bottom': '10px' });
		};

		this.pageLoadState = function(cookieName, location, refreshSpanMS, payloadMethod) {
			var sep = '\t';
			var parseCookie = function(name) {
				var cook = jQuery.cookie(name), parts = [];
				var parts = cook && cook.indexOf(sep) != -1 ? cook.split(sep) : [];
				if (parts.length < 2)
					return null;
				return { "url": parts[0], "ms": (new Date().valueOf() - Number(parts[1])), "prev": (parts.length > 2 ? parts[2] : ''), "payload": (parts.length > 3 ? parts[3] : ''), "prevPayload": (parts.length > 4 ? parts[4] : '') };
			};
			var loadState = function(c, u, ms) {
				if (c && u && ms) {
					if (c.url == u && c.ms < ms)
						return { 'status': 'reload' };
					//else if (c.url == c.prev)
					//	return { 'status': 'load' };
					else if (c.url == u && c.ms > ms) {
						return { 'status': 'back', 'payload': util.evalJson(c.payload ? c.payload : (c.prevPayload && c.prevPayload.length > 4 ? c.prevPayload : '{}')) };
					}
				}
				return { 'status': 'load' };
			};

			var cookie = parseCookie(cookieName);
			var unbind = function() {
				jQuery.cookie(cookieName, [location, new Date().valueOf(), (cookie ? cookie.url : ''), (payloadMethod ? payloadMethod() : ''), (cookie ? cookie.payload : '')].join(sep), { expires: 1, path: '/' });
			};
			jQuery(window).unbind('beforeunload', unbind).bind('beforeunload', unbind);
			return loadState(cookie, location, refreshSpanMS);
		};
		this.createSubtopicPayload = function(subtopicName) {
			var n = 'Subtopics', obj = {};
			obj[options.sections[n].toString()] = [findId(n, subtopicName).toString()];
			return obj;
		};
		this.createFilterPayload = function(filterType, filterName) {
			var n = filterType, obj = {};
			obj[options.sections[n].toString()] = [findId(n, filterName).toString()];
			return obj;
		};
		this.setFilterMenu = function(menuName, sectionName) {
			if (menuName && sectionName) {
				options.filtersMenus[menuName] = sectionName;
			}
		};
	};
	var setModal = function() {
		//preselected tooltip modal
		var preselectedModal = jQuery("a.preselectedTooltip");

		if (preselectedModal && preselectedModal.fancybox)
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