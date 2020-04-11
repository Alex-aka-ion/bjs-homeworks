function getAnimalSound(animal) {
    return animal === undefined ? null : animal.sound;
}

function getAverageMark(marks) {
    let averageMark = marks.length === 0 ? 0 : marks.reduce((a,b) => a + b) / marks.length;
    averageMark = Math.round(averageMark);

    return averageMark;
}

function checkBirthday(birthday) {
    console.log(birthday);

    let birthYearPlus18 = birthday.getFullYear() + 18;

    birthday.setFullYear(birthYearPlus18);

    let now = new Date();

    return birthday <= now;
}

console.log(checkBirthday(new Date(2002, 0, 1)));
console.log(checkBirthday(new Date(2003, 0, 1)));