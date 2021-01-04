16. > **LEZIONE 16**
     16. > *Consegna jQuery - Ese 16 Memory*

All’avvio l’applicazione visualizza all’interno del wrapper 2 righe e 2 colonne riempiendole con 4 shapes di
colore grigio chiaro. Due di questi shapes, scelti in modo casuale dal programma, devono essere ricolorati di
blu e rimanere visualizzati per 1 secondo e mezzo.
Dopo 1,5 sec le due pedine blu vengono ricolorate di grigio e vengono abilitate al click tutte le pedine
presenti nel wrapper. Scopo del gioco è che l’utente memorizzi la posizione delle due pedine blu e ci clicchi
sopra.
- Se l’utente clicca su una pedina corretta, questa si ricolora di blu (e si disabilita il click)
- Se l’utente clicca su una pedina sbagliata, questa si ricolora di rosso (e si disabilita il click)
Dopo due click
- Se l’utente ha indovinato tutte le pedine blu, compare un messaggio del tipo
“Bravissimo hai completato il livello. Ora passiamo al livello successivo”
Tutte le pedine vengono rimosse dal wrapper e viene generato un nuovo livello
- Se invece NON ha indovinato tutte le pedine, (in corrispondenza del primo elemento rosso)
compare un messaggio del tipo “Hai sbagliato. Devi ripetere il livello corrente”
In questo caso occorre disabilitare il click su tutte le pedine, ripristinare le condizioni iniziali e
ricolorare di blu due pedine casuali

Schema cambio livello:
![Alt text](schema.PNG?raw=true)

