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
    return arr1.length === arr2.length && arr1.every((item, index) => arr2[index] === item);
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
        const item = memory.find((item) => compareArrays(item.args, arr));
        if (item !== undefined) {
            //console.log('Return from memory');
            return item.result;
        } else {
            //console.log('Count!');
            if (memory.length >= limit) {
                memory.shift();
            }
            const result = fn(...args);
            memory.push({
                args: arr,
                result: result
            });
            return result;
        }

    }
}

function memorizeByMap(fn, limit) {
    let memory = new Map();

    return (...args) => {
        //console.log(memory);
        const key = JSON.stringify(args);
        if (memory.has(key)) {
            //console.log('Return from memory');
            return memory.get(key);
        } else {
            //console.log('Count!');
            const mapKeys = Array.from(memory.keys());
            if (mapKeys.length >= limit) {
                memory.delete(mapKeys[0]);
            }
            const result = fn(...args);
            memory.set(key, result);
            return result;
        }
    }
}

const mSum = memorize(sum, 5); // 5 результатов может хранится в памяти

const mSumByMap = memorizeByMap(sum, 5);

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

console.log(mSumByMap(3, 4)); // 7
console.log(mSumByMap(3, 4)); // 7
console.log(mSumByMap(8, 9, 5, 4)); // 26

const testArr = [ [1,2,3,1,2,3,1,2,3,1,2,3], [1,2], [1,2,3], [1,2], [9,5,2,4,9,5,2,4,9,5,2,4,9,5,2,4,9,5,2,4], [1,2,3,1,2,3,1,2,3], [1,2], ];

function testCase(testFunction, timerName) {
    console.time(timerName);

    for(let i = 0; i < 1000000; i++) {
        testArr.forEach((item) => testFunction(...item));
    }

    console.timeEnd(timerName);
}

testCase(sum,'normal sum');
testCase(mSum,'memorized sum');
testCase(mSumByMap,'memorizedByMap sum');

//Оптимизации не получилось
//normal sum: 353.73779296875ms
//memorized sum: 1272.026123046875ms
//memorizedByMap sum: 5886.9658203125ms
//видимо сравнение массивов работает медленнее чем посчитать их сумму сразу