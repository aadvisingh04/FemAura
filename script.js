// Placeholder for any interactivity
document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded");
});


/*login page*/
function handleLogin() {
  const email = document.getElementById('email').value;
  if (!email || !email.includes('@')) {
    alert('Please enter a valid email.');
  } else {
    alert(`Logging in as ${email}`);
    // Implement real auth logic here
  }
}

/*prediction*/

// Placeholder for any interactivity
document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded");
});

/*login page*/
function handleLogin() {
  const email = document.getElementById('email').value;
  if (!email || !email.includes('@')) {
    alert('Please enter a valid email.');
  } else {
    alert(`Logging in as ${email}`);
    // Implement real auth logic here
  }
}

/*prediction questions*/
const questions = [
  { q: "What is your age?", type: "input", inputType: "number", placeholder: "Enter your age in years" },
  { q: "What is your height (cm)?", type: "input", inputType: "number", placeholder: "Enter your height in cm" },
  { q: "What is your weight (kg)?", type: "input", inputType: "number", placeholder: "Enter your weight in kg" },
  { q: "How long is your menstrual cycle (in days)?", type: "input", inputType: "number", placeholder: "Enter number of days" },
  { q: "Average number of menstrual days?", type: "input", inputType: "number", placeholder: "Enter average days" },

  { q: "Is your menstrual cycle regular? (1: Regular, 0: Irregular)", type: "input", inputType: "number", placeholder: "Enter 1 or 0" },
  { q: "Do you experience missed periods? (1: Yes, 0: No)", type: "input", inputType: "number", placeholder: "Enter 1 or 0" },
  { q: "Your marital status? (1: Married, 0: Unmarried)", type: "input", inputType: "number", placeholder: "Enter 1 or 0" },

  { q: "Do you have excess facial hair (Hirsutism)? (1: Often, 2: Rarely, 3: Never)", type: "input", inputType: "number", placeholder: "Enter 1, 2 or 3" },
  { q: "Hair thinning or hair loss? (1: Often, 2: Rarely, 3: Never)", type: "input", inputType: "number", placeholder: "Enter 1, 2 or 3" },
  { q: "Acne or oily skin? (1: Often, 2: Rarely, 3: Never)", type: "input", inputType: "number", placeholder: "Enter 1, 2 or 3" },
  { q: "Darkened skin on neck or armpits? (1: Often, 2: Rarely, 3: Never)", type: "input", inputType: "number", placeholder: "Enter 1, 2 or 3" },
  { q: "Pelvic pain? (1: Yes, 0: No)", type: "input", inputType: "number", placeholder: "Enter 1 or 0" },
  { q: "Weight gain or difficulty losing weight? (1: Yes, 0: No)", type: "input", inputType: "number", placeholder: "Enter 1 or 0" },
  { q: "Difficulty getting pregnant? (1: Yes, 0: No, 2: Not applicable)", type: "input", inputType: "number", placeholder: "Enter 1, 0 or 2" },

  { q: "Do you exercise regularly? (1: Yes, 0: No)", type: "input", inputType: "number", placeholder: "Enter 1 or 0" },
  { q: "Your stress level? (1: High, 2: Moderate, 3: Low)", type: "input", inputType: "number", placeholder: "Enter 1, 2 or 3" },
  { q: "Do you crave sugar or carbs? (1: Yes, 0: No)", type: "input", inputType: "number", placeholder: "Enter 1 or 0" },
  { q: "Do you sleep well (7–8 hrs)? (1: Yes, 0: No)", type: "input", inputType: "number", placeholder: "Enter 1 or 0" },
  { q: "Do you have mood swings or depression? (1: Yes, 0: No)", type: "input", inputType: "number", placeholder: "Enter 1 or 0" },

  { q: "Family history of PCOS or diabetes? (1: Yes, 0: No)", type: "input", inputType: "number", placeholder: "Enter 1 or 0" },
];

let currentStep = 0;
let answers = new Array(questions.length).fill(null);

const quizContent = document.getElementById("quiz-content");
const progressBar = document.getElementById("progress");
const stepCounter = document.getElementById("step-counter");

function renderQuestion() {
  const question = questions[currentStep];

  quizContent.innerHTML = `
    <div class="question-card">
      <div class="question-text">${question.q}</div>
      <input 
        type="${question.inputType}" 
        placeholder="${question.placeholder}" 
        value="${answers[currentStep] !== null ? answers[currentStep] : ""}" 
        oninput="handleInputChange(this.value)" 
      />
    </div>
  `;

  stepCounter.textContent = `STEP ${currentStep + 1} OF ${questions.length}`;
  progressBar.style.width = `${((currentStep + 1) / questions.length) * 100}%`;

  document.getElementById("prevBtn").style.display = currentStep === 0 ? "none" : "inline-block";
  document.getElementById("nextBtn").textContent = currentStep === questions.length - 1 ? "Predict" : "Next";
}

function handleInputChange(value) {
  answers[currentStep] = value;
}

function nextStep() {
  const answer = answers[currentStep];
  if (answer === null || answer === "") {
    alert("Please fill your answer before continuing.");
    return;
  }

  if (currentStep < questions.length - 1) {
    currentStep++;
    renderQuestion();
  } else {
    fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input: answers })
    })
    .then(response => response.json())
    .then(data => {
      const resultContainer = document.createElement('div');
      resultContainer.classList.add('result-container');
      resultContainer.innerHTML = `
        <h3>Prediction Result:</h3>
        <p><strong>${data.prediction === 1 ? "⚠ PCOS Likely Detected" : "✅ PCOS Not Likely"}</strong></p>
        <p>Confidence: ${data.confidence ? data.confidence + "%" : "N/A"}</p>
      `;

      quizContent.innerHTML = '';
      quizContent.appendChild(resultContainer);

      document.getElementById("prevBtn").style.display = "none";
      document.getElementById("nextBtn").style.display = "none";
    })
    .catch(err => {
      console.error("Prediction failed", err);
      alert("Something went wrong while predicting. Please try again.");
    });
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    renderQuestion();
  }
}

// Start quiz
renderQuestion();
