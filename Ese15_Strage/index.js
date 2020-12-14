"use strict"

 $(document).ready(function(){
     let mainSection=$("#mainSection");
     let btnSubmit;
     let header=$("#header");
     header.animate({width: 60 * 15, height: 6 * 15, "font-size": 45, "line-height": 6 * 15 },1500);

     generaDomande();

     function generaDomande(){
          let cont=0;
          for (const argomenti of elencoDomande) 
          {
               let fieldset;
               let legend;
               let radio1;
               let radio2;
               let span;
               fieldset=$("<fieldset>");
               fieldset.appendTo(mainSection);
               legend=$("<legend>");
               legend.css({"color" : "blue", "font-size":12});
               legend.appendTo(fieldset);
               legend.text(argomenti.argomento);
               let domande=argomenti.domande;
               for (const domanda of domande) 
               {
                    cont++;
                    let p=$("<p>");
                    p.text(domanda.domanda);
                    //console.log(domanda.domanda);
                    //console.log(domanda.risposta);
                    p.prop("id",domanda.risposta);
                    p.appendTo(fieldset);
                    span=$("<span>");
                    radio1=$("<input>");
                    radio1.prop("type","radio");
                    radio1.prop("name",`opt-${cont}`);
                    radio1.prop("value","T");
                    //console.log(radio1.prop("value"));
                    radio1.appendTo(p);
                    span.text("T");
                    span.appendTo(p);

                    span=$("<span>");
                    radio2=$("<input>");
                    radio2.prop("type","radio");
                    radio2.prop("name",`opt-${cont}`);
                    radio2.prop("value","F");
                    //console.log(radio1.prop("value"));
                    radio2.appendTo(p);
                    span.text("F");
                    span.appendTo(p);
               }
          }
          btnSubmit=$("<input>");
          btnSubmit.prop("type","button");
          btnSubmit.prop("value","Invia");
          btnSubmit.addClass("invia");
          btnSubmit.css({"width":60,"height":30});
          btnSubmit.on("click",controllaRisposte);
          btnSubmit.appendTo(mainSection);
     }


     function controllaRisposte(){
          let fieldsets;
          let rispostaUtente;
          let punteggio=0;
          btnSubmit.prop("disabled",true);
          btnSubmit.css({"backgroundColor" : "#CCC","color" : "#999"});

          for (let i = 0; i < 3; i++) 
          {
               let currentfieldset=mainSection.children("fieldset").eq(i);
               for (let j = 0; j < currentfieldset.children("p").length; j++) 
               {
                    let question=currentfieldset.eq(i).children("p");
                    //continuare a mettere .eq(i) e non [i] perchè rimane un oggetto jquery
                    rispostaUtente=question.eq(j).children("input[type=radio]:checked").val();
                    console.log(rispostaUtente);
                    console.log(question.eq(j).prop("id"));
                    //console.log(rispostaUtente.text);
                    //console.log(questions.eq(i).prop("id"));
                    //console.log(questions.eq(i).prop("id"));
                    if(rispostaUtente==question.eq(j).prop("id"))
                    {
                         //console.log("giusto");
                         punteggio++;
                    }
                    else
                    {
                         punteggio=punteggio-0.25;
                         if(question.eq(j).prop("id","T"))
                         {
                              question.children("span").eq(0).css("color","red");
                         }
                              
                         else
                         {
                              question.children("span").eq(1).css("color","red");
                         }
                    }
               }
          }
          alert("Il tuo punteggio finale è "+punteggio);
     }
 });


 
// Una semplice funzione per aggiungere uno 0 davanti ad un numero < 10
function pad(number) {
     return (number < 10 ? '0' : '') + number;
}
