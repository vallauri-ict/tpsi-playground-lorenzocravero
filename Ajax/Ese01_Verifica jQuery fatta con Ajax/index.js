"use strict"

$(document).ready(function(){
	$.ajax({ url: "/url", // default: currentPage 
	type: "GET", 
	data: { "nome": "pippo" }, 
	contentType: "application/x-www-form-urlencoded", 
	dataType: "json", 
	async : true, // default
	timeout : 5000, 
	success: function(data, [textStatus], [jqXHR]) { alert(JSON.stringify(data)); }, 
	error : function(jqXHR, textStatus, str_error)
	{ if(jqXHR.status==0) 
		alert("connection refused or server timeout"); 
		else if (jqXHR.status == 200) 
			alert("Errore Formattazione dati\n" + jqXHR.responseText); 
				else 
					alert("Server Error: "+jqXHR.status+ " - " +jqXHR.responseText); }, 
	username: "nome utente se richiesto dal server", password: "password se richiesta dal server", });
})
 

