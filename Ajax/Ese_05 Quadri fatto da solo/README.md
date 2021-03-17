5. > **LEZIONE 5**
     5. > *Consegna Ajax - Ese 5 Quadri*
     
## Obiettivo:
Una galleria d'arte desidera creare un sistema che consenta ai suoi clienti di consultare on line il catalogo dei quadri disponibili.
Il sistema è basato sul database allegato **db.json**. Realizzare una applicazione di tipo **single page** basata su jQuery e Ajax che presenti all’avvio un insieme di Option Button 
contenenti l’elenco degli artisti memorizzati nel DB.

## All'avvio:
All’avvio viene selezionato casualmente uno degli artisti e vengono visualizzate nella parte inferiore tutte le informazioni relative al primo quadro di quell’artista.

## In corrispondenza della scelta di un altro artista:
Il sistema deve aggiornare la parte inferiore caricando i quadri dell’artista selezionato e visualizzando il primo quadro.

## I pulsanti AVANTI e INDIETRO:
- Consentono di scorrere i quadri dell’artista selezionato.
- In corrispondenza del 1° quadro il pulsante INDIETRO deve essere disabilitato.
- In corrispondenza dell’ultimo quadro il pulsante AVANTI deve essere disabilitato.

## In caso di click sul pulsante del LIKE:
Viene incrementato il numero di Like del quadro corrente.

## Sezione per inserire un nuovo quadro relativo all’artista:
- L’utente dovrà inserire manualmente soltanto il **titolo** del nuovo quadro.
- **L’immagine** deve essere scelta da file tramite un tag input[type=file] e uploadata in formato base64 mentre
- **nLike** sarà inizializzato a zero.
- **Id** sarà aggiunto automaticamente da json-server.
- Questa sezione avrà un pulsante **Annulla** che semplicemente ripulisce i due textbox, ed un pulsante **Salva** che provvede ad ‘uploadare’ tutte le informazioni relative al nuovo
quadro inserito, forzando poi il refresh della pagina.
