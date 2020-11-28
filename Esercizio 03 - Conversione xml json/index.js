"use strict"

window.onload=function(){
    let _button=document.getElementById("btnConverti");
    _button.addEventListener("click",converti); //senza tonde puntatore a funzione
    
    function converti(){
        let xml=localStorage.getItem("bookstore_xml");
        let parser=new DOMParser();
        let xmlDoc=parser.parseFromString(xml,"text/xml");
        let root=xmlDoc.documentElement;

        //dichiarazione di un vettore enumerativo in cui salveremo i vari libri
        let vetJSON=[];

        //scansione dell'albero
        //root.children è un vettore enumerativo che contiene tutti i figli di root
        for(let i=0;i<root.children.length;i++)
        {
            let book=root.children[i];
            let category="";
            let title="";
            let authors=[];
            let lang="";
            let year="";
            let price="";
            
            //gli attributi sono slacciati dal for poichè il for scorre i nodeName
            if(book.hasAttribute("category"))
            {
                category=book.getAttribute("category");
            }

            for (let j = 0; j < book.children.length; j++) 
            {
                 let campo=book.children[j];
                 switch (campo.nodeName) 
                 {
                    case "title":
                        title=campo.textContent;
                        if(campo.hasAttribute("lang"))
                        {
                            lang=campo.getAttribute("lang");
                        }
                        break;
                    case "author":
                        authors.push(campo.textContent); //.push inserisce l'elemento in fondo al vettore
                        break;
                    case "year":
                        year=campo.textContent;
                        break;
                    case "price":
                        price=campo.textContent;
                        break;
                    default:
                         break;
                 }
            }
            console.log("***BOOK***");
            console.log(title);
            console.log(category);
            console.log(authors);
            console.log(lang);
            console.log(year);
            console.log(price);
            
            //dichiarazione vettore associativo o JSON
            let jsonBook={};
            jsonBook.category=category;
            jsonBook.title=title;
            jsonBook.authors=authors;
            jsonBook.year=year;
            jsonBook["lang"]=lang;
            jsonBook["price"]=price;
            vetJSON.push(jsonBook);
        } 
        //alert(JSON.stringify(vetJSON));
        alert("Dati convertiti e salvati correttamente");
        localStorage.setItem("bookstore_json",JSON.stringify(vetJSON));
    }
}

