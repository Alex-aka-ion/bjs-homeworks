function calculateTotalMortgage(percent, contribution, amount, date) {
    "use strict";

    if (typeof percent !== 'number') {
        return `Параметр percent содержит неправильное значение ${percent}`;
    }

    if (typeof contribution !== 'number') {
        return `Параметр contribution содержит неправильное значение ${contribution}`;
    }

    if (typeof amount !== 'number') {
        return `Параметр amount содержит неправильное значение ${amount}`;
    }

    if ( ! ( date instanceof Date )) {
        return `Параметр date содержит неправильное значение ${date}`;
    }

    let now = new Date();

    let n = ((date.getFullYear() - now.getFullYear()) * 12) - now.getMonth() + date.getMonth();

    let S = amount - contribution;

    let P = percent / 100 / 12;

    let payment = S * ( P + P / ( Math.pow( 1 + P , n ) - 1 ) );

    let totalAmount = payment * n;

    totalAmount = Math.round(totalAmount * 100) / 100;

    console.log(`Ввод: ${percent},${contribution},${amount},${n} Вывод: ${totalAmount}`);

    return totalAmount;
}

function getGreeting(name) {

    if (!name) {
        name = 'Аноним';
    }

    let greeting = `Привет, мир! Меня зовут ${name}`;

    console.log(greeting);

    return greeting;
}