import {Person} from "../fixture.factory";
import {expectOclRuleValidatesToTrue} from '../matcher'

describe('if', () => {
    let oclExpression = `context Person::underage : Boolean init: if age < 18 then true else false endif`;

    it('sets variable for if', () => {
        let person = new Person(2);
        expectOclRuleValidatesToTrue(oclExpression, person);
    });

    it('sets variable for then', () => {
        let person = new Person(22);
        expectOclRuleValidatesToTrue(oclExpression, person);
    });

    it('then works in inv', () => {
        let person = new Person(2);
        let oclExpression = 'context Person inv: if age < 18 then "underage" else "adult" endif = "underage"';
        expectOclRuleValidatesToTrue(oclExpression, person);
    });

    it('else works in inv', () => {
        let person = new Person(22);
        let oclExpression = 'context Person inv: if age < 18 then "underage" else "adult" endif = "adult"';
        expectOclRuleValidatesToTrue(oclExpression, person);
    });
});

