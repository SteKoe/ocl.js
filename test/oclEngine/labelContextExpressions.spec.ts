import { expect } from 'chai';
import { OclEngine } from '../../lib';
import { Person } from '../fixture.factory';

describe('OclEngine', () => {
    let oclEngine;

    beforeEach(() => {
        oclEngine = OclEngine.create();
        oclEngine.registerTypes({
            Person
        });
    });

    it('should allow to add labels as array', () => {
        oclEngine.addOclExpression('context Person inv: self->oclIsTypeOf(Person)', ['batch']);
        oclEngine.addOclExpression('context Person inv: self->oclIsTypeOf(Person)', ['live']);
        const result = oclEngine.evaluate(new Person());
        expect(result.getEvaluatedContextsCount()).to.equal(2);
    });

    it('should allow to add labels as string', () => {
        oclEngine.addOclExpression('context Person inv: self->oclIsTypeOf(Person)', 'batch');
        oclEngine.addOclExpression('context Person inv: self->oclIsTypeOf(Person)', ['live']);
        const result = oclEngine.evaluate(new Person());
        expect(result.getEvaluatedContextsCount()).to.equal(2);
    });

    it('should only execute contexts having a label that matches a label that is marked to be executed via array', () => {
        oclEngine.addOclExpression('context Person inv: self->oclIsTypeOf(Person)', ['batch']);
        oclEngine.addOclExpression('context Person inv: self->oclIsTypeOf(Person)', ['live']);
        const result = oclEngine.evaluate(new Person(), ['live']);
        expect(result.getEvaluatedContextsCount()).to.equal(1);
    });

    it('should only execute contexts having a label that matches a label that is marked to be executed via string', () => {
        oclEngine.addOclExpression('context Person inv: self->oclIsTypeOf(Person)', ['batch']);
        oclEngine.addOclExpression('context Person inv: self->oclIsTypeOf(Person)', ['live']);
        const result = oclEngine.evaluate(new Person(), 'live');
        expect(result.getEvaluatedContextsCount()).to.equal(1);
    });
});
