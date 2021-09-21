$(document).ready(function() {

	let _btnAvvia = $("#btnAvvia");
	_btnAvvia.on("click", eseguiAnimazione);

	_btnAvvia.css("opacity",0);
	let lamp=true;
	lampeggio();
 
	function eseguiAnimazione(){
		_btnAvvia.off("click"); //rimuovo l'evento del bottone
		lamp=false; //nascondo graficamnete il pulsante
		_btnAvvia.css("cursor","default");
		$("#pedina")
		.css({left:"10px",top:"260px", width:"15px", height:"15px"})
		.animate({left:'+=60px', width:"8px", height:"8px"},'1300')
		.animate({top:'+=38px',  width:"15px", height:"15px"},'1300')
		.animate({left:'+=116px',width:"8px", height:"8px"},'1300')
		.animate({top:'+=77px',  width:"15px", height:"15px"}, '1300')
		.animate({left:'+=250px',width:"8px", height:"8px"},'1300',function(){
			_btnAvvia.on("click", eseguiAnimazione);
			lamp=true;
			_btnAvvia.css("cursor","pointer");
			lampeggio();
		});
	}

	function lampeggio(){
		_btnAvvia.animate({"opacity":1},450,function(){});
		_btnAvvia.animate({"opacity":0},450,function(){
			if(lamp)lampeggio();
		});
		//l'equivalente di animate sarebbe fadeIn e fadeOut poichè 2 animazioni su uno stesso oggetto vengono accodate
	}

});
