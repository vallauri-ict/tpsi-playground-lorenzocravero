"use strict"

const URL = "http://localhost:3000"

$(function () {
    let _head = $('.head');
    let _img = $('.img');
    let _btnPrev = $('button').eq(0);
    let _btnNext = $('button').eq(1);
    let _info=$(".info");
    let posQuadro=0;
    let genereQuadri;
    let elencoQuadri;
    let _wrapperAdd=$(".wrapper").eq(1);
    _btnPrev.prop("disabled", true);
    let request = inviaRichiesta("get",URL+"/artisti");
    request.fail(errore);
    request.done(function(artisti){
        for (const artista of artisti) 
        {
            let lbl=$("<label>");
            lbl.appendTo(_head);
            let radio=$("<input type=radio>");
            radio.prop("type","radio"); //quando bisogna andare a creare delle proprietà non vanno messe al fondo ma vanno inserite tutte insieme per evitare ogni genere di errore/sovrascrizione
            radio.prop("name","artisti");
            radio.prop("artista",artista);
            radio.appendTo(lbl);
            lbl.append(artista.name); //soluzione alternativa: al posto che utilizzare la proprietà html glielo appendiamo come se fosse un elemento 
        }
        let n=generaNumero(0,artisti.length-1);
        let chk = $("input[type=radio]").eq(n).prop("checked",true); //gli pseudoselettori vanno scritti SEMPRE senza spazi intermedi
        let idArtista=chk.prop("artista").id;
        //genereQuadri=$(this).prop("artista").gender;
        inviaRichiestaQuadri(idArtista,chk.prop("artista").gender);
    })

    //utiliziamo posQuadro delegated events su ognuno degli elementi di head
    //con this usiamo il radio button che ha triggerato l'evento,quindi quello selezionato
    _head.on("click","input",function(){
        posQuadro=0;
        _btnPrev.prop("disabled",true);
        _btnNext.prop("disabled",false);
        let id=$(this).prop("artista").id;
        genereQuadri=$(this).prop("artista").gender;
        inviaRichiestaQuadri(id);
    })

    function inviaRichiestaQuadri(id){
        let request2=inviaRichiesta("get",URL+"/quadri?artist="+id);
        request2.fail(errore);
        request2.done(function(data){
            elencoQuadri=data;
            visualQuadro(elencoQuadri[0]);
        })
    }

    function visualQuadro(quadro){
        _info.empty();
        _img.empty();
        $("<p>").text("ID: "+quadro.id).appendTo(_info);
        $("<p>").text("Titolo: "+quadro.title).appendTo(_info);
        $("<p>").text("Genere: "+genereQuadri).appendTo(_info);
        $("<img>").prop("src","img/"+quadro.img).appendTo(_img);
        let p = $("<p>").text("Like: "+quadro.nLike).appendTo(_info);
        let img=$("<img>").prop("src","like.jpg");
        //sintassi della funziona patch da ricordare bene e non sbagliare
        img.on("click",function(){
            let request3=inviaRichiesta("patch",URL+"/quadri/"+quadro.id,{
                "nLike":quadro.nLike+1 //è sbagliato fare nLike++
            });
            request.fail(errore);
            request.done(function(data){
                visualQuadro(data[0]);
                elencoQuadri=data;
            })
        });
        img.addClass("like");
        img.appendTo(p);
        if(quadro.img.includes("base64"))
        {
            $("<img>").prop("src","img/"+quadro.img).appendTo(_img);
        }
        else
        {
            $("<img>").prop("src",quadro.img).appendTo(_img);
        }
    }

    _btnPrev.on("click",function(){
        if(posQuadro>=0)
        {
            posQuadro--;
            _btnNext.prop("disabled",false);
        }
        if(posQuadro==0)
        {
            _btnPrev.prop("disabled",true);
        }
        visualQuadro(elencoQuadri[posQuadro]);
    })

    _btnNext.on("click",function(){
        _btnPrev.prop("disabled",false);
        posQuadro++;
        if(posQuadro==2)
        {
            _btnNext.prop("disabled",true);
        }
        visualQuadro(elencoQuadri[posQuadro]);
    })

});
