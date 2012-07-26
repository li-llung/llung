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
<custom name="opencounter" type="tracking">
    <!-- RegionStart[ socialslot:"SharePasteHTML",
                    title:"lynda.com newsletter",
                    description:"the latest news from lynda.com",
                    csskey:""] -->
<div style="margin:8px 8px;">
  <table width="594" border="0" cellpadding="0" cellspacing="0" style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: 12px;">
    <tr>
      <td colspan="2" style="text-align: center;font-size:11px;padding:0px 0px 3px 0px;" valign="top">If you are having trouble viewing this email, <a style="color: #000; text-decoration: underline;" href="%%view_email_url%%" alias="view online" class="links">view it online</a>.<br />
        To ensure our emails reach your inbox, please add <a style="color:#000;text-decoration:none;" href="mailto:news@lynda.com">news@lynda.com</a> to your address book.</td>
    </tr>
    <tr>
      <td colspan="2" valign="top"><a style="color: #000; text-decoration: underline;" href="http://www.lynda.com/newsletters/<?php echo $tracking_code; ?>" alias="newsletters archive"><img src="http://files2.lynda.com/files/lol_email/newsletter/global/headers/header_<?php echo $newsletter_month; ?>_<?php echo $newsletter_year; ?>.gif" alt="" width="594" height="110" border="0" /></a><br />
        <br />
        <a style="color: #000; text-decoration: underline;" href="%%ftaf_url%% " alias="send to a friend"><img src="http://files2.lynda.com/files/lol_email/newsletter/july10/sendtoafriend.gif" alt="" width="133" height="28" border="0" align="right" style="margin-right:10px;" /></a></td>
    </tr>
		<tr>
			<td width="50%" valign="top" style="padding: 0px 5px 0px 14px;"><p style="margin:0px 0px 0px 0px;">Hello, <a style="color: #000000;text-decoration: none;">lynda.com</a> newsletter subscriber! Welcome to our <?php echo $full_month; ?> <?php echo $newsletter_year; ?> newsletter.</p>				
			</td>
			<td width="50%" valign="top" id="menu" style="padding: 0px 14px 10px 14px;"><h1 style="margin:0px;font-size:18px;color:#7C2001;font-family:'Trebuchet MS', Verdana, Arial, sans-serif;"> In this edition </h1>
				<p style="color:#CCCCCC;margin-top:0px;">&#8226; <a style="color: #000; text-decoration: underline;" href="#letter" class="links">Letter from Lynda</a><br />
					&#8226; <a style="color: #000; text-decoration: underline;" href="#events" class="links">Events</a><br />
					&#8226; <a style="color: #000; text-decoration: underline;" href="#new_releases" class="links">New releases</a><br />
					<?php if($podcasts == "yes"){?>
					&#8226; <a style="color: #000; text-decoration: underline;" href="#podcasts" class="links">lynda.com podcasts</a> <br />
					<?php } ?>
					&#8226; <a style="color: #000; text-decoration: underline;" href="#training" class="links">Training coming soon</a><br />
					&#8226; <a style="color: #000; text-decoration: underline;" href="#testimonials" class="links">Testimonial<?php echo $testimonial_count; ?> of the month</a><br />
					&#8226; <a style="color: #000; text-decoration: underline;" href="#hottip" class="links">Tip of the month</a>
				</p>
			</td>
		</tr>
    <tr>
      <td colspan="2" valign="top" style="border-bottom: 1px solid #CCCCCC;padding:0px 14px 18px 14px;">
      	<h1 style="margin: 10px 0px 12px 0px;font-size:18px;color:#7C2001;font-family:'Trebuchet MS', Verdana, Arial, sans-serif;"><a id="letter"></a>Letter from Lynda</h1>
		<div style="float: left; margin: 4px 12px 12px 0;">
		<img src="<?php echo $letter_image; ?>" alt="Lynda Weinman" border="0" />
		<p style="margin:4px 0;text-align:center;font-size:10px;font-style:italic;color:#666;">Photo: Douglas Kirkland 2010</p>
		</div>
<p>Dear Members and Newsletter Subscribers,</p>

