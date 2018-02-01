import Person from "../class/person";
import Example from "../class/example";
import OclEngine from "../../lib";
import Car from "../class/car";

const title = 'A car owner should be at least 18 years old!';
const context = `
const person = new Person(29);

const car = new Car('red');
car.owner = person;

person.fleet.push(car);
`;
const oclExpression = `
context Car
    inv: self.owner.age >= 18
`;

const fn = function () {
    const person = new Person(29);

    const car = new Car('red');
    car.owner = person;

    return new OclEngine()
        .addOclExpression(this.oclExpression)
        .evaluate(car);
};

module.exports = Example.builder()
    .title(title)
    .context(context)
    .oclExpression(oclExpression)
    .expected(true)
    .fn(fn)
    .build();
