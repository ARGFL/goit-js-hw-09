function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }
  
  let intervalId = null;
  
  const startButton = document.querySelector('button[data-start]');
  const stopButton = document.querySelector('button[data-stop]');
  
  startButton.addEventListener('click', () => {
    // Dezactiveaza butonul Start
    startButton.disabled = true;
    
    // Incepe schimbarea culorii de fundal a lui <body>
    intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  });
  
  stopButton.addEventListener('click', () => {
    // Activeaza butonul Start
    startButton.disabled = false;
    
    // Inceteaza schimbarea culorii de fundal
    clearInterval(intervalId);
  });

  
