// set question variables
var quizQuestions = [
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "nothing"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which of the following is NOT a programming language?",
        choices: ["HTML", "JavaScript", "Python", "MetaScript"],
        answer: "MetaScript",
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["<script>", "<scripting>", "<js>", "<javascript>"],
        answer: "<script>",
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xy.js'?",
        choices: ["<script href='xy.js'>","<script name='xy.js'>", "<script src='xy.js'>", "<script rel='xy.js'>"],
        answer: "<script src='xy.js'>",
    }
]

// timer
var time = 60
function setTimer(){
    setInterval(function() {
        var timer = document.getElementById("time-display")
        if (time > 0 && i <  quizQuestions.length){
            time = time - 1
            timer.textContent = "Time Left: " + time
        }//else {
    //endQuiz()
    //}
    }, 1000)
}

// function checkAnswer() {
//     // if correct answer, nothing happens, if answer is incorrect remove 10 seconds
//     if (click on answerButton.textContent !== quizQuestions.answer){
//         time - 10
//     }
// }
// Set html document variables
var startBtn = document.getElementById("start")
var home = document.getElementById("home")
var questionText = document.getElementById("question")
var optionList = document.getElementById("option-list")
var counter = 0

// start function, remove home, display first question
function startQuiz(){
    var quizContainer = document.getElementById("quiz-container")
    quizContainer.style.display = "flex"
    var startContainer = document.getElementById("start-container")
    startContainer.style.display = "none"
    displayQuestion()
} // end of startQuiz function


function displayQuestion(){
    questionText.textContent = quizQuestions[0].question
    for(var i = 0; i < quizQuestions.length; i++){
        var answerOption = document.createElement("li")
        var answerButton = document.createElement("button")
        answerOption.classList.add("option")
        answerButton.classList.add("option-button")
        answerButton.textContent = quizQuestions[0].choices[i]
        answerOption.appendChild(answerButton)
        optionList.appendChild(answerOption)
        // answerButton.addEventListener("click", checkAnswer)
        answerButton.addEventListener("click", displayQuestionTwo)
    }
}

function displayQuestionTwo(){
    questionText.textContent = quizQuestions[1].question
    for(var j = 0; j < quizQuestions.length; j++){
        answerButton.textContent = quizQuestions[1].choices[j]
        answerOption.appendChild(answerButton)
        optionList.appendChild(answerOption)
        // answerButton.addEventListener("click", checkAnswer)
        answerButton.addEventListener("click", displayQuestionTwo)
    }
}






startBtn.addEventListener("click", startQuiz)
