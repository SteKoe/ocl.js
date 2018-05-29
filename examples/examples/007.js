import Person from "../class/person";
import Example from "../class/example";
import OclEngine from "../../dist/ocl.min";
import Car from "../class/car";

const title = 'A person should own a red, green and blue car, but does not own a blue one.';
const context = `
const person = new Person(29);
const redCar = new Car('red');
const greenCar = new Car('green');

person.fleet.push(redCar);
person.fleet.push(greenCar);
`;
const oclExpression = `
context Person
   inv hasRedCar: self.fleet->exists(c|c.color = "red")
   inv hasGreenCar: self.fleet->exists(c|c.color = "green")
   inv hasBlueCar: self.fleet->exists(c|c.color = "blue")
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

module.exports = Example.builder()
    .title(title)
    .context(context)
    .oclExpression(oclExpression)
    .expected(false)
    .fn(fn)
    .build();
