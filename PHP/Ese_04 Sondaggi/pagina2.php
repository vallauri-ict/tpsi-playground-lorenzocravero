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
			$rs = _execute($con, $sql)[0];
			
			//step 4: visualizzazione dati
			$titolo = $rs["titolo"];
			echo("<h1>Sondaggio su $titolo</h1>");
			echo("<img src=img/$rs[img] />");
		?>
	</body>
</html>