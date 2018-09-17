import {expect} from 'chai';
import {Person} from '../fixture.factory';
import {OclEngine} from '../../lib';

describe('post', () => {
    let oclEngine;

    beforeEach(() => {
        oclEngine = OclEngine.create();
        oclEngine.registerTypes({
            Person
        });
    });

    it('should throw an error, when a postcondition fails', () => {
        oclEngine.addOclExpression(`
            context Person::setDead()
                post: self.isAlive = false
        `);

        const person = new Person(42);
        person.setDead();
    });

    it('should throw an error, when a postcondition fails checkin the result of a function', () => {
        oclEngine.addOclExpression(`
            context Person::getAge()
                post: result = 52
        `);

        const person = new Person(52);
        person.getAge();

        person.setAge(42);
        expect(() => person.getAge()).to.throw('A postcondition failed on type Person');
    });
});