<?php echo $letter; ?>		
		
			<?php if($upsell == "yes"){?>
				<!--Start Upsell-->
				<div style="border-bottom: 1px solid #CCCCCC;border-top: 1px solid #CCCCCC;padding: 0px 5px 5px 14px;background-color: #f1f1f1;">
					<h1 style="margin: 10px 0px 12px 0px;font-size:15px;color:#7C2001;font-family:'Trebuchet MS', Verdana, Arial, sans-serif;"><a id="letter"></a>Join <a style="color: #7C2001;text-decoration: none;">lynda.com</a> today</h1>
					<p>Keep on learning with a membership to the Online Training Library&reg;!</p>
					<p>We are constantly adding new software training courses and inspirational documentries to help you reach your creative and career goals.</p>
					<p><a href="http://www.lynda.com/products/?utm_source=LDCemail&utm_medium=email&utm_content=NL20110308_header&utm_campaign=Newsletters"><img src="http://files2.lynda.com/files/lol_email/sales/global/btn_learnmore_85x23_G-transparentonW.gif" alt="" /></a></p>
				</div>
				<!--End Upsell-->
			<?php } ?>
		</td>
  </tr>
  <!--Start New Releases-->
		<tr>
			<td colspan="2" valign="top" style="border-bottom: 1px solid #CCCCCC;padding:0px 014px 18px 14px;"><h1 style="margin:18px 0px 0px 0px;font-size:18px;color:#7C2001;font-family:'Trebuchet MS', Verdana, Arial, sans-serif;"><a id="new_releases"></a>New releases</h1>
				<table cellpadding="0" cellspacing="0" width="562">
					<tr>
						<td valign="top" style="border-right:1px solid #ccc;padding:0 10px 0 0">
							<table style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: 12px;" border="0" cellpadding="0" cellspacing="0" width="270">
							<?php echo $new_releases; ?>															
							</table>
						</td>
						<td valign="top" style="padding:0 0 0 10px;">
							<table style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: 12px;" border="0" cellpadding="0" cellspacing="0" width="270">								
							</table>
						</td>
					</tr>
				</table>
			</td>
	</tr>
	<!--End New Releases-->
	<?php if($podcasts == "yes"){?>
	<!--Start Podcasts-->	
    <tr>
	      <td colspan="2" valign="top" style="border-bottom: 1px solid #CCCCCC;padding:0px 10px 18px 14px;"><h1 style="margin:18px 0px 0px 0px;font-size:18px;color:#7C2001;font-family:'Trebuchet MS', Verdana, Arial, sans-serif;" id="podcasts">Podcasts from <a href="#nogo" style="color:#7C2001;text-decoration:none;">lynda.com</a></h1>
        <p>Covering everything from software tricks to industry events to interviews with professionals, <a href="#nogo" style="color:#000;text-decoration:none;">lynda.com</a> podcasts are well worth the download. Last month we talked about:</p>
      	<textarea style="width: 100%;height: 300px;"></textarea><p>Watch the <a href="#nogo" style="color:#000;text-decoration:none;">lynda.com</a> video podcast <a style="color: #000; text-decoration: underline;" href="http://phobos.apple.com/WebObjects/MZStore.woa/wa/viewPodcast?id=121879948" alias="lynda.com podcast on iTunes" class="links">via iTunes</a> or <a style="color: #000; text-decoration: underline;" href="http://www.lynda.com/podcasts/lynda_podcast.xml" alias="lynda.com podcast RSS" class="links">via RSS</a>.</p>
		</td>
    </tr>
	<!--End Podcasts-->	
    <?php } ?>
    <tr>
      <td valign="top" style="border-bottom: 0px solid #CCCCCC;padding:0px 5px 10px 14px;"><table style="margin:18px 0px;background-color:#FFD400;font-size:12px;" border="0" cellpadding="0" cellspacing="0" width="263">
          <tr>
            <td valign="top" style="padding: 6px 3px 18px 3px; font-family: Verdana, sans-serif;"><a style="color: #000; text-decoration: underline;" id="training"></a><img src="http://files2.lynda.com/files/lol_email/newsletter/july10/trainingcomingsoon.gif" alt="" height="93" width="257" />
              <p style="padding:0 4px;"><a style="color: #000; text-decoration: underline;" href="http://www.lynda.com/home/ViewCourses.aspx?utm_source=LDCemail&utm_medium=email&utm_content=NL070710_comingsoon&utm_campaign=Newsletters" alias="Online Training Library" class="links">Keep an eye on the site</a> for these and many other helpful new courses coming to the Online Training Library&reg; and the <a href="#nogo" style="color:#000;text-decoration:none;">lynda.com</a> store soon:</p>
              <ul style="list-style-type:disc;padding:0 4px 0 26px;">
    	          <?php echo $training_coming_soon; ?>
	          </ul>
			</td>
          </tr>
        </table>
          <h1 style="margin:18px 0px 0px 0px;font-size:18px;color:#7C2001;font-family:'Trebuchet MS', Verdana, Arial, sans-serif;">Testimonial<?php echo $testimonial_count; ?> of the month<a style="color: #000; text-decoration: underline;" id="testimonials"></a></h1>
        	<p><?php echo $testimonail_1; ?></p>
        	
        	<p><?php echo $testimonail_2; ?></p>
          <p style="margin-top:0px;">Read more <a style="color: #000; text-decoration: underline;" href="http://www.lynda.com/aboutus/testimonials.aspx?utm_source=LDCemail&utm_medium=email&utm_content=NL070710_testimonials&utm_campaign=Newsletters" alias="testimonials" class="links">great feedback</a>.</p>
        </td>
		<td valign="top" style="border-bottom: 0px solid #CCCCCC;padding:0px 14px 10px 5px;">
			<table style="margin:18px 0px;background-color:#E6E6E6;font-size:12px;" border="0" cellpadding="0" cellspacing="0" width="293">
          
		<tr>
			<td colspan="2" valign="top"><h1 style="margin:18px 0px 0px 0px;font-size:24px;color:#7C2001;font-family:'Trebuchet MS', Verdana, Arial, sans-serif;text-align: center;">Tip of the month<a style="color: #000; text-decoration: underline;" id="testimonials"></a></h1></td>
		</tr>
		<tr>
			<td colspan="2" valign="top" style="padding:10px; font-family: Verdana, sans-serif;">
				<a style="color: #000; text-decoration: underline;" href="http://www.lynda.com/home/DisplayCourse.aspx?lpk2=62219&utm_source=LDCemail&utm_medium=email&utm_content=NL070710_hottip_thumb&utm_campaign=Newsletters" alias="Word 2010 Essential Training (hottip)"><img style="border: 0;" src="http://files2.lynda.com/files/lol_email/newsletter/july10/July2010HOTtip.jpg" alt="HOT Tip of the Month" /></a><p style="margin:4px 0;text-align:center;font-size:10px;font-style:italic;color:#666;">While tracking changes, inline changes with balloons lets you see your formatting in the margin, and the text you changed inline.</p>
			</td>
          </tr>
          <tr>
            <td colspan="2" valign="top" style="padding:10px; font-family: Verdana, sans-serif;">
            	<?php echo $tip_of_the_month; ?>
            </td>
          </tr>
       </table>
      </td>
    </tr>
    <tr>
      <td colspan="2" valign="top">
		<p style="margin: 40px 0 40px 0; padding: 0; color: #7C2100; text-decoration: none; text-align: center;">
			<a href="http://twitter.com/lyndadotcom" alias="Twitter-img"><img src="http://files2.lynda.com/files/lol_email/sa/twitter-16x16.jpg" border="0" width="16" height="16" style="border: 0; display: inline; margin: 0 3px 0 0; padding: 0; text-decoration: none; vertical-align: middle;" alt="" /></a>
			<a style="color: #000; text-decoration: underline;" href="http://twitter.com/lyndadotcom" alias="Twitter-txt" class="links">Follow us on Twitter</a>
			<a href="http://www.facebook.com/lyndadotcom" alias="Facebook-img"><img style="border: 0; display: inline; margin: 0 3px 0 10px; padding: 0; text-decoration: none; vertical-align: middle;" src="http://files2.lynda.com/files/lol_email/sa/facebook-16x16.jpg" border="0"  width="16" height="16" alt="Facebook" /></a>
			<a style="color: #000; text-decoration: underline;" href="http://www.facebook.com/lyndadotcom" alias="Facebook-txt" class="links">Like us on Facebook</a>
			<a href="%%=GetSocialPublishURL('10','SharePasteHTML')=%%" alias="ShareThis-img"><img style="border: 0; display: inline; margin: 0 3px 0 10px; padding: 0; text-decoration: none; vertical-align: middle;" src="http://files2.lynda.com/files/lol_email/sa/sharethis-16x16.png" alt="ShareThis"   border="0" width="16" height="16" /></a>
			<a style="color: #000; text-decoration: underline;" href="%%=GetSocialPublishURL('10','SharePasteHTML')=%%" alias="ShareThis-txt" class="links">Share via ShareThis</a>
		</p>	
		<table width="594" border="0" cellpadding="0" cellspacing="0" style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: 12px;">
          <tr>
            <td colspan="2" valign="top" height="24" style="line-height: 1px;"><img src="http://files2.lynda.com/files/lol_email/newsletter/july10/footerT.gif" alt="" width="594" height="24" /></td>
          </tr>
          <tr>
            <td colspan="2" valign="top" style="padding:0px 14px; background-color: #FFD400;font-size:11px;"><p style="margin:0px;">Thanks very much for reading our news.<br />
              </p>
              <p style="margin:0px;"><strong>We forever appreciate your support. Happy learning!</strong></p>
              <p style="margin:0px;">&copy; 1998-<?php echo date("Y"); ?> <a href="#nogo" style="color:#000;text-decoration:none;">lynda.com</a>, inc. All rights reserved.<br />
                For questions regarding anything in this newsletter, please send an email to: <a style="color: #000; text-decoration: underline;" href="mailto:marketing@lynda.com" alias="marketing@lynda.com" class="links">marketing@lynda.com</a></p></td>
          </tr>
          <tr>
            <td colspan="2" valign="top"><img src="http://files2.lynda.com/files/lol_email/newsletter/july10/footerB.gif" alt="" width="594" height="24" /></td>
          </tr>
        </table>
        </td>
    </tr>
    <tr>
      <td colspan="2" style="text-align: center;font-size:11px;padding:0px 0px 3px 0px;" valign="top"><table cellpadding="2" cellspacing="0" border="0" width="100%"><tr><td><center><p><font face="verdana" size="1" color="#444444">This email was sent by: <b>%%Member_Busname%%</b><br />%%Member_Addr%% %%Member_City%%, %%Member_State%%, %%Member_PostalCode%%, %%Member_Country%%<br /><br />This email was intended for %%emailaddr%%.<br />To manage your subscription preferences or to unsubscribe, <a style="color: #444;" href="%%profile_center_url%%" alias="profile center" class="links">go here</a>.</font></p></center></td></tr></table>
        </td>
    </tr>
  </table>
</div>
<!-- RegionEnd[ socialslot:"SharePasteHTML"] -->
</body>
</html>