"use strict"

let intestazioni =[
    {
        "tag" : "th",
        "text" : "nomeModello",
        "width" : "15%",
    },
    {
        "tag" : "th",
        "text" : "alimentazione",
        "width" : "15%",
    },
    {
        "tag" : "th",
        "text" : "colore",
        "width" : "15%",
    },
    {
        "tag" : "th",
        "text" : "anno",
        "width" : "10%",
    },
    {
        "tag" : "th",
        "text" : "img",
        "width" : "20%",
    },
    {
        "tag" : "th",
        "text" : "dettagli",
        "width" : "13%",
    },
    {
        "tag" : "th",
        "text" : "elimina",
        "width" : "12%",
    },
]

const URL = "http://localhost:3000"

$(document).ready(function () {
    let _lstMarche = $("#lstMarche");
    let _lstModelli = $("#lstModelli");
	let _table= $("table")
	let _dettagli=$(".row").eq(2).children("div").eq(1)
  
    _dettagli.hide();
    let request=inviaRichiesta("get", URL + "/marche");
    request.fail(errore);
    //i dati ricevuti non è obbligatorio chiamarli data
    request.done(function(marche){
        for (const marca of marche) 
        {
            let opt=$("<option>");
            opt.val(marca.id);
            opt.text(marca.nome);
            opt.appendTo(_lstMarche);
        }
        _lstMarche.prop("selectedIndex",-1); //bsigona metterlo a -1 perchè se non mi seleziona in automatico la prima voce e il change diventa difettoso
    });
    
    /* ********************************************* */
    _lstMarche.on("change",function(){
        _lstModelli.text("");
        let codmarca=_lstMarche.val();
        // in questa riga andiamo a richiedere solo quelli che hanno il codice della marca UGUALE alla marca selezionata nel listbox
        //possimao farlo grazie ai codicimarca delle automombili che sono chiavi esterne 
        let request=inviaRichiesta("get", URL + "/modelli?codMarca="+codmarca); 
        request.fail(errore);
        request.done(function(modelli){
            for (const modello of modelli) 
            {
                let opt=$("<option>");
                opt.val(modello.id);
                opt.text(modello.nome+ " - "+modello.alimentazione);
                opt.appendTo(_lstModelli);
            }
        })
    })
    _lstModelli.on("change",function(){
        //siamo andati a prendere fra i figli ioption del listbox quello selezionato
        let opzioneSelezionata=_lstModelli.children("option").eq(_lstModelli.prop("selectedIndex")).text();
        _lstModelli.prop("nome",opzioneSelezionata.split(" - ")[0]);
        _lstModelli.prop("alimentazione",opzioneSelezionata.split(" - ")[1]);

        let codModello=_lstMarche.val();
        let request = inviaRichiesta("get", URL + "/automobili?codModello="+codModello);
        request.fail(errore);
        request.done(function(automobili){
            let thead=$("<thaed>");
            thead.appendTo(_table);
            let tr=$("<tr>");
            //tr.css({"backgroundColor" : })
            tr.appendTo(thead);
            for (const intestazione of intestazioni) 
            {
                let th=$(`<${(intestazione.tag)}>`);
                th.text(intestazione.text);
                th.css({"width" : intestazione.width});
                th.appendTo(tr);
            }

            let tbody=$("<tbody>");
            tbody.appendTo(_table);
            for (const automobile of automobili) 
            {
                let tr=$("<tr>");
                tr.appendTo(tbody);
                let td=$("<td>");
                td.appendTo(tr);
                td.text(_lstModelli.prop("nome"));

                td=$("<td>");
                td.appendTo(tr);
                td.text(_lstModelli.prop("alimentazione"));

                td=$("<td>");
                td.appendTo(tr);
                td.text(automobile.colore);

                td=$("<td>");
                td.appendTo(tr);
                td.text(automobile.anno);

                td=$("<td>");
                td.appendTo(tr);
                let img=$("<img>");
                img.appendTo(td);
                img.prop("src","img/"+automobile.img);

                td=$("<td>");
                td.appendTo(tr);
                let button = $("<button>");
                button.text("Dettagli");
                button.appendTo(td);

                td=$("<td>");
                td.appendTo(tr);
                button = $("<button>");
                button.text("Elimina");
                button.appendTo(td);
            }
        });
    });
		
});


