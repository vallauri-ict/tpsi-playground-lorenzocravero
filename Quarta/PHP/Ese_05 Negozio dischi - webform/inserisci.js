"use strict";

$(document).ready(function(){
    let txtInterprete = $("#txtInterprete");
    let txtTitolo = $("#txtTitolo");
    let txtAnno = $("#txtAnno");
    let btnInvia = $("#btnInvia");

    btnInvia.on("click",inserisci);


    function inserisci(){
        let params = 
        {
            "interprete" : txtInterprete.val(),
            "titolo" : txtTitolo.val(),
            "anno" : txtAnno.val()
        }
        let request = inviaRichiesta("get","server/inserisci.php",params);
        request.fail(errore);
        request.done(function(data){
            console.log(data);
            alert("Disco inserito correttamente");
            window.location.href = "index.php";
        })
    }
})