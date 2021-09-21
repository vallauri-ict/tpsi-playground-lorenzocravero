<?php

    require("php-mysqli.php");

    //step 1: parametri
    if(isset($_REQUEST["id"]))
    {
        $id = $_REQUEST["id"];
    }
    else
    {
        die("Parametro mancante: id");
    }

    //step 2: apertura connessione
    $con = _connection();

    //step 3: esecuzione query
    $sql = "SELECT * FROM banche,comuni WHERE banche.cBanca = $id AND banche.cComune = comuni.cComune";
    $rs = _execute($con,$sql);

    //step 4: restituzione dati
    if($rs)
    {
        echo(json_encode($rs));
    }
    else
    {
        $con->close();
        die("Errore nell'esecuzione della query");
    }

    //step 5: chiusura connessione
    $con->close();

?>