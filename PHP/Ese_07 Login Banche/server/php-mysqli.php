<?php 
	define('DBNAME', '4b_banche');
	define('SCADENZA', 60);

	function _connection()
	{
		define('DBHOST', 'localhost');
		define('DBUSER', 'root');
		define('DBPASS', '');
		
		// questa riga fa in modo che, in caso di errore, venga generata un'eccezione
		mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
		try
		{
			$con = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);
			$con -> set_charset("utf8"); // gestione degli apici
			return $con;
		}
		catch (mysqli_sql_exception $ex)
		{
			http_response_code(503);
			die ("Errore connessione db: <br>" . $ex->getMessage());
		}
	}

	function _execute($con, $sql)
	{
		try
		{
			$rs = $con -> query($sql);
		}
		catch (mysqli_sql_exception $ex)
		{
			// chiusa la connessione
			$con -> close();
			http_response_code(500);
			die("Errore nella query sql: <br>" . $ex -> getMessage());
		}
		// se il comando è una query di tipo select, convertiamo
		// il recordset in un vettore di json con fetch_all().
		// i comandi non di tipo select restituiscono semplicemente
		// un booleano che lasciamo così com è.
		if(!is_bool($rs))
		{
			$data = $rs -> fetch_all(MYSQLI_ASSOC);
		}
		else
		{
			$data = $rs;
		}
		
		return $data;
	}
	
	function _checkSession($key)
	{
		session_start();
		if(!isset($_SESSION[$key]))
		{
			http_response_code(403);
			die("Sessione inesistente o scaduta");
		}
		else if(!isset($_SESSION["scadenza"]) || $_SESSION["scadenza"] < time())
		{
			http_response_code(403);
			die("Sessione scaduta");
		}
		else
		{
			// se la sessione esiste ed è ancora attiva bisogna aggiornare il tempo di scadenza
			$_SESSION["scadenza"] = time() + SCADENZA;
			setcookie(session_name(), session_id(), time() + SCADENZA, "/");
		}
	}
?>