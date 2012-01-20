(function(lynda, lp, jQuery) {
	lp.LyndaCampusReports = function(new_options) 
	{
		var self = this;
		
		var options = jQuery.extend({
			'results_per_page' : 15,
			'start_date' : '',
			'end_date' : '',
			'defined_date' : '',
			'sort_column' : 'username',
			'sort_direction' : 'ASC',
			'sort_conversion' : ''
		}, new_options);

		
		
		var page = 1;
		var currentFunction = '';
		var currentFunctionName = '';
		
		var templates = 
		{
            pagerPrev: '<li><a class="prev" href="#">&laquo; Prev</a></li>',
            pagerNext: '<li><a class="next" href="#">Next &raquo;</a></li>',
            pagerPage: '<li><a href="#">{0}</a></li>',
            pagerSelectedPage: '<li><a class="s" href="#">{0}</a></li>',
            pagerGap: '<li><span>...</span></li>',

            resultsFootText: 'showing {0}-{1} of {2}'
        };
        
        
		this.GenerateTotalUsageSummary = function() 
		{
			self.currentFunction = this.GenerateTotalUsageSummary;
			self.currentFunctionName = "Total Usage Summary";
			
			var url = '/ajax/LyndaCampusReports.aspx?report=total_usage_summary' + self.getDateOptions();
			jQuery.getJSON(url, '', this.GenerateTotalUsageSummaryCallback)
		};
		
		this.GenerateTotalUsageSummaryCallback = function(data)
		{
			if (data.success)
			{
				jQuery('#report_content').html(data.results);
				jQuery('#total_usage_summary_table').tablesorter();
				jQuery('#total_usage_summary_table').bind("sortStart", self.TableSortStartHook).bind("sortEnd", self.TableSortEndHook);
			}
			else
				self.renderErrors(data.errors);
		}
                
		this.GenerateMemberUsage = function() 
		{
			self.currentFunction = this.GenerateMemberUsage;
			self.currentFunctionName = "Member Usage Summary";
			
			var url = '/ajax/LyndaCampusReports.aspx?report=member_usage&page=' + self.page + '&results=' + options.results_per_page + self.getDateOptions() + self.getSortOptions();
			jQuery.getJSON(url, '', this.GenerateMemberUsageCallback)
		};
		
		this.GenerateMemberUsageCallback = function(data)
		{
			if (data.success)
			{
				jQuery('#report_content').html(data.results);

				options.sort_conversion = 
				{
					'username' : 'Email',
					'courses_viewed' : 'CourseViews',
					'movies_viewed' : 'MovieViews',
					'total_movies_viewed' : 'TotalMovieViews',
					'total_hours_viewed' : 'TotalMovieHours',
					'login_count' : 'LoginCount',
					'last_login' : 'LastLogin'	
				};

				//setup sorts			
				var header_row = jQuery('#report_content > table > thead > tr');
				header_row.find('th.username > a').unbind('click').click(function() { self.changeSort("username"); return false; });
				header_row.find('th.courses_viewed > a').unbind('click').click(function() { self.changeSort("courses_viewed"); return false; });
				header_row.find('th.movies_viewed > a').unbind('click').click(function() { self.changeSort("movies_viewed"); return false; });
				header_row.find('th.total_movies_viewed > a').unbind('click').click(function() { self.changeSort("total_movies_viewed"); return false; });
				header_row.find('th.total_hours_viewed > a').unbind('click').click(function() { self.changeSort("total_hours_viewed"); return false; });
				header_row.find('th.login_count > a').unbind('click').click(function() { self.changeSort("login_count"); return false; });
				header_row.find('th.last_login > a').unbind('click').click(function() { self.changeSort("last_login"); return false; });

				self.renderPagination(data.pager);
			}
			else
				self.renderErrors(data.errors);
		}

		this.GenerateCourseRankingSummary = function() 
		{
			self.currentFunction = this.GenerateCourseRankingSummary;
			self.currentFunctionName = "Course Ranking Summary";
			
			var url = '/ajax/LyndaCampusReports.aspx?report=course_ranking_summary&page=' + self.page + '&results=' + options.results_per_page + self.getDateOptions() + self.getSortOptions();
			jQuery.getJSON(url, '', this.GenerateCourseRankingSummaryCallback)
		};
		
		this.GenerateCourseRankingSummaryCallback = function(data)
		{
			if (data.success)
			{
				jQuery('#report_content').html(data.results);
				
				options.sort_conversion = 
				{
					'total_views' : 'TotalViews',
					'unique_viewers' : 'UniqueViewers',
					'hours_viewed' : 'HoursViewed',
					'average_percent_watched' : 'AveragePercentWatched',
					'members_completed' : 'MembersCompleted'
				};
				
				//setup sorts			
				var header_row = jQuery('#report_content > table > thead > tr');
				header_row.find('th.total_views > a').unbind('click').click(function() { self.changeSort("total_views"); return false; });
				header_row.find('th.unique_viewers > a').unbind('click').click(function() { self.changeSort("unique_viewers"); return false; });
				header_row.find('th.hours_viewed > a').unbind('click').click(function() { self.changeSort("hours_viewed"); return false; });
				header_row.find('th.average_percent_watched > a').unbind('click').click(function() { self.changeSort("average_percent_watched"); return false; });
				header_row.find('th.members_completed > a').unbind('click').click(function() { self.changeSort("members_completed"); return false; });

				self.renderPagination(data.pager);
			}
			else
				self.renderErrors(data.errors);
		}
        
        
		this.GenerateMemberList = function() 
		{
			self.currentFunction = this.GenerateMemberList;
			self.currentFunctionName = "Member List";
			
			var url = '/ajax/LyndaCampusReports.aspx?report=member_list&page=' + self.page + '&results=' + options.results_per_page + self.getDateOptions() + self.getSortOptions();
			jQuery.getJSON(url, '', this.GenerateMemberListCallback)
		};
		
		this.GenerateMemberListCallback = function(data)
		{
			if (data.success)
			{
				jQuery('#report_content').html(data.results);

				options.sort_conversion = 
				{
					'username' : 'Email',
					'location' : 'Location',
					'member_type' : 'MemberType',
					'department' : 'Department',
					'administrative_area' : 'AdministrativeArea',
					'login_count' : 'LoginCount',
					'last_login' : 'LastLogin',
					'total_movie_hours' : 'TotalMovieHours'
				};

				//setup sorts			
				var header_row = jQuery('#report_content > table > thead > tr');
				header_row.find('th.username > a').unbind('click').click(function() { self.changeSort("username"); return false; });
				header_row.find('th.location > a').unbind('click').click(function() { self.changeSort("location"); return false; });
				header_row.find('th.member_type > a').unbind('click').click(function() { self.changeSort("member_type"); return false; });
				header_row.find('th.department > a').unbind('click').click(function() { self.changeSort("department"); return false; });
				header_row.find('th.administrative_area > a').unbind('click').click(function() { self.changeSort("administrative_area"); return false; });
				header_row.find('th.login_count > a').unbind('click').click(function() { self.changeSort("login_count"); return false; });
				header_row.find('th.last_login > a').unbind('click').click(function() { self.changeSort("last_login"); return false; });
				header_row.find('th.total_movie_hours > a').unbind('click').click(function() { self.changeSort("total_movie_hours"); return false; });

				self.renderPagination(data.pager);
			}
			else
				self.renderErrors(data.errors);
		}





		this.GenerateIPMovieHistory = function() 
		{
			self.currentFunction = this.GenerateIPMovieHistory;
			self.currentFunctionName = "IP Movie History";
			
			var url = '/ajax/LyndaCampusReports.aspx?report=ip_movie_history&page=' + self.page + '&results=' + options.results_per_page + self.getDateOptions() + self.getSortOptions();
			jQuery.getJSON(url, '', this.GenerateIPMovieHistoryCallback)
		};
		
		this.GenerateIPMovieHistoryCallback = function(data)
		{
			if (data.success)
			{
				jQuery('#report_content').html(data.results);

				options.sort_conversion = 
				{
					'course_name' : 'CourseName',
					'chapter_index' : 'ChapterIndex',
					'movie_name' : 'VideoName',
					'access_date' : 'AccessDate',
					'ip_address' : 'IPAddress'
				};

				//setup sorts			
				var header_row = jQuery('#report_content > table > thead > tr');
				header_row.find('th.course_name > a').unbind('click').click(function() { self.changeSort("course_name"); return false; });
				header_row.find('th.chapter_index > a').unbind('click').click(function() { self.changeSort("chapter_index"); return false; });
				header_row.find('th.movie_name > a').unbind('click').click(function() { self.changeSort("movie_name"); return false; });
				header_row.find('th.access_date > a').unbind('click').click(function() { self.changeSort("access_date"); return false; });
				header_row.find('th.ip_address > a').unbind('click').click(function() { self.changeSort("ip_address"); return false; });
				
				self.renderPagination(data.pager);
			}
			else
				self.renderErrors(data.errors);
		}


		this.getDateOptions = function() 
		{
			if (options.defined_date.length > 0)
				return '&defined_date=' + options.defined_date;
			else if (options.start_date.length > 0 && options.end_date.length > 0)
				return '&start_date=' + options.start_date + '&end_date=' + options.end_date;
		}
        
        
		this.getSortOptions = function() 
		{
			if (typeof options.sort_conversion == "string")
				return '';
				//first call, return nothing (default sort)
			
			if (options.sort_column.length > 0)
			{
				var sort_option = options.sort_conversion[options.sort_column];
				if (typeof sort_option != "string")
					return '';
				else if (sort_option.length > 0)
					return '&sort=' + sort_option + '&sort_direction=' + options.sort_direction;
			}
			
			return '';
		}

		this.clearResults = function()
		{
			jQuery('#report_content').html('');
			jQuery('#report_errors').html('').hide();
			
			jQuery('div.paging > div > ul.page-nmbrs').html('')
			jQuery('div.paging > div.showing').html('');
		}		
				
		this.renderPagination = function(pager) 
		{
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
				.find("li > a").unbind("click").click(function() { var e = jQuery(this); self.changePage(e.hasClass('prev') ? pager.currentPage - 1 : e.hasClass('next') ? pager.currentPage + 1 : Number(e.text())); return false; }
			);

            jQuery('div.paging > div.showing').html(pager.totalItemCount > 0
				? String.format(templates.resultsFootText, pager.start, Math.min((pager.start + pager.limit - 1), pager.totalItemCount), pager.totalItemCount)
				: templates.resultsFootTextNoResult
			);
        };	
        
        this.renderErrors = function(errors)
        {
			jQuery('#report_errors').html(errors).show();
        }
        
        this.changePage = function(page) 
        {
            if (page == self.page)
                return false;
                
            self.page = page;
            self.currentFunction();
            return false;
        };
        
         this.changeSort = function(new_sort) 
         {
			if (options.sort_column == new_sort)
			{
				if (options.sort_direction == 'DESC')
					options.sort_direction = 'ASC';
				else
					options.sort_direction = 'DESC';
			}
			else
			{
				options.sort_column = new_sort;
				options.sort_direction = 'DESC';
			}
			
			
			self.RunCurrentReportWithOptions();
        };
        
        this.RunCurrentReportWithOptions = function() 
		{
			if (typeof self.currentFunction == "string" || self.currentFunction == "")
				return;
		
			var new_report = jQuery("input[@name='report_type']:checked").val();
			if (new_report.length > 0)
			{
				var dates = self.getDateOptions();
				if (new_report == 'total_usage_summary') 
					document.location.href = '/lyndaCampus/reports/TotalUsageSummary.aspx?' + dates;
				else if (new_report == 'member_usage_summary') 
					document.location.href = '/lyndaCampus/reports/MemberUsage.aspx?' + dates;
				else if (new_report == 'course_ranking_summary') 
					document.location.href = '/lyndaCampus/reports/CourseRankingSummary.aspx?' + dates;
				else if (new_report == 'member_list') 
					document.location.href = '/lyndaCampus/reports/MemberList.aspx?' + dates;
				else if (new_report == 'ip_movie_history') 
					document.location.href = '/lyndaCampus/reports/IPMovieHistory.aspx?' + dates;
			}
			
			options.start_date = options.end_date = options.defined_date = '';
			
			if (jQuery('#date_range_variable').is(':checked'))
			{
				options.start_date = jQuery('#date_range_start').val();
				options.end_date = jQuery('#date_range_end').val();
			}
			else if (jQuery('#date_range_this_year').is(':checked'))
			{
				options.defined_date = 'this_year';
			}
			else if (jQuery('#date_range_last_year').is(':checked'))
			{
				options.defined_date = 'last_year';
			}
			else if (jQuery('#date_range_last_week').is(':checked'))
			{
				options.defined_date = 'last_week';
			}
			else if (jQuery('#date_range_last_month').is(':checked'))
			{
				options.defined_date = 'last_month';
			}
			
			
			options.results_per_page = jQuery('#results_per_page').val();
			
			self.clearResults();
			
			self.currentFunction();
		};
		
		/* for handling total/average rows on the client-side sort report */
		var total_row_stash = '';
		var average_row_stash = '';
		
		this.TableSortStartHook = function()
		{
			total_row_stash = jQuery('#total-row').clone().wrapAll('<div/>').parent().html();
			average_row_stash = jQuery('#average-row').clone().wrapAll('<div/>').parent().html();

			jQuery('#total-row').remove();
			jQuery('#average-row').remove();	
			jQuery('#total_usage_summary_table').trigger('update');	
			//after removing a row, we have to blow out the tablesorter's internal row cache
		}
		
		this.TableSortEndHook = function()
		{
			jQuery('#total_usage_summary_table').append(total_row_stash).append(average_row_stash);
		}
	};
})(lynda, lynda.page, jQuery);