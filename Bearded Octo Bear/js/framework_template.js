lynda.video=function (container,options)
{
	if(options)
	{
		
	}	
};
$(document).ready(function ()
{
	$(".lynda-video").each(function ()
	{
		lynda.video(this,{ hideControlbar: true });
	});
});