"use strict"

const DIM = 7;

$(document).ready(function(){
    let wrapper=$("#wrapper");
    let header=$("#header");
    let turno=1; //se turno è dispari tocca al rosso , se pari al giallo
    let colonne=[];

    creaPedine();

    function creaPedine(){
        let div;

        //pedine dell'header
        for (let i = 0; i < DIM; i++) 
        {
            div=$("<div>");
            div.prop("id","btn-"+i);
            div.addClass("pedina");
            div.mouseover(function(){
                if(turno %2 == 0)
                {
                    $(`#btn-${i}`).addClass("giallo");
                }
                else
                {
                    $(`#btn-${i}`).addClass("rosso");
                }
            });
            div.mouseout(function(){
                if(turno %2 == 0)
                {
                    $(`#btn-${i}`).removeClass("giallo");
                }
                else
                {
                    $(`#btn-${i}`).removeClass("rosso");
                }
            });
            
            div.on("click",function(){  //ho dovuto usare la function anonima perchè altrimenti me l'avrebbe richiamata subito ogni volta
                let r; //coordinata del punto in cui inserire la pedina
                //let aus=DIM-2;
                let ok=false;
                let put=false;
                if(($(`#btn-${DIM-2}-${i}`).("backgroundColor","#BBB")))
                {
                    console.log("entro qua");
                    r=DIM-2;
                    put=true;
                }
                else
                {
                    for (let j = 0; j < 4 || !ok; j++) 
                    {
                        //console.log("entro qua");
                        if(($(`#btn-${j}-${i}`).hasClass("rosso")) || ($(`#btn-${j}-${i}`).hasClass("giallo")))
                        {
                            ok=true;
                            r=j-1;
                            put=true;
                        }
                    }
                }

                if(put)
                {
                    inserisci(i,r);
                }
                if(turno %2 == 0)
                {
                    $(`#btn-${i}`).removeClass("giallo");
                }
                else
                {
                    $(`#btn-${i}`).removeClass("rosso");
                }
                turno++;
            });
            header.append(div);
        }

        //pedine del wrapper
        for (let i = 0; i < DIM-1; i++) 
        {
            for (let j = 0; j < DIM; j++) 
            {
                div=$("<div>");
                div.prop("id","btn-"+i+"-"+j);
                div.addClass("pedina");
                wrapper.append(div);
            }
        }
    }

    function inserisci(col,rig){
        let colore;
        if(turno %2 == 0)
            colore="giallo";
        else
            colore="rosso";
        
        $(`#btn-${rig}-${col}`).addClass(colore);
    }


})