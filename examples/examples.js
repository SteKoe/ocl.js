import OclEngine from '../src/index';
import Example from "./class/example";
import Person from "./class/person";
import Car from "./class/car";

const hljs = require('../node_modules/highlight.js/lib/highlight');
const ocl = require('./hljs.ocl');
hljs.registerLanguage('ocl', ocl);
hljs.initHighlightingOnLoad();

// ======================================
let oclExpression;
let context;
let title;
let fn;

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

fn = function () {
    const person = new Person(29);
    const car = new Car('red');
    car.owner = person;

    return new OclEngine()
        .addOclExpression(this.oclExpression)
        .evaluate(car);
};

Example.builder()
    .id(1)
    .title(title)
    .context(context)
    .oclExpression(oclExpression)
    .expected(true)
    .fn(fn)
    .build();

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

fn = function () {
    var person = new Person(29);
    var car = new Car('red');

    person.fleet.push(car);
    person.fleet.push(car);
    person.fleet.push(car);
    person.fleet.push(car);

    return new OclEngine()
        .addOclExpression(this.oclExpression)
        .evaluate(person);
};

Example.builder()
    .id(2)
    .title(title)
    .context(context)
    .oclExpression(oclExpression)
    .expected(false)
    .fn(fn)
    .build();

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
    '   inv: self.fleet->forAll(c|c.color = "red")'
].join('\n');

fn = function () {
    const person = new Person(29);
    const redCar = new Car('red');
    const greenCar = new Car('green');

    person.fleet.push(redCar);
    person.fleet.push(redCar);
    person.fleet.push(redCar);
    person.fleet.push(greenCar);

    return new OclEngine()
        .addOclExpression(this.oclExpression)
        .evaluate(person);
};

Example.builder()
    .id(3)
    .title(title)
    .context(context)
    .oclExpression(oclExpression)
    .expected(false)
    .fn(fn)
    .build();

// ======================================================================================
title = 'A person younger than 18 years old owns no cars.';
context = `var person = new Person(6);`;
oclExpression = [
    'context Person',
    '   inv: self.age < 18 implies self.fleet->isEmpty'
].join('\n');

fn = function () {
    const person = new Person(6);

    return new OclEngine()
        .addOclExpression(this.oclExpression)
        .evaluate(person);
};

Example.builder()
    .id(4)
    .title(title)
    .context(context)
    .oclExpression(oclExpression)
    .expected(true)
    .fn(fn)
    .build();

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

fn = function () {
    const person = new Person(29);
    const car = new Car('red');

    person.fleet.push(car);
    person.fleet.push(car);

    return new OclEngine()
        .addOclExpression(this.oclExpression)
        .evaluate(person);
};

Example.builder()
    .id(5)
    .title(title)
    .context(context)
    .oclExpression(oclExpression)
    .expected(true)
    .fn(fn)
    .build();

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

fn = function () {
    const person = new Person(29);
    const car = new Car('red');

    person.fleet.push(car);
    person.fleet.push(car);

    return new OclEngine()
        .addOclExpression(this.oclExpression)
        .evaluate(person);
};

Example.builder()
    .id(6)
    .title(title)
    .context(context)
    .oclExpression(oclExpression)
    .expected(true)
    .fn(fn)
    .build();
