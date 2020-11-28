'use strict'

window.onload=function(){
    let studente = {  "nome" : "mario", 
                      "cognome" : "rossi",
                      "eta" : 16,
                      "studente" : true,
                      "images" : ["smile.gif", "grim.gif", "frown.gif", "bomb.gif"],
                      "hobbies" : [],                  // vettore al momento vuoto 
                      "pos": { "x": 40, "y": 300 },    // oggetto annidato 
                      "stampa" :   function () { alert("Hello " + this.nome); }, 
                      "fullName" : function () { return this.nome + " " + this.cognome; } 
                    };

    console.log("Età studente: "+studente["eta"]); //ricordarsi di mettere le virgolette nella chiave età altrimenti cerca una variabile di nome età che però non esiste
    studente.eta++;
    console.log("Età studente: "+studente.eta); //è possibile accedere ad un una chiave mettendo il puntino che è sicuramente più leggibile e ti sbagli di meno
    console.log("Nominativo dello studente: "+studente.fullName());

    //aggiunta di una nuova chiave
    studente.residenza="Fossano";
    console.log("Comune di residenza: "+studente.residenza);
    studente["classe"]="4B";
    if("classe" in studente)
    {
        console.log("Classe: "+studente["classe"]);
    }
    else
        this.console.log("Chiave inesistente");

    //creazione di un nuovo object
    let studente2={};
    studente2.nome="roberto";
    studente2.cognome="muggianu";
    studente2.residenza="monforte";
    studente2.eta="16";

    //scansione proprietà dell'oggetto
    this.console.log("STUDENTE2");
    for (let key in studente2) 
    {
        this.console.log(key+" :"+studente2[key]);
    }

    this.console.log("STUDENTE");

    for (let key in studente) 
    {
        let aus=studente[key].toString();
        if(!aus.includes("function"))
        {
            this.console.log(key+" : "+aus);
        }
    }

    //serializzazione di un oggetto

    this.console.log(studente); //la differenza fra alert e console.log è che il secondo serializza in automatico mentre alert non lo fa
    //this.alert(studente);
    this.alert(this.JSON.stringify(studente));

    //vettore enumerativo delle chiavi

    let keys = Object.keys(studente); //questo comando trasforma l'oggetto in un normale vettore dove in pos 1 c'e nome in pos 2 cognome e cosi via
    //il ciclo forof scorre il contenuto degli elementi di un vettore enumerativo
    for (let iterator of keys) 
    {
        this.console.log(iterator);
    }

}

