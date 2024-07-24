let inputs = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
let guess = 50;

const START = 1;
const END = 100;
const COLOR_LIMIT_START = 0;
const COLOR_LIMIT_END = 255;

let min_diff = Math.floor(COLOR_LIMIT_END / (guess - START));
let max_diff = Math.floor(COLOR_LIMIT_END / (END - guess));

inputs.forEach((input) => {
  let red = green = blue = 0;

  let result = [];

  if (input <= guess) {
    red = COLOR_LIMIT_END - input * min_diff;
    green = COLOR_LIMIT_START + input * min_diff;
  }

  if (input > guess) {
    green = COLOR_LIMIT_END - (input-guess) * max_diff;
    blue = COLOR_LIMIT_START + (input-guess) * max_diff;
  }

  result.push(red, green, blue);
  console.log(result);
});
