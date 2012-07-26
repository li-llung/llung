<?php
include_once '/home/landonlu/public_html/dev/captcha/common.php';

$security_code = trim($_POST['security_code']);

$to_check = md5($security_code);

if($to_check == $_SESSION['security_code'])
{
//echo 'The security code is <font color="green">correct</font>.';
	$name = $_REQUEST['name'];
	$email_address = $_REQUEST['email_address'];
	$email_address_confirm = $_REQUEST['email_address_confirm'];
	$message = $_REQUEST['message'];
	
	$to = $email_address;
	
	// subject
	$subject = 'Tell a Friend about Landon Lung.com';
	
	// message
	$message = '
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<title>Amoretti&reg;</title>
</head>
<body>
	'.$name.' wanted tell you '.$message.'
</body>
</html>
	';

	// To send HTML mail, the Content-type header must be set
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	
	// Additional headers
	$headers .= 'From: Landon Lung.com <landon@landonlung.com>' . "\r\n";
	
	// Mail it
	mail($to, $subject, $message, $headers);
	$user_message = '<br /><br />Thank you for contacting amoretti.com someone will get back to you.';
	header('Location: index.php');
}
else
{
echo 'The security code is <font color="red">incorrect</font>';
}