<?php //print_r($_POST); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>lynda.com <?php echo $full_month; ?> newsletter</title>
	<style type="text/css">
	a.links:hover{
		text-decoration:none !important;
		color:#7C2001 !important;
	}
	a.links:visited{
		color:#996600 !important;
	}
	#menu a:visited{
		color:#000000 !important;
	}
	#newreleases p {
		margin: 0; padding: 0; font-size: 11px; line-height: 14px;
	}
	#newreleases a {
		font-size: 12px; line-height: 15px;
	}
	img {
		border: 0;
	}
	</style>
</head>
<body>
<?php if($is_archive == "no"){ ?>
<custom name="opencounter" type="tracking">
<!-- RegionStart[ socialslot:"SharePasteHTML",
     title:"lynda.com newsletter",
     description:"the latest news from lynda.com",
     csskey:""] -->
<?php } ?>
<div style="margin:8px 8px;">
	<table border="0" cellpadding="0" cellspacing="0" width="594" style="font: normal 12px Verdana,Arial,Helvetica,sans-serif;">
	    <tr>
			<td colspan="2" style="text-align: center;font-size:11px;padding:0px 0px 3px 0px;" valign="top">If you are having trouble viewing this email, <a style="color: #000; text-decoration: underline;" href="%%view_email_url%%" alias="view online" class="links">view it online</a>.<br />To ensure our emails reach your inbox, please add <a style="color:#000;text-decoration:none;" href="mailto:news@lynda.com"><?php echo $sender_text; ?></a> to your address book.</td>
		</tr>
		<tr>
			<td colspan="2" valign="top"><a style="color: #000; text-decoration: underline;" href="http://www.lynda.com/newsletters/" alias="<?php echo $full_month; ?> 2011 Newsletter"><img src="http://files2.lynda.com/files/lol_email/newsletter/global/headers/header_<?php echo $newsletter_month; ?>_2011.gif" alt="" width="594" height="110" border="0" /></a><br /><br /><?php if($is_archive == "no"){ ?><a style="color: #000; text-decoration: underline;" href="%%ftaf_url%% " alias="send to a friend"><img src="http://files2.lynda.com/files/lol_email/newsletter/july10/sendtoafriend.gif" alt="" width="133" height="28" border="0" align="right" style="margin-right:10px;" /></a><?php } ?></td>
		</tr>
		<tr>
			<td width="50%" valign="top" style="padding: 0px 5px 0px 14px;line-height: 1.5em;font-size: 12px;font-family: Verdana;"><p style="margin:0px 0px 0px 0px;">Hello, <a style="color: #000000;text-decoration: none;">lynda.com</a> newsletter subscriber! Welcome to our <?php echo $full_month; ?> 2011 newsletter.</p></td>
			<td width="50%" valign="top" id="menu" style="padding: 0px 14px 10px 14px;"><h1 style="margin:0px;font-size:18px;color:#7C2001;font-family:'Trebuchet MS', Verdana, Arial, sans-serif;"> In this edition </h1>
				<p style="color:#CCCCCC;margin-top:0px;line-height: 1.5em;font-size: 12px;font-family: Verdana;">&#8226; <a style="color: #000; text-decoration: underline;" href="#letter" class="links">Letter from Lynda</a><br />
				&#8226; <a style="color: #000; text-decoration: underline;" href="#new_releases" class="links">New releases</a><br />
				&#8226; <a style="color: #000; text-decoration: underline;" href="#training" class="links">Training coming soon</a><br />
				<?php if($testimonials=="yes"){?>
				&#8226; <a style="color: #000; text-decoration: underline;" href="#testimonials" class="links">Testimonial<?php echo $testimonial_header; ?> of the month</a><br />
				<?php } ?>
				<?php if($tweets=="yes"){?>
				&#8226; <a style="color: #000; text-decoration: underline;" href="#tweets" class="links">Tweet<?php echo $tweet_header; ?> of the month</a><br />
				<?php } ?>
				&#8226; <a style="color: #000; text-decoration: underline;" href="#tip_of_the_month" class="links">Tip of the month</a>
				</p>
			</td>
		</tr>
		<tr>
			<td colspan="2" valign="top" style="border-bottom: 1px solid #CCCCCC;padding:0px 14px 18px 14px;">
				<h1 style="margin: 10px 0px 12px 0px;font-size:18px;color:#7C2001;font-family:'Trebuchet MS', Verdana, Arial, sans-serif;"><a id="letter"></a>Letter from Lynda</h1>
				<table cellpadding="0" cellspacing="0" border="0">
					<tr>
					    <td valign="top" style="line-height: 1.5em;font-size: 12px;font-family: Verdana;">
						    <img src="<?php echo $letter_image; ?>" alt="Lynda" align="left" hspace="10" vspace="10" style="border: solid 1px #585858;float: left;margin: 5px 15px 0 0;" />
						    <?php echo $letter_intro; ?>
                        </td>
					</tr>
				</table>
				<p>&nbsp;</p><!--Spacer-->
				<?php echo $stories; ?>
                <?php echo $letter_signiture; ?>
			</td>
		</tr>
		<!--Start New Releases-->
		<tr>
			<td colspan="2" valign="top" style="border-bottom: 1px solid #CCC;padding: 0 14px 18px 14px;">
				<h1 style="margin:18px 0px 0px 0px;font-size:18px;color:#7C2001;font-family:'Trebuchet MS', Verdana, Arial, sans-serif;"><a id="new_releases"></a>New releases</h1>
				<table cellpadding="0" cellspacing="0" width="562">
					<tr>
						<td valign="top" style="padding:0 10px 0 0;border-right:1px solid #ccc;">
						    <table style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: 12px;" border="0" cellpadding="0" cellspacing="0" width="270">
								<?php echo $new_releases; ?>
							<!--</table>
						</td>
						<td valign="top" style="padding:0 0 0 10px;">
							<table style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: 12px;" border="0" cellpadding="0" cellspacing="0" width="270">-->							   
							</table>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td><p>&nbsp;</p></td>
		</tr>
		<!--End New Releases-->
	    <tr>	    	    
	    	<td valign="top" style="padding:0px 5px 10px 14px;">	    	
	    		<table style="margin:0px 0px;background-color:#FFD400;font-size:12px;" border="0" cellpadding="0" cellspacing="0" width="263">
        			<tr>
			            <td valign="top" style="padding: 6px 3px 18px 3px; font-family: Verdana, sans-serif;"><a style="color: #000; text-decoration: underline;" id="training"></a><img src="http://files2.lynda.com/files/lol_email/newsletter/july10/trainingcomingsoon.gif" alt="" height="93" width="257" />
            				<p style="padding:0 4px;"><a style="color: #000; text-decoration: underline;" href="http://www.lynda.com/home/ViewCourses.aspx" alias="Online Training Library" class="links">Keep an eye on the site</a> for these and many other helpful new courses coming to the Online Training Library&reg; soon:</p>
							<ul style="line-height: 1.5em;list-style-type:disc;padding:0 4px 0 26px;">
								<?php echo $training_coming_soon; ?>
							</ul>
						</td>
					</tr>
				</table>
				<?php if($testimonials=="yes"){?>
         		<h1 style="margin:18px 0px 0px 0px;font-size:18px;color:#7C2001;font-family:'Trebuchet MS', Verdana, Arial, sans-serif;">Testimonial<?php echo $testimonial_header; ?> of the month<a style="color: #000; text-decoration: underline;" id="testimonials"></a></h1>
				<?php if($testimonial_1!=""){?>
				<p><?php echo $testimonial_1; ?></p>
				<?php } ?>			
				<?php if($testimonial_2!=""){?>
				<p><?php echo $testimonial_2; ?></p>
				<?php } ?>			
				<p style="margin-top:0px;">Read more <a style="color: #000; text-decoration: underline;" href="http://www.lynda.com/aboutus/testimonials.aspx" alias="testimonials" class="links">great feedback</a>.</p>		
				<?php } ?>				
				<?php if($tweets=="yes"){?>
         		<h1 style="margin:18px 0px 0px 0px;font-size:18px;color:#7C2001;font-family:'Trebuchet MS', Verdana, Arial, sans-serif;">Tweet<?php echo $tweet_header; ?> of the month<a style="color: #000; text-decoration: underline;" id="testimonials"></a></h1>
				<?php if($tweet_1!=""){?>
				<p><?php echo $tweet_1; ?></p>
				<?php } ?>			
				<?php if($tweet_2!=""){?>
				<p><?php echo $tweet_2; ?></p>
				<?php } ?>			
				<?php } ?>
			</td>
			<td valign="top" style="border-bottom: 0px solid #CCCCCC;padding:0px 14px 10px 5px;background-color:#E6E6E6;">
				<table style="margin:18px 0px;background-color:#E6E6E6;font-size:12px;" border="0" cellpadding="0" cellspacing="0" width="293">  
					<tr>
						<td colspan="2" valign="top"><h1 style="margin:18px 0px 0px 0px;font-size:24px;color:#7C2001;font-family:'Trebuchet MS', Verdana, Arial, sans-serif;text-align: center;">Tip of the month<a style="color: #000; text-decoration: underline;" id="testimonials"></a></h1></td>
					</tr>
					<tr>
						<td colspan="2" valign="top" style="padding:10px; font-family: Verdana, sans-serif;">
							<a style="color: #000000; text-decoration: none;" href="<?php echo $tip_link; ?><?php echo $tracking_tip; ?>" alias="<?php echo $tip_course; ?>">
							    <img style="border: solid 1px #CCC;" src="<?php echo $tip_image; ?>" alt="Tip of the Month" id="tip_of_the_month" width="266" style="border: solid 1px #585858;" />
							</a>							
							<p style="color: #666;font-size: 10px;font-style: italic;margin: 4px 0;"><?php echo $tip_caption; ?></p>
						</td>
          			</tr>
					<tr>
			            <td colspan="2" valign="top" style="padding:10px; font-family: Verdana, sans-serif;background-color:#E6E6E6;">
							<?php echo $tip_text; ?>
                            <p style="color: #000000;font-family: Verdana, sans-serif;font-size: 12px;line-height: 1.5em;">View sample movie from <a href="<?php echo $tip_link; ?><?php echo $tracking_tip; ?>" style="text-decoration: none;color: #000;"><em><?php echo $tip_course; ?></em></a>.</p>
						</td>
					</tr>
				</table>
			</td>
	    </tr>
    	<tr>
			<td colspan="2" valign="top">
				<?php if($is_archive == "no"){ ?>
			    <?php echo $social; ?>
				<?php } ?>
				<table width="594" border="0" cellpadding="0" cellspacing="0" style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: 12px;">
					<tr>
						<td colspan="2" valign="top" height="24" style="line-height: 1px;"><img src="http://files2.lynda.com/files/lol_email/newsletter/july10/footerT.gif" alt="" width="594" height="24" /></td>
					</tr>
					<tr>	
            			<td colspan="2" valign="top" style="padding:0px 14px; background-color: #FFD400;font-size:11px;">
							<?php echo $copyright; ?>
						</td>	
          			</tr>
          			<tr>
			            <td colspan="2" valign="top"><img src="http://files2.lynda.com/files/lol_email/newsletter/july10/footerB.gif" alt="" width="594" height="24" /></td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
		    <td colspan="2">&nbsp;</td>
	    </tr>
		<tr>
            <td colspan="2" align="center" style="text-align: center;">
              <a href="http://www.lynda.com<?php echo $tracking_default; ?>" style="font-family: Verdana, sans-serif; font-size: 11px; color: #000; text-decoration: none;">lynda.com home</a>
              <span style="color: #000;font-family: Verdana, sans-serif;font-size: 11px;">&nbsp; &#124; &nbsp;</span><a href="http://www.lynda.com/products<?php echo $tracking_default; ?>" style="font-family: Verdana, sans-serif; font-size: 11px; color: #000; text-decoration: none;">products</a>
              <span style="color: #000;font-family: Verdana, sans-serif;font-size: 11px;">&nbsp; &#124; &nbsp;</span><a href="http://www.lynda.com/solutions<?php echo $tracking_default; ?>" style="font-family: Verdana, sans-serif; font-size: 11px; color: #000; text-decoration: none;">solutions</a>
              <span style="color: #000;font-family: Verdana, sans-serif;font-size: 11px;">&nbsp; &#124; &nbsp;</span><a href="http://www.lynda.com/resources<?php echo $tracking_default; ?>" style="font-family: Verdana, sans-serif; font-size: 11px; color: #000; text-decoration: none;">resources</a>
              <br />
              <a href="http://www.lynda.com/aboutus<?php echo $tracking_default; ?>" style="font-family: Verdana, sans-serif; font-size: 11px; color: #000; text-decoration: none;">about us</a>
              <span style="color: #000;font-family: Verdana, sans-serif;font-size: 11px;">&nbsp; &#124; &nbsp;</span><a href="http://www.lynda.com/news<?php echo $tracking_default; ?>" style="font-family: Verdana, sans-serif; font-size: 11px; color: #000; text-decoration: none;">news</a>
              <span style="color: #000;font-family: Verdana, sans-serif;font-size: 11px;">&nbsp; &#124; &nbsp;</span><a href="http://www.lynda.com/aboutus/lotTerms.aspx<?php echo $tracking_default; ?>" style="font-family: Verdana, sans-serif; font-size: 11px; color: #000; text-decoration: none;">terms and conditions</a>
              <span style="color: #000;font-family: Verdana, sans-serif;font-size: 11px;">&nbsp; &#124; &nbsp;</span><a href="http://www.lynda.com/aboutus/lotPrivacy.aspx<?php echo $tracking_default; ?>" style="font-family: Verdana, sans-serif; font-size: 11px; color: #000; text-decoration: none;">privacy policy</a>
              <span style="color: #000;font-family: Verdana, sans-serif;font-size: 11px;">&nbsp; &#124; &nbsp;</span><a href="http://www.lynda.com/aboutus/contact.aspx<?php echo $tracking_default; ?>" style="font-family: Verdana, sans-serif; font-size: 11px; color: #000; text-decoration: none;">contact us</a>
            </td>
        </tr>
        <tr>
            <td colspan="2">&nbsp;</td>
        </tr>
        <tr>
            <td colspan="2">
                <p style="color: #000;font-family: Verdana, sans-serif;font-size: 11px;text-align: center;">
                    Copyright &copy; 1995&#45;<?php echo date("Y"); ?> <a style="color: #000;text-decoration: none;">lynda.com</a>, Inc. All rights reserved.
					<?php if($is_archive == "no"){ ?>
                    <br /><br />
                    <?php echo $address; ?>
                    <br /><br />
                    <?php echo $manage; ?>
					<?php } ?>
                </p>
            </td>
        </tr>
	    <tr>
		    <td colspan="2">&nbsp;</td>
	    </tr>
	</table>
</div>
<?php if($is_archive == "no"){ ?>
<!-- RegionEnd[ socialslot:"SharePasteHTML"] -->
<?php } ?>
</body>
</html>