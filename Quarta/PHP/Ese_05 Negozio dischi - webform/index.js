"use strict"

$(document).ready(function(){
    let table = $("#table");

    let btnSalva = table.find("div").children("button").eq(0);
    btnSalva.on("click",salva);

    let btnCancella = table.find("div").children("button").eq(1);
    btnCancella.on("click",cancella);

    function salva(){
        let params = 
        {
            "id" : $(this).prop("value"),
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