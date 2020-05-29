class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.timerId = null;
    }

    addClock(time, callback, id) {
        if (!id) {
            throw new Error('Невозможно идентифицировать будильник. Параметр id не передан.');
        }
        if (this.alarmCollection.find((item) => item.id === id)) {
            console.error('Будильник с таким id уже существует');
            return false;
        }
        this.alarmCollection.push({
            id,
            time,
            callback
        });
        return true;
    }

    removeClock(id) {
        const oldLength = this.alarmCollection.length;
        this.alarmCollection = this.alarmCollection.filter((item) => item.id !== id);
        return oldLength !== this.alarmCollection.length;
    }

    getCurrentFormattedTime() {
        const date = new Date();
        return date.getHours().toString().padStart(2,'0') + ':' + date.getMinutes().toString().padStart(2,'0');
    }

    checkClock(alarm) {
        if (alarm.time === this.getCurrentFormattedTime() ) {
            alarm.callback();
        }
    }

    start() {
        if (this.timerId === null) {
            this.timerId = setInterval(() => this.alarmCollection.forEach((alarm) => this.checkClock(alarm)),1000);
        }
    }

    stop() {
        if (this.timerId !== null) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    printAlarms() {
        if (this.alarmCollection.length === 0) {
            console.log('Нет ни одного будильника!');
        } else {
            this.alarmCollection.forEach((alarm) => console.log(`Будильник №${alarm.id} заведен на ${alarm.time}`));
        }
    }

    clearAlarms() {
        this.stop();
        this.alarmCollection = [];
    }
}

function testCase() {
    console.log("start testcase");
    const phoneAlarm = new AlarmClock();

    phoneAlarm.addClock("21:08", () => console.log("Скоро спать"), 1);
    phoneAlarm.addClock("21:09", () => console.log("Иди спать, завтра рано на работу!"), 1);

    phoneAlarm.addClock("21:09", () => {console.log("Пора готовится ко сну!"); phoneAlarm.removeClock(2)}, 2);
    try {
        phoneAlarm.addClock("21:09", () => console.log("Иди умыватся!"));
    } catch(e) {
        console.log(e);
    }

    console.log(phoneAlarm.alarmCollection);

    phoneAlarm.addClock("21:10", () => {
        console.log("Иди спать, завтра рано на работу!");
        phoneAlarm.clearAlarms();
        phoneAlarm.printAlarms();
    }, 3);

    phoneAlarm.printAlarms();

    phoneAlarm.start();
}

testCase();