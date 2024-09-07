document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelector('.buttons');

    buttons.addEventListener('click', (e) => {
        if (e.target.matches('button')) {
            const key = e.target;
            const action = key.classList[0];
            const keyContent = key.textContent;

            if (action === 'number') {
                appendToDisplay(keyContent);
            }
            if (action === 'operator') {
                appendToDisplay(keyContent);
            }
            if (action === 'decimal') {
                appendToDisplay(keyContent);
            }
            if (action === 'clear') {
                clearDisplay();
            }
            if (action === 'equals') {
                calculate();
            }
        }
    });

    function appendToDisplay(value) {
        if (display.textContent === '0') {
            display.textContent = value;
        } else {
            display.textContent += value;
        }
    }

    function clearDisplay() {
        display.textContent = '0';
    }

    function calculate() {
        try {
            const expression = display.textContent;
            const result = evaluateExpression(expression);
            display.textContent = result;
        } catch (error) {
            display.textContent = 'Error';
        }
    }

    function evaluateExpression(expression) {
        const tokens = expression.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
        let result = parseFloat(tokens[0]);
        
        for (let i = 1; i < tokens.length; i += 2) {
            const operator = tokens[i];
            const operand = parseFloat(tokens[i + 1]);
            
            switch (operator) {
                case '+':
                    result += operand;
                    break;
                case '-':
                    result -= operand;
                    break;
                case '*':
                    result *= operand;
                    break;
                case '/':
                    if (operand === 0) throw new Error('Division by zero');
                    result /= operand;
                    break;
            }
        }
        
        return result;
    }
});