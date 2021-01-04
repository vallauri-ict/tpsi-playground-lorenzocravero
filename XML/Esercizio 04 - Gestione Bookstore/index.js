"use strict"

window.onload=function(){
    let json=this.localStorage.getItem("bookstore_json");
    //alert(json);
    let jsonVet=JSON.parse(json);
    let _table=document.createElement("table");

    //nella prima riga creiamo il vettore con tutti i tag body dentro,essendocene solo uno nella riga successiva possiamo metterein un altra variabile l'unico elemento del vettore
    let _bodies=document.getElementsByTagName("body");
    let _body=_bodies[0];
    _body.appendChild(_table);

    //creazione delle intestazioni
    let _tr=this.document.createElement("tr");
    _table.appendChild(_tr);
    let intestazioni=["title","authors","category","price"];
    for (let i = 0; i < intestazioni.length; i++) 
    {
        let _th=document.createElement("th");
        _th.innerHTML=intestazioni[i];
        _tr.appendChild(_th);
    }

    //lettura e caricamento dati
    for (let i=0;i<jsonVet.length;i++) 
    {
        let item=jsonVet[i];
        let _tr=document.createElement("tr");
        _table.appendChild(_tr);

        let _td=this.document.createElement("td");
        _td.innerHTML=item.title;
        _tr.appendChild(_td);

        _td=this.document.createElement("td");
        //authors è un vettore enumerativo il metodo join restituisce un astringa contenente tutte le voci del vettore separate da una virgola
        _td.innerHTML=item.authors.join(',');
        _tr.appendChild(_td);

        _td=this.document.createElement("td");
        _td.innerHTML=item.category;
        _tr.appendChild(_td);

        _td=this.document.createElement("td");
        _td.innerHTML=item.price;
        _tr.appendChild(_td);

        _td=this.document.createElement("td");
        let _button=document.createElement("button");
        _button.innerHTML="Elimina";
        _button.addEventListener("click",eliminaRecord);
        _button.recordDaEliminare=i;
        _td.appendChild(_button);
        _tr.appendChild(_td);
        
        /*_td=this.document.createElement("td");
        _td.innerHTML=item.title;
        _tr.appendChild(_td);
        */
    }
    //creazione dei dettagli
    let _divDettagli=this.document.createElement("div");
    _body.appendChild(_divDettagli);
    _divDettagli.setAttribute("class","dettagli");
    let indiceLibroCorrente=0;
    visualizza();
    creaPulsanti();

    function eliminaRecord(){
        let indiceEliminare=this.recordDaEliminare;
        jsonVet.splice(indiceEliminare,1);
        localStorage.setItem("bookstore_json",JSON.stringify(jsonVet));
        window.location.reload();
    }

    function visualizza(){
        _divDettagli.innerHTML="";
        let libroCorrente=jsonVet[indiceLibroCorrente];
        for (const key in libroCorrente) 
        {
            let _p1=document.createElement("p");
            _p1.innerHTML=key;
            _p1.style.textAlign="right";
            _p1.style.fontWeight="bold";
            _divDettagli.appendChild(_p1);
            let _p2=document.createElement("p");
            _p2.innerHTML=libroCorrente[key];
            _divDettagli.appendChild(_p2); 
        }
    }

    function creaPulsanti(){
        let _divPulsantiNavigazione=document.createElement("button");
        _divPulsantiNavigazione.setAttribute("class","contenitorePulsantiNavigazione");
        _body.appendChild(_divPulsantiNavigazione);
        let nomiPulsanti=["Primo","Indietro","Avanti","Ultimo","Aggiungi","Elimina per categoria"];
        for (const item of nomiPulsanti) 
        {
            let _button=document.createElement("button");
            _button.style.padding="5px 10px";
            _button.setAttribute("class","pulsantiNavigazione")
            //assegnazione come id del pulsante il nome stesso per far si che sia accessibile facilmente
            _button.id=item;
            _button.addEventListener("click",gestionePulsanti);
            _button.innerHTML=item;
            _divPulsantiNavigazione.appendChild(_button);
        }

        function gestionePulsanti(){
            let _indietro=document.getElementById("Indietro");
            let _avanti=document.getElementById("Avanti");
            let _button;
            switch (this.innerHTML) 
            {
                case 'Primo':
                    indiceLibroCorrente=0;
                    _indietro.disabled=true;
                    _avanti.disabled=false;
                    break;
                case 'Avanti':
                        indiceLibroCorrente++;
                        if(indiceLibroCorrente==jsonVet.length-1)
                        {
                            _avanti.disabled=true;
                        }
                        _indietro.disabled=false;
                    break;
                case 'Indietro':
                    indiceLibroCorrente--;
                    if(indiceLibroCorrente==0)
                    {
                        _indietro.disabled=true;
                    }
                    _avanti.disabled=false;
                    break;
                case 'Ultimo':
                    indiceLibroCorrente=jsonVet.length-1;
                    _avanti.disabled=true;
                    _indietro.disabled=false;
                    break;
                case 'Aggiungi':
                    window.open("pagina2.html");
                    window.location.reload();
                    break;
                case 'Elimina per categoria':
                    let categoria=prompt("Inserisci la cateoria da cancellare");
                    let qta=0;
                    for (let i = jsonVet.length-1; i >= 0; i--) 
                    {
                        if(jsonVet[i].category==categoria)
                        {
                            jsonVet.splice(i,1);
                            qta++;
                        }
                    }
                    if(qta>0)
                    {
                        alert("Cancellati "+qta+" record");
                        localStorage.setItem("bookstore_json",JSON.stringify(jsonVet));
                        window.location.reload();
                    }
                    else
                        alert("Nessun record eliminato");
                    break;
                default:
                    break;
            }
            visualizza();
        }

    }
}

