import {expect} from 'chai';
import {OclEngine} from "../../lib/components/OclEngine";
import {Person} from '../fixture.factory'

describe('OclEngine', function () {
    let oclEngine;

    beforeEach(() => {
        oclEngine = OclEngine.create();
        oclEngine.registerTypes({
            "Person": Person
        });
    });

    it('should allow to add labels as array', function () {
        oclEngine.addOclExpression(`context Person inv: self->oclIsTypeOf(Person)`, ['batch']);
        oclEngine.addOclExpression(`context Person inv: self->oclIsTypeOf(Person)`, ['live']);
        let result = oclEngine.evaluate(new Person());
        expect(result.getEvaluatedContextsCount()).to.equal(2);
    });

    it('should allow to add labels as string', function () {
        oclEngine.addOclExpression(`context Person inv: self->oclIsTypeOf(Person)`, 'batch');
        oclEngine.addOclExpression(`context Person inv: self->oclIsTypeOf(Person)`, ['live']);
        let result = oclEngine.evaluate(new Person());
        expect(result.getEvaluatedContextsCount()).to.equal(2);
    });

    it('should only execute contexts having a label that matches a label that is marked to be executed via array', function () {
        oclEngine.addOclExpression(`context Person inv: self->oclIsTypeOf(Person)`, ['batch']);
        oclEngine.addOclExpression(`context Person inv: self->oclIsTypeOf(Person)`, ['live']);
        let result = oclEngine.evaluate(new Person(), ['live']);
        expect(result.getEvaluatedContextsCount()).to.equal(1);
    });

    it('should only execute contexts having a label that matches a label that is marked to be executed via string', function () {
        oclEngine.addOclExpression(`context Person inv: self->oclIsTypeOf(Person)`, ['batch']);
        oclEngine.addOclExpression(`context Person inv: self->oclIsTypeOf(Person)`, ['live']);
        let result = oclEngine.evaluate(new Person(), 'live');
        expect(result.getEvaluatedContextsCount()).to.equal(1);
    });
});
