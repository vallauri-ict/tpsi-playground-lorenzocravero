<!DOCTYPE html> 
<html>
	<head lang="it">
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Dischi</title>
		<!-- BOOTSTRAP e JQUERY -->
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css">
		<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"></script>
		<!-- SPECIFICI -->
		<link rel="stylesheet" href="index.css">
		<script src="libreria.js"></script>
		<script src="index.js"></script>
	</head>
	<body>
		
			<h1 class='text-center' style="margin:20px">Vendita dischi</h1>
			<div id="table">
				<form class='table-info text-center' style="padding:15px">
					<div><b>Codice</b></div>
					<div><b>Autore</b></div>
					<div><b>Titolo</b></div>
					<div><b>Anno</b></div>
					<div><b>Salva</b></div>
					<div><b>Cancella</b></div>

					<?php

						require("server/php-mysqli.php");

						//step 1: lettura e controllo dei parametri
						//null

						//step 2: aprire connessione
						$con = _connection();

						//step 3:esecuzione query
						$sql = "SELECT * FROM dischi";
						$rs = _execute($con,$sql);

						//step 4: visualizzazione dei dati
						if($rs)
						{
							foreach ($rs as $item) 
							{
								echo("<div><input [type=text] value=$item[id]></div>");
								echo("<div><input [type=text] value=$item[autore]></div>");
								echo("<div><input [type=text] value=$item[titolo]></div>");
								echo("<div><input [type=text] value=$item[anno]></div>");
								echo("<div><button value=$item[id]>Salva</button></div>");
								echo("<div><button value=$item[id]>Cancella</button></div>");
							}
						}
						else
						{
							$con->close();
							die("Errore nell'esecuzione della query");
						}

						//step 5: chiusura connnessione
						$con->close();
					?>
				</form>
			</div>
			 
			<br>
			<center>
				<button type='button'
						class='btn btn-primary'
						onclick='window.location.href="inserisci.html"'>Aggiungi</button>
			</center>
		</div>
	</body>
</html>