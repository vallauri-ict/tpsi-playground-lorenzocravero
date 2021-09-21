"use strict"

let intestazioni =[
    {
        "tag" : "th",
        "text" : "nomeModello",
        "width" : "15%"
    },
    {
        "tag" : "th",
        "text" : "alimentazione",
        "width" : "15%"
    },
    {
        "tag" : "th",
        "text" : "colore",
        "width" : "15%"
    },
    {
        "tag" : "th",
        "text" : "anno",
        "width" : "10%"
    },
    {
        "tag" : "th",
        "text" : "img",
        "width" : "20%"
    },
    {
        "tag" : "th",
        "text" : "dettagli",
        "width" : "13%"
    },
    {
        "tag" : "th",
        "text" : "elimina",
        "width" : "12%"
    },
]

const URL = "http://localhost:3000"

$(document).ready(function () {
    let _lstMarche = $("#lstMarche");
    let _lstModelli = $("#lstModelli");
	let _table= $("table");
    let _dettagli=$(".row").eq(2).children("div").eq(1);
    let _btnSalva=$("#btnSalva");
  
    _btnSalva.on("click",function(){
        let url = URL + "/automobili/" + $("#txtId").val();
        let request=inviaRichiesta("patch",url,{"prezzo" : parseInt($("#txtPrezzo").val())});
        request.fail(errore);
        request.done(function(){
            alert("Record aggiornato correttamente");
            _lstModelli.trigger("change");
        });
    });
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
        _lstMarche.prop("selectedIndex",-1); //bisogna metterlo a -1 perchè se non mi seleziona in automatico la prima voce e il change diventa difettoso
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
                opt.prop("modello",modello); //quando creiamo le option si salvano TUTTE le informazioni relative a QUEL modello
                opt.appendTo(_lstModelli);
            }
        })
    })
    _lstModelli.on("change",function(){
        _table.empty();
        //siamo andati a prendere fra i figli ioption del listbox quello selezionato
        let opzioneSelezionata=_lstModelli.children("option").eq(_lstModelli.prop("selectedIndex"));
        //salva dentro il listbox le informazioni relative al modello selezionato di modo che siano disponibili dove necessario
        _lstModelli.prop("modello",opzioneSelezionata.prop("modello"));

        let codModello=_lstMarche.val();
        let request = inviaRichiesta("get", URL + "/automobili?codModello="+codModello);
        request.fail(errore);
        request.done(function(automobili){
            let thead=$("<thead>");
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
                td.text((_lstModelli.prop("modello")).nome);

                td=$("<td>");
                td.appendTo(tr);
                td.text((_lstModelli.prop("modello")).alimentazione);

                td=$("<td>");
                td.appendTo(tr);
                td.text(automobile.colore);

                td=$("<td>");
                td.appendTo(tr);
                td.text(automobile.anno);

                td=$("<td>");
                td.appendTo(tr);
                let img=$("<img>");
                img.css("width","60px");
                img.appendTo(td);
                img.prop("src","img/"+automobile.img);

                td=$("<td>");
                td.appendTo(tr);
                let btn = $("<button>");
                btn.text("Dettagli");
                btn.prop("auto",automobile); //creiamo una proprietà auto e salviamo l'intero oggetto automobile all'interno del vettore automobili
                btn.on("click",dettagliClick);
                btn.appendTo(td);

                td=$("<td>");
                td.appendTo(tr);
                btn = $("<button>");
                btn.prop("id",automobile.id);
                btn.addClass("btn btn-xs btn-secondary");
                btn.text("Elimina");
                btn.on("click",eliminaClick);
                btn.appendTo(td);
            }
        });
    });

    function dettagliClick(){
        _dettagli.show();
        console.log($(this).prop("auto"));
        $("#txtId").val(($(this).prop("auto")).id);
        $("#txtNome").val((_lstModelli.prop("modello")).nome);
        $("#txtAlimentazione").val((_lstModelli.prop("modello")).alimentazione);
        $("#txtCilindrata").val((_lstModelli.prop("modello")).cilindrata);
        $("#txtTarga").val(($(this).prop("auto")).targa);
        $("#txtColore").val(($(this).prop("auto")).colore);
        $("#txtAnno").val(($(this).prop("auto")).anno);
        $("#txtKm").val(($(this).prop("auto")).km);
        $("#txtPrezzo").val(($(this).prop("auto")).prezzo);
    }

    function eliminaClick(){
        let url= URL + "/automobili/" + ($(this).prop("id")); //facciamo la richiesta per il modello corrente
        let request = inviaRichiesta("delete",url);
        request.fail(errore);
        request.done(function(){
            alert("Record cancellato correttamente");
            _lstModelli.trigger("change"); //forza l'evento change come se avessi cliccato
        });
    }
		
});


