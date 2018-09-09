import { expect } from 'chai';
import { OclEngine } from '../../lib';
import { Person } from '../fixture.factory';
import {OclParser} from "../../lib/components/parser/OclParser";

describe('OclEngine', () => {
    const oclEngine = OclEngine.create();
    oclEngine.registerTypes({
        Person
    });

    it('should register types for oclIsTypeOf', () => {
        let oclExpression = `
            context Person inv: self->oclIsTypeOf(Person)
        `;
        oclEngine.addOclExpression(oclExpression);

        const ast = OclParser.parse(oclExpression);

        const oclResult = oclEngine.evaluate(new Person());
        const result = oclResult.getResult();
        expect(result).to.be.true;
    });

    it('asdfg', () => {
       let expression = oclEngine.createQuery('self->oclIsTypeOf(String)');
       console.log(expression);
    });
});
