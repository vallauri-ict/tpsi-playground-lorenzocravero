<?php
	header("content-type:application/json; charset=utf-8");
	
	// accesso alla sessione
	session_start();
	
	// rimosse le variabili di sessione
	session_unset();
	
	// distrutta la sessione
	session_destroy();
	
	echo('{"ris": "ok"}');
?>