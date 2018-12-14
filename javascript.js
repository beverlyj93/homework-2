var availableWords = ["balaclava", "beret", "blanket", "boots", "blizzard", "chills", "december", "earmuffs", "evergreen", "fireplace", "snow", "flurries", "frostbite"];
var allowedKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var lettersGuessed = [];
var wins = 0;
var eventStarted = false;
var currentWord = "";
var blankWord = [];
var guessesRemaining = 0;
var wordsToGuess = 0;

document.onkeyup = function(event) {
    if(event.key == "F5") return; // Exclude refreshing the page.

    if(eventStarted) {
        updateLetters(event.key);
        guessLetter(event.key);
    }
}

function updateLetters(letter) {
    if(!allowedKeys.includes(letter)) return;

    if(guessesRemaining == 0) {
        $('body').html("<h1>YOU LOST!</h1><br><h2>The word was: " + currentWord + "</h2>");
        $('body').append("<button id='refresh' onclick='return refreshGame()'>Play Again!</button>");
        return;
    }

    lettersGuessed.push(letter);
    document.getElementById('guesses').innerHTML = guessesRemaining;
    document.getElementById("letters-guessed").innerHTML = lettersGuessed;
}

function refreshGame() {
    window.location.reload();
}

function createBlankWork(word) {
    var substr = [];
    for(var i = 0; i < word.length; i++) {
        substr.push("_");
    }
    return substr;
}

function guessWord() {
    let guess = prompt("Please enter what you think the word is...");
    if(guess === currentWord) {
        $('body').html("<h1>YOU WON!</h1>");
        $('body').append("<button id='refresh' onclick='return refreshGame()'>Play Again!</button>");
    }
    else {
        $('body').html("<h1>YOU LOST!</h1><br><h2>The word was: " + currentWord + "</h2>");
        $('body').append("<button id='refresh' onclick='return refreshGame()'>Play Again!</button>");
    }
}

function guessLetter(letter) {
    if(!allowedKeys.includes(letter)) return;

    for(var i = 0; i < currentWord.length; i++) {
        if(letter == currentWord[i]) {
            blankWord[i] = letter;
            wordsToGuess--;
        }
    }
    document.getElementById("word").innerHTML = blankWord.join(' ');
    guessesRemaining--;

    $(document).ready(function() {
        if(currentWord == blankWord.join('')) {
            $('body').html("<h1>YOU WON!</h1>");
            $('body').append("<button id='refresh' onclick='return refreshGame()'>Play Again!</button>");
            return;
        }
    })
}

function beginEvent(guesses) {
    eventStarted = true;
    currentWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    wordsToGuess = currentWord.length;
    console.log(currentWord);
    blankWord = createBlankWork(currentWord);
    console.log(blankWord);
    document.getElementById("word").innerHTML = blankWord.join(' ');
    console.log(blankWord.length);
    console.log(blankWord.length + guesses);
    guessesRemaining = blankWord.length + guesses;
    updateLetters();

    $('#btn-beginner').prop("disabled", true);
    $('#btn-intermediate').prop("disabled", true);
    $('#btn-expert').prop("disabled", true);

    $('#subheader').html("Event has started! Hopefully you don't win.");
    $('#guesses').html(guessesRemaining);
    $('#guess-word').prop("disabled", "");
}