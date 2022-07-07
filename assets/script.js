// Getting variables ready
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");


//Questions
var quizQuestions = [{
    question: "What is the most important thing in coding?",
    choiceA: "Google",
    choiceB: "Data Structures",
    choiceC: "Syntax",
    choiceD: "Github",
    correctAnswer: "a"},
  {
    question: "Commonly used data typed DO NOT include:",
    choiceA: "strings",
    choiceB: "boolseans",
    choiceC: "alerts",
    choiceD: "numbers",
    correctAnswer: "c"},
   {
    question: "Arrays in Javascript can be used to store _____.?",
    choiceA: "numbers",
    choiceB: "strings",
    choiceC: "booleans",
    choiceD: "all of the above",
    correctAnswer: "d"},
    {
    question: "String values must be enclosed withing ___ when being assigned to variables.?",
    choiceA: "commas",
    choiceB: "curly brackets",
    choiceC: "quotes",
    choiceD: "parenthesis",
    correctAnswer: "c"},
    {
    question: "A very useful tool for used during development and debugging for printing content to the debugger is:",
    choiceA: "Java",
    choiceB: "terminal/bash",
    choiceC: "for loops",
    choiceD: "console log",
    correctAnswer: "d"},  
];
//Othe variables needed
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 100;
var timerInterval;
var score = 0;
var correct;
var penalty = 10 

// Generator
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Start quiz
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;

        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}
//Show score
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

//submit score
submitScoreBtn.addEventListener("click", function highscore(){


    if(highscoreInputName.value === "") {
        alert("Please add initials!");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };

        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }

});

// Generate highscores
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// Showing highscore
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";
    generateHighscores();
}

// Clear highscores
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// Restart
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 100;
    score = 0;
    currentQuestionIndex = 0;
}

// Checking answers 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
       
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        timeLeft = timeLeft - penalty
        alert("Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
    
    }else{
        showScore();
    }
}

// Quiz start 
startQuizButton.addEventListener("click",startQuiz);