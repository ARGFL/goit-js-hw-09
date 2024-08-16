import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startButton = document.querySelector('button[data-start]');
startButton.disabled = true;
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let countdownInterval;
let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate && selectedDate > new Date()) {
      startButton.disabled = false; // Enable Start button if a valid future date is selected
    } 
    // else {
    //   startButton.disabled = true;
    //   window.alert("Please choose a date in the future");
    // }
    else {
      startButton.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr("#datetime-picker", options);

startButton.addEventListener('click', () => {
  startCountdown();
});

function startCountdown() {
  if (!selectedDate || selectedDate <= new Date()) {
    Notiflix.Notify.failure('Please choose a valid date in the future');
    return;
  }
  
  startButton.disabled = true;
  
  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeRemaining = selectedDate - now;
    
    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      updateTimerUI(0, 0, 0, 0);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeRemaining);
    updateTimerUI(days, hours, minutes, seconds);
  }, 1000);
}

function updateTimerUI(days, hours, minutes, seconds) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
