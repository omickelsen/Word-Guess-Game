//Made the variables first to use in the functions
//Array of randomwords
var randomWords = ['butter', 'grandpa', 'television', 'sclouns', 'hangman', 'love', 'tacos', 'pneumonoultramicroscopicsilicovolcanoconiosis',
    'texas', 'utah', 'california', 'halo', 'apex', 'predator', 'evil', 'vaccine',
    'doctor', 'elk', 'gorilla', 'lion', 'bottle', 'crossfit', 'javascript', 'xbox', 'nintendo', 'balloon',
    'backpack', 'chair', 'trump'
];
var blanksAndSuccess = []; //Correct guesses and blanks will be in this array
var blanks = 0; //holds blanks spaces for the word chosen
var currentWord = "";
var currentLetters = [];
// Counters
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 12;
//Sound variables
var myMusic = document.getElementById("myMusic");
console.log(myMusic + "what is going on here??");
var myStartSound = document.getElementById("myStartSound");
var myWinSound = document.getElementById("myWinSound");
var myLoseSound = document.getElementById("myLoseSound");
var themeMusic = document.getElementById("themeMusic");
var audio = new Audio("./assets/Sounds/Halo theme.mp3");
window.onload = function(){
    audio.play()
    .then(function () {
        console.log("ahhhhh");

    })
    .catch(function (err) {
        console.log(err);
        audio.currentTime = 1;
        audio.play()
        .then(function () {
            console.log("ahhhhh");
    
        })
        .catch(function (err) {
            console.log(err);
            audio.currentTime = 1;
            audio.play()
        })
    })

}


//alphabet array
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

//array for users guessed letters
var guessedLetter = [];
//array for users correct guesses
var correctLetter = [];
//guessed letters that are incorrect
var incorrectGuess = [];



//Below is the functionality of the game
function startGame() {
    numGuesses = 12;
    blanksAndSuccess = [];
    guessedLetter = [];
    incorrectGuess = [];
    audio.pause();
    myMusic.play()
        .then(function () {
            console.log("ahhhhh");

        })
        .catch(function (err) {
            console.log(err);
        })
    console.log(myMusic);
    //Selects a randomword at random
    currentWord = randomWords[Math.floor(Math.random() * randomWords.length)];

    //Splits the current word into letters, so that you can match the users guesses to the letters of the word
    currentLetters = currentWord.split("");

    //Need to know how many blanks
    blanks = currentLetters.length;
    for (var i = 0; i < blanks; i++) {
        blanksAndSuccess.push("_")
    }
    console.log(currentWord);
    document.getElementById('currentWord').innerHTML = "Find the missing letters: " + blanksAndSuccess.join(" ");
    document.getElementById('guessesRemaining').innerHTML = "Guesses left: " + numGuesses;
    document.getElementById('guessed').innerHTML = "Letters already guessed: "
    // document.getElementsByClassName('btn-primary').disabled = false;
    console.log("Start");
    buttons();
}


// create alphabet ul
function buttons() {
    //gets the alphabet button id from html
    var myButtons = document.getElementById('alphabet-btns');
    document.getElementById('alphabet-btns').innerHTML = '';
    //loops through the alphabet
    for (var i = 0; i < alphabet.length; i++) {
        //creates li for list
        let listItem = document.createElement('li');
        //this creates the button and adds the bootstrap button look to it
        listItem = document.createElement('BUTTON');
        listItem.classList.add('btn-primary');
        //gives each list item the id letter
        listItem.id = 'letters';
        listItem.innerHTML = alphabet[i];
        //appends listIem to my buttons
        myButtons.appendChild(listItem);
        listItem.dataset.alphabet = alphabet[i];

        listItem.onclick = function () {
            this.disabled = true;
            var userGuess = listItem.dataset.alphabet;
            guessedLetter.push(userGuess);
            document.getElementById('guessed').innerHTML = "Letters Already Guessed: " + guessedLetter.join(" ");
            checkLetters(userGuess); // runs the code to check for correctness      
            round();
        }

    }
}


//Checks if users letter is in the word
function checkLetters(letter) {
    //using Boolean to check if the letter is in the word
    var letterInWord = false;
    //loop that goes through the length of the word
    for (var i = 0; i < blanks; i++) {
        if (currentWord[i] === letter) {
            letterInWord = true;
        }
    }
    if (letterInWord) {
        for (var i = 0; i < blanks; i++) {

            if (currentWord[i] === letter) {
                blanksAndSuccess[i] = letter
            }
        }
        console.log(blanksAndSuccess);

    } else {
        incorrectGuess.push(letter);
        numGuesses--;
        console.log("that was incorrect " + numGuesses + " are remaining");
    }
}

//Upon finishing
function round() {
    console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);

    // Update the HTML to reflect the new number of guesses. Also update the correct guesses.
    document.getElementById("guessesRemaining").innerHTML = "Number Of Guesses Remaining: " + numGuesses;
    document.getElementById("currentWord").innerHTML = "Find the missing letters: " + blanksAndSuccess.join(" ");
    document.getElementById("guessed").innerHTML = "Letters already guessed: " + incorrectGuess.join(" ");

    // If have gotten all the letters to match the solution... 
    if (currentLetters.toString() === blanksAndSuccess.toString()) {
        victory();
        winCounter++; // add to the win counter 
        document.getElementById("word").innerHTML = "The last word was " + currentWord;
        //TODO set up event.preventDefault() on alert so that the current word is shown on the game screen
        //alert("You win! The word was " + currentWord); // give the user an alert   
        // Update the win counter in the HTML
        document.getElementById("winCounter").innerHTML = "You have won " + winCounter + " game(s)";
        setTimeout(startGame, 1000);// restart the game after 3 seconds
        //startGame(); // restart the game 

    }

    // If run out of guesses
    else if (numGuesses === 0) {
        loser();
        lossCounter++; // add to the loss counter 
        document.getElementById("word").innerHTML = "The last word was " + currentWord;
        //alert("You lose. The word was " + currentWord); // gives the user an alert
        // Update the loss counter in the HTML
        document.getElementById("lossCounter").innerHTML = "You have lost " + lossCounter + " game(s)";
        setTimeout(startGame, 1000);// restart the game after 3 seconds
        // startGame(); // restart the game
    }
}

//Calling the startGame function
document.getElementById("gameStart").onclick = function () {
    buttons()
    startGame();
    myStartSound.play();
    console.log("gamestart")
};

function victory() {
    myWinSound.play();

}

function loser() {
    myLoseSound.play();
    console.log(loser);
}



