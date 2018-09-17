import { Person } from '../fixture.factory';
import { expectOclRuleValidatesToTrue } from '../matcher';

describe('if', () => {

    it('sets variable for if', () => {
        const oclExpression = 'context Person::underage : Boolean init: if age < 18 then true else false endif';
        const person = new Person(2);
        expectOclRuleValidatesToTrue(oclExpression, person);
    });

    it('sets variable for then', () => {
        const oclExpression = 'context Person::underage : Boolean init: if age < 18 then true else false endif';
        const person = new Person(22);
        expectOclRuleValidatesToTrue(oclExpression, person);
    });

    it('then works in inv', () => {
        const person = new Person(2);
        const oclExpression = 'context Person inv: if age < 18 then "underage" else "adult" endif = "underage"';
        expectOclRuleValidatesToTrue(oclExpression, person);
    });

    it('else works in inv', () => {
        const person = new Person(22);
        const oclExpression = 'context Person inv: if age < 18 then "underage" else "adult" endif = "adult"';
        expectOclRuleValidatesToTrue(oclExpression, person);
    });
});
