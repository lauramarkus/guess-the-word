//global variables
const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingLetterSpan = document.querySelector(".remaining-span");
const message = document.querySelector(".message-p");
const playAgainButton = document.querySelector(".play-again");

//test word is temporary until random words are fetched from API
const word = "magnolia";

//function to use placeholder dots for each letter of the mystery word
const placeholder = function(word){
    const placeholderLetters = []; //empty array for the mystery word
    for (const letter of word){ //tells program to iterate over each letter 
        console.log(letter);
        placeholderLetters.push("●"); //adds a dot to the end of the array
    }
    wordInProgress.innerText = placeholderLetters.join(""); //join method returns an array as a string
};

placeholder(word); //calling the placeholder function with the test word

//click event for 'guess' button
guessButton.addEventListener("click", function (e){
    e.preventDefault(); //prevents the form from reloading after click
    const guess = letterInput.value; //takes LetterInput from global variables and gives it a value inputted from user
    console.log(guess);
    letterInput.value = "";
});





