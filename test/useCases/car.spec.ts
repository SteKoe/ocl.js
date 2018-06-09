import {Car, Person} from "../fixture.factory";
import {expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue} from '../matcher'

describe('Example', () => {
    describe('Car', () => {
        const person = new Person(29);
        person.fleet = [];

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

            expectOclRuleValidatesToFalse(oclExpression, person);
        });

        it('The owner of a car is at least 18 years old.', () => {
            const oclExpression = `
            context Car inv: 
                self.owner.age >= 18
        `;

            expectOclRuleValidatesToTrue(oclExpression, redCar);
        });
    });
});

