//dichiariamo due librerie che ci serviranno per le funzioni
let _http = require("http");
let _url = require("url");
//con questa variabile otteniamo il file headers.json che contiene tutte le intestazioni
let HEADERS = require("./headers.json"); //punto e slash indica la cartella corrente

let port = 1337; //porta da cui faremo partire node js

let server=_http.createServer(function (req, res) {
    //dichiaro tutte le variabili che conterranno le info da visualizzare
    //NB: a parte il metodo che è contenuto nella request, tutte le altre informazioni si trovano nella URL
    //quindi va parsificata e dopodichè vanno prese le varie property
    let method = req.method;
    let url = _url.parse(req.url,true);
    let params = url.query;
    let resource = url.pathname;
    let hostname = url.hostname;

    //costruisco la risposta mettendoci le informazioni
    res.writeHead(200,HEADERS.html);
    res.write("<h1>Informazioni relative alla richiesta ricevuta</h1>");
    res.write(`<p><b>Risorsa: </b>${resource}</p>`);
    res.write(`<p><b>Metodo: </b>${method}</p>`);
    res.write(`<p><b>Parametri: </b>${JSON.stringify(params)}</p>`);
    res.write(`<p><b>Host: </b>${hostname}</p>`);
    res.write("<p>Richiesta ricevuta correttamente</p>")

    res.end();
});

server.listen(port);
console.log("Server in ascolto sulla porta "+port);