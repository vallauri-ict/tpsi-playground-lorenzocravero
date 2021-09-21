<?php
    require("php-mysqli.php");

    //step 1: lettura e controllo dei parametri
    if(isset($_REQUEST["cBanca"]))
    {
        $cBanca = $_REQUEST["cBanca"];
    }
    else
    {
        die("Parametro mancante: cBanca");
    }

    //step 2: apertura connessione
    $con = _connection();

    //step 3: esecuzione query
    $sql = "SELECT cFiliale,Nome FROM filiali WHERE cBanca=$cBanca";
    $rs = _execute($con,$sql);

    //step 4: restituzione dei dati
    if($rs)
    {
        echo(json_encode($rs));
    }
    else
    {
        die("Errore nell'esecuzione della query");
        $con->close();
    }

    //step 5: chiusura connessione
    $con->close();
?>