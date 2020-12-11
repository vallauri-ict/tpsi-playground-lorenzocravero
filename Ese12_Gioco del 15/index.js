"use strict"

const DIM = 4;
$(document).ready(function(){
    let _wrapper=$("#wrapper");
    creaElementi();
    assegnaVal();

    //funziona solo se gli elementi sono gia stati creati
    //_wrapper.children("div").on("click",move);

    //soluzione migliore->delegated events:
    _wrapper.on("click","div",move); //sull'onclick di wrapper associamo ai div l'evento move
    
    function creaElementi(){
        let first=true;
        let larghezza;

        //creazione matrice dinamica
        for (let i = 0; i < DIM; i++) 
        {
            for (let j = 0; j < DIM; j++) 
            {
                let _div=$("<div>");
                _wrapper.append(_div);
                _div.addClass("pedina");
                if(first)
                {
                    larghezza = parseInt(_div.css("width"))+
                        parseInt(_div.css("margin-left"))*2+
                        parseInt(_div.css("border-left-width"))*2+
                        parseInt(_div.css("padding-left"))*2;
                    first=false;
                }
                console.log(larghezza);
                _div.css({"top":larghezza*i,
                        "left":larghezza*j});
                _div.prop("id",`btn-${i}-${j}`);
                console.log(_div.id);
            }
        }
    }
    

    function assegnaVal(){
        let numeri=[];
        for (let i = 0; i < 15; i++) 
        {
            numeri[i]=i+1;
        }
        numeri[15]="";
        let _divs=_wrapper.children("div");
        _divs.each(function(i,ref){

            let pos=generaNumero(0,numeri.length-1); //bisogna mettere length e non 15 
            //perchè mano a mano che facciamo splice la dimensione diminuisce sempre,quidni mettendo 15
            //rischieremmo di generare numeri che non esistono
            $(ref).text(numeri[pos]);
            if(numeri[pos]!="")
            {
                $(ref).addClass("grigio");
            }
            numeri.splice(pos,1);
        });
    }

    function generaNumero(min,max){
        // formula per generare numeri tra min e max, estremi inclusi
        // math.floor tronca il numero con la virgola all'intero più basso (approssimo per difetto)
        let n = Math.floor((max-min+1)*Math.random())+min  
        return n;
    }

    function move(){
        //con sintassi javascript
        //let id=this.id; 
        
        //con sintassi jQuery
        let id=$(this).prop("id");
        let aus=id.split("-");
        let i=parseInt(aus[1]); //è necessario fare parseInt perchè i e j sono delle stringhe quindi nello scambio andrebbe a concatenare le stringhe
        let j=parseInt(aus[2]);

        if((j>0)&&($(`#btn-${i}-${j-1}`).text()=="")) //questo particolare apice permette di non interrompere la stringa di continuo per concatenare
        {
            scambio($(this),$(`#btn-${i}-${j-1}`));
        }
        else
        {
            if((i>0)&&($(`#btn-${i-1}-${j}`).text()=="")) 
            {
                scambio($(this),$(`#btn-${i-1}-${j}`));
            }
            else
            {
                if((i<3)&&($(`#btn-${i+1}-${j}`).text()=="")) 
                {
                    scambio($(this),$(`#btn-${i+1}-${j}`));
                }
                else
                {
                    if((j<3)&&($(`#btn-${i}-${j+1}`).text()=="")) 
                    {
                        scambio($(this),$(`#btn-${i}-${j+1}`));
                    }
                }
            }
        }
       //con queste if verificiamo tutti e 4 i casi per vedere se ce n'è una libera vicino a quella cliccata
    }

    function scambio(cella1,cella2){
        _wrapper.off("click","div");
        cella1.animate({
            "top":cella2.css("top"),
            "left":cella2.css("left")
        },1000);

        cella2.animate({
            "top":cella1.css("top"),
            "left":cella1.css("left")
        },1000,function () {
            let aus=cella1.prop("id");
            cella1.prop("id",cella2.prop("id"));
            cella2.prop("id",aus);
            if(controllaVincita())
            {
                alert("Bravo, hai vinto!");
            }
            else
            {
                _wrapper.on("click","div",move);
            }
        });
    }

    function controllaVincita(){
        let cont=0;
        let win=true;
        for (let i = 0; i < DIM; i++)
        {
            for (let j = 0; j < DIM; j++) 
            {
                cont++;
                let n = parseInt($(`#btn-${i}-${j}`).text());
                if(n!=cont && cont!=16)
                {
                    win=false;
                }
            }
        }
        return win;
    }

})