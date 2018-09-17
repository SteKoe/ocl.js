import OclEngine from "@stekoe/ocl.js";
import Person from "../class/person";
import Example from "../class/example";
import Car from "../class/car";
import oclExpression from "./003.ocl";

const title = 'All cars a person owns are red.';
const context = `
var person = new Person(29);
var redCar = new Car('red');
var greenCar = new Car('green');
person.fleet.push(redCar);
person.fleet.push(redCar);
person.fleet.push(redCar);
person.fleet.push(greenCar);
`;

const fn = function () {
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

export default Example.builder()
    .title(title)
    .context(context)
    .oclExpression(oclExpression)
    .expected(false)
    .fn(fn)
    .build();