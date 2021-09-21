"use strict"

$(document).ready(function()
{	
	let _calciatore = $("#calciatore");
	let _palla = $("#palla");
	
	let _btnEntra=$("#btnEntra");
	let _btnEsci = $("#btnEsci");
	let _btnVisualizzaPalla = $("#btnVisualizzaPalla");
	let _btnNascondiPalla = $("#btnNascondiPalla");
	let _btnTira = $("#btnTira");

	_btnTira.css("visibility","hidden");
	_calciatore.hide();
	_palla.hide();
	_palla.prop("goal",false);
	_btnEsci.css("visibility","hidden");
	_btnNascondiPalla.css("visibility","hidden");

	_btnEntra.on("click",function(){
		_btnEntra.css("visibility","hidden");
		_calciatore.show(1000,function(){
			_btnEsci.css("visibility","visible");
			checkTira();
		});
	});

	_btnVisualizzaPalla.on("click",function(){
		_btnVisualizzaPalla.css("visibility","hidden");
		_palla.fadeIn(1000,function(){
			_btnNascondiPalla.css("visibility","visible");
			checkTira();
		});
	});

	_btnEsci.on("click",function(){
		_btnEsci.css("visibility","hidden");
		_calciatore.hide(1000,function(){
			_btnEntra.css("visibility","visible");
			_btnTira.css("visibility","hidden");
		});
	});

	_btnNascondiPalla.on("click",function(){
		_btnNascondiPalla.css("visibility","hidden");
		_palla.fadeOut(1000,function(){
			_btnVisualizzaPalla.css("visibility","visible");
			_btnTira.css("visibility","hidden");
			if(_palla.prop("goal"))
			{
				_palla.css("left","280px");
				_palla.css("top","365px");
				_palla.css("width","100px");
				_palla.css("height","100px");
				_palla.prop("goal",false);
			}
		});
	});

	_btnTira.on("click",function(){
		$(this).css("visibility","hidden"); //il dollaro è una specie di casting ed è l'implementazione jQuery della funzione this
		let pos = {"left":"1025px",
					"top":"300px",
					"width":"70px",
					"height":"70px"
				  };
		_palla.animate(pos, 1500,function(){
			$(this).prop("goal",true);
		});
	});

	//possiamo in questo caso evitare di associare un puntatore poichè questo metodo viene utilizzato una volta sola
	$("#btnRosso").on("click",function(){
		_palla.prop("src","img/PallaRossa.jpg");
	});
	
	$("#btnBianco").on("click",function(){
		_palla.prop("src","img/Palla.jpg");
	});

	function checkTira(){
		if((_calciatore.is(":visible"))&&(_palla.is(":visible")))
		{
			_btnTira.css("visibility","visible");
		}
	}

});