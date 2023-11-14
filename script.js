const quizQuestions = [
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "let", "const", "variable"],
    correctAnswer: "var",
  },
  {
    question: "What does the 'DOM' stand for in JavaScript?",
    options: [
      "Document Object Model",
      "Data Object Model",
      "Document Oriented Model",
      "Dynamic Object Model",
    ],
    correctAnswer: "Document Object Model",
  },
  {
    question: "Which method is used to add an element to the end of an array in JavaScript?",
    options: ["push()", "append()", "addToEnd()", "insertEnd()"],
    correctAnswer: "push()",
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;

function startQuiz() {
  document.getElementById("start-button").style.display = "none";
  displayQuestion();
  startTimer();
}

function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const questionText = document.getElementById("questions");
  const answerButtons = document.getElementById("answers");

  questionText.innerHTML = "";
  answerButtons.innerHTML = "";

  questionText.innerHTML = currentQuestion.question;

  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("answer-button");
    answerButtons.appendChild(button);

    button.addEventListener("click", function () {
      checkAnswer(option);
    });
  });
}

function checkAnswer(selectedOption) {
  const currentQuestion = quizQuestions[currentQuestionIndex];

  if (selectedOption === currentQuestion.correctAnswer) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();
    enableButtons();
  } else {
    endQuiz();
  }
}

function enableButtons() {
  document.getElementById("prev-button").disabled = false;
  document.getElementById("next-button").disabled = false;
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion();
    enableButtons();
  }
}

function nextQuestion() {
  if (currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
    enableButtons();
  }
}

function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft --; 

    document.getElementById("timer").textContent = timeLeft;

    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timerInterval);

  const scorePercentage = ((score / quizQuestions.length) * 100).toFixed(2);

  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = `
      <h2>Quiz Completed!</h2>
      <p>Your Score: ${score} out of ${quizQuestions.length}</p>
      <p>Score Percentage: ${scorePercentage}%</p>
      <button id="restart-button" class="btn" onclick="restartQuiz()">Restart Quiz</button>`;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60;
  document.getElementById("timer").textContent = timeLeft;

  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = '<div id="question-container"><p id="questions"></p><div id="answers"></div></div>';

  startQuiz();
}

document.getElementById("start-button").addEventListener("click", startQuiz);
document.getElementById("prev-button").addEventListener("click", prevQuestion);
document.getElementById("next-button").addEventListener("click", nextQuestion);
