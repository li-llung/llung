			<div class="clear">&nbsp;</div>
		</div>
	</div>
	<div id="footer">
		<div id="inner_footer">
			<p>Copyright &copy; 1995-2011 lynda.com, Inc. All rights reserved.</p>
		</div>
	</div>
	<div class="sub" id="sub_subscriber">
		<ul>
			<li><a href="<?php echo site_url(); ?>/subscriber/build">Build</a></li>
			<li><a href="<?php echo site_url(); ?>/subscriber/upsell">Build with Upsell</a></li>
			<li><a href="<?php echo site_url(); ?>/subscriber/sample">Sample</a></li>
		</ul>
	</div>
	<div class="sub" id="sub_reseller">
		<ul>
			<li><a href="<?php echo site_url(); ?>/reseller">Build</a></li>
			<li><a href="<?php echo site_url(); ?>/reseller/sample">Sample</a></li>
		</ul>
	</div>
	<div class="sub" id="sub_monthly">
		<ul>
			<li><a href="<?php echo site_url(); ?>/monthly">Build</a></li>
			<li><a href="<?php echo site_url(); ?>/monthly/upsell">Build with Upsell</a></li>
			<li><a href="<?php echo site_url(); ?>/monthly/custom">Content Cleaner</a></li>
			<li><a href="<?php echo site_url(); ?>/monthly/sample">Sample</a></li>
		</ul>
	</div>
	<div class="sub" id="sub_sales">
		<ul>
			<li><a href="<?php echo site_url(); ?>/sales">Build</a></li>
		</ul>
	</div>
	<div class="sub" id="sub_course_trailers">
		<ul>
			<li><a href="<?php echo site_url(); ?>/trailers/for_generator">for generator</a></li>
			<li><a href="<?php echo site_url(); ?>/trailers/titles">titles</a></li>
			<li><a href="<?php echo site_url(); ?>/trailers/titles_comma">titles (comma seperated)</a></li>
			<li><a href="<?php echo site_url(); ?>/trailers/links">list</a></li>
		</ul>
	</div>
