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
var timer = document.getElementById("time-display")
var timerInterval
function setTimer(){
    timerInterval = setInterval(function() {
        if (time > 0) {
            time--
            timer.textContent = "Time Left: " + time
        } else {
            endQuiz()
        }
    }, 1000)
}



// Set html document variables
var startBtn = document.getElementById("start")
var home = document.getElementById("home")
var questionText = document.getElementById("question")
var optionList = document.getElementById("option-list")
var quizContainer = document.getElementById("quiz-container")
var startContainer = document.getElementById("start-container")
var counter = 0

// start function, remove home, display first question
function startQuiz(){
    timer.textContent = "Time Left: " + time
    setTimer()
    quizContainer.style.display = "flex"
    startContainer.style.display = "none"
    displayQuestion()
}

// // loop displaying questions
function displayQuestion(){
    if (counter < quizQuestions.length) {
        optionList.innerHTML = ""
        questionText.textContent = quizQuestions[counter].question
        for(var i = 0; i < quizQuestions.length; i++){
            var answerOption = document.createElement("li")
            var answerButton = document.createElement("button")
            answerOption.classList.add("option")
            answerButton.classList.add("option-button")
            answerButton.textContent = quizQuestions[counter].choices[i]
            answerOption.appendChild(answerButton)
            optionList.appendChild(answerOption)
            answerButton.addEventListener("click", displayNextQuestion) //
        }
    } else endQuiz ()
}

// if answer is incorrect, removes time
function displayNextQuestion(event){
    if (event.target.textContent !== quizQuestions[counter].answer) {
        time-= 10
    }
    counter++
    displayQuestion()
}

// end of game screen
function endQuiz() {
    questionText.innerHTML = "GAME OVER"
    optionList.remove()
    var enterName = document.createElement("div")
    enterName.classList.add("end-quiz")
    enterName.innerHTML = "<p>Enter your name to save your score:</p>"
    enterName.classList.add("end-quiz")
    quizContainer.appendChild(enterName)
    var nameInput = document.createElement("input")
    enterName.appendChild(nameInput)
    var submitBtn = document.createElement("button")
    submitBtn.innerHTML = "SUBMIT"
    submitBtn.classList.add("end-button")
    submitBtn.setAttribute("id", "submit")
    enterName.appendChild(submitBtn)

    clearInterval(timerInterval)
    timer.remove()

    
    // local storage
    $("#submit").on("click", function(event) {
        event.preventDefault()
        var name = $(nameInput).val()
        var score = time
        var scoreName = score + " " + name
        var scoreDisplay = $(".modal-body")
        submitBtn.classList.add("end-button:after")

        localStorage.setItem(name, score)
        nameInput.value = ''

        // testing below
       var highScores = JSON.parse(localStorage.getItem(name))
       console.log(highScores)
    })
    
    
}
startBtn.addEventListener("click", startQuiz)
// modal to view scores
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })