import { expect } from 'chai';
import { OclEngine } from '../../lib';
import { Person } from '../fixture.factory';

describe('OclEngine', () => {
    const oclEngine = OclEngine.create();
    oclEngine.registerTypes({
        Person
    });

    it('should register types for oclIsTypeOf', () => {
        oclEngine.addOclExpression(`
            context Person inv: self->oclIsTypeOf(Person)
        `);

        const oclResult = oclEngine.evaluate(new Person());
        const result = oclResult.getResult();
        expect(result).to.be.true;
    });
});
