'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDate: [
    '2025-09-24',
    '2025-09-23',
    '2025-09-22',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
  ],
  currency: 'USD',
  locale: 'us-US',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDate: [
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDate: [
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
  ],
  currency: 'USD',
  locale: 'us-US',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDate: [
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
  ],
  currency: 'USD',
  locale: 'us-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const options = {
  hour: 'numeric',
  month: 'numeric',
  year: 'numeric',
  day: 'numeric',
};

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
function formatCurrency(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}
/////////////////////////////////////////////////
function calcDaysPassed(date1, date2) {
  //  console.log(date1, date2);
  return Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
}

const displayMovements = function (acc, sort) {
  containerMovements.innerHTML = '';

  const combinedMovDates = acc.movements.map((val, i) => ({
    movement: val,
    movDate: acc.movementsDate[i],
  }));
  //console.log(combinedMovDates);
  // const movs = sort ? acc.movements.sort((a, b) => a - b) : acc.movements;
  if (sort) {
    combinedMovDates.sort((a, b) => a.movement - b.movement);
  }

  combinedMovDates.forEach((obj, i) => {
    const { movement, movDate } = obj;

    let type = movement < 0 ? 'withdrawal' : 'deposit';

    const days = calcDaysPassed(new Date(movDate), new Date());
    //console.log(days);
    let displayDay = 0;
    if (days == 0) {
      displayDay = `Today`;
    } else if (days == 1) {
      displayDay = `Yesterday`;
    } else if (days <= 7) {
      displayDay = `${days} days ago`;
    } else {
      // const date = new Date(movDate);
      // const year = date.getFullYear();
      // const month = date.getMonth() + 1;
      // const days = date.getDay();
      displayDay = new Intl.DateTimeFormat(acc.locale, options).format(
        new Date(movDate)
      );
      // displayDay = `${days}/${month}/${year}`;
      //displayDay = `${days.getMonth()}/${days.getFullYear()}`;
    }
    const curOption = {
      style: 'currency',
      currency: acc.currency,
    };
    // const displayCurency = new Intl.NumberFormat(acc.locale, curOption).format(
    //   movement
    // );
    const displayCurency = formatCurrency(movement, acc.locale, acc.currency);
    let html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${displayDay}</div>
          <div class="movements__value">${displayCurency}</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//displayMovements(account1.movements);
let sorted = false;

function sortMovements(acc) {
  btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('valid');
    sorted = !sorted;
    displayMovements(acc, sorted);
  });
}

function createUerName(accs) {
  accs.forEach(acc => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
}

console.log(createUerName(accounts));
let logedIn = false;

function calcPrintBalance(acc) {
  acc.balance = acc.movements.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  acc.balance;
  // const displaybalance = new Intl.NumberFormat(acc.locale, {
  //   style: 'currency',
  //   currency: acc.currency,
  // }).format(acc.balance);
  const displaybalance = formatCurrency(acc.balance, acc.locale, acc.currency);
  labelBalance.textContent = displaybalance;
}

function calcDisplaySummary(movements, acc) {
  const sumOfIncomes = movements
    .filter(cur => cur > 0)
    .reduce((acc, cur) => cur + acc, 0);
  //console.log(incomes);
  const formatedSumOfIncomes = formatCurrency(
    sumOfIncomes,
    acc.locale,
    acc.currency
  );
  labelSumIn.textContent = formatedSumOfIncomes;

  const sumOfExpenses = movements
    .filter(cur => cur < 0)
    .reduce((acc, cur) => acc - cur, 0);
  //console.log(expenses);
  // labelSumOut.textContent = `${Math.abs(expenses)} EUR`;
  const formatedSumOfExpenses = formatCurrency(
    sumOfExpenses,
    acc.locale,
    acc.currency
  );
  labelSumOut.textContent = formatedSumOfExpenses;

  const interest = movements
    .filter(cur => cur > 0)
    .map(depsosit => (depsosit / 100) * 1.2)
    .filter(cur => cur > 1)
    .reduce((acc, cur) => acc + cur, 0);
  //  console.log(interest);
  //labelSumInterest.textContent = `${interest} EUR`;
  const formatedInterest = formatCurrency(interest, acc.locale, acc.currency);
  labelSumInterest.textContent = formatedInterest;
}

//calcDisplaySummary(account1.movements);

function DisplayUI(acc) {
  displayMovements(acc);
  calcDisplaySummary(acc.movements, acc);
  calcPrintBalance(acc);
  moneyTranfer(acc);
  sortMovements(acc);
}
let timer;
function logoutTimerStart() {
  //set time to 5 min
  let time = 120;
  timer = setInterval(tick, 1000);

  function tick() {
    let min = Math.trunc(time / 60);
    let sec = time % 60;
    labelTimer.textContent = `${min}:${sec} `;
    //decrease the timer by 1 every second

    //we need to stop the timer when reaches zero
    if (time === 0) {
      console.log('logout');
      containerApp.style.opacity = 0;
      clearInterval(timer);
    }
    time--;
  }
  //call the timer every second

  return timer;
}

const login = function () {
  btnLogin.addEventListener('click', function (e) {
    e.preventDefault();
    const username = inputLoginUsername.value;
    // console.log(accounts);
    const pin = Number(inputLoginPin.value);
    const acc = accounts.find(
      acc => acc.userName === username && pin === acc.pin
    );
    //console.log(acc);
    if (!username && !pin) return;
    if (username === acc.userName && pin === acc.pin) {
      console.log(' loged In successfully ');
      logedIn = true;
      containerApp.style.opacity = 100;
      if (timer) clearInterval(timer);
      logoutTimerStart();
      DisplayUI(acc);
      inputLoginPin.value = '';
      inputLoginUsername.value = '';
      inputLoginPin.blur();
      closeAccount(acc);
      requestLoan(acc);
    }
    console.log(username, pin);
  });
};
login();
// const now = new Date();
// const year = now.getFullYear();
// const month = `${now.getMonth()}`.padStart(2, 0);
// const day = `${now.getDay()}`.padStart(2, 0);
// const hours = now.getHours();
// const mins = `${now.getMinutes()}`.padStart(2, 0);

// labelDate.textContent = `${day}/ ${month}/${year} ${hours}:${mins}`;

const locale = navigator.language;
const now = new Date();
labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

function moneyTranfer(curAcc) {
  btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    clearInterval(timer);
    logoutTimerStart();
    const moneyTranferTo = accounts.find(
      acc => inputTransferTo.value === acc.userName
    );

    if (
      amount > 0 &&
      amount <= curAcc.balance &&
      moneyTranferTo &&
      moneyTranferTo.userName !== curAcc.userName
    ) {
      curAcc.movements.push(-amount);
      moneyTranferTo.movements.push(amount);
      curAcc.movementsDate.push(new Date().toISOString());
      moneyTranferTo.movementsDate.push(new Date().toISOString());
      DisplayUI(curAcc);
      inputTransferAmount.blur();
      inputTransferAmount.value = '';
      inputTransferTo.value = '';
    }
  });
}

