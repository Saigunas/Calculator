console.clear();
let inputHistory = [];
let currNumber = [];
let currSign = "";
let isFunctionReady = false;

function limitNumber(numberToLimit) {
  var max_chars = 5;

  if (numberToLimit.length > max_chars) {
    numberToLimit = numberToLimit.substr(0, max_chars);
    return true;
  }
}

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
  if (limitNumber(answer.toString())) {
    answer = answer.toExponential(2);
  }
  inputHistory.push(answer);
  return answer;
}

function arrToNumber(arr) {
  return Number(arr.join(""));
}

function arrToString(arr) {
  return arr.join("");
}

const calculatorScreen = document.querySelector(".calculator-screen");
//Calculator buttons map
const numberButtons = document.querySelectorAll(".number-call");
const functionButtons = document.querySelectorAll(".function-call");

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", function () {
    addNumberCall(this.getAttribute("data-key"));
    this.classList.add("buttonClicked");
  });
  numberButton.addEventListener("animationend", removeTransition);
});

functionButtons.forEach((functionButton) => {
  functionButton.addEventListener("click", function () {
    addFunctionCall(this.getAttribute("data-key"));
    this.classList.add("buttonClicked");
  });
  functionButton.addEventListener("animationend", removeTransition);
});

function removeTransition(e) {
  this.classList.remove("buttonClicked");
}

let allowedNumbers = Array.from(numberButtons).map((element) =>
  element.getAttribute("data-key")
);
let allowedFunctions = Array.from(functionButtons).map((element) =>
  element.getAttribute("data-key")
);

document.onkeydown = function (e) {
  let charCode = e.keyCode;
  //Backspace
  if (charCode === 8) {
    addFunctionCall("b");
  }
  if (charCode === 13) {
    addFunctionCall("=");
  }
};

document.onkeypress = function (evt) {
  //Get character from charCode
  evt = evt || window.event;
  var charCode = evt.keyCode || evt.which;
  var charStr = String.fromCharCode(charCode);

  //check if number or element is allowed
  if (allowedNumbers.includes(charStr)) {
    addNumberCall(charStr);
  }
  if (allowedFunctions.includes(charStr)) {
    addFunctionCall(charStr);
  }
};

function addNumberCall(calledNumber) {
  if (calledNumber === ".") {
    if (currNumber.includes(".")) {
      return;
    }
    //adds 0 before dot
    if (currNumber.length === 0) {
      currNumber.push(0);
    }
  }

  //Don't allow 0 to be repeated
  if (calledNumber === "0") {
    if (currNumber[0] === "0") {
      return;
    }
  }

  if (limitNumber(arrToString(currNumber)) !== true) {
    currNumber.push(calledNumber);
  }

  calculatorScreen.textContent = arrToString(currNumber);

  //If there was a sign before, function will be ready to execute
  if (currSign !== "") {
    isFunctionReady = true;
  }
}

function addFunctionCall(calledSign) {
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
    currSign = calledSign;
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
      if (currNumber.length === 0) {
        calculatorScreen.textContent = "0";
        return;
      }
      calculatorScreen.textContent = arrToString(currNumber);
      return;
    }
  }

  //Before leaving clear previous number
  isFunctionReady = false;
  currNumber = [];
}
