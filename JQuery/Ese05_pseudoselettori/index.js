"use strict"

$(document).ready( function(){

	let _ris = $("#txtRis");
		
	$("#wrapper div ,#wrapper p").click( function () {	
		_ris.empty();		
		// Per ogni click richiamo 7 volte elabara() 
		for(let i=1; i<=7; i++) 	
		   elabora($(this), i);			
		visualizza("-----------------------");

		//verifico se l'elemento corrente è un p
		if($(this).is("p"))
		{
			visualizza("Sono un tag p");
		}
		else
		{
			if($(this).is("div"))
			{
				visualizza("Sono un tag div");
			}
		}

		//controllo il nome del tag
		if($(this).is("#blu, #rosso"))
	    {
			visualizza("Sono l'elemento "+$(this).html());
		}

		if($(this).html().includes("my Div"))            
		{
			visualizza("Il mio testo è my Div");
		}

		//la function .html() restituisce,se non vengono passati parametri,tutto il contenuto del box sottoforma di stringa.
		//Se gli si passa un parametro allora lo andrà ad inserire all'interno del box 

		if($(this).is(":has('span')")) //oppure .html().includes("</span>")
		{
			visualizza("Contengo il tag span");
		}

		if($(this).is(`:nth-child(${7})`))
		{
			visualizza("Sono l'ultimo child");
		}
		else
		{
			if($(this).is("div"))
			{
				if($(this).is(`:nth-of-type(${5})`))
				{
					visualizza("Sono l'ultimo div");
				}
			}
		}

	});


	function elabora(box, i){
		// 1 - i-esimo elemento generico 	
		if(box.is(`:nth-child(${i})`))
			visualizza(`nth-child(${i})`);
		// 2 - i-esimo elemento generico, ma solo se di tipo DIV		
		if(box.is(`div:nth-child(${i})`))
			visualizza(`div:nth-child(${i})`);  
		// 3 - i-esimo elemento generico, ma solo se di tipo P			
		if(box.is(`p:nth-child(${i})`))
			visualizza(`p:nth-child(${i})`);
			
		// 4 - i-esimo elemento del suo tipo			
		if(box.is(`:nth-of-type(${i})`))
			visualizza(`nth-of-type(${i})`);	
		// 5 - i-esimo elemento del suo tipo, ma solo se di tipo DIV
		if(box.is(`div:nth-of-type(${i})`))
			visualizza(`div:nth-of-type(${i})`);
		// 6 - i-esimo elemento del suo tipo, ma solo se di tipo P 
		if(box.is(`p:nth-of-type(${i})`))
			visualizza(`p:nth-of-type(${i})`);
	}	

	function visualizza(msg){
		_ris.html(_ris.html() + msg + "<br>");
	}

});


