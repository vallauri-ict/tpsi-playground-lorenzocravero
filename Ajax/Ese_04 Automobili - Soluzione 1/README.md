4. > **LEZIONE 4**
     4. > *Consegna Ajax - Ese 4 Automobili*
     
## Obiettivo:
Si vuole realizzare una applicazione per l’esposizione/vendita di automobili usate. Il sistema è basato sul database db.json.

## All'avvio:
Si deve richiedere al json-server l’elenco delle marche trattate dal venditore. Questo elenco deve essere caricato all’interno di una semplice lista, memorizzando l’ID all’interno del
campo nascosto value.

## In corrispondenza della scelta di una marca dalla lista:
L’applicazione richiede al server l’elenco di tutti i modelli disponibili relativamente alla marca selezionata, modelli visualizzati all’interno di una seconda lista salvando come
prima l’ID nel campo nascosto value e visualizzando nome del modello e tipo di alimentazione.

## In corrispondenza della scelta di un modello dalla lista:
L’applicazione richiede al server l’elenco di tutte le automobili di quel modello presenti a magazzino. Provvede visualizzare all’interno di una tabella html creata dinamicamente
le seguenti informazioni: **nomeModello**, **alimentazione**, colore, anno, img. Le immagini hanno una altezza fissa di 65px.

## Al termine di ogni riga sono posizionati:
- un pulsante **dettagli** che consente di visualizzare una nuova sezione contenente tutti i dettagli dell’automobile selezionata, compresi **alimentazione** e **cilindrata**. Il campo
  prezzo è realizzato mediante un textbox editabile con a fianco un pulsante salva.
- un pulsante **elimina** che consente di eliminare dal database l’automobile corrente. In corrispondenza dell’ok, visualizzare un messaggio di conferma e ricaricare la sola tabella
  dei dettagli.
