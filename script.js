const userInput = document.querySelector(".user-input");
const resetKey = document.querySelector(".reset-key");
const answerKey = document.querySelector(".answer-key");
const deleteKey = document.querySelector(".delete-key");
const keys = Array.from(document.querySelectorAll(".key"));

let lastKeyIsOperator = false;
let decimalAdded = false;

const keyClickHander = ({ target: { innerText: value } }) => {
  switch (value) {
    case ".":
      if (decimalAdded) return;
      decimalAdded = true;
      break;
    case "+":
    case "-":
    case "x":
    case "/":
      if (lastKeyIsOperator) {
        userInput.value = userInput.value.slice(0, -1) + value;
        return;
      }
      lastKeyIsOperator = true;
      decimalAdded = false;
      break;
    default:
      lastKeyIsOperator = false;
  }

  userInput.value += value;
  userInput.scrollLeft = userInput.scrollWidth;
};

const resetOrDeleteHandler = (isDelete) => {
  userInput.value = isDelete ? userInput.value.slice(0, -1) : "";
};

const expressionHandler = (expression) => {
  const formattedExpression = expression.replace(/x/g, "*");
  return eval(formattedExpression);
};

const answerHandler = () => {
  userInput.value = expressionHandler(userInput.value);
};

keys.forEach((key) => key.addEventListener("click", keyClickHander));
resetKey.addEventListener("click", () => resetOrDeleteHandler(false));
deleteKey.addEventListener("click", () => resetOrDeleteHandler(true));
answerKey.addEventListener("click", answerHandler);