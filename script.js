const prompts = [
  [
    "Time flies fast.",
    "Typing is fun and easy.",
    "Practice makes perfect."
  ],
  [
    "Success comes to those who work hard.",
    "A journey of a thousand miles begins with a step.",
    "Stay focused and never give up."
  ],
  [
    "The curious developer debugged diligently despite deadline disasters.",
    "Creativity is intelligence having fun under pressure.",
    "Fast fingers find fewer flaws from focused feedback."
  ]
];

let level = 0;
let timer = 0;
let timerInterval;
let startTime;
let totalTime = 0;
let currentPrompt = "";
let inputBox = document.getElementById("inputBox");
let promptDisplay = document.getElementById("promptDisplay");
let timerDisplay = document.getElementById("timer");
let accuracyDisplay = document.getElementById("accuracy");
let levelInfo = document.getElementById("levelInfo");

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

inputBox.addEventListener("input", () => {
  const typed = inputBox.value;
  updatePromptDisplay(typed);
  updateAccuracy(typed);

  // Prevent typing if mistake is made
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] !== currentPrompt[i]) {
      return;
    }
  }

  // Check completion
  if (typed === currentPrompt) {
    clearInterval(timerInterval);
    totalTime += timer;
    inputBox.disabled = true;

    confetti(); // 🎉 Celebrate!

    if (level === prompts.length - 1) {
      setTimeout(() => {
        alert(`🎉 Congrats! You've finished all levels!\nTotal time: ${totalTime}s`);
      }, 100);
    } else {
      alert(`✅ Great! Level ${level + 1} complete in ${timer}s.`);
    }
  }
});

function nextLevel() {
  if (level < prompts.length - 1) {
    level++;
    levelInfo.textContent = `Level ${level + 1}: ${["Easy", "Medium", "Hard"][level]}`;
    startLevel();
  } else {
    alert("You've already finished all levels!");
  }
}

window.onload = () => {
  level = 0;
  totalTime = 0;
  levelInfo.textContent = "Level 1: Easy";
  startLevel();
};
