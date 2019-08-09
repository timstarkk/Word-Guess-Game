
const words = ['KENSHIN', 'TACOO'];
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let currentWord = [];
let displayedWord = [];
let playerGuess = [];
let lettersUsed = [];
let wins = 0;
let guessesRemaining = 12;


// THIS FUNCTION GRABS A RANDOM WORD AND POPULATES THE UNDERSCORES & GUESSES REMAINING
$(document).ready(function onStart() {
    currentWord = words[Math.floor(Math.random() * words.length)];

    for (let i = 0; i < currentWord.length; i++) {
        displayedWord.push("_");
        $('#randomWord').text(displayedWord.join(' '));
    }

    $('#guesses').text(guessesRemaining);
});

console.log(displayedWord);

// THIS FUNCTION HANDLES THE GAMEPLAY WHEN A KEY IS PRESSED
$(document).on('keyup', function (event) {
    guessesRemaining -= 1;
    let guess = event.key;
    guessCap = guess.toUpperCase();
    console.log(guessCap);

    for (let i = 0; i < currentWord.length; i++) {
        if (guessCap === currentWord[i]) {
            displayedWord[i] = guessCap;
        };
    };

    // if (guessCap === '') NEED TO LOOP THROUGH THE ALPHABET ARRAY BEFORE ADDING TO USEDLETTERS. PROB AT FUNCTION START ACTUALLY
    $('#usedLetters').append(guessCap);
    $('#guesses').text(guessesRemaining);
    $('#randomWord').text(displayedWord.join(' '));

});

// onStart();