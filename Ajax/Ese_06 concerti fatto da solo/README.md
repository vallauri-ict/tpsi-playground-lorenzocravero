6. > **LEZIONE 6**
     6. > *Consegna Ajax - Ese 6 Concerti*
     
## Obiettivo:
Realizzare una web application single page formattata con bootstrap che gestisca i concerti negli stadi (anno 2018) e contenente le seguenti informazioni / funzionalità:
- Un titolo principale
- Due ListBox affiancate, denominate rispettivamente **lstCitta** e **lstGeneri**, realizzate mediante il componente bootstrap denominato
  **BASIC DROPDOWN** www.w3schools.com/bootstrap/bootstrap_dropdowns.asp
- Un pulsante FILTRA
- Una tabella html che implementa la classe bootstrap **table-hover** dove vengono visualizzate tutte le informazioni dei concerti selezionati.

## Al caricamento della pagina occorre:
- caricare nelle 2 combo-box di filtro l’elenco completo delle città e dei generi aggiungendo in testa una voce **“tutti”**.
- visualizzare nella tabella l’elenco completo di tutti i concerti

## In corrispondenza della selezione di una voce in ciascun listBox:
- Memorizzare in un campo nascosto del listBox medesimo l’intero record relativo al genere o alla città selezionati
- In caso di scelta della voce “tutti” visualizzare il teso iniziale (Città / Generi)

## In corrispondenza del click su un apposito pulsante “Filtra”:
- Aggiornare il contenuto della tabella sottostante visualizzando solo i concerti che soddisfano alle selezioni correnti dei due listBox.
- Per ogni concerto visualizzare tutte le informazioni disponibili, **esclusi i dettagli**.
- Per visualizzare le informazioni contenute nella tabella GENERI e nella tabella CITTA inviare 2 apposite richieste al server per ogni record da 
  visualizzare (una per le informazioni sul genere e l’altra per le informazioni sulla città).
- Le ultime 2 colonne contengono un pulsante DETTAGLI ed un pulsante PRENOTA. Il pulsante DETTAGLI implementa le classi btn btn-info btn-xs.
  Il pulsante PRENOTA implementa le classi btn btn-success btn-xs.
  
## In corrispondenza del click sul pulsante “DETTAGLI”:
- Visualizzare in una textArea inferiore tutti i dettagli relativi al concerto corrente
- La textarea deve essere nascosta ad ogni aggiornamento della tabella

## In corrispondenza del click sul pulsante “PRENOTA”:
- Inviare una richiesta al server per la prenotazione di un biglietto, richiedendo al server di decrementare di 1 il numero di Posti
- In corrispondenza del done visualizzare un alert() di conferma ed eseguire il refresh della tabella.
