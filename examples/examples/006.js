import Person from "../class/person";
import Example from "../class/example";
import OclEngine from "../../dist/ocl.min";
import Car from "../class/car";

const title = 'A person owns at least one red car. <small>Using let</small>';
const context = `
var person = new Person(29);
var car = new Car('red');

person.fleet.push(car);
person.fleet.push(car);
`;
const oclExpression = `
context Person
   def: redCars = self.fleet->select(c|c.color="red")
   inv: self.redCars->size > 0
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

module.exports = Example.builder()
    .title(title)
    .context(context)
    .oclExpression(oclExpression)
    .expected(true)
    .fn(fn)
    .build();
