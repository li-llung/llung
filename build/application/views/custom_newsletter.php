<?php echo form_open('/monthly/clean'); ?>
<h1>Newsletter Content Cleaner</h1>
<p>paste in some HTML code it will be sanitized and spit out.</p>
<?php if($this->uri->segment(2, 0)=="clean" || isset($_REQUEST['content'])){ ?>
<p><textarea cols="100" rows="30" name="content"><?php echo $content; ?></textarea></p>
<?php } else { ?>
<p><textarea cols="100" rows="30" name="content"></textarea></p>
<?php } ?>
<br /><p><?php echo form_submit('submit','Build'); ?></p>
</form>