
const words = ['KENSHIN', 'TACO'];
const currentWord = [];
const displayedWord = [];
const playerGuess = [];
const lettersUsed = [];
const wins = 0;
const guessesRemaining = 12;

function game() {
    let currentWord = words[Math.floor(Math.random() * words.length)];
    const underscore = [];
    // currentWord.append(words[Math.floor])

    for (let i = 0; i < currentWord.length; i++) {
        displayedWord.push("_");
        $('#randomWord').text(displayedWord.join(' '));
    }

}

game();