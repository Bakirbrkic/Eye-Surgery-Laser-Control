<?php

if ($_REQUEST['task'] == "get") {

	if(file_exists("../device/time")){

		$timeFile = fopen("../device/time", "r");

		$value = fread($timeFile, filesize("../device/time"));

		echo '{"lifeTime":'.$value.'}';

	} else {
		echo '{"msg":"Time is not available"}';
	}

} else if ($_REQUEST['task'] == "set") {
	if(file_exists("../device/time")){

		$timeFile = fopen("../device/time", "w");
		$data = urldecode($_REQUEST['ftime']);
		fwrite($timeFile, $data);
		fclose($timeFile);

		$timeFile = fopen("../device/time", "r");

		$value = fread($timeFile, filesize("../device/time"));

		echo '{"msg":"Time updated", "values":'.$value.'}';
	} else {
		echo '{"msg":"Time is not valid or can not be updated"}';
	}
}

?>