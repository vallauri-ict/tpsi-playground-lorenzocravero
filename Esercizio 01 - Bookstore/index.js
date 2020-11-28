'use strict'

function crea(){
	localStorage.setItem("bookstore_xml",bookstore);
	alert("Dati salvati correttamente all'interno del local storage");
}

function visualizza(){
	//lettura della stringa dal local storage
	let xml=localStorage.getItem("bookstore_xml");
	//istanzio un nuovo parser
	let parser=new DOMParser();
	//tramite il DOMparser parsifico la stringa
	let xmlDoc=parser.parseFromString(xml,"text/xml");
	
	/*let serializer=new XMLSerializer();
	let aus=serializer.serializeToString(xmlDoc);
	console.log(aus);*/
	
	let root=xmlDoc.documentElement;
	let nLibri=root.children.length;
	alert("Dati letti correttamente dal local storage. Numero di record letti "+nLibri);
	let _tbody=document.getElementById("tabLibri");
	for(let i=0;i<nLibri;i++)
	{
		let libro=root.children[i];
		let titolo="", categoria="", lingua="", autori="", anno="", prezzo="";
		if(libro.hasAttribute("category"))
		{
			categoria=libro.getAttribute("category");
		}

		for(let j=0;j<libro.children.length;j++)
		{
			let campo=libro.children[j];
			switch(campo.nodeName)
			{
				case 'title' :
					titolo=campo.textContent;
					if(campo.hasAttribute("lang"))
						lingua=campo.getAttribute("lang");
					break;
				case 'year':
					anno=campo.textContent;
					break;
				case 'price':
					prezzo=campo.textContent;
					break;
				case 'author':
					if(autori=="")
						autori+=campo.textContent;
					else
						autori += " - "+campo.textContent
					break;
			}
		}
		let tr;
		_tbody.appendChild(tr);
		let td;
		td=document.createElement("td");
		tr.appendChild(td);
		td.innerHTML=titolo;
		td=document.createElement("td");
		tr.appendChild(td);
		td.innerHTML=categoria;
		td=document.createElement("td");
		tr.appendChild(td);
		td.innerHTML=lingua;
		td=document.createElement("td");
		tr.appendChild(td);
		td.innerHTML=autori;
		td=document.createElement("td");
		tr.appendChild(td);
		td.innerHTML=anno;
		td=document.createElement("td");
		tr.appendChild(td);
		td.innerHTML=prezzo;
		
		td=document.createElement("td");

	}
	
}