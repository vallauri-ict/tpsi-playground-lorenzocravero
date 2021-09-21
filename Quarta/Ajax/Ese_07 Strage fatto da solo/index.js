"use strict"

$(document).ready(function () {

    let _login = $("#login")
    let _test = $("#test")
   
    let _txtUsr = $("#usr")
    let _txtPwd = $("#pwd")
    let _btnLogin = $("#btnLogin")
    let _lblErrore = $("#lblErrore")
	
	let _domande = $(".domande")
    let questions;
    let answers;
    let punti = 0;
	
	/* ******************************* */

    _login.show()
    _test.hide()
    _lblErrore.hide()
   
    _btnLogin.on("click", function(){
        let json;
        if(_txtPwd.val() != "" && _txtUsr.val() != "")
        {
            json={
                "user" : _txtUsr.val(),
                "pwd"  : _txtPwd.val(),
                "voto" : 0 
            }
            _login.hide();
            _test.show();
            let request = inviaRichiesta("post","/studenti",json);
            request.fail(errore);
            request.done(function(){
                let requestDomande= inviaRichiesta("get","/domande");
                requestDomande.fail(errore);
                requestDomande.done(function(data){
                    questions=data;
                    caricaTabella();
                }) 
            })
        }
        else
        {
            _lblErrore.fadeIn(600);
        }
	   
    })

    _lblErrore.children("button").on("click", function(){
		_lblErrore.fadeOut(600)
	})
	

    function caricaTabella(){
        for (const question of questions) 
        {
            //vado a creare la tabella con domande e relative risposte
            let p=$("<p>");
            p.addClass("domanda");
            p.text(question.domanda);
            p.appendTo(_domande);

            //richiedo le risposte di una specifica domanda
            let requestRisposte= inviaRichiesta("get","/risposte?codDomanda="+question.id);
            requestRisposte.fail(errore);
            requestRisposte.done(function(data){
                answers=data;
                for (const answer of answers) 
                {
                    let br=$("<br>");
                    br.appendTo(p);

                    let radio=$("<input type=radio >");
                    radio.prop("name",question.domanda);
                    radio.prop("correct",answers.correct);
                    radio.appendTo(p);

                    let span=$("<span>");
                    span.addClass("risposta");
                    span.html(answer.risposta);
                    span.appendTo(p);
                }
            })
        }
        let btnInvia=$("<button>");
        btnInvia.text("INVIA");
        btnInvia.on("click",controllaRisposte);
        btnInvia.appendTo(_domande);    
    }

    function controllaRisposte(){
        let currentQuestion;
        let currentAnswer;
        for (let i = 0; i < _domande.children("p").length; i++) 
        {
            currentQuestion=_domande.children("p").eq(i);
            console.log(currentQuestion.text)
            currentAnswer=currentQuestion.children("radio").prop("checked",true);
            console.log(currentAnswer.text);
            if(currentAnswer.prop("correct"))
            {
                punti++;
            }
        }
        alert("Il tuo punteggio totale è "+punti);
    }

});
