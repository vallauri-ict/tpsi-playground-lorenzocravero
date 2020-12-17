"use strict";
 
$(document).ready(function () {
	let wrapper = $('#elencoArticoli');
	let divCarrello=$("#carrello");
	let details =$(".details");
	let btnCarrello=$("#btnCarrello");
	let apri=true;
	btnCarrello.on("click",apriCarrello);
	let src;
	let descrizione
	let title;
	let prezzo;
	let acquisto=[];
	let acquisti=[];

	let img=$("<img>");
	img.prop("src","img/_cestino.png");
	img.appendTo(divCarrello.find("tr").children("th").eq(3));

	caricaArticoli();

	details.hide();
	
	function caricaDetails(){
		
		let dClose=$("<div>");
		dClose.addClass("detail-close");
		dClose.appendTo(details);

		let span=$("<span>");
		span.val("X");
		span.appendTo(dClose);

		let dImg=$("<div>");
		dImg.addClass("detail-img");
		dImg.appendTo(details);

		let img=$("<img>");
		img.prop("src","img/"+src+".jpg");
		img.addClass("detail-img-img");
		img.appendTo(dImg);

		let dInf=$("<div>");
		dInf.addClass("detail-info");
		dInf.appendTo(details);

		let h4=$("<h4>");
		h4.addClass("item-title");
		h4.text(title);
		h4.appendTo(details);

		let p=$("<p>");
		p.text(descrizione);
		p.appendTo(details);

		p=$("<p>");
		p.text("Prezzo: "+prezzo);
		p.appendTo(details);

		acquisto.push(title);
		acquisto.push(prezzo);

		let btnAggiungi=$("<button>");
		btnAggiungi.addClass("item-add");
		btnAggiungi.text("Aggiungi al carrello");
		btnAggiungi.on("click",aggiungiAlCarrello);
		btnAggiungi.appendTo(details);


	}

	function apriCarrello(){
		if(apri)
		{
			divCarrello.slideDown(1000);
			btnCarrello.text("Chiudi carrello");
		}
		else
		{
			divCarrello.slideUp(1000);
			btnCarrello.text("Apri carrello");
		}
		apri=!apri;
	}

	function caricaArticoli(){
		let aus1;
		let aus2;
		let i=0;
		let toolTip=$("<p>");
		toolTip.text("aggiungi al carrello");
		for (const articolo of articoli) 
		{
			let div1=$("<div>");
			div1.prop("id","article-"+i);
			div1.addClass("article");
			div1.appendTo(wrapper);
			let img=$("<img>");
			img.addClass("article-image");
			img.prop("src","img/"+articolo.src+".jpg");
			img.prop("nome",articolo.nome);
			img.prop("info",articolo.descrizione+"-"+articolo.prezzo);
			img.appendTo(div1);
			toolTip.appendTo(img);
			toolTip.hide();
			let div2=$("<div>");
			div2.addClass("article-name");
			div2.prop("nome",articolo.nome);
			div2.appendTo(div1);
			img.hover(function(){
				toolTip.show();
				aus1=$(this).prop("nome").split(" ");
				div2.text($(this).prop("nome"));
				src=aus1[1];
				title=$(this).prop("nome");
				aus2=$(this).prop("info").split("-");
				descrizione=aus2[0];
				prezzo=aus2[1];
				console.log(descrizione);
				console.log(prezzo);
			},
			function(){
				div2.text("");
			});
			img.on("click",mostraDettagli);
			i++;
		}
	}

	function mostraDettagli(){
		details.text(" ");
		details.slideDown(1000);
		caricaDetails();
	}

	function aggiungiAlCarrello(){
		let ok=true;
		let i=0;
		for (const acq of acquisti) 
		{
			if(acq.nome == acquisto[i])
			{
				!ok;
			}
		}
		if(ok)
		{
			acquisti.push(acquisto);
			let tr=$("<tr>");
			let td;
			tr.appendTo(divCarrello.children("table"));
			//console.log(acquisto);
			for (const campo of acquisto) 
			{
				td=$("<td>");
				//td.css("width","30%");
				td.text(campo);
				td.appendTo(tr);
			}
			td=$("<td>");
			td.text("1");
			td.appendTo(tr);
		}
		else
		{
			let elencoAcquisti=divCarrello.find("tr");
			for (let i = 0; i < elencoAcquisti.length; i++) 
			{
				if(elencoAcquisti.eq(i).children("td").eq(0)==acquisto[0])
				{
					let qta=parseInt(elencoAcquisti.eq(i).children("td").eq(2).text);
					qta++;
					elencoAcquisti.eq(i).children("td").eq(2).text;
				}
			}
		}
	}
  
});
