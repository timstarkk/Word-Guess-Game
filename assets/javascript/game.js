
const words = ['KENSHIN', 'TACOO'];
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let currentWord = [];
let displayedWord = [];
let playerGuess = [];
let lettersUsed = [];
let wins = 0;
let guessesRemaining = 12;
let correctInput = false;


// THIS FUNCTION RUNS AT READY. IT GRABS A RANDOM WORD AND POPULATES THE UNDERSCORED VERSION & GUESSES REMAINING
$(document).ready(function onStart() {
    currentWord = words[Math.floor(Math.random() * words.length)];

    for (let i = 0; i < currentWord.length; i++) {
        displayedWord.push("_");
        $('#randomWord').text(displayedWord.join(' '));
    }

    $('#guesses').text(guessesRemaining);
});

// THIS FUNCTION HANDLES THE GAMEPLAY WHEN A KEY IS PRESSED
$(document).on('keyup', function (event) {
    guessesRemaining -= 1;
    let guess = event.key;
    guessCap = guess.toUpperCase();
    console.log(guessCap);

    // this loop checks if the guess is a letter of the alphabet
    for (let i = 0; i < alphabet.length; i++) {
        if (guessCap === alphabet[i]) {
            correctInput = true;
            console.log(correctInput);
            break;
        } else {
            correctInput = false;
            console.log(correctInput);
        };
    };

    // if the pressed key was indeed a letter of the alphabet, the code below here will run
    if (correctInput === true) {

        for (let i = 0; i < currentWord.length; i++) {
            if (guessCap === currentWord[i]) {
                displayedWord[i] = guessCap;
            };
        };

        $('#usedLetters').append(guessCap);
        $('#guesses').text(guessesRemaining);
        $('#randomWord').text(displayedWord.join(' '));

    };

});