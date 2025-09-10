'use strict';

let randomNum = Math.round(Math.random() * 20 + 1);
//localStorage.setItem('highScore', 20);

console.log(randomNum);
let score = 20;

initialHighScore();
//running the check btn
document
  .querySelector('.check')
  .addEventListener('click', () => checkingNumber());
// reseting all
document.querySelector('.again').addEventListener('click', reset);

function reset() {
  randomNum = Math.round(Math.random() * 20 + 1);
  score = 20;
  document.querySelector('.highscore').textContent = score;
  document.querySelector('body').style.backgroundColor = 'black';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.message').textContent = 'start Guessing...';
}

function checkNumber(number) {
  if (score > 0) {
    //winning the game
    if (randomNum == number) {
      document.querySelector('.message').textContent = 'correct number 👌';
      document.querySelector('.number').textContent = randomNum;
      document.querySelector('.highscore').textContent = score;
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';
      localStorage.setItem('highScore', score);
    }
    //number is too high
    else if (number > randomNum) {
      document.querySelector('.message').textContent = 'too high 📈';

      score = score - 1;
      document.querySelector('.score').textContent = score;
    }
    //number is too low
    else if (number < randomNum) {
      document.querySelector('.message').textContent = 'too  low 📉';

      score = score - 1;
      document.querySelector('.score').textContent = score;
    } else {
      score = score - 1;
      document.querySelector('.score').textContent = score;
    }
  }
  //loosing the gaming
  else if (number == 0) {
    document.querySelector('.message').textContent = 'you have loose the game';
  }
}

function checkingNumber() {
  let input = document.querySelector('.guess').value;
  if (!input) return;
  console.log(input);
  checkNumber(input);
}

function initialHighScore() {
  let highScore = localStorage.getItem('highScore');
  console.log(JSON.parse(highScore));
  document.querySelector('.highscore').textContent = highScore;
}
