/*
  Plan:
    Create calculator arithmetic functions
    Create function that takes 2 numbers and arithmetic symbol
    Create the array of input numbers and results
    Create a basic HTML calculator with buttons for each digit, 
      each of the above functions and an “Equals” key. 
*/ console.clear();
let inputHistory = [];

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
  return answer;
}

console.log(calculateNumbers(1, "-", 3));

console.table(inputHistory);
