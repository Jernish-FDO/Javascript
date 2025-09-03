const display = document.getElementById('display');
const history = document.getElementById('history');
const buttons = document.querySelectorAll('.btn');
let current = '0';
let prev = '';
let operator = '';
let historyText = '';
let gtTotal = 0;

function updateDisplay() {
  display.textContent = current;
  history.textContent = historyText;
}

function clearAll() {
  current = '0';
  prev = '';
  operator = '';
  historyText = '';
  updateDisplay();
}

function inputNum(num) {
  if (current.length > 12) return;
  if (current === '0' && num !== '.') {
    current = num;
  } else if (num === '.' && current.includes('.')) {
    return;
  } else {
    current += num;
  }
  updateDisplay();
}

function setOperator(op) {
  if (operator && prev) {
    calculate();
  }
  operator = op;
  prev = current;
  current = '0';
}

function calculate() {
  let a = parseFloat(prev);
  let b = parseFloat(current);
  let result = 0;
  if (operator === '+') result = a + b;
  else if (operator === '−') result = a - b;
  else if (operator === '×') result = a * b;
  else if (operator === '÷') result = b !== 0 ? a / b : 'Error';
  else if (operator === '%') result = a % b;
  result = (typeof result === 'number' && !isNaN(result)) ? +result.toFixed(8) : result;
  historyText = `${prev} ${operator} ${current} = ${result}`;
  current = result.toString();
  prev = '';
  operator = '';
  updateDisplay();
}

function handleGT() {
  if (!isNaN(parseFloat(current))) {
    gtTotal += parseFloat(current);
    historyText = `GT: ${gtTotal}`;
    updateDisplay();
  }
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.num !== undefined) {
      inputNum(btn.dataset.num);
    } else if (btn.dataset.action) {
      switch (btn.dataset.action) {
        case 'clear': clearAll(); break;
        case 'plus': setOperator('+'); break;
        case 'minus': setOperator('−'); break;
        case 'multiply': setOperator('×'); break;
        case 'divide': setOperator('÷'); break;
        case 'percent': setOperator('%'); break;
        case 'equal': calculate(); break;
        case 'gt': handleGT(); break;
      }
    }
  });
});

updateDisplay();