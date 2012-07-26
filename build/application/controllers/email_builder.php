<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Email_builder extends CI_Controller {
	public function index()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		//$all_months = array('jan','feb','mar','apr','may','june','july','aug','sep','oct','nov','dec');
		$all_months =  array('jan' => 'January','feb' => 'February','mar' => 'March','apr' => 'April','may' => 'May','june' => 'June','july' => 'July','aug' => 'August','sep' => 'September','oct' => 'October','nov' => 'November','dec' => 'December');
		$all_years = array('2010','2011','2012','2013','2014','2015');
		$all_days = array('1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31');
		$current_month = '<option value="--">--Select--</option>';
		foreach ($all_months as $month){
			$current_month .=  '<option value="'.$month.'">'.$month.'</option>';
		}
		$current_year = '<option value="--">--Select--</option>';
		foreach ($all_years as $year){
			$current_year .=  '<option value="'.$year.'">'.$year.'</option>';
		}
		$current_day = '<option value="--">--Select--</option>';
		foreach ($all_days as $day){
			$current_day .=  '<option value="'.$day.'">'.$day.'</option>';
		}
	
		$data['css'] = '<link href="/build/ui/css/email_builder.css" rel="stylesheet" type="text/css">';
		$data['months'] = $current_month;
		$data['years'] = $current_year;
		$data['days'] = $current_day;	
		$this->load->view('header');
		$this->load->view('email_builder', $data);
		$this->load->view('footer');
	}
	public function build()
	{	
		$this->load->helper('url');	
		$this->load->helper('form');
		$pieces = explode("@@", $_REQUEST['trailer_id']);
		//echo $pieces[0]; // piece1
		//echo $pieces[1]; // piece2
		//print_r($pieces);
		$all_trailers = '';
		$partsArray = array();
		
		foreach ($pieces as $trailer_set){
			$part = explode("/", $trailer_set);
			array_push($partsArray, $part);
		}
		foreach ($partsArray as $trailer){
			//echo $trailer[0] .'<br />';
			//echo $trailer[1] .'<br />';
			//echo $trailer[2] .'<br /><br />';			
			$clean_name = stripslashes($trailer[0]);
			$all_trailers .= '<h3>Trailer Name: '. $clean_name .' <input type="button" value="save" onclick="saveHTML(\''. $trailer[2].'\')" /></h3>';
			$all_trailers .= '<textarea class="large_textarea" id="'. $trailer[2].'">'."\n";
			$all_trailers .= '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"'."\n";
			$all_trailers .= "\t".'"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'."\n";
			$all_trailers .= ''."\n";
			$all_trailers .= '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">'."\n";
			$all_trailers .= '<head>'."\n";
			$all_trailers .= '<title>'. $clean_name .'</title>'."\n";
			$all_trailers .= "\t".'<script type="text/javascript">'."\n";
			$all_trailers .= "\t\t".'var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");'."\n";
			$all_trailers .= "\t\t".'document.write(unescape("%3Cscript src=\'" + gaJsHost + "google-analytics.com/ga.js\' type=\'text/javascript\'%3E%3C/script%3E"));'."\n";
			$all_trailers .= "\t".'</script>'."\n";
			$all_trailers .= "\t".'<script type="text/javascript">'."\n";
			$all_trailers .= "\t\t".'try {'."\n";
			$all_trailers .= "\t\t".'var pageTracker = _gat._getTracker("UA-512865-1");'."\n";
			$all_trailers .= "\t\t".'pageTracker._setDomainName("lynda.com");'."\n";
			$all_trailers .= "\t\t".'pageTracker._trackPageview();'."\n";
			$all_trailers .= "\t\t".'} catch(err) {}'."\n";
			$all_trailers .= "\t\t".'if(navigator.userAgent.indexOf("Mozilla/") != -1 && navigator.userAgent.indexOf("iPad;") != -1)'."\n";
			$all_trailers .= "\t\t".'document.location = "http://www.lynda.com/home/Player.aspx?lpk4='. $trailer[1].'&lpk2='. $trailer[2].'";'."\n";
			$all_trailers .= "\t".'</script>'."\n";
			$all_trailers .= "\t".'<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>'."\n";
			$all_trailers .= '</head>'."\n";
			$all_trailers .= ''."\n";
			$all_trailers .= '<body style="width: 960px; margin: 20px auto; padding: 0; background-color: #d5d5d5;">'."\n";
			$all_trailers .= '<iframe src ="http://www.lynda.com/home/Player.aspx?lpk4='. $trailer[1].'&lpk2='. $trailer[2].'" width="960" height="556" frameborder="0">'."\n";
			$all_trailers .= "\t".'<p>Your browser does not appear to support iframes. Please <a href="http://www.lynda.com/home/Player.aspx?lpk4='. $trailer[1].'&lpk2='. $trailer[2].'">click here</a> to view the video.</p>'."\n";
			$all_trailers .= '</iframe>'."\n";
			$all_trailers .= '<div style="width: 960px; background-color: #d5d5d5; border: 0; margin: 12px 0 0 0; padding: 0; text-align: right;">'."\n";
			$all_trailers .= "\t".'<img style="border: 0; padding: 0; margin: 0 10px 0;" src="readytolearn.gif" />'."\n";
			$all_trailers .= "\t".'<a href="https://www.lynda.com/home/registration/RegistrationStep1.aspx">'."\n";
			$all_trailers .= "\t".'<img style="border: 0; padding: 0; margin: 0 10px 0;" src="subscribe.gif" alt="subscribe" />'."\n";
			$all_trailers .= "\t".'</a>'."\n";
			$all_trailers .= "\t".'<a href="http://www.lynda.com/home/DisplayCourse.aspx?lpk2='. $trailer[2].'">'."\n";
			$all_trailers .= "\t".'<img style="border: 0; padding: 0; margin: 0 10px 0;" src="watchthiscourse.gif" alt="watch this course" />'."\n";
			$all_trailers .= "\t".'</a>'."\n";
			$all_trailers .= "\t".'<a href="http://www.lynda.com/home/ViewCourses.aspx">'."\n";
			$all_trailers .= "\t".'<img style="border: 0; padding: 0; margin: 0 10px 0;" src="viewall.gif" alt="view all courses" />'."\n";
			$all_trailers .= "\t".'</a>'."\n";
			$all_trailers .= '</body>'."\n";
			$all_trailers .= '</html>'."\n";
			$all_trailers .= '</textarea>';			
		}
		$data['trailers_all'] = $all_trailers;
		$data['trailer_id'] = $_REQUEST['trailer_id'];
		$data['css'] = '<link href="/build/ui/css/legacy.css" rel="stylesheet" type="text/css">';
		$this->load->view('build', $data);	
	}
	public function build_newsletter()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		$all_months =  array('jan' => 'January','feb' => 'February','mar' => 'March','apr' => 'April','may' => 'May','june' => 'June','july' => 'July','aug' => 'August','sep' => 'September','oct' => 'October','nov' => 'November','dec' => 'December');
		$all_years = array('2010','2011','2012','2013','2014','2015','2016');
		$all_days = array('1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31');
		$current_month = '<option value="--">--Select--</option>';
		foreach ($all_months as $month => $full_month){
			$current_month .=  '<option value="'.$month.'">'.$full_month.'</option>';
		}
		$current_year = '<option value="--">--Select--</option>';
		foreach ($all_years as $year){
			$current_year .=  '<option value="'.$year.'">'.$year.'</option>';
		}
		$current_day = '<option value="--">--Select--</option>';
		foreach ($all_days as $day){
			$current_day .=  '<option value="'.$day.'">'.$day.'</option>';
		}
	
		$data['css'] = '<link href="/css/email_builder.css" rel="stylesheet" type="text/css">';
		$data['months'] = $current_month;
		$data['years'] = $current_year;
		$data['days'] = $current_day;
		$data['css'] = '<link href="/build/ui/css/legacy.css" rel="stylesheet" type="text/css">';
		$this->load->view('build_newsletter', $data);	
	}
	public function rss()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		$data['css'] = '<link href="/build/ui/css/legacy.css" rel="stylesheet" type="text/css">';
		$this->load->view('rss', $data);	
	}
	public function subscriber()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		$data['upsell'] = 'no';
		$data['tracking_date'] = date('Ymd');
		$data['new_images'] = $this->uri->segment(3, 0);
		$this->load->view('subscriber', $data);	
	}
	public function subscriber_upsell()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		$data['upsell'] = 'yes';
		$data['tracking_date'] = date('Ymd');
		$data['new_images'] = $this->uri->segment(3, 0);
		$this->load->view('subscriber', $data);	
	}
	public function reseller()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		$this->load->helper('url');	
		$this->load->helper('form');
		$master_reseller = array('title','price','store_link','author','desc','isbn','upc','sku','duration','media','cc','3/4','75px','145px','185px','230px','hi-res','flat','400px');
		
			
		$master_array = array();
		$master_count = '';
		$sub_count = '';
		$all_releases = '';
		
		if(isset($_REQUEST['annoucements'])){
			$resellers = $_REQUEST['annoucements'];
			$pieces = explode("%r%", $resellers);
	
			foreach ($pieces as $piece){
				$sub_array = array();
				$parts = explode("%s%", $piece);
				foreach($parts as $part){
					array_push($sub_array, $part);
				}
					
				$new_piece = array_combine($master_reseller,$sub_array);
				$master_count = count($master_reseller);
				$master_sub = count($sub_array);
	
				array_push($master_array, $new_piece);
			}
			
			foreach ($master_array as $release){
				$all_releases .= "\t\t\t\t\t\t\t\t\t".'<!-- begin item -->'."\n";
				$all_releases .= "\t\t\t\t\t\t\t\t".'<tr>'."\n";
					$all_releases .= "\t\t\t\t\t\t\t\t\t".'<td valign="top" width="200" style="padding: 0 0 0 12px; margin: 0; font-size:12px;font-family:Verdana, Arial, Helvetica, sans-serif;">'."\n";
						$all_releases .= "\t\t\t\t\t\t\t\t\t\t".'<a href="'.$release['store_link'].'" alias="'.$release['title'].'"><img src="'.$release['185px'].'" border="0" alt="cover illustration"></a>'."\n";
						$all_releases .= "\t\t\t\t\t\t\t\t\t\t".'<p style="padding: 0 10px 0 11px;">'.$release['title'].'<br>'."\n";
							$all_releases .= "\t\t\t\t\t\t\t\t\t\t".''.$release['duration'].'<br>'."\n";
							$all_releases .= "\t\t\t\t\t\t\t\t\t\t".''.$release['media'].'<br>'."\n";
							$all_releases .= "\t\t\t\t\t\t\t\t\t\t".$release['cc'].'<br>'."\n";
							$all_releases .= "\t\t\t\t\t\t\t\t\t\t".'$'.$release['price']."\n";
						$all_releases .= "\t\t\t\t\t\t\t\t\t\t".'</p>'."\n";
					$all_releases .= "\t\t\t\t\t\t\t\t\t".'</td>'."\n";
					$all_releases .= "\t\t\t\t\t\t\t\t\t".'<td valign="top" style="background-color:#FFFFFF;font-size:12px;font-family:Verdana, Arial, Helvetica, sans-serif;padding:0 10px 20px 7px; margin:0; color:#666666;" width="360">'."\n";
						$all_releases .= "\t\t\t\t\t\t\t\t\t\t".'<h2 style="margin:0; padding:0; color:#7C2100;font-size:13px;font-family:Trebuchet MS, Verdana, Arial, sans-serif;">'.$release['title'].'</h2>'."\n";	
						$all_releases .= "\t\t\t\t\t\t\t\t\t\t".'<h3 style="margin:0px;padding:0px;color:#7C2100;font-size:13px;font-family:Trebuchet MS, Verdana, Arial, sans-serif;">with: '.$release['author'].'</h3>'."\n";				
						$all_releases .= "\t\t\t\t\t\t\t\t\t\t".'<p>'.stripslashes($release['desc']).'</p>'."\n";
						$all_releases .= "\t\t\t\t\t\t\t\t\t\t".'<p>'.$release['isbn'].'<br>'."\n";
							$all_releases .= "\t\t\t\t\t\t\t\t\t\t".$release['sku'].'<br>'."\n";
						$all_releases .= "\t\t\t\t\t\t\t\t\t\t".$release['upc'].'<br>'."\n";
						$all_releases .= "\t\t\t\t\t\t\t\t\t\t".'</p>'."\n";
						$all_releases .= "\t\t\t\t\t\t\t\t\t\t".'<p>3/4 Turn Graphics:<br>'."\n";
							$all_releases .= "\t\t\t\t\t\t\t\t\t\t\t".'<a style="color: #000; text-decoration: underline;" href="'.$release['75px'].'">75px</a>,'."\n";
							$all_releases .= "\t\t\t\t\t\t\t\t\t\t\t".'<a style="color: #000; text-decoration: underline;" href="'.$release['185px'].'">185px</a>,'."\n";
							$all_releases .= "\t\t\t\t\t\t\t\t\t\t\t".'<a style="color: #000; text-decoration: underline;" href="'.$release['230px'].'">230px</a>,'."\n";
							$all_releases .= "\t\t\t\t\t\t\t\t\t\t\t".'<a style="color: #000; text-decoration: underline;" href="'.$release['hi-res'].'">Hi Res</a>.</p>'."\n";
						$all_releases .= "\t\t\t\t\t\t\t\t\t\t".'<p>Flat Graphics:<br>'."\n";
							$all_releases .= "\t\t\t\t\t\t\t\t\t\t\t".'<a style="color: #000; text-decoration: underline;" href="'.$release['400px'].'">400px</a>.</p>'."\n";
					$all_releases .= "\t\t\t\t\t\t\t\t\t".'</td>'."\n";
				$all_releases .= "\t\t\t\t\t\t\t\t".'</tr>'."\n";
				$all_releases .= "\t\t\t\t\t\t\t\t".'<!-- end item -->'."\n";
			}
		}
		
		$spelled_out = array('zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifeteen','sixteen','seventeen','eighteen','nineteen','twenty','twentyone','twentytwo','twentythree','twentyfour','twentyfive','twentysix','twentyseven','twentyeight','twentynine','thirty');
		
		$count = count($master_array);
		$data['release_number'] = $spelled_out[$count];
		$data['releases'] = $all_releases;
		$data['css'] = '<link href="/css/legacy.css" rel="stylesheet" type="text/css">';
		$data['tracking_date'] = date('mdy');
		$this->load->view('reseller', $data);	
	}
	public function build_trailer_list()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		$data['tracking_date'] = date('mdy');
		$this->load->view('build_trailer_list', $data);	
	}
	public function enterprise()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		$data['tracking_date'] = date('mdy');
		$this->load->view('enterprise', $data);	
	}
	public function academic()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		$data['tracking_date'] = date('mdy');
		$this->load->view('academic', $data);	
	}
	/**
	  * Remove unwanted MS Word high characters from a string
	  *
	  * @param string $string
	  * @return string $string
	  */
	private function _sanitizeString($string = null)
	{
		if(is_null($string)) return false;
		
		//-> Replace all of those weird MS Word quotes and other high characters
	     $badwordchars=array(
	         "\xe2\x80\x98", // left single quote
	         "\xe2\x80\x99", // right single quote
	         "\xe2\x80\x9c", // left double quote
	         "\xe2\x80\x9d", // right double quote
	         "\xe2\x80\x94", // em dash
	         "\xe2\x80\xa6", // elipses
	         "'", // single quote
	         "Õ",  // curly quote
	         "Â®", //reg trademark
	     );
	     $fixedwordchars=array(
	         "&lsquo;",
	         "&rsquo;",
	         '&ldquo;',
	         '&rdquo;',
	         '&mdash;',
	         '...',
	         '&rsquo;',
	         '&rsquo;',
	         '&reg;'
	     );
	     return str_replace($badwordchars,$fixedwordchars, $string);
	}
	private function _cleaner($letter){
		$letter = str_replace("lynda.com", '<a style="color: #000000;text-decoration: none;">lynda.com</a>', $letter);
		//-> Replace all of those weird MS Word quotes and other high characters
	     $badwordchars=array(
	         "\xe2\x80\x98", // left single quote
	         "\xe2\x80\x99", // right single quote
	         "\xe2\x80\x9c", // left double quote
	         "\xe2\x80\x9d", // right double quote
	         "\xe2\x80\x94", // em dash
	         "\xe2\x80\xa6", // elipses
	         "'", // single quote
	         "Õ",  // curly quote
	         "Â®", //reg trademark
	     );
	     $fixedwordchars=array(
	         "&lsquo;",
	         "&rsquo;",
	         '&ldquo;',
	         '&rdquo;',
	         '&mdash;',
	         '...',
	         '&rsquo;',
	         '&rsquo;',
	         '&reg;'
	     );
	    $letter = str_replace($badwordchars,$fixedwordchars, $letter);
		//stripslashes(htmlspecialchars());
		
		//$letter = str_replace("Õ", '&rsquo;', $letter);
		
		//$letter = htmlspecialchars($letter);
		
		//$letter = str_replace("â??", '&ldquo;', $letter);
		//$letter = str_replace("â?", '&rdquo;', $letter);
		//$letter = str_replace("â??", '&mdash;', $letter);
		//$letter = str_replace("Â®", '&reg;', $letter);
		//$letter = str_replace("&", '&amp;', $letter);
		//$letter = str_replace("'", '&rsquo;', $letter);
		//$letter .= str_replace("", '', $letter);
		
		//$letter = $this->_sanitizeString($letter);
		
		return stripslashes($letter);
	}
	public function clean_letter($letter){
		$letter = str_replace("lynda.com", '<a style="color: #000000;text-decoration: none;">lynda.com</a>', $letter);
		//stripslashes(htmlspecialchars());
		
		//$letter = str_replace("â??", '&ldquo;', $letter);
		//$letter = str_replace("â?", '&rdquo;', $letter);
		//$letter = str_replace("â??", '&mdash;', $letter);
		//$letter = str_replace("Â®", '&reg;', $letter);
		//$letter = str_replace("&", '&amp;', $letter);
		//$letter = str_replace("'", '&rsquo;', $letter);
		//$letter .= str_replace("", '', $letter);
		
		$letter = $this->sanitizeString($letter);
		
		return stripslashes($letter);
	}
	public function newsletter()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		$this->load->library('typography');	
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
generate*/
		$date = date('Ymd');
		$data['date']= date('Ymd');
		
		$data['is_archive']= $_REQUEST['is_archive'];
		$data['sender_text']= $_REQUEST['sender_text'];
		$data['newsletter_month']= $_REQUEST['newsletter_month'];
		$data['newsletter_day']= $_REQUEST['newsletter_day'];
		$data['newsletter_year']= $_REQUEST['newsletter_year'];
		//$data['intro_text']= $_REQUEST['intro_text'];
		$intro_text = $this->_cleaner($_REQUEST['intro_text']);
		$data['intro_text'] = $this->typography->auto_typography($intro_text)."\n";
		//$data['letter_intro']= $_REQUEST['letter_intro'];
		$letter_intro = $this->_cleaner($_REQUEST['letter_intro']);
		$data['letter_intro'] = $this->typography->auto_typography($letter_intro)."\n";
		$data['letter_image']= $_REQUEST['letter_image'];
		$data['letter_signiture']= $_REQUEST['letter_signiture'];
		$data['story_text_1']= $_REQUEST['story_text_1'];
		$data['course_ids_1']= $_REQUEST['course_ids_1'];
		$data['course_ids_1']= $_REQUEST['course_name_1'];
		$data['story_text_2']= $_REQUEST['story_text_2'];
		$data['course_ids_2']= $_REQUEST['course_ids_2'];
		$data['course_ids_2']= $_REQUEST['course_name_2'];
		$data['add_story']= $_REQUEST['add_story'];
		$data['story_count']= $_REQUEST['story_count'];
		$data['new_releases']= $_REQUEST['new_releases'];
		$data['podcasts']= $_REQUEST['podcasts'];
		$data['coming_soon']= $_REQUEST['coming_soon'];		
		$data['testimonial_header'] = ($_REQUEST['testimonial_2']=="") ? "" : "s";
		$data['tweet_header'] = ($_REQUEST['tweet_2']=="") ? "" : "s";					
		$data['testimonials']= ($_REQUEST['testimonial_1']!="") ? "yes" : "no";
		$data['tweets']= ($_REQUEST['tweet_1']!="") ? "yes" : "no";		
		$testimonial_1 = $this->_cleaner($_REQUEST['testimonial_1']);
		$data['testimonial_1'] = $this->typography->auto_typography($testimonial_1)."\n";
		$testimonial_2 = $this->_cleaner($_REQUEST['testimonial_2']);
		$data['testimonial_2'] = $this->typography->auto_typography($testimonial_2)."\n";
		$tweet_1 = $this->_cleaner($_REQUEST['tweet_1']);
		$data['tweet_1'] = $this->typography->auto_typography($tweet_1)."\n";
		$tweet_2 = $this->_cleaner($_REQUEST['tweet_2']);
		$data['tweet_2'] = $this->typography->auto_typography($tweet_2)."\n";
		//$data['testimonial_1']= $_REQUEST['testimonial_1'];
		//$data['testimonial_2']= $_REQUEST['testimonial_2'];
		//$data['tweet_1']= $_REQUEST['tweet_1'];
		//$data['tweet_2']= $_REQUEST['tweet_2'];
		$data['tip_caption']= $_REQUEST['tip_caption'];
		//$data['tip_text']= $_REQUEST['tip_text'];		
		$tip_text = $this->_cleaner($_REQUEST['tip_text']);
		$data['tip_text'] = $this->typography->auto_typography($tip_text)."\n";
		$data['tip_link']= $_REQUEST['tip_link'];
		$data['tip_image']= $_REQUEST['tip_image'];
		$data['tip_course']= $_REQUEST['tip_course'];
		$data['social']= $_REQUEST['social'];
		$data['copyright']= $_REQUEST['copyright'];
		$data['address']= $_REQUEST['address'];
		$data['manage']= $_REQUEST['manage'];
		if($_REQUEST['is_archive']=="yes"){		
			$data['tracking_letter']= '';
			$data['tracking_default']= '';
			$data['tracking_tip']= '';
			$tracking_letter = '';
		}else{		
			$data['tracking_letter']= $_REQUEST['tracking_letter'];
			$data['tracking_default']= $_REQUEST['tracking_default'];
			$data['tracking_tip']= $_REQUEST['tracking_tip'];			
			$tracking_letter = $_REQUEST['tracking_letter'];
		}		
		$stories_list = '';
		for ($i = 1; $i <= $_REQUEST['story_count']; $i++) {
		    //echo $i;
			$stories_list .= "\t\t\t\t".'<h1 style="font-size:14px;color:#7C2001;font-family:\'Trebuchet MS\', Verdana, Arial, sans-serif;">'.$_REQUEST['course_name_'.$i].'</h1>'."\n";
			$stories_list .= "\t\t\t\t".'<table cellpadding="0" cellspacing="0" border="0">'."\n";
				$stories_list .= "\t\t\t\t\t".'<tr>'."\n";
					$stories_list .= "\t\t\t\t\t\t".'<td valign="top" style="line-height: 1.5em;font-size: 12px;font-family: Verdana;">'."\n";
						$stories = explode(",", $_REQUEST['course_ids_'.$i]);
						foreach ($stories as $story){
							$stories_list .= "\t\t\t\t\t\t\t".'<a href="http://files2.lynda.com/files/lol_email/trailers/trailer'.$story.'.html'.$tracking_letter.'" alias="'.$_REQUEST['course_name_'.$i].'"><img src="http://files2.lynda.com/files/images/courses/'.$story.'_trailer-r.jpg" border="0" alt="" width="138" height="91" style="border: 1px solid #585858;margin: 5px 12px 0 0;" align="left" hspace="10" vspace="10" /></a>'."\n";	
						}			 
						$story_text = $this->_cleaner($_REQUEST['story_text_'.$i]);
						$stories_list .= "\t\t\t\t\t\t\t". $this->typography->auto_typography($story_text)."\n";
						//$stories_list .= $_REQUEST['story_text_'.$i];
					$stories_list .= "\t\t\t\t\t\t".'</td>'."\n";
				$stories_list .= "\t\t\t\t\t".'</tr>'."\n";
			$stories_list .= "\t\t\t\t".'</table>'."\n";
			$stories_list .= "\t\t\t\t".'<p>&nbsp;</p><!--Spacer-->'."\n";
		}	
		$data['stories'] = $stories_list;
		
		$final_training_coming_soon_list = ''; 
		$temp_training_coming_soon = $_REQUEST['coming_soon'];
		$pieces = explode("@", $temp_training_coming_soon);
		foreach ($pieces as $piece){
			$final_training_coming_soon_list .= '<li>'. $piece .'</li>';
		}	
		
		$final_new_releases_list = ''; 
		$temp_new_releases = explode("@@@", $_REQUEST['new_releases']);
		
		$total_count = 1;
		foreach ($temp_new_releases as $total_releases_set)
		{
			$total_mystring = $total_releases_set;
			$total_findme = '@';
			$total_pos = strpos($total_mystring, $total_findme);
			$total_set = explode("@@", $total_releases_set);			
			if($total_pos === false)
			{
			}
			else
			{
				foreach($total_set as $total_release)
				{
					$total_count++;
				}
			}
		}
		
		$count = 1;		
		$continue_count = true;
		foreach ($temp_new_releases as $releases_set){
			$mystring = $releases_set;
			$findme   = '@';
			$pos = strpos($mystring, $findme);
			$set = explode("@@", $releases_set);
			
			if ($pos === false) {
				$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t".'<tr>'."\n";
					$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t\t".'<td colspan="2">'."\n";
						$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t\t\t".'<h2 style="margin:8px 0 0 0;font-size:14px;line-height:12px;color:#7C2001;font-family:Trebuchet MS, Verdana, Arial, sans-serif;">'. $releases_set .'</h2>'."\n";
					$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t\t".'</td>'."\n";
				$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t".'</tr>'."\n";
			}else{			
				foreach ($set as $release){	
					$part = explode("@", $release);			
					$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t".'<tr>'."\n";
						if($_REQUEST['is_archive']=="yes"){
							$link_1 = '';
						}else{
							$link_1 = '?utm_source=LDCemail&utm_medium=email&utm_content=NL'.$date.'_OTL'.$part[1].'_prod_box&utm_campaign=Newsletters';
						}
						$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t\t".'<td valign="top" width="138" height="106"><a href="http://files2.lynda.com/files/lol_email/trailers/trailer'.$part[1].'.html'.$link_1.'" alias="'.$part[0].'"><img style="margin:10px 0px 5px 0px;border: 1px solid #585858;" src="http://files2.lynda.com/files/images/courses/'.$part[1].'_trailer-r.jpg" border="0" alt="" width="138" height="91" /></a></p></a>'."\n";
						$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t\t".'</td>'."\n";
						$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t\t".'<td valign="top" width="132" height="106">'."\n";
							if($_REQUEST['is_archive']=="yes"){
								$link_2 = '';
							}else{
								$link_2 = '&utm_source=LDCemail&utm_medium=email&utm_content=NL'.$date.'_OTL'.$part[1].'_prod_text&utm_campaign=Newsletters';
							}
							$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t\t\t".'<p style="margin: 10px 0 10px 10px;"><a style="color: #000; text-decoration: underline;" href="http://www.lynda.com/home/DisplayCourse.aspx?lpk2='.$part[1].''.$link_2.'" alias="'.$part[0].'" class="links">'.$part[0].'</a><br />'."\n";
								$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t\t\t".''.$part[2].'<br />'."\n";
								$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t\t\t".''.$part[3].'<br />'."\n";
								//$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t\t\t".'<span style="font-size:10px;color:#999999;">'.$part[4].'</span>'."\n";
							$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t\t\t".'</p>'."\n";
						$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t\t".'</td>'."\n";
					$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t".'</tr>'."\n";					
					
					if($count >= ($total_count/2) && $continue_count == true)
					{	
							$final_new_releases_list .= '</table>';
						$final_new_releases_list .= '</td>';
						$final_new_releases_list .= '<td valign="top" style="padding:0 0 0 10px;">';
							$final_new_releases_list .= '<table style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: 12px;" border="0" cellpadding="0" cellspacing="0" width="270">';
							$continue_count = false;
					}
					$count++;
				}
			}	

		}			
		$data['new_releases'] = $final_new_releases_list;			
		$data['training_coming_soon'] = $final_training_coming_soon_list;
		
		$all_months =  array('jan' => 'January','feb' => 'February','mar' => 'March','apr' => 'April','may' => 'May','june' => 'June','july' => 'July','aug' => 'August','sep' => 'September','oct' => 'October','nov' => 'November','dec' => 'December');
		$data['full_month'] = $all_months[$_REQUEST['newsletter_month']];
		/*
		$data['tracking_date'] = date('mdy');
		$data['newsletter_month']= $_REQUEST['newsletter_month'];
		$data['newsletter_year']= $_REQUEST['newsletter_year'];
		$data['upsell']= $_REQUEST['upsell'];
		$data['podcasts']= $_REQUEST['podcasts'];
		$data['month']= $_REQUEST['newsletter_month'];
		$data['css'] = '<link href="/css/legacy.css" rel="stylesheet" type="text/css">';
		$date = date('Ymd');
		$data['date']= date('Ymd');
		$data['tracking_code'] = '?utm_source=LDCemail&utm_medium=email&utm_content=NL'.$date.'_header&utm_campaign=Newsletters';
		
		$final_training_coming_soon_list = ''; 
		$temp_training_coming_soon = $_REQUEST['training_coming_soon'];
		$pieces = explode("@", $temp_training_coming_soon);
		foreach ($pieces as $piece){
			$final_training_coming_soon_list .= '<li>'. $piece .'</li>';
		}	
		
		$final_new_releases_list = ''; 
		$temp_new_releases = explode("@@@", $_REQUEST['new_releases']);
				
		
		foreach ($temp_new_releases as $releases_set){
			$mystring = $releases_set;
			$findme   = '@';
			$pos = strpos($mystring, $findme);
			$set = explode("@@", $releases_set);
			
			if ($pos === false) {
				$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t".'<tr>'."\n";
					$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t\t".'<td colspan="2">'."\n";
						$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t\t\t".'<h2 style="margin:8px 0 0 0;font-size:14px;line-height:12px;color:#7C2001;font-family:Trebuchet MS, Verdana, Arial, sans-serif;">'. $releases_set .'</h2>'."\n";
					$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t\t".'</td>'."\n";
				$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t".'</tr>'."\n";
			}else{			
				foreach ($set as $release){	
					$part = explode("@", $release);			
					$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t".'<tr>'."\n";
						$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t\t".'<td valign="top" width="138" height="106"><a href="http://files2.lynda.com/files/lol_email/trailers/trailer'.$part[1].'.html?utm_source=LDCemail&utm_medium=email&utm_content=NL'.$date.'_OTL'.$part[1].'_prod_box&utm_campaign=Newsletters" alias="'.$part[0].'"><img style="margin:10px 0px 5px 0px;" src="http://files2.lynda.com/files/images/courses/'.$part[1].'_trailer.jpg" border="0" alt=""/></a>'."\n";
						$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t\t".'</td>'."\n";
						$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t\t".'<td valign="top" width="132" height="106">'."\n";
							$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t\t\t".'<p style="margin: 10px 0 10px 10px;"><a style="color: #000; text-decoration: underline;" href="http://www.lynda.com/home/DisplayCourse.aspx?lpk2='.$part[1].'&utm_source=LDCemail&utm_medium=email&utm_content=NL'.$date.'_OTL'.$part[1].'_prod_text&utm_campaign=Newsletters" alias="'.$part[0].'" class="links">'.$part[0].'</a><br />'."\n";
								$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t\t\t".''.$part[2].'<br />'."\n";
								$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t\t\t".''.$part[3].'<br />'."\n";
								$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t\t\t".'<span style="font-size:10px;color:#999999;">'.$part[4].'</span>'."\n";
							$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t\t\t".'</p>'."\n";
						$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t\t".'</td>'."\n";
					$final_new_releases_list .= "\t\t\t\t\t\t\t\t\t".'</tr>'."\n";
				}
			}	

		}	
		$data['letter'] = $this->clean_letter($_REQUEST['letter']);
		
		$data['letter_image'] = $_REQUEST['letter_image'];
		$data['new_releases'] = $final_new_releases_list;			
		$data['training_coming_soon'] = $final_training_coming_soon_list;
		$data['testimonial_count'] = ($_REQUEST['testimonials_of_the_month_2']=="") ? "" : "s";
		$data['testimonail_1'] = $_REQUEST['testimonials_of_the_month'];
		$data['testimonail_2'] = $_REQUEST['testimonials_of_the_month_2'];
		$data['tip_of_the_month'] = $_REQUEST['tip_of_the_month_text'];		
				
		$all_months =  array('jan' => 'January','feb' => 'February','mar' => 'March','apr' => 'April','may' => 'May','june' => 'June','july' => 'July','aug' => 'August','sep' => 'September','oct' => 'October','nov' => 'November','dec' => 'December');
		$data['full_month'] = $all_months[$_REQUEST['newsletter_month']];
		*/			
		$this->load->view('newsletter', $data);			
	}
	public function sample_subscriber()
	{
		$data['tracking_date'] = date('mdy');
		$this->load->view('sample_subscriber', $data);	
	}
	public function sample_reseller()
	{
		$data['tracking_date'] = date('mdy');
		$this->load->view('sample_reseller', $data);	
	}
	public function sample_enterprise()
	{
		$data['tracking_date'] = date('mdy');
		$this->load->view('sample_enterprise', $data);	
	}
	public function sample_academic()
	{
		$data['tracking_date'] = date('mdy');
		$this->load->view('sample_academic', $data);	
	}
	public function sample_newsletter()
	{
		$data['tracking_date'] = date('mdy');
		$this->load->view('sample_newsletter', $data);	
	}
	public function trailers()
	{
		$data['tracking_date'] = date('mdy');
		$this->load->view('trailers', $data);	
	}
	public function sample_trailers()
	{
		$data['tracking_date'] = date('mdy');
		$this->load->view('sample_trailers', $data);	
	}
}