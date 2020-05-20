function sleep(milliseconds)
{
    let e = new Date().getTime() + milliseconds;
    while (new Date().getTime() <= e) {}
}

function sum(...args) {
    // Замедление на половину секунды.
    //sleep(500); // Можно использовать другое значение замедления.
    return args.reduce((sum, arg) => {
        return sum += +arg;
    }, 0);
}

function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    return arr1.every((item, index) => arr2[index] === item);
}

console.log(compareArrays([8, 9], [6])); // false, разные значения
console.log(compareArrays([8, 9, 5, 4], [8, 9, 5, 4, 8, 3, 5])); // false, разные значения
console.log(compareArrays([9, 2, 4, 8, 2], [9, 2, 4])); // false, разные значения
console.log(compareArrays([1, 2, 3], [2, 3, 1])); // false, разные индексы, хотя и одинаковые значения
console.log(compareArrays([8, 1, 2], [8, 1, 2])); // true

function memorize(fn, limit) {
    let memory = [];

    return (...args) => {
        //console.log(memory);
        const arr = Array.from(args);
        const index = memory.findIndex((item) => compareArrays(item.args, arr));
        if (index !== -1) {
            //console.log('Return from memory');
            return memory[index].result;
        } else {
            //console.log('Count!');
            if (memory.length >= limit) {
                memory.shift();
            }
            memory.push({
                args: arr,
                result: fn(...args)
            });
            return fn(...args);
        }

    }
}

const mSum = memorize(sum, 5); // 5 результатов может хранится в памяти

// Вызов этих функций даёт один и тот же результат
console.log(sum(3, 4)); // 7
/*
  разница только в том, что mSum запоминает результат (7)
  и повторно не делает вычисления
 */
console.log(mSum(3, 4)); // 7
console.log(mSum(8, 9, 5, 4)); // 26
console.log(mSum(9, 2, 4)); // 15
console.log(mSum(1, 2, 3)); // 6
console.log(mSum(1, 2, 3)); // 6
console.log(mSum(3)); // 3
console.log(mSum(3)); // 5
console.log(mSum(5)); // 5

const testArr = [ [1,2,3], [1,2], [1,2,3], [1,2], [9,5,2,4] ];

function testCase(testFunction, timerName) {
    console.time(timerName);

    for(let i = 0; i < 1000000; i++) {
        testArr.forEach((item) => testFunction(...item));
    }

    console.timeEnd(timerName);
}

testCase(sum,'normal sum');
testCase(mSum,'memorized sum');

//Оптимизации не получилось
//normal sum: 193.90625ms
//memorized sum: 700.2841796875ms
//видимо сравнение массивов работает медленнее чем посчитать их сумму сразу