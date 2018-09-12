import OclEngine from "@stekoe/ocl.js";
import Person from "../class/person";
import Example from "../class/example";
import Car from "../class/car";
import oclExpression from "./007.ocl";

const title = 'A person should own a red, green and blue car, but does not own a blue one.';
const context = `
const person = new Person(29);
const redCar = new Car('red');
const greenCar = new Car('green');

person.fleet.push(redCar);
person.fleet.push(greenCar);
`;

const fn = function () {
    const person = new Person(29);
    const redCar = new Car('red');
    const greenCar = new Car('green');

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
