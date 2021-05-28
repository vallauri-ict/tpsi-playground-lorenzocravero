<?php
    require("php-mysqli.php");
    //step 1: lettura e controllo dati
    //non ci sono

    //step 2: aprire la connessione
    $con = _connection();

    //step 3: esecuzione query
    $sql = "SELECT * FROM dischi";
    $rs = _execute($con,$sql);

    //step 4: passaggio dei dati al chiamante
    if($rs)
    {
        echo(json_encode($rs));
    }
    else
    {
        die("Errore nell'esecuzione della query");
    }

    //step 5: chiusura connessione
    $con->close();
?>