'use strict';
const modal = document.querySelector('.modal');
const overLay = document.querySelector('.overlay');
const btnCloseModel = document.querySelector('.close-modal');
const btnShowModel = document.querySelectorAll('.show-modal');

for (let i = 0; i < btnShowModel.length; i++) {
  btnShowModel[i].addEventListener('click', function () {
    console.log('clicked');
    modal.classList.remove('hidden');
    overLay.classList.remove('hidden');
  });
}
btnCloseModel.addEventListener('click', function () {
  modal.classList.add('hidden');
  overLay.classList.add('hidden');
});
