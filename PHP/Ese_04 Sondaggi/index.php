<!doctype html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>PHP</title>
		<link rel="stylesheet" href="index.css">
		<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
		<script type="application/javascript" src="index.js"></script>
	</head>
	
	<body style="text-align:center">

		<?php
			require("php-mysqli.php");
		?>

		<h1>Seleziona il sondaggio a cui vuoi partecipare</h1>
		<hr>
		<h3>Sondaggi disponibili</h3>
		<form id="form1" action="pagina2.php" method="get">
			<select name="lstSondaggi">

			<?php
				//step 1: non ci sono parametri quindi niente

				//step 2: connessione al database
				$con = _connection("4b_sondaggi");

				//step 3: esecuzione query
				$sql = "SELECT id,titolo FROM sondaggi";
				$rs = _execute($con,$sql);

				//step 4: visualizzazione dati
				foreach ($rs as $item) 
				{
					$nome = $item["titolo"];
					$id = $item["id"];
					echo("<option value=$id>$nome</option>");
				}

				//step 5: chiusura connessione (tutte le pagine devono finire così)
				$con->close();
			?>
			</select>
			<input type="submit" value="Invia"/>
		</form>
		
		
	</body>
</html>