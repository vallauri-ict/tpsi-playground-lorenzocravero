<?php

    require("php-mysqli.php");

    //step 1: lettura dei parametri
    //null

    //step 2: iniziare la connessione
    $con = _connection();

    //step 3: esecuzione query
    $sql = "SELECT cBanca,Nome FROM banche";
    $rs = _execute($con,$sql);

    //step 4: restituzione dei parametri
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