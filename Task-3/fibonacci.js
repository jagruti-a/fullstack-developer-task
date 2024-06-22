function fibonacciSeriesLessThan(n) {
    let result = '';
    let a = 0, b = 1;

    while (a < n) {
        result += a + ', ';
        [a, b] = [b, a + b];
    }

    result = result.slice(0, -2);
    console.log(result);
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Enter a number: ', (inputNumber) => {
    const number = parseInt(inputNumber);

    if (isNaN(number) || number <= 0) {
        console.log("Please enter a positive integer.");
    } else {
        console.log(`Fibonacci series up to ${number}:`);
        fibonacciSeriesLessThan(number);
    }

    readline.close();
});


