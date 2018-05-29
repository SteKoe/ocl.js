// ======================================================================================
import Person from "../class/person";
import Example from "../class/example";
import OclEngine from "../../dist/ocl.min";
import Car from "../class/car";

const title = 'The fleet size of a person must not exceed 3 cars.';
const context = `
var person = new Person(29);
var car = new Car('red');

person.fleet.push(car);
person.fleet.push(car);
person.fleet.push(car);
person.fleet.push(car);
`;
const oclExpression = [
    'context Person',
    '   inv: self.fleet->size() <= 3'
].join('\n');

const fn = function () {
    const person = new Person(29);
    const car = new Car('red');

    person.fleet.push(car);
    person.fleet.push(car);
    person.fleet.push(car);
    person.fleet.push(car);

    return new OclEngine()
        .addOclExpression(this.oclExpression)
        .evaluate(person);
};

module.exports = Example.builder()
    .title(title)
    .context(context)
    .oclExpression(oclExpression)
    .expected(false)
    .fn(fn)
    .build();