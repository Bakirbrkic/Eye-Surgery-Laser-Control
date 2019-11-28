<?php  

	$lightAmount = 0;

	if ($_REQUEST['task'] == "setup") {
			
		shell_exec("gpio mode 24 pwm");
		shell_exec("gpio mode 25 output");
		$lightAmount = 0;
		echo "pins set to pwm and output light amount 0";

	}
	else if ($_REQUEST['task'] == "dim") {
		
		$lightAmount = intval((1023/100)*intval($_REQUEST['amount']));
		echo "lightAmount is: ".$lightAmount;
		shell_exec("gpio pwm 24 ".$lightAmount);

	}
	else if ($_REQUEST['task'] == "blue") {
		
		shell_exec("gpio write 25 ".$_REQUEST['power']);
		echo "blue switched to ".$_REQUEST['power'];

	}
	else if ($_REQUEST['task'] == "checkConnection") {
			
		echo "it works";

	}

?>