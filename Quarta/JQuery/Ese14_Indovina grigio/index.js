"use strict"

const DIM = 9;

$(document).ready(function() {
    let wrapper=$("#wrapper");
    wrapper.on("mouseover", "div", vediColore);
    wrapper.on("mouseout", "div", nascondiColore);
    let txtPos=$("#txtPosizione");
    let txtGrado=$("#txtColore");
    let btnSubmit=$("#btnOk");
    let cont=0;
    let msg=$("#lblMsg");
    wrapper.css("backgroundColor","#FF9");
    wrapper.css("float","left");
    btnSubmit.on("click",controlla);

    creaQuadrati();

    function vediColore(){
        wrapper.off("click", "div");
        let p = $("#tooltip");
        p.text($(this).prop("id")).hide().fadeIn(1000);
        wrapper.on("click", "div", vediColore);
    }

    function nascondiColore() {
        wrapper.off("mouseout", "div");
        let p = $("#tooltip");
        p.text("").hide().fadeIn(1000);
        wrapper.on("mouseout", "div", nascondiColore);
    }

    function controlla(){
        if(txtPos.val()=="" || txtGrado.val()=="")
        {
            msg.html("Compila tutti i campi");
        }
        else
        {
            let pos=parseInt(txtPos.val());
            let grado=parseInt(txtGrado.val())
            let chosenDiv;
            if(pos<1 || pos >9)
            {
                msg.html("Inserisci una posizione esistente");
                txtPos.focus();
            }
            else
            {
                chosenDiv=wrapper.children("div").eq(pos-1);
                if(parseInt(chosenDiv.prop("id"))<grado)
                {
                    msg.html("Troppo alto");
                }
                else
                {
                    if(parseInt(chosenDiv.prop("id"))>grado)
                    {
                        msg.html("Troppo basso");
                    }
                    else
                    {
                        msg.html("Bravo, hai indovinato");
                        chosenDiv.css({"backgroundColor" : "#FF9",
                                        "border" : "none"});
                        cont++;
                    }
                }
            }
            if(cont==9)
            {
                alert("Bravissimo,hai vinto!");
            }
            txtPos.val(" ");
            txtGrado.val(" ");
            txtPos.focus();
        }
        
    }
    
    function creaQuadrati(){
        let div;
        let grigio;
        for (let i = 0; i < DIM; i++) 
        {
            div=$("<div>");
            div.addClass("box");
            grigio=generaNumero(0,255);
            console.log(grigio);
            div.html(i+1);
            div.prop("id",grigio);
            div.css({ backgroundColor: `rgb(${grigio},${grigio},${grigio})` });
            div.appendTo(wrapper);
        }
    }


    function generaNumero(min,max){
        // formula per generare numeri tra min e max, estremi inclusi
        // math.floor tronca il numero con la virgola all'intero più basso (approssimo per difetto)
        let n = Math.floor((max-min+1)*Math.random())+min  
        return n;
    }
});