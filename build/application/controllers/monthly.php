<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Monthly extends CI_Controller {
	public function index()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		$all_months =  array('jan' => 'January','feb' => 'February','mar' => 'March','apr' => 'April','may' => 'May','june' => 'June','july' => 'July','aug' => 'August','sep' => 'September','oct' => 'October','nov' => 'November','dec' => 'December');
		$all_years = array('2010','2011','2012','2013','2014','2015');
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
		$data['months'] = $current_month;
		$data['years'] = $current_year;
		$data['days'] = $current_day;
		$this->load->view('header');
		$this->load->view('build_newsletter', $data);
		$this->load->view('footer');
	}
	public function build()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		$this->load->view('header');
		$data['upsell'] = 'no';
		$this->load->view('newsletter', $data);
		$this->load->view('footer');
	}
	public function upsell()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		$this->load->view('header');
		$data['upsell'] = 'yes';
		$this->load->view('newsletter', $data);
		$this->load->view('footer');
	}
	public function sample()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		$this->load->view('header');
		$this->load->view('sample_newsletter');
		$this->load->view('footer');
	}
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
		
		$letter = htmlspecialchars($letter);
		
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
	public function custom()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		$this->load->view('header');
		$this->load->view('custom_newsletter');
		$this->load->view('footer');
	}
	public function clean()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		$this->load->library('typography');
		$this->load->view('header');
		$content = $this->_cleaner($_REQUEST['content']);
		$data['content'] = $this->typography->auto_typography($content);		
		$this->load->view('custom_newsletter', $data);
		$this->load->view('footer');
	}
}