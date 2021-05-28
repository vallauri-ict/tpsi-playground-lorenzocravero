<?php
    header("content-type:application/json; charset=utf-8");
    require("php-mysqli.php");

    //step 1: lettura dei parametri e controlli
    if(isset($_REQUEST["cBanca"]))
    {
        $cBanca = $_REQUEST["cBanca"];
    }
    else
    {
        http_response_code(400);
        die("Parametro mancante: id");
    }

    //step 2: connessione
    $con = _connection();

    //step 3: esecuzione query
    $sql = "SELECT cFiliale,Nome FROM filiali WHERE cBanca=$cBanca";
    $rs=_execute($con,$sql);

    //step 4: resituzione dati(non visualizazione perchè c'è una richiesta in corso)
    if($rs)
    {
        echo(json_encode(($rs)));
    }
    else
    {
        http_response_code(500);
        die("Errore nell'esecuzione della query");
    }

    //step 5: 
    $con->close();
?>