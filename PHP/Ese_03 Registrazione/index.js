"use strict"

$(document).ready(function(){
    $("select[name=lstCitta]").prop("selectedIndex",-1);
	$("#btnInvia").on("click",function(){
        let msg = "";
        if($("#txtNome").val() == "")
        {
            msg +="Nome mancante </br>";
        }
        if($("input[name=optIndirizzo]:checked").length == 0)
        {
            msg+="Indirizzo di studio non selezionato </br>";
        }
        if($("select[name=lstCitta]").prop("selectedIndex") == -1)
        {
            msg += "Città di residenza mancante";
        }
        if(msg != "")
        {
            $("#msg").html(msg);
        }
        else
        {
            $("#msg").html("");
            let form = $("#form1");
            form.prop("action", "pagina2.php");
            form.prop("method","get");
            form.submit();
        }
    });
})

function generaNumero(min,max){
    // formula per generare numeri tra min e max, estremi inclusi
    // math.floor tronca il numero con la virgola all'intero più basso (approssimo per difetto)
    let n = Math.floor((max-min+1)*Math.random())+min;  
    return n;
}

