function getResult(a, b, c) {
    "use strict";

    let result = [];

    let D = Math.pow(b, 2) - 4 * a * c;

    if (D > 0) {
        result = [(-1 * b + Math.sqrt(D)) / (2 * a), (-1 * b - Math.sqrt(D)) / (2 * a)];
    } else if (D === 0) {
        result = [-1 * b / (2 * a)];
    }

    return result;
}

function getAverageMark(marks) {
    let averageMark;

    if (marks.length === 0) {
        averageMark = 0;
    } else {
        if (marks.length > 5) {
            console.log('Оценок в массиве > 5');
            marks = marks.slice(0, 5);
        }
        averageMark = marks.reduce((a, c) => a + c) / marks.length;
    }

    return averageMark;
}

function askDrink(name, dateOfBirthday) {

    let year = dateOfBirthday.getFullYear();
    let nowyear = new Date().getFullYear();
    let result;

    if (nowyear - year >= 18) {
        result = `Не желаете ли олд-фэшн, ${name}?`;
    } else {
        result = `Сожалею, ${name}, но я не могу вам продать алкоголь. Зато могу предложить вам замечательный клюквенный компот!`;
    }

    return result;
}