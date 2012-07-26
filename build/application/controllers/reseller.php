<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Reseller extends CI_Controller {
	public function index()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		$this->load->view('header');
		$this->load->view('build_reseller');
		$this->load->view('footer');
	}
	public function build()
	{
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
		
		//$this->load->view('header');
		$this->load->view('reseller', $data);
		//$this->load->view('footer');
		
	}
	public function sample()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		//$this->load->view('header');
		$this->load->view('sample_reseller');
		//$this->load->view('footer');
	}
}