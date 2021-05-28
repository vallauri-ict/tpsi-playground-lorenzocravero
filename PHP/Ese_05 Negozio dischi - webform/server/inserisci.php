<?php

    header('Content-type: application/json; charset=utf-8');
    require("php-mysqli.php");

    //step 1: lettura e controllo parametri
    if(isset($_REQUEST["interprete"]))
    {
        $interprete = $_REQUEST["interprete"];
    }
    else
    {
        die("Parametro mancante: interprete");
    }
    if(isset($_REQUEST["titolo"]))
    {
        $titolo = $_REQUEST["titolo"];
    }
    else
    {
        die("Parametro mancante: titolo");
    }
    if(isset($_REQUEST["anno"]))
    {
        $anno = $_REQUEST["anno"];
    }
    else
    {
        die("Parametro mancante: anno");
    }

    //step 2: connessione
    $con = _connection();

    //step 3: esecuzione query
    $sql = "INSERT INTO dischi (autore,titolo,anno) VALUES('$interprete','$titolo',$anno)";
    $rs = _execute($con,$sql);

    //step 4: restituzione dati
    if($rs)
    {
        echo('{"ris" : "ok"}');
    }
    else
    {
        die("Errore nell'esecuzione della query");
        http_response_code(500);
        $con->close();
    }

    //step 5: chiusura connessione
    $con->close();
?>