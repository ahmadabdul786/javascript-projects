'use strict';

const randomNum = Math.round(Math.random() * 20 + 1);
//localStorage.setItem('highScore', 20);

console.log(randomNum);
let score = 20;

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
initialHighScore();
document
  .querySelector('.btn-check')
  .addEventListener('click', () => checkingNumber());

function checkingNumber() {
  let input = document.querySelector('.guess').value;
  console.log(input);
  checkNumber(input);
}

function initialHighScore() {
  let highScore = localStorage.getItem('highScore');
  console.log(JSON.parse(highScore));
  document.querySelector('.highscore').textContent = highScore;
}
