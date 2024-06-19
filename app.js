function generateHoroscope() {
  const name = document.getElementById("name").value;
  const birthdate = new Date(document.getElementById("birthdate").value);
  const horoscopeDiv = document.getElementById("horoscope");

  if (isNaN(birthdate)) {
    horoscopeDiv.innerHTML = "<p>Please enter a valid birthdate.</p>";
  } else {
    const zodiacSign = getZodiacSign(birthdate);

    horoscopeDiv.innerHTML = `<p>Hello ${name}, your zodiac sign is: ${zodiacSign}`;
  }
}

function getZodiacSign(birthdate) {
  const month = birthdate.getMonth() + 1;
  const day = birthdate.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return "Aries";
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return "Taurus";
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return "Gemini";
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return "Cancer";
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return "Leo";
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return "Virgo";
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return "Libra";
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return "Scorpio";
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return "Sagittarius";
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return "Capricorn";
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return "Aquarius";
  } else {
    return "Pisces";
  }
}

const questions = [
  {
    question: "Which zodiac sign is represented by the crab?",
    answers: ["Aries", "Cancer", "Sagittarius"],
    correctAnswer: "B",
  },
  {
    question: "What zodiac sign is known for being a twin sign?",
    answers: ["Gemini", "Virgo", "Scorpio"],
    correctAnswer: "A",
  },
  {
    question: "Which zodiac sign is associated with the bull?",
    answers: ["Leo", "Taurus", "Aquarius"],
    correctAnswer: "B",
  },
  {
    question: "What zodiac sign is represented by a set of scales?",
    answers: ["Libra", "Capricorn", "Pisces"],
    correctAnswer: "A",
  },
  {
    question: "Which zodiac sign is the water bearer?",
    answers: ["Sagittarius", "Aquarius", "Aries"],
    correctAnswer: "B",
  },
  {
    question: "What zodiac sign is associated with the fish?",
    answers: ["Pisces", "Gemini", "Taurus"],
    correctAnswer: "A",
  },
  {
    question: "Which zodiac sign is symbolized by the lion?",
    answers: ["Cancer", "Leo", "Virgo"],
    correctAnswer: "B",
  },
];

const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question");
const answerLabels = document.querySelectorAll(".answer");
const nextButton = document.getElementById("next-button");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result");

let currentQuestion = 0;
let score = 0;

function showQuestion(questionIndex) {
  const question = questions[questionIndex];
  questionText.textContent = question.question;

  question.answers.forEach((answer, index) => {
    answerLabels[index].querySelector("span").textContent = answer;
    answerLabels[index].querySelector("input").value = String.fromCharCode(
      65 + index
    );
  });
}

function checkAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (selectedAnswer) {
    const userAnswer = selectedAnswer.value;
    const correctAnswer = questions[currentQuestion].correctAnswer;
    if (userAnswer === correctAnswer) {
      score++;
    }

    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      showQuestion(currentQuestion);
      document
        .querySelectorAll('input[name="answer"]')
        .forEach((radio) => (radio.checked = false));
    } else {
      showResult();
    }
  }
}

function showResult() {
  resultText.textContent = `You scored ${score} out of ${questions.length}!`;
  resultContainer.style.display = "block";
  questionContainer.style.display = "none";
  nextButton.style.display = "none";
}

nextButton.addEventListener("click", checkAnswer);

showQuestion(currentQuestion);
const tryAgainButton = document.createElement("button");
tryAgainButton.classList.add("tryagain-button");
tryAgainButton.textContent = "Try Again";
tryAgainButton.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  showQuestion(currentQuestion);
  resultContainer.style.display = "none";
  questionContainer.style.display = "block";
  nextButton.style.display = "block";
});

resultContainer.appendChild(tryAgainButton);
//PopUp's
let previewContainer = document.querySelector(".product-preview");
let previewBox = previewContainer.querySelectorAll(".preview");
let activeProduct = null; // Track the active product
//umjesto product comntainer stavis cards.box
document.querySelectorAll(".cards .box").forEach((product) => {
  product.onclick = () => {
    if (activeProduct) {
      activeProduct.classList.remove("active");
    }

    activeProduct = product;

    previewContainer.style.display = "flex";
    let name = product.getAttribute("data-name");
    previewBox.forEach((preview) => {
      let target = preview.getAttribute("data-target");
      if (name == target) {
        preview.classList.add("active");
      }
    });
  };
});

previewBox.forEach((close) => {
  close.querySelector(".picon").onclick = () => {
    close.classList.remove("active");
    previewContainer.style.display = "none";
    activeProduct = null;
  };
});

// kara kod; potencijalno unistenje stranice!
// document.addEventListener("click", (e) => {
//   const activePreview = activeProduct.querySelector(".preview");
//   console.log(activePreview);
//   if (e.target !== activeProduct && !activeProduct.contains(e.target)) {
//     activeProduct.classList.remove("active");
//     activeProduct = null;
//   }
// });
