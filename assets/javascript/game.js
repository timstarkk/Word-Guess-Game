
const words = ['KENSHIN', 'TACOO'];
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const gameCode = {

    currentWord: [],
    displayedWord: [],
    playerGuess: [],
    lettersUsed: [],
    wins: 0,
    guessesRemaining: 7,
    alphabet: false,
    used: false,

    // THIS FUNCTION RUNS AT READY. IT GRABS A RANDOM WORD AND POPULATES THE UNDERSCORED VERSION & GUESSES REMAINING
    getRandomWord: function () {
        gameCode.currentWord = words[Math.floor(Math.random() * words.length)];

        for (let i = 0; i < gameCode.currentWord.length; i++) {
            gameCode.displayedWord.push("_");
            $('#randomWord').text(gameCode.displayedWord.join(' '));
        }

        $('#guesses').text(gameCode.guessesRemaining);
    },

    makeUpperCase: function () {
        let guess = event.key;
        guessCap = guess.toUpperCase();
    },

    checkInput: function () {
        for (let i = 0; i < alphabet.length; i++) {

            if (guessCap === alphabet[i]) {

                for (let i = 0; i <= gameCode.lettersUsed.length; i++) {
                    if (guessCap === gameCode.lettersUsed[i]) {
                        console.log('used')
                        gameCode.used = true;
                        break;
                    } else {
                        console.log('not used')
                        gameCode.used = false;
                        console.log(gameCode.lettersUsed);
                    }
                }
                console.log('console log used ' + gameCode.used);
                if (gameCode.used === false) {
                    gameCode.lettersUsed.push(guessCap);
                    console.log('hello');
                    gameCode.correctInput = true;
                    gameCode.guessesRemaining -= 1;
                    //game over alert if statement.
                    if (gameCode.guessesRemaining === 0) {
                        alert('You Lose!');
                        //reset game
                    }
                    break;
                }
            } else {
                gameCode.correctInput = false;
            };

        };
    },

    checkForLetterMatch: function () {
        if (gameCode.correctInput === true) {

            for (let i = 0; i < gameCode.currentWord.length; i++) {
                if (guessCap === gameCode.currentWord[i]) {
                    gameCode.displayedWord[i] = guessCap;
                    gameCode.guessesRemaining += 1;
                };
            };
        };
    },

    updateEverything: function () {
        console.log('update everything');
        console.log(gameCode.correctInput);
        if (gameCode.correctInput === true) {
            $('#usedLetters').append(guessCap);
            $('#guesses').text(gameCode.guessesRemaining);
            $('#randomWord').text(gameCode.displayedWord.join(' '));
        }
    }
}


gameCode.getRandomWord();

$(document).on('keyup', function (e) {
    gameCode.makeUpperCase();
    gameCode.checkInput();
    gameCode.checkForLetterMatch();
    gameCode.updateEverything();
});