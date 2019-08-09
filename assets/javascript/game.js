
const words = ['KENSHIN', 'TACO'];
const currentWord = [];
const displayedWord = [];
const playerGuess = [];
const lettersUsed = [];
const wins = 0;
const guessesRemaining = 12;

function game() {
    console.log("running");
    let currentWord = words[Math.floor(Math.random() * words.length)];
    const underscore = [];
    console.log(currentWord);
    // currentWord.append(words[Math.floor])

    for (let i = 0; i < currentWord.length; i++) {
        displayedWord.push("_");
        $('#randomWord').text(displayedWord.join(' '));
    }

    console.log(displayedWord);
}

game();