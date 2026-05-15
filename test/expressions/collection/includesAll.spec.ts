import { expectOclRuleValidatesToTrue, expectOclRuleValidatesToFalse } from '../../matcher';
import { OclEngine } from '../../../lib';
import { expect } from 'vitest';

describe('Collection->includesAll', () => {
    describe('with invariant expressions', () => {
        it('should return true when all elements exist in collection', () => {
            const obj = {
                seq: [1, 2, 3, 4, 5],
                subset: [2, 3, 4]
            };
            const oclExpression = 'context Object inv: self.seq->includesAll(self.subset)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should return false when some elements are missing', () => {
            const obj = {
                seq: [1, 2, 3],
                subset: [2, 3, 99]
            };
            const oclExpression = 'context Object inv: self.seq->includesAll(self.subset)';
            expectOclRuleValidatesToFalse(oclExpression, obj);
        });

        it('should return true for empty subset', () => {
            const obj = {
                seq: [1, 2, 3],
                subset: []
            };
            const oclExpression = 'context Object inv: self.seq->includesAll(self.subset)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should return false when source is empty but subset is not', () => {
            const obj = {
                seq: [],
                subset: [1]
            };
            const oclExpression = 'context Object inv: self.seq->includesAll(self.subset)';
            expectOclRuleValidatesToFalse(oclExpression, obj);
        });

        it('should work with string collections', () => {
            const obj = {
                names: ['Alice', 'Bob', 'Charlie', 'David'],
                subset: ['Bob', 'David']
            };
            const oclExpression = 'context Object inv: self.names->includesAll(self.subset)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should return false for string subset with missing element', () => {
            const obj = {
                names: ['Alice', 'Bob', 'Charlie'],
                subset: ['Bob', 'Eve']
            };
            const oclExpression = 'context Object inv: self.names->includesAll(self.subset)';
            expectOclRuleValidatesToFalse(oclExpression, obj);
        });

        it('should return true when subset equals source', () => {
            const obj = {
                seq: [1, 2, 3],
                subset: [1, 2, 3]
            };
            const oclExpression = 'context Object inv: self.seq->includesAll(self.subset)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should handle collections with duplicate elements in source', () => {
            const obj = {
                seq: [1, 2, 2, 3, 3, 3],
                subset: [2, 3]
            };
            const oclExpression = 'context Object inv: self.seq->includesAll(self.subset)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should handle collections with duplicate elements in subset', () => {
            const obj = {
                seq: [1, 2, 3, 4],
                subset: [2, 2, 3, 3]
            };
            const oclExpression = 'context Object inv: self.seq->includesAll(self.subset)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should work with nested property access', () => {
            const obj = {
                employee: { name: 'Alice', skills: ['Java', 'Python', 'JavaScript'] },
                requiredSkills: ['Java', 'Python']
            };
            const oclExpression = 'context Object inv: self.employee.skills->includesAll(self.requiredSkills)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });
    });

    describe('with query expressions', () => {
        let oclEngine: OclEngine;

        beforeEach(() => {
            oclEngine = OclEngine.create();
        });

        it('should return true when all elements exist', () => {
            const obj = {
                source: [1, 2, 3, 4, 5],
                subset: [2, 3, 4]
            };
            const expression = oclEngine.createQuery('self.source->includesAll(self.subset)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(true);
        });

        it('should return false when element is missing', () => {
            const obj = {
                source: [1, 2, 3],
                subset: [2, 3, 99]
            };
            const expression = oclEngine.createQuery('self.source->includesAll(self.subset)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(false);
        });

        it('should return true for single element subset', () => {
            const obj = {
                source: [1, 2, 3],
                subset: [2]
            };
            const expression = oclEngine.createQuery('self.source->includesAll(self.subset)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(true);
        });

        it('should work with negative numbers', () => {
            const obj = {
                source: [-3, -2, -1, 0, 1, 2, 3],
                subset: [-2, 0, 2]
            };
            const expression = oclEngine.createQuery('self.source->includesAll(self.subset)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(true);
        });

        it('should work with decimal numbers', () => {
            const obj = {
                source: [1.1, 2.2, 3.3, 4.4],
                subset: [2.2, 3.3]
            };
            const expression = oclEngine.createQuery('self.source->includesAll(self.subset)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(true);
        });

        it('should return false for non-array source', () => {
            const obj = {
                source: 'not an array',
                subset: [1, 2]
            };
            const expression = oclEngine.createQuery('self.source->includesAll(self.subset)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(false);
        });

        it('should return false for non-array subset', () => {
            const obj = {
                source: [1, 2, 3],
                subset: 'not an array'
            };
            const expression = oclEngine.createQuery('self.source->includesAll(self.subset)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(false);
        });
    });

    describe('edge cases', () => {
        it('should handle null values in collections', () => {
            const obj = {
                seq: [1, null, 3],
                subset: [null, 1]
            };
            const oclExpression = 'context Object inv: self.seq->includesAll(self.subset)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should work with boolean values', () => {
            const obj = {
                flags: [true, false, true],
                subset: [true, false]
            };
            const oclExpression = 'context Object inv: self.flags->includesAll(self.subset)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should handle zero in collections', () => {
            const obj = {
                seq: [0, 1, 2, 3],
                subset: [0, 1]
            };
            const oclExpression = 'context Object inv: self.seq->includesAll(self.subset)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should work in complex boolean expressions', () => {
            const obj = {
                seq1: [1, 2, 3, 4],
                seq2: [2, 3],
                seq3: [5, 6]
            };
            const oclExpression = 'context Object inv: self.seq1->includesAll(self.seq2) and not self.seq1->includesAll(self.seq3)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should work with filtered collections', () => {
            const obj = {
                numbers: [1, 2, 3, 4, 5, 6],
                subset: [2, 4, 6]
            };
            const oclExpression = 'context Object inv: self.numbers->includesAll(self.numbers->select(n | n mod 2 = 0))';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should support collect operations on subset', () => {
            const obj = {
                employees: [
                    { name: 'Alice', age: 30 },
                    { name: 'Bob', age: 25 },
                    { name: 'Charlie', age: 35 }
                ],
                ages: [25, 30, 35]
            };
            const oclExpression = 'context Object inv: self.ages->includesAll(self.employees->collect(age))';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });
    });
});
