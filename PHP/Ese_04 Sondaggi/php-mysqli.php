<?php
    function _connection($dbName)
    {
        define('DBHOST', 'localhost');
        define('DBUSER', 'root');
        define('DBPASS', '');

        //questa riga fa in modo che venga generata un eccezione in caso di errore
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        try
        {
            $con = new mysqli(DBHOST, DBUSER, DBPASS, $dbName); 
            //per la gestione degli apici
            $con->set_charset("utf8");
            return $con;
        }
        catch (mysqli_sql_exception $ex) 
        {
            die ("Errore connessione db: <br>" . $ex->getMessage()); 
        }
    }

    function _execute($con, $sql){
        try
        {
            $rs = $con->query($sql);
        }
        catch(mysqli_sql_exeption $ex)
        {
            $con->close();
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

        $con->close();
        return $data;
    }
?>


