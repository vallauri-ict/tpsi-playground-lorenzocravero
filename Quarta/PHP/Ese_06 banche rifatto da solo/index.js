"use strict";

//forma abbreviata di docuemtn ready
$(function () {
	let _wFiliali=$("#wrapFiliali");
	let _divInfo = $("#info");
	let _wCorrentisti= $("#wrapCorrentisti");
    let _lstBanche = $("#lstBanche");
	let _lstFiliali = $("#lstFiliali");
	let tabCorrentisti = $("#tabCorrentisti").children("tbody");

	_divInfo.css("display","none");
	_wCorrentisti.css("display", "none");
	_lstBanche.prop("selectedIndex",-1);

	/*let request = inviaRichiesta("get","servizi/elencoBanche.php");
	request.fail(errore);
	request.done(function(banche){
		console.log(banche);
		for (const banca of banche) 
		{
			let opt = $("<option>");
			opt.val(banca.cBanca);
			opt.text(banca.Nome);
			opt.appendTo(_lstBanche);	
		}
		_lstBanche.prop("selectedIndex",-1);
	})*/
    
	_lstBanche.on("change",function(){
		let cBanca = _lstBanche.val();
		let request = inviaRichiesta("get","servizi/elencoFiliali.php",{"cBanca" : cBanca});
		request.fail(errore);
		request.done(function(filiali){
			console.log(filiali);
			for (const filiale of filiali) 
			{
				let opt = $("<option>");
				opt.val(filiale.cFiliale);
				opt.text(filiale.Nome);
				opt.appendTo(_lstFiliali);	
			}
		})
		_lstFiliali.prop("selectedIndex",-1);

		let request2 = inviaRichiesta("post","servizi/sedeCentrale.php",{"id" : cBanca});
		request2.fail(errore);
		request2.done(function(sede){
			console.log(sede);
			_divInfo.children("p").text("La sede centrale di questa banca si trova a "+sede[0].Nome);
		})
		_divInfo.css("display","block");
	})

	_lstFiliali.on("change",function(){
		let cFiliale = _lstFiliali.val();
		let request3 = inviaRichiesta("get","servizi/elencoCorrentisti.php",{"cFiliale" : cFiliale});
		request3.fail(errore);
		request3.done(function(correntisti){
			console.log(correntisti);

			_wCorrentisti.css("display", "block");
			for (const correntista of correntisti) 
			{
				let tr = $("<tr>");
				tr.appendTo(tabCorrentisti);

				let td = $("<td>");
				td.text(correntista.cCorrentista);
				td.appendTo(tr);

				td = $("<td>");
				td.text(correntista.Nome);
				td.appendTo(tr);

				td = $("<td>");
				td.text(correntista.cComune);
				td.appendTo(tr);

				td = $("<td>");
				td.text(correntista.Telefono);
				td.appendTo(tr);

				td = $("<td>");
				td.text(correntista.cConto);
				td.appendTo(tr);

				td = $("<td>");
				td.text(correntista.Saldo);
				td.appendTo(tr);
			}

		})
	})
	
	
});