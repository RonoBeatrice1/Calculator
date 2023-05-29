const display = document.querySelector(".calculator_display");

const numberButtons = document.querySelectorAll(
  ".calculator_keys button:not(.key--operator)"
);

const operatorButtons = document.querySelectorAll(".key--operator");

let firstOperand = null;

let operator = null;

let isResultDisplayed = false;

const updateDisplay = (value) => {
  display.textContent = value;
};

const clearCalculator = () => {
  firstOperand = null;
  operator = null;
  updateDisplay(0);
};

// Function to handle number button clicks
const handleNumberButtonClick = (e) => {
  const number = e.target.textContent;

  if (isResultDisplayed) {
    updateDisplay(number);
    isResultDisplayed = false;
  } else {
    const currentDisplayValue = display.textContent;
    updateDisplay(
      currentDisplayValue === "0" ? number : currentDisplayValue + number
    );
  }
};

// Function to handle operator button clicks
const handleOperatorButtonClick = (e) => {
  const selectedOperator = e.target.dataset.action;

  if (operator && firstOperand !== null) {
    calculate();
    return;
  }

  firstOperand = parseFloat(display.textContent);
  operator = selectedOperator;
  isResultDisplayed = false;
};

const calculate = () => {
  const secondOperand = parseFloat(display.textContent);

  let result;
  switch (operator) {
    case "Add":
      result = firstOperand + secondOperand;
      break;
    case "Subtract":
      result = firstOperand - secondOperand;
      break;
    case "Multiply":
      result = firstOperand * secondOperand;
      break;
    case "Divide":
      result = firstOperand / secondOperand;
      break;
    default:
      return;
  }

  updateDisplay(result);
  firstOperand = result;
  operator = null;
  isResultDisplayed = true;
};

const handleDecimalButtonClick = () => {
  if (
    isResultDisplayed ||
    document.querySelector(".calculator_display").textContent.includes(".")
  ) {
    return;
  } else {
    updateDisplay(display.textContent + ".");
  }
};

numberButtons.forEach((button) => {
  button.addEventListener("click", handleNumberButtonClick);
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", handleOperatorButtonClick);
});

document.querySelector(".key--equal").addEventListener("click", calculate);

document
  .querySelector('[data-action="decimal"]')
  .addEventListener("click", handleDecimalButtonClick);

document
  .querySelector('[data-action="clear"]')
  .addEventListener("click", clearCalculator);
