"use strict";

$(document).ready(function () {
  let wrapper = $("#wrapper");
  let righe = 2;
  let colonne = 2;
  let level = 1;
  let correctShapes = new Array();

  generateGameTable();

  function generateGameTable() {
	wrapper.empty();
	
	wrapper.css({ "width": colonne * 50 + "px", "height": righe * 50 + "px" });

    for (let i = 0; i < righe; i++) {
      for (let j = 0; j < colonne; j++) {
        let shape = $("<div>");
        shape.addClass("shape");
        shape.appendTo(wrapper);
      }
    }

    let takenPositions = new Array();
    for (let i = 0; i < (level + 1); i++) {
      correctShapes[i] = generaNumero(0, righe * colonne - 1);
      for (let j = 0; j < takenPositions.length; j++) {
        while (correctShapes[i] == takenPositions[j]) {
          correctShapes[i] = generaNumero(0, righe * colonne - 1);
        }
      }
      takenPositions[i] = correctShapes[i];
      $("#wrapper .shape").eq(correctShapes[i]).addClass("blue");
    }

    setTimeout(function () {
      for (let i = 0; i < $("#wrapper .shape").length; i++) {
        $("#wrapper .shape").eq(i).removeClass("blue");
      }
    }, 1500);

    let correctChoices = 0;
    $("#wrapper .shape").on("click", function () {
      let correct = false;
      for (let i = 0; i < correctShapes.length; i++) {
        if ($("#wrapper .shape").index($(this)) == correctShapes[i]) {
          correct = true;
        }
      }
      if (correct) {
        $(this).addClass("blue");
        correctChoices++;
        if (correctChoices == level + 1) {
		  setTimeout(function () { alert("Bravissimo hai completato il livello. Ora passiamo al successivo"); 
		  level++;
		  colonne++;
		  if(colonne == righe + 2) {
			colonne--;
			righe++;
		  };
		  generateGameTable(); }, 100);
        }
      } else {
        $(this).addClass("red");
		setTimeout(function () { alert("Hai sbagliato. Devi ripetere il livello corrente"); generateGameTable(); }, 100);
      }
      $(this).off();
    });
  }
});

function generaNumero(min, max) {
  return Math.floor((max - min + 1) * Math.random() + min);
}
