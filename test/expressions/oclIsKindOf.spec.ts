import {expect} from 'chai';
import {Dog, FixtureFactory, Human, Person} from '../fixture.factory';
import {OclParser} from '../../lib/components/parser/OclParser';
import {OclExecutionContext} from '../../lib/components/OclExecutionContext';

function expectTrue(oclExpression, visitor): void {
    OclParser.parse(oclExpression)
        .evaluate(visitor);

    expect(visitor.evaluationResult).to.be.true;
}

function expectFalse(oclExpression, visitor): void {
    OclParser.parse(oclExpression)
        .evaluate(visitor);

    expect(visitor.evaluationResult).to.be.false;
}

describe('oclIsKindOf', () => {
    const mother = FixtureFactory.createPerson('Hilde');

    const visitor = new OclExecutionContext(mother);
    visitor.registerTypes({
        Human,
        Person,
        Dog
    });

    it('positve tests', () => {
        let oclExpression = 'context Person inv: self->oclIsKindOf(Human)';
        expectTrue(oclExpression, visitor);

        oclExpression = 'context Person inv: self->oclIsKindOf(Person)';
        expectTrue(oclExpression, visitor);

        oclExpression = 'context Person inv: self->oclIsKindOf(Object)';
        expectTrue(oclExpression, visitor.setObjectToEvaluate({}));
    });

    it('negative tests', () => {
        let oclExpression = 'context Person inv: self->oclIsKindOf(Dog)';
        expectFalse(oclExpression, visitor);

        oclExpression = 'context Person inv: self->oclIsKindOf()';
        expectFalse(oclExpression, visitor);
    });
});
