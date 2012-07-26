<?php 
	$js = array('onSubmit' => 'return validate()');
	echo form_open_multipart('email_builder/newsletter', $js); 
?>
<div id="email_holder">
	<div id="email_list">
		<h1>Newsletter Builder</h1>
		<p>The following will happen for all textareas, also please note the form accepts html. All image links should be paths to akamai/limelight.</p>
		<ul>
			<li>Surrounds paragraphs within &lt;p&gt;&lt;/p&gt; (looks for double line breaks to identify paragraphs).</li>
			<li>Single line breaks are converted to &lt;br /&gt;, except those that appear within &lt;pre&gt; tags.</li>
			<li>Block level elements, like &lt;div&gt; tags, are not wrapped within paragraphs, but their contained text is if it contains paragraphs.</li>
			<li>Quotes are converted to correctly facing curly quote entities, except those that appear within tags.</li>
			<li>Apostrophes are converted to curly apostrophe entities.</li>
			<li>Double dashes (either like -- this or like--this) are converted to em-dashes.</li>
			<li>Three consecutive periods either preceding or following a word are converted to ellipsis.</li>
			<li>Double spaces following sentences are converted to non-breaking spaces to mimic double spacing.</li>
		</ul>
		<div id="error_message" class="message_error messages"></div>
		<!--<table cellpadding="0" cellspacing="0" border="0">
			<tr>
				<td>&nbsp;</td>
			</tr>
			<tr>
				<td class="full" colspan="4">
					<p><select name="newsletter_month"><?php //echo $months; ?></select> <select name="newsletter_day"><?php //echo $days; ?></select> <select name="newsletter_year"><?php //echo $years; ?></select> <a href="/index.php/email_builder/sample_newsletter">Sample</a></p>
					
					<p>Upsell: <input type="radio" value="yes" name="upsell" /> yes <input type="radio" value="no" name="upsell" /> no<br />
					Podcasts: <input type="radio" value="yes" name="podcasts" /> yes <input type="radio" value="no" name="podcasts" /> no</p>

					<p>Letter image<br />
					<input type="text" value="" name="letter_image" /></p>
										
					<p>Letter<br />
					<textarea style="width: 100%;height: 150px;" name="letter"></textarea></p>
																			
					<p>New Releases (@@@ after subjects + sets, @@ after each release, @ separated for releases.)<br />
					<textarea style="width: 500px;height: 150px;" name="new_releases"></textarea></p>
					
					<p>Training Coming Soon (@ separated list)<br />
					<textarea style="width: 500px;height: 150px;" name="training_coming_soon"></textarea></p>
					
					<p>Testimonials of the month 1<br />
					<textarea style="width: 500px;height: 50px;" name="testimonials_of_the_month"></textarea></p>
					<p>Testimonials of the month 2<br />
					<textarea style="width: 500px;height: 50px;" name="testimonials_of_the_month_2"></textarea></p>
					
					<p>Tip of the month text<br />
					<textarea style="width: 500px;height: 150px;" name="tip_of_the_month_text"></textarea></p>
															
					<p><?php //echo form_submit('submit', 'Build'); ?></p>-->
										
					<h2 class="anchor">General Information</h2>
					<div class="section">
						<div class="pod">
							<table cellpadding="0" cellspacing="0" border="0">
								<tr>
									<td>
										<h3>Is this a Archive?</h3>
										<p><input type="radio" value="yes" name="is_archive" /> yes <input type="radio" value="no" name="is_archive" checked="checked" /> no</p>
										
										<h3>Who is sending it?</h3>
										<p>Please add ___<input type="text" name="sender_text" class="small" value="news@email.lynda.com" />____ to your address book</p>
										
										<h3>Send Date:</h3>
										<p><select name="newsletter_month"><?php echo $months; ?></select> <select name="newsletter_day"><?php echo $days; ?></select> <select name="newsletter_year"><?php echo $years; ?></select></p>
									</td>
									<td>
										<h3>Intro Text</h3>
										<p><textarea name="intro_text">Hello, <a style="color: #ff0000;text-decoration: none;">lynda.com</a> newsletter subscriber! Welcome to our <?php echo date("F"); ?> 2011 newsletter.</textarea></p>			
									</td>
								</tr>
							</table>
							<div class="pod_help"><a href="javascript: void(0);">Help</a><div class="pod_help_text">This is help blah blah blah</div></div>
						</div>
					</div>
					<h2>Letter</h2>
					<div class="section">
						<div class="pod">
							<table cellpadding="0" cellspacing="0" border="0">
								<tr>
									<td>
										<h3>Letter intro</h3>
										<p><textarea name="letter_intro"></textarea></p>		
									</td>
									<td>
										<h3>Letter image</h3>
										<p><input type="text" name="letter_image" /></p>
										<h3>Signature</h3>
										<p><input type="text" name="letter_signiture" /></p>
									</td>
								</tr>
							</table>
								
							<div class="pod_help"><a href="javascript: void(0);">Help</a><div class="pod_help_text">This is help blah blah blah</div></div>
						</div>
						<div class="pod">
							<h3>Story Creator</h3>
							<!--<p>
								<select name="stories" id="stories">
									<option value="story_1_image">1 Image</option>
									<option value="story_2_image">2 Image</option>
									<option value="story_3_image">3 Image</option>
									<option value="story_custom">Custom HTML</option>									
								</select>
							</p>
							<div id="story_list">
							</div>-->
							<div>
								<table cellpadding="0" cellspacing="0" border="0" id="story_content"></table>
							</div>
							Add some stories?
							<select name="add_story" id="add_story">
								<option value="0">none</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
								<option value="11">11</option>
							</select>
							<input type="hidden" name="story_count" id="story_count" value="0" /><br /><br /><br /><br /><br />
							<!--
							<p>
		•	Story
			•	1 image
				o	Trailer (IF)
				o	Caption/Image
					•	Caption (IF)
					•	Image (RI)
						•	Above/Below 
				o	Text (TA)	
			•	2 image 
				o	Trailer (IF)
				o	Text (TA)
			•	3 image 
				o	Trailer (IF) 
				o	Text (TA)
			•	Custom HTML (TA)
			•	Signature (TA)</p>
							-->	
							<div class="pod_help"><a href="javascript: void(0);">Help</a><div class="pod_help_text">This is help blah blah blah</div></div>
						</div>
					</div>
					</div>
					<h2>New Releases</h2>
					<div class="section">
						<div class="pod">
							<h3>New Releases</h3>
							<p>(@@@ after subjects + sets, @@ after each release, @ separated for releases.)</p>
							<p><textarea name="new_releases" class="large"></textarea></p>	
							<div class="pod_help"><a href="javascript: void(0);">Example</a><div class="pod_help_text">This is help blah blah blah</div></div>
						</div>
					</div>
					<h2>Podcasts / Training Coming Soon</h2>
					<div class="section">
						<div class="pod">							
							<table cellpadding="0" cellspacing="0" border="0">
								<tr>
									<td><h3>Podcasts</h3><p>&nbsp;</p></td>
									<td><h3>Training Coming Soon</h3><p>@ separated list.</p></td>
								</tr>
								<tr>
									<td><textarea name="podcasts"></textarea></td>
									<td><textarea name="coming_soon"></textarea></td>
								</tr>
							</table>	
							<p></p>						
							<div class="pod_help"><a href="javascript: void(0);">Help</a><div class="pod_help_text">This is help blah blah blah</div></div>
						</div>
					</div>
					<h2>Testimonials / Tweets</h2>
					<div class="section">
						<div class="pod">
							<h3>Testimonials</h3>
							<p>If the second is left blank (newsletter will show Testimonial)</p>
							<table cellpadding="0" cellspacing="0" border="0">
								<tr>
									<td>Testimonial 1</td>
									<td>Testimonial 2</td>
								</tr>
								<tr>
									<td><textarea name="testimonial_1"></textarea></td>
									<td><textarea name="testimonial_2"></textarea></td>
								</tr>
							</table>				
							<div class="pod_help"><a href="javascript: void(0);">Help</a><div class="pod_help_text">This is help blah blah blah</div></div>
						</div>
						<div class="pod">
							<h3>Tweets</h3>
							<p>If the second is left blank (newsletter will show Tweet)</p>
							<table cellpadding="0" cellspacing="0" border="0">
								<tr>
									<td>Tweet 1</td>
									<td>Tweet 2</td>
								</tr>
								<tr>
									<td><textarea name="tweet_1"></textarea></td>
									<td><textarea name="tweet_2"></textarea></td>
								</tr>
							</table>			
							<div class="pod_help"><a href="javascript: void(0);">Help</a><div class="pod_help_text">This is help blah blah blah</div></div>
						</div>
					</div>
					<h2>Tip of the Month</h2>
					<div class="section">
						<div class="pod">
							<h3>Tip of the month</h3>
							<table cellpadding="0" cellspacing="0" border="0">
								<tr>
									<td>Caption:<br /><textarea name="tip_caption"></textarea></td>
									<td>Text:<br /><textarea name="tip_text"></textarea></td>
								</tr>
								<tr>
									<td>Link:<br /><input type="text" name="tip_link" /></td>
									<td>Image:<br /><input type="text" name="tip_image" /></td>
								</tr>
								<tr>
									<td>Course Name:<br /><input type="text" name="tip_course" /></td>
									<td>&nbsp;</td>
								</tr>
							</table>			
							<div class="pod_help"><a href="javascript: void(0);">Help</a><div class="pod_help_text">This is help blah blah blah</div></div>
						</div>
					</div>
					<h2>Footer</h2>
					<div class="section">
						<!--<div class="pod">
							<h3>Footer</h3>
							<textarea name="footer"></textarea>					
							<div class="pod_help"><a href="javascript: void(0);">Help</a><div class="pod_help_text">This is help blah blah blah</div></div>
						</div>		
						<div class="pod">
							<h3>Footer Links</h3>
							<textarea name="footer_links"></textarea>						
							<div class="pod_help"><a href="javascript: void(0);">Help</a><div class="pod_help_text">This is help blah blah blah</div></div>
						</div>-->
						<div class="pod">
							<table cellpadding="0" cellspacing="0" border="0">
								<tr>
									<td><h3>Social Networking Icons</h3></td>
									<td><h3>Copyright</h3></td>
								</tr>
								<tr>
									<td><textarea name="social"><p style="margin: 40px 0 40px 0; padding: 0; color: #7C2100; text-decoration: none; text-align: center;">
					<a href="http://twitter.com/lyndadotcom" alias="Twitter-img"><img src="http://files2.lynda.com/files/lol_email/sa/twitter-16x16.jpg" border="0" width="16" height="16" style="border: 0; display: inline; margin: 0 3px 0 0; padding: 0; text-decoration: none; vertical-align: middle;" alt="" /></a>
					<a style="color: #000; text-decoration: underline;" href="http://twitter.com/lyndadotcom" alias="Twitter-txt" class="links">Follow us on Twitter</a>
					<a href="http://www.facebook.com/lyndadotcom" alias="Facebook-img"><img style="border: 0; display: inline; margin: 0 3px 0 10px; padding: 0; text-decoration: none; vertical-align: middle;" src="http://files2.lynda.com/files/lol_email/sa/facebook-16x16.jpg" border="0"  width="16" height="16" alt="Facebook" /></a>

					<a style="color: #000; text-decoration: underline;" href="http://www.facebook.com/lyndadotcom" alias="Facebook-txt" class="links">Like us on Facebook</a>
					<a href="%%=GetSocialPublishURL('10','SharePasteHTML')=%%" alias="ShareThis-img"><img style="border: 0; display: inline; margin: 0 3px 0 10px; padding: 0; text-decoration: none; vertical-align: middle;" src="http://files2.lynda.com/files/lol_email/sa/sharethis-16x16.png" alt="ShareThis"   border="0" width="16" height="16" /></a>
					<a style="color: #000; text-decoration: underline;" href="%%=GetSocialPublishURL('10','SharePasteHTML')=%%" alias="ShareThis-txt" class="links">Share via ShareThis</a>
				</p></textarea></td>
									<td><textarea name="copyright"><p style="margin:0px;">Thanks very much for reading our news.<br /></p>
			              <p style="margin:0px;"><strong>We forever appreciate your support. Happy learning!</strong></p>
            			  <p style="margin:0px;">&copy; 1998-2011 <a href="#nogo" style="color:#000;text-decoration:none;">lynda.com</a>, inc. All rights reserved.<br />
    						For questions regarding anything in this newsletter, please send an email to: <a style="color: #000; text-decoration: underline;" href="mailto:marketing@lynda.com" alias="marketing@lynda.com" class="links">marketing@lynda.com</a></p></textarea></td>
								</tr>
							</table>				
							<div class="pod_help"><a href="javascript: void(0);">Help</a><div class="pod_help_text">This is help blah blah blah</div></div>
						</div>
						<div class="pod">
							<table cellpadding="0" cellspacing="0" border="0">
								<tr>
									<td><h3>Address</h3></td>
									<td><h3>Manage</h3></td>
								</tr>
								<tr>
									<td><textarea name="address">This email was sent by: <b>%%Member_Busname%%</b><br />%%Member_Addr%% %%Member_City%%, %%Member_State%%, %%Member_PostalCode%%, %%Member_Country%%<br /><br /></textarea></td>
									<td><textarea name="manage">This email was intended for %%emailaddr%%.<br />To manage your subscription preferences or to unsubscribe, <a style="color: #444;" href="%%profile_center_url%%" alias="profile center" class="links">go here</a>.</textarea></td>
								</tr>
							</table>			
							<div class="pod_help"><a href="javascript: void(0);">Help</a><div class="pod_help_text">This is help blah blah blah</div></div>
						</div>			
					</div>
					<h2>Tracking Links</h2>
					<div class="section">
						<div class="pod">
							<h3>Add Tracking Links?</h3>
							<table cellpadding="0" cellspacing="0" border="0" class="small">
								<tr>
									<td>Letter Tracking codes: </td>
									<td><input type="text" name="tracking_letter" value="" /></td>
								</tr>
								<tr>
									<td>Default: </td>
									<td><input type="text" name="tracking_default" value="" /></td>
								</tr>
								<tr>
									<td>Tip: </td>
									<td><input type="text" name="tracking_tip" value="" /></td>
								</tr>
							</table>	
							<div class="pod_help"><a href="javascript: void(0);">Help</a><div class="pod_help_text">This is help blah blah blah</div></div>
						</div>
					</div>
					<p>&nbsp;</p>
					<input type="submit" value="Generate" name="generate" id="generate" />
				<!--</td>
			</tr>
			<tr>
				<td>&nbsp;</td>
			</tr>
		</table>-->
	</div>
</div>
</form>