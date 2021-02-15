"use strict";

const URL = "http://localhost:3000";

$(document).ready(function () {
  let _lstCitta = $("#lstCitta");
  let _lstGeneri = $("#lstGeneri");
  let _btnFiltro = $("#btnFiltro");
  let _tbody = $("table tbody");
  let _divDettagli = $("#divDettagli");
  let _textArea = $(".form-control");
  let citta;
  let generi;
  let concerti;

  _divDettagli.hide();

  //richiesta per le citta
  let request = inviaRichiesta("get", URL + "/citta");
  request.fail(errore);
  request.done(function (cities) {
    citta = cities;
    let opt = $("<option>");
    opt.text("All");
    opt.prop("citta", 0);
    opt.appendTo(_lstCitta);
    for (const city of cities) {
      opt = $("<option>");
      opt.prop("citta", city.id);
      opt.text(city.citta);
      opt.appendTo(_lstCitta);
    }
  });

  //richiesta per i generi
  request = inviaRichiesta("get", URL + "/generi");
  request.fail(errore);
  request.done(function (genders) {
    generi = genders;
    let opt = $("<option>");
    opt.text("All");
    opt.prop("genere", 0);
    opt.appendTo(_lstGeneri);
    for (const gender of genders) {
      opt = $("<option>");
      opt.prop("genere", gender.genere);
      opt.text(gender.genere);
      opt.appendTo(_lstGeneri);
    }
  });

  //richiesta per i concerti
  request = inviaRichiesta("get", URL + "/concerti");
  request.fail(errore);
  request.done(function (concerts) {
    concerti = concerts;
    creaTabella();
  });

  _btnFiltro.on("click",function(){
    if(_lstCitta.val() == "All")
    {
        if(_lstGeneri.val() == "All")
        {
            creaTabella();
        }
    }
    let cittaSelezionata=_lstCitta.prop("selectedIndex");
    let genereSelezionato=_lstGeneri.prop("selectedIndex");
    console.log(cittaSelezionata);
    request = inviaRichiesta("get",URL+"/concerti?codCitta="+cittaSelezionata+"&codGenere="+genereSelezionato);
    request.fail(errore);
    request.done(function(concertiFiltrati){
        _tbody.empty();
        for (const concerto of concertiFiltrati) 
        {
            let tr = $("<tr>");
            tr.appendTo(_tbody);

            let td = $("<td>");
            td.text(concerto.id);
            td.appendTo(tr);

            td = $("<td>");
            td.text(concerto.cantante);
            td.appendTo(tr);

            td = $("<td>");
            td.text(concerto.data);
            td.appendTo(tr);

            td = $("<td>");
            td.text(generi[concerto.codGenere - 1].genere);
            td.appendTo(tr);

            td = $("<td>");
            td.text(citta[concerto.codCitta - 1].citta);
            td.appendTo(tr);

            td = $("<td>");
            td.text(citta[concerto.codCitta - 1].struttura);
            td.appendTo(tr);

            td = $("<td>");
            td.text(citta[concerto.codCitta - 1].nPosti);
            td.appendTo(tr);

            td = $("<td>");
            let btn = $("<button>");
            btn.text("Dettagli");
            btn.css("backgroundColor", "#007FFF");
            btn.prop("dettagli", concerto.dettagli);
            btn.on("click", visualDettagli);
            btn.appendTo(td);
            td.appendTo(tr);

            td = $("<td>");
            btn = $("<button>");
            btn.text("Prenota");
            btn.css("backgroundColor", "#00BB2D");
            btn.on("click", prenota);
            btn.appendTo(td);
            td.appendTo(tr);
        }
    })
  });

  function creaTabella() {
    _tbody.empty();
    for (const concerto of concerti) {
      let tr = $("<tr>");
      tr.appendTo(_tbody);

      let td = $("<td>");
      td.text(concerto.id);
      td.appendTo(tr);

      td = $("<td>");
      td.text(concerto.cantante);
      td.appendTo(tr);

      td = $("<td>");
      td.text(concerto.data);
      td.appendTo(tr);

      td = $("<td>");
      td.text(generi[concerto.codGenere - 1].genere);
      td.appendTo(tr);

      td = $("<td>");
      td.text(citta[concerto.codCitta - 1].citta);
      td.appendTo(tr);

      td = $("<td>");
      td.text(citta[concerto.codCitta - 1].struttura);
      td.appendTo(tr);

      td = $("<td>");
      td.text(citta[concerto.codCitta - 1].nPosti);
      td.appendTo(tr);

      td = $("<td>");
      let btn = $("<button>");
      btn.text("Dettagli");
      btn.css("backgroundColor", "#007FFF");
      btn.prop("dettagli", concerto.dettagli);
      btn.on("click", visualDettagli);
      btn.appendTo(td);
      td.appendTo(tr);

      td = $("<td>");
      btn = $("<button>");
      btn.text("Prenota");
      btn.css("backgroundColor", "#00BB2D");
      btn.on("click", prenota);
      btn.appendTo(td);
      td.appendTo(tr);
    }
  }

  function visualDettagli() {
    _divDettagli.show();
    _textArea.text("");
    _textArea.text($(this).prop("dettagli"));
  }

  function prenota() {
    alert("Prenotazione eseguita con successo");
  }
});
