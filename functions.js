function addNumbers(a, b) {
  return a + b;
}

function subtractNumbers(a, b) {
  return a - b;
}

function multiplyNumbers(a, b) {
  return a * b;
}

function devideNumbers(a, b) {
  if (b === 0) {
    console.warn("Devided by zero");
    return "ERROR";
  }
  return a / b;
}
