"use strict"

$(document).ready(function(){
    let table = $("#table");
    
    let request = inviaRichiesta("get","server/elencoDischi.php");
    request.fail(errore);
    request.done(function(elencoDischi){
        //console.log(elencoDischi);

        //visualizzo i vari dischi
        for (const key in elencoDischi) 
        {
            let form = $("<form>");
            //form.addClass("table-info text-center");
            //form.css("padding","15px");
            form.appendTo(table);

            let div = $("<div>");
            div.appendTo(form);

            let txt = $("<input type='text'>");
            txt.appendTo(form);
            txt.prop("disabled",true);
            txt.val(elencoDischi[key].id);

            txt = $("<input type='text'>");
            txt.appendTo(form);
            txt.val(elencoDischi[key].autore);

            txt = $("<input type='text'>");
            txt.appendTo(form);
            txt.val(elencoDischi[key].titolo);

            txt = $("<input type='text'>");
            txt.appendTo(form);
            txt.val(elencoDischi[key].anno);

            let td = $("<td>");
            td.appendTo(form);
            let btn = $("<button>");
            btn.appendTo(td);
            btn.text("Salva");
            btn.prop("disco",elencoDischi[key]);
            btn.on("click",salva);
            
            td = $("<td>");
            td.appendTo(form);
            btn = $("<button>");
            btn.appendTo(td);
            btn.text("Cancella");
            btn.prop("disco",elencoDischi[key]);
            btn.on("click",cancella);
        }
    })


    function salva(){
        let params = 
        {
            "id" : $(this).prop("disco").id,
            "autore" : $(this).parent().siblings().eq(1).val(),
            "titolo" : $(this).parent().siblings().eq(2).val(),
            "anno" : $(this).parent().siblings().eq(3).val()
        }

        let request = inviaRichiesta("get","server/salva.php",params);
        request.fail(errore);
        request.done(function(data){
            console.log(data);
            alert("Dati salvati correttamente");
            window.location.reload();
        })
    }

    function cancella(){
        let params =
        {
            "id" : $(this).prop("disco").id
        }

        let request = inviaRichiesta("get","server/elimina.php",params);
        request.fail(errore);
        request.done(function(data){
            console.log(data);
            alert("Dati eliminati correttamente");
            window.onload.location();
        })
    }
})