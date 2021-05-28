<?php
    require("php-mysqli.php");

    //step 1: lettura e controllo dei parametri
    if(isset($_REQUEST["cFiliale"]))
    {
        $cFiliale = $_REQUEST["cFiliale"];
    }
    else
    {
        die("Parametro mancante: cFiliale");
    }

    //step 2: aprire la connessione
    $con = _connection();

    //step 3: esecuzione della query
    //sarà una query di join poichè mi serve fare una ricerca su 2 tabelle
    //$sql = "SELECT * FROM conti WHERE conti.cFiliale = $cFiliale";

    $sql = "SELECT * FROM correntisti,conti WHERE conti.cCorrentista = correntisti.cCorrentista and conti.cFiliale = $cFiliale ";

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