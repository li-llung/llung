(function(lp,jQuery)
{
	lp.blogEntries=function(Options)
	{
		var self=this;
		var options=jQuery.extend({ categoryID: 0,page: 1,perPage: 10,pageCount: 2 },Options);

		var entries=function()
		{
			var data=repository.findBlogEntries(options.categoryID,options.page,options.itemsPerPage);
			if(data)
			{
				if(data.pager)
					options.pageCount=data.pager.pageCount;
				if(data.entries&&data.entries.length>0)
					return data.entries;
			}
			return [];
		};
		this.next=function(element)
		{
			var e=jQuery(element);
			if(options.page<options.pageCount)
			{
				options.page++;
				var items=entries();

				var html='';
				for(var a=0,cnt=items.length;a<cnt;a++)
					html+='<div style="display:none" class="entry pg'+options.page+'">'+items[a].html+'</div><br/><br/>';
				var sibling=e.prev().prev();
				sibling.after(html);

				e.parent().find('div.entry.pg'+options.page).slideDown();
			}
			if(options.page>=options.pageCount)
				e.hide();
			return false;
		};
	};
})(lynda.page,jQuery);
