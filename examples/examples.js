import OclParser from '../lib/oclParser';

const hljs = require('../node_modules/highlight.js/lib/highlight');
var ocl = require('./hljs.ocl');
hljs.registerLanguage('ocl', ocl);
hljs.initHighlightingOnLoad();

class Example {
    constructor(id, title, ctx, oclExpression, expected, fn) {
        this.id = id;
        this.title = title;
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
        const elemTitle = elementById.getElementsByClassName('title')[0];
        elemTitle.onclick = () => this._toggleClass(elemTitle, 'visible');
        elemTitle.innerHTML = this.title.trim();
        elementById.getElementsByTagName('code')[0].innerText = this.ctx.trim();
        elementById.getElementsByTagName('code')[1].innerText = this.oclExpression.trim();
        const resultTag = elementById.getElementsByClassName('result')[0];
        if (resultTag) {
            let resultIsExpectedResult = this.fn.apply(this) === this.expected;
            resultTag.innerHTML = `The result of the above rule should ${result(this.expected)} and does ${result(this.fn.apply(this))}.`;
        }

        function result(boolean) {
            return `<strong>${boolean ? 'PASS' : 'NOT PASS'}</strong>`
        }
    }

    _toggleClass(elem, className) {
        var currentClassName = elem.className;
        if (currentClassName.indexOf(className) !== -1) {
            currentClassName = currentClassName.replace(className, '');
        } else {
            currentClassName += ` ${className}`;
        }
            
        elem.className = currentClassName;
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
let title;

// ======================================================================================
title = 'A vehicle owner has to be at least 18 years old.';
context = `
var person = new Person(29);
var car = new Car('red');
car.owner = person;
`;
oclExpression = [
    'context Car',
    '   inv: self.owner.age >= 18'
].join('\n');
new Example(1, title, context, oclExpression, true, function () {
    var person = new Person(29);
    var car = new Car('red');
    car.owner = person;

    var oclRule = new OclParser(this.oclExpression).parse();
    return oclRule.evaluate(car);
});

// ======================================================================================
title = 'The fleet size of a person must not exceed 3 cars.';
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
new Example(2, title, context, oclExpression, false, function () {
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
title = 'All cars a person owns are red.';
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
new Example(3, title, context, oclExpression, false, function () {
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
title = 'A person younger than 18 years old owns no cars.';
context = `var person = new Person(6);`;
oclExpression = [
    'context Person',
    '   inv: self.age < 18 implies self.fleet->isEmpty'
].join('\n');
new Example(4, title, context, oclExpression, true, function () {
    var person = new Person(6);

    var oclRule = new OclParser(this.oclExpression).parse();
    return oclRule.evaluate(person);
});

// ======================================================================================
title = 'A person owns at least one red car.';
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
new Example(5, title, context, oclExpression, true, function () {
    var person = new Person(29);
    var car = new Car('red');

    person.fleet.push(car);
    person.fleet.push(car);

    var oclRule = new OclParser(this.oclExpression).parse();
    return oclRule.evaluate(person);
});

// ======================================================================================
title = 'A person owns at least one red car. <small>Using let</small>';
context = `
var person = new Person(29);
var car = new Car('red');

person.fleet.push(car);
person.fleet.push(car);
`;
oclExpression = `
context Person
   def: let redCars: self.fleet->select(c|c.color="red")
   inv: self.redCars->size > 0
`;
new Example(6, title, context, oclExpression, true, function () {
    var person = new Person(29);
    var car = new Car('red');

    person.fleet.push(car);
    person.fleet.push(car);

    var oclRule = new OclParser(this.oclExpression).parse();
    return oclRule.evaluate(person);
});

