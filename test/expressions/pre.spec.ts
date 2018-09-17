import {expect} from 'chai';
import {Person} from '../fixture.factory';
import {OclEngine} from '../../lib';

describe('pre', () => {
    let oclEngine;

    beforeEach(() => {
        oclEngine = OclEngine.create();
        oclEngine.registerTypes({
            Person
        });
    });

    it('should throw an error, when a preconditions fails', () => {
        oclEngine.addOclExpression(`
            context Person::setDead()
                pre: self.isAlive = true and self.age = 42
        `);

        const person = new Person(42);
        person.setDead();
        expect(() => person.setDead()).to.throw('A precondition failed on type Person');
    });

    it('should throw an error, when a precondition fails using parameters', () => {
        oclEngine.addOclExpression(`
            context Person::setAge(age: number)
                pre: age > 0
        `);

        const person = new Person(42);
        person.setAge(22);
        expect(() => person.setAge(-12)).to.throw('A precondition failed on type Person');
    });
});
