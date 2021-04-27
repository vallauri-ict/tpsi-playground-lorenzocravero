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
		<h1>Pagina 2</h1>
		<?php
			//require va a linkare una determinata pagina per renderne visibile tutto il contenuto nella pagina da cui viene linkata
			require("php-mysqli.php");

			// step 1: lettura e controllo parametri	

			if(isset($_REQUEST["txtNome"]))
				$nome = $_REQUEST["txtNome"];
			else
				die("Nome mancante");
			
			if(isset($_REQUEST["optIndirizzo"]))
				$indirizzo = $_REQUEST["optIndirizzo"];
			else
				die("Indirizzo mancante");
			
			if(isset($_REQUEST["chkHobbies"]))
			{
				$hobbies = $_REQUEST["chkHobbies"];
				$hobbies = implode(',',$hobbies); //implode mette insieme i vettori e li rende stringa, explode fa esattamente il contrario
			}
			else
				$hobbies = "";
			if(isset($_REQUEST["lstCitta"]))
			{
				$citta = $_REQUEST["lstCitta"];
			}
			else
				die("indirizo mancante");
			if(isset($_REQUEST["txtSegni"]))
			{
				$segni = $_REQUEST["txtSegni"];
			}
			else
				$segni = "";
			if(isset($_REQUEST["lstScoperta"]))
			{
				$scoperta = $_REQUEST["lstScoperta"];
				$scoperta = implode(',',$scoperta); //implode mette insieme i vettori e li rende stringa, explode fa esattamente il contrario
			}
			else
				$scoperta = "";

			//step 2: connessione al database
			
			$con = _connection("4b_studenti");

			//proteggo le variabili dall'sql injection
			$nome = $con->real_escape_string($nome);
			$indirizzo = $con->real_escape_string($indirizzo);
			$hobbies = $con->real_escape_string($hobbies);
			$citta = $con->real_escape_string($citta);
			$segni = $con->real_escape_string($segni);
			$scoperta = $con->real_escape_string($scoperta);

			//step 3: esecuzione della query
			$sql = "INSERT INTO studenti(nome, settore, hobbies, residenza, note, media) VALUES ($nome,$indirizzo,$hobbies,$citta,$segni,$scoperta)";
			$ris = _execute($con, $sql);
			echo($ris),
		?>
	</body>
</html>