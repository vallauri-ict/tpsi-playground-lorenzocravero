
var utenti = [ {"user":"pippo",  "pwd":"pwdPippo"},
               {"user":"pluto",  "pwd":"pwdPluto"},
			   {"user":"minnie", "pwd":"pwdMinnie"} ];
let _form=$("frmLogin");
let _txtUser;
let _txtPwd;
let _btnSubmit;
let posUser;
let posPwd;
			   
$(document).ready(function() {
    _btnSubmit=$("#btnSubmit");
    _txtUser=$("#txtUser");
    _txtPwd=$("#txtPwd");
    let utenteOk;
    let pwdOk;

    
    _txtUser.on("change",function(){
        let _msgUser=$("#msgUser");
        _msgUser.css("visibility","hidden");
        let utente=_txtUser.val();
        utenteOk=false;
        if(utente=="")
        {
            _msgUser.css("visibility","visible");
            _msgUser.text("Utente mancante");
            _txtUser.css("border","1px solid red");
        }
        else
        {
            let i=0;
            for (const item of utenti) 
            {
                i++;
                if(item.user==utente)
                {
                    posUser=i;
                    utenteOk=true;
                }
            }
            if(!utenteOk)
            {
                _msgUser.css("visibility","visible");
                _msgUser.text("Utente non valido");
                _txtUser.css("border","1px solid red");
            }
            else
            {
                _msgUser.css("visibility","visible");
                _msgUser.text("OK");
                _txtUser.css("border","1px solid green");
            }
        }
    })

    _txtPwd.on("change",function(){
        let _msgPwd=$("#msgPwd");
        _msgPwd.css("visibility","hidden");
        let password=_txtPwd.val();
        pwdOk=false;
        let i=0;
        if(password=="")
        {
            _msgPwd.css("visibility","visible");
            _msgPwd.text("Password mancante");
            _txtPwd.css("border","1px solid red");
        }
        for (const item of utenti) 
        {
            i++;
            if(item.pwd==password)
            {
                posPwd=i;
                if(posPwd==posUser)
                {
                    pwdOk=true;
                }
            }
        }
        if(!pwdOk)
        {
            _msgPwd.css("visibility","visible");
            _msgPwd.text("Password non valida");
            _txtPwd.css("border","1px solid red");
        }
        else
        {
            _msgPwd.css("visibility","visible");
            _msgPwd.text("OK");
            _txtPwd.css("border","1px solid green");
        }
    });

    
    _btnSubmit.on("click",function(){
        if(pwdOk && utenteOk)
        {
            alert("Login effettuato corretttente");
        }
        else
        {
            alert("Dati errati");
        }
    });
});