<h1>Sales Email</h1>
<p>content for sales email</p>			
<?php echo form_open('sales/build'); ?>
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