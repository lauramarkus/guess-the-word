//global variables
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = []; //sets empty array for guessed letters
let remainingGuesses = 8;

const getWord = async function (){ //function that will access random words API
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
    const goodGuess = inputCheck(guess); //uses the function below with the guessed letter as a parameter
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
    guess = guess.toUpperCase(); //changes letter to uppercase
    if (guessedLetters.includes(guess)){ //tests letter to see if player already guessed, delivers message
        message.innerText = "You've already guessed that one."
    } else {
        guessedLetters.push(guess); //adds letter to array
        console.log(guessedLetters);
        numberOfGuesses (guess); //call for function that tallys number of guesses
        showGuessedLetters(); //call for function that shows guessed letters
        updateWordInProgress(guessedLetters); //call for function that will update the word with correct letters guessed
    }
};
//function to show the guessed letters
const showGuessedLetters = function (){
    guessedLettersElement.innerHTML="";
    for (const letter of guessedLetters){
    const li = document.createElement("li"); //creates an inline list that shows the array of guessed letters
    li.innerText = letter;
    guessedLettersElement.append(li);
    }
};
//function that will update the word in progress and show the correct letters
const updateWordInProgress = function (guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split(""); //split is used to split a string into an array of substrings and return the array
    //console.log(wordArray);
    
    const checkWord = []; //sets an array for the guessed letters
    for (const letter of wordArray){ //for..of loop to check if the word includes the letter,  
        if (guessedLetters.includes(letter)){
            checkWord.push(letter.toUpperCase()); //if its a good guess this will push the letter to the array and change it to uppercase,
        }else{
            checkWord.push("●"); //else if the letter isn't in the word it maintains the placeholder dot in the array
        }    
        }
        wordInProgress.innerText = checkWord.join(""); //join returns the array as a string and in this case the quotes mean no separator
        ifWin(); //call for the below function that shows a message if we win
};

const numberOfGuesses = function (guess){ //function to count number of guesses and subtract for wrong ones
    wordUpperCase = word.toUpperCase();
    if (!wordUpperCase.includes(guess)){
        message.innerText= `Sorry. There is no ${guess}.`;
        remainingGuesses -=1;
    } else {
        message.innerText = `Hey, good guess. The word has the letter ${guess}.`;
    }

    if (remainingGuesses === 0){ //if statement that tells what to do if we lose
        message.innerHTML = `Sorry, no more guesses. The mystery word is <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1){
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`; //accesses the HTML span element and updates the text for singular, and
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`; //for plural guesses
    }
};


const ifWin = function (){ //function tat shows message after a win
    if (word.toUpperCase() === wordInProgress.innerText){
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
  
    startOver();   //call for below function that will change the button
}
};

const startOver = function(){ //function that hides the guess button and shows the play again button
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

    playAgainButton.addEventListener("click", function(){
        message.classList.remove("win");
        guessedLetters = [];
        remainingGuesses = 8;
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
        guessedLettersElement.innerHTML = "";
        message.innerText = "";

        guessButton.classList.remove("hide");
        playAgainButton.classList.add("hide");
        remainingGuessesElement.classList.remove("hide");
        guessedLettersElement.classList.remove("hide");
        
        getWord();    
});
