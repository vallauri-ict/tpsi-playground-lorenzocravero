7. > **LEZIONE 7**
     7. > *Consegna Ajax - Ese 7 Strage*
     
## Obiettivo:
Si vuole realizzare una applicazione web **single page** per la somministrazione di test on line a risposta chiusa, riservata soltanto agli studenti registrati.
Per ogni domanda sono memorizzate più risposte, una corretta e le altre errate.
- **domande** è una tabella contenente l’elenco di tutte le domande
- **risposte** è una tabella contenente l’elenco di tutte le risposte. Per ogni domanda è riportato: il codice della domanda a cui la risposta si riferisce e un booleano correct che indica se la risposta è giusta oppure sbagliata. Il numero delle risposte è arbitrario e può variare da domanda a domanda

## Il file index.html:
è un file di registrazione in cui l’utente inserisce user e password. In corrispondenza dell’ok, il client invia al server una chiamata ajax.
- In caso utente e password validi il server risponde con un vettore lungo 1 contenente tutte le informazioni dell’utente. In tal caso il client memorizza l’ID dell’uetnte, nasconde la sezione di login e visualizza la sezione relativa alle domande
- In caso di utente / password non validi il server risponde con un vettore lungo 0 ed il client visualizza in rosso un apposito messaggio di errore

## Una volta eseguita la registrazione:
il client richiede al server l’elenco di tutte le domande. In corrispondenza di ogni domanda ricevuta richiede l’elenco di tutte le relative risposte e provvede a visualizzare la domanda e le risposte utilizzando il formato indicato di 
seguito:
- Per le domande si utilizza un tag <p> con colore del testo blu e font-size 16pt
- Per le risposte si utilizzano degli <input type=’radio’ ognuno seguito da un tag <span> contenente il testo della risposta
- Al termine delle varie risposte viene automaticamente aggiunta una ulteriore risposta preselezionata con testo “Non rispondo”
- In coda a tutte le domande viene creato un pulsante INVIA

## In corrispondenza del click sul pulsante INVIA:
l’applicazione calcola il voto sommando 1 punto per ogni risposta corretta e ricolorando di rosso le risposte sbagliate. Al termine visualizza il voto ottenuto e lo invia al server che provvede a registrarlo all’interno del database.