function closeAccount(curAcc) {
  btnClose.addEventListener('click', function (e) {
    e.preventDefault();
    if (logedIn === false) return;

    const userNameToDel = inputCloseUsername.value;
    const accPinToDel = Number(inputClosePin.value);
    if (!userNameToDel || !accPinToDel) return;
    // agr ap chahain to ksi b account to delete kr skty hain
    //   const accTodel = accounts.find(acc => acc.userName === userNameToDel);
    //   //console.log(indexOfDelAcc);
    //   if (accPinToDel === accTodel.pin) {
    //     console.log('valid input');
    //   }
    const delAccInd = accounts.findIndex(
      acc => acc.userName === curAcc.userName
    );
    //const indexToDelAcc = accounts.indexOf(accTodel);
    //gonna delete the account
    accounts.splice(delAccInd, 1);
    //console.log(accounts);
    containerApp.style.opacity = 0;
  });
}
function requestLoan(curAcc) {
  btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
    const loanAmount = Number(inputLoanAmount.value);
    if (
      loanAmount > 0 &&
      curAcc.movements.some(movement => movement >= loanAmount * 0.1)
    ) {
      curAcc.movements.push(loanAmount);
      curAcc.movementsDate.push(new Date().toISOString());
      DisplayUI(curAcc);
    }
  });
}

// function calcDaysPassed(date1, date2) {
//   console.log(date1, date2);
//   return Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
// }
// console.log(calcDaysPassed(new Date(2015, 10, 12), new Date(2015, 10, 14)));
