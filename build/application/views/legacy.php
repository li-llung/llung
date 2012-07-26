<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<?php echo $css; ?>
	<META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW">
	<!--<link rel="stylesheet" href="http:/www.lynda.com/ui/ui/styles/reset.css" type="text/css" charset="utf-8" />-->
	<title>The lynda.com Email Generator</title>
</head>
<body>
<div id="email_holder">
	<div id="email_list">
		<h1><img src="http://files2.lynda.com/files/lol_ui/ui/images/lynda-logo-on-blk.gif" alt="" width="75" /> Email Generator</h1>		
		<p>Select a month to generate the newsletter for the month selected or click view to see sample.</p>
		<table cellpadding="0" cellspacing="" border="0">
			<tr>
				<td>
					<?php echo form_open('email_builder/build_newsletter'); ?>
					<table cellpadding="0" cellspacing="0" border="0">
						<!--<tr>
							<td colspan="5"><h3>Monthly Newsletter</h3></td>
						</tr>
						<tr>
							<td><select name="months"><?php echo $months; ?></select></td>
							<td>&nbsp;or&nbsp;</td>
							<td><a href="/index.php/email_builder/newsletter" class="email_link">Build</a></td>
							<td class="yellow">&nbsp;|&nbsp;</td>
							<td><a href="/index.php/email_builder/sample_newsletter" class="email_link">Sample</a></td>
						</tr>
						<tr>
							<td colspan="5"><h3>Enterprise Newsletter</h3></td>
						</tr>
						<tr>
							<td><select name="months"><?php echo $months; ?></select></td>
							<td>&nbsp;or&nbsp;</td>
							<td><a href="/index.php/email_builder/enterprise" class="email_link">Build</a></td>
							<td class="yellow">&nbsp;|&nbsp;</td>
							<td><a href="/index.php/email_builder/sample_enterprise" class="email_link">Sample</a></td>
						</tr>-->
						<tr>
							<td colspan="4"><h3>Newsletter Generator</h3></td>
						</tr>
						<tr>
							<td class="full" colspan="4">
								<select name="newsletter_type">
									<option value="--">--Select--</option>
									<!--<option value="academic">Academic</option>
									<option value="enterprise">Enterprise</option>-->
									<option value="newsletter">Monthly</option>
								</select><br />
								<select name="newsletter_month"><?php echo $months; ?></select><select name="newsletter_day"><?php echo $days; ?></select><select name="newsletter_year"><?php echo $years; ?></select><br />
								
								Upsell: <input type="radio" value="yes" name="upsell" /> yes <input type="radio" value="no" name="upsell" /> no<br />
								Podcasts: <input type="radio" value="yes" name="podcasts" /> yes <input type="radio" value="no" name="podcasts" /> no<br />
								
								<!--<h4>Sample:</h4>
								<a href="/index.php/email_builder/sample_academic">Academic</a> | <a href="/index.php/email_builder/sample_enterprise">Enterprise</a> | --><!--<a href="/index.php/email_builder/sample_newsletter">Monthly</a><br /><br />
								<?php echo form_submit('submit', 'Build'); ?>-->
							</td>
						</tr>
						<tr>
							<td colspan="4"><a href="/build/index.php/email_builder/build_newsletter">Build</a></td>
						</tr>
						<tr>
							<td colspan="4"><h3>Reseller Annoucement</h3></td>
						</tr>
						<tr>
							<td class="full">&nbsp;</td>
							<td><a href="/build/index.php/email_builder/reseller/build" class="email_link">Build</a></td>
							<td class="yellow">&nbsp;|&nbsp;</td>
							<td><a href="/build/index.php/email_builder/sample_reseller" class="email_link">Sample</a></td>
						</tr>
						<tr>
							<td colspan="4"><h3>Subscriber Announcement</h3></td>
						</tr>
						<tr>
							<td class="full">&nbsp;</td>
							<td nowrap><a href="/build/index.php/email_builder/subscriber/no" class="email_link">Build</a> | <a href="/build/index.php/email_builder/subscriber_upsell/no" class="email_link">Build w/ Upsell</a>
							<br /><br />
							<a href="/build/index.php/email_builder/subscriber/yes" class="email_link">Build with New Images</a></td>
							<td class="yellow">&nbsp;|&nbsp;</td>
							<td><a href="/build/index.php/email_builder/sample_subscriber" class="email_link">Sample</a></td>
						</tr>
					</table>
					</form>
				</td>
				<td>
					<?php echo form_open('email_builder/build'); ?>
					<table cellpadding="0" cellspacing="0" border="0">
						<tr>
							<td><h3>Course Trailer List Generator</h3></td>
						</tr>
						<tr>
							<td><a href="/build/index.php/email_builder/build_trailer_list">Build List</a></td>
						</tr>
						<tr>
							<td><h3>Course Trailer Generator</h3></td>
						</tr>
						<tr>
							<td>Format: title,video ID,course ID - a slash is used as the delimeter.</td>
						</tr>
						<tr>
							<td><textarea name="trailer_id" class="large_inputs"></textarea></td>
						</tr>
						<tr>
							<td class="tright"><?php echo form_submit('submit', 'Build'); ?><span class="yellow">&nbsp;|&nbsp;</span><a href="/build/index.php/email_builder/sample_trailers" class="email_link">Sample</a></td>
						</tr>
					</table>
					</form>
				</td>
			</tr>
			<tr>
				<td>&nbsp;</td>
			</tr>
		</table>
	</div>
