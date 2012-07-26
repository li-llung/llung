<!DOCTYPE html PUBLIC "-/ldc-sa-20091210.html" title="ldc-sa-20091210/W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
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
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>New Releases: <?php echo $page_title; ?></title>
	<style type="text/css">
	a{color: inherit;}
	h3 a, li a {text-decoration: underline;}
	a:hover{
	text-decoration:underline !important;
	color:#000 !important;
	}
	</style>
</head>
<body>
<custom name="opencounter" type="tracking">
<!-- RegionStart[ socialslot:"SharePasteHTML", title:"subscriber announcement", description:"new training releases from lynda.com"., csskey:""] -->
<div style="width: 600px; margin: 8px auto;">
	<table width="595" cellpadding="0" cellspacing="0" border="0">
		<tr>
			<td style="text-align: center;font-size:11px;padding:0px 0px 8px 0px; font-family: Verdana, Arial, sans-serif;" valign="top">
			<p>
			If you are having trouble viewing this email, <a style="color: #000 !important; text-decoration: underline !important;" href="%%view_email_url%%" alias="view online">view it online</a>.<br>
			To ensure our emails reach your inbox, please add <a style="color: #000 !important; text-decoration: underline !important;" href="mailto:news@lynda.com">news@lynda.com</a> to your address book.
			</p>
			</td>
		</tr>
		<tr>
			<td><a href="http://www.lynda.com/?utm_source=LDCemail&utm_medium=email&utm_campaign=ReleaseAnnouncements"><img style="border: 0;" src="http://files2.lynda.com/files/lol_email/sa/email_header_latest_releases.gif" width="595" height="81" alt="new releases from lynda.com"></a></td>
		</tr>
		<tr>
			<td style="background-color:#e8e8e8; padding:10px 8px 10px 8px" valign="top" width="100%">
				<a style="color: #000 !important; text-decoration: underline !important;" href="%%ftaf_url%%" alias="send to a friend"><img src="http://files2.lynda.com/files/lol_email/sa/share.gif" alt="Send to a Friend" border="0" align="right" style="float: right; margin: 10px;"></a>
				<h1 style="color:#000000;font-size:12px;font-family: Verdana, Arial, sans-serif;margin: 10px 10px 10px 7px; font-weight:normal;">
				Greetings from the Online Training Library&reg; at <a style="color: #000000 !important;text-decoration: none !important;">lynda.com</a>!<br>
				We are pleased to announce:
				</h1><!-- start rounded box -->
				<table width="579" cellpadding="0" cellspacing="0" border="0">
					<tr style="background-color:#FFFFFF;">
						<td style="background-image:url(http://files2.lynda.com/files/lol_email/sa/tlc-nr.gif);background-repeat:no-repeat;font-size:0px;width:8px;">&nbsp;</td>
						<td style="background-image:url(http://files2.lynda.com/files/lol_email/sa/top.gif);background-repeat:repeat-x;padding:5px 0px 5px 0px;">&nbsp;</td>
						<td style="background-image:url(http://files2.lynda.com/files/lol_email/sa/trc-nr.gif);background-repeat:no-repeat;background-position:top right;font-size:0px;width:8px;">&nbsp;</td>
					</tr>
					<tr>
						<td style="background-image:url(http://files2.lynda.com/files/lol_email/sa/ls.gif);background-repeat:repeat-y;background-color:#FFFFFF;font-size:0px;">&nbsp;
						
						</td>
						<td valign="top" style="background-color:#FFFFFF;font-size:12px;font-family:Verdana, Arial, Helvetica, sans-serif !important;padding:0 12px;color: #000 !important;">
							<div style="height: 40px;line-height: 40px;">&nbsp;</div>
							<!-- begin releases table -->
								<?php if ($upsell == "yes"){?>
								<!--Start Upsell-->			
									<div style="float: none;clear: both;border-bottom: 1px solid #CCCCCC;border-top: 1px solid #CCCCCC; padding: 0px 5px 5px 14px;background-color: #f1f1f1;margin-top: 30px;">
										<h1 style="margin: 10px 0px 12px 0px;font-size:15px;color:#7C2001;font-family:'Trebuchet MS', Verdana, Arial, sans-serif !important;"><a id="letter"></a>Join <a style="color: #7C2001;text-decoration: none;">lynda.com</a> today</h1>
										<p>Stay up to date with access to the Online Training Library&reg;!</p>
										<p>We are constantly adding new software training courses and inspirational documentaries to help reach your creative and career goals.</p>
										<p style="text-align: right;"><a href="http://www.lynda.com/products/?utm_source=LDCemail&utm_medium=email&utm_content=SA20110315&utm_campaign=ReleaseAnnouncements"><img src="http://files2.lynda.com/files/lol_email/sales/global/btn_learnmore_85x23_G-transparentonW.gif" border="0" alt="" /></a></p>
									</div>
								<!--End Upsell-->	
								<?php } ?>
								<?php
									foreach ($arrFeeds as $item){		
										$desc = $item['description'];	
										$link = $item['link'];	
										$findme_author   = "<p>Released On:";
										
										
										$author = strstrb($desc,$findme_author);
										
										$author_short = '';    // returns "ef"
										$author_url = substr($author, 13);
										//$author_text = explode("'>", $author_url);
										$content = get_string_between($desc,"</p>","<br/><a href='");
										$image = strtolower(get_string_between($desc,"<img src='","'></a>"));
										$course_id = get_string_between($link,"http://www.lynda.com/home/DisplayCourseNoTabs.aspx","lpk67=true");
										$new_coarse_id  = substr($link, 56);
										//$final_coarse_id  = substr($new_coarse_id, 0, -11);		
										
										$regexp = "/\/([0-9]+)/";
										//echo $link ."<br />";
										if (preg_match($regexp, $link, $matches)) {
										//	print_r($matches);
										    $final_coarse_id = $matches[1];
										  //  echo "YAY ".$matches."<br />";
										} else {
										    //echo "NAY ".$matches." <br />";
										}
										
										$mystring = $author_url;
										$findme   = '</a>, ';
										$pos = strpos($mystring, $findme);
										
										if ($pos === false) {
											$author_text = explode("'>", $author_url);	 
											$author_link = explode("href='/", $author_text[0]);	 
											$final_author_id = $author_link[0] .' href="http://www.lynda.com/'. $author_link[1];
											$final_author_name = $author_text[1];
											
										} else {
											$author_text_explode = explode(", ", $author_url);	
											$author_text_1 = explode("'>", $author_text_explode[0]);
											$author_text_2 = explode("'>", $author_text_explode[1]);
											
											$author_link_1 = explode("href='/", $author_text_1[0]);	 
											$author_link_2 = explode("href='/", $author_text_2[0]);	 
											
											$final_author_1_id = $author_link_1[0] .' href="http://www.lynda.com/'. $author_link_1[1];
											$final_author_1_name = $author_text_1[1];
											
											$final_author_2_id = $author_link_2[0] .' href="http://www.lynda.com/'. $author_link_2[1];
											$final_author_2_name = $author_text_2[1];
										}											
										$link = str_replace("DisplayCourseNoTabs", "DisplayCourse", $item['link']);
											echo "\t\t\t\t\t\t\t\t<!--begin item -->\r\n";
											echo "\t\t\t\t\t\t\t\t". '<div style="float: none;clear: both;">'. "\r\n";
											echo "\t\t\t\t\t\t\t\t\t". '<table cellpadding="0" cellspacing="0" border="0">'. "\r\n";
													echo "\t\t\t\t\t\t\t\t\t\t<tr>\r\n";
														echo "\t\t\t\t\t\t\t\t\t\t\t". '<td style="vertical-align: top;">'. "\r\n";														
														if($new_images == "yes"){
															$final_image = explode('.jpg',$image);
															echo "\t\t\t\t\t\t\t\t\t\t\t\t".'<a href="http://files2.lynda.com/files/lol_email/trailers/trailer'.$final_coarse_id.'.html?utm_source=LDCemail&utm_medium=email&utm_campaign=ReleaseAnnouncements_'.$tracking_date.'-mem" alias="'.$item['title'].' (TH)"><img src="'.$final_image[0].'.jpg" style="border: 1px solid #585858;padding: 0; margin: 0 0px 12px 0;" width="138" height="91"></a>'."\r\n";
														}else{
															echo "\t\t\t\t\t\t\t\t\t\t\t\t".'<a href="http://files2.lynda.com/files/lol_email/trailers/trailer'.$final_coarse_id.'.html?utm_source=LDCemail&utm_medium=email&utm_campaign=ReleaseAnnouncements_'.$tracking_date.'-mem" alias="'.$item['title'].' (TH)"><img src="'.$image.'" border="0" style="border:0; float: left; padding: 0; margin: 0 0px 12px 0;" width="138" height="91"></a>'."\r\n";
														}			
														echo "\t\t\t\t\t\t\t\t\t\t\t". '</td>'. "\r\n";
														echo "\t\t\t\t\t\t\t\t\t\t\t". '<td style="width: 12px;">&nbsp;</td>'. "\r\n";
														echo "\t\t\t\t\t\t\t\t\t\t\t". '<td style="vertical-align: top;">'. "\r\n";																			
																echo "\t\t\t\t\t\t\t\t\t\t\t\t". '<h2 style="margin: 0px 0 0 0;padding: 0px;color:#7C2100 !important;font-size: 13px;font-family:Trebuchet MS, Verdana, Arial, sans-serif !important;"><a href="'.$link.'?utm_source=LDCemail&utm_medium=email&utm_campaign=ReleaseAnnouncements_'.$tracking_date.'-mem" alias="'.$item['title'].' (H2)" style="color: #7C2100 !important;">'.$item['title'].'</a></h2>' ."\r\n";
																if ($pos === false) {
																	echo "\t\t\t\t\t\t\t\t\t\t\t\t". "<h3 style=\"margin: 0px;padding: 0px;color:#000 !important;font-size: 13px;font-family:Trebuchet MS, Verdana, Arial, sans-serif !important;\">with: ".$final_author_id."?utm_source=LDCemail&utm_medium=email&utm_campaign=ReleaseAnnouncements_".$tracking_date."-mem\" style=\"color: #000000 !important;\">".$author_text[1]."</h3>" ."\r\n";
																} else {																								
																	echo "\t\t\t\t\t\t\t\t\t\t\t\t". "<h3 style=\"margin: 0px;padding: 0px;color:#000 !important;font-size: 13px;font-family:Trebuchet MS, Verdana, Arial, sans-serif !important;\">with: ".$final_author_1_id."?utm_source=LDCemail&utm_medium=email&utm_campaign=ReleaseAnnouncements_".$tracking_date."-mem\" style=\"color: #000000 !important;\">".$final_author_1_name.", ".$final_author_2_id."?utm_source=LDCemail&utm_medium=email&utm_campaign=ReleaseAnnouncements_".$tracking_date."-mem\" style=\"color: #000000; !important\">".$final_author_2_name."</h3>" ."\r\n";
																}		
																echo "\t\t\t\t\t\t\t\t\t\t\t\t". '<div style="height: 20px;">&nbsp;</div>';
																echo "\t\t\t\t\t\t\t\t\t\t\t\t". '<a href="http://files2.lynda.com/files/lol_email/trailers/trailer'.$final_coarse_id.'.html?utm_source=LDCemail&utm_medium=email&utm_campaign=ReleaseAnnouncements_'.$tracking_date.'-mem" alias="'.$item['title'].' (WN)"><img src="http://files2.lynda.com/files/lol_email/sa/watchtrailer.gif" alt="Watch trailer!" hspace="5" vspace="2" border="0" style="display: block; margin: 0px 0 0 0; padding: 0; border: 0;" /></a>'."\r\n";
														echo "\t\t\t\t\t\t\t\t\t\t\t". '</td>'. "\r\n";
													echo "\t\t\t\t\t\t\t\t\t\t". '</tr>'. "\r\n";
												echo "\t\t\t\t\t\t\t\t\t". '</table>'. "\r\n";
											echo "\t\t\t\t\t\t\t\t\t". htmlspecialchars_decode($content) ."\r\n";
											echo "\t\t\t\t\t\t\t\t\t<p>duration: </p>\r\n";
											echo "\t\t\t\t\t\t\t\t</div>\r\n";
											echo "\t\t\t\t\t\t\t\t". '<div style="height: 40px;line-height: 40px;">&nbsp;</div>'. "\r\n";
										echo "\t\t\t\t\t\t\t\t<!--end item -->\r\n";
									}
								?>
							<p style="margin: 40px 0 40px 0; padding: 0; color: #7C2100; text-decoration: none; text-align: center;">
							<a href="http://twitter.com/lyndadotcom" alias="Twitter-img"><img src="http://files2.lynda.com/files/lol_email/sa/twitter-16x16.jpg" border="0" width="16" height="16" style="border: 0; display: inline; margin: 0 3px 0 0; padding: 0; text-decoration: none; vertical-align: middle;" alt="" /></a>
							<a href="http://twitter.com/lyndadotcom" alias="Twitter-txt" style="color: #000000 !important;text-decoration: underline !important;">Follow us on Twitter</a>
							<a href="http://www.facebook.com/lyndadotcom" alias="Facebook-img"><img style="border: 0; display: inline; margin: 0 3px 0 10px; padding: 0; text-decoration: none; vertical-align: middle;" src="http://files2.lynda.com/files/lol_email/sa/facebook-16x16.jpg" border="0"  width="16" height="16" alt="Facebook" /></a>
							<a style="color: #000000 !important;text-decoration: underline !important;" href="http://www.facebook.com/lyndadotcom" alias="Facebook-txt" class="links">Like us on Facebook</a>
							<a href="%%=GetSocialPublishURL('10','SharePasteHTML')=%%" alias="ShareThis-img"><img style="border: 0; display: inline; margin: 0 3px 0 10px; padding: 0; text-decoration: none; vertical-align: middle;" src="http://files2.lynda.com/files/lol_email/sa/sharethis-16x16.png" alt="ShareThis"   border="0" width="16" height="16" /></a>
							<a href="%%=GetSocialPublishURL('10','SharePasteHTML')=%%" alias="ShareThis-txt" style="color: #000000 !important;text-decoration: underline !important;">Share via ShareThis</a>
							</p>
						</td>
						<td style="background-image:url(http://files2.lynda.com/files/lol_email/sa/rs.gif);background-repeat:repeat-y;background-position:right;background-color:#FFFFFF;font-size:0px;">&nbsp;
						
						</td>
					</tr>
					<tr>
						<td style="background-image:url(http://files2.lynda.com/files/lol_email/sa/blc.gif);background-repeat:no-repeat;background-position:bottom left;font-size:0px;">&nbsp;</td>
						<td style="background-image:url(http://files2.lynda.com/files/lol_email/sa/bot.gif);background-repeat:repeat-x;background-position:bottom;">&nbsp;</td>
						<td style="background-image:url(http://files2.lynda.com/files/lol_email/sa/brc.gif);background-repeat:no-repeat;background-position:bottom right;font-size:0px;">&nbsp;</td>
					</tr>
					<tr>
						<td colspan="3" align="center" valign="middle" style="font-size:11px; font-family:'Trebuchet MS', Verdana, Arial, sans-serif; padding:8px 8px 0px 8px;">
						<p>Copyright &copy; 1995&#45;<?php echo date("Y"); ?> <a style="color: #000 !important;text-decoration: none !important;">lynda.com</a>, Inc. All rights reserved.</p>
						</td>
					</tr>
				</table><!-- end content table -->
			</td>
		</tr>
		<tr>
			<td align="center" valign="middle" style="width: 595px; height: 51px; background-image:url(http://files2.lynda.com/files/lol_email/sa/footer-nr.gif);background-repeat:no-repeat;background-position:top left;font-size:11px;font-family:'Trebuchet MS', Verdana, Arial, sans-serif !important;padding:4px 8px;color: #000000 !important;">
			<p>
			This email was sent by: <b>%%Member_Busname%%</b><br>
			%%Member_Addr%% %%Member_City%%, %%Member_State%%, %%Member_PostalCode%%, %%Member_Country%%
			</p>
			</td>
		</tr>
		<tr>
			<td style="text-align: center;font-size:11px; padding:6px; font-family: Verdana, Arial, sans-serif !important;" valign="top">
			<p>
			This email was intended for <a style="color: #444 !important;" href="mailto:%%emailaddr%%">%%emailaddr%%</a>.<br>
			<a style="color: #444 !important;" href="%%profile_center_url%%" alias="profile center">Manage your subscriptions or unsubscribe.</a>
			</p>
			</td>
		</tr>
	</table>
</div>
<!-- RegionEnd[ socialslot:"SharePasteHTML"] -->
</body>
</html>