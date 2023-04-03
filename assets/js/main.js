// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
// Bonus
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

// funzione custom per creare box
function creaBox( tipo, classe, testo ){
    let div = document.createElement( tipo );
    div.classList.add( classe );
    div.innerText = testo;
    return div;
}

//funzione al click del bottone play
document.getElementById( "play" ).addEventListener( "click", function(){ 
    
    //variabili
    let grid = document.querySelector( '.grid' );
    let diff = document.getElementById( "diff" ).value;
    let button = document.createElement( "button" );
    let main = document.querySelector( "main" );
    grid.innerHTML = "";
    let score = 0;
    

    // funzione custom per creare box in base alla difficoltà
    function difficoltà( celle, misure) {
    //crea array bomb
    let arrayBomb = []
    randomBomb(arrayBomb, diff)
    console.log( arrayBomb );

    for( let i = 1; i <= celle; i++ ){
        const creaDiv = creaBox( 'div', misure , i );
        grid.appendChild( creaDiv );
        creaDiv.addEventListener( "click", function(){

            if( !arrayBomb.includes(i)){
                this.classList.toggle( "active" );
                score++                                   
            } else{
                this.innerHTML = `<i class="fa-solid fa-bomb fa-bounce" style="color: #ff0000; font-size: 20px"><i>`;
                main.innerHTML = `HAI PERSO, Il tuo punteggio è ${score}.`;
                button.classList.add( "button" );
                button.setAttribute( "onclick", "window.location.reload()")
                button.innerText = "Restart";
                main.append( button );
            }    
        })
    }
    }

    //condizioni di difficoltà
    if( diff == "100" ){
        difficoltà( 100 , "box-easy")
    } 
    else if( diff == "81"){
        difficoltà( 81, "box-medium")
    }
    else if( diff == "49"){
        difficoltà( 49, "box-hard")
    }   
})


function randomBomb(arrayBomb, x){
    for( let i = 1; arrayBomb.length < 16; i++ ){
        let bomb = Math.floor( Math.random() * x ) + 1;
        
        if(!arrayBomb.includes( bomb ) ){
            arrayBomb.push( bomb );
        }
        
    }
    // console.log( arrayBomb );
    return arrayBomb;
}