import OclParser from '../lib/oclParser';

class Example {
    constructor(id, ctx, oclExpression, expected, fn) {
        this.id = id;
        this.ctx = ctx;
        this.oclExpression = oclExpression;
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
        elementById.getElementsByTagName('code')[0].innerText = this.ctx.trim();
        elementById.getElementsByTagName('code')[1].innerText = this.oclExpression;
        const resultTag = elementById.getElementsByClassName('result')[0];
        if (resultTag) {
            resultTag.innerText = this.fn.apply(this) ? 'valid' : 'invalid';
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

let oclExpression;
let context;
// ======================================================================================
context = `
var person = new Person(29);
var car = new Car('red');
car.owner = person;
`;
oclExpression = [
    'context Car',
    '   inv: self.owner.age >= 18'
].join('\n');
new Example(1, context, oclExpression, true,  function() {
    var person = new Person(29);
    var car = new Car('red');
    car.owner = person;

    var oclRule = new OclParser(this.oclExpression).parse();
    return oclRule.evaluate(car);
});

// ======================================================================================
context = `
var person = new Person(29);
var car = new Car('red');

person.fleet.push(car);
person.fleet.push(car);
person.fleet.push(car);
person.fleet.push(car);
`;
oclExpression = [
    'context Person',
    '   inv: self.fleet->size() <= 3'
].join('\n');
new Example(2, context, oclExpression, false,  function() {
    var person = new Person(29);
    var car = new Car('red');

    person.fleet.push(car);
    person.fleet.push(car);
    person.fleet.push(car);
    person.fleet.push(car);

    var oclRule = new OclParser(this.oclExpression).parse();
    return oclRule.evaluate(person);
});

// ======================================================================================
context = `
var person = new Person(29);
var redCar = new Car('red');
var greenCar = new Car('green');
person.fleet.push(redCar);
person.fleet.push(redCar);
person.fleet.push(redCar);
person.fleet.push(greenCar);
`;
oclExpression = [
    'context Person',
    '   inv: self.cars->forAll(c|c.color = "red")'
].join('\n');
new Example(3, context, oclExpression, false, function() {
    var person = new Person(29);
    var redCar = new Car('red');
    var greenCar = new Car('green');
    person.fleet.push(redCar);
    person.fleet.push(redCar);
    person.fleet.push(redCar);
    person.fleet.push(greenCar);

    var oclRule = new OclParser(this.oclExpression).parse();
    return oclRule.evaluate(person);
});

// ======================================================================================
context = `var person = new Person(6);`;
oclExpression = [
    'context Person',
    '   inv: self.age < 18 implies self.fleet->isEmpty'
].join('\n');
new Example(4, context, oclExpression, true,  function() {
    var person = new Person(6);

    var oclRule = new OclParser(this.oclExpression).parse();
    return oclRule.evaluate(person);
});

// ======================================================================================
context = `
var person = new Person(29);
var car = new Car('red');

person.fleet.push(car);
person.fleet.push(car);
`;
oclExpression = [
    'context Person',
    '   inv: self.fleet->select(c|c.color="red")->size > 0'
].join('\n');
new Example(5, context, oclExpression, true,  function() {
    var person = new Person(29);
    var car = new Car('red');

    person.fleet.push(car);
    person.fleet.push(car);

    var oclRule = new OclParser(this.oclExpression).parse();
    return oclRule.evaluate(person);
});