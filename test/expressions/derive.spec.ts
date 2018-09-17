import { expect } from 'chai';
import { Job, Person } from '../fixture.factory';
import { expectOclRuleValidatesToTrue } from '../matcher';

describe('derive', () => {
    it('sets variable on derive', () => {
        const obj = new Person();
        const oclExpression = 'context Person::age : Integer derive: 12';
        expectOclRuleValidatesToTrue(oclExpression, obj);
        expect(obj.age).to.equal(12);
    });

    it('derive wins over init', () => {
        const person = new Person();
        const oclExpression = `
                context Person::age : Integer
                    init: 10
                    derive: 12
            `;

        expectOclRuleValidatesToTrue(oclExpression, person);
        expect(person.age).to.equal(12);
    });

    it('derive using if', () => {
        const person = new Person(12);
        const oclExpression = 'context Person::income : Integer derive: if age < 18 then 15 else 10000 endif';
        expectOclRuleValidatesToTrue(oclExpression, person);
        expect(person.income).to.equal(15);
    });

    it('derive using if complex', () => {
        const jobFather = new Job();
        jobFather.salary = 17000;
        const father = new Person();
        father.jobs.push(jobFather);

        const jobMother = new Job();
        jobMother.salary = 19000;
        const mother = new Person();
        mother.jobs.push(jobMother);

        const child = new Person(12);
        child.parents.push(father);
        child.parents.push(mother);

        const oclExpression = 'context Person::income : Integer derive: if age < 18 then self.parents.jobs.salary->sum() * 0.02 / 12 else self.jobs.salary->sum() endif';
        expectOclRuleValidatesToTrue(oclExpression, child);
        expect(child.income).to.equal(60);

        // Now the children finally gets a job and is over 18 years old
        const jobChild = new Job();
        jobChild.salary = 17000;

        child.age = 23;
        child.jobs.push(jobChild);
        expectOclRuleValidatesToTrue(oclExpression, child);
        expect(child.income).to.equal(17000);
    });
});
