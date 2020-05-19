function parseCount(x) {
    let result = Number.parseInt(x);
    if (isNaN(result)) {
        throw new Error('Невалидное значение');
    }
    return result;
}

function validateCount(x) {
    let result;
    try {
        result = parseCount(x);
        return result;
    } catch(e) {
        return e;
    }
}


class Triangle {
    constructor(a,b,c) {
        if (a + b < c || a + c < b || b + c < a) {
            throw new Error("Треугольник с такими сторонами не существует");
        }

        this.a = a;
        this.b = b;
        this.c = c;
    }

    getPerimeter() {
        return this.a + this.b + this.c;
    }

    getArea() {
        let p = this.getPerimeter() / 2;
        return Math.round(Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c))*1000)/1000;
    }
}

function getTriangle(a,b,c) {
    try {
        return new Triangle(a, b, c);
    } catch(e) {
        let err = "Ошибка! Неправильный треугольник";
        return { getPerimeter: () => err, getArea: () => err };
    }
}
