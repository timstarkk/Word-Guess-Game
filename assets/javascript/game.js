
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
    winCondition: false,

    // THIS FUNCTION RUNS AT READY. IT GRABS A RANDOM WORD AND POPULATES THE UNDERSCORED VERSION & GUESSES REMAINING
    getRandomWord: function () {
        console.log(`get random word`)
        gameCode.currentWord = words[Math.floor(Math.random() * words.length)];

        for (let i = 0; i < gameCode.currentWord.length; i++) {
            gameCode.displayedWord.push("_");
            $('#randomWord').text(gameCode.displayedWord.join(' '));
        }

        $('#guesses').text(`Guesses Remaining: ${gameCode.guessesRemaining}`);

        $('#wins').text(`Wins: ${gameCode.wins}`)
    },

    makeUpperCase: function () {
        let guess = event.key;
        guessCap = guess.toUpperCase();
    },

    checkInput: function () {
        console.log(`check input`)
        for (let i = 0; i < alphabet.length; i++) {

            if (guessCap === alphabet[i]) {
                gameCode.alphabet = true;

                for (let i = 0; i <= gameCode.lettersUsed.length; i++) {
                    if (guessCap === gameCode.lettersUsed[i]) {
                        gameCode.used = true;
                        break;
                    } else {
                        gameCode.used = false;
                    }
                }

                if (gameCode.used === false) {
                    gameCode.correctInput = true;
                    gameCode.guessesRemaining -= 1;
                    break;
                }
            } else {
                gameCode.correctInput = false;
            };

        };
    },

    checkForLetterMatch: function () {
        console.log('check for letter match')
        if (gameCode.correctInput === true) {
            let correctGuess = false;
            for (let i = 0; i < gameCode.currentWord.length; i++) {
                if (guessCap === gameCode.currentWord[i]) {
                    gameCode.displayedWord[i] = guessCap;
                    correctGuess = true
                };
            };

            if (correctGuess === true) {
                gameCode.guessesRemaining += 1;
            }
        };
    },

    updateEverything: function () {
        if (gameCode.alphabet === true && gameCode.used === false) {
            gameCode.lettersUsed.push(guessCap);
        };
        console.log('update everything');
        if (gameCode.correctInput === true) {
            $('#usedLetters').append(guessCap);
            $('#guesses').text(`Guesses Remaining: ${gameCode.guessesRemaining}`);
            $('#randomWord').text(gameCode.displayedWord.join(' '));
        }
    },

    winLossHandler: function () {
        for (i = 0; i < gameCode.displayedWord.length; i++) {
            if (gameCode.displayedWord[i] === "_") {
                gameCode.winCondition = false;
                break;
            } else {
                gameCode.winCondition = true;
            }
        };

        console.log(`win handler condition: ${gameCode.winCondition}`);
        if (gameCode.winCondition === true) {
            $('#alerts').text('you win, press any key to continue.')
        } else if (gameCode.guessesRemaining === 0) {
            $('#alerts').text('You Lose! Press any key to play again!');
        }

    },

    resetGame: function () {
        if (gameCode.guessesRemaining === 0) {
            //reset game
            gameCode.playerGuess = [];
            gameCode.lettersUsed = [];
            gameCode.displayedWord = [];
            gameCode.wins = 0;
            $('#wins').text(`Wins: ${gameCode.wins}`)
            gameCode.guessesRemaining = 7;
            gameCode.alphabet = false;
            gameCode.updateEverything();
            gameCode.getRandomWord();
            $('#usedLetters').text('Letters already guessed:');
        };

        console.log(`conditino right before ${gameCode.winCondition}`)
        if (gameCode.winCondition === true) {
            //reset game
            gameCode.playerGuess = [];
            gameCode.lettersUsed = [];
            gameCode.displayedWord = [];
            gameCode.guessesRemaining = 7;
            gameCode.wins += 1;
            gameCode.alphabet = false;
            gameCode.updateEverything();
            gameCode.getRandomWord();
            $('#usedLetters').text('Letters already guessed:');
            gameCode.winCondition = false;
            console.log(`win condition: ${gameCode.winCondition}`);

        };
    },
};


gameCode.getRandomWord();

$(document).on('keyup', function () {
    if (gameCode.guessesRemaining === 0 || gameCode.winCondition === true) {
        gameCode.resetGame();
    } else {
        gameCode.makeUpperCase();
        gameCode.checkInput();
        gameCode.checkForLetterMatch();
        gameCode.updateEverything();
        gameCode.winLossHandler();
    }
});