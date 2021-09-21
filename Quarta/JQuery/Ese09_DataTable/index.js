"use strict"

$(document).ready(function(){
    let _table=$("#wrapper table");
    const finalUrl="https://randomuser.me/api/";
    $.ajax({
        "url": finalUrl + "?results=50",
        //data rappresenta il json GIA' PARSIFICATO restituito dal server
        "success":function(data){
            console.log(data);
            for (let person of data.results) 
            {
                let _tr=$("<tr>");
                _tr.appendTo(_table.children("tbody"));
                let name=person.name.first+" "+person.name.last;
                $("<td>").appendTo(_tr).text(name);
                $("<td>").appendTo(_tr).text(person.nat);
                $("<td>").appendTo(_tr).text(person.location.country);
                $("<td>").appendTo(_tr).text(person.location.state);
                $("<td>").appendTo(_tr).text(person.cell);
                let _img = $("<img>");
                _img.prop("src", person.picture["medium"]);
                $("<td>").append(_img).appendTo(_tr);
                
            }
            //se lancio data table prima che la tabella sia stata popolata
            //l'applicazione funziona ugualmente ma visualizza un messaggio di errore iniziale
            _table.DataTable( {
                "bPaginate": true, // paginazione dei record da visualizzare
                "bLengthChange": true, // n. di record per pagina
                "bFilter": true, // ricerca della voce impostata
                "bSort": true // ordinamento dei record sul click on the header
            });
        },
        "error":errore
    });
})





function errore(jqXHR, text_status, string_error) {
    if (jqXHR.status == 0)
        alert("Connection Refused or Server timeout");
    else if (jqXHR.status == 200)
        alert("Formato dei dati non corretto : " + jqXHR.responseText);
    else
        alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}
