
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b !== 0 ? a / b : 'Error';
const mod = (a, b) => b !== 0 ? a % b : 'Error';

const operate = (op, a, b) => {
    switch (op) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

let currentInput = '';
let previousInput = '';
let operator = null;
const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');

buttons.forEach(button => {
    const btnValue = button.textContent;
    button.addEventListener('click', () => {
        switch (btnValue) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
                handleOperator(btnValue);
                break;
            case '=':
                handleEquals();
                break;
            case 'C':
                clearAll();
                break;
            case 'DEL':
                handleDelete();
                break;
            case '+/-':
                handleToggleSign();
                break;
            default:
                if (!isNaN(btnValue) || btnValue === '.') {
                    handleNumber(btnValue);
                }
                break;
        }
    })
})

function handleNumber(value) {
    if (value === '.' && currentInput.includes('.')) return;
    currentInput += value;
    updateDisplay();
}

function handleOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') handleEquals();
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function handleEquals() {
    if (previousInput === '' || currentInput === '' || operator === null) return;

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result;

    switch (operator) {
        case '+':
            result = add(num1, num2)
            break;
        case '-':
            result = subtract(num1, num2)
            break;
        case '/':
            result = divide(num1, num2)
            break;
        case '*':
            result = multiply(num1, num2)
            break;
        case '%':
            result = mod(num1, num2)
            break;
        default:
            result = num2;
            break;
    }

    currentInput = result.toString();
    previousInput = '';
    operator = null;
    updateDisplay();
}

function handleDelete() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function handleToggleSign() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay();
    }
}

function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay();
}

function updateDisplay() {
    display.textContent = currentInput || '0';
}