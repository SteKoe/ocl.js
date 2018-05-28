const {expect} = require('chai');

require('../../generator/oclParserGenerator');
import {OclParser} from "../../lib/components/parser/OclParser";
import Car from "../../examples/class/car";
import Person from "../../examples/class/person";

describe('Car', () => {
    const person = new Person(29);

    const redCar = new Car('red');
    redCar.owner = person;

    const greenCar = new Car('green');
    greenCar.owner = person;

    person.fleet.push(redCar);
    person.fleet.push(redCar);
    person.fleet.push(redCar);
    person.fleet.push(greenCar);

    it('All cars a person owns are red.', () => {
        const oclExpression = `
            context Person inv: 
                self.fleet->forAll(c|c.color = "red")
        `;

        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate(person)).to.be.false;
    });

    it('The owner of a car is at least 18 years old.', () => {
        const oclExpression = `
            context Car inv: 
                self.owner.age >= 18
        `;

        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate(redCar)).to.be.true;
    });
});

