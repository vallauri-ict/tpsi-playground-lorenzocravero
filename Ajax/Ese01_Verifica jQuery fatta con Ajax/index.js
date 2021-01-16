"use strict";

let elencoArticoli;
let wrapper;
let details;
let nome;
let prezzo;
 
$(document).ready(function () {
    wrapper = $('#elencoArticoli');
	details =$(".details");

	let aperto;
	
	$.ajax({
       "url": "http://localhost:3000/fotocamere",
       "timeout": 5000,
       "success": visualizza,
       "error": errore
	})
	
	details.hide();
	wrapper.on("mouseover","img",function(){
		$(this).next().html($(this).prop("name"));
	});

	wrapper.on("mouseout","img",function(){
		$(this).next().html("");
	});

	aperto=false;

	$("#btnCarrello").on("click",function(){
		if(!aperto)
		{
			$("#carrello").slideDown(1000);
			$(this).html("&#709 Chiudi carrello ");
		}
		else
		{
			$("#carrello").slideUp(1000);
			$(this).html("&#709 Apri carrello ");
		}
		aperto=!aperto;
	});
});


function visualizza (data) {
	console.log(data);
	//i dati vengono salvati all'interno della variabile globale elenco articoli
	//per averli sempre disponibili
	elencoArticoli=data;
	let i=0;
	for (const item of elencoArticoli) 
	{
		let article = $("<div>");
		article.prop("id","article-"+i);
		article.prop("nome",item.nome);
		article.prop("prezzo",item.prezzo);
		article.addClass("article");
		article.on("click",dettagli);
		article.appendTo(wrapper);

		let img=$("<img>");
		img.prop("src","img/"+item.src+".jpg");
		img.prop("title","Aggiungi al carrello");
		img.prop("name",item.nome)
		img.addClass("image");
		img.appendTo(article);

		let name=$("<div>");
		name.appendTo(article);
		name.addClass("article-name");

		i++;
	}
}

function dettagli(){
		details.html(" ");
		details.slideDown(1000);
		let aus=$(this).prop("id").split("-");
		let id=aus[1];
		nome=$(this).prop("nome");
		prezzo=$(this).prop("prezzo")
		
		let div=$("<div>");
		div.addClass("detail-close");
		div.appendTo(details);

		let span=$("<span>");
		span.appendTo(div);
		span.html("X");
		span.on("click",function(){
			details.slideUp(1000);
		});

		let divImg=$("<div>");
		divImg.addClass("detail-img");
		divImg.appendTo(details);
		console.log(elencoArticoli[id]["src"]);
		let img=$("<img>");
		img.addClass("detail-img-img");
		img.prop("src","img/"+elencoArticoli[id]["src"]+".jpg");
		img.appendTo(divImg);
		
		let divInfo=$("<div>");
		divInfo.appendTo(details);
		divInfo.addClass("detail-info");
		let h4=$("<h4>");
		h4.appendTo(divInfo);
		h4.addClass("item-title");
		h4.html(elencoArticoli[id]["nome"]);
		let p=$("<p>");
		p.appendTo(divInfo);
		p.html(elencoArticoli[id]["descrizione"]);
		let pPrezzo=$("<p>");
		pPrezzo.appendTo(divInfo);
		pPrezzo.html(elencoArticoli[id]["prezzo"]);
		let button=$("<button>");
		button.addClass("item-add");
		button.appendTo(divInfo);
		button.prop("nome",$(this).prop("name"));
		button.prop("prezzo",$(this).prop("prezzo"));
		button.on("click",aggiungi);
		button.html("Aggiungi al carrello");
}

function aggiungi(){

    let table = $("#carrello table");
    let nome = $(this).prop("nome");
    let prezzo = $(this).prop("prezzo");

    let trovato = false;
    // each è un metodo asincrono, parte su un thread differente
    table.find("tr").each(function (i, ref) {
      if ($(ref).children("td").eq(0).text() == nome) {
        let qta = parseInt($(ref).children("td").eq(2).text());
        qta++;
        $(ref).children("td").eq(2).text(qta);
        trovato = true;
      }
    });

    if (!trovato) {
      let tr = $("<tr>");
      tr.appendTo(table);

      let tdNome = $("<td>");
      tdNome.appendTo(tr);
      tdNome.text(nome);

      let tdPrezzo = $("<td>");
      tdPrezzo.appendTo(tr);
      tdPrezzo.text(prezzo);

      let tdQta = $("<td>");
      tdQta.appendTo(tr);
      tdQta.text("1");

      let tdElimina = $("<td>");
      tdElimina.appendTo(tr);
      let imgElimina = $("<img>");
      imgElimina.appendTo(tdElimina);
      imgElimina.prop("src", "images/_cestino.png");
      imgElimina.on("click", function () {
        $(this).parent().parent().remove();
	  });
	}
}



/* ** */

function errore(jqXHR, textStatus, str_error){
    if(jqXHR.status==0)
       alert("connection refused or server timeout");
    else if (jqXHR.status == 200)
       alert("Errore Formattazione dati\n" + jqXHR.responseText);
    else
       alert("Server Error: "+jqXHR.status+ " - " +jqXHR.responseText);
}
