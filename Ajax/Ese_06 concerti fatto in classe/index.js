"use strict"

const URL = "http://localhost:3000";

$(document).ready(function () {
  let _lstCitta = $("#lstCitta");
  let _lstGeneri = $("#lstGeneri");
  let _btnFiltro = $("#btnFiltro");
  let _tbody = $("table tbody");
  let _divDettagli = $("#divDettagli");

  _divDettagli.hide();
  caricaComboCitta();
  caricaComboGeneri();
  caricaTabella();

  //utilizziamo i delegated events per assicurarci che il li cliccato si quello corrente 
  _lstCitta.on("click", "li", function(){
    let record= $(this).prop("citta");
    _lstCitta.prop("citta",record);
    if(record == undefined)
    {
      _lstCitta.prev().html("Tutti <span class='caret'> </span>");
    }
    else
    {
      _lstCitta.prev().html(record.citta + " <span class='caret'> </span>");
    }
  })

  _btnFiltro.on("click",caricaTabella);

  /**********************************************/
  function caricaComboCitta() {
    let li = $("<li>");
    li.text("Tutti");
    li.appendTo(_lstCitta);
    let request = inviaRichiesta("get", URL +"/citta");
    request.fail(errore);
    request.done(function (citta) {
      for (const item of citta) {
        let li = $("<li>");
        li.appendTo(_lstCitta);
        li.text(item.citta);
        li.prop("citta", item);
      };
    });
  };

  function caricaComboGeneri() {
    let li = $("<li>");
    li.text("Tutti");
    li.appendTo(_lstGeneri);
    let request = inviaRichiesta("get", URL + "/generi");
    request.fail(errore);
    request.done(function (generi) {
      for (const item of generi) {
        let li = $("<li>");
        li.appendTo(_lstGeneri);
        li.text(item.genere);
        li.prop("genere", item);
      };
    });
  };

  function caricaTabella(){
    let genere = _lstGeneri.prop("genere");
    let citta = _lstCitta.prop("citta");
    let json = {};
    //push funge solo su vettori enumerativi
    if(genere != undefined)
      json.codGenere=genere;
    if(citta != undefined)
      json["codCitta"] = citta.id;
    json ={
      "codGenere" : _lstGeneri.prop("genere").id,
      "codCitta" : _lstCitta.prop("citta").id
    }
    let request=inviaRichiesta("get", URL + "/concerti", json);
    request.fail(errore);
    //viene passato il puntatore alla funzione come parametro e il json verrà iniettato nella funzione puntata
    request.done(visualizzaConcerti);
  }

  function visualizzaConcerti(concerti){
    _tbody.html("");
    for (const concerto of concerti) 
    {
      let tr=$("<tr>");
      tr.appendTo(_tbody);

      //creazione delle varie celle
      let td=$("<td>");
      td.appendTo(tr);
      td.text(concerto.id);

      td=$("<td>");
      td.appendTo(tr);
      td.text(concerto.cantante);

      td=$("<td>");
      td.appendTo(tr);
      td.text(concerto.data);

      //essendo le chiamate asincrone.abbiamo creato 3 td diversi per ogni cella da creare
      //affinchè l'ordine non venga sfasato
      let tdGenere=$("<td>");
      tdGenere.appendTo(tr);
      let requestGeneri = inviaRichiesta("get", URL + "/generi/"+concerto.codGenere); //andiamo a richiedere SOLO il genere indicato nel campo codGenere
      requestGeneri.fail(errore);
      requestGeneri.done(function(genere){
        tdGenere.text(genere.genere);
      })

      //non è necessario mettere [0] perchè non ritorna un json ma bensì il singolo record che abbiamo richiesto
      
      let tdCitta=$("<td>");
      tdCitta.appendTo(tr);
      let tdStruttura=$("<td>");
      tdStruttura.appendTo(tr);
      let tdPosti=$("<td>");
      tdPosti.appendTo(tr);
      let requestCitta = inviaRichiesta("get",URL+"/citta/"+concerto.codCitta);
      requestCitta.fail(errore);
      requestCitta.done(function(citta){
        tdCitta.text(citta.citta);
        tdStruttura.text(citta.struttura);
        tdPosti.text(citta.nPosti);
      })

      td=$("<td>");
      td.appendTo(tr);
      let button = $("<button>")
      button.text("Dettagli");
      button.appendTo(td);
      button.addClass("btnInfo");
    }
  }

});
