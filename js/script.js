//global variables
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");


const word = "magnolia";  //test word is temporary until random words are fetched from API
const guessedLetters = []; //sets empty array for guessed letters


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


guessButton.addEventListener("click", function (e){   //click event for 'guess' button
    e.preventDefault(); //prevents the form from reloading after click
    message.innerText = ""; //empty out the message
    const guess = letterInput.value; //takes LetterInput from global variables and gives it a value inputted from user 
    const goodGuess = inputCheck(guess);

    if (goodGuess){
        makeGuess(guess);
    }
    letterInput.value = "";
});



const inputCheck = function(input){
    const acceptedLetter = /[a-zA-Z]/; //regular expression to validate the input
    if (input.length === 0){
        message.innerText = "Please enter a letter."; //checks to make sure there is a value
    } else if (input.length > 1){
        message.innerText = "Just 1 letter at a time."; //checks to make sure there is not more than 1 letter
    } else if (!input.match(acceptedLetter)){
        message.innerText = "You can only guess letters from A to Z. Let's try again."; //makes sure input is not a special character
    }
    return input;
};

const makeGuess = function (guess){
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)){
        message.innerText = "You've already guessed that one."
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};
 
const showGuessedLetters = function (){
    guessedLettersElement.innerHTML="";
    for (const letter of guessedLetters){
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    
    const checkWord = [];
    for (const letter of wordArray){
        if (guessedLetters.includes(letter)){
            checkWord.push(letter.toUpperCase());
        }else{
            checkWord.push("●");
        }    
        }
        wordInProgress.innerText = checkWord.join("");
        ifWin();
};

const ifWin = function (){
    if (word.toUpperCase() === wordInProgress.innerText){
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
}
};