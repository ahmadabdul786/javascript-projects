'use strict';
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class WorkOut {
  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
}

class Running extends WorkOut {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }
  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace.toFixed(2);
  }
  _setDescription() {
    this.description = `${this.type.slice(0, 1)}${this.type.slice(1)} `;
  }
}

class Cycling extends WorkOut {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }
  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed.toFixed(2);
  }
  _setDescription() {
    this.description = `${this.type.slice(0, 1)}${this.type.slice(1)} `;
  }
}

//const run1 = new Running(2, 60, 30);
//const cyc1 = new Cycling(2, 20, 90);
//console.log(run1, cyc1);

class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  constructor() {
    this._getPosition();
    console.log(this.#workouts);
    this._getLocalStorage();

    form.addEventListener('submit', this._newWorkOut.bind(this));

    inputType.addEventListener('change', this._toggleElevationField.bind(this));

    containerWorkouts.addEventListener('click', this._movetoPopup.bind(this));
  }

  _getPosition() {
    navigator.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      function () {
        alert('could not get your position');
      }
    );
  }

  _loadMap(e) {
    console.log(e);
    const { latitude } = e.coords;
    const { longitude } = e.coords;
    console.log(`https://www.google.com/maps/@${longitude},${latitude}`);
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    this.#map.on('click', this._showForm.bind(this));
    //looping over the array workouts to render pop up on the maps
    this.#workouts?.forEach(work => this.renderMakerPopup(work));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  _hideForm() {
    inputDistance.value = '';
    inputDuration.value = '';
    inputCadence.value = '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => {
      form.style.display = 'grid';
    }, 1000);
  }
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkOut(e) {
    let workout;

    const validateInput = function (...inputs) {
      //written a func to validate the input entities
      return inputs.every(el => Number.isFinite(el));
    };
    //written an other func to validate the input entities
    const allPositive = function (...inputs) {
      return inputs.every(el => el > 0);
    };
    //preventing default behaviour
    e.preventDefault();
    //getting data from the form
    const type = inputType.value;
    const distance = Number(inputDistance.value);
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;

    //check the input if valid
    if (!distance || !duration) return;

    //create running obj if workout is running
    if (type == 'running') {
      const cadence = +inputCadence.value;

      if (
        !validateInput(distance, duration, cadence) &&
        !allPositive(distance, duration, cadence)
      )
        return alert('enter positive number');
      workout = new Running([lat, lng], distance, duration, cadence);
      //We are validating the every entries if they are all finite means no one is other than num
      //& we are checking if every entries are positive
      //every return true if all of the entries meet the condition if one of them is false then return false
    }
    //create cycling obj if workout is cycling
    if (type == 'cycling') {
      const elevation = inputElevation.value;
      if (
        !validateInput(distance, duration, elevation) &&
        !allPositive(distance, duration)
      )
        return alert('enter positive number');
      //create new object through the data
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }
    //pushing new obj into workouts array

    this.#workouts.push(workout);

    //add marker on the map
    this.renderMakerPopup(workout);

    //updating the UI
    this.renderWorkOut(workout);

    //hiding the form
    this._hideForm();

    //adding new object into local Storage
    this._setLocalStorage();
  }

  _movetoPopup(e) {
    console.log(e.target.closest('.workout'));
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;

    const workout = this.#workouts.find(
      workout => workout.id === workoutEl.dataset.id
    );
    console.log(workout);
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  renderMakerPopup(workout) {
    const type = inputType.value;

    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(`${type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.type}`)
      .openPopup();
  }
  renderWorkOut(workout) {
    let html = `
    <li class="workout workout--running" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♂️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
          
    `;

    if (workout.type === 'running') {
      html += `
       <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(2)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>  
        </li>
      `;
    } else if (workout.type === 'cycling') {
      html += `
       <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
      `;
    }
    form.insertAdjacentHTML('afterend', html);
  }
  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    console.log(data);
    if (!data) return;
    //add the local storage data in to our empty array
    this.#workouts = data;

    //
    this.#workouts.forEach(work => this.renderWorkOut(work));
  }
  _reset() {
    this.#workouts = [];
    localStorage.removeItem('workouts');
    location.reload();
  }
}
const app = new App();
// async function contriesData() {
//   const res = await fetch(`https://restcountries.com/v2/name/pakistan`);
//   const data = await res.json();
//   console.log(data);
// }
// contriesData();
