<!DOCTYPE html>
<html lang="it">
<head>
		<meta charset="UTF-8" />
		<title>PHP</title>
		
		<!-- CSS -->
		<link rel="stylesheet" href="index.css"/>

        <!-- Chart JS -->
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

        <!-- Scripts -->
        <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
		<script src="risultati.js"></script>
	</head>	
    <body style="text-align:'center'">
        <?php
            require("php-mysqli.php");

            //step 1: non ci sono parametri, lo saltiamo
            if (isset($_REQUEST["optRisposta"])) {
                $ris=$_REQUEST["optRisposta"];
            }else{
                die("parametri mancanti");
            }
            if(isset($_REQUEST["id"])) 
            {
                $id = $_REQUEST["id"];
            }
            else 
            {
                die("Parametro mancante: id");
            }
            //step 2: instaurare la connessione
            $con=_connection("4b_sondaggi");

            //step 3:                                                                                                                                                                                                                               
            $sql = "UPDATE sondaggi SET $ris = $ris+1 WHERE id=$id";
            $rs = _execute($con,$sql);

            //step 4: costruzione pagina
            if($rs)
            {
                echo("<h2> Grazie per aver votato </h2>");
            }
            else
            {
                die("Errore nell'esecuzione della query");
            }

            //lancio una seconda query per visualizzare i dati
            $sql2 = "SELECT * FROM sondaggi WHERE id=$id";
            $rs = _execute($con,$sql2);
            $nSi = $rs[0]["nSi"];
            $nNo = $rs[0]["nNo"];
            $nNs = $rs[0]["nNs"];
            $totale = $nSi + $nNo + $nNs;
            echo("<h3>Risposte</h3>");
            echo("<p>Si: $nSi</p>");
            echo("<p>No: $nNo</p>");
            echo("<p>Non so: $nNs</p>");
            
            echo("<canvas id='idCanvas'></canvas>");
            echo("<script> creaDiagramma($nSi, $nNo, $nNs); </script>");
            
            //salvataggio cookies 
            setcookie("sondaggio-$id","true",time()+60, "/");
        ?>
        <?php
            //step 5: chiusura connessione
            $con->close();
        ?>
    </body>
</html>