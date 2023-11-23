const keys = [
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."1234567890",
  'tab', 'left-shift', 'right-shift', 'esc', 'enter', 'caps', 'back', '10'
];


const generateRandomInput = () => {
  const randomInput = [];
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomChar = characters.charAt(randomIndex);
    randomInput.push(randomChar);
  }

  return randomInput;
}

let currentInput = []; 
let code = generateRandomInput();
let timer = 60;
let interval;

console.log(code)

const updateDisplay = () => {
  const inputDisplay = document.querySelector(".inputText");
  inputDisplay.innerHTML = currentInput.map(value => `<div class="patrat">${value}</div>`).join('');
}

const addToCurrentInput = (value) => {
  if (currentInput.length < 4) {
    currentInput.push(value);
    updateDisplay();

    if (currentInput.length === 4) {
      checkInputMatch();
    }
  }
}

const checkInputMatch = () => {
  const patratElements = document.querySelectorAll('.patrat');
  let allMatch = true;

  patratElements.forEach((element, index) => {
    if (currentInput[index] === code[index]) {
      element.classList.add('match');
      element.classList.remove('unmatched');
    } else {
      element.classList.add('unmatched');
      element.classList.remove('match');
      allMatch = false; 
    }
  });

  if (allMatch) {
    if (confirm("ai castigat. Vrei să începi un nou joc?")) {
      generateNewCode();
    } else {
      window.location.reload();
    }
  }
}

// nu prea inteleg dar trebui
const simulateKeyPress = (key) => {
  const event = new KeyboardEvent('keyup', { 'keyCode': key.charCodeAt(0) });
  document.dispatchEvent(event);
}

keys.forEach(key => {
  const keyElement = document.getElementById(key);
  if (keyElement) {
    keyElement.addEventListener('click', () => {
      simulateKeyPress(key);
      addToCurrentInput(key);
      keyElement.classList.add("hit");
      keyElement.addEventListener('animationend', () => {
        keyElement.classList.remove("hit");
      });
    });
  }
});

document.addEventListener("keyup", event => {
  const keyPressed = event.key.toUpperCase();
  const keyElement = document.getElementById(keyPressed);

  if (keyElement) {
    addToCurrentInput(keyPressed);
    keyElement.classList.add("hit");
    keyElement.addEventListener('animationend', () => {
      keyElement.classList.remove("hit");
    });
  }
});

const timp = document.querySelector(".timp")
const updateTimer = () => {
  timp.textContent = `Time: ${Math.floor(timer / 60)}:${(timer % 60)
    .toString()
    .padStart(2, "0")}`;
};

const generateNewCode = () => {
  code = generateRandomInput();
  clearInterval(interval);
  timer = 60;
  updateTimer();
  currentInput = [];
  updateDisplay();
  startGame();
};

const checkInterval = 4000; // Interval in milliseconds to check input

function startGame() {
  interval = setInterval(() => {
    timer--;
    updateTimer();
    if (timer === 0) {
      clearInterval(interval);
      // Optionally, add game completion logic here
      // sa adaug bum bomba
      if (confirm("bomba a explodat. Vrei să începi un nou joc?")) {
        generateNewCode();
      } else {
        window.location.reload();
      }
    } else if (currentInput.length === 4) {
      checkInputMatch(); // Check for matches whenever input is complete
      currentInput = []; // Clear the input after each check
      updateDisplay(); // Update the displayed input
    }
  }, 1000);
}


startGame();