let buttonBox = document.getElementById("buttonBox");
let hintBox = document.getElementById("hint");
let countBox = document.getElementById("count");
let topScoreBox = document.getElementById("topScore");
let lastScoreBox = document.getElementById("lastScore");

let count = 0;
let topScore = 0;
let lastScore = localStorage.getItem("lastScore") || 0;
let hint = 0;
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
  count = 0;
  hint = 0;
  lastScore = 100 - count;
  alert("You Win ! Your Score is " + lastScore);
  localStorage.setItem("lastScore", lastScore);
  if (lastScore > topScore) topScore = lastScore;
  guessNumber = generateNumber();
  setCanvas();
  setResults();
};

const handleClick = (index) => {
  let button = document.getElementById("button" + index);
  let red = (green = blue = 0);
  let colorDiff = 255 / (guessNumber - index);

  const START = 1;
  const END = 100;
  const COLOR_LIMIT_START = 0;
  const COLOR_LIMIT_END = 255;
  
  let min_diff = Math.floor(COLOR_LIMIT_END / (guessNumber));
  let max_diff = Math.floor(COLOR_LIMIT_END / (END - guessNumber));
  

  if (index < guessNumber) {
    red = COLOR_LIMIT_END - index * min_diff;
    green = COLOR_LIMIT_START + index * min_diff;
  } else if (index > guessNumber) {
    green = COLOR_LIMIT_END - (index - guessNumber) * max_diff;
    blue = COLOR_LIMIT_START + (index - guessNumber) * max_diff;
  }
  // if (index > guessNumber) {
  //   hint = 1;
  // } else if (index < guessNumber) {
  //   hint = 2;
  else {
    // hint = 3;
    setGame();
  }

  count++;
  button.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  setResults();
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
