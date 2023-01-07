// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score

// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");

const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "What does the 'M' mean in HTML?",
        choiceA : "Marketable",
        choiceB : "Markup",
        choiceC : "Markdown",
        correct : "B"
    },{
        question : "All HTML documents must start with what document type declaration?",
        choiceA : "!DOCTYPE html",
        choiceB : "!DOCUMENT html",
        choiceC : "!TYPEDOC html",
        correct : "A"
    },{
        question : "What does JS stand for?",
        
        choiceA : "JavaSection",
        choiceB : "JusSayin",
        choiceC : "JavaScript",
        correct : "C"
    },{
        question : "What is the correct P-tag?",
        
        choiceA : "p-tag",
        choiceB : "paragraph",
        choiceC : "p",
        correct : "C"
    },{
        question : "What is the correct HTML link tag?",
        
        choiceA : "a href=",
        choiceB : "link",
        choiceC : "a link=",
        correct : "A"
    },{
        question : "CSS stands for _____ Style Sheets.",
        
        choiceA : "Common",
        choiceB : "Comprehensive",
        choiceC : "Cascading",
        correct : "C"
    },{
        question : "Python is a popular programming _____.",
        
        choiceA : "Method",
        choiceB : "Language",
        choiceC : "Application",
        correct : "B"
    },{
        question : "How do you get updated GitHub repo information?",
        
        choiceA : "get update",
        choiceB : "git pull",
        choiceC : "git update",
        correct : "B"
    },{
        question : "How do you update your GitHub repo?",
        
        choiceA : "git pull",
        choiceB : "git commit",
        choiceC : "git push",
        correct : "C"
    },{
        question : "The HTML _____ tag is used to define a client-side script.",
        
        choiceA : "script",
        choiceB : "scropt",
        choiceC : "scripts",
        correct : "A"
    }
    
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 60;
const questionTime = 60; // 60s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count > 0){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count--
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    // count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    var scoreEl = document.createElement('p')
    scoreEl.textContent = scorePerCent + '%'
    scoreDiv.appendChild(scoreEl)
    var restart = document.createElement('button')
    restart.textContent = 'Restart Game'
    scoreDiv.appendChild(restart)
    restart.addEventListener('click', function (){
        window.location.reload()
    }) 
    
    // scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
    
// Give option for user to restart game
// Give user option to record name
    
    
}