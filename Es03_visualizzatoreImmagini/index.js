"use strict"

$(document).ready(function()
{
    let _btnIndietro=$("#btnIndietro");
    let _btnAvanti=$("#btnAvanti");
    let _img=$("#img");
    let nImg=1;

    //definisco le proprietà dei pulsanti
    let bottoni={"width":"140px",
                  "height":"40px",
                  "background-color":"orange",
                  "margin":"0px auto",
                  "border-radius":"500px"
                 }
    _btnIndietro.css(bottoni);
    _btnAvanti.css(bottoni);

    _img.css("width","400px");
    _img.prop("src","img/img1.jpg");
    _btnIndietro.prop("disabled",true);

    _btnIndietro.on("click",function(){
        if(nImg>=1)
        {
            nImg--;
            _btnAvanti.prop("disabled",false);
            if(nImg==1)
            {
                _btnIndietro.prop("disabled",true);
            }
            _img.prop("src",("img/img"+nImg+".jpg"));
        }
        
    });

    _btnAvanti.on("click",function(){
        _btnIndietro.prop("disabled",false);
        nImg++;
        if(nImg==7)
        {
            _btnAvanti.prop("disabled",true);
        }
        _img.prop("src",("img/img"+nImg+".jpg"));
    });
})