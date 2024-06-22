const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function printPattern(n) {
    const getNumbersAndLetters = (length) => {
        const elements = [];
        let num = 1;
        let charCode = 65; 

        for (let i = 1; i <= length; i++) {
            if (i <= Math.ceil(length / 2)) {
                elements.push(num);
                num += 2;
            } else {
                elements.push(String.fromCharCode(charCode));
                charCode++;
            }
        }

        return elements;
    };

    for (let i = 1; i <= n; i++) {
        const elements = getNumbersAndLetters(i * 2 - 1);
        const spaces = ' '.repeat((n - i) * 2); 
        console.log(spaces + elements.join(' '));
    }

    for (let i = n - 1; i >= 1; i--) {
        const elements = getNumbersAndLetters(i * 2 - 1);
        const spaces = ' '.repeat((n - i) * 2); 
        console.log(spaces + elements.join(' '));
    }
}

rl.question('Please enter your lucky number: ', (input) => {
    let n = parseInt(input, 10);

    if (!isNaN(n) && n > 0) {
        printPattern(n);
    } else {
        console.log("Please enter a valid positive number.");
    }

    rl.close();
});
