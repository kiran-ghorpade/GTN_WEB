let buttonBox = document.getElementById("buttonBox");
let hintBox = document.getElementById("hint");
let countBox = document.getElementById("count");
let topScoreBox = document.getElementById("topScore");
let lastScoreBox = document.getElementById("lastScore");

let count = 0;
let topScore = 0;
let lastScore = localStorage.getItem("lastScore") || 0;
let hint = 0;
let isGameOver = false;
let hints = [
  "Click Button",
  "Too High. Go Back.",
  "Too Low. Go Ahed.",
  "You Found it",
];

let generateNumber = () => {
  let num = Math.random().toFixed(1) * 100;
  if (num != 0) {
    return num;
  } else {
    return generateNumber();
  }
};

let guessNumber = generateNumber();

const setGame = () => {
  let userInput = confirm("Want to Restart ?");
  if (userInput) {
    lastScore = 100 - count;
    localStorage.setItem("lastScore", lastScore);
    count = 0;
    if (lastScore > topScore) topScore = lastScore;
    hint = 0;
    guessNumber = generateNumber();
    isGameOver = false;
    setCanvas();
    setResults();
  }
};

const handleClick = (index) => {
  let button = document.getElementById("button" + index);
  let color = button.style.backgroundColor;

  if (color == "" && !isGameOver) {
    if (index > guessNumber) {
      hint = 1;
      button.style.backgroundColor = `rgb(0, 0, 255)`;
    } else if (index < guessNumber) {
      hint = 2;
      button.style.backgroundColor = `rgb(0, 0, 255)`;
    } else {
      hint = 3;
      button.style.backgroundColor = "green";
      let score = 100 - count;

      alert("You Win ! Your Score is " + score);
      isGameOver = true;
      setGame();
    }

    count++;
    setResults();
  }
};

const setResults = () => {
  countBox.innerHTML = count;
  topScoreBox.innerHTML = topScore;
  lastScoreBox.innerHTML = lastScore;
  hintBox.innerHTML = hints[hint];
};

const setCanvas = () => {
  let buttons = "";
  for (let index = 1; index <= 100; index++) {
    buttons += `<div class="button" id="button${index}" onClick={handleClick(${index})}><h3>${index}</h3></div>`;
  }
  buttonBox.innerHTML = buttons;
};

setCanvas();
setResults();
