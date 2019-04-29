import { OclEngine } from "@stekoe/ocl.js";
import Person from "../class/person";
import Example from "../class/example";
import Car from "../class/car";
import oclExpression from "./001.ocl";

const title = 'A vehicle owner has to be at least 18 years old.';
const context = `
var person = new Person(29);
var car = new Car('red');
car.owner = person;

1 >= 2
`;

const fn = function () {
    const person = new Person(29);
    const car = new Car('red');
    car.owner = person;

    return new OclEngine()
        .addOclExpression(this.oclExpression)
        .evaluate(car);
};

export default Example.builder()
    .title(title)
    .context(context)
    .oclExpression(oclExpression)
    .expected(true)
    .fn(fn)
    .build();
