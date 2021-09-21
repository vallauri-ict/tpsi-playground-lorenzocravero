<?php
	header("content-type:application/json; charset=utf-8");
	require("php-mysqli.php");
	
	// step 0 controllo session
	_checkSession("cCorrentista");
	
	$cCorrentista = $_SESSION["cCorrentista"];
	
	$con = _connection();
	
    $sql = "SELECT filiali.Nome, filiali.cFiliale FROM conti, filiali WHERE conti.cFiliale = filiali.cFiliale AND conti.cCorrentista = $cCorrentista";
    
	$rs = _execute($con,$sql);
    
	// count conta il numero di valori in un vettore enumerativo
	if ($rs)
	{
		echo(json_encode($rs));
    }
	else
	{
		http_response_code(500);
	    $con->close();
        die("Errore esecuzione query");
	}
    
	$con->close();
?>