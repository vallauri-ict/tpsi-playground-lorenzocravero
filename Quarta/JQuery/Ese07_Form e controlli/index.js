"use strict"

let _form1;
$(document).ready(function(){
    _form1=$("#form1");
});

function visualizza(codice){ 
    let msg="";
    let _chk;
    let _opt;
    let select;
    switch(codice)
    {
        case 1:
            msg=_form1.find("input[type=text]:first-of-type").val(); //accede sia a figli che a nipoti
            break;
        case 2:
            //msg=_form1.children("label:nth-of-type(2)").val();
            //msg=_form1.children("label").eq(1);
            msg=_form1.children("label").filter(":nth-of-type(2)").children("select").val(); //in questo caso dovrebbe restituire il value, se assente restituisce la stringa contenuta nell'elemento
            break;
        case 3:
            _chk=_form1.children("fieldset").eq(0).find("input[type=text]");
            //_chk=_form1.children("fieldset").eq(0).children("label").children("input");
            /*for (const item of _chk) 
            {
                msg+=$(item).val()+"\n";
            }*/
            for (let i = 0; i < _chk.length; i++) 
            {
                msg+=_chk.eq(i).prop("name")+" - "+_chk.eq(i).val()+"\n"; //.eq(i) mi permette di continuare "in jQuery" perche se facessimo [i] torneremmo in js e non funzionerebbe
            }
            break;
        case 4:
            _chk=_form1.children("fieldset").eq(0).find("input[type=checkbox]:checked");
            /*for (let i = 0; i < _chk.length; i++) 
            {
                msg+=_chk.eq(i).prop("name")+" - "+_chk.eq(i).val()+"\n"; //.eq(i) mi permette di continuare "in jQuery" perche se facessimo [i] torneremmo in js e non funzionerebbe
            }*/
            _chk.each(function (i,ref) {
                msg += $(ref).prop("name") + " - " + _chk.eq(i).val() + "\n";
            });
            break;
        case 5:
            _chk=_form1.children("fieldset").eq(0).find("input[type=checkbox]").not(":checked");
            _chk.each(function (i,ref) {
                msg += $(ref).prop("name") + " - " + _chk.eq(i).val() + "\n";
            });
            break;
        case 6:
            _opt=_form1.children("fieldset:nth-of-type(2)").find("input[type=radio]"); //accede a tutti i radio button dentro il select
            select=0;
            for (let i = 0; i < 2; i++) 
            {
                if(_opt.eq(i).is(":checked"))
                {
                    //non faccio niente
                }
                else
                {
                    select++;
                }
            }
            if(select==2)
            {
                msg="Nessun radio selezionato";
            }
            else
            {
                let _radio=_form1.children("fieldset").eq(1).find("input[type=radio]:checked");
                msg=_radio.prop("name")+" - "+_radio.eq(0).val();
            }
            break;
        case 7:
            _opt = _form1.children("fieldset:nth-of-type(2)").find("input[type=radio]").not(":checked");
            _opt.each(function (i, ref){
                msg += $(ref).val() + "\n";
            });
            break;
        case 8:
            //let _select=_form1.children("select:last-of-type");
            let _select=_form1.children("select");
            let _selected=_select.children("option:selected");
            _selected.each(function(i,ref){
                msg+=$(ref).val()+" - ";
            });
            msg + "\n";
            for (const item of _select.val()) 
            {
                msg+=item+" ";
            }
            break;
    }
    alert(msg);
}

function imposta(codice){
    switch(codice)
    {
        case 1:
            _form1.find("input[type=text").first().val("nuovo valore");
            break;
        case 2:
            //_form1.find("select").first().prop("selectedIndex",1);
            _form1.find("select").first().children("option").eq(2).prop("selected",true);
            //in questo caso .children non va bene perchè prende
            //solo i figli diretti e select NON lo è,quindi va usato find che prende figli e nipoti
            break;
        case 3:
            let _chks= _form1.children("fieldset").eq(0).find("input[type=checkbox]");
            //let _chks=_form1.children("fieldset").eq(0).children("label").children("input[type=checkbox]");
            //queste 2 sopra sono righe equivalenti,nella prima l'accesso è tramite find(quindi sia figli che nipoti)
            //nella seconda c'è un passaggio in più con childre poichè prende solo i figli diretti
            _chks.first().prop("checked",true);
            _chks.eq(1).prop("checked",true);
            break;
        case 4:
            _form1.children("fieldset").eq(1).find("input[type=radio]").eq(1).prop("checked",true);
            break;
        case 5:
            //let _select= _form1.children("select").last();
           //_select.children("option").eq(0).prop("selected",true)
           //_select.children("option").eq(2).prop("selected",true)
           //_select.val(["2","3"]);
           _form1.children("select").children("option").eq(3).prop("selected",true);
           break;
        default:
            break;
    }
}