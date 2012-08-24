<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {
	public function index()
	{
		$this->load->database();
		
		$query_types = $this->db->get('templates_type');

		$this->db->select('*');
		$this->db->from('templates');
		$this->db->join('templates_type', 'templates.template_type = templates_type.templates_type_id');

		$query = $this->db->get();

		$data['query'] = $query;
		$data['query_types'] = $query_types;

		$this->load->view('welcome_message', $data);
	}
	public function filter()
	{
		$this->load->database();
		
		$query_types = $this->db->get('templates_type');

		$this->db->select('*');
		$this->db->from('templates');
		$this->db->join('templates_type', 'templates.template_type = templates_type.templates_type_id');

		$query = $this->db->get();

		$data['query'] = $query;
		$data['query_types'] = $query_types;

		$this->load->view('welcome_message', $data);
	}
	public function generate()
	{
		$this->load->database();
		$template_id = $this->uri->segment(3, 0);
		$template_name = $this->uri->segment(4, 0);
		$template_type = $this->uri->segment(5, 0);

		if($template_type == "html"){
			Header("content-type: text/plain");
		}else if($template_type == "css"){
			Header("content-type: text/css");
		}else if($template_type == "js"){
			Header("content-type: application/x-javascript");
		}else{
			Header("content-type: text/plain");
		}
		header('Content-Disposition: attachment; filename='.$template_name. '.'. $template_type);

		$query = $this->db->get_where('templates', array('template_id' => $template_id));
		foreach ($query->result() as $row)
		{
		    echo $row->template_content;
		}		
	}
}