'use strict'

function salva(){
  let _titolo=document.getElementById("txtTitolo");
  let _autori=document.getElementById("txtAutori");
  let _categoria=document.getElementById("txtCategoria");
  let _lingua=document.getElementById("txtLingua");
  let _anno=document.getElementById("txtAnno");
  let _prezzo=document.getElementById("txtPrezzo");

    let nuovoRecord={
      "titolo" : _titolo.textValue,
      "autori" : _autori.textValue,
      "categoria" : _categoria.textValue,
      "lingua" : _lingua.textValue,
      "anno" : _anno.textValue,
      "prezzo" : _prezzo.textValue
    }
    let newRecord=JSON.stringify(nuovoRecord);
    alert(newRecord);
    
}



