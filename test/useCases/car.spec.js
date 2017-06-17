const should = require('should');

require('../../generator/oclParserGenerator');
import {OclParser} from '../../src/components/parser/oclParser';
import Car from "../../examples/class/car";
import Person from "../../examples/class/person";
import {MetaAssociationLink, MetaEntity} from '../fixture.factory';

describe.only('Car', () => {
    it('All cars a person owns are red.', () => {
        const oclExpression = `
            context Person inv: 
                self.fleet->forAll(c|c.color = "red")
        `;
        const oclRule = OclParser.parse(oclExpression);


        const person = new Person(29);
        const redCar = new Car('red');
        const greenCar = new Car('green');

        person.fleet.push(redCar);
        person.fleet.push(redCar);
        person.fleet.push(redCar);
        person.fleet.push(greenCar);

        oclRule.evaluate(person).should.be.false();
    });
});

