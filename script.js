const prompts = [
  [
    "Time flies fast.",
    "Typing is fun and easy.",
    "Practice makes perfect."
  ],
  [
    "Success comes to those who work hard.",
    "Stay focused and never give up.",
    "A journey of a thousand miles begins with a step."
  ],
  [
    "The curious developer debugged diligently despite deadline disasters.",
    "Creativity is intelligence having fun under pressure.",
    "Fast fingers find fewer flaws from focused feedback."
  ]
];

let level = 0;
let timer = 0;
let totalTime = 0;
let timerInterval;
let startTime;
let currentPrompt = "";

const inputBox = document.getElementById("inputBox");
const promptDisplay = document.getElementById("promptDisplay");
const timerDisplay = document.getElementById("timer");
const accuracyDisplay = document.getElementById("accuracy");
const levelInfo = document.getElementById("levelInfo");
const tryAgainBtn = document.getElementById("tryAgainBtn");

// Load success sound
const successSound = new Audio("success.mp3");

function getRandomPrompt() {
  const list = prompts[level];
  return list[Math.floor(Math.random() * list.length)];
}

function startLevel() {
  clearInterval(timerInterval);
  inputBox.value = "";
  inputBox.disabled = false;

  currentPrompt = getRandomPrompt();
  updatePromptDisplay("");
  startTime = Date.now();
  timer = 0;
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const now = Date.now();
  timer = Math.floor((now - startTime) / 1000);
  timerDisplay.textContent = `Time: ${timer}s`;
}

function updatePromptDisplay(typed) {
  let html = "";

  for (let i = 0; i < currentPrompt.length; i++) {
    if (i < typed.length) {
      html += currentPrompt[i] === typed[i]
        ? `<span class="correct">${currentPrompt[i]}</span>`
        : `<span class="incorrect">${currentPrompt[i]}</span>`;
    } else {
      html += currentPrompt[i];
    }
  }

  promptDisplay.innerHTML = html;
}

function updateAccuracy(typed) {
  let correct = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === currentPrompt[i]) correct++;
  }
  const accuracy = typed.length === 0 ? 100 : Math.floor((correct / typed.length) * 100);
  accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
}

function confettiBlast() {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
}

inputBox.addEventListener("input", () => {
  const typed = inputBox.value;
  updatePromptDisplay(typed);
  updateAccuracy(typed);

  // Block further typing on wrong input
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] !== currentPrompt[i]) return;
  }

  // Check completion
  if (typed === currentPrompt) {
    clearInterval(timerInterval);
    inputBox.disabled = true;
    totalTime += timer;

    // Confetti + sound
    confettiBlast();
    successSound.play();

    if (level === prompts.length - 1) {
      setTimeout(() => {
        alert(`🎉 Congrats! You finished all levels!\nTotal time: ${totalTime}s`);
        tryAgainBtn.style.display = "inline-block";
      }, 100);
    } else {
      alert(`✅ Great job! You finished Level ${level + 1} in ${timer}s`);
    }
  }
});

function nextLevel() {
  if (level < prompts.length - 1) {
    level++;
    levelInfo.textContent = `Level ${level + 1}: ${["Easy", "Medium", "Hard"][level]}`;
    startLevel();
  } else {
    alert("You've already finished all levels.");
  }
}

function restartGame() {
  level = 0;
  totalTime = 0;
  tryAgainBtn.style.display = "none";
  levelInfo.textContent = "Level 1: Easy";
  startLevel();
}

// Start the first level on load
window.onload = startLevel;
