<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Subscriber extends CI_Controller {
	public function index()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		$this->load->view('header');
		$this->load->view('blank_template');
		$this->load->view('footer');
	}
	public function build()
	{
		$data['upsell'] = 'no';
		$data['tracking_date'] = strtolower(date('YMd'));
		$data['new_images'] = $this->uri->segment(3, 0);
		$this->load->helper('url');	
		$this->load->helper('form');
		//$this->load->view('header');
		$this->load->view('subscriber', $data);
		//$this->load->view('footer');
	}
	public function upsell()
	{
		$data['upsell'] = 'yes';
		$data['tracking_date'] = date('Ymd');
		$data['new_images'] = $this->uri->segment(3, 0);
		$this->load->helper('url');	
		$this->load->helper('form');
		//$this->load->view('header');
		$this->load->view('subscriber', $data);
		//$this->load->view('footer');
	}
	public function sample()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		//$this->load->view('header');
		$this->load->view('sample_subscriber');
		//$this->load->view('footer');
	}
}