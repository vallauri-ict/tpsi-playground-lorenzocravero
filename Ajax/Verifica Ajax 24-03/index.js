"use strict"

const X0 = 152;
const Y0 = 109;

const VERDE = "rgba(0, 200, 0, 0.5)"
const ROSSO = "rgba(255, 0, 0, 0.5)"
const BLU  =  "rgba(0, 0, 255, 0.5)"

let nomeFila = ["T","S","R","Q","P","O","N","M","L","I",  "H","G","F","E","D","C","B","A"]
let nomeColonna=[28,26,24,22,20,18,16,14,12,10,8,6,4,2,  1,3,5,7,9,11,13,15,17,19,21,23,25,27]

let inizioFine = [
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 

	{"inizio":1, "fine":26}, 
	{"inizio":2, "fine":25}, 
	{"inizio":2, "fine":25}, 
	{"inizio":3, "fine":24}, 
	{"inizio":3, "fine":24}, 
	{"inizio":4, "fine":23}, 
	{"inizio":4, "fine":23}, 
	{"inizio":4, "fine":23}, 
]


$(document).ready(function(){
	let wrapper = $("#wrapper")
	let divSpettacoli= $("#divSpettacoli")
	let divMappa= $("#divMappa")
	let mappa= divMappa.children("div").eq(0)
	let titolo = wrapper.children("h3")
	let sottotitolo = wrapper.children("p")
	let btnAcquista = divMappa.children("button")
	let divDetails = $(".details");
	let divImg = $(".img");
	let mappaImg = divMappa.children("div").eq(0);

	//variabili in cui salvare i dati iniettati
	let spettacoli;


	mappa.hide();
	btnAcquista.prop("disabled",true);
	btnAcquista.on("click",acquista);

	//richiesta per gli spettacoli
	let request = inviaRichiesta("get","/spettacoli");
	request.fail(errore);
	request.done(function(data){
		spettacoli = data;
		caricaSpettacoli();
	})
		

	function caricaSpettacoli(){
		for (const spettacolo of spettacoli) 
		{
			let img=$("<img>");
			img.prop("src","img/"+spettacolo.titolo+".jpg");
			img.appendTo(divImg);
			$("<br/>").appendTo(divImg);
			$("<br/>").appendTo(divImg);

			let p=$("<p>");
			p.text(spettacolo.titolo);
			p.appendTo(divDetails);

			//$("<br/>").appendTo(divDetails);

			p=$("<p>");
			p.text(spettacolo.autore);
			p.appendTo(divDetails);

			//$("<br/>").appendTo(divDetails);

			p=$("<p>");
			p.text(spettacolo.data);
			p.appendTo(divDetails);

			//$("<br/>").appendTo(divDetails);

			p=$("<p>");
			p.text(spettacolo.prezzo);
			p.appendTo(divDetails);

			let button = $("<button>");
			button.prop("spettacolo",spettacolo);
			button.text("Acquista Biglietti");
			button.on("click",scegliPosti);
			button.appendTo(divDetails);

			$("<br/>").appendTo(divDetails);
			$("<br/>").appendTo(divDetails);
		}
	}


	function scegliPosti(){
		divSpettacoli.fadeOut();
		mappa.fadeIn();

		titolo.text($(this).prop("spettacolo").titolo);
		sottotitolo.text($(this).prop("spettacolo").data);

		let id = $(this).prop("spettacolo").id;
		//indice per i posti
		let prog = 0;

		let request = inviaRichiesta("get","/spettacolo_"+id);
		request.fail(errore);
		request.done(function(posti){
			let h = 0;
			for (let i = 0; i < nomeFila.length; i++) 
			{
				let w = 0;
				for (let j = 0; j < nomeColonna.length; j++) 
				{
					if(j == 14)
					{
						w += 33;
					}
					let div = $("<div>");
					div.addClass("poltrona");
					div.on("click",prenotaPosto);
					div.prop("info",posti[prog]);
					div.appendTo(mappaImg);
					div.css("left", X0+w);
					div.css("top",Y0+h);
					if(posti[prog].prenotazione == "")
					{
						div.css("backgroundColor",VERDE);
					}
					prog++;
					w += 16.5;
				}	
				$("<br/>").appendTo(mappaImg);
				if(i == 12)
				{
					h += 24;
				}
				h += 13.5;
			}
		})
	}


	function prenotaPosto(){
		if($(this).css("backgroundColor") == VERDE)
		{
			$(this).css("backgroundColor",BLU);
		}
		else
		{
			$(this).css("backgroundColor",VERDE);
		}
		if($(this).prop("info").prenotazione == "booked")
		{
			$(this).prop("info").prenotazione = "";
		}
		
		btnAcquista.prop("disabled",false);
	}

	function acquista(){
		alert("Acquisto effettuato!");
	}
	
});