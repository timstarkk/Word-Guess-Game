
const words = ['WESTEROS', 'STARK', 'LANNISTER', 'TARGARYEN', 'SNOW', 'DAENERYS', 'WINTERFELL', 'ARYA', 'WHITEWALKER', 'DRAGON', 'TYRION', 'KHALEESI'];
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const afterText = ["Jerome Flynn, who plays Bronn, was in '90s doo-wop duo called Robson and Jerome. They had three No. 1 singles in the U.K.", 'More than 150 babies were named "Khaleesi" in 2012', "The Dothraki language was created just for the show and contains more than 3,000 words.", "Game of Thrones is the first acting role ever for Maisie Williams, who plays Arya", 'Jack Gleeson, aka Joffrey, played a little kid in Batman Begins.', "Emilia Clarke, who plays Daenerys on the show, does not dye her hair blonde. She wears a wig instead.", "George R.R. Martin revealed the ending of the book series to the television show's producers D.B. Weiss and David Benioff in case he does not live to finish the books.", "Emelia Clark (Daenerys) voiced Dr. Zoidberg's girlfriend on Futurama.", 'After the first episode of the show aired, the actor who plays Joffrey, Jack Gleeson, received a letter from George R.R. Martin that read, "Congratulations, everyone hates you!"', "The actress who plays Catelyn Stark, Michelle Fairley, played Mrs. Granger in Harry Potter and the Deathly Hallows."];

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
        $('#alerts').text(`good luck.`)
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
            console.log(guessCap);
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
            let randomNumber = Math.floor(Math.random() * 9);
            $('#alerts').text('You Win! press any key to continue.')
            $('#alerts').html(`<img class="floatLeft heightControl" src="assets/images/win${randomNumber}.gif"> <h2 class="paddingTop" >You Win!</h2> <h6>Fun Fact:</h6> <p class="" >${afterText[randomNumber]}</p><p class="nextGame">Press any key to continue.</p>`);
            document.querySelector('#winSound').play();
            console.log('you win');
        } else if (gameCode.guessesRemaining === 0) {
            let randomNumber = Math.floor(Math.random() * 10);
            $('#alerts').text('You Lose! Press any key to play again...');
            $('#alerts').html(`<img class="floatLeft heightControl" src="assets/images/lose${randomNumber}.gif"> <h2 class="paddingTop" >You Lose...</h2> <h6>Fun Fact:</h6> <p class="" >${afterText[randomNumber]}</p><p class="nextGame">Press any key to start again.</p>`);
            document.querySelector('#loseSound').play();
        }

    },

    resetGame: function () {

        document.querySelector('#winSound').pause();
        document.querySelector('#winSound').currentTime = 0.0;
        document.querySelector('#loseSound').pause();
        document.querySelector('#loseSound').currentTime = 0.0;
        $('#alerts').text(`good luck.`)
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