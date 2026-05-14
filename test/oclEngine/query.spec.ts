import { expect } from 'vitest';
import { OclEngine } from '../../lib';
import { Job, Person } from '../fixture.factory';

describe('OclQuery', () => {
    let oclEngine;

    beforeEach(() => {
        oclEngine = new OclEngine();
    });

    it('should be able to process queries', () => {
        const expression = oclEngine.createQuery('self.age');

        const result = oclEngine.evaluateQuery(new Person(42), expression);
        expect(result).toBe(42);
    });

    it('should be able to process complex queries', () => {
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

        let expression = oclEngine.createQuery('self.parents.jobs.salary');
        let result = oclEngine.evaluateQuery(child, expression);
        expect(result).toStrictEqual([17000, 19000]);

        expression = oclEngine.createQuery('self.parents.jobs.salary->sum()');
        result = oclEngine.evaluateQuery(child, expression);
        expect(result).toStrictEqual(36000);

        expression = oclEngine.createQuery('self.parents.jobs.salary->sum() = 36000');
        result = oclEngine.evaluateQuery(child, expression);
        expect(result).toBe(true);
    });
});

