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
    
    //variabili globali dati
    let marche;
    let modelli;
    let automobili;
  
    
    _dettagli.hide();
    //richiesta per le marche
    let request = inviaRichiesta("get",URL+"/marche");
    request.fail(errore);
    request.done(function(data){
        marche = data;
        for (const marca of marche) 
        {
            let opt=$("<option>");
            opt.text(marca.nome);
            opt.prop("value",marca.id);
            //opt.val(marca.id); 
            //console.log(opt.val());
            //console.log(opt.prop("value"));
            opt.appendTo(_lstMarche);  
        }
        _lstMarche.prop("selectedIndex",-1);
    });

    _lstMarche.on("change",function(){
        _lstModelli.text("");
        let codMarca = _lstMarche.prop("value");
        request = inviaRichiesta("get",URL + "/modelli?codMarca="+codMarca);
        request.fail(errore);
        request.done(function(data){
            modelli = data;
            for (const modello of modelli) 
            {
                let opt=$("<option>");
                opt.text(modello.nome + " " + modello.alimentazione);
                opt.prop("value",modello.id);
                //opt.val(marca.id); 
                //console.log(opt.val());
                //console.log(opt.prop("value"));
                opt.appendTo(_lstModelli);  
            }
        })
    });

    _lstModelli.on("change",function(){
        _table.empty();
        caricaIntestazioni();
        let codModello = _lstModelli.prop("value");
        request = inviaRichiesta("get",URL + "/automobili?codModello="+codModello);
        request.fail(errore);
        request.done(function(data){
            automobili = data;
            let tbody = $("<tbody>");
            tbody.appendTo(_table);
            for (const auto of automobili) 
            {
                //creo la riga
                let tr = $("<tr>");
                tr.appendTo(tbody);

                let td = $("<td>");
                td.text(modelli[codModello].nome);
                td.appendTo(tr);

                td = $("<td>");
                td.text(modelli[codModello].alimentazione);
                td.appendTo(tr);

                td = $("<td>");
                td.text(auto.colore);
                td.appendTo(tr);

                td = $("<td>");
                td.text(auto.anno);
                td.appendTo(tr);

                td = $("<td>");
                let img = $("<img>");
                img.prop("src", "img/"+auto.img);
                img.css("width","60px");
                img.appendTo(td);
                td.appendTo(tr);

                td = $("<td>");
                let btn = $("<button>");
                btn.text("Dettagli");
                btn.prop("auto",auto);
                btn.on("click",visualDettagli);
                btn.appendTo(td);
                td.appendTo(tr);

                td = $("<td>");
                btn = $("<button>");
                btn.text("Elimina");
                btn.appendTo(td);
                td.appendTo(tr);
            }
        })
    });


    function caricaIntestazioni(){
        //creazione riga di intestazioni
        let thead = $("<thead>");
        thead.appendTo(_table);
        let tr=$("<tr>");
        tr.appendTo(thead);
        
        //forof per scorrere il json delle intestazioni
        for (const item of intestazioni) 
        {
            let th = $(`<${(item.tag)}>`);
            th.text(item.text);
            th.css("width",item.width);
            th.appendTo(tr);
        }
    }


    function visualDettagli(){
        _dettagli.show();
        console.log($(this).prop("auto"));

        //carico i dati che mi son salvato nella prop del bottone nella tabella dettagli
        $("#txtId").val($(this).prop("auto").id);
        $("#txtNome").val(modelli[$(this).prop("auto").codModello].nome);
        $("#txtAlimentazione").val(modelli[$(this).prop("auto").codModello].alimentazione);
        $("#txtCilindrata").val(modelli[$(this).prop("auto").codModello].cilindrata);
        $("#txtTarga").val($(this).prop("auto").targa);
        $("#txtColore").val($(this).prop("auto").colore);
        $("#txtAnno").val($(this).prop("auto").anno);
        $("#txtKm").val($(this).prop("auto").km);
        $("#imgLarge").prop("src","img/"+$(this).prop("auto").img);
        $("#imgLarge").css("width","130px");
    
    }
		
});


