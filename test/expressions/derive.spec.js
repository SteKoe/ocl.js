import { expect } from "chai";
import { Person } from "../fixture.factory";
import { expectOclRuleValidatesToTrue } from '../matcher'

describe('derive', () => {
    it('sets variable on derive', () => {
        let obj = new Person();
        let oclExpression = `context Person::age : Integer derive: 12`;
        expectOclRuleValidatesToTrue(oclExpression, obj);
        expect(obj.age).to.equal(12);
    });

    it('derive wins over init', () => {
        let person = new Person();
        let oclExpression = `
                context Person::age : Integer
                    init: 10
                    derive: 12
            `;

        expectOclRuleValidatesToTrue(oclExpression, person);
        expect(person.age).to.equal(12);
    });

    it('derive using if', () => {
        let person = new Person(12);
        let oclExpression = `context Person::money : Integer derive: if age < 18 then 15 else 10000 endif`;
        expectOclRuleValidatesToTrue(oclExpression, person);
        expect(person.money).to.equal(15);
    });
});

