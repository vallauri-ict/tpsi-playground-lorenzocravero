<!DOCTYPE html>
<html lang="en">
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
		<h1>Grazie della richiesta</h1>
		<?php
			$n1 = 0;
			$n2 = 0;
			$n3 = 0;
			//controlliamo che i parametri siano validi
			if(isset($_REQUEST["n1"]) && is_numeric($_REQUEST["n1"]))
				$n1 = $_REQUEST["n1"];
			else
				die("Primo numero non valido");
			if(isset($_REQUEST["n2"]) && is_numeric($_REQUEST["n2"]))
				$n2 = $_REQUEST["n2"];
			else
				die("Secondo numero non valido");
			if(isset($_REQUEST["n3"]) && is_numeric($_REQUEST["n3"]))
				$n3 = $_REQUEST["n3"];
			else
				die("Terzo numero non valido");
			echo("$n1 - $n2 - $n3");

			//controllo chi è il maggiore
			if($n1 > $n2 && $n1 > $n3)
			{
				$max = $n1;
				//echo("Il numero maggiore è $n1");
			}
			else if($n2 > $n1 && $n2 > $n3)
			{
				$max = $n2;
				//echo("Il numero maggiore è $n2");
			}
			else
			{
				$max = $n3;
				//echo("Il numero maggiore è $n3");
			}
			echo("</br>Il numero maggiore è $max");
			echo("</br>Tipo di richiesta: <b>$_SERVER[REQUEST_METHOD]</b> </br>");
			$currentUrl = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
			echo("URL richiedente: $currentUrl");
		?>
	</body>
</html>