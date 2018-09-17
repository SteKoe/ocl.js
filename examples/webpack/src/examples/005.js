import OclEngine from "@stekoe/ocl.js";
import Person from "../class/person";
import Example from "../class/example";
import Car from "../class/car";
import oclExpression from "./005.ocl";

const title = 'A person owns at least one red car.';
const context = `
var person = new Person(29);
var car = new Car('red');

person.fleet.push(car);
person.fleet.push(car);
`;

const fn = function () {
    const person = new Person(29);
    const car = new Car('red');

    person.fleet.push(car);
    person.fleet.push(car);

    return new OclEngine()
        .addOclExpression(this.oclExpression)
        .evaluate(person);
};

export default Example.builder()
    .title(title)
    .context(context)
    .oclExpression(oclExpression)
    .expected(true)
    .fn(fn)
    .build();
