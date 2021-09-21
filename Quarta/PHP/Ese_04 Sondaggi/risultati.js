"use strict"

function creaDiagramma(nSi, nNo, nNs){
    let ctx = document.getElementById("idCanvas").getContext("2d");
    let myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Si", "No", "Non so"],
        datasets: [
          {
            label: "# of Votes",
            data: [nSi, nNo, nNs],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            Width: 1,
          },
        ],
      },
    });
  }