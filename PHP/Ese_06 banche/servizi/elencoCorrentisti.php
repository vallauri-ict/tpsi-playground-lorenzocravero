<?php
    header("content-type:application/json; charset=utf-8");
    require("php-mysqli.php");

    //step 1: lettura dei parametri e controlli
    if(isset($_REQUEST["cFiliale"]))
    {
        $cFiliale = $_REQUEST["cFiliale"];
    }
    else
    {
        http_response_code(400);
        die("Parametro mancante: id");
    }

    //step 2: connessione
    $con = _connection();

    //step 3: esecuzione query
    //abbiamo eseguito una join che in pratica fa una ricerca incrociata fra tabelle
    //per soddisfare più condizioni in contemporanea
    $sql = "SELECT * FROM conti,correntisti WHERE correntisti.cCorrentista = conti.cCorrentista and conti.cFiliale=$cFiliale";
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