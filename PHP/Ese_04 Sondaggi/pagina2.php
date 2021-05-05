<!DOCTYPE html>
<html lang="it">
 <head>
 <meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title> PHP </title>
		<link href="index.css" rel="stylesheet"/>
		<script src="https://code.jquery.com/jquery-3.6.0.js"
		integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
		crossorigin="anonymous"></script>
		<script src="index.js"></script>
</head>
	<body>
		<?php

			require("php-mysqli.php");

			//step 1: controllo dati
			if(isset($_REQUEST["lstSondaggi"]))
			{
				$id = $_REQUEST["lstSondaggi"];
			}
			else
				die("Parametro mancante: id");

			//step 2: connessione
			$con = _connection("4b_sondaggi");

			//step 3: esecuzione query
			$sql = "SELECT * FROM sondaggi WHERE id=$id";
			//* significa tutti i campi
			$rs = _execute($con, $sql)[0];
			//restituisce sempre un vettore enumerativo

			//step 4: visualizzazione dati
			$titolo = $rs["titolo"];
			$domanda = $rs["domanda"];
			echo("<h1>Sondaggio su $titolo</h1>");
			echo("<img style=' margin:10px' src='img/$rs[img]'>");
			echo("<h3 style='margin:10px'>Rispondi alla seguente domanda:</h3>");
			echo("<p style='margin:10px'>$domanda</p>");
			//se si vuole usare una variabile composta all'interno
			//di una echo bisogna omettere gli apici attorno al nome del campo
		?>
		<form action="risultati.php" method="post">
			<div style="margin:10px">
				<input type="radio" name="optRisposta" value="nSi">Si
				<br>
				<input type="radio" name="optRisposta" value="nNo">No
				<br>
				<input type="radio" name="optRisposta" value="nNs">Non so
			</div>
			<?php
                echo("<input type='hidden' name='id' value=$id>");
            ?>
			<input style="margin:10px" type="submit" value="Invia">
		</form>
		<?php
			//step 5: chiudere la connessione
			$con->close();
		?>
	</body>
</html>