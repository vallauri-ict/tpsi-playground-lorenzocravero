"use strict"

$(document).ready(function(){
    let _lampadina=$(".lampadina");
    let _btnSpegni=$("#btnSpegni");
    let _btnAccendi=$("#btnAccendi");
    let _descrizione=$("#descrizione");
    let _contenuto=$("#contenuto");

    _btnSpegni.hide();
    _lampadina.hide();

    _btnAccendi.on("click",function(){
        _lampadina.addClass("accesa");
        _lampadina.fadeIn(2000, function(){
            _btnSpegni.show();
            _btnAccendi.hide();
        });
    });

    _btnSpegni.on("click",function(){
        _lampadina.fadeOut(2000, function(){
            _btnAccendi.show();
            _btnSpegni.hide();
        });
        _lampadina.removeClass("accesa");
    });

    let descrizione={
        "width":"160px",
        "height":"400px",
        "text-align":"center",
        "line-height":"40px",
        "background-Color":"#aaa",
        "text-decoration":"underline",
        "fontSize":"14pt",
        "cursor":"pointer",
        "borderRadius":"10px",
        "margin-left":"10px",
    }

    _descrizione.css(descrizione);
    _contenuto.hide();
    _descrizione.on("mouseover",function(){
        _contenuto.slideDown(1500);
    });

    _descrizione.on("mouseout",function(){
        _contenuto.slideUp(1500);
    })
})
