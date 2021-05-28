<?php
    header('Content-type: application/json; charset=utf-8');
    require("php-mysqli.php");

    //step 1: lettura e controllo dei parametri
    if(isset($_REQUEST["id"]))
    {
        $id = $_REQUEST["id"];
    }
    else
    {
        die("Parametro mancante: id");
    }
    if(isset($_REQUEST["autore"]))
    {
        $autore = $_REQUEST["autore"];
    }
    else
    {
        die("Parametro mancante: autore");
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
    $sql = "UPDATE dischi SET autore='$autore',titolo='$titolo',anno=$anno WHERE id=$id";
    $rs = _execute($con,$sql);

    //step 4: visualizzazione parametri
    if($rs)
        echo('{"ris": "ok"}'); 
    else
    {
        $con -> close();
        http_response_code(500);
        die("Errore esecuzione della query");
    }


    //step 5: chiudere la connessione
    $con->close();
?>