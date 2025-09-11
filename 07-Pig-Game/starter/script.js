'use strict';

const rollDice = document.querySelector('.btn--roll');
const holdDice = document.querySelector('.btn--hold');
const resetbtn = document.querySelector('.btn--new');
const tempScore0El = document.querySelector('#current--0');
const tempScore1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const player0Name = document.getElementById('name--0');
const player1Name = document.getElementById('name--1');
let isOne = true;

let total0 = 0;
let total1 = 0;
const scores = [0, 0];
let gameStatus = true;
rollDice.addEventListener('click', function () {
  if (gameStatus == false) return;

  const randomNum = Math.trunc(Math.random() * 6 + 1);
  console.log(randomNum);
  diceEl.src = `dice-${randomNum}.png`;

  if (randomNum !== 1) {
    calculateTheScore(randomNum);
  }
  if (randomNum === 1) {
    if (isOne) {
      total0 = 0;
      tempScore0El.textContent = 0;
      //player1.classList = toggle('player--active');
    } else {
      total1 = 0;
      tempScore1El.textContent = 0;
      //player0.classList = 'player--active';
    }

    isOne = !isOne;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
  }

  //   const parent = document.querySelector('main');
  //   let element = document.createElement('img');
  //   const sideNode = document.querySelector('btn--new');
  //   element.setAttribute('src', `dice-${randomNum}.png`);
  //   element.setAttribute('class', `dice`);
  //   parent.insertBefore(element, sideNode);
});
holdDice.addEventListener('click', function () {
  if (isOne) {
    scores[0] = scores[0] + total0;
    score0.textContent = scores[0];
  } else {
    scores[1] = scores[1] + total1;
    score1.textContent = scores[1];
  }

  if (isOne) {
    total0 = 0;
    tempScore0El.textContent = 0;
    //player1.classList = toggle('player--active');
  } else {
    total1 = 0;
    tempScore1El.textContent = 0;
    //player0.classList = 'player--active';
  }
  if (scores[0] >= 100) {
    player0.classList.add('player--winner');
    player0Name.textContent = 'Congratulation 🎉 Player 1 won the Game';
    diceEl.classList.add('hidden');
    player0Name.style.fontSize = '2rem';
    gameStatus = false;
  }
  if (scores[1] >= 100) {
    player1.classList.add('player--winner');
    player1Name.textContent = 'Congratulation 🎉 Player 2 won the Game';
    diceEl.classList.add('hidden');
    gameStatus = false;
  }

  isOne = !isOne;
});

resetbtn.addEventListener('click', reset);

function reset() {
  scores[(0, 0)];
  total0 = 0;
  total1 = 0;
  gameStatus = true;
  tempScore0El.textContent = 0;
  tempScore1El.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0Name.textContent = 'Player 1';
  player1Name.textContent = 'Player 2';
  player0Name.style.fontSize = '4rem';
}
function calculateTheScore(score) {
  if (isOne) {
    total0 = total0 + score;
    console.log(total0);
    if (total0 <= 20) {
      tempScore0El.textContent = total0;
    }
  } else {
    total1 = total1 + score;
    if (total1 <= 100) {
      tempScore1El.textContent = total1;
    }
  }
}
