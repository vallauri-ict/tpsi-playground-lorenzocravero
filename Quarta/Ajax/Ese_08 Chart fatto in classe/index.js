"use strict"

$(document).ready(function (){
    let wr = $("#wrapper");
    let btnInvia = $("#btnInvia");
    let tbody = $("tbody");
    let canvas = $("canvas")[0];
    let nazioni; //sarà utilizzato come vettore associativo

    btnInvia.on("click",function(){
        // i parametri get si possono passare in 3 modi:
        // il primo è "/?results=100"
        // il secondo è ramite json ("/",{"results" : "100"});
        //il terzo è un urlEncoded ("/", "results=100")
        let request = inviaRichiesta("get","/",{"results" : "100"});
        request.fail(errore);
        request.done(function(persone){
            tbody.empty();
            nazioni = {};
            console.log(persone);
            for (const persona of persone.results) 
            {
                if(persona.location.country in nazioni)
                {
                    nazioni[persona.location.country]++;
                }
                else
                {
                    nazioni[persona.location.country] = 1;
                }
            }
            console.log(nazioni);

            for (const key in nazioni) 
            {
                let tr = $("<tr>");
                tr.appendTo(tbody);

                let td = $("<td>");
                td.appendTo(tr);
                td.text(key);

                td = $("<td>");
                td.appendTo(tr);
                td.text(nazioni[key]);
            }
            let values = [];
            let colors = []

            for (const key in nazioni)
            {
               values.push(nazioni[key]);
               let r = generaNumero(0,255);
               let g = generaNumero(0,255);
               let v = generaNumero(0,255);
               colors.push(`rgb(${r},${g},${v})`)
            }

            //comando asincrono
            let chart = new Chart(canvas, 
            {
                type: 'bar',
                data: 
                {
                    "labels": Object.keys(nazioni),
                    "datasets": 
                    [{
                        "label": 'Grafico delle nazioni',
                        // dobbiamo mettere un vettore enumerativo come parametro
                        "data": values,
                        "backgroundColor": colors,
                        "borderColor": "#000",
                        "borderWidth": 1
                    }]
                }
            });
            // questo tag a non viene utilizzato come un collegamento ipertestuale 
            // ma come bottone di salvataggio
            let a = $("<a>");
            a.appendTo(wr);
            a.prop("href","#");
            a.css("float","right");
            a.prop("download","New file.jpg");  //deve essere valorizzata
            a.text("Salva immagine");

            //è necessario associare un evento perchè se non lo facessimo
            //essendo la creazione del canvas asincrona noi andremo a leggere il canvas prima ancora
            //che sia creato,trovandoci un immagine vuota
            //di conseguenza gestiamo l'evento click per ritardare lo scaricamento
            //a dopo il caricamento del canvas
            a.on("click",function(){
                a.prop("href", canvas.toDataURL("image/jpg"));
            });
        });
    })
})
