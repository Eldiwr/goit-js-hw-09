import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startButton = document.querySelector('[data-start]');

const timeData = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

let timerId = null;
let selectedTime = null;

startButton.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      selectedTime = selectedDates[0].getTime();
      if (selectedTime <= Date.now()) {
          startButton.setAttribute('disabled', 'true');
          Notify.failure('Please choose a date in the future');
      } else {
        startButton.removeAttribute('disabled');
    }
  },
};

startButton.addEventListener('click', startButtonClick);

flatpickr('#datetime-picker', options);

function startButtonClick() {
  timerId = setInterval(function () {
    let timeDif = selectedTime - Date.now();

    let { days, hours, minutes, seconds } = convertMs(timeDif);

    if (selectedTime > Date.now()) {
      timeData.days.textContent = days;
      timeData.hours.textContent = hours;
      timeData.minutes.textContent = minutes;
      timeData.seconds.textContent = seconds;
    } else {
      clearInterval(timerId);
      startButton.setAttribute('disabled', 'true');
    }
  }, 1000)
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
