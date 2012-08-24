<!DOCTYPE html>
<html lang="en">
<head>
	<?php
	function download_link($template_id, $template_name, $template_type){
		return '<a href="/build/index.php/welcome/generate/'.$template_id.'/'.$template_name.'/'.$template_type.'">download '.$template_name.'.'.$template_type.'</a>';
	}
	?>
	<meta charset="utf-8">
	<title>Welcome to Build</title>
	<link rel="stylesheet" type="text/css" href="/build/css/build.css">
</head>
<body>
<h1>Template Builder</h1>
<form method="post" name="filter" action="/build/index.php/welcome/filter">
<?php
	$html = '';
	foreach ($query_types->result() as $row_types)
	{
		$html .= '<select name="templates_'.$row_types->templates_type_type.'">';
			$html .= '<option value="none" '.(($_REQUEST['templates_'.$row_types->templates_type_type] == "none") ? 'selected="selected"' : '').'>---dont show '.$row_types->templates_type_type.'---</option>';
			foreach ($query->result() as $row)
			{
				if($row_types->templates_type_id == $row->template_type){
					if($_REQUEST['templates_'.$row_types->templates_type_type] == $row->template_id){
						$html .= '<option value="'.$row->template_id.'" selected="selected">'.$row->template_name.'</option>';
					}else{
						$html .= '<option value="'.$row->template_id.'">'.$row->template_name.'</option>';
					}
				}
			}
			$html .= '<option value="all" '.(($_REQUEST['templates_'.$row_types->templates_type_type] == "all") ? 'selected="selected"' : '').'>---all '.$row_types->templates_type_type.'---</option>';		
		$html .= '</select>';
	}
	echo $html; 
?>
<input type="submit" name="submit" value="filter" />
</form>
<?php
	$content_html = '';
	foreach ($query_types->result() as $row_types)
	{
		if(isset($_REQUEST['templates_'.$row_types->templates_type_type])){
			$template = $_REQUEST['templates_'.$row_types->templates_type_type];
			foreach ($query->result() as $row)
			{				
				if($template == $row->template_id && $template != 'all' && $template != 'none' || $template == 'all' && $row_types->templates_type_type == $row->templates_type_type && $template != 'none'){
					$content_html .= '<h3>'.$row->template_name.' - '.download_link($row->template_id,$row->template_name,$row->templates_type_ext).' - <a href="javascript: void(0);" class="copy">copy</a></h3>';
					$content_html .= '<code><pre>';
				    $content_html .=  htmlentities($row->template_content);
					$content_html .= '</pre></code><p>&nbsp;</p>';
				}
			}
		}
	}
	echo $content_html; 
?>
<p class="footer">Page rendered in <strong>{elapsed_time}</strong> seconds</p>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script type="text/javascript" src="/build/js/jquery.zclip.min.js"></script>
<script type="text/javascript">
//<![CDATA[
    $(document).ready(function(){
    	$('.copy').each(function(){
    		$(this).zclip({
		    	path:'/build/js/ZeroClipboard.swf',
		    	copy: $(this).parent().next().first().text()
		    });
    	});
    });
//]]>
</script>
</body>
</html>