</div>
<!--
<div id="container">
	<div id="bar">
		<div id="header">
			<div id="inner_header">
				<div id="logo"><a href="http://www.lynda.com">lynda.com</a></div>
				<div id="nav">
					<ul class="main-links">
						<li class="with-sub-menu first"><a href="#nogo" id="monthly">Monthly</a></li>
						<li class="with-sub-menu"><a href="#nogo" id="subscriber">Subscriber</a></li>
						<li><a href="#nogo" id="resller">Reseller</a></li>
						<li class="with-sub-menu"><a href="#nogo" id="sales">Sales</a></li>
						<li class="with-sub-menu"><a href="#nogo" id="course_trailers">Trailers</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div id="main_body">	
		<div id="main_content">
			<h1>Template Builder: </h1>
			<p>What are we building?</p>-->
			<!--Advanced
			<div id="template_box">
				<div class="template_item">
					<h2>Subscriber Announcement</h2>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed mauris vel justo blandit lacinia nec nec ante. In a pharetra lectus. In hendrerit viverra gravida. Etiam est magna, euismod faucibus tempor sodales, aliquet sed dui. Morbi sit amet metus massa, quis aliquam erat. Pellentesque dictum ullamcorper neque sed tincidunt.
					<p><a href="#nogo">build</a>&nbsp;|&nbsp;<a href="#nogo">build with upsell</a>&nbsp;|&nbsp;<a href="#nogo">sample</a></p>
				</div>			
				<div class="template_item">
					<h2>Reseller Announcement</h2>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed mauris vel justo blandit lacinia nec nec ante. In a pharetra lectus. In hendrerit viverra gravida. Etiam est magna, euismod faucibus tempor sodales, aliquet sed dui. Morbi sit amet metus massa, quis aliquam erat. Pellentesque dictum ullamcorper neque sed tincidunt.
					<p><a href="#nogo">build</a>&nbsp;|&nbsp;<a href="#nogo">sample</a></p>
				</div>			
				<div class="template_item">
					<h2>Monthly Newsletter</h2>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed mauris vel justo blandit lacinia nec nec ante. In a pharetra lectus. In hendrerit viverra gravida. Etiam est magna, euismod faucibus tempor sodales, aliquet sed dui. Morbi sit amet metus massa, quis aliquam erat. Pellentesque dictum ullamcorper neque sed tincidunt.
					<p><a href="#nogo">build</a>&nbsp;|&nbsp;<a href="#nogo">build with upsell</a>&nbsp;|&nbsp;<a href="#nogo">sample</a></p>
				</div>			
				<div class="template_item">
					<h2>Sales Email</h2>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed mauris vel justo blandit lacinia nec nec ante. In a pharetra lectus. In hendrerit viverra gravida. Etiam est magna, euismod faucibus tempor sodales, aliquet sed dui. Morbi sit amet metus massa, quis aliquam erat. Pellentesque dictum ullamcorper neque sed tincidunt.
					<p><a href="#nogo">build</a></p>
				</div>			
				<div class="template_item">
					<h2>Trailers</h2>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed mauris vel justo blandit lacinia nec nec ante. In a pharetra lectus. In hendrerit viverra gravida. Etiam est magna, euismod faucibus tempor sodales, aliquet sed dui. Morbi sit amet metus massa, quis aliquam erat. Pellentesque dictum ullamcorper neque sed tincidunt.
					<p><a href="#nogo">for generator</a>&nbsp;|&nbsp;<a href="#nogo">titles</a>&nbsp;|&nbsp;<a href="#nogo">titles (comma seperated)</a>&nbsp;|&nbsp;<a href="#nogo">list</a></p>
				</div>
				<div class="clear">&nbsp;</div>
			</div>-->
			<!--Advanced-->
			<!--Simple
			<div id="template_box">
				<div class="template_item">
					<h2><input type="radio" name="template_builder" id="subscriber_announcement" value="subscriber_announcement" /> <label for="subscriber_announcement">Subscriber Announcement</label></h2><label for="subscriber_announcement">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed mauris vel justo blandit lacinia nec nec ante. In a pharetra lectus. In hendrerit viverra gravida. Etiam est magna, euismod faucibus tempor sodales, aliquet sed dui. Morbi sit amet metus massa, quis aliquam erat. Pellentesque dictum ullamcorper neque sed tincidunt.</label>
				</div>			
				<div class="template_item">
					<h2><input type="radio" name="template_builder" id="reseller_announcement" value="reseller_announcement" /> <label for="reseller_announcement">Reseller Announcement</label></h2>
					<label for="reseller_announcement">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed mauris vel justo blandit lacinia nec nec ante. In a pharetra lectus. In hendrerit viverra gravida. Etiam est magna, euismod faucibus tempor sodales, aliquet sed dui. Morbi sit amet metus massa, quis aliquam erat. Pellentesque dictum ullamcorper neque sed tincidunt.</label>
				</div>			
				<div class="template_item">
					<h2><input type="radio" name="template_builder" id="monthly_newsletter" value="monthly_newsletter" /> <label for="monthly_newsletter">Monthly Newsletter</label></h2>
					<label for="monthly_newsletter">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed mauris vel justo blandit lacinia nec nec ante. In a pharetra lectus. In hendrerit viverra gravida. Etiam est magna, euismod faucibus tempor sodales, aliquet sed dui. Morbi sit amet metus massa, quis aliquam erat. Pellentesque dictum ullamcorper neque sed tincidunt.</label>
				</div>			
				<div class="template_item">
					<h2><input type="radio" name="template_builder" id="sales_email" value="sales_email" /> <label for="sales_email">Sales Email</label></h2>
					<label for="sales_email">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed mauris vel justo blandit lacinia nec nec ante. In a pharetra lectus. In hendrerit viverra gravida. Etiam est magna, euismod faucibus tempor sodales, aliquet sed dui. Morbi sit amet metus massa, quis aliquam erat. Pellentesque dictum ullamcorper neque sed tincidunt.</label>
				</div>			
				<div class="template_item">
					<h2><input type="radio" name="template_builder" id="trailers" value="trailers" /> <label for="trailers">Trailers</label></h2>
					<label for="trailers">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed mauris vel justo blandit lacinia nec nec ante. In a pharetra lectus. In hendrerit viverra gravida. Etiam est magna, euismod faucibus tempor sodales, aliquet sed dui. Morbi sit amet metus massa, quis aliquam erat. Pellentesque dictum ullamcorper neque sed tincidunt.</label>
				</div>
				<div class="clear">&nbsp;</div>
			</div>
			<p><input type="submit" name="submit" value="Build" /></p>-->
			<!--Simple
			<div class="clear">&nbsp;</div>
		</div>
	</div>
	<div id="footer">
		<div id="inner_footer">
			<p>Copyright &copy; 1995-2011 lynda.com, Inc. All rights reserved.</p>
		</div>
	</div>
	<div class="sub" id="sub_subscriber">
		<ul>
			<li><a href="#nogo">Build</a></li>
			<li><a href="#nogo">Build with Upsell</a></li>
			<li><a href="#nogo">Sample</a></li>
		</ul>
	</div>
	<div class="sub" id="sub_reseller">
		<ul>
			<li><a href="#nogo">Build</a></li>
		</ul>
	</div>
	<div class="sub" id="sub_monthly">
		<ul>
			<li><a href="#nogo">Build</a></li>
			<li><a href="#nogo">Build with Upsell</a></li>
			<li><a href="#nogo">Sample</a></li>
		</ul>
	</div>
	<div class="sub" id="sub_sales">
		<ul>
			<li><a href="#nogo">Build</a></li>
		</ul>
	</div>
	<div class="sub" id="sub_course_trailers">
		<ul>
			<li><a href="#nogo">for generator</a></li>
			<li><a href="#nogo">titles</a></li>
			<li><a href="#nogo">titles (comma seperated)</a></li>
			<li><a href="#nogo">list</a></li>
		</ul>
	</div>
</div>
<script type="text/javascript" src="http://code.jquery.com/jquery-1.6.4.min.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	$('.main-links a').each(function(index,elem) {
		var sub_id = $(this).attr("id");
		$(this).mouseenter(function() {		
			$('.sub').each(function() {
			   $(this).hide();
			});
			$("#sub_" + sub_id).show();
			$("#sub_" + sub_id).css('left',$(this).offset().left);
		});
		$("#sub_" + sub_id).mouseleave(function() {	
			$("#sub_" + sub_id).hide();
		});
	});
});
</script>-->
</body>
</html>