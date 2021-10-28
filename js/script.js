//global variables
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");


let word = "magnolia";  //test word is temporary until random words are fetched from API
const guessedLetters = []; //sets empty array for guessed letters
let remainingGuesses = 8;

const getWord = async function (){
    const res = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await res.text();
    const wordArray = data.split("\n");
    const randomIndex = Math.floor(Math.random()* wordArray.length);
    word = wordArray [randomIndex].trim();
    //console.log (data);
    placeholder (word);
};

getWord();

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
//make a guess function
const makeGuess = function (guess){
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)){
        message.innerText = "You've already guessed that one."
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        numberOfGuesses (guess);
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

const numberOfGuesses = function (guess){
    wordUpperCase = word.toUpperCase();
    if (!wordUpperCase.includes(guess)){
        message.innerText= `Sorry. There is no ${guess}.`;
        remainingGuesses -=1;
    } else {
        message.innerText = `Hey, good guess. The word has the letter ${guess}`;
    }

    if (remainingGuesses === 0){
        message.innerHTML = `Sorry, you're all out of guesses. The mystery word is <span class="highlight">${word}</span>.`;

    } else if (remainingGuesses === 1){
        remainingGuessesSpan.innerText = `You have ${remainingGuesses} guess left.`;
    } else {
        remainingGuessesSpan.innerText = `You have ${remainingGuesses} guesses left.`;
    }
};


const ifWin = function (){
    if (word.toUpperCase() === wordInProgress.innerText){
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
}
};