<?php

    define('DBNAME','4b_banche');
    function _connection()
    {
        define('DBHOST', 'localhost');
        define('DBUSER', 'root');
        define('DBPASS', '');

        //questa riga fa in modo che venga generata un eccezione in caso di errore
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        try
        {
            $con = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME); 
            //per la gestione degli apici
            $con->set_charset("utf8");
            return $con;
        }
        catch (mysqli_sql_exception $ex) 
        {
            http_response_code(503);
            die ("Errore connessione db: <br>" . $ex->getMessage()); 
        }
    }

    function _execute($con, $sql){
        try
        {
            $rs = $con->query($sql);
        }
        catch(mysqli_sql_exception $ex)
        {
            $con->close();
            http_response_code(500);
            die("Errore nella query sql");
        }
        //se il comando è una query di tipo select, convertiamo il recordset in un vettore di json
        //i comandi di tipo non select restituiscono semplicemente un booleano che lasciamo così com'è
        if(!is_bool($rs)) 
        {
            $data = $rs->fetch_all(MYSQLI_ASSOC);
        }
        else
            $data = $rs;

        return $data;
    }
?>


