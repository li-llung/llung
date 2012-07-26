
	<script src="http://code.jquery.com/jquery-1.5.1.min.js" type="text/javascript"></script>
	<script type="text/javascript">
		function saveHTML(id){
			$("#result").html('Saving...<br />');
			var data = {
				file: id,
				content: $("#" + id).val(),
				save_what: 'trailers'
			}
			$.ajax({
			   type: "POST",
			   url: "/build/save.php",
			   data: data,
			   success: function(msg){
			     $("#result").html(msg);
			   }
			});
		}
		function saveALLHTML(){
			$('textarea.large_textarea').each(function() {
			    var id = $(this).attr('id');
				$("#result").html('Saving ' + id + '<br />');
				var data = {
					file: id,
					content: $("#" + id).val(),
					save_what: 'trailers'
				}
				$.ajax({
				   type: "POST",
				   url: "/build/save.php",
				   data: data,
				   success: function(msg){
				     $("#result").append(msg);
				   }
				});			
			});
		}
	</script>
<?php echo form_open('email_builder/build'); ?>
<div id="result"></div>
<p><input type="button" value="Save All" onclick="saveALLHTML()" /></p>
<div id="email_holder">
	<div id="email_list">
		<h1>Building</h1>
		<?php echo $trailers_all; ?>
	</div>
</div>
</form>