</div>
<!--<script type="text/javascript" src="http://code.jquery.com/jquery-1.6.4.min.js"></script>
<link type="text/css" href="<?php echo base_url(); ?>ui/css/ui-lightness/jquery-ui-1.8.16.custom.css" rel="stylesheet" />-->	
<script type="text/javascript" src="<?php echo base_url(); ?>ui/scripts/jquery/jquery-1.6.2.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>ui/scripts/jquery/jquery-ui-1.8.16.custom.min.js"></script>
<script type="text/javascript">
function remove_story(which){
	$("#" + which).remove();
	var count;
	//$("#" + which + "_content").remove();
	$('.story').each(function(index) {
		count = index + 1;
	    $(this).attr('id','story_'+ count);
	    $(this).find("h2").html('--Story ' + count + '--<a href="javascript: void(0);" onclick="remove_story(\'story_'+count+'\')">remove</a>');
	    $(this).find(".story_content").attr('name', 'story_text_' + count);
	    $(this).find(".story_text").attr('name', 'course_ids_' + count);
	});
	if($("#story_count").val()==1){
		$("#story_count").val(0);
	}else{
		$("#story_count").val(count);
	}
	$("#add_story").val(0);
}
function activate(panel){
	$("#email_holder").accordion('activate', panel);

}
function validate(){
/*is_archive
sender_text
newsletter_month
newsletter_day
newsletter_year
intro_text
letter_intro
letter_image
letter_signiture
story_text_1
course_ids_1
story_text_2
course_ids_2
add_story
story_count
new_releases
podcasts
coming_soon
testimonial_1
testimonial_2
tweet_1
tweet_2
tip_caption
tip_text
tip_link
tip_image
social
copyright
address
manage
tracking_letter
tracking_default
tracking_tip
*/
	var error_count = 1;
	var valid_errors = false;
	var errors ='<h3>Some fields were left blank</h3><p>click on the links to open the sections.</p><ul id="errors">';	
	$("h2").each(function(index_main,item) {
		error_count = 0;
		valid_errors = false;
		$(item).find('.errors').remove();
		$(item).next().each(function(index_sub,sub_item) {
			$(sub_item).find(":input").each(function(index, input_item) {
				if($(input_item).val()==""){
					var error_field = $(input_item).attr("name");
					//$(item).addClass("required");
					error_field.split("_"," ");
					errors += '<li><a href="#nogo" onclick="activate('+index_main+')">'+ error_field + ' was left blank.</a></li>';
					$(input_item).addClass("required_box");
					error_count += 1;
					valid_errors = true;
				}else{
					$(item).removeClass("required");
					$(input_item).removeClass("required_box");
				}
			});
			error_name = (error_count==1) ? "missing field" : "missing fields";
			if(valid_errors==true){
				$('&nbsp;&nbsp;&nbsp;<span class="required errors">&nbsp;&nbsp;&nbsp;'+error_count+' '+error_name+'.</span>').appendTo(item);
			}
		});	
	});	
	/*var all_inputs = $(":input");
	all_inputs.each(function() {
		if($(this).val()==""){
			errors += '<li>'+ $(this).attr("name") + ' this field is blank.</li>';
			$(this).addClass("required_box");
		}else{
			$(this).removeClass("required_box");
		}
	});
	*/
	errors += '</ul>';
	$("#error_message").show();
	$("#error_message").html(errors);
	if(error_count==0){
		$("#error_message").hide();
		return true;
	}else{
		return false;	
	}
	
}
$(document).ready(function() {
	$(":input").each(function(){
		$(this).click(function() {		
			$(this).addClass("active");
		});
		$(this).blur(function() {	
			$(this).removeClass("active");	
			if($(this).val()==""){
				$(this).addClass("required_box");				
			}else{
				$(this).removeClass("required_box");
			}
		});
	});
	$("#email_holder").accordion({
		active: 0,
		header: "h2", 
		autoHeight: false,
		change: function(event, ui) {
			ui.oldHeader.removeClass("anchor");
			ui.newHeader.addClass("anchor");
		}
	});
	$('.main-links a').each(function(index,elem) {
		var sub_id = $(this).attr("id");
		$(this).mouseenter(function() {		
			$('.sub').each(function() {
			   $(this).hide();
			});
			$("#sub_" + sub_id).show();
			$("#sub_" + sub_id).css('left',$(this).offset().left);
		});
		$("#sub_" + sub_id).mouseleave(function() {	
			$("#sub_" + sub_id).hide();
		});
		$("#container").mouseleave(function() {	
			$("#sub_" + sub_id).hide();
		});
	});
	$('.pod_help a').each(function() {
		$(this).fadeTo('fast','0.65');
		$(this).mouseenter(function() {
	   		$(this).fadeTo('fast','1.00');	
	   	});
		$(this).mouseleave(function() {	
	   		if($(this).parent().css('right')=='0px'){
				$(this).fadeTo('fast','1.00');	
	   		}else{
				$(this).fadeTo('fast','0.65');		   		
	   		}
	   	});
		$(this).click(function() {
	   		if($(this).parent().css('right')=='0px'){
	   			//$(this).parent().css('right', '-350px');
				$(this).parent().animate({ 
					right: '-550px'
				}, 500 );
				$(this).fadeTo('fast','0.65');	
	   		}else{
	   			//$(this).parent().css('right', '0px');	
				$(this).parent().animate({ 
					right: '0'
				}, 500 );
				$(this).fadeTo('fast','1.00');		   		
	   		}
	   	});
	});/*pod_help_text*/
	$("#stories").change(function(){
		//alert($(this).val());
		if($(this).val()=="story_1_image"){
			$("#story_content").html('<tr><td colspan="2"><h2>--Single Image Story--</h2></td></tr><tr><td><h3>Text:</h3><textarea name="story_text"></textarea></td><td><h3>Image:</h3><input type="text" name="story_image" /></td></tr>');
		}else if($(this).val()=="story_2_image"){
			$("#story_content").html('<tr><td colspan="2"><h2>--Two Image Story--</h2></td></tr><tr><td><h3>Text:</h3><textarea name="story_text"></textarea></td><td><h3>Image:</h3><input type="text" name="story_image" /></td></tr><tr><td><h3>Text:</h3><textarea name="story_text"></textarea></td><td><h3>Image:</h3><input type="text" name="story_image" /></td></tr>');
		}else if($(this).val()=="story_3_image"){			
			$("#story_content").html('<tr><td colspan="2"><h2>--Three Image Story--</h2></td></tr><tr><td><h3>Text:</h3><textarea name="story_text"></textarea></td><td><h3>Image:</h3><input type="text" name="story_image" /></td></tr><tr><td><h3>Text:</h3><textarea name="story_text"></textarea></td><td><h3>Image:</h3><input type="text" name="story_image" /></td></tr><tr><td><h3>Text:</h3><textarea name="story_text"></textarea></td><td><h3>Image:</h3><input type="text" name="story_image" /></td></tr>');
		}else if($(this).val()=="story_custom"){
			$("#story_content").html('<tr><td colspan="2"><h2>--Advanced - Custom HTML--</h2></td></tr><tr><td><h3>Custom HTML:</h3><textarea name="story_custom"></textarea></td></tr>');
		}
		$("#story_content tr:even").css("background-color", "#cccccc");
	});
	$("#add_story").change(function(){
		if($("#story_count").val() > 0){
			how_many = (Number($(this).val()) + Number($("#story_count").val()));	
			for(i=(Number($("#story_count").val())+1);i<=how_many;i++){	
				$("#story_content").append('<tr id="story_'+i+'" class="story"><td><table cellpadding="0" cellspacing="0" border="0"><tr><td colspan="2"><h2>--Story '+i+'--<a href="javascript: void(0);" onclick="remove_story(\'story_'+i+'\')">remove</a></h2></td></tr><tr><td><h3>Title</h3><p><input type="text" name="course_name_'+ i +'" value="" class="story_content" /></p><h3>Course IDs:</h3><p>comma separated</p><input type="text" name="course_ids_'+ i +'" value="" class="story_content" /><p></td><td><h3>Text:</h3><textarea name="story_text_'+ i +'" class="story_text"></textarea></td></tr></table></td></tr>');
				$("#story_count").val(i);
			}
		}else{
			how_many = $(this).val();	
			for(i=1;i<=how_many;i++){	
				$("#story_content").append('<tr id="story_'+i+'" class="story"><td><table cellpadding="0" cellspacing="0" border="0"><tr><td colspan="2"><h2>--Story '+i+'--<a href="javascript: void(0);" onclick="remove_story(\'story_'+i+'\')">remove</a></h2></td></tr><tr><td><h3>Title</h3><p><input type="text" name="course_name_'+ i +'" value="" class="story_content" /></p><h3>Course IDs:</h3><p>comma separated</p><input type="text" name="course_ids_'+ i +'" value="" class="story_content" /></td><td><h3>Text:</h3><textarea name="story_text_'+ i +'" class="story_text"></textarea></td></tr></table></td></tr>');
				$("#story_count").val(i);
			}
		}		
	});
	/*
	story_1_image
	story_2_image
	story_3_image
	story_custom
	<div id="story_content" class="hide">
		Text: <textarea name="story_text"></textarea>
		Image: <input type="text" name="story_image" />
	</div>
	<div id="story_custom" class="hide">
		Custom HTML: <textarea name="story_custom"></textarea>
	</div>
	*/
});
</script>
</body>
</html>