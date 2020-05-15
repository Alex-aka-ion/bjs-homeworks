class Weapon {
    constructor(weapon) {
        this.name = weapon.name;
        this.attack = weapon.attack;
        this.durability = weapon.durability;
        this._durability = weapon.durability;
        this.range = weapon.range;
    }

    takeDamage(damage) {
        this.durability = (this.durability > damage) ? this.durability - damage : 0;
    }

    getDamage() {
        if (this.durability === 0) {
            return 0;
        }
        if (this.durability === Infinity) {
            return this.attack;
        }
        return (this.durability / this._durability * 100 >= 30) ? this.attack : this.attack / 2;
    }

    isBroken() {
        return (this.durability === 0);
    }
}

const sword = new Weapon({
    name: 'Старый меч',
    attack: 20,
    durability: 10,
    range: 1,
});

console.log(sword);
sword.takeDamage(5);
console.log(sword.durability); // 5

sword.takeDamage(50);
console.log(sword.durability); // 0

const arm = new Weapon({
    name: 'Рука',
    attack: 1,
    durability: Infinity,
    range: 1,
});

console.log(arm);
arm.takeDamage(20);
console.log(arm.durability); // Infinity

const bow = new Weapon({
    name: 'Лук',
    attack: 10,
    durability: 200,
    range: 3,
});

console.log(bow);
bow.takeDamage(20);
console.log(bow.durability); // 180

bow.takeDamage(200);
console.log(bow.durability); // 0

console.log(bow.durability); // 0
console.log(bow.getDamage()); // 0

console.log(arm.durability); // Infinity
console.log(arm.getDamage()); // 1

console.log(bow.durability); // 0
console.log(bow.isBroken()); // true

console.log(arm.durability); // Infinity
console.log(arm.isBroken()); // false

const knife = new Weapon({
    name: 'Нож',
    attack: 5,
    durability: 300,
    range: 1,
});

const staff = new Weapon({
    name: 'Посох',
    attack: 8,
    durability: 300,
    range: 2,
});

const longBow = new Weapon({
    name: 'Длинный лук',
    attack: 15,
    durability: bow.durability,
    range: 4,
});

const axe = new Weapon({
    name: 'Секира',
    attack: 27,
    durability: 800,
    range: sword.range,
});

const staffOfStorm = new Weapon({
    name: 'Посох Бури',
    attack: 10,
    durability: staff.durability,
    range: 3,
});

// ---------------------------------------------------------------
// Задача 2

class Bow extends Weapon {
    constructor(weapon) {
        const defaultParams = {
            name: 'Лук',
            attack: 10,
            durability: 200,
            range: 3,
        };

        weapon = Object.assign(defaultParams, weapon);

        super(weapon);
    }
}

const bow2 = new Bow();
console.log(bow2);

class Sword extends Weapon {
    constructor(weapon) {
        const defaultParams = {
            name: 'Меч',
            attack: 25,
            durability: 500,
            range: 1,
        };

        weapon = Object.assign(defaultParams, weapon);

        super(weapon);
    }
}

const sword2 = new Sword();
console.log(sword2);

class Arm extends Weapon {
    constructor(weapon) {
        const defaultParams = {
            name: 'Рука',
            attack: 1,
            durability: Infinity,
            range: 1,
        };

        weapon = Object.assign(defaultParams, weapon);

        super(weapon);
    }
}

const arm2 = new Arm();
console.log(arm2);

class Knife extends Weapon {
    constructor(weapon) {
        const defaultParams = {
            name: 'Нож',
            attack: 5,
            durability: 300,
            range: 1,
        };

        weapon = Object.assign(defaultParams, weapon);

        super(weapon);
    }
}

const knife2 = new Knife();
console.log(knife2);

class Staff extends Weapon {
    constructor(weapon) {
        const defaultParams = {
            name: 'Посох',
            attack: 8,
            durability: 300,
            range: 2,
        };

        weapon = Object.assign(defaultParams, weapon);

        super(weapon);
    }
}

const staff2 = new Staff();
console.log(staff2);

class LongBow extends Bow {
    constructor(weapon) {
        const defaultParams = {
            name: 'Длинный лук',
            attack: 15,
            range: 4,
        };

        weapon = Object.assign(defaultParams, weapon);

        super(weapon);
    }
}

const longBow2 = new LongBow();
console.log(longBow2);

class Axe extends Sword {
    constructor(weapon) {
        const defaultParams = {
            name: 'Секира',
            attack: 27,
            durability: 800,
        };

        weapon = Object.assign(defaultParams, weapon);

        super(weapon);
    }
}

const axe2 = new Axe();
console.log(axe2);

class StormStaff extends Staff {
    constructor(weapon) {
        const defaultParams = {
            name: 'Посох Бури',
            attack: 10,
            range: 3,
        };

        weapon = Object.assign(defaultParams, weapon);

        super(weapon);
    }
}

const staffOfStorm2 = new StormStaff();
console.log(staffOfStorm2);

// ---------------------------------------------------------------
// Задача 3

class StudentLog {
    constructor(name) {
        this.name = name;
        this.subjects = {};
    }

    getName() {
        return this.name;
    }

    addGrade(grade, subject) {
        if (Number.isInteger(grade) && grade >= 1 && grade <= 5) {
            if (!Array.isArray(this.subjects[subject])) {
                this.subjects[subject] = [];
            }
            this.subjects[subject].push(grade);
            return this.subjects[subject].length;
        } else {
            console.log(`Вы пытались поставить оценку "${grade}" по предмету "${subject}". Допускаются только числа от 1 до 5.`);
            return (this.subjects[subject] === undefined) ? 0 : this.subjects[subject].length;
        }
    }

    getAverageMark(marks) {
        return marks.length === 0 ? 0 : (marks.reduce((a, b) => a + b, 0)) / marks.length;
    }

    getAverageBySubject(subject) {
        return (Array.isArray(this.subjects[subject])) ? this.getAverageMark(this.subjects[subject]) : 0;
    }

    getTotalAverage() {
        if (Object.keys(this.subjects).length === 0) {
            return 0;
        }

        let sum = 0;
        for (let subject in this.subjects) {
            sum += this.getAverageBySubject(subject);
        }
        return sum / Object.keys(this.subjects).length;
    }
}

const log = new StudentLog('Олег Никифоров');
console.log(log);

console.log(log.addGrade(3, 'algebra'));
// 1

console.log(log.addGrade('отлично!', 'math'));
// Вы пытались поставить оценку "отлично!" по предмету "math". Допускаются только числа от 1 до 5.
// 0

console.log(log.addGrade(4, 'algebra'));
// 1

console.log(log.addGrade(5, 'geometry'));
// 1

console.log(log.addGrade(25, 'geometry'));
// Вы пытались поставить оценку "25" по предмету "geometry". Допускаются только числа от 1 до 5.
// 1

const log2 = new StudentLog('Олег Никифоров2');

log2.addGrade(2, 'algebra');
log2.addGrade(4, 'algebra');
log2.addGrade(5, 'geometry');
log2.addGrade(4, 'geometry');

console.log(log2.getAverageBySubject('geometry')); // 4.5
console.log(log2.getAverageBySubject('algebra')); // 3
console.log(log2.getAverageBySubject('math')); // 0

const log3 = new StudentLog('Олег Никифоров3');

log3.addGrade(2, 'algebra');
log3.addGrade(4, 'algebra');
log3.addGrade(5, 'geometry');
log3.addGrade(4, 'geometry');

console.log(log3.getTotalAverage()); // 3,75