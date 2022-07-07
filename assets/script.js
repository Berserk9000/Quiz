// Getting variables ready
var startQuizDiv = document.getElementById("startpage")
var startQuizButton = document.getElementById("startbtn")
var quizTimer = document.getElementById("timer");
var quizBody = document.getElementById("quiz")
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 100;
var timerInterval;
var score = 0;
var correct;
var penalty = 10






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

//Generator
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

// Starting quix
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
    }