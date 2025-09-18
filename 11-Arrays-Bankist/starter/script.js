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
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const displayMovements = function (movements, sort) {
  containerMovements.innerHTML = '';
  console.log(sort);
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach((mov, i) => {
    let type = mov < 0 ? 'withdrawal' : 'deposit';

    let html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}€</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//displayMovements(account1.movements);
let sorted = false;
console.log(sorted, 'sorted');

function sortMovements(acc) {
  btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('valid');
    sorted = !sorted;
    displayMovements(acc.movements, sorted);
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
  labelBalance.textContent = acc.balance;
}

function calcDisplaySummary(movements) {
  const incomes = movements
    .filter(cur => cur > 0)
    .reduce((acc, cur) => cur + acc, 0);
  console.log(incomes);
  labelSumIn.textContent = `${incomes} EUR`;
  const expenses = movements
    .filter(cur => cur < 0)
    .reduce((acc, cur) => acc - cur, 0);
  console.log(expenses);
  labelSumOut.textContent = `${Math.abs(expenses)} EUR`;
  const interest = movements
    .filter(cur => cur > 0)
    .map(depsosit => (depsosit / 100) * 1.2)
    .filter(cur => cur > 1)
    .reduce((acc, cur) => acc + cur, 0);
  console.log(interest);
  labelSumInterest.textContent = `${interest} EUR`;
}

//calcDisplaySummary(account1.movements);

function DisplayUI(acc) {
  displayMovements(acc.movements);
  calcDisplaySummary(acc.movements);
  calcPrintBalance(acc);
  moneyTranfer(acc);
  sortMovements(acc);
}

const login = function () {
  btnLogin.addEventListener('click', function (e) {
    e.preventDefault();
    const username = inputLoginUsername.value;
    console.log(accounts);
    const pin = Number(inputLoginPin.value);
    const acc = accounts.find(
      acc => acc.userName === username && pin === acc.pin
    );
    console.log(acc);
    if (!username && !pin) return;
    if (username === acc.userName && pin === acc.pin) {
      console.log(' loged In successfully ');
      logedIn = true;
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

function moneyTranfer(curAcc) {
  btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);

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
      console.log('valid loan amount');
    }
  });
}
