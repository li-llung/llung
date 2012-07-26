<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Trailers extends CI_Controller {
	public function index()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		$this->load->view('header');
		$data['type'] = 'generator';
		$this->load->view('build_trailer_list', $data);
		$this->load->view('footer');
	}
	public function generator()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		$this->load->view('header');
		$data['type'] = 'generator';
		$this->load->view('build_trailer_list', $data);
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
			$all_trailers .= '<div style="width: 960px; background-color: #d5d5d5; border: 0; margin: 12px 0 0 0; padding: 0; text-align: right;"><img style="border: 0; padding: 0; margin: 0 10px 0;" src="readytolearn.gif" /><a href="https://www.lynda.com/home/registration/RegistrationStep1.aspx"><img style="border: 0; padding: 0; margin: 0 10px 0;" src="subscribe.gif" alt="subscribe" /></a><a href="http://www.lynda.com/home/DisplayCourse.aspx?lpk2='. $trailer[2].'"><img style="border: 0; padding: 0; margin: 0 10px 0;" src="watchthiscourse.gif" alt="watch this course" /></a><a href="http://www.lynda.com/home/ViewCourses.aspx"><img style="border: 0; padding: 0; margin: 0 10px 0;" src="viewall.gif" alt="view all courses" /></a></div>'."\n";
			$all_trailers .= '</body>'."\n";
			$all_trailers .= '</html>'."\n";
			$all_trailers .= '</textarea>';			
		}
		$data['trailers_all'] = $all_trailers;
		$data['trailer_id'] = $_REQUEST['trailer_id'];
		$data['css'] = '<link href="/build/ui/css/legacy.css" rel="stylesheet" type="text/css">';
		$this->load->view('header');
		$this->load->view('build', $data);	
		$this->load->view('footer');
	}
	public function for_generator()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		$this->load->view('header');
		$data['type'] = 'for_generator';
		$this->load->view('build_trailer_list', $data);
		$this->load->view('footer');
	}
	public function titles()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		$this->load->view('header');
		$data['type'] = 'titles';
		$this->load->view('build_trailer_list', $data);
		$this->load->view('footer');
	}
	public function titles_comma()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		$this->load->view('header');
		$data['type'] = 'titles_comma';
		$this->load->view('build_trailer_list', $data);
		$this->load->view('footer');
	}
	public function links()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		$this->load->view('header');
		$data['type'] = 'links';
		$this->load->view('build_trailer_list', $data);
		$this->load->view('footer');
	}
}