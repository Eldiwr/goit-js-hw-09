import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const { delay, step, amount } = form.elements;

form.addEventListener('submit', onFormClick);

function onFormClick(event) {
  event.preventDefault();

  let userDelay = Number(delay.value);
  const userStep = Number(step.value);
  const userAmount = Number(amount.value);

  if (userDelay < 0 || userStep < 0 || userAmount < 0) {
    return
  }

  for (let i = 1; i <= userAmount; i++) {
    createPromise(i, userDelay).then(onSuccess).catch(onError);
    userDelay += userStep;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((Fulfill, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        Fulfill({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  });  
}

function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}