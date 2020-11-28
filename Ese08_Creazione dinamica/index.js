"use strict"

let _ul=[]; //vettore di puntatori
let _wrapper;

$(document).ready(function(){
    _wrapper= $("#wrapper");
    _ul.push(_wrapper.children("ul").first());
    _ul.push(_wrapper.children("ul").last());
});

function aggiungi(index){
    index--;
    let _li=$("<li>");
    _ul[index].append(_li);
    let n=_ul[index].children(_li).length;
    _li.html("menu "+(index+1)+" voce <b>"+n+"</b>");
}

function sposta(index){
    index--; //per andare a a base 0 anzichè 1
    let _li=_ul[index].children("li").last();
    if(index==0)
    {
        _li.appendTo(_ul[1]);
        //appendTo è l'inverso di append perchè l'oggetto da appendere è fuori 
        //e in parentesi c'è il contenitore
    }
    else
    {
        _li.appendTo(_ul[0]);
    }
}

function aggiungiPrima(index){
    index--;
    let _li=$("<li>");
    _li.text("Voce iniziale");
    _li.insertBefore(_ul[index].children("li").first());
}

function aggiungiDopo(index){
    index--;
    let _li=$("<li>");
    _li.text("Voce dopo il primo elemento");
    _li.insertAfter(_ul[index].children("li").first());
}

function replica(index){
    /*index--;
    let _li=$("<li>");
    _li.text("-----");
    _li.insertAfter(_ul[index].children("li");*/
    index--;
    let j=0;
    for (let i = 0; i < 3; i++) 
    {
        let _li=$("<li>");
        _li.text("AAAAA");
        _li.insertAfter(_ul[index].children("li").eq(j));
        j+=2;
    }
    //sono equivalenti le 2 soluzioni
}

function creazioneConCostruttore(){
    $("<div>", {
        "css": { // metodo jQuery
            "background-color": "#ddd",
            "color": "blue",
        },
        "text": "hello world ", // metodo jQuery
        "appendTo": _wrapper,
        "append": [ // le parentesi quadre consentono di appendere più elementi allo stesso tempo
            $("<label>", { "text": "hobbies" }),
            $("<input>", { "type": "radio", "name": "hobbies" }),
            $("<span>", { "text": "sports" }),
            $("<input>", { "type": "radio", "name": "hobbies" }),
            $("<span>", { "text": "musica" }),
        ]
    });
};
