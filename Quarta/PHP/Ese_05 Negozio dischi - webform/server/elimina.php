<?php
    header('Content-type: application/json; charset=utf-8');
    require("php-mysqli.php");

    //step 1: lettura dei parametri
    if(isset($_REQUEST["id"]))
    {
        $id = $_REQUEST["id"];
    }
    else
    {
        die("Parametro mancante: id");
    }

    //step 2: connessione
    $con = _connection();

    //step 3: esecuzione query
    $sql = "DELETE FROM dischi WHERE id=$id";
    $rs = _execute($con,$sql);

    //step 4: restituzione dati
    if($rs)
    {
        echo('{"ris": "ok"}'); 
    }
    else
    {
        die("Errore nell'esecuzione della query");
        $con->close();
    }

    //step 5: chiusura connessione
    $con->close();
?>