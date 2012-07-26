lynda.dynamic_content=function(container){
	//Retrieve and save template
	if(!$(container).data('template')){
		$(container).data('template', $(container).html());
	}
	var template = $(container).data('template');

	//Set indeterminate progress indicator
	var progressIndicator = document.createElement('span');
	$(progressIndicator).addClass('indeterminateProgressIndicatorWithText');
	$(progressIndicator).html("&nbsp;")
	$(container).html(progressIndicator);

	//Make request
	$.ajax({
		url:$(container).data('contenturl'),
		type:"GET",
		success:function(results){
			window.console.log("Success…: " + $(container).data('contenturl'));
			var items = $.parseJSON(results);

			$(container).html('');
	
			if(items instanceof Array){
				for(var i=0; i<items.length; i++){
					var itemTemplate = contentFromItemWithTemplate(items[i], template);
					$(container).append(itemTemplate);
				}
			}
			else{
				var itemTemplate = contentFromItemWithTemplate(items, template);
				$(container).append(itemTemplate);
			}
		}
	});

	function contentFromItemWithTemplate(item, template){
		var itemTemplate = $(template).clone();
		itemTemplate = $(document.createElement('div')).html(itemTemplate);
		$(itemTemplate).find('*').each(function(){
			if($(this).data('bind')){
				var boundElement = $(this);
				var bindings = $(this).data('bind').split(',');
				$(bindings).each(function(){
					var kv = this.split(':');
					var key = kv[0];
					var value = kv[1];
					if(/^text$/i.test(key)){
						$(boundElement).text($(item).attr(value));
					}
					else if(/^html$/i.test(key)){
						$(boundElement).html($(item).attr(value));
					}
					else{
						$(boundElement).attr(key, $(item).attr(value));
					}
				})
			}
		});
		return itemTemplate.html();
	}

	$(container).bind('updateContentUrl', function(e, contentUrl){
		$(this).data('contenturl', contentUrl);
		lynda.dynamic_content($(this));
		return true;
	});
}