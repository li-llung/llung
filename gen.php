<!DOCTYPE html>
<html>
<head>
    <title>API settings gen</title>
</head>
<body>
<?php
	if(isset($_REQUEST['LyndaMigration'])){

	}
	$LyndaMigration = '';
	$LyndaLog = '';
	$LyndaProducts = '';
	$LyndaExternal = '';
	$Lynda = '';
	$LyndaDWMarketSegmentation = '';
	$LyndaDW = '';
	$LyndaReports = '';
	$LyndaQueue = '';

	$dataSource = $_REQUEST['type'];

	if($dataSource == "ldc-webdev-02.ldcint.com"){
		$initialCatalog = '';
		$sqlAuthentication = 'True';
		$userD = '';
		$password = 'test';
	}else{
		$initialCatalog = '';
		$sqlAuthentication = 'True';
		$userD = 'lyndauser';
		$password = 'lyndauser';
	}

	$conn = '<textarea cols="200" rows="12">';
	$conn .= '<connectionStrings>' . "\r\n";
		if(isset($_REQUEST['LyndaMigration'])){
			$conn .= "\t". '<LyndaMigration dataSource="'.$dataSource.'" initialCatalog="'.$initialCatalog.'" sqlAuthentication="'.$sqlAuthentication.'" userD="'.$userD.'" password="'.$password.'"/>' . "\r\n";
		}
		if(isset($_REQUEST['LyndaLog'])){
			$conn .= "\t". '<LyndaLog dataSource="'.$dataSource.'" initialCatalog="'.$initialCatalog.'" sqlAuthentication="'.$sqlAuthentication.'" userD="'.$userD.'" password="'.$password.'"/>' . "\r\n";
		}
		if(isset($_REQUEST['LyndaProducts'])){
			$conn .= "\t". '<LyndaProducts dataSource="'.$dataSource.'" initialCatalog="'.$initialCatalog.'" sqlAuthentication="'.$sqlAuthentication.'" userD="'.$userD.'" password="'.$password.'"/>' . "\r\n";
		}
		if(isset($_REQUEST['LyndaExternal'])){
			$conn .= "\t". '<LyndaExternal dataSource="'.$dataSource.'" initialCatalog="'.$initialCatalog.'" sqlAuthentication="'.$sqlAuthentication.'" userD="'.$userD.'" password="'.$password.'"/>' . "\r\n";
		}
		if(isset($_REQUEST['Lynda'])){
			$conn .= "\t". '<Lynda dataSource="'.$dataSource.'" initialCatalog="'.$initialCatalog.'" sqlAuthentication="'.$sqlAuthentication.'" userD="'.$userD.'" password="'.$password.'"/>' . "\r\n";
		}
		if(isset($_REQUEST['LyndaDWMarketSegmentation'])){
			$conn .= "\t". '<LyndaDWMarketSegmentation dataSource="'.$dataSource.'" initialCatalog="'.$initialCatalog.'" sqlAuthentication="'.$sqlAuthentication.'" userD="'.$userD.'" password="'.$password.'"/>' . "\r\n";
		}
		if(isset($_REQUEST['LyndaDW'])){
			$conn .= "\t". '<LyndaDW dataSource="'.$dataSource.'" initialCatalog="'.$initialCatalog.'" sqlAuthentication="'.$sqlAuthentication.'" userD="'.$userD.'" password="'.$password.'"/>' . "\r\n";
		}
		if(isset($_REQUEST['LyndaReports'])){
			$conn .= "\t". '<LyndaReports dataSource="'.$dataSource.'" initialCatalog="'.$initialCatalog.'" sqlAuthentication="'.$sqlAuthentication.'" userD="'.$userD.'" password="'.$password.'"/>' . "\r\n";
		}
		if(isset($_REQUEST['LyndaQueue'])){
			$conn .= "\t". '<LyndaQueue dataSource="'.$dataSource.'" initialCatalog="'.$initialCatalog.'" sqlAuthentication="'.$sqlAuthentication.'" userD="'.$userD.'" password="'.$password.'"/>' . "\r\n";
		}
	$conn .= '</connectionStrings>' . "\r\n";
	$conn .= '</textarea>';
	echo $conn;
?>


<form>


<h5>Type:</h5>
<select name="type">
	<option value="ldc-webdev-02.ldcint.com">DEV</option>
	<option value="192.168.2.11\INSTANCE_2,58513">Integration</option>
</select>

<h5>Include:</h5>
<input type="checkbox" name="LyndaMigration" value="LyndaMigration" <?php echo (isset($_REQUEST['LyndaMigration'])) ? 'CHECKED': '' ?> />LyndaMigration
<input type="checkbox" name="LyndaLog" value="LyndaLog" <?php echo (isset($_REQUEST['LyndaLog'])) ? 'CHECKED': '' ?> />LyndaLog
<input type="checkbox" name="LyndaProducts" value="LyndaProducts" <?php echo (isset($_REQUEST['LyndaProducts'])) ? 'CHECKED': '' ?> />LyndaProducts
<input type="checkbox" name="LyndaExternal" value="LyndaExternal" <?php echo (isset($_REQUEST['LyndaExternal'])) ? 'CHECKED': '' ?> />LyndaExternal
<input type="checkbox" name="Lynda" value="Lynda" <?php echo (isset($_REQUEST['Lynda'])) ? 'CHECKED': '' ?> />Lynda
<input type="checkbox" name="LyndaDWMarketSegmentation" value="LyndaDWMarketSegmentation" <?php echo (isset($_REQUEST['LyndaDWMarketSegmentation'])) ? 'CHECKED': '' ?> />LyndaDWMarketSegmentation
<input type="checkbox" name="LyndaDW" value="LyndaDW" <?php echo (isset($_REQUEST['LyndaDW'])) ? 'CHECKED': '' ?> />LyndaDW
<input type="checkbox" name="LyndaReports" value="LyndaReports" <?php echo (isset($_REQUEST['LyndaReports'])) ? 'CHECKED': '' ?> />LyndaReports
<input type="checkbox" name="LyndaQueue" value="LyndaQueue" <?php echo (isset($_REQUEST['LyndaQueue'])) ? 'CHECKED': '' ?> />LyndaQueue

<h5>Finish</h5>
<input type="submit" name="submit" value="submit" />

</form>









</body>
</html>