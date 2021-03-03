"option strict";

const URL = "http://localhost:3000";
let citta;
let generi;
let concerti;

// UNDEFINED EQUIVALE A NULL

$(document).ready(function () {
  const _lstCitta = $("#lstCitta");
  const _lstGeneri = $("#lstGeneri");
  const _btnFiltro = $("#btnFiltro");
  const _tbody = $("table tbody");
  const _divDettagli = $("#divDettagli");

  caricaComboCitta();
  caricaComboGeneri();
  caricaTabella();

  _lstCitta.on("click", "li", function () {
    _lstCitta.prop("citta", $(this).prop("citta"));
    if ($(this).prop("citta") == undefined) {
      // .prev() prende il previous sibling dell'elemento
      _lstCitta.prev().html("Tutti <span class='caret'></span>");
      _lstCitta.prop("citta", null);
    } else {
      _lstCitta
        .prev()
        .html($(this).prop("citta").citta + "<span class='caret'></span>");
    }
  });

  _lstGeneri.on("click", "li", function () {
    _lstGeneri.prop("genere", $(this).prop("genere"));
    if ($(this).prop("genere") == undefined) {
      // .prev() prende il previous sibling dell'elemento
      _lstGeneri.prev().html("Tutti <span class='caret'></span>");
      _lstGeneri.prop("genere", null);
    } else {
      _lstGeneri
        .prev()
        .html($(this).prop("genere").genere + "<span class='caret'></span>");
    }
  });

  _btnFiltro.on("click", caricaTabella);

  /**********************************************/
  function caricaComboCitta() {
    let li = $("<li>");
    li.text("Tutti");
    li.appendTo(_lstCitta);
    let request = inviaRichiesta("get", "/citta");
    request.fail(errore);
    request.done(function (citta) {
      for (const item of citta) {
        let li = $("<li>");
        li.appendTo(_lstCitta);
        li.text(item.citta);
        li.prop("citta", item);
      }
    });
  }

  function caricaComboGeneri() {
    let li = $("<li>");
    li.text("Tutti");
    li.appendTo(_lstGeneri);
    let request = inviaRichiesta("get", "/generi");
    request.fail(errore);
    request.done(function (generi) {
      for (const item of generi) {
        let li = $("<li>");
        li.appendTo(_lstGeneri);
        li.text(item.genere);
        li.prop("genere", item);
      }
    });
  }

  function caricaTabella() {
    let genere = _lstGeneri.prop("genere");
    let citta = _lstCitta.prop("citta");
    let json = {};

    // push funziona solo sui vettori enumerativi
    if (genere != null) {
      // anche se non c'è nulla nel json codGenere viene
      // aggiunto automaticamente
      json.codGenere = genere.id;
    }

    if (citta != null) {
      json["codCitta"] = citta.id;
    }

    let request = inviaRichiesta("get", "/concerti", json);
    request.fail(errore);
    // il parametro che mi ritorna la promise viene iniettato
    // automaticamente il parametro data
    request.done(visualizzaConcerti);
    _divDettagli.hide();
  }

  function visualizzaConcerti(concerti) {
    _tbody.empty();
    for (const item of concerti) {
      let tr = $("<tr>");
      tr.appendTo(_tbody);

      let td = $("<td>");
      td.appendTo(tr);
      td.text(item.id);

      td = $("<td>");
      td.appendTo(tr);
      td.text(item.cantante);

      td = $("<td>");
      td.appendTo(tr);
      td.text(item.data);

      let tdGenere = $("<td>");
      tdGenere.appendTo(tr);
      // in questo caso non bisogna specificare il campo id perchè
      // se non mettiamo nulla si prende automaticamente un campo id
      let request = inviaRichiesta("get", "/generi/" + item.codGenere);
      request.fail(errore);
      // la promise restituisce un json singolo quando gli passiamo un id,
      // ma nel caso in cui chiedessimo un campo specifico ci ritorna
      // sempre un vettore enumerativo anche lungo 1
      request.done(function (genere) {
        console.log(genere);
        tdGenere.text(genere.genere);
      });

      let tdCitta = $("<td>");
      tdCitta.appendTo(tr);

      let tdStruttura = $("<td>");
      tdStruttura.appendTo(tr);

      let tdNPosti = $("<td>");
      tdNPosti.appendTo(tr);

      request = inviaRichiesta("get", "/citta/" + item.codCitta);
      request.fail(errore);
      request.done(function (data) {
        tdCitta.text(data.citta);
        tdStruttura.text(data.struttura);
        tdNPosti.text(data.nPosti);
      });

      td = $("<td>");
      td.appendTo(tr);
      let button = $("<button>");
      button.addClass("btn btn-info btn-xs");
      button.text("DETTAGLI");
      button.on("click",function(){
        _divDettagli.show();
        if(item.nPostiOccupati == undefined)
        {
          _divDettagli.children("textarea").text(item.dettagli + "\n Posti occupati : 0");
        }
        else
        {
          _divDettagli.children("textarea").text(item.dettagli + "\n Posti occupati : "+ item.nPostiOccupati);
        }
      });
      button.appendTo(td);

      td = $("<td>");
      td.appendTo(tr);
      button = $("<button>");
      button.addClass("btn btn-success btn-xs");
      button.appendTo(td);
      button.text("PRENOTA");
      button.prop("nPosti",item.nPosti);
    }
  }

  //delegated event con cui vado a prendere i button che implementano la classe btn-success
  _tbody.on("click", "button.btn-success", function(){
    //navigando il dom abbiamo preso i fratelli del bottone prenota, quindi gli altri campi del record
    //e preso il primo ossia l'id
    let id = $(this).parent().siblings().eq(0).text(); 
    let nPosti = $(this).prop("nPosti"); 
    //controllo che nPosti NON sia undefined
    if(nPosti == undefined)
    {
      nPosti = 1;
    } 
    else
    {
      nPosti=parseInt(nPosti)+1;
    }                                                                                                                                                             
    let request = inviaRichiesta("patch","/concerti/"+id,{"nPostiOccupati" : nPosti});
    request.fail(errore);
    request.done(function(infodata){
      //console.log solo per verificare che sia tutto a posto
      console.log(infodata);
      alert("Prenotazione effettuata con successo");
      //non ci resta che refreshare la tabella per vedere i dati aggiornati
      caricaTabella();
    });
  })

})
