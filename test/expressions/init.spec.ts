import {expect} from 'chai';
import {Person} from '../fixture.factory';
import {expectOclRuleValidatesToTrue} from '../matcher';

describe('init', () => {
    it('sets variable on init', () => {
        const person = new Person();
        const oclExpression = 'context Person::age : Integer init: 12';
        expectOclRuleValidatesToTrue(oclExpression, person);
        expect(person.age).to.equal(12);
    });
});
