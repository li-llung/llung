<?php
	(isset($_REQUEST['num']))? $num = $_REQUEST['num']: $num = 0;
	$number = '';
	for ($i = 1; $i <= 8000; $i++) {
		$numbers .= $i.',';
	}
	if($num > 0){
		echo substr($numbers , 0 , $num);
	}else{
		echo $numbers;
	}
?>