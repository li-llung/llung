<?php if ($type=="generator"){ ?>
<?php echo form_open('/trailers/build'); ?>
<table cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td><h3>Course Trailer Generator</h3></td>
	</tr>
	<tr>
		<td>Format: title/video ID/course ID - use @@ is used as the delimeter.<br /><br />
			Course Name 1/Video ID 1/Course ID 1@@Course Name 2/Video ID 2/Course ID 2<br /><br />
		</td>
	</tr>
	<tr>
		<td><textarea name="trailer_id" class="large_inputs" cols="100" rows="40"></textarea></td>
	</tr>
	<tr>
		<td class="tright"><?php echo form_submit('submit', 'Build'); ?></td>
	</tr>
</table>
</form>
<?php } ?>
<?php
	$doc = new DOMDocument();
	$doc->load('http://www.lynda.com/news/NewReleasesRSSFeed.aspx');
	$arrFeeds = array();
	foreach ($doc->getElementsByTagName('item') as $node) {
		$itemRSS = array ( 				
			'title' => $node->getElementsByTagName('title')->item(0)->nodeValue,
			'description' => $node->getElementsByTagName('description')->item(0)->nodeValue,
			'link' => $node->getElementsByTagName('link')->item(0)->nodeValue,
			'PubDate' => $node->getElementsByTagName('PubDate')->item(0)->nodeValue,
			'ReleaseDate' => $node->getElementsByTagName('ReleaseDate')->item(0)->nodeValue
			);
		array_push($arrFeeds, $itemRSS);
	}
	function strstrb($h,$n){
	    return array_shift(explode($n,$h,2));
	}
	function get_string_between($string, $start, $end){
		$string = "". $string;
		$ini = strpos($string,$start);
		if ($ini == 0) return "";
		$ini += strlen($start);
		$len = strpos($string, $end, $ini) - $ini;
		return substr($string, $ini, $len);
	}
	$page_title = '';
	//print_r($arrFeeds);
	foreach ($arrFeeds as $item){	
		//echo $item;
		//echo $item['title'];
		$page_title .= $item['title'] . ',';
	}
?>
<?php if ($type=="for_generator"){ ?>
<h1>List for trailer builder</h1>
<?php
foreach ($arrFeeds as $item){		
	//echo print_r($item) .'<br />';

	$desc = $item['description'];	
	$link = $item['link'];	
	$findme_author   = "<p>Released On:";
	
	
	$author = strstrb($desc,$findme_author);
	
	$author_short = '';    // returns "ef"
	$author_url = substr($author, 13);
	$author_text = explode("'>", $author_url);
	
	$content = get_string_between($desc,"</p>","<br/><a href='");
	$video_id = get_string_between($desc,"<br/><a href='http://www.lynda.com/home/Player.aspx?lpk4=","'><img src='"); 
	
	$final_link = substr($link, -7); 
	
	$image = strtolower(get_string_between($desc,"<img src='","'></a>"));
	
	//$regexp = "/([0-9]+)-[0-9].html/";
	$regexp = "/\/([0-9]+)/";
	//$regexp_1 = "/[1*]/";
	//echo $link ."<br />";
	$final_coarse_id = '';
	if (preg_match($regexp, $link, $matches)) {
		//if (preg_match($regexp_1, $matches[0])) {
		//	echo 'starts with a 1 = ';
		//} else {
		//	echo 'doesnt start with a 1 = ';
		//}
	    $final_coarse_id = $matches[1];
	} 	
	
	//$course_id = get_string_between($link,"http://www.lynda.com/home/DisplayCourseNoTabs.aspx","lpk67=true");
	//$new_coarse_id  = substr($link, 56);
	//$final_coarse_id  = substr($new_coarse_id, 0, -11);			
	echo $item['title']."/".$video_id."/".$final_coarse_id."@@";
}
?>
<?php }else if ($type=="titles"){ ?>
<h1>Just Titles</h1>
<?php
foreach ($arrFeeds as $item){		
	$desc = $item['description'];	
	$link = $item['link'];	
	$findme_author   = "<p>Released On:";
	
	
	$author = strstrb($desc,$findme_author);
	
	$author_short = '';    // returns "ef"
	$author_url = substr($author, 13);
	$author_text = explode("'>", $author_url);
	
	$content = get_string_between($desc,"</p>","<br/><a href='");
	$image = strtolower(get_string_between($desc,"<img src='","'></a>"));
	$course_id = get_string_between($link,"http://www.lynda.com/home/DisplayCourseNoTabs.aspx","lpk67=true");
	$new_coarse_id  = substr($link, 56);
	$final_coarse_id  = substr($new_coarse_id, 0, -11);			
		echo $item['title']."<br />";
}
?>
<?php }else if ($type=="titles_comma"){ ?>
<h1>Just Titles (comma seperated)</h1>
<?php
foreach ($arrFeeds as $item){		
	$desc = $item['description'];	
	$link = $item['link'];	
	$findme_author   = "<p>Released On:";
	
	
	$author = strstrb($desc,$findme_author);
	
	$author_short = '';    // returns "ef"
	$author_url = substr($author, 13);
	$author_text = explode("'>", $author_url);
	
	$content = get_string_between($desc,"</p>","<br/><a href='");
	$image = strtolower(get_string_between($desc,"<img src='","'></a>"));
	$course_id = get_string_between($link,"http://www.lynda.com/home/DisplayCourseNoTabs.aspx","lpk67=true");
	$new_coarse_id  = substr($link, 56);
	$final_coarse_id  = substr($new_coarse_id, 0, -11);			
		echo $item['title'].", ";
}
?>
<?php }else if ($type=="links"){ ?>
<h1>List</h1>
<table cellpadding="0" cellspacing="10" border="0" style="width: 800px;">
<?php
foreach ($arrFeeds as $item){		
	$desc = $item['description'];	
	$link = $item['link'];	
	$findme_author   = "<p>Released On:";
	
	
	$author = strstrb($desc,$findme_author);
	
	$author_short = '';    // returns "ef"
	$author_url = substr($author, 13);	
	$mystring = $author_url;
	$findme   = '</a>, ';
	$pos = strpos($mystring, $findme);
	
	if ($pos === false) {
		$author_text = explode("'>", $author_url);	 
		$final_author_id = $author_text[0];   
		$final_author_name = $author_text[1];
	} else {
		$author_text_explode = explode(", ", $author_url);	
		$author_text_1 = explode("'>", $author_text_explode[0]);
		$author_text_2 = explode("'>", $author_text_explode[1]);
		$final_author_id = $author_text_1[0] .", ". $author_text_2[0];
		$final_author_name = $author_text_1[1] .", ". $author_text_2[1];
	}	
	
	$content = get_string_between($desc,"</p>","<br/><a href='");
	$image = strtolower(get_string_between($desc,"<img src='","'></a>"));
	$course_id = get_string_between($link,"http://www.lynda.com/home/DisplayCourseNoTabs.aspx","lpk67=true");
	$new_coarse_id  = substr($link, 56);
	$final_coarse_id  = substr($new_coarse_id, 0, -11);			
		
	echo '<tr>';
		echo '<td nowrap="nowrap">'. $item['title'] .'</td>';
		echo '<td nowrap="nowrap">'. $final_coarse_id .'</td>';
		echo '<td nowrap="nowrap"><a href="'. $image .'">image</a></td>';
		echo '<td nowrap="nowrap"><a href="'. $item['link'] .'">link</a></td>';
		echo '<td nowrap="nowrap">'. $final_author_name .'</td>';
	echo '</tr>';
}
?>
</table>
<?php } ?>