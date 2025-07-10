const prompts = [
  ["apple", "dog", "blue", "house", "tree"], // Level 1
  ["The quick, brown fox jumps over the lazy dog.", "Typing is fun!"], // Level 2
  ["if (x != y) { console.log('Mismatch!'); }", "Peter Piper picked a peck of pickled peppers."] // Level 3
];

let level = 0;
let timer = 0;
let timerInterval;
let startTime;
let currentPrompt = "";
let inputBox = document.getElementById("inputBox");
let promptBox = document.getElementById("prompt");
let timerDisplay = document.getElementById("timer");
let accuracyDisplay = document.getElementById("accuracy");
let levelInfo = document.getElementById("levelInfo");

function startLevel() {
  clearInterval(timerInterval);
  inputBox.value = "";
  inputBox.disabled = false;

  currentPrompt = getRandomPrompt();
  promptBox.textContent = currentPrompt;
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

function getRandomPrompt() {
  const currentLevelPrompts = prompts[level];
  return currentLevelPrompts[Math.floor(Math.random() * currentLevelPrompts.length)];
}

function updateTimer() {
  const now = Date.now();
  timer = Math.floor((now - startTime) / 1000);
  timerDisplay.textContent = `Time: ${timer}s`;
}

function updateAccuracy() {
  const typed = inputBox.value;
  let correct = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === currentPrompt[i]) correct++;
  }
  const accuracy = typed.length === 0 ? 100 : Math.floor((correct / typed.length) * 100);
  accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
}

inputBox.addEventListener("input", () => {
  updateAccuracy();

  if (inputBox.value === currentPrompt) {
    clearInterval(timerInterval);
    inputBox.disabled = true;
    alert(`Well done! You completed Level ${level + 1} in ${timer}s.`);
  }
});

function nextLevel() {
  if (level < prompts.length - 1) {
    level++;
    levelInfo.textContent = `Level ${level + 1}: ${["Easy", "Medium", "Hard"][level]}`;
    startLevel();
  } else {
    alert("You’ve completed all levels!");
  }
}

// Start the game
window.onload = startLevel;
