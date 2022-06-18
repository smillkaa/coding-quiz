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
var scoresList = JSON.parse(localStorage.getItem("scoresList")) || []

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
            answerButton.addEventListener("click", displayNextQuestion)
        }
    } else endQuiz ()
}

// if answer is incorrect, removes time, turns time red
function displayNextQuestion(event){
    if (event.target.textContent !== quizQuestions[counter].answer) {
        time-= 10
        timer.animate([
            {color: "white"},
            {color: "red"},
            {color: "white"}
        ], 700)
    }
    counter++
    displayQuestion()
}

// end of game screen
function endQuiz() {
    optionList.remove()
    if (time == 0){
        questionText.textContent = "GAME OVER"
    }
    else {
        questionText.textContent = "QUIZ COMPLETED"
    }

    // create form to submit name to save score
    var formDiv = document.createElement("div")
    var enterNameForm = document.createElement("form")
    enterNameForm.innerHTML = "<h3>Enter your name to save your score:</h3>"
    enterNameForm.classList.add("end-quiz")
    formDiv.appendChild(enterNameForm)
    quizContainer.appendChild(formDiv)

    var errorEl = document.createElement("p")
    errorEl.textContent = "Please enter your name"
    errorEl.classList.add("hidden")
    enterNameForm.appendChild(errorEl)

    var nameInput = document.createElement("input")
    nameInput.setAttribute("id","input")
    enterNameForm.appendChild(nameInput)

    var submitBtn = document.createElement("button")
    submitBtn.innerHTML = "SUBMIT"
    submitBtn.classList.add("end-button")
    submitBtn.setAttribute("id", "submit")
    enterNameForm.appendChild(submitBtn)

    clearInterval(timerInterval)
    timer.remove()

    // local storage
    $("#submit").on("click", function(event) {
        event.preventDefault()

        // if submits empty form, show error
        enterNameForm = document.getElementById("input").value
        if (enterNameForm == ""){
            errorEl.classList.remove("hidden")
            errorEl.classList.add("error")

        }
        // when submits name, remove elements and display 'score saved' message
        else{
            formDiv.remove()
            questionText.textContent = "SCORE SAVED!"
            var scoresBtn = document.getElementById("scores-btn")
            scoresBtn.classList.remove("hidden")
            var name = $(nameInput).val()
            var score = time
            var scoreDisplay = document.getElementById("modal-body")
            var orderedList = document.createElement("ol")
            scoreDisplay.appendChild(orderedList)
            var scoreInfo = {
                name: name,
                score: score
            }
            scoresList.push(scoreInfo)
            localStorage.setItem("scoresList", JSON.stringify(scoresList)) 
            nameInput.value = ''
            
            // display scores in modal
            for (let i = 0; i < scoresList.length; i++ ) {
                var listEl = document.createElement("li")
                listEl.textContent = `${scoresList[i].name}: ${scoresList[i].score}`
                listEl.classList.add("highscore-li-style")
                orderedList.appendChild(listEl)

            }
        }
        
        
    })
    
    
}

startBtn.addEventListener("click", startQuiz)

// modal to view scores
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })