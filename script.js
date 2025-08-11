'use strict';

//  selecting elements
const elments = {
  player0: document.querySelector('.player--0'),
  namePlayer0: document.querySelector('#name--0'),
  player1: document.querySelector('.player--1'),
  namePlayer1: document.querySelector('#name--1'),
  score0: document.querySelector('#score--0'),
  score1: document.querySelector('#score--1'),
  current0: document.querySelector('#current--0'),
  current1: document.querySelector('#current--1'),
  dice: document.querySelector('.dice'),
  playerActive: document.querySelector('.player--active'),
  btnInformation: document.querySelector('.info-modal'),
  btnCloseModal: document.querySelector('.btn-close-modal'),
  overLay: document.querySelector('.info-overlay'),
  players: document.querySelector('.player'),
  btnHoldAndRolling: document.querySelector('.btns-row'),
  btnResetGame: document.querySelector('.btn--new'),
  currentScore: document.querySelector('.current-score'),
};
// initializing scores
let randomNumber = Math.trunc(Math.random() * 6) + 1;
let currentScore0, currentScore1, totalScore0, totalScore1, gameOver;

const resetingGame = function () {
  gameOver = false;
  totalScore0 = 0;
  totalScore1 = 0;
  elments.score0.textContent = totalScore0;
  elments.score1.textContent = totalScore1;
  elments.dice.classList.add('hidden');
  elments.player0.classList.remove('player--winner');
  elments.player1.classList.remove('player--winner');
  elments.namePlayer0.textContent = 'Player 1';
  elments.namePlayer1.textContent = 'Player 2';
  elments.btnHoldAndRolling.classList.remove('hidden');
  elments.btnResetGame.style.top = '4rem';
};

resetingGame();

//  for audio
const clickSound = new Audio('./soundEffects/click.mp3');
const winkSound = new Audio('./soundEffects/win.mp3');

// function for hidding
const hiddenDiceAndBtn = function () {
  elments.dice.classList.add('hidden');
  elments.btnHoldAndRolling.classList.add('hidden');
};
//  for current score zero
const currentScoreTo0 = function () {
  currentScore0 = 0;
  elments.current0.textContent = currentScore0;
};
//  for current score one
const currentScoreTo1 = function () {
  currentScore1 = 0;
  elments.current1.textContent = currentScore1;
};
// function for winning
const winner = function () {
  if (totalScore0 >= 100) {
    winkSound.play();
    elments.player0.classList.add('player--winner');
    elments.player0.classList.remove('player--active');
    elments.namePlayer0.textContent = 'Winner Player  1';
    elments.btnResetGame.style.top = '27rem';
    currentScoreTo0();
    hiddenDiceAndBtn();
    return (gameOver = true);
  } else if (totalScore1 >= 100) {
    winkSound.play();
    elments.player1.classList.add('player--winner');
    elments.player1.classList.remove('player--active');
    elments.namePlayer1.textContent = 'Winner Player 2';
    elments.btnResetGame.style.top = '27rem';
    currentScoreTo1();
    hiddenDiceAndBtn();
    return (gameOver = true);
  }
};
//  function for close model info
const closingFunction = function () {
  elments.btnInformation.classList.add('hidden');
  elments.overLay.classList.add('hidden');
};

//  function for switching active 0 to 1 player
const activePlayers = function () {
  elments.player0.classList.add('player--active');
  elments.player1.classList.remove('player--active');
};
//  function for switching active 1 to 0 player
const unActivePlayers = function () {
  elments.player0.classList.remove('player--active');
  elments.player1.classList.add('player--active');
};

//  function to click rollingDice game
const rollingDice = function () {
  winner();
  if (!gameOver) {
    clickSound.play();
    elments.dice.classList.remove('hidden');
    randomNumber = Math.trunc(Math.random() * 6) + 1;
    elments.dice.src = `images/dice-${randomNumber}.png`;
    if (randomNumber !== 1) {
      if (elments.player0.classList.contains('player--active')) {
        currentScore0 += randomNumber;
        elments.current0.textContent = currentScore0;
      } else if (elments.player1.classList.contains('player--active')) {
        currentScore1 += randomNumber;
        elments.current1.textContent = currentScore1;
      }
    } else if (randomNumber === 1) {
      if (elments.player0.classList.contains('player--active')) {
        currentScoreTo0();
        unActivePlayers();
      } else if (elments.player1.classList.contains('player--active')) {
        activePlayers();
        currentScoreTo1();
      }
    }
  }
};
// function for holding the score
//  btn hold
const btnHold = function () {
  if (!gameOver) {
    clickSound.play();
    winner();
    if (elments.player0.classList.contains('player--active')) {
      totalScore0 += currentScore0;
      elments.score0.textContent = totalScore0;
      currentScoreTo0();
      unActivePlayers();
    } else if (elments.player1.classList.contains('player--active')) {
      totalScore1 += currentScore1;
      elments.score1.textContent = totalScore1;
      currentScoreTo1();
      activePlayers();
    }
  }
};
//  fuction for reseting the game
//  btn new game
const btnNewGame = function () {
  resetingGame();
  currentScoreTo0();
  currentScoreTo1();
  clickSound.play();
  activePlayers();
};
//  shoing information model
const btnInfo = function () {
  clickSound.play();
  elments.btnInformation.classList.remove('hidden');
  elments.overLay.classList.remove('hidden');
};
//  hidding information model
const btnClose = function () {
  clickSound.play();
  closingFunction();
};
//  hidding information model with esc key
const escClose = function (event) {
  if (event.key === 'Escape') {
    closingFunction();
  }
};
// btn Rolling
const btnRolling = document
  .querySelector('.btn--roll')
  .addEventListener('click', rollingDice);
//   btn hold
const btnHoldGame = document
  .querySelector('.btn--hold')
  .addEventListener('click', btnHold);
//  btn new game
const btnNew = document
  .querySelector('.btn--new')
  .addEventListener('click', btnNewGame);
//  btn iformation
const btnInformat = document
  .querySelector('.btn-info')
  .addEventListener('click', btnInfo);
// btn close modal (x)
const btnClosingModal = document
  .querySelector('.btn-close-modal')
  .addEventListener('click', btnClose);
//  close model with clicking outside
const ecsClosing = document
  .querySelector('.info-overlay')
  .addEventListener('click', btnClose);
//  esc key for closing model
document.addEventListener('keydown', escClose);
