<?php
	
	if ($_REQUEST['task'] == "register") {

		if(!file_exists("../users/".$_REQUEST['fname'])){

			$profile = fopen("../users/".$_REQUEST['fname'], "w");
			$data = '{"name":"'.$_REQUEST['fname'].'", "totalTime":0, "lastTime":0}';
			fwrite($profile, $data);
			fclose($profile);
			echo '{"msg":"Profile '.$_REQUEST['fname'].' created with initial values"}';
		} else {
			echo '{"msg":"Profile '.$_REQUEST['fname'].' already exists"}';
		}

	} else if ($_REQUEST['task'] == "update") {
		
		if(file_exists("../users/".$_REQUEST['fname'])){

			$profile = fopen("../users/".$_REQUEST['fname'], "w");
			$data = urldecode($_REQUEST['fdata']);
			fwrite($profile, $data);
			fclose($profile);

			$profile = fopen("../users/".$_REQUEST['fname'], "r");
			
			$values = fread($profile, filesize("../users/".$_REQUEST['fname']));
			
			echo '{"msg":"Profile '.$_REQUEST['fname'].' updated", "values":'.$values.'}';
		} else {
			echo '{"msg":"Profile '.$_REQUEST['fname'].' is not valid or can not be updated"}';
		}

	} else if ($_REQUEST['task'] == "listAll") {

		$path    = '../users';
		$files = scandir($path);
		$files = array_diff(scandir($path), array('.', '..'));
		echo('{"profiles":'.json_encode(array_values($files)).'}');
	
	} else if ($_REQUEST['task'] == "load") {
		
		if(file_exists("../users/".$_REQUEST['fname'])){

			$profile = fopen("../users/".$_REQUEST['fname'], "r");
			
			$values = fread($profile, filesize("../users/".$_REQUEST['fname']));
			
			echo '{"msg":"Profile '.$_REQUEST['fname'].' loaded", "values":'.$values.'}';
		} else {
			echo '{"msg":"Profile '.$_REQUEST['fname'].' is not available"}';
		}

	} else if ($_REQUEST['task'] == "remove") {
		# code...
	}
?>

