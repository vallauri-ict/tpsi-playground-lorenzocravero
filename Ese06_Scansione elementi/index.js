"use strict"

let _wrapper;

function evidenzia(selector){
    _wrapper.children().css("backgroundColor","white");
    _wrapper.children(selector).css({"backgroundColor":"#FF0"});
}

//se una funzione è richiamata nell'HTML,
//quindi non dinamicamente tramite Listener di evento
//va implementata FUORI dall'onload altrimenti non viene vista

$(document).ready( function(){
    _wrapper=$("#wrapper");
    let list;

    $("#btn1").on("click",function(){
        alert(_wrapper.children().length);
    });

    $("#btn2").on("click",function(){
        list=_wrapper.children(); //list è una collezione jQuery lunga 9
        let s=""; 
        
        //soluzione 1: ciclo for classico
        //non fatto perchè banale

        //soluzione 2: ciclo forof con 2 soluzioni a sua volta
        for (const text of list) 
        {
            //la function html è jQuery, quindi non funziona su list poichè è un 
            //oggetto js,di conseguenza mettiamo l'oggetto interessato,appunto list,
            //fra parentesi col $ davanti di modo da renderlo un oggetto jQuery e farlo funzionare.
            //s+=$(text).html()+"\n";
            // in questo caso invece utilizziamo .inneHTML che è JavaScript come l'elemento text, quindi funziona subito
            //s+=text.innerHTML+"\n"; 
        }

        //soluzione 3: metodo each--> più brillante
        let i;
        //i è un indice,ref è un puntatore ma sono equivalenti,il risultato fornito è lo stesso
        //vanno passati entrambi perchè la function funzioni anche
        //se ne viene utilizzato uno solo
        list.each(function(i,ref){ 
            //ref indica l'elemento corrente della collezione list
            s+=$(ref).html()+"\n"; //come prima,essendo ref un ogeetto js,occorre renderlo jQuery tramite il $
        });
        alert(s);
    });

    $("#btn3").on("click",function(){
        //soluzione 1: for classico 
        /*list=_wrapper.children();
        for (let i = 0; i < _wrapper.children().length; i++) 
        {
            if((i+1)%2==0)
            {
                //trasformo l'oggetto js List in jQuery e gli aggiungo il css per colorarlo 
                $(list[i]).css("backgroundColor","#FF0");
            }
        }*/

        /*//soluzione 2: utilizzo children
        $("#wrapper").children(":nth-of-type(even)").css("backgroundColor","#FF0");*/
    
        //soluzione 3: utilizzo .filter
        //filter consente nell'andare a inserire una condizione per colorare determinati oggetti
        $("#wrapper").children().filter(":nth-of-type(even)").css("backgroundColor","#FF0");
    });

    $("#btn4").on("click",function(){
        list=_wrapper.children();
        let j=0;
        let sfumatura=["50","100","150","200","250"];
        for (let i = 0; i < _wrapper.children().length; i++) 
        {
            if((i+1)%2==1)
            {
                //le virgolette particolari ci permettono di utilizzare delle variabili
                //all'interno di una stringa da inserire nel css
                //${} serve appunto per far si che la varibaile venga letta all'interno della stringa
                $(list[i]).css("backgroundColor",`rgb(0,${sfumatura[j++]},0)`)
            }
        }
    });
})