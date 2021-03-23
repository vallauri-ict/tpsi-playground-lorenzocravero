"use strict"

const URL = "http://localhost:3000"

$(function () {
    let _head = $('.head');
    let _img = $('.img');
    let _btnPrev = $('button').eq(0);
    let _btnNext = $('button').eq(1);
    let divInfo=$(".info");
    
    //variabili che contengono i dati
    let artisti;
    let vettoreQuadri;
    let generaArtista;

    //indice di scorrimento
    let indiceQuadro = 0;
    
    _btnPrev.prop("disabled", true);
    
    let request = inviaRichiesta("get",URL+"/artisti");
    request.fail(errore);
    request.done(function(data){
        artisti = data;
        for (const artista of artisti) 
        {
            let label = $("<label>");
            let radio = $("<input type='radio'>");
            radio.appendTo(label);
            radio.prop("name","artist");
            radio.prop("artista",artista);
            radio.on("click",caricaQuadriArtista);
            label.append(artista.name);
            label.appendTo(_head);
        }

        let n = generaNumero(0,artisti.length-1);
        let randomRadio = _head.children("label").eq(n).children("input[type=radio]");
        randomRadio.trigger("click");
    })

    function caricaQuadriArtista(){
        divInfo.empty();
        _img.empty();

        let idArtista = $(this).prop("artista").id;
        generaArtista = $(this).prop("artista").gender;
        let request = inviaRichiesta("get",URL + "/quadri?artist="+idArtista);
        request.fail(errore);
        request.done(function(data){
            vettoreQuadri = data;
            visualizzaQuadri(vettoreQuadri, generaArtista);
        });
    }


    function visualizzaQuadri(quadriArtista, genere){
        divInfo.empty();
        _img.empty();
        //creo i campi per le info
        let label = $("<label>");
        label.appendTo(divInfo);
        label.text("ID: "+quadriArtista[indiceQuadro].id);

        $("<br>").appendTo(divInfo);

        label = $("<label>");
        label.appendTo(divInfo);
        label.text("Titolo: "+quadriArtista[indiceQuadro].title);

        $("<br>").appendTo(divInfo);

        label = $("<label>");
        label.appendTo(divInfo);
        label.text("Genere: "+genere);

        $("<br>").appendTo(divInfo);

        label = $("<label>");
        label.appendTo(divInfo);
        label.text("Like: "+quadriArtista[indiceQuadro].nLike);

        let img = $("<img>");
        img.appendTo(label);
        img.prop("src","like.jpg");
        img.on("click",function(){
            let request = inviaRichiesta("patch",URL + "/quadri/"+quadriArtista[indiceQuadro].id, {"nLike" : quadriArtista[indiceQuadro].nLike+1});
            request.fail(errore);
            request.done(function(data){
                visualizzaQuadri(quadriArtista,generaArtista);
            })
        })
        img.css("width","30px");
        img.css("height","30px");

        img = $("<img>");
        if(quadriArtista[0].img.includes("base64,"))
        {
            img.prop("src",quadriArtista[indiceQuadro].img);
            img.appendTo(_img);
        }
        else
        {
            img.prop("src","img/"+quadriArtista[indiceQuadro].img);
            img.appendTo(_img);
        }
    }

    _btnPrev.on("click",function(){
        if(indiceQuadro>=0)
        {
            indiceQuadro--;
            _btnNext.prop("disabled",false);
        }
        if(indiceQuadro==0)
        {
            _btnPrev.prop("disabled",true);
        }
        visualizzaQuadri(vettoreQuadri,generaArtista);
    })


    _btnNext.on("click",function(){
        _btnPrev.prop("disabled",false);
        indiceQuadro++;
        if(indiceQuadro==2)
        {
            _btnNext.prop("disabled",true);
        }
        visualizzaQuadri(vettoreQuadri,generaArtista);
    })

});


