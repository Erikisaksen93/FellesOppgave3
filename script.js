// TODO-LIST
// 1. Adjektiv historie (done)
// 2. Display: Grid 2 rows (en for historien, en for adjektivene) (done)
// 3. CSS-styling ()
// 4. Input som lagrer adjektiv i array. (done)
// 5. Trenger funksjon som lager buttons basert på adjektivene. () 
// 6. Onclick funksjon som flytter adjektiv til første ledige plass til story ()
// 7. Skrives om til MVC ()


// model
let story = `<p>Etter en | _ | sommer, kommer den | _ | høsten. Det ser ikke helt lyst ut. <br>

Den | _ | IS-gruppen blir stadig drøyere, mens selv våre | _ | svenske brødre er skremt av den | _ | Putin. <br>

Men det stopper ikke der, listen er | _ | og lang. <br>

Nordmenn plager hverandre med | _ | netthets. Den tidligere så | _ | villaksen er i ferd med å forsvinne fra | _ | vassdrag. <br>

Våre | _ | fotballspillere har sjelden vært dårligere representert i | _ | Premier League, og landets | _ | kornsiloer er ikke lenger trygge. <br>

Det rakner videre i landets | _ | avishus, mens den | _ | PR-bransjen vokser. <br>

Ståle ble kastet ut av det | _ | Big Brother-huset, kaffebarutvalget i Oslo blir stadig mer | _ |, og vinteren tør vi ikke engang tenke på. <br>

Orker du ikke mer? <br></p>`




let storyArray = story.split(' ');
let adjektivNeeded = 16;
let wordArrayAdjectives = []
let button = document.getElementsByClassName('adj-button');
let wordsNeeded= (story.match(/_/g) || []).length;
let storyHtml = document.getElementById('story');
let adjektivHtml = document.getElementById('adjektiv');
let outputHtml = document.getElementById('output');

// view 

// fyller inn i "story" diven i HTML, og legger innholdet av "story" variabelen på linje 12 inn der.
updateView();
function updateView() {
    let input = document.getElementById('input');
    storyHtml.innerHTML = story;
    adjektivHtml.innerHTML =`
            <p>Du trenger ${wordsNeeded} ord for å fylle ut historien</p>
            <input type="text" 
                    id="input"
                    placeholder="Legg til adjektiv"> <br>
                    <button>test</button>
    `;
    
}



// controller

input.addEventListener("keyup", function(event) {
    //Kjør koden under hvis brukeren trykker enter etter å skrivet noe. Hvis ikke enter trykkes
    //skjer det ingenting siden funksjonen er tom utenfor if'en
    if (event.code === "Enter" && wordsNeeded > 1) {
        
        //Lagre inputtet tekst som "word"
        let word = input.value;
        
        //Dersom ordet allerede er lagt til i arrayet, stop funskjonen her
        //Hvis den ikke er det, legg til ordet i adjektivarrayet og fortsett
        if (wordArrayAdjectives.includes(word)) { return };
        wordArrayAdjectives.push(input.value);
        

        //Clear input tekst vinduet etter at ordet er lagret så tekstboksen blir tom
        input.value = "";
        
        //vi clearer output vinduet for å fjerne knappene som allerede er der
        //før vi dytter inn alle ordene på nytt. Dette er nødvendig fordi vi lager nye 
        //buttons for hver gang brukeren putter inn et nytt ord. Hvis vi ikke clearer
        //det først får vi kloner av samme knappene.
        
        adjektivHtml.innerHTML = "";
        
        
        

        //Gå gjennom alle ordene i adjektivarrayet og lag knapper for hvert enkelt ord og gi dem
        //klassen "adj-button". Deretter sett innerhtml til hvert individuelt ord i arrayet.
        //her blir "i" brukt til å spesifisere index i arrayet. Til slutt, putt inn knappen
        //under "output" div'en i html koden.
        for (let i = 0; i < wordArrayAdjectives.length; i++) {
            var btn = document.createElement("BUTTON");
            btn.classList.add('adj-button');
            btn.setAttribute("onclick","addWordToStory(this)");
            btn.innerHTML = `${wordArrayAdjectives[i]}`;
            adjektivHtml.appendChild(btn); 
        }
        
    }
    
})



    //En loop vil kjøre igjennom hver knapp som lages og legge til en evenlistener(click) som vil kjøre funksjonen addWordToStory();
      for (let i = 0; i < button.length; i ++) {
          var buttons = button[i]
      };
      
function addWordToStory(wordElement) {

    //Hent ut teksten fra et html element, legg merke til bruken av innertext
    //istedenfor innerhtml for å unngå å fange opp html tags, vi vil kun ha
    //friendly text. 
    let word = wordElement.innerText;
    console.log(word);
    //Gå gjennom storyen og finn første instans av stringen "_". Når den er funnet
    //Erstatt den med ordet vi hentet ut fra wordelementet. For eksempel:
    //Hvis storyen er lik " jeg er _ " og ordet er lik "rød" vil storyen bli 
    //endret til " jeg er rød "
    story = story.replace("_", word);

    //Etter at storyen er oppdatert, fjern knappen så ordet ikke kan brukes 2 ganger.
    wordElement.remove();
    

    //Sjekk hvor mange ord som trengs for å fullføre storyen. Deretter oppdater viewet så 
    //brukeren kan se storyen med det nye ordet lagt til.
    wordsNeeded= (story.match(/_/g) || []).length;
    updateView();
    
}


