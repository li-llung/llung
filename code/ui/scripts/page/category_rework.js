(function(lynda, lp, jQuery) {
	lp.category = function(Data, Options) {
		var self = this, data = Data;
		var showAdobeIPOnly = false;
		var options = jQuery.extend({
			sections: { "Subjects": "u", "Subtopics": "t", "Software": "s", "Software Company": "c", "Author": "a", "Learning Level": "pl", "Version": "v", "Release Date": "dateYear", "OS Platform": "p" },
			sectionsLookup: { "u": "Subjects", "t": "Subtopics", "s": "Software", "c": "Software Company", "a": "Author", "pl": "Learning Level", "v": "Version", "dateYear": "Release Date", "p": "OS Platform" },
			sectionsOrder: ["Subtopics", "Software", "Version", "Software Company", "Author", "Release Date", "Learning Level", "OS Platform"],
			sectionsValueSort: { "Release Date": "asc", "Version": "desc" },
			filtersEnabled: false,
			filtersDefault: {},
			filtersNameLookup: { 'dvd': 'DVD', 'cc': 'Closed Captioning' },
			filtersMenus: { "subtopics": "Subtopics", "version": "Version", "series": "Subtopics", "Series": "Subtopics", "Subjects": "Subjects", "subjects": "Subjects" },
			filtersTrayExclusions: { "page": true, "sort": true, "mode": true, "groupby": true },
			//sortPropertyLookup: { "Course Title": "title", "Level": "pl", "Duration": "duration", "Date": "dateNumeric", "Released": "dateNumeric", "closed caption": "cc", "compact disc": "dvd" },
			sortPropertyLookup: {"rankno": "rankno","productid": "productid","course": "course","courseReleaseDate": "courseReleaseDate","isactive": "isactive","tier1Percent": "tier1Percent","tier2Percent": "tier2Percent","otl_earning": "otl_earning","cd_sales": "cd_sales","cd_rate": "cd_rate","cd_earning": "cd_earning","total": "total","prevAccountBalance": "prevAccountBalance","currAccountBalance": "currAccountBalance","remainingAdvBalance": "remainingAdvBalance","currMonthPayment": "currMonthPayment","advPayment": "advPayment","totalEarningsToDate": "totalEarningsToDate","usagePercent": "usagePercent","revenuePercent": "revenuePercent","checkNumber": "checkNumber","totalView": "totalView","OTLRoyalties": "OTLRoyalties","OTLRoyaltiesDeke": "OTLRoyaltiesDeke","OTLRoyaltiesDekeSecondary": "OTLRoyaltiesDekeSecondary","RoyaltiesDekeOther": "RoyaltiesDekeOther","currMonthEarnings": "currMonthEarnings"},
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

		this.sortItemsMulti = function(array, propertyInfo, direction) {
			var p = propertyInfo;			
			if(direction == 'asc'){
				array.sort(function(a, b) {
					/*if (a === undefined || b === undefined || a.course === undefined || b.course === undefined)
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
					return 0;*/
				});
			}else{
				array.reverse(function(a, b) {
					/*if (a === undefined || b === undefined || a.course === undefined || b.course === undefined)
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
					return 0;*/
				});
			}
		};
		this.sortItems = function(array, property, asc, direction) {
			var obj = {};
			obj[property] = { 'asc': asc };
			return self.sortItemsMulti(array, obj, direction);
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
		var findId = function(section, name) {
			for (var id in data.sections[section]) {
				var item = data.sections[section][id];
				if (item && item.name && item.name.toLowerCase() === name.toLowerCase())
					return id;
			}
		};
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
			var html = '';
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
			
			var direction = '';
			/*if(!a.hasClass('active')){
				if(s.hasClass('dbl-arrow-white-gray')){
					direction = 'desc';
					//s.removeClass('up');
				}else if (s.hasClass('dbl-arrow-gray-white')){
					direction = 'asc';
					//s.removeClass('down');
				}else{
					direction = 'asc';
				}
			}*/		
			if(a.hasClass('sortdesc')){
				direction = 'desc';
			}else{
				direction = 'asc';
			}
			
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

			if (name.length == 0 && a.attr('course'))
				name = jQuery.trim(a.attr('course'));

			var n = options.sortPropertyLookup[name] ? options.sortPropertyLookup[name] : name;
			options.currentSort.column=n;
			options.currentSort.sortOrderAsc=asc;
			filter['sort'] = [a.parent().index(), asc];


			if (groupby && options.sections[groupby]) {
				var info = {};
				info[options.sections[groupby]] = { 'asc': groupby === 'Version' ? false : true, val: function(id) { return id.length == 0 ? 0/*empty group; 0 - on top; max int - on bottom*/ : data.sections[groupby][id[0]] ? data.sections[groupby][id[0]].sort : 0; } };
				info[n] = { 'asc': asc };
				self.sortItemsMulti(data.courses, info, direction);

				//filter['groupby']=groupby;

				var thead = a.parent().parent();
				thead.find('th').removeClass('active').find('a > span').removeClass('dbl-arrow-gray-white').removeClass('dbl-arrow-white-gray');
			}
			else {

				var thead = a.parent().parent();
				thead.find('th').removeClass('active').find('a > span').removeClass('dbl-arrow-gray-white').removeClass('dbl-arrow-white-gray');
				s.addClass(asc ? 'dbl-arrow-white-gray' : 'dbl-arrow-gray-white');
				/*if(s.hasClass('dbl-arrow-white-gray')){
					s.removeClass('down');
				}else if (s.hasClass('dbl-arrow-gray-white')){
					s.removeClass('up');
				}else{
					s.addClass('up');
				}*/
				//s.removeClass('down').removeClass('up').addClass(direction == "asc" ? 'up' : 'down');
				
				if (a.hasClass('visited')){
					if (a.text() == el_text){
						if (a.hasClass('up')){
							a.addClass('down');
							a.removeClass('up');
							a.addClass('sortdesc');
						  	a.removeClass('sortasc');
						  	direction = 'desc';
						}else{
							a.removeClass('down');
							a.addClass('up');
							a.addClass('sortasc');
							a.removeClass('sortdesc');
							direction = 'asc';
						}
					}else{
						if (a.hasClass('up')){
							a.addClass('up');
							a.removeClass('down');
							a.addClass('sortasc');
							a.removeClass('sortdesc');
							direction = 'asc';
						}else{
							a.addClass('down');
							a.removeClass('up');
							a.addClass('sortdesc');
							a.removeClass('sortasc');
							direction = 'desc';
    					}
					}
				}else{
					a.addClass('up');
					a.removeClass('down');
					a.addClass('sortasc');
					a.removeClass('sortdesc');
					a.addClass('visited');
					direction = 'asc';
				} 	
				el_class = a.attr('class');
				el_text = a.text();
				
				a.addClass('active');
				
				//console.log(direction);
				self.sortItems(data.courses, n, asc, direction);

				if (filter['groupby'])
					delete filter['groupby'];
			}

			resetPage();
			self.rerender();
		};
		var render = function(data, filters) {
			//use a copy of data.courses that will be altered depending on the filter applied.
			//data.courses should not be altered as it will be used when new filters are applied
			var dataCoursesCopy = eval(jQuery.toJSON(data.courses));
			var courses = dataCoursesCopy;

			jQuery("#resultCount").html("(" + (propertyCount(filters) == 0 ? "showing all " : "") + courses.length + ")");

			renderItems(filters, courses, jQuery(options.selector + " tbody"));
			if (options.postRender)
				options.postRender();
		};
		var renderItems = function(filters, courses, element) {
			var html = '';
			var template = {
				//item: '<tr><td class="title">{0}<a course="{2}" href="{3}" class="tTip">{1}</a></td><td>{4}</td><td>{5}</td><td>{6}</td><td class="cc">{7}</td><td class="cd">{8}</td></tr>',
				item: '<tr><td>{0}</td><td>{1}</td><td>{2}</td><td>{3}</td><td>{4}</td><td>{5}</td><td>{6}</td><td>{7}</td><td>{8}</td><td>{9}</td><td>{10}</td><td>{11}</td><td>{12}</td><td>{13}</td><td>{14}</td><td>{15}</td><td>{16}</td><td>{17}</td><td>{18}</td><td>{19}</td><td>{20}</td><td>{21}</td><td>{22}</td><td>{23}</td><td>{24}</td><td>{25}</td><td>{26}</td></tr>',
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

			var lastGroup = '', gP = options.sections[filters];
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

				self.sortArrayItems(courseGroupsSorted, gP == "rankno" ? "sort" : "name", gP == "rankno" ? false : true);

				if (courseGroupsSorted.length > 0 && allCoursesHaveCategory) {
					isGpValid = true;
					for (var mytemp = 0; mytemp < courseGroupsSorted.length; mytemp++) {
						self.sortItems(courseGroups[courseGroupsSorted[mytemp].name],options.currentSort.column,options.currentSort.sortOrder);
						var obj=courseGroups[courseGroupsSorted[mytemp].name];
						var titleHTML = util.stringFormat(template.group, courseGroupsSorted[mytemp].name.indexOf('^') >= 0 ? courseGroupsSorted[mytemp].name.split('^')[0] : courseGroupsSorted[mytemp].name);
						var courseHTML = "";
						for (var course in obj) {
							i = obj[course];
							if (i.course)
								courseHTML += util.stringFormat(
									template.item,
									i.rankno,
									i.productid,
									i.course,
									i.courseReleaseDate,
									i.isactive,
									i.tier1Percent,
									i.tier2Percent,
									i.otl_earning,
									i.cd_sales,
									i.cd_rate,
									i.cd_earning,
									i.total,
									i.prevAccountBalance,
									i.currAccountBalance,
									i.remainingAdvBalance,
									i.currMonthPayment,
									i.advPayment,
									i.totalEarningsToDate,
									i.usagePercent,
									i.revenuePercent,
									i.checkNumber,
									i.totalView,
									i.OTLRoyalties,
									i.OTLRoyaltiesDeke,
									i.OTLRoyaltiesDekeSecondary,
									i.RoyaltiesDekeOther,
									i.currMonthEarnings
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
				            template.item,
				            i.rankno,
							i.productid,
							i.course,
							i.courseReleaseDate,
							i.isactive,
							i.tier1Percent,
							i.tier2Percent,
							i.otl_earning,
							i.cd_sales,
							i.cd_rate,
							i.cd_earning,
							i.total,
							i.prevAccountBalance,
							i.currAccountBalance,
							i.remainingAdvBalance,
							i.currMonthPayment,
							i.advPayment,
							i.totalEarningsToDate,
							i.usagePercent,
							i.revenuePercent,
							i.checkNumber,
							i.totalView,
							i.OTLRoyalties,
							i.OTLRoyaltiesDeke,
							i.OTLRoyaltiesDekeSecondary,
							i.RoyaltiesDekeOther,
							i.currMonthEarnings
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
	};
})(lynda, lynda.page, jQuery);