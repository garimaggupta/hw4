
// get element IDs of HTML elements that we need to add event listeners to or update their content
var mainEL = document.getElementById("main");
var startQuizBtn = document.getElementById("start-quiz");
var showTimeLeft = document.getElementById("time-left");

// Initialize the variables that keep count of total time, scores and questions
var totalTime = 75;
var questionCount = 0;
var totalScore = 0;
var quizFinished = false;

// HTML elements that are created dynamically to hold different sections of quiz app
var formEl = document.createElement("FORM");
var playerName = document.createElement("INPUT");
var inputLabel = document.createElement("Label");
var questionsDiv = document.createElement("div");
var displayAnswer = document.createElement("div");
var resultsDiv = document.createElement("div");

//Initialize the array to store scores in local storage
if (typeof localStorage.playerScores === "undefined") {
    var highScoreArray = [];
} else {
    highScoreArray = JSON.parse(localStorage.getItem("playerScores"));
}

//Array of objects that hold the quiz questions and the correct answer
var quizQuestions = [
    {
        questionText: "Inside which HTML element do we put the JavaScript?",
        choices: ["<javascript>", "<scripting>", "<js>", "<script>"],
        correctAnswer: "<script>",
    },
    {
        questionText: "Where is the correct place to insert a JavaScript?",
        choices: [
            "The <head> section",
            "Either <head> or <body>",
            "The <body> section",
            "None of the above",
        ],
        correctAnswer: "Either <head> or <body>",
    },
      {
        questionText:
            "How do you write 'Hello World' in an alert box in JavaScript?",
        choices: [
            'alertbox("Hello World")',
            'msg("Hello World")',
            'alert("Hello World")',
            'msgBox("Hello World")',
        ],
        correctAnswer: 'alert("Hello World")',
    },
    {
        questionText:
            "When a user views a page containing a JavaScript program, which machine actually executes the script?",
        choices: [
            "The User’s machine running a Web browser",
            "The Web Server",
            "A central machine deep within Netscape’s corporate offices",
            "None of the above",
        ],
        correctAnswer: "The User’s machine running a Web browser",
    },

    {
        questionText: "What are variables used for in JavaScript Programs?",
        choices: [
            "Storing numbers, dates, or other values",
            "Varying randomly",
            "Causing high-school algebra flashbacks",
            "None of the above",
        ],
        correctAnswer: "Storing numbers, dates, or other values",
    },

    {
        questionText:
            "Which of the following can’t be done with client-side JavaScript?",
        choices: [
            "Validating a form",
            "Sending a form’s contents by email",
            "Storing the form’s contents to a database file on the server",
            "None of the above",
        ],
        correctAnswer:
            "Storing the form’s contents to a database file on the server",
    },

    {
        questionText:
            "Which of the following are capabilities of functions in JavaScript?",
        choices: [
            "Return a value",
            "Accept parameters and Return a value",
            "Accept parameters",
            "All of the above",
        ],
        correctAnswer: "All of the above",
    },

    {
        questionText: "JavaScript is interpreted by ............?",
        choices: ["Client", "Server", "Object", "None of the above"],
        correctAnswer: "Client",
    },

    {
        questionText: "How can you get the type of arguments passed to a function?",
        choices: [
            "using typeof operator",
            "using getType function",
            "Both of the above",
            "None of the above",
        ],
        correctAnswer: "using typeof operator",
    },
    {
        questionText:
            "Which built-in method combines the text of two strings and returns a new string?",
        choices: ["append()", "concat()", "attach()", "None of the above"],
        correctAnswer: "concat()",
    },
];


//This function runs the quiz timer and displays the time left in the browser
function startTimer() {
    var timer = setInterval(function () {
        if (totalTime === 0 || quizFinished === true) {
            showTimeLeft.textContent = totalTime;
            clearInterval(timer);
            displayScores();
        } else {
            showTimeLeft.textContent = totalTime;
            totalTime--;
        }
    }, 1000);
}

//Handler for 'Start Quiz' button
function startQuiz(event) {
    event.preventDefault();

    startTimer();
    mainEL.innerHTML = "";
    nextQuestion();
}

//This function populates the next quiz question on the browser as user responds to question on the screen
function nextQuestion() {
    if (questionCount < quizQuestions.length) {
        questionsDiv.innerHTML = "";
        var pE1 = document.createElement("p");
        var choice1 = document.createElement("button");
        var choice2 = document.createElement("button");
        var choice3 = document.createElement("button");
        var choice4 = document.createElement("button");
        choice1.setAttribute("class", "btn btn-primary block");
        choice2.setAttribute("class", "btn btn-primary block");
        choice3.setAttribute("class", "btn btn-primary block");
        choice4.setAttribute("class", "btn btn-primary block");
        pE1.setAttribute("class", "question-style mt-3");
        pE1.textContent = quizQuestions[questionCount].questionText;
        choice1.textContent = quizQuestions[questionCount].choices[0];
        choice2.textContent = quizQuestions[questionCount].choices[1];
        choice3.textContent = quizQuestions[questionCount].choices[2];
        choice4.textContent = quizQuestions[questionCount].choices[3];
        mainEL.appendChild(questionsDiv);
        questionsDiv.appendChild(pE1);
        questionsDiv.appendChild(choice1);
        questionsDiv.appendChild(choice2);
        questionsDiv.appendChild(choice3);
        questionsDiv.appendChild(choice4);
    } else {
        displayScores();
    }
}


// This function displays total score after quiz is finished and records user's initials to be added to local storage
function displayScores() {
    quizFinished = true;
    mainEL.innerHTML = "";
    inputLabel.innerHTML = "";
    resultsDiv.innerHTML = "";

    resultsDiv.innerHTML = '<h1>You are done!</h1> <br> <h3>You total score is: ' + totalScore + '</h3>';
    mainEL.appendChild(resultsDiv);

    formEl.setAttribute("id", "playerInfo");
    formEl.setAttribute("class", "p-font-details form-group mt-3");
    mainEL.appendChild(formEl);

    playerName.setAttribute("type", "text");
    playerName.setAttribute("id", "nameInput");
    playerName.setAttribute("value", "");
    playerName.setAttribute("class", "form-control");
    inputLabel.setAttribute("for", "nameInput");
    inputLabel.innerHTML = "Enter your name here:   ";

    document.getElementById("playerInfo").appendChild(inputLabel);
    document.getElementById("playerInfo").appendChild(playerName);

}


// This function records correct and incorrect responses and updates the totalScore 
function recordResponses(ev) {
    ev.preventDefault();
    if (ev.target.textContent === quizQuestions[questionCount].correctAnswer) {
        totalScore = totalScore + 10;
        displayAnswer.setAttribute("class", "correct-div");
        displayAnswer.textContent = "Correct :)";
    } else {
        displayAnswer.setAttribute("class", "incorrect-div");
        displayAnswer.textContent = "Incorrect :(";
        if (totalTime > 10) totalTime = totalTime - 10;
        else totalTime = 1;
    }
    mainEL.appendChild(displayAnswer);
    setTimeout(function () {
        questionCount++;
        displayAnswer.innerHTML = "";
        nextQuestion();
    }, 1000);
}


// This function adds the new total score to local storage and displays updated high scores
function updateHighScores() {
    event.preventDefault();
    var highscores = {
        playerName: "",
        score: 0,
    };

    var name = nameInput.value.trim();
    highscores.playerName = name;
    highscores.score = totalScore;

    highScoreArray.push(highscores);
    localStorage.setItem("playerScores", JSON.stringify(highScoreArray));

    window.location.replace("./highscores.html")
}


startQuizBtn.addEventListener("click", startQuiz);
questionsDiv.addEventListener("click", recordResponses);
formEl.addEventListener("submit", updateHighScores);

