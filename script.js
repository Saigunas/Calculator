console.clear();
let inputHistory = [];
let currNumber = [];
let currSign = "";
let isFunctionReady = false;

function calculateNumbers(a, sign, b) {
  let answer;
  switch (sign) {
    case "+":
      answer = addNumbers(a, b);
      break;
    case "-":
      answer = subtractNumbers(a, b);
      break;
    case "*":
      answer = multiplyNumbers(a, b);
      break;
    case "/":
      answer = devideNumbers(a, b);
      break;
    default:
      answer = "Huh";
  }

  if (answer === "ERROR") {
    return answer;
  }

  inputHistory.push(answer);
  console.log(answer);
  return answer;
}

console.table(inputHistory);

// document.onkeypress = function (evt) {
//   evt = evt || window.event;
//   var charCode = evt.keyCode || evt.which;
//   var charStr = String.fromCharCode(charCode);
//   alert(charStr);
// };

function arrToNumber(arr) {
  return Number(arr.join(""));
}

const calculatorScreen = document.querySelector(".calculator-screen");
//Calculator buttons map
const numberButtons = document.querySelectorAll(".number-call");
const functionButtons = document.querySelectorAll(".function-call");

numberButtons.forEach((numberButton) =>
  numberButton.addEventListener("click", addNumberCall)
);
functionButtons.forEach((functionButton) =>
  functionButton.addEventListener("click", addFunctionCall)
);

function addNumberCall(e) {
  let calledNumber = e.target.getAttribute("data-key");
  console.log(calledNumber);
  currNumber.push(calledNumber);
  calculatorScreen.textContent = arrToNumber(currNumber);

  //If there was a sign before, function will be ready to execute
  if (currSign !== "") {
    isFunctionReady = true;
  }
}

function addFunctionCall(e) {
  if (currNumber.length !== 0) {
    //Add number to history
    inputHistory.push(arrToNumber(currNumber));
  }

  if (isFunctionReady === true) {
    let a = inputHistory[inputHistory.length - 2];
    let b = inputHistory[inputHistory.length - 1];
    let answer = calculateNumbers(a, currSign, b);
    calculatorScreen.textContent = answer;
  }

  //If there was no number input yet, don't allow sign input
  if (inputHistory.length !== 0) {
    currSign = e.target.getAttribute("data-key");
    if (currSign === "=") {
      currSign = "";

      //If it there is no function, ignore "="
      if (isFunctionReady === false) {
        return;
      }
    }
    if (currSign === "c") {
      inputHistory = [];
      currSign = "";
      calculatorScreen.textContent = 0;
    }
    if (currSign === "b") {
      currNumber.splice(-1);
      currSign = "";
      calculatorScreen.textContent = arrToNumber(currNumber);
      return;
    }
  }

  //Before leaving clear previous number
  isFunctionReady = false;
  currNumber = [];
}
