import { expect } from 'chai';
import { OclEngine } from "../../lib/components/OclEngine";
import { Person } from '../fixture.factory'

describe('OclEngine', function () {
    let oclEngine = OclEngine.create();
    oclEngine.registeredTypes = {
        "Person": Person
    };

    it('should register types for oclIsTypeOf', function () {
        oclEngine.addOclExpression(`
            context Person inv: self->oclIsTypeOf(Person)
        `);

        let oclResult = oclEngine.evaluate(new Person());
        let result = oclResult.getResult();
        expect(result).to.be.true;
    });
});
