<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sales extends CI_Controller {
	public function index()
	{
		$this->load->helper('url');	
		$this->load->helper('form');
		$this->load->view('header');
		$this->load->view('sales');
		$this->load->view('footer');
	}
	function sanitizeString($string = null)
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
	function clean($letter){
		$letter = str_replace("lynda.com", '<a style="color: #000000;text-decoration: none;">lynda.com</a>', $letter);
		//stripslashes(htmlspecialchars());
		
		//$letter = str_replace("Õ", '&rsquo;', $letter);
		
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
	public function build()
	{
		//$this->load->helper('url');	
		//$this->load->helper('form');
		//$this->load->view('header');
		//$this->load->view('build_sales');
		//$this->load->view('footer');
		
		$sender = $_REQUEST['sender'];
		$content = $this->clean($_REQUEST['content']);
		$tracking_code = $_REQUEST['tracking_code'];
		$help_link = $_REQUEST['help_link'];
		$subscription_link = $_REQUEST['subscription_link'];
	?>
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
			"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		
		<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
			<title></title>
		</head>
		<body style="background-color: #404040;">
		<custom name="opencounter" type="tracking">
		<!-- RegionStart[ socialslot:"SharePasteHTML",
			title:"",
		    description:"",
		    csskey:""] -->
		<table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
			<tr>
				<td>
					<p style="color: #fff; font-family: Verdana, sans-serif; font-size: 11px; text-align: center;">If you are having trouble viewing this email, <a style="color: #fff; font-family: Verdana, sans-serif;font-size: 11px;" href="%%view_email_url%%">view it online</a>.<br />
						To ensure our emails reach your inbox, please add <a style="color: #fff; font-family: Arial, Verdana, sans-serif; font-size: 11px;" href="mailto:<?php echo $sender; ?>"><?php echo $sender; ?></a> to your address book.</p>
					<br />
				</td>
			</tr>
			<tr>
				<td style="text-align: center;">
					<table cellpadding="0" cellspacing="0" border="0" width="650" style="background-color: #ffffff;margin: 0px auto;">
						<tr>
							<td colspan="3"><a href="http://www.lynda.com/?<?php echo $tracking_code; ?>"><img src="http://files2.lynda.com/files/lol_email/holiday/holiday_email_logo_banner.gif" alt="" border="0" /></a></td>
						</tr>
						<tr>
							<td colspan="3">&nbsp;</td>
						</tr>
						<tr>
							<td style="width: 80px;text-align: center;vertical-align: top;">
								&nbsp;
							</td>
							<td style="width: 520px;">
								<table cellpadding="0" cellspacing="0" border="0" style="width: 490px;">
									<tr>
										<td style="color: #000000; font-family: Verdana, sans-serif; font-size: 12px;line-height: 1.5em;text-align: left;">
											<p><?php echo $content; ?></p>
										</td>
									</tr>								
									<tr>
										<td><p style="text-align: right;"><a href="http://www.lynda.com/?<?php echo $tracking_code; ?>"><img src="http://files2.lynda.com/files/lol_email/holiday/holiday_email_footer_logo.gif" alt="" border="0" /></a></p></td>
									</tr>
									<tr>
										<td>&nbsp;</td>
									</tr>
									<tr>
										<td style="color: #000000;font-size: 11px;font-family: 'Trebuchet MS';text-align: center;">Have questions? Email customer service at <a href="mailto:<?php echo $help_link; ?>" style="color: #0B6998;text-decoration: none;"><?php echo $help_link; ?></a>, or call us toll-free at 888-335-9632.</td>
									</tr>
									<tr>
										<td style="color: #000000; font-family: Verdana, sans-serif; font-size: 12px;line-height: 1.5em;text-align: left;">
										<!--Start Social Networking-->
										<p style="margin: 20px 0 10px 0; padding: 0; color: #7C2100; text-decoration: none; text-align: center;">
										<a href="http://twitter.com/lyndadotcom" alias="Twitter-img"><img src="http://files2.lynda.com/files/lol_email/sa/twitter-16x16.jpg" border="0" width="16" height="16" style="border: 0; display: inline; margin: 0 3px 0 0; padding: 0; text-decoration: none; vertical-align: middle;" alt="" /></a>
										<a style="color: #0B6998;text-decoration: none;font-size: 11px;" href="http://twitter.com/lyndadotcom" alias="Twitter-txt" class="links">Follow us on Twitter</a>
										<a href="%%=GetSocialPublishURL('Facebook','SharePasteHTML')=%%" alias="Facebook-img"><img style="border: 0; display: inline; margin: 0 3px 0 10px; padding: 0; text-decoration: none; vertical-align: middle;" src="http://files2.lynda.com/files/lol_email/sa/facebook-16x16.jpg" border="0"  width="16" height="16" alt="Facebook" /></a>
										<a style="color: #0B6998;text-decoration: none;font-size: 11px;" href="%%=GetSocialPublishURL('Facebook','SharePasteHTML')=%%" alias="Facebook-txt" class="links">Share via Facebook</a>
										<a href="%%=GetSocialPublishURL('10','SharePasteHTML')=%%" alias="ShareThis-img"><img style="border: 0; display: inline; margin: 0 3px 0 10px; padding: 0; text-decoration: none; vertical-align: middle;" src="http://files2.lynda.com/files/lol_email/sa/sharethis-16x16.png" alt="ShareThis"   border="0" width="16" height="16" /></a>
										<a style="color: #0B6998;text-decoration: none;font-size: 11px;" href="%%=GetSocialPublishURL('10','SharePasteHTML')=%%" alias="ShareThis-txt" class="links">Share via ShareThis</a>
										</p>
										<!--End Social Networking-->
										</td>
									</tr>
									<tr>
										<td>&nbsp;</td>
									</tr>
								</table>
							</td>
							<td style="width: 50px;text-align: center;vertical-align: top;">
								&nbsp;
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td>&nbsp;</td>
			</tr>
			<tr>
				<td align="center">
			 		<table style='margin: 0px auto; padding: 0px;' cellspacing='0' cellpadding='0' border='0'>
						 <tr>
							 <td><a href="http://www.lynda.com/?<?php echo $tracking_code; ?>" style="font-family: Verdana, sans-serif; font-size: 11px; color: #FFFFFF; text-decoration: none;">lynda.com home</a></td>
							 <td style="padding: 0px 9px;"><img src="http://files2.lynda.com/files/lol_email/announce/edu610/graphic_vertical_spacer.gif" style="width: 2px; height: 21px; border: medium none;" alt="" /></td>
							 <td><a href="http://www.lynda.com/products/?<?php echo $tracking_code; ?>" style="font-family: Verdana, sans-serif; font-size: 11px; color: #FFFFFF; text-decoration: none;">products</a></td>
							 <td style="padding: 0px 9px;"><img src="http://files2.lynda.com/files/lol_email/announce/edu610/graphic_vertical_spacer.gif" style="width: 2px; height: 21px; border: medium none;" alt="" /></td>
							 <td><a href="http://www.lynda.com/solutions/?<?php echo $tracking_code; ?>" style="font-family: Verdana, sans-serif; font-size: 11px; color: #FFFFFF; text-decoration: none;">solutions</a></td>
							 <td style="padding: 0px 9px;"><img src="http://files2.lynda.com/files/lol_email/announce/edu610/graphic_vertical_spacer.gif" style="width: 2px; height: 21px; border: medium none;" alt="" /></td>
							 <td><a href="http://www.lynda.com/resources/?<?php echo $tracking_code; ?>" style="font-family: Verdana, sans-serif; font-size: 11px; color: #FFFFFF; text-decoration: none;">resources</a></td>
							 <td style="padding: 0px 9px;"><img src="http://files2.lynda.com/files/lol_email/announce/edu610/graphic_vertical_spacer.gif" style="width: 2px; height: 21px; border: medium none;" alt="" /></td>
							 <td><a href="http://www.lynda.com/aboutus/?<?php echo $tracking_code; ?>" style="font-family: Verdana, sans-serif; font-size: 11px; color: #FFFFFF; text-decoration: none;">about us</a></td>
							 <td style="padding: 0px 9px;"><img src="http://files2.lynda.com/files/lol_email/announce/edu610/graphic_vertical_spacer.gif" style="width: 2px; height: 21px; border: medium none;" alt="" /></td>
							 <td><a href="http://www.lynda.com/news/?<?php echo $tracking_code; ?>" style="font-family: Verdana, sans-serif; font-size: 11px; color: #FFFFFF; text-decoration: none;">news</a></td>
							 <td style="padding: 0px 9px;"><img src="http://files2.lynda.com/files/lol_email/announce/edu610/graphic_vertical_spacer.gif" style="width: 2px; height: 21px; border: medium none;" alt="" /></td>
							 <td><a href="http://www.lynda.com/aboutus/lotTerms.aspx?<?php echo $tracking_code; ?>" style="font-family: Verdana, sans-serif; font-size: 11px; color: #FFFFFF; text-decoration: none;">terms and conditions</a></td>
							 <td style="padding: 0px 9px;"><img src="http://files2.lynda.com/files/lol_email/announce/edu610/graphic_vertical_spacer.gif" style="width: 2px; height: 21px; border: medium none;" alt="" /></td>
							 <td><a href="http://www.lynda.com/aboutus/lotPrivacy.aspx?<?php echo $tracking_code; ?>" style="font-family: Verdana, sans-serif; font-size: 11px; color: #FFFFFF; text-decoration: none;">privacy policy</a></td>
							 <td style="padding: 0px 9px;"><img src="http://files2.lynda.com/files/lol_email/announce/edu610/graphic_vertical_spacer.gif" style="width: 2px; height: 21px; border: medium none;" alt="" /></td>
							 <td><a href="http://www.lynda.com/aboutus/contact.aspx?<?php echo $tracking_code; ?>" style="font-family: Verdana, sans-serif; font-size: 11px; color: #FFFFFF; text-decoration: none;">contact us</a></td>
						 </tr>
					 </table>
				</td>
			</tr>
			<tr>
				<td>
					<p style="color: #fff; font-family: Verdana, sans-serif;font-size: 11px; text-align: center;">This email was sent by: <a style="color:#fff;text-decoration:none;" href="mailto:%%Member_Busname%%">%%Member_Busname%%</a><br />
						%%Member_Addr%% %%Member_City%%, %%Member_State%%, %%Member_PostalCode%%, %%Member_Country%%<br /><br />
						This email was intended for: <a style="color:#fff;text-decoration:none;" href="mailto:%%emailaddr%%">%%emailaddr%%</a><br />
						<a style="color: #fff; text-decoration: underline;" href="%%<?php echo $subscription_link; ?>%%">Manage your subscriptions or unsubscribe.</a></p>
					<br />
				</td>
			</tr>
		</table>
		<!-- RegionEnd[ socialslot:"SharePasteHTML"] -->
		</body>
		</html>
	<?php
	}
}