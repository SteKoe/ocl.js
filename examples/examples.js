import OclParser from '../lib/oclParser';

class Example {
    constructor(id, expected, fn) {
        this.id = id;
        this.expected = expected;
        this.fn = fn;

        this.run();
    }

    expect(expected) {
        this.expected = expected;
        return this;
    }

    run() {
        const elementById = document.getElementById(`example${this.id}`);
        const resultTag = elementById.getElementsByClassName('result')[0];
        if (resultTag) {
            resultTag.innerText = this.fn() ? 'valid' : 'invalid';
            resultTag.innerText += ` expected ${this.expected ? 'valid' : 'invalid'}!`
        }
    }
}

// ======================================
class Person {
    constructor(age) {
        this.typeName = 'Person';
        this.age = age;
        this.fleet = [];
    }
}

class Car {
    constructor(color) {
        this.typeName = 'Car';
        this.color = color;
    }
}

new Example(1, true, () => {
    var person = new Person(29);
    var car = new Car('red');
    car.owner = person;

    var oclExpression = [
        'context Car',
        '   inv: self.owner.age >= 18'
    ].join('\n');

    var oclRule = new OclParser(oclExpression).parse();
    return oclRule.evaluate(car);
});

new Example(2, false, () => {
    var person = new Person(29);
    var ferrari = new Car('red');
    ferrari.owner = person;
    var opel = new Car('silver');
    opel.owner = person;

    person.fleet.push(ferrari);
    person.fleet.push(opel);
    person.fleet.push(ferrari);
    person.fleet.push(opel);

    var oclExpression = [
        'context Peson',
        '   inv: self.fleet->size <= 3'
    ].join('\n');

    var oclRule = new OclParser(oclExpression).parse();
    return oclRule.evaluate(person);
});
