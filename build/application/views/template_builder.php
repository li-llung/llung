<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<?php echo $css; ?>
	<META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW">
	<script type="http://code.jquery.com/jquery-1.4.4.min.js"></script>
	<title></title>
	<script type="text/javascript">
		$(document).ready(function() {
			
		});
	</script>
</head>
<body>
<div id="email_holder">
	<div id="email_list">
		<h1><img src="http://files2.lynda.com/files/lol_ui/ui/images/lynda-logo-on-blk.gif" alt="" width="75" /> Email Generator</h1>		
		<p>Used to create a basic sales email.</p>
		<table cellpadding="0" cellspacing="" border="0">
			<tr>
				<td>				
					<?php echo form_open('template_builder/build'); ?>
						<table cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td>Sender:</td>
								<td style="text-align: left;"><?php echo form_input('sender', '@lynda.com'); ?></td>
							</tr>
							<!--<tr>
								<td>Send Date:</td>
								<td style="text-align: left;"><?php echo form_input('send_date', ''); ?> Example: (01142011)</td>
							</tr>-->
							<tr>
								<td>Tracking code:</td>
								<td style="text-align: left;">?<?php echo form_input('tracking_code', ''); ?></td>
							</tr>
							<tr>
								<td>Help Link:</td>
								<td style="text-align: left;"><?php echo form_input('help_link', 'cs@lynda.com'); ?></td>
							</tr>
							<tr>
								<td>Subscription Link:</td>
								<td style="text-align: left;">
									<?php
									$options = array(
					                  'profile_center_url'  => 'profile_center_url',
					                  'subscription_center_url'    => 'subscription_center_url',
					                  'unsubscribe_url'   => 'unsubscribe_url'
					                );
									
									echo form_dropdown('subscription_link', $options);
									
									?>
								</td>
							</tr>
							<tr>
								<td class="tcenter"><?php echo form_submit('submit', 'Build'); ?></td>
							</tr>
						</table>
					</form>
				</td>
			</tr>
		</table>
	</div>
</div>
</body>
</html>