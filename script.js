let displayValue = '0';

function updateDisplay() {
    document.querySelector('.display').innerText = displayValue;
}

function appendToDisplay(value) {
    if (displayValue === '0' && value !== '.') {
        displayValue = value;
    } else {
        displayValue += value;
    }
    updateDisplay();
}

function clearDisplay() {
    displayValue = '0';
    updateDisplay();
}

function calculate() {
    try {
        displayValue = calculateExpression(displayValue).toString();
        updateDisplay();
    } catch (error) {
        displayValue = 'Error';
        updateDisplay();
    }
}

function calculateExpression(expression) {
    const tokens = expression.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
    if (!tokens) throw new Error('Invalid expression');

    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b
    };

    let result = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const operand = parseFloat(tokens[i + 1]);
        if (isNaN(operand)) throw new Error('Invalid operand');
        result = operators[operator](result, operand);
    }

    return result;
}