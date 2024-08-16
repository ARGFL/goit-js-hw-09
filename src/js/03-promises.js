import Notiflix from 'notiflix';
//Am selectat clasa form din HTML si am atasat un event listner care asteapta evenimentul submit
document.querySelector('.form').addEventListener('submit', (event) => {
  //acestui eveniment Submit i-am dat atatsat un prevent default  pentru a preveni reincarcarea paginii cand se apasa Submit,
  //in acest fel Java Script poate sa ruleze codul in browser.
  event.preventDefault();


  // pentru a captura prima valoare din campul 'First Delay(ms)',apoi o coverteste intr-un numar si o asigneaza variabilei 'delay'
  //aceasta este prima intarziere pentru prima promisiune, determina cat de lung va astepta inainte sa se rezolve sau respinge.
  
  const delay = Number(event.target.delay.value);

  //'step' determina additional delay  pentru fiecare urmatoare promisiune dupa prima promisiune.
  const step = Number(event.target.step.value);

  // 'amount' reprezinta nr. total de promisiuni care vor fi create.
  const amount = Number(event.target.amount.value);

  console.log(`Starting to create ${amount} promises with an initial delay of ${delay}ms and a step of ${step}ms.`);

  for (let i = 1; i <= amount; i++) {
    const currentDelay = delay + step * (i - 1);
    console.log(`Creating promise ${i} with a delay of ${currentDelay}ms.`);
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        console.log(`Promise ${position} resolved after ${delay}ms`);
        resolve({ position, delay });
      } else {
        console.log(`Promise ${position} rejected after ${delay}ms`);
        reject({ position, delay });
      }
    }, delay);
  });
}
