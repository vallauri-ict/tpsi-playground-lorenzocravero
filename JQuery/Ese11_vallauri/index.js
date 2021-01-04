"use strict"

$(document).ready(function(){
    let _wrapper=$("#wrapper");
    for (let i = 0; i < 36; i++) 
    {
        let _box=$("<div>");
        _box.addClass("box"); //comando jQuery per aggiungere una classe
        _wrapper.append(_box);
    }
    setInterval(aggiorna,32);
    
    function aggiorna(){
        let n=generaNumero(0,35); //0 e 35 sono compresi
        let _box= _wrapper.children().eq(n); //in questo modo prende TUTTI i figli di wrapper che essendo .box va bene lo stesso
        //se avessimo fra i figli di wrapper anche dei NON .box dovevamo specificare fra parentesi che figli prendere.
        _box.animate({"opacity":0.3}, 400); //400 si può anche omettere essendo 400 il default
        _box.animate({"opacity":0.6}, 400); //sembra che vengano eseguite in parallelo
        _box.animate({"opacity":0.1}, 400); //ma in realtà attendono la fine della precedenza quindi lavorano in sequenza
        //perchè lavorano sullo stesso oggetto
    }

    function generaNumero(min,max){
        let n=Math.floor((max-min+1)*Math.random()+min);
        return n;
    }

})