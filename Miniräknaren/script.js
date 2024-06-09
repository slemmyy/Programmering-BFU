document.addEventListener('DOMContentLoaded', function () {
    const resultDisplay = document.getElementById('result');
    const inputDisplay = document.getElementById('input');
    let currentInput = '';
    let expression = '';

    // Hantera sifferknappar
    document.querySelectorAll('.digit').forEach(button => {
        button.addEventListener('click', function () {
            currentInput += button.innerText;
            expression += button.innerText;
            inputDisplay.innerText = expression; // Visa hela inmatningen
        });
    });

    // Hantera operator- och specialknappar (utan decimalpunkt)
    document.querySelectorAll('.op:not(.bdec)').forEach(button => {
        button.addEventListener('click', function () {
            if (button.classList.contains('bclear')) {
                // Rensa allt
                currentInput = '';
                expression = '';
                inputDisplay.innerText = '0';
                resultDisplay.innerText = '0';
            } else if (button.classList.contains('beq')) {
                // Beräkna resultatet
                try {
                    let result = eval(expression);
                    resultDisplay.innerText = result;
                    expression = result.toString();
                    currentInput = '';
                } catch (e) {
                    resultDisplay.innerText = 'Error';
                }
            } else {
                // Hantera andra operatorer
                if (currentInput === '') return;
                let operator = button.innerText;
                expression += ' ' + operator + ' ';
                inputDisplay.innerText = expression; // Visa operatorn
                currentInput = '';
            }
        });
    });

    // Hantera decimalpunkt
    document.querySelector('.bdec').addEventListener('click', function () {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            expression += '.';
            inputDisplay.innerText = expression;
        }
    });
});