"use strict";
const X_OFFSET = 180
const Y_OFFSET = 210;
const MMG = 24*3600*1000; // msec in un giorno
const RIGHE = 18;
const COLONNE = 37;

$(document).ready(function(){	
	
	let _wrapper = $("#wrapper")
	let _mappa = $("#wrapper").children("div")
	let _btnVisualizzaMappa = $("#wrapper").children("button").eq(0)
	//  tag input sono NIPOTI d wrapper
	let _dataInizio = $("#wrapper").find("input").eq(0)
	let _dataFine = $("#wrapper").find("input").eq(1)
	let _msg = $("#wrapper").children("label").eq(2)

	_mappa.hide();
	_btnVisualizzaMappa.prop("disabled",true);
	_dataFine.prop("disabled",true);
	let dataStart;
	let dataEnd;
	let ombrelloni;
	let vet=[]; //nel vettore vet andiamo ad inserire gli id di tutti gli obrelloni liberi
	//di modo da poterli trovare più facilmente ed evitare di appesantire il codice

	_dataInizio.on("change",function(){
		_dataFine.prop("disabled",false);
		_dataFine.prop("min",_dataInizio.val());
		//per poter lavorare sulle date è necessario convertirle da stringhe a oggetto data
		//per farlo usiamo l'apposito costruttore
		dataStart=new Date(_dataInizio.val()); 
		//alert(dataStart.getTime());
		//questo valore indicherà i millisecondi trascorsi dall'1/1/1970 alla data scelta
	})

	_dataFine.on("change",function(){
		_btnVisualizzaMappa.prop("disabled",false);
		_btnVisualizzaMappa.addClass("buttonEnabled");
		dataEnd=new Date(_dataFine.val());
		_msg.text(`Giorni scelti ${((dataEnd-dataStart)/MMG)+1}`);
	})

	_btnVisualizzaMappa.on("click",function(){
		_mappa.show();
		let request = inviaRichiesta("GET",url);
		request.fail(errore);
		request.done(function(data){
				console.log(data);
				ombrelloni=data;
				let id=1;
				for (let i = 0; i <= RIGHE; i++) 
				{
					if(i!=9)
					{
						for (let j = 0; j <= COLONNE; j++) 
						{
							if(j!=22)
							{
								let ombrellone=$("<div>");
								ombrellone.appendTo(_mappa);
								ombrellone.addClass("ombrellone");
								ombrellone.css({
									"top" : Y_OFFSET+(16*i),
									"left" : X_OFFSET+(16*j) + (i* -2)
								})
								if(isDisponibile(ombrelloni[id-1]))
								{
									ombrellone.on("click",ombrelloneClick);
								}
								else
								{
									ombrellone.addClass("red");
								}
								ombrellone.prop("id","id-"+id);
								id++;
							}	
						}
					}		
				}
				creaPulsantePrenota();
			}
		)
	})
 
	function isDisponibile(ombrellone){
		//va messo new Date() perchè va a convertire una data da stringa a numero
		let pos1=(dataStart-(new Date(_dataInizio.prop("min"))))/MMG;
		let pos2=(dataEnd-(new Date(_dataInizio.prop("min"))))/MMG;
		//andiamo a sottrarre il primo giugno a entrambi trovando quindi la posizione all'interno del json
		for (let i = pos1; i < pos2; i++) 
		{
			if(ombrellone.stato[i] != 0)
			{
				return false; //si può mettere anche un booleano noi abbiamo scelto di ritornare direttamente true o false
			}
		}
		return true;
	}

	function ombrelloneClick(){
		if(!($(this).hasClass("blue")))
		{
			$(this).addClass("blue");
			vet.push($(this).prop("id").split("-")[1]);
		}
		else
		{
			$(this).removeClass("blue");
			let pos=vet.indexOf($(this).prop("id").split("-")[1]);
			vet.splice(pos, 1);
		}
	}

	function creaPulsantePrenota(){
		let a = $("<a>");
		a.addClass("button buttonEnabled prenota");
		a.appendTo(_mappa);
		a.text("Prenota");
		a.on("click",function(){
			let pos1=(dataStart-(new Date(_dataInizio.prop("min"))))/MMG;
			let pos2=(dataEnd-(new Date(_dataInizio.prop("min"))))/MMG;
			for (const id of vet) 
			{
				for (let i = pos1; i <= pos2; i++) 
				{
					ombrelloni[id-1].stato[i]=1;
				}
			}
			let request = inviaRichiesta("Patch",url+"/"+id,ombrelloni[id-1]);
			request.fail(error);
			request.don(function(data){
				console.log(data);
			})
		});
		alert("Prenotazione eseguita correttamente");
		window.location.reload();
	}
})

function errore(jqXHR, textStatus, str_error){
    if(jqXHR.status==0)
       alert("connection refused or server timeout");
    else if (jqXHR.status == 200)
       alert("Errore Formattazione dati\n" + jqXHR.responseText);
    else
       alert("Server Error: "+jqXHR.status+ " - " +jqXHR.responseText);
}

