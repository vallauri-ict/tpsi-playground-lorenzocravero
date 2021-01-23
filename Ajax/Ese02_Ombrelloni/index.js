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
		$.ajax({
			"url":"http://localhost:3000/ombrelloni",
			"error" : errore,
			"success" : function(data){
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
								let div=$("<div>");
								div.appendTo(_mappa);
								div.addClass("ombrellone");
								div.css({
									"top" : Y_OFFSET+(16*i),
									"left" : X_OFFSET+(16*j) + (i* -2)
								})
								if(isDisponibile(ombrelloni[id-1]))
								{
									div.on("click",ombrelloneClick);
								}
								else
								{
									div.addClass("red");
								}
							}	
						}
					}		
				}
			}
		})
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

	function ombrelloneClick()
	{
		$(this).addClass("blue");
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

