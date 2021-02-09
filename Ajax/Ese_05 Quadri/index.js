"use strict"

const URL = "http://localhost:3000"

$(function () {
    let _head = $('.head');
    let _img = $('.img');
    let _btnPrev = $('button').eq(0);
    let _btnNext = $('button').eq(1);
    let divInfo=$(".info");
    let gender;
    let aus=[];
    let quadri;
    _btnPrev.prop("disabled", true);
    let i=0;
    let nArt=generaNumero(1,6);

    let url=URL+"/quadri?artist="+nArt;
    let request=inviaRichiesta("get",url);

    _head.find("input[type=radio]").eq(nArt-1).prop("checked",true);
    aus=_head.find("input[type=radio]:checked").prop("id").split("-");
    gender=aus[1];
    request.fail(errore);
    request.done(function(data){
        quadri=data;
        mostraDettagli(quadri);
    });

    _btnNext.on("click",function(){
        _btnPrev.prop("disabled",false);
        i++;
        if(i==2)
        {
            _btnNext.prop("disabled",true);
        }
        mostraDettagli(quadri);
    });

    _btnPrev.on("click",function(){
        if(i>=0)
        {
            i--;
            _btnNext.prop("disabled",false);
        }
        if(i==0)
        {
            _btnPrev.prop("disabled",true);
        }
        mostraDettagli(quadri);
    });

    function mostraDettagli(quadri){
        divInfo.empty();
        _img.empty();
        let quadro=quadri[i];

        //creo e assegno ad ogni div l'informazione corretta
        let div=$("<div>");
        div.prop("id","Id");
        div.text("ID: "+quadro.id);
        div.appendTo(divInfo);

        div=$("<div>");
        div.prop("id","titolo");
        div.text("Titolo: "+quadro.title);
        div.appendTo(divInfo);

        div=$("<div>");
        div.prop("id","genere");
        div.text("Genere: "+gender);
        div.appendTo(divInfo);

        div=$("<div>");
        div.prop("id","like");
        div.text("Like: "+quadro.nLike);
        div.appendTo(divInfo);
        let img=$("<img>");
        img.prop("src","like.jpg");
        img.addClass("like");
        img.appendTo(div);

        img=$("<img>");
        img.prop("src","img/"+quadro.img);
        img.appendTo(_img);

        
    }

});

function generaNumero(min,max){
	let n=Math.floor((max-min+1)*Math.random()+min);
	return n;
}
