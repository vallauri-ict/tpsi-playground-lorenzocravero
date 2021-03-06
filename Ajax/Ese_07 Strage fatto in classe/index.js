"use strict"

$(document).ready(function () {

    let _login = $("#login")
    let _test = $("#test")
   
    let _txtUsr = $("#usr")
    let _txtPwd = $("#pwd")
    let _btnLogin = $("#btnLogin")
    let _lblErrore = $("#lblErrore")
	
	let _domande = $(".domande")
	
	/* ******************************* */

    _login.show()
    _test.hide()
    _lblErrore.hide()
   
    _btnLogin.on("click", function(){
        //le textbox hanno .val per leggere il contenuto
        let user = _txtUsr.val();
        let pwd = _txtPwd.val();
        let json = 
        {
            "user" : user,
            "pwd" : pwd
        }
        let request = inviaRichiesta("get","/studenti",json);
        request.fail(errore);
        request.done(function(data){
            if(data.length > 0)
            {
                _login.hide();
                _test.show();
                visualizzaDomande();
            }
            else
                _lblErrore.fadeIn(600);
        })
	   
    })

    _lblErrore.children("button").on("click", function(){
		_lblErrore.fadeOut(600)
	})
	

    function visualizzaDomande(){
        let request = inviaRichiesta("get","/domande");
        request.fail(errore);
        request.done(function(domande){
            for (const domanda of domande) 
            {
                //contenitore padre
                let div = $("<div>");
                div.appendTo(_test.children().eq(2));

                let p = $("<p>");
                p.addClass("domanda");
                p.text(domanda.domanda);
                p.prop("id",domanda.id);
                p.appendTo(div);

                let richiestaRisposte = inviaRichiesta("get","/risposte?codDomanda="+domanda.id);
                richiestaRisposte.fail(errore);
                richiestaRisposte.done(function(risposte){
                    for (const risposta of risposte) 
                    {
                        let opt = $("<input type=radio>");
                        opt.prop("risposta",risposta);
                        opt.prop("name",domanda.id);
                        opt.appendTo(div);

                        let span = $("<span>");
                        span.text(" "+risposta.risposta);
                        span.appendTo(div);   

                        let br = $("<br>");
                        br.appendTo(div); 
                    }
                    let opt = $("<input type=radio>");
                    opt.prop("risposta",{"correct" : false});
                    opt.prop("name",domanda.id);
                    opt.appendTo(div);
                    opt.prop("checked",true);

                    let span = $("<span>");
                    span.text("Mi avvalgo della facoltà di non rispondere");
                    span.appendTo(div);   

                    let br = $("<br>");
                    br.appendTo(div); 
                })
            }
            let btn =$("<button>");
            btn.appendTo(_test.children().eq(2));
            btn.text("Invia");
            btn.on("click", function(){
                let opts = $("<input[type=radio]:checked>");
                let voto = 0;
                for (const opt of opts) 
                {
                    //opts è una collezione jquery MA i singoli elementi opt 
                    //sono tutti puntatori javascript, di conseguenza
                    //per farlo funzionare devo mettere nuovamente $ davanti a ogni opt
                    //per convertirli nuovamente in jQuery
                    if($(opt).prop("risposta").correct)
                    {
                        voto++;
                    }
                    else $(opt).next().css({"color" : "red"});
                    //in alternativa si può fare un ciclo for tradizionale 
                    //e ci muoviamo con gli indici in .eq() dove non è necessario convertire in jQuery
                }
                alert("Complimenti, hai preso un bel "+voto);
            })
        })
    }

});
