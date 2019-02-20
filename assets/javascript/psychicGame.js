//letter choices that are available
var computerChoices = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

console.log("computer choice: " + computerChoices);

// setting up the wins to 0 and the losses to 0 and the guesses amount
var wins = 0;
var losses = 0;
var guessesLeft = 9;
var guessedLetters = [];
console.log(typeof (guessedLetters))

var directionsText = document.getElementById("directions-text");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var guessesLeftText = document.getElementById("guessesLeft-text");
var guessedLettersText = document.getElementById("guessedLetters-text");
//reset function
var reset = function () {
    guessesLeft = 9;
    guessedLetters = [];
}
//formula for user guess

document.onkeyup = function (event) {
    var userGuess = event.key
    console.log("user guess: " + userGuess);
    //Computer has a random guess
    var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];
    console.log("computer guess: " + computerGuess);
    // the if else statments with the added .push to count the letters in the array.
    if ((guessesLeft > 1) && (userGuess != computerGuess)) {
        guessesLeft--;
        guessedLetters.push(userGuess);
        console.log(typeof (guessedLetters));
    } else if (userGuess === computerGuess) {
        wins++;
        console.log("winner")
        reset();
    } else {
        losses++;
        console.log("loser")
        reset();
    }




    directionsText.textContent = "Guess what letter I'm thinking of";
    winsText.textContent = "Wins: " + wins;
    lossesText.textContent = "Losses: " + losses;
    guessesLeftText.textContent = "Guesses Left: " + guessesLeft;
    guessedLettersText.textContent = "Guesses Made: " + guessedLetters